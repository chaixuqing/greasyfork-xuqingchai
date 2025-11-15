// Comprehensive test script for Wikiwand redirect
const https = require('https');

// Test cases with different languages and articles
const testCases = [
    // Japanese articles
    { lang: 'ja', title: 'ドラえもん', expectedZh: '哆啦A夢', description: 'Japanese: Doraemon' },
    { lang: 'ja', title: '東京', expectedZh: '東京', description: 'Japanese: Tokyo' },
    { lang: 'ja', title: '桜', expectedZh: '櫻', description: 'Japanese: Sakura (Cherry Blossom)' },
    
    // English articles
    { lang: 'en', title: 'Python (programming language)', expectedZh: 'Python', description: 'English: Python programming' },
    { lang: 'en', title: 'Tokyo', expectedZh: '東京', description: 'English: Tokyo' },
    { lang: 'en', title: 'Machine learning', expectedZh: '机器学习', description: 'English: Machine Learning' },
    { lang: 'en', title: 'Albert Einstein', expectedZh: '阿尔伯特·爱因斯坦', description: 'English: Einstein' },
    
    // German articles
    { lang: 'de', title: 'Berlin', expectedZh: '柏林', description: 'German: Berlin' },
    { lang: 'de', title: 'Wolfgang Amadeus Mozart', expectedZh: '沃尔夫冈·阿马德乌斯·莫扎特', description: 'German: Mozart' },
    
    // French articles
    { lang: 'fr', title: 'Paris', expectedZh: '巴黎', description: 'French: Paris' },
    { lang: 'fr', title: 'Tour Eiffel', expectedZh: '艾菲爾鐵塔', description: 'French: Eiffel Tower' },
    
    // Spanish articles
    { lang: 'es', title: 'Madrid', expectedZh: '马德里', description: 'Spanish: Madrid' },
    { lang: 'es', title: 'Pablo Picasso', expectedZh: '巴布罗·毕加索', description: 'Spanish: Picasso' },
    
    // Portuguese articles
    { lang: 'pt', title: 'Brasil', expectedZh: '巴西', description: 'Portuguese: Brazil' },
    { lang: 'pt', title: 'Natsume Yūjin-chō', expectedZh: '夏目友人帳', description: 'Portuguese: Natsume' },
    
    // Korean articles
    { lang: 'ko', title: '서울', expectedZh: '首尔', description: 'Korean: Seoul' },
    { lang: 'ko', title: 'K-pop', expectedZh: 'K-pop', description: 'Korean: K-pop' },
    
    // Russian articles
    { lang: 'ru', title: 'Москва', expectedZh: '莫斯科', description: 'Russian: Moscow' },
    
    // Italian articles
    { lang: 'it', title: 'Roma', expectedZh: '罗马', description: 'Italian: Rome' },
    
    // Dutch articles
    { lang: 'nl', title: 'Amsterdam', expectedZh: '阿姆斯特丹', description: 'Dutch: Amsterdam' },
];

let successCount = 0;
let failCount = 0;
let totalTests = testCases.length;

function testWikipediaAPI(testCase, index) {
    return new Promise((resolve) => {
        const { lang, title, expectedZh, description } = testCase;
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
        console.log(`Test ${index + 1}/${totalTests}: ${description}`);
        console.log(`Language: ${lang} | Title: ${title}`);
        console.log('='.repeat(80));

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
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
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];

                    if (pageId === '-1') {
                        console.log('❌ FAIL: Page does not exist in source language');
                        failCount++;
                        resolve();
                        return;
                    }

                    const page = pages[pageId];
                    
                    if (page.langlinks && page.langlinks.length > 0) {
                        const zhLink = page.langlinks[0];
                        const zhWikiUrl = zhLink.url;
                        const zhTitleMatch = zhWikiUrl.match(/\/wiki\/(.+?)(?:\?|#|$)/);
                        
                        if (zhTitleMatch) {
                            const zhTitleEncoded = zhTitleMatch[1];
                            const zhTitleDecoded = decodeURIComponent(zhTitleEncoded);
                            const wikiwandUrl = `https://www.wikiwand.com/zh-cn/articles/${zhTitleEncoded}`;
                            
                            console.log(`✅ SUCCESS`);
                            console.log(`   Source: https://www.wikiwand.com/${lang}/articles/${encodeURIComponent(title.replace(/ /g, '_'))}`);
                            console.log(`   Target: ${wikiwandUrl}`);
                            console.log(`   Chinese Title: ${zhTitleDecoded}`);
                            console.log(`   Expected: ${expectedZh}`);
                            
                            successCount++;
                        } else {
                            console.log('❌ FAIL: Could not extract Chinese title');
                            failCount++;
                        }
                    } else {
                        console.log('⚠️  WARN: No Chinese language link found');
                        failCount++;
                    }
                } catch (error) {
                    console.error('❌ FAIL: Error parsing response:', error.message);
                    failCount++;
                }
                resolve();
            });
        }).on('error', (error) => {
            console.error('❌ FAIL: Request error:', error.message);
            failCount++;
            resolve();
        });
    });
}

async function runAllTests() {
    console.log('\n' + '═'.repeat(80));
    console.log('🧪 WIKIWAND REDIRECT COMPREHENSIVE TEST SUITE');
    console.log('═'.repeat(80));
    console.log(`Total test cases: ${totalTests}`);
    console.log(`Testing ${new Set(testCases.map(tc => tc.lang)).size} different languages`);
    console.log('═'.repeat(80));

    for (let i = 0; i < testCases.length; i++) {
        await testWikipediaAPI(testCases[i], i);
        // Small delay between requests to be nice to Wikipedia
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log('\n' + '═'.repeat(80));
    console.log('📊 TEST SUMMARY');
    console.log('═'.repeat(80));
    console.log(`✅ Successful: ${successCount}/${totalTests} (${(successCount/totalTests*100).toFixed(1)}%)`);
    console.log(`❌ Failed: ${failCount}/${totalTests} (${(failCount/totalTests*100).toFixed(1)}%)`);
    console.log('═'.repeat(80));
    
    if (successCount === totalTests) {
        console.log('🎉 ALL TESTS PASSED!');
    } else if (successCount > totalTests * 0.8) {
        console.log('✅ MOST TESTS PASSED - Good coverage');
    } else {
        console.log('⚠️  SOME TESTS FAILED - Review needed');
    }
}

runAllTests();
