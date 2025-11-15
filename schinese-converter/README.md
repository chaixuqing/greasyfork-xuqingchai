# 自动转换为简体中文 (zh-hans/zh-CN/zh-cn)

## 📁 文件说明

### 主文件
- **make all web pages to schinese.js** - Tampermonkey 脚本主文件

### 文档
- **README-make all web pages to schinese.md** - 详细使用说明和功能介绍

## 🚀 快速开始

### 安装脚本
1. 确保已安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 打开 `make all web pages to schinese.js` 文件
3. 复制内容到 Tampermonkey 新建脚本
4. 保存并启用脚本

### 功能说明
此脚本会自动将 URL 中的其他中文变体代码（如 zh-hk, zh-tw, zh-hant 等）替换为 zh-hans（简体中文），并重定向到简体中文页面。

### 适用网站
适用于所有在 URL 中使用语言代码的网站，例如：
- 多语言文档网站
- 国际化的 Web 应用
- 支持多语言的内容平台

## 🎯 使用场景

当你访问如下 URL 时：
```
https://example.com/zh-tw/docs/guide
https://example.com/zh-hk/article
https://example.com/zh-hant/content
```

脚本会自动重定向到：
```
https://example.com/zh-hans/docs/guide
https://example.com/zh-hans/article
https://example.com/zh-hans/content
```

## 📝 版本信息

版本: v1.0.0  
状态: ✅ 可用  
发布日期: 2025-11-15
