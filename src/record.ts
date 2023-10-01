import { createClient } from "redis";


const redis = createClient({
    socket: { host: "127.0.0.1", port: 6379, },
    database: 2,
    // password:"",
});

async function main(oid: string) {
    await redis.connect();
    console.log(`数据库: ping -> ${await redis.ping()}`);

    let isEnd = false;
    let next: string | undefined = ``;// `{"type":3,"direction":1,"Data":{"cursor":22}}`;
    while (!isEnd) {
        // console.log(data.data.replies[0]);
        if (next == undefined) break;
        console.log(`===== ${next} =====`);

        const data = await buildFetch({ oid, type: 11, pagination_str: next, });
        next = data.data.cursor.pagination_reply.next_offset;
        for (const reply of data.data.replies) {
            // if (reply.ctime * 1000 > breakTime.getTime()) continue;
            // if (reply.member.level_info.current_level <= breakStar) continue;
            console.log(`${reply.member.uname}(${reply.member.mid}) ${reply.member.level_info.current_level}`);
            await redis.hSet(`bilibiliCommitGacha:${oid}`, `member:${reply.mid}`, JSON.stringify(reply));
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        isEnd = data.data.cursor.is_end;

    }
    console.log("全部完成！");
    await redis.disconnect();
}


const buildFetch = ({ oid, type, mode, pagination_str }: {
    oid: string;
    type: number;
    mode?: number;
    pagination_str?: string;
}) => fetch(`https://api.bilibili.com/x/v2/reply/main?oid=${oid}&type=${type}&mode=${mode || 2}&pagination_str=${JSON.stringify({ offset: pagination_str || "" })}`, {
    headers: {
        "User-Agent": "Mozilla/5.0",// userAgent,
        "Cookie": "SESSDATA=feilongproject.com;", //cookies, //`SESSDATA=feilongproject.com;${cookies}`,
    },
}).then(res => res.json() as Promise<BilibiliReply.Root>);

main("278881136");
