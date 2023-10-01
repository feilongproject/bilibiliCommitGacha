import { createClient } from "redis";

const redis = createClient({
    socket: { host: "127.0.0.1", port: 6379, },
    database: 2,
    // password:"",
});

const breakTime = new Date("2023-09-29 23:59");
const breakStar = 2;

const gachaList = [
    { desc: "一等奖", total: 1 },
    { desc: "二等奖", total: 2 },
    { desc: "三等奖", total: 10 },
];
const alreadyGacha: string[] = [];

async function main(oid: string) {
    await redis.connect();
    for (const gachaItem of gachaList) {
        let gachaNum = 0;
        console.log(`=====  ${gachaItem.desc}  =====`);

        while (gachaNum < gachaItem.total) {
            const replyKey = await redis.hRandField(`bilibiliCommitGacha:${oid}`);
            // debugger;
            if (!replyKey) return console.error("?啊？你往数据库里面存东西了口马？");
            const _reply = await redis.hGet(`bilibiliCommitGacha:${oid}`, replyKey);
            if (!_reply) return console.error(`似乎出了些问题，没有找到 ${replyKey} 的值`);

            const reply: BilibiliReply.Reply = JSON.parse(_reply);

            if (reply.ctime * 1000 > breakTime.getTime()) continue;
            if (reply.member.level_info.current_level <= breakStar) continue;
            if (alreadyGacha.includes(reply.member.mid)) continue;

            alreadyGacha.push(reply.member.mid);
            ++gachaNum;

            console.log(`${reply.member.uname}(${reply.mid})`);
        }

        console.log("");
    }

    await redis.disconnect();
}

main("278881136");