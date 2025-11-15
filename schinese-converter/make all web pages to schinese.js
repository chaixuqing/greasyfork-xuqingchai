// ==UserScript==
// @name         自动转换为简体中文 (zh-hans/zh-CN/zh-cn)
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  自动将 URL 中的 en 和 zh-* 语言代码替换为 zh-hans 并重定向到简体中文页面，若404则返回原页面
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 从 sessionStorage 中读取标记，避免无限重定向
    const redirectAttempted = sessionStorage.getItem('zh-hans-redirect-attempted');
    const originalUrl = sessionStorage.getItem('zh-hans-original-url');

    // 获取当前 URL
    const currentUrl = window.location.href;
    
    // 如果当前页面是404页面，并且之前有重定向尝试，则返回原始页面
    if (redirectAttempted === 'true' && originalUrl) {
        // 检测404页面的常见特征
        const is404 = document.title.includes('404') || 
                      document.title.includes('Not Found') || 
                      document.title.includes('页面不存在') ||
                      document.title.includes('找不到');
        
        if (is404) {
            console.log('[简体中文重定向] 检测到404错误，返回原始页面:', originalUrl);
            sessionStorage.removeItem('zh-hans-redirect-attempted');
            sessionStorage.removeItem('zh-hans-original-url');
            window.location.replace(originalUrl);
            return;
        }
        
        // 如果页面加载成功，清除标记
        sessionStorage.removeItem('zh-hans-redirect-attempted');
        sessionStorage.removeItem('zh-hans-original-url');
    }
    
    // 如果已经尝试过重定向，不再尝试
    if (redirectAttempted === 'true' && currentUrl === originalUrl) {
        sessionStorage.removeItem('zh-hans-redirect-attempted');
        sessionStorage.removeItem('zh-hans-original-url');
        return;
    }
    
    let newUrl = currentUrl;
    let needsRedirect = false;
    
    // 1. 检查并替换 /en 或 /en/ 为 /zh-hans
    // 匹配 /en/ 或 /en（在路径中，不在域名中）
    const enPattern = /\/en(?:\/|$)/gi;
    if (enPattern.test(currentUrl)) {
        newUrl = currentUrl.replace(/\/en(?=\/|$)/gi, '/zh-hans');
        needsRedirect = true;
        console.log('[简体中文重定向] 检测到 /en，准备替换为 /zh-hans');
    }
    
    // 2. 检查并替换 zh-* 语言代码（排除 zh-hans, zh-CN, zh-cn）
    const zhPattern = /\/zh-(?!hans\b|CN\b|cn\b)([a-zA-Z]{2,4})\b/gi;
    if (zhPattern.test(newUrl)) {
        newUrl = newUrl.replace(/\/zh-(?!hans\b|CN\b|cn\b)([a-zA-Z]{2,4})\b/gi, '/zh-hans');
        needsRedirect = true;
        console.log('[简体中文重定向] 检测到 zh-* 变体，准备替换为 /zh-hans');
    }
    
    // 如果 URL 发生了变化，则重定向
    if (needsRedirect && newUrl !== currentUrl) {
        console.log('[简体中文重定向] 原始 URL:', currentUrl);
        console.log('[简体中文重定向] 新 URL:', newUrl);
        
        // 保存原始 URL 和重定向标记
        sessionStorage.setItem('zh-hans-redirect-attempted', 'true');
        sessionStorage.setItem('zh-hans-original-url', currentUrl);
        
        // 使用 XMLHttpRequest 检查新 URL 是否存在
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', newUrl, true);
        xhr.onload = function() {
            if (xhr.status === 404) {
                console.log('[简体中文重定向] 目标页面不存在（404），保持原页面');
                sessionStorage.removeItem('zh-hans-redirect-attempted');
                sessionStorage.removeItem('zh-hans-original-url');
            } else {
                // 页面存在，执行重定向
                window.location.replace(newUrl);
            }
        };
        xhr.onerror = function() {
            // 如果检查失败，仍然尝试重定向（网络问题或CORS限制）
            console.log('[简体中文重定向] 无法检查目标页面状态，尝试重定向');
            window.location.replace(newUrl);
        };
        xhr.send();
    }
})();