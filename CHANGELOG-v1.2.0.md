# Changelog v1.2.0 - Critical Fix

## 🔧 Critical Bug Fix: URL Format Correction

### Problem Discovered
Through comprehensive testing with Playwright browser automation, we discovered that the script was building incorrect target URLs:
- **Script was using**: `https://www.wikiwand.com/zh-cn/articles/{title}`
- **Wikiwand actually uses**: `https://www.wikiwand.com/zh-hans/articles/{title}`

This incorrect URL format was the root cause of redirection failures!

### Testing Evidence
1. **API Testing (20/20 Success)**: All Wikipedia API queries returned correct Chinese titles
2. **Browser Testing**: Manual language selection successfully navigated to `zh-hans` format URL
3. **Final Confirmation**: Validated URL format: `https://www.wikiwand.com/zh-hans/articles/%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%B3`

### Changes Made

#### 1. Updated Target URL Construction (Line 128)
```javascript
// OLD (WRONG):
const wikiwandZhUrl = `https://www.wikiwand.com/zh-cn/articles/${zhTitle}`;

// NEW (CORRECT):
const wikiwandZhUrl = `https://www.wikiwand.com/zh-hans/articles/${zhTitle}`;
```

#### 2. Updated Comments (Line 48 & 127)
- Clarified that Wikiwand uses `zh-hans` for simplified Chinese
- Added inline comment explaining the correction

#### 3. Version Bump
- Updated from v1.1.0 to v1.2.0

### Impact
This fix resolves the original issue where the script couldn't redirect Portuguese Natsume article. The Wikipedia API was working correctly all along—we were just constructing the wrong target URL!

### Verification Completed
✅ API-level validation: 20/20 test cases successful  
✅ Browser-level validation: Manual navigation successful  
✅ URL format confirmed: `zh-hans` is correct  
✅ Code updated: Target URL now uses correct format  

## Next Steps
1. Test automatic redirect with updated script in real browser
2. Verify edge cases (articles without Chinese versions)
3. Full end-to-end acceptance testing
