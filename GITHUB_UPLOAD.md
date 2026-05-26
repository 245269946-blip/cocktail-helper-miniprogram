# 上传完整源码

仓库已初始化，当前 Codex 已具备仓库权限。

但当前运行环境没有 `git` / `gh`，GitHub 插件也不能直接从本地文件夹流式上传整个目录。

最快补全方式：

1. 打开本地项目目录：

```text
C:\Users\Administrator\Documents\Codex\2026-05-26\ok-1-2-6-a-b
```

2. 不要上传这些文件：

```text
cocktail-helper-miniprogram.zip
project.private.config.json
```

3. 把其余文件和目录上传到 GitHub：

```text
app.json
app.js
app.wxss
project.config.json
sitemap.json
README.md
CLOUD.md
GITHUB_UPLOAD.md
.gitignore
pages/
utils/
assets/
scripts/
cloud-data/
```

4. 另一台电脑拉取仓库后，用微信开发者工具导入项目即可。

长期建议：另一台电脑安装 Git 后，用正常 `git clone` / `git push` 工作流继续维护。
