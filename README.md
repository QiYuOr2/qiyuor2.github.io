# 柒宇

个人主页。静态文件，不需要构建。`https://qiyuor2.github.io/` 现在仍可直接打开。生产环境准备接到 Vercel 上的 `https://qiyuor2.me/`。仓库里没有 `CNAME`。

## 站点列表

`sites.json` 是子站列表，页面只渲染 `public` 不为 `false` 的条目。缺省视为公开。

```json
[
  {
    "name": "博客",
    "url": "https://blog.qiyuor2.me/",
    "public": true
  },
  {
    "name": "示例",
    "url": "https://example.qiyuor2.me/",
    "public": false
  }
]
```

`public: false` 的条目留在文件里也不会出现在页面上。不要把未公开的地址写进这个仓库。
