# bilibiliCommitGacha

给剧情站用的 bilibili 动态评论抽奖姬

## 食用方法

### 前提条件

-   安装 `Node.js` （推荐 `18` 版本）
-   下载 `redis` （详情见[ `redis` 官方文档](https://redis.io/docs/getting-started/installation/)）并运行 `redis-server` ，建立起数据库
-   运行 `npm i  --registry=https://registry.npmmirror.com` 使用镜像安装依赖

### 正式运行

1. 运行 `npm run record` 进行爬虫，记录下所有动态
2. 运行 `npm run gacha` 进行随机抽奖

## 鸣谢

-   API 提供：[SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
-   ~~我自己~~
