# Greasyfork Userscript Collection

A collection of Tampermonkey/Greasemonkey userscripts for enhancing web browsing experience with automatic language redirection and text conversion.

## 📁 Project Structure

This repository is organized into three main folders, each containing a complete userscript with its documentation and tests:

```
greasyfork-xuqingchai/
├── wikiwand-redirect/          # Wikiwand automatic Chinese redirect
│   ├── wikiwand-to-zh-hans.js
│   ├── README.md
│   ├── CHANGELOG-v1.2.0.md
│   ├── test-api-user-agent.js
│   ├── run-comprehensive-test.js
│   └── test-entries.js
│
├── wikipedia-redirect/         # Wikipedia automatic Chinese redirect
│   ├── wikipedia-to-zh-hans.js
│   ├── README.md
│   ├── test-wikipedia-api.js
│   ├── run-comprehensive-test.js
│   └── test-entries.js
│
└── schinese-converter/         # Simplified Chinese text converter
    ├── make all web pages to schinese.js
    └── README.md
```

## 🚀 Scripts Overview

### 1. Wikiwand Redirect (wikiwand-redirect/)

**Latest Version:** 1.2.1

Automatically redirects non-Chinese Wikiwand articles to their Simplified Chinese versions using Wikipedia's MediaWiki API.

**Key Features:**
- Automatic language detection and redirection
- Wikipedia API integration for accurate Chinese article lookup
- User-Agent header for API compliance
- Smart fallback to original language if no Chinese version exists
- Visual notifications for user feedback
- Optimized performance with direct redirects

**Installation:**
```bash
# Install in Tampermonkey from:
wikiwand-redirect/wikiwand-to-zh-hans.js
```

**Documentation:**
- [README](wikiwand-redirect/README.md) - Usage and features
- [CHANGELOG](wikiwand-redirect/CHANGELOG-v1.2.0.md) - Version history

**Testing:**
```bash
cd wikiwand-redirect
node run-comprehensive-test.js
```

---

### 2. Wikipedia Redirect (wikipedia-redirect/)

Automatically redirects non-Chinese Wikipedia articles to their Simplified Chinese versions.

**Key Features:**
- Direct Wikipedia article redirection
- MediaWiki API integration
- Comprehensive language support
- Fallback behavior for articles without Chinese versions

**Installation:**
```bash
# Install in Tampermonkey from:
wikipedia-redirect/wikipedia-to-zh-hans.js
```

**Documentation:**
- [README](wikipedia-redirect/README.md)
- [API Test Report](wikipedia-redirect/WIKIPEDIA-API-TEST-REPORT.md)

**Testing:**
```bash
cd wikipedia-redirect
node run-comprehensive-test.js
```

---

### 3. Simplified Chinese Converter (schinese-converter/)

Converts all text on web pages to Simplified Chinese characters.

**Key Features:**
- Real-time text conversion
- Works on any website
- Traditional to Simplified Chinese conversion

**Installation:**
```bash
# Install in Tampermonkey from:
schinese-converter/make all web pages to schinese.js
```

**Documentation:**
- [README](schinese-converter/README.md)

---

## 🛠️ Development

### Prerequisites

- **Node.js** (for running tests)
- **Tampermonkey** or **Greasemonkey** browser extension

### Running Tests

Each script folder contains its own test suite:

```bash
# Wikiwand redirect tests
cd wikiwand-redirect
node run-comprehensive-test.js

# Wikipedia redirect tests
cd wikipedia-redirect
node run-comprehensive-test.js
```

### Test Coverage

- **44 test cases** across 11 languages
- Categories: Anime/Manga, Geography, Culture, History, Science, Technology
- Languages: en, pt, ja, de, fr, es, it, ru, ar, ko, nl, hi, th, vi

---

## 📝 License

See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Choose the script folder you want to modify
2. Make changes to the script
3. Update the corresponding README if needed
4. Run the test suite to ensure everything works
5. Submit a pull request

---

## 📚 Additional Documentation

- [INDEX.md](INDEX.md) - Detailed file index
- [ORGANIZATION.md](ORGANIZATION.md) - Repository organization guide
- [ORGANIZATION-VISUAL.md](ORGANIZATION-VISUAL.md) - Visual organization diagram

---

## 🔗 Quick Links

| Script | Direct Link | Version | Status |
|--------|------------|---------|--------|
| Wikiwand Redirect | [Install](wikiwand-redirect/wikiwand-to-zh-hans.js) | 1.2.1 | ✅ Active |
| Wikipedia Redirect | [Install](wikipedia-redirect/wikipedia-to-zh-hans.js) | - | ✅ Active |
| SChinese Converter | [Install](schinese-converter/make%20all%20web%20pages%20to%20schinese.js) | - | ✅ Active |

---

## 🐛 Known Issues & Solutions

### Wikiwand Redirect
- **Issue:** "API 请求失败" error
- **Solution:** Ensure all `@connect` domains are listed in the script header
- **Fixed in:** v1.2.1

### Performance
- Redirect time: < 1 second (optimized in v1.2.1)
- API response cache: Not yet implemented

---

## 📧 Contact

For issues, please open a GitHub issue in the appropriate folder's context.

---

**Repository:** [greasyfork-xuqingchai](https://github.com/chaixuqing/greasyfork-xuqingchai)
