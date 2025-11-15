# Greasyfork Scripts Collection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Compatible-brightgreen.svg)](https://www.tampermonkey.net/)

All the Tampermonkey userscripts I have published on [Greasyfork.org](https://greasyfork.org/).

## 📚 Scripts

### 1. Wikipedia 自动跳转到简体中文 (Wikipedia Auto Redirect to Simplified Chinese)

**Version:** 1.0.2 ✅ Production Ready

**Description:** Automatically redirects any language Wikipedia page to its corresponding Simplified Chinese version using the official Wikipedia API.

**Features:**
- 🌍 Supports all Wikipedia languages (300+)
- 🎯 Uses official Wikipedia API for accurate Chinese page titles
- ✅ Handles special characters (apostrophes, umlauts, non-Latin scripts)
- 🔄 Forces Simplified Chinese variant (`?variant=zh-hans`)
- ⚡ Fast and reliable redirection
- 📊 100% tested success rate across multiple languages

**Folder:** [`wikipedia-redirect/`](./wikipedia-redirect/)

**Key Files:**
- Script: [`wikipedia-to-zh-hans.js`](./wikipedia-redirect/wikipedia-to-zh-hans.js)
- Documentation: [`README-wikipedia-to-zh-hans.md`](./wikipedia-redirect/README-wikipedia-to-zh-hans.md)
- Test Report: [`WIKIPEDIA-API-TEST-REPORT.md`](./wikipedia-redirect/WIKIPEDIA-API-TEST-REPORT.md)
- Interactive Test: [`test-wikipedia-redirect.html`](./wikipedia-redirect/test-wikipedia-redirect.html)

**Tested Languages:** English, Japanese, German, Arabic, Spanish, French, Russian, Korean, and more!

---

### 2. Wikiwand 自动跳转到简体中文 (Wikiwand Auto Redirect to Simplified Chinese)

**Version:** 1.0.0

**Description:** Automatically redirects Wikiwand pages from other languages to Simplified Chinese version. Wikiwand is a beautiful Wikipedia reader interface.

**Features:**
- 🎨 Works with Wikiwand's beautiful interface
- 🌐 Supports multiple languages
- 🔄 Automatic redirection to zh-cn variant
- ⚡ Fast and seamless

**Folder:** [`wikiwand-redirect/`](./wikiwand-redirect/)

**Key Files:**
- Script: [`wikiwand-to-zh-hans.js`](./wikiwand-redirect/wikiwand-to-zh-hans.js)
- Documentation: [`README-wikiwand-to-zh-hans.md`](./wikiwand-redirect/README-wikiwand-to-zh-hans.md)
- Interactive Test: [`test-wikiwand-redirect.html`](./wikiwand-redirect/test-wikiwand-redirect.html)

---

### 3. 自动转换为简体中文 (Auto Convert to Simplified Chinese)

**Version:** 1.0.0

**Description:** Automatically converts various Chinese language codes in webpage URLs to Simplified Chinese (`zh-hans`) and redirects to the Simplified Chinese page.

**Features:**
- 🔄 Auto-redirects `zh-hk`, `zh-tw`, `zh-hant`, `zh-sg`, `zh-mo` to `zh-hans`
- ✅ Preserves `zh-CN`, `zh-cn`, and `zh-hans` unchanged
- ⚡ Runs at document start to avoid page flickering
- 🌐 Works on all websites

**Folder:** [`schinese-converter/`](./schinese-converter/)

**Key Files:**
- Script: [`make all web pages to schinese.js`](./schinese-converter/make%20all%20web%20pages%20to%20schinese.js)
- Documentation: [`README-make all web pages to schinese.md`](./schinese-converter/README-make%20all%20web%20pages%20to%20schinese.md)

---

## � Repository Structure

```
greasyfork-xuqingchai/
├── wikipedia-redirect/          # Wikipedia 简体中文重定向脚本
│   ├── wikipedia-to-zh-hans.js
│   ├── README.md
│   ├── README-wikipedia-to-zh-hans.md
│   ├── test-wikipedia-redirect.html
│   ├── test-wikipedia-api.js
│   ├── test-entries.js
│   ├── run-comprehensive-test.js
│   ├── INDEX.md
│   ├── TEST-SUMMARY.md
│   ├── WIKIPEDIA-API-TEST-REPORT.md
│   └── TESTING-WORKFLOW-DIAGRAM.md
│
├── wikiwand-redirect/           # Wikiwand 简体中文重定向脚本
│   ├── wikiwand-to-zh-hans.js
│   ├── README.md
│   ├── README-wikiwand-to-zh-hans.md
│   ├── test-wikiwand-redirect.html
│   ├── test-comprehensive-wikiwand.js
│   └── TESTING-wikiwand.md
│
├── schinese-converter/          # 通用简体中文 URL 转换器
│   ├── make all web pages to schinese.js
│   ├── README.md
│   └── README-make all web pages to schinese.md
│
├── README.md                    # 本文件
├── LICENSE
└── CHANGELOG-v1.2.0.md
```

---

## �🔧 Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Navigate to the folder of the script you want to use
3. Open the `.js` file and copy its contents
4. Create a new script in Tampermonkey and paste the code
5. Save and enable the script
6. Done! The script will run automatically

**Alternative:** Install directly from Greasyfork when published.

---

## 🌐 Supported Browsers

- ✅ Chrome / Chromium
- ✅ Firefox
- ✅ Microsoft Edge
- ✅ Safari (with Tampermonkey or Userscripts)
- ✅ Opera

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

**chaixuqing**

- GitHub: [@chaixuqing](https://github.com/chaixuqing)
- Greasyfork: https://greasyfork.org/zh-CN/scripts/555885-%E8%87%AA%E5%8A%A8%E8%BD%AC%E6%8D%A2%E4%B8%BA%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-zh-hans

## ⭐ Show Your Support

Give a ⭐️ if these scripts helped you!

## 📝 Notes

- All scripts are regularly maintained and updated
- Feedback and suggestions are always welcome
- Please report any bugs or issues in the Issues section
