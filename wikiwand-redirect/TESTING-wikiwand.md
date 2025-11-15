# Wikiwand Script Testing Guide

## Summary of Changes

I've created and improved the Wikiwand redirect script with the following enhancements:

### Version 1.1.0 Improvements:

1. **Better Verification Method**
   - Changed from `HEAD` to `GET` request for more reliable page verification
   - Added 5-second timeout to prevent hanging
   - Better error detection (checks for 404 content in response)

2. **Faster Execution**
   - Changed `@run-at` from `document-end` to `document-start`
   - Runs earlier to redirect before page fully loads

3. **Duplicate Execution Prevention**
   - Added `window.wikiwandRedirectProcessed` flag
   - Prevents script from running multiple times on same page

4. **Robust Fallback**
   - If verification fails, script still attempts redirect based on Wikipedia API
   - If timeout occurs, assumes page exists and redirects
   - Better handling of network errors

## How to Test

### Method 1: Install in Tampermonkey and Test Manually

1. **Install the script:**
   - Open Tampermonkey
   - Click "Create a new script"
   - Copy the content from `wikiwand-to-zh-hans.js`
   - Save (Ctrl+S)

2. **Test with these URLs:**
   
   **Test Case 1: Portuguese**
   ```
   https://www.wikiwand.com/pt/articles/Natsume_Yūjin-chō
   ```
   Expected result: Redirects to `https://www.wikiwand.com/zh-cn/articles/夏目友人帳`

   **Test Case 2: Portuguese with encoded characters**
   ```
   https://www.wikiwand.com/pt/articles/Natsume_Y%C5%ABjin-ch%C5%8D
   ```
   Expected result: Redirects to `https://www.wikiwand.com/zh-cn/articles/夏目友人帳`

   **Test Case 3: English**
   ```
   https://www.wikiwand.com/en/articles/Natsume's_Book_of_Friends
   ```
   Expected result: Redirects to `https://www.wikiwand.com/zh-cn/articles/夏目友人帳`

3. **Check Console Logs:**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for messages starting with `[Wikiwand 简体中文重定向]`

### Method 2: Test Logic with HTML Test Page

1. **Open test page:**
   ```
   file:///d:/alll-github-repo/greasyfork-xuqingchai/test-wikiwand-redirect.html
   ```

2. **Click "Run Test" buttons:**
   - Test Case 1: Portuguese URL
   - Test Case 2: English URL
   - Test Case 3: Encoded URL

3. **Verify output:**
   - Check that Chinese Wikipedia URL is found
   - Check that target Wikiwand URL is correct
   - Note: CORS errors in verification are expected (userscript bypasses this)

### Method 3: Test API with Node.js

1. **Run the API test:**
   ```bash
   cd d:\alll-github-repo\greasyfork-xuqingchai
   node test-wikipedia-api.js
   ```

2. **Expected output:**
   ```
   ✓ Page found: Natsume Yūjin-chō
   ✓ Chinese Wikipedia URL: https://zh.wikipedia.org/wiki/%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%B3
   ✓ Chinese Title (decoded): 夏目友人帳
   ✓ Target Wikiwand URL: https://www.wikiwand.com/zh-cn/articles/%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%B3
   ```

## Debugging Tips

### Script is not running:

1. Check Tampermonkey icon - should show "1" indicating script is active
2. Open Console and check for any JavaScript errors
3. Verify URL matches pattern: `https://www.wikiwand.com/*/articles/*`
4. Make sure URL is NOT already `zh-cn` or `zh-hans`

### Script runs but doesn't redirect:

1. Check Console logs for `[Wikiwand 简体中文重定向]` messages
2. Look for API response in logs
3. Check if Chinese page exists in Wikipedia
4. Verify the constructed target URL is correct

### Notification messages:

- **"正在查找简体中文版本..."** - Script is running, API call in progress
- **"找到简体中文版本，正在跳转..."** - Success! Redirect will happen in 0.5s
- **"此页面暂无简体中文版本，继续浏览当前页面"** - No Chinese version found
- **"简体中文页面不存在，继续浏览当前页面"** - Target page returned 404

## What the Script Does Step-by-Step

1. **Parse URL** → Extract language code and article slug
2. **Decode slug** → Convert URL encoding to readable text
3. **Map language** → Convert Wikiwand language to Wikipedia language
4. **Query API** → Ask Wikipedia for Chinese language link
5. **Extract title** → Get Chinese title from Wikipedia URL
6. **Build URL** → Create Wikiwand Chinese URL with Chinese title
7. **Verify** → Check if target page exists (with fallback)
8. **Redirect** → Jump to Chinese page (if exists) or stay (if not)

## Expected Behavior

### Successful Redirect:
1. Visit: `https://www.wikiwand.com/pt/articles/Natsume_Yūjin-chō`
2. Script runs immediately (document-start)
3. Brief notification appears: "正在查找简体中文版本..."
4. Another notification: "找到简体中文版本，正在跳转..."
5. Page redirects to: `https://www.wikiwand.com/zh-cn/articles/夏目友人帳`

### No Chinese Version:
1. Visit non-Chinese Wikiwand page
2. Script runs
3. Notification: "此页面暂无简体中文版本，继续浏览当前页面"
4. Stay on current page

### Already Chinese:
1. Visit: `https://www.wikiwand.com/zh-cn/articles/夏目友人帳`
2. Script checks language → detects `zh-cn`
3. Exits immediately, no redirect

## Files Created/Modified

- ✅ `wikiwand-to-zh-hans.js` - Main userscript (v1.1.0)
- ✅ `test-wikiwand-redirect.html` - Browser-based test page
- ✅ `test-wikipedia-api.js` - Node.js API test script
- ✅ `README-wikiwand-to-zh-hans.md` - Full documentation

## Next Steps

1. Test the script with real Wikiwand pages
2. Check console logs to verify behavior
3. Report any issues or edge cases
4. Consider adding more language mappings if needed
