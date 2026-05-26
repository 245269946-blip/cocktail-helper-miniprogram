# 微信云开发接入说明

当前代码已经支持“云端优先、本地兜底”。

也就是说：

- 没有配置云开发环境时，小程序继续读取 `utils/data.js`
- 配置云开发并导入数据后，小程序优先读取云数据库
- 云端读取失败或集合为空时，不影响现有功能

## 1. 开通云开发

在微信开发者工具中：

1. 打开项目
2. 点击顶部“云开发”
3. 创建一个云环境
4. 复制环境 ID

然后打开：

```text
utils/cloudConfig.js
```

把：

```js
env: ''
```

改成你的云环境 ID，例如：

```js
env: 'cocktail-helper-xxxxx'
```

## 2. 创建数据库集合

在云开发控制台的数据库里创建这些集合：

```text
recipes
schemes
bases
ingredients
appContent
```

建议开发阶段权限先用“所有用户可读，仅创建者可写”或更严格的自定义权限。

## 3. 导入初始内容

本项目已经生成好导入文件：

```text
cloud-data/recipes.json
cloud-data/schemes.json
cloud-data/bases.json
cloud-data/ingredients.json
cloud-data/appContent.json
```

在云开发数据库中，分别进入对应集合，使用“导入”功能导入同名 JSON 文件。

`appContent.json` 是单条文档，文档 `_id` 固定为：

```text
main
```

## 4. 后续内容更新

后续想改配方、材料、基酒或首页入口，可以直接改云数据库。

小程序页面进入时会重新读取内容仓库，并在云端不可用时自动回退本地数据。

## 5. 重新导出本地内容

如果你在 `utils/data.js` 里继续维护内容，可以运行：

```bash
node scripts/export-cloud-data.js
```

重新生成 `cloud-data` 里的导入文件。
