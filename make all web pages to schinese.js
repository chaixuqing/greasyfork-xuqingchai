// ==UserScript==
// @name         自动转换为简体中文 (zh-hans/zh-CN/zh-cn)
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  自动将 URL 中的 zh-* 语言代码替换为 zh-hans 并重定向到简体中文页面
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 获取当前 URL
    const currentUrl = window.location.href;
    
    // 正则表达式匹配 zh- 后跟任意字符的模式
    // 排除 zh-hans, zh-CN, zh-cn
    // 匹配 zh-hk, zh-tw, zh-sg, zh-mo, zh-hant 等
    const zhPattern = /\/zh-(?!hans\b|CN\b|cn\b)([a-zA-Z]{2,4})\b/gi;
    
    // 检查 URL 是否包含需要替换的 zh-* 模式
    if (zhPattern.test(currentUrl)) {
        // 将所有 zh-* (除了 zh-CN, zh-cn, zh-hans) 替换为 zh-hans
        const newUrl = currentUrl.replace(/\/zh-(?!hans\b|CN\b|cn\b)([a-zA-Z]{2,4})\b/gi, '/zh-hans');
        
        // 如果 URL 发生了变化,则重定向
        if (newUrl !== currentUrl) {
            console.log('[简体中文重定向] 原始 URL:', currentUrl);
            console.log('[简体中文重定向] 新 URL:', newUrl);
            window.location.replace(newUrl);
        }
    }
})();