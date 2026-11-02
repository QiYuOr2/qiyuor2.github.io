# 柒宇

个人主页。静态页面，GitHub Pages 直接托管，不需要构建。

现在仍然由 `https://qiyuor2.github.io/` 提供。自定义域名 `qiyuor2.me` 还没有接上，仓库里也没有 `CNAME`。

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
