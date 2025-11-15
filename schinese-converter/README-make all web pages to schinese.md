# 自动转换为简体中文 (zh-hans/zh-CN/zh-cn) / Auto Convert to Simplified Chinese

[中文](#中文) | [English](#english)

---

## 中文

### 📖 功能说明

这是一个 Tampermonkey 用户脚本,可以自动将网页 URL 中的英文语言代码 `en` 以及各种中文语言代码转换为简体中文代码 `zh-hans`,并自动重定向到简体中文页面。如果目标页面不存在（404错误），脚本会自动返回原始页面。

### ✨ 主要特性

- 🌍 **英文转简中**: 自动将 URL 中的 `/en` 转换为 `/zh-hans`（英文转简体中文）
- 🔄 **自动重定向**: 检测 URL 中的中文语言代码并自动跳转到简体中文版本
- 🎯 **智能识别**: 识别并转换 `zh-hk`(香港)、`zh-tw`(台湾)、`zh-hant`(繁体)、`zh-sg`(新加坡)、`zh-mo`(澳门)等变体
- ✅ **保护大陆简体**: 保留 `zh-CN`、`zh-cn` 和 `zh-hans` 不做转换
- 🛡️ **智能404处理**: 如果目标页面不存在（404错误），自动返回原始页面
- ⚡ **即时生效**: 在文档开始加载时运行,避免闪烁
- 🌐 **全站支持**: 适用于所有网站

### 📝 工作原理

脚本会监控所有网页的 URL,当检测到 URL 中包含以下格式的语言代码时:
- `en` (英文)
- `zh-hk` (香港繁体)
- `zh-tw` (台湾繁体)
- `zh-hant` (繁体中文)
- `zh-sg` (新加坡简体)
- `zh-mo` (澳门繁体)
- 其他 `zh-*` 变体

脚本会自动将其替换为 `zh-hans` (简体中文) 并重定向到新 URL。

**智能404处理**: 
- 脚本会先检查目标 URL 是否存在
- 如果目标页面返回404错误，脚本会自动返回原始页面
- 使用 sessionStorage 避免无限重定向循环

**注意**: `zh-CN`、`zh-cn` 和 `zh-hans` 不会被转换,因为它们已经是简体中文代码。

### 🔧 安装方法

1. 首先安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击本脚本的安装按钮
3. 在弹出的页面中点击"安装"
4. 完成!脚本将自动运行

### 💡 使用示例

访问以下 URL 时会自动重定向:

**英文转简体中文:**
- `https://example.com/en/page` → `https://example.com/zh-hans/page`
- `https://example.com/en/docs` → `https://example.com/zh-hans/docs`
- `https://wikipedia.org/en/article` → `https://wikipedia.org/zh-hans/article`

**其他中文变体转简体中文:**
- `https://example.com/zh-tw/page` → `https://example.com/zh-hans/page`
- `https://example.com/zh-hk/article` → `https://example.com/zh-hans/article`
- `https://example.com/zh-hant/docs` → `https://example.com/zh-hans/docs`

不会重定向的 URL:
- `https://example.com/zh-CN/page` (保持不变)
- `https://example.com/zh-cn/page` (保持不变)
- `https://example.com/zh-hans/page` (保持不变)

**404错误处理:**
- 如果 `https://example.com/zh-hans/page` 不存在（404），脚本会自动返回 `https://example.com/en/page`

### 🐛 已知限制

- 仅处理 URL 路径中的语言代码,不处理域名中的代码
- 需要网站本身支持 `zh-hans` 语言代码
- 某些网站可能使用其他方式设置语言(如 Cookie、LocalStorage),脚本无法处理这些情况
- 404检测依赖于页面标题或HTTP响应状态，某些特殊网站可能检测不准确
- 由于浏览器安全限制(CORS)，某些网站无法提前检查404状态

### 📋 更新日志

#### v1.1.0 (2025-11-15)
- 🌍 新增：支持英文 `/en` 自动转换为 `/zh-hans`
- 🛡️ 新增：智能404错误检测和处理，失败时返回原始页面
- 🔧 优化：使用 sessionStorage 防止重定向循环
- 📝 改进：更详细的控制台日志输出

#### v1.0.0 (2025-11-15)
- 🎉 首次发布
- ✅ 支持自动转换各种 `zh-*` 语言代码为 `zh-hans`
- ✅ 排除 `zh-CN`、`zh-cn` 和 `zh-hans` 不做转换
- ✅ 在文档加载前执行,避免页面闪烁

### 📄 许可证

本脚本采用 MIT 许可证发布,可自由使用和修改。

### 🤝 反馈与贡献

如有问题或建议,欢迎在 Greasyfork 页面留言反馈。

---

## English

### 📖 Description

This is a Tampermonkey userscript that automatically converts English language code `en` and various Chinese language codes in webpage URLs to Simplified Chinese code `zh-hans` and redirects to the Simplified Chinese page. If the target page doesn't exist (404 error), the script automatically returns to the original page.

### ✨ Features

- 🌍 **English to Simplified Chinese**: Automatically converts `/en` in URLs to `/zh-hans`
- 🔄 **Auto Redirect**: Detects Chinese language codes in URLs and automatically redirects to Simplified Chinese version
- 🎯 **Smart Recognition**: Identifies and converts variants like `zh-hk` (Hong Kong), `zh-tw` (Taiwan), `zh-hant` (Traditional), `zh-sg` (Singapore), `zh-mo` (Macau), etc.
- ✅ **Preserve Mainland Simplified**: Keeps `zh-CN`, `zh-cn`, and `zh-hans` unchanged
- 🛡️ **Smart 404 Handling**: Automatically returns to original page if target page doesn't exist (404 error)
- ⚡ **Instant Effect**: Runs at document start to avoid page flickering
- 🌐 **Universal Support**: Works on all websites

### 📝 How It Works

The script monitors all webpage URLs and automatically redirects when it detects language codes in the following formats:
- `en` (English)
- `zh-hk` (Hong Kong Traditional)
- `zh-tw` (Taiwan Traditional)
- `zh-hant` (Traditional Chinese)
- `zh-sg` (Singapore Simplified)
- `zh-mo` (Macau Traditional)
- Other `zh-*` variants

The script will replace them with `zh-hans` (Simplified Chinese) and redirect to the new URL.

**Smart 404 Handling**:
- The script first checks if the target URL exists
- If the target page returns a 404 error, the script automatically returns to the original page
- Uses sessionStorage to prevent infinite redirect loops

**Note**: `zh-CN`, `zh-cn`, and `zh-hans` will not be converted as they are already Simplified Chinese codes.

### 🔧 Installation

1. First install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click the install button for this script
3. Click "Install" on the popup page
4. Done! The script will run automatically

### 💡 Usage Examples

The following URLs will be automatically redirected:

**English to Simplified Chinese:**
- `https://example.com/en/page` → `https://example.com/zh-hans/page`
- `https://example.com/en/docs` → `https://example.com/zh-hans/docs`
- `https://wikipedia.org/en/article` → `https://wikipedia.org/zh-hans/article`

**Other Chinese variants to Simplified Chinese:**
- `https://example.com/zh-tw/page` → `https://example.com/zh-hans/page`
- `https://example.com/zh-hk/article` → `https://example.com/zh-hans/article`
- `https://example.com/zh-hant/docs` → `https://example.com/zh-hans/docs`

URLs that won't be redirected:
- `https://example.com/zh-CN/page` (remains unchanged)
- `https://example.com/zh-cn/page` (remains unchanged)
- `https://example.com/zh-hans/page` (remains unchanged)

**404 Error Handling:**
- If `https://example.com/zh-hans/page` doesn't exist (404), the script will automatically return to `https://example.com/en/page`

### 🐛 Known Limitations

- Only processes language codes in URL paths, not in domain names
- Requires the website to support the `zh-hans` language code
- Some websites may use other methods to set language (e.g., Cookie, LocalStorage), which the script cannot handle
- 404 detection relies on page title or HTTP response status; may not be accurate for some special websites
- Due to browser security restrictions (CORS), some websites cannot be checked for 404 status in advance

### 📋 Changelog

#### v1.1.0 (2025-11-15)
- 🌍 New: Support for automatic conversion of `/en` (English) to `/zh-hans`
- 🛡️ New: Smart 404 error detection and handling, returns to original page on failure
- 🔧 Improved: Use sessionStorage to prevent redirect loops
- 📝 Improved: More detailed console log output

#### v1.0.0 (2025-11-15)
- 🎉 Initial release
- ✅ Support auto-conversion of various `zh-*` language codes to `zh-hans`
- ✅ Exclude `zh-CN`, `zh-cn`, and `zh-hans` from conversion
- ✅ Execute before document load to avoid page flickering

### 📄 License

This script is released under the MIT License and can be freely used and modified.

### 🤝 Feedback & Contribution

If you have any questions or suggestions, please leave feedback on the Greasyfork page.

---

## 技术细节 / Technical Details

### 正则表达式 / Regular Expression

**English language code pattern:**
```javascript
/\/en(?:\/|$)/gi
```
- `/en`: Matches `/en` in URL
- `(?:\/|$)`: Non-capturing group that matches either `/` or end of string
- `gi`: Global and case-insensitive flags

**Chinese language code pattern:**
```javascript
/\/zh-(?!hans\b|CN\b|cn\b)([a-zA-Z]{2,4})\b/gi
```

- `/zh-`: Matches `/zh-` in URL
- `(?!hans\b|CN\b|cn\b)`: Negative lookahead to exclude `hans`, `CN`, and `cn`
- `([a-zA-Z]{2,4})`: Captures 2-4 letter language codes
- `\b`: Word boundary to ensure complete match
- `gi`: Global and case-insensitive flags

### 404错误处理机制 / 404 Error Handling Mechanism

1. **Pre-check with XMLHttpRequest**: Sends a HEAD request to check if target URL exists
2. **SessionStorage tracking**: Prevents infinite redirect loops
3. **Fallback on error**: Returns to original page if 404 detected
4. **CORS handling**: If pre-check fails due to CORS, still attempts redirect

### 兼容性 / Compatibility

- ✅ Chrome / Chromium
- ✅ Firefox
- ✅ Edge
- ✅ Safari (with Tampermonkey or Userscripts)
- ✅ Opera

### 性能 / Performance

- Minimal performance impact
- Runs only once per page load
- No continuous monitoring or polling
- Uses native `window.location.replace()` for instant redirection
