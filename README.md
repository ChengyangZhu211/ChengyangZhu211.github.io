# 个人学术主页

这是一个无需安装依赖的静态网站，保留了经典学术主页的双栏简介与分区列表结构。

## 1. 填写个人信息

打开 `js/profile.js`，替换引号内的占位内容。主要字段如下：

| 字段 | 用途 |
| --- | --- |
| `name` | 中文姓名 |
| `englishName` | 英文名 |
| `identity` | 当前身份 |
| `major` | 专业或研究方向 |
| `bio` | 个人简介，每一项显示为一段 |
| `email` | 邮箱 |
| `githubUsername` | GitHub 用户名，只填用户名 |
| `domain` | 完整个人网址，例如 `https://yourname.com` |
| `education` | 教育经历列表 |
| `projects` | 项目列表 |
| `awards` | 获奖列表 |
| `lastUpdated` | 页面最后更新日期 |

列表中的一对 `{ ... }` 表示一条经历。复制整段即可增加一条，删除整段即可移除一条；相邻条目之间必须保留英文逗号。

项目链接写在项目的 `links` 中，例如：

```js
links: [
  { label: "项目主页", url: "https://example.com" },
  { label: "代码", url: "https://github.com/你的用户名/项目名" }
]
```

如果某个板块暂时没有内容，可以把列表改为空列表：

```js
awards: []
```

页面会自动显示“内容待补充”。

## 2. 添加头像和简历

1. 将头像复制到 `images/avatar.jpg`，建议使用竖版照片。
2. 将简历复制到 `data/cv.pdf`。
3. 在 `js/profile.js` 中设置：

```js
avatar: "images/avatar.jpg",
cv: "data/cv.pdf",
```

文件名大小写必须与配置完全一致。未添加头像时会使用默认占位图；未添加简历时链接会显示“简历待补充”。

## 3. 设置 GitHub Pages 和域名

使用默认 GitHub Pages 地址时：

1. 将仓库命名为 `你的GitHub用户名.github.io`。
2. 在仓库的 **Settings > Pages** 中选择从 `main` 分支发布。
3. 保持 `CNAME` 文件为空。

使用自定义域名时，把域名写入根目录的 `CNAME`，只写一行且不要带 `https://`：

```text
yourname.com
```

然后在域名服务商处配置 GitHub Pages 所需的 DNS 记录，并在 `js/profile.js` 的 `domain` 中填写完整网址。

## 4. 本地预览

直接双击 `index.html` 即可预览。修改 `js/profile.js` 后刷新浏览器查看结果。

通常只需要维护 `js/profile.js`、`images/avatar.jpg`、`data/cv.pdf` 和 `CNAME`；不需要修改 `index.html`。
