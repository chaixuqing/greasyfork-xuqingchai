// Test script to debug Wikipedia API calls
const https = require('https');

function testWikipediaAPI(lang, title) {
    const encodedTitle = encodeURIComponent(title);
    const apiUrl = `https://${lang}.wikipedia.org/w/api.php?` +
        `action=query&` +
        `format=json&` +
        `prop=langlinks&` +
        `titles=${encodedTitle}&` +
        `lllang=zh&` +
        `llprop=url&` +
        `redirects=1&` +
        `origin=*`;

    console.log(`\n${'='.repeat(80)}`);
    console.log(`Testing: ${lang} - "${title}"`);
    console.log(`API URL: ${apiUrl}`);
    console.log('='.repeat(80));

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
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
                console.log('\nAPI Response:');
                console.log(JSON.stringify(json, null, 2));

                const pages = json.query.pages;
                const pageId = Object.keys(pages)[0];

                if (pageId === '-1') {
                    console.log('\n❌ ERROR: Page does not exist');
                    return;
                }

                const page = pages[pageId];
                console.log(`\n✓ Page found: ${page.title}`);

                if (page.langlinks && page.langlinks.length > 0) {
                    const zhLink = page.langlinks[0];
                    console.log(`\n✓ Chinese Wikipedia URL: ${zhLink.url}`);

                    const zhTitleMatch = zhLink.url.match(/\/wiki\/(.+?)(?:\?|#|$)/);
                    if (zhTitleMatch) {
                        const zhTitle = zhTitleMatch[1];
                        console.log(`✓ Chinese Title (encoded): ${zhTitle}`);
                        console.log(`✓ Chinese Title (decoded): ${decodeURIComponent(zhTitle)}`);
                        console.log(`\n✓ Target Wikiwand URL: https://www.wikiwand.com/zh-cn/articles/${zhTitle}`);
                    }
                } else {
                    console.log('\n❌ No Chinese language link found');
                }
            } catch (error) {
                console.error('Error parsing response:', error);
            }
        });
    }).on('error', (error) => {
        console.error('Request error:', error);
    });
}

// Test Case 1: Portuguese
testWikipediaAPI('pt', 'Natsume Yūjin-chō');

// Wait a bit before next test
setTimeout(() => {
    // Test Case 2: English
    testWikipediaAPI('en', "Natsume's Book of Friends");
}, 2000);
