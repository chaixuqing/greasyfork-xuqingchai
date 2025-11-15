// ==UserScript==
// @name         Wikipedia 自动跳转到简体中文
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  自动将其他语言的 Wikipedia 页面重定向到对应的简体中文页面
// @author       You
// @match        https://*.wikipedia.org/wiki/*
// @exclude      https://zh.wikipedia.org/*
// @icon         https://www.wikipedia.org/static/favicon/wikipedia.ico
// @grant        GM_xmlhttpRequest
// @connect      *.wikipedia.org
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 获取当前页面的语言代码
    const currentUrl = window.location.href;
    const urlMatch = currentUrl.match(/^https:\/\/([a-z\-]+)\.wikipedia\.org\/wiki\/(.+?)(?:\?|#|$)/);
    
    if (!urlMatch) {
        return; // 不是标准的 Wikipedia 文章页面
    }
    
    const currentLang = urlMatch[1];
    const pageTitleEncoded = urlMatch[2];
    const pageTitle = decodeURIComponent(pageTitleEncoded);
    
    // 如果已经是中文 Wikipedia，不做处理
    if (currentLang === 'zh') {
        return;
    }
    
    console.log('[Wikipedia 简体中文重定向] 当前语言:', currentLang);
    console.log('[Wikipedia 简体中文重定向] 页面标题:', pageTitle);
    console.log('[Wikipedia 简体中文重定向] 原始标题:', pageTitleEncoded);
    
    // 使用 Wikipedia API 获取语言链接
    // 使用解码后的标题，因为 API 接受未编码的标题
    const apiUrl = `https://${currentLang}.wikipedia.org/w/api.php?` +
        `action=query&` +
        `format=json&` +
        `prop=langlinks&` +
        `titles=${encodeURIComponent(pageTitle.replace(/_/g, ' '))}&` +
        `lllang=zh&` +
        `llprop=url&` +
        `redirects=1&` +
        `origin=*`;
    
    console.log('[Wikipedia 简体中文重定向] API URL:', apiUrl);
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: apiUrl,
        onload: function(response) {
            try {
                console.log('[Wikipedia 简体中文重定向] API 响应:', response.responseText);
                const data = JSON.parse(response.responseText);
                const pages = data.query.pages;
                const pageId = Object.keys(pages)[0];
                
                console.log('[Wikipedia 简体中文重定向] Page ID:', pageId);
                
                if (pageId === '-1') {
                    console.log('[Wikipedia 简体中文重定向] 页面不存在');
                    showNotification('原始页面不存在', 'error');
                    return;
                }
                
                const page = pages[pageId];
                console.log('[Wikipedia 简体中文重定向] 页面数据:', page);
                
                if (page.langlinks && page.langlinks.length > 0) {
                    const zhLink = page.langlinks[0];
                    let zhUrl = zhLink.url;
                    
                    console.log('[Wikipedia 简体中文重定向] 原始中文链接:', zhUrl);
                    
                    // 确保使用简体中文变体 (zh-hans)
                    // Wikipedia 的语言链接可能指向 https://zh.wikipedia.org/wiki/...
                    // 我们需要添加 ?variant=zh-hans 或修改 URL 以强制简体中文
                    if (zhUrl.includes('zh.wikipedia.org')) {
                        // 移除可能存在的其他 variant 参数
                        zhUrl = zhUrl.split('?')[0].split('#')[0];
                        // 添加简体中文变体参数
                        zhUrl += '?variant=zh-hans';
                    }
                    
                    console.log('[Wikipedia 简体中文重定向] 目标 URL:', zhUrl);
                    
                    // 直接重定向，不进行验证
                    // Wikipedia API 返回的语言链接都是有效的
                    console.log('[Wikipedia 简体中文重定向] 正在跳转到简体中文页面...');
                    window.location.replace(zhUrl);
                } else {
                    console.log('[Wikipedia 简体中文重定向] 未找到简体中文版本');
                    showNotification('此页面暂无简体中文版本，继续浏览当前页面', 'warning');
                }
            } catch (error) {
                console.error('[Wikipedia 简体中文重定向] 错误:', error);
                showNotification('处理时出错: ' + error.message, 'error');
            }
        },
        onerror: function(error) {
            console.error('[Wikipedia 简体中文重定向] 请求失败:', error);
            showNotification('API 请求失败', 'error');
        }
    });
    
    // 显示通知消息
    function showNotification(message, type = 'info') {
        // 确保 DOM 已加载
        const addNotification = () => {
            // 创建通知元素
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                background-color: ${type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
                color: white;
                border-radius: 4px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                z-index: 10000;
                font-family: Arial, sans-serif;
                font-size: 14px;
                max-width: 300px;
                animation: slideIn 0.3s ease-out;
            `;
            notification.textContent = message;
            
            // 添加动画样式
            if (!document.getElementById('wiki-redirect-notification-style')) {
                const style = document.createElement('style');
                style.id = 'wiki-redirect-notification-style';
                style.textContent = `
                    @keyframes slideIn {
                        from {
                            transform: translateX(400px);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                    @keyframes slideOut {
                        from {
                            transform: translateX(0);
                            opacity: 1;
                        }
                        to {
                            transform: translateX(400px);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            document.body.appendChild(notification);
            
            // 3秒后自动消失
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        };
        
        if (document.body) {
            addNotification();
        } else {
            document.addEventListener('DOMContentLoaded', addNotification);
        }
    }
})();
