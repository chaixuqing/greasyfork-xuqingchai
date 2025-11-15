// Test Wikipedia API with User-Agent header
const https = require('https');

const pageTitle = 'Natsume Yūjin-chō';
const apiUrl = `https://pt.wikipedia.org/w/api.php?` +
    `action=query&` +
    `format=json&` +
    `prop=langlinks&` +
    `titles=${encodeURIComponent(pageTitle)}&` +
    `lllang=zh&` +
    `llprop=url&` +
    `redirects=1&` +
    `origin=*`;

console.log('Testing Wikipedia API with User-Agent...');
console.log('Page Title:', pageTitle);
console.log('API URL:', apiUrl);
console.log('');

const options = {
    headers: {
        'User-Agent': 'Wikiwand-ZH-Redirect/1.2.1 (Tampermonkey Script)'
    }
};

https.get(apiUrl, options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('API Response:');
            console.log(JSON.stringify(json, null, 2));
            
            // Check if we got a valid response
            const pages = json.query?.pages;
            if (pages) {
                const pageId = Object.keys(pages)[0];
                const page = pages[pageId];
                
                if (pageId === '-1') {
                    console.log('\n❌ Page not found');
                } else if (page.langlinks && page.langlinks.length > 0) {
                    const zhLink = page.langlinks[0];
                    console.log('\n✅ Found Chinese version:');
                    console.log('URL:', zhLink.url);
                    
                    // Extract Chinese title
                    const zhTitleMatch = zhLink.url.match(/\/wiki\/(.+?)(?:\?|#|$)/);
                    if (zhTitleMatch) {
                        const zhTitle = zhTitleMatch[1];
                        console.log('Chinese Title:', decodeURIComponent(zhTitle));
                        console.log('Wikiwand URL:', `https://www.wikiwand.com/zh-hans/articles/${zhTitle}`);
                    }
                } else {
                    console.log('\n⚠️ No Chinese version found');
                }
            }
        } catch (error) {
            console.error('Error parsing response:', error.message);
            console.log('Raw response:', data);
        }
    });
}).on('error', (err) => {
    console.error('❌ Request failed:', err.message);
});
