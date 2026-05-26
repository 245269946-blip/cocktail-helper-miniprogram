# 调酒助手微信小程序

定位：鸡尾酒配方搜索 + 风味推荐 + 场景购买指南。

当前本地版本已完成：

- 原生微信小程序框架
- 首页搜索型入口
- 搜配方、按基酒找、按材料找、便利店调酒、家里有什么、新手推荐
- 风味分类、场景推荐、搜索结果页与标准详情页
- 35 个配方、8 个场景方案、11 类基酒、13 类常见材料
- 微信云开发接入：云端优先，本地兜底

## 重要说明

完整源码当前已在本地项目目录中：

```text
C:\Users\Administrator\Documents\Codex\2026-05-26\ok-1-2-6-a-b
```

本地也已经打包好：

```text
cocktail-helper-miniprogram.zip
```

由于当前 Codex GitHub 插件不能直接从本地文件夹流式上传整个目录，建议在 GitHub 网页中上传解压后的源码，或在有 Git 的电脑上执行一次正常 push。

## 微信云开发

详见本地 `CLOUD.md`。需要创建集合：

```text
recipes
schemes
bases
ingredients
appContent
```

然后导入本地 `cloud-data` 目录下的 JSON 文件。
