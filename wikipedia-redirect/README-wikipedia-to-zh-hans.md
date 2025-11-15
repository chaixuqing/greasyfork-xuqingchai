# Wikipedia 自动跳转到简体中文

## 功能说明

这个 Tampermonkey 脚本会自动将其他语言版本的 Wikipedia 页面重定向到对应的简体中文 Wikipedia 页面。

**智能回退机制**：如果目标页面没有简体中文版本或简体中文页面不存在（404），脚本会自动保持在原语言页面，并显示友好的提示通知。

## 工作原理

1. **检测非中文 Wikipedia 页面**：脚本只在非中文的 Wikipedia 页面上运行（例如：en.wikipedia.org, ja.wikipedia.org 等）

2. **通过 API 获取中文标题**：使用 Wikipedia 的官方 API 获取当前页面对应的中文版本链接

3. **自动重定向**：如果存在简体中文版本，自动跳转到 `zh.wikipedia.org` 并添加 `?variant=zh-hans` 参数以确保显示简体中文

## 示例

- **英文页面**：`https://en.wikipedia.org/wiki/Natsume%27s_Book_of_Friends`
  - 自动跳转到：`https://zh.wikipedia.org/wiki/夏目友人帳?variant=zh-hans`

- **日文页面**：`https://ja.wikipedia.org/wiki/夏目友人帳`
  - 自动跳转到：`https://zh.wikipedia.org/wiki/夏目友人帳?variant=zh-hans`

## 安装方法

1. 确保已安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击 `wikipedia-to-zh-hans.js` 文件
3. 点击 "Raw" 按钮
4. Tampermonkey 会自动检测并提示安装脚本

## 技术特点

### 智能识别
- 自动排除已经是中文的 Wikipedia 页面
- 只匹配标准的 Wikipedia 文章页面格式

### API 调用
- 使用 Wikipedia 官方 API (`action=query&prop=langlinks`)
- 请求语言链接信息 (`lllang=zh`)
- 支持页面重定向处理 (`redirects=1`)

### 简体中文强制
- 添加 `?variant=zh-hans` 参数确保显示简体中文
- 避免显示繁体中文或其他中文变体

### 错误处理
- 如果页面不存在中文版本，不会重定向
- 如果中文页面返回 404，自动回退到原语言页面
- 显示友好的通知消息告知用户状态
- 控制台输出详细的调试信息
- 网络请求失败时有错误处理

## 权限说明

- `@grant GM_xmlhttpRequest`：用于跨域请求 Wikipedia API
- `@connect *.wikipedia.org`：允许连接到所有 Wikipedia 域名

## 浏览器兼容性

支持所有主流浏览器：
- Chrome
- Firefox  
- Edge
- Safari (需要 Tampermonkey 或类似扩展)

## 注意事项

1. **页面加载**：脚本在 `document-end` 阶段运行，页面加载完成后立即执行重定向
2. **无中文版本**：如果 Wikipedia 页面没有对应的中文版本，将保持在原语言页面并显示通知
3. **可靠的链接**：Wikipedia API 返回的语言链接都是有效的，可以直接跳转
4. **网络请求**：每次访问非中文 Wikipedia 页面时会调用一次 API
5. **通知消息**：仅在没有中文版本或出错时显示通知
6. **调试信息**：打开浏览器控制台可以查看详细的重定向过程日志

## 开发说明

### API 端点示例

```
https://en.wikipedia.org/w/api.php?action=query&format=json&prop=langlinks&titles=Natsume%27s_Book_of_Friends&lllang=zh&llprop=url&redirects=1&origin=*
```

### 响应示例

```json
{
  "query": {
    "pages": {
      "12345": {
        "pageid": 12345,
        "title": "Natsume's Book of Friends",
        "langlinks": [
          {
            "lang": "zh",
            "url": "https://zh.wikipedia.org/wiki/夏目友人帳",
            "*": "夏目友人帳"
          }
        ]
      }
    }
  }
}
```

## 更新日志

### v1.0.2 (2025-11-15)
- 移除页面验证步骤，直接重定向（Wikipedia API 返回的链接都是有效的）
- 提高重定向速度和可靠性
- 简化代码逻辑

### v1.0.1 (2025-11-15)
- 修复脚本在 document-start 阶段运行时 DOM 未就绪的问题
- 改为在 document-end 阶段运行，确保页面 DOM 可用
- 改进 URL 解析，更好地处理特殊字符和编码
- 添加更详细的控制台日志用于调试
- 优化通知显示机制，确保在 DOM 就绪后再创建通知
- 改进 API 标题参数，将下划线转换为空格以匹配 Wikipedia 规范

### v1.0.0 (2025-11-15)
- 初始版本
- 支持所有语言的 Wikipedia 到简体中文的自动跳转
- 使用官方 API 获取准确的中文标题
- 添加 404 检测和自动回退机制
- 添加友好的通知消息系统

## 许可证

MIT License

## 作者

xuqingchai

## 相关链接

- [Wikipedia API 文档](https://www.mediawiki.org/wiki/API:Main_page)
- [Tampermonkey 文档](https://www.tampermonkey.net/documentation.php)
