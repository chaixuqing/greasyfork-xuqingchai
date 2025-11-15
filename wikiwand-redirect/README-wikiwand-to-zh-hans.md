# Wikiwand 自动跳转到简体中文

## 功能说明

这个 Tampermonkey 用户脚本可以自动将其他语言的 Wikiwand 页面重定向到对应的简体中文页面。

### 主要特性

1. **自动语言检测和转换**：检测当前页面语言，自动查找对应的简体中文版本
2. **智能 URL 转换**：不仅转换语言代码，还会将文章标题（slug）转换为中文
3. **404 回退机制**：如果简体中文页面不存在，自动保持在原页面
4. **页面验证**：在跳转前验证目标页面是否存在
5. **用户通知**：显示友好的通知消息，告知用户跳转状态

## 安装方法

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击 Tampermonkey 图标，选择"添加新脚本"
3. 复制 `wikiwand-to-zh-hans.js` 的内容并粘贴
4. 保存脚本（Ctrl+S 或 Cmd+S）

## 使用示例

### 示例 1：葡萄牙语到简体中文

**输入：**
```
https://www.wikiwand.com/pt/articles/Natsume_Yūjin-chō
```

**输出：**
```
https://www.wikiwand.com/zh-cn/articles/夏目友人帳
```

### 示例 2：英语到简体中文

**输入：**
```
https://www.wikiwand.com/en/articles/Natsume's_Book_of_Friends
```

**输出：**
```
https://www.wikiwand.com/zh-cn/articles/夏目友人帳
```

## 工作原理

1. **URL 解析**：脚本解析 Wikiwand URL，提取语言代码和文章标题
2. **Wikipedia API 查询**：使用 Wikipedia API 查找对应的中文页面标题
3. **URL 构建**：使用中文标题构建新的 Wikiwand URL
4. **页面验证**：发送 GET 请求验证目标页面是否存在
5. **智能重定向**：
   - 如果页面存在（200）：跳转到简体中文页面
   - 如果页面不存在（404）：保持在原页面
   - 如果验证失败：尝试直接跳转（相信 Wikipedia API 的结果）

## 支持的语言

脚本支持所有 Wikiwand 支持的语言，包括但不限于：

- 英语 (en)
- 德语 (de)
- 法语 (fr)
- 西班牙语 (es)
- 意大利语 (it)
- 日语 (ja)
- 葡萄牙语 (pt)
- 俄语 (ru)
- 阿拉伯语 (ar)
- 韩语 (ko)
- 荷兰语 (nl)
- 波兰语 (pl)
- 土耳其语 (tr)
- 瑞典语 (sv)
- 希伯来语 (he)

## 测试

项目包含一个测试页面 `test-wikiwand-redirect.html`，可以在浏览器中打开测试脚本逻辑：

```bash
# 在浏览器中打开
file:///path/to/test-wikiwand-redirect.html
```

测试页面会模拟脚本的完整执行流程，显示每个步骤的详细信息。

## 技术细节

### 依赖

- `GM_xmlhttpRequest`：用于跨域请求 Wikipedia API 和验证 Wikiwand 页面
- Wikipedia API：获取文章的语言链接

### 元数据

- **版本**：1.1.0
- **匹配**：`https://www.wikiwand.com/*/articles/*`
- **排除**：已经是简体中文的页面（`zh-cn` 和 `zh-hans`）
- **运行时机**：`document-start`（页面加载开始时，尽早执行以避免不必要的加载）

### 防止重复执行

脚本使用 `window.wikiwandRedirectProcessed` 标志防止在同一页面重复执行。

## 故障排除

### 脚本没有自动跳转

1. **检查 Tampermonkey 是否启用**：确保 Tampermonkey 扩展已启用
2. **检查脚本是否启用**：在 Tampermonkey 管理面板中确认脚本已启用
3. **查看控制台日志**：打开浏览器开发者工具（F12），查看控制台中的 `[Wikiwand 简体中文重定向]` 日志
4. **检查页面 URL**：确认 URL 符合 `https://www.wikiwand.com/*/articles/*` 格式

### 跳转到错误的页面

这通常不应该发生，因为脚本依赖 Wikipedia API。如果发生：

1. 查看控制台日志，检查 Wikipedia API 返回的数据
2. 确认源语言页面在 Wikipedia 上存在对应的中文版本

### 显示"页面不存在"但实际存在

这可能是验证机制的问题：

1. Wikiwand 可能阻止了 HEAD/GET 请求
2. 脚本会在验证失败时尝试直接跳转
3. 如果问题持续，可以修改脚本，跳过验证步骤

## 更新日志

### v1.1.0 (2025-11-15)
- 改进页面验证机制（使用 GET 代替 HEAD）
- 添加超时处理（5秒）
- 添加防重复执行保护
- 改为 `document-start` 运行以提高响应速度
- 优化错误处理和通知消息

### v1.0.0 (2025-11-15)
- 初始版本
- 基本的语言检测和重定向功能
- Wikipedia API 集成
- 404 回退机制

## 相关项目

- [Wikipedia 自动跳转到简体中文](./wikipedia-to-zh-hans.js)：类似的脚本，用于 Wikipedia 页面重定向

## 许可证

MIT License

## 作者

You

## 贡献

欢迎提交 Issue 和 Pull Request！
