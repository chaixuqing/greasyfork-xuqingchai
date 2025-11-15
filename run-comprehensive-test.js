// Comprehensive Wikipedia API Test Runner
const https = require('https');
const testEntries = require('./test-entries.js');

function testWikipediaAPI(lang, title) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://${lang}.wikipedia.org/w/api.php?` +
            `action=query&format=json&prop=langlinks&` +
            `titles=${encodeURIComponent(title.replace(/_/g, ' '))}&` +
            `lllang=zh&llprop=url&redirects=1&origin=*`;
        
        https.get(apiUrl, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    const page = pages[pageId];
                    
                    if (pageId === '-1') {
                        resolve({
                            success: false,
                            error: 'Page not found',
                            pageId: null
                        });
                    } else if (page.langlinks && page.langlinks.length > 0) {
                        const zhLink = page.langlinks[0];
                        resolve({
                            success: true,
                            pageId,
                            pageTitle: page.title,
                            zhUrl: zhLink.url,
                            zhTitle: zhLink['*'],
                            zhTitleEncoded: zhLink.url.match(/\/wiki\/(.+?)(?:\?|#|$)/)?.[1]
                        });
                    } else {
                        resolve({
                            success: false,
                            error: 'No Chinese version',
                            pageId,
                            pageTitle: page.title
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function runTests() {
    console.log('\n' + '='.repeat(100));
    console.log('Wikipedia API 多语言多条目综合测试');
    console.log('='.repeat(100));
    console.log(`\n总测试数: ${testEntries.length}`);
    console.log('开始测试时间:', new Date().toLocaleString('zh-CN'));
    console.log('');
    
    const results = {
        total: 0,
        success: 0,
        noZh: 0,
        notFound: 0,
        error: 0,
        byCategory: {},
        byLanguage: {},
        details: []
    };
    
    for (let i = 0; i < testEntries.length; i++) {
        const entry = testEntries[i];
        const { lang, title, category } = entry;
        
        results.total++;
        
        // Initialize category stats
        if (!results.byCategory[category]) {
            results.byCategory[category] = { total: 0, success: 0, noZh: 0, notFound: 0, error: 0 };
        }
        results.byCategory[category].total++;
        
        // Initialize language stats
        if (!results.byLanguage[lang]) {
            results.byLanguage[lang] = { total: 0, success: 0, noZh: 0, notFound: 0, error: 0 };
        }
        results.byLanguage[lang].total++;
        
        process.stdout.write(`\n[${i + 1}/${testEntries.length}] ${lang}:${title.substring(0, 40)}... `);
        
        try {
            const result = await testWikipediaAPI(lang, title);
            
            if (result.success) {
                console.log('✅');
                console.log(`    └─ 中文: ${result.zhTitle}`);
                console.log(`    └─ 链接: ${result.zhUrl}`);
                results.success++;
                results.byCategory[category].success++;
                results.byLanguage[lang].success++;
                results.details.push({ ...entry, ...result, status: 'success' });
            } else if (result.error === 'No Chinese version') {
                console.log('⚠️  无中文版');
                console.log(`    └─ 原页面: ${result.pageTitle}`);
                results.noZh++;
                results.byCategory[category].noZh++;
                results.byLanguage[lang].noZh++;
                results.details.push({ ...entry, ...result, status: 'no_zh' });
            } else {
                console.log('❌ 页面不存在');
                results.notFound++;
                results.byCategory[category].notFound++;
                results.byLanguage[lang].notFound++;
                results.details.push({ ...entry, ...result, status: 'not_found' });
            }
            
            // Rate limiting - wait 200ms between requests
            await new Promise(resolve => setTimeout(resolve, 200));
            
        } catch (error) {
            console.log(`❌ 错误: ${error.message}`);
            results.error++;
            results.byCategory[category].error++;
            results.byLanguage[lang].error++;
            results.details.push({ ...entry, error: error.message, status: 'error' });
        }
    }
    
    // Print summary
    console.log('\n' + '='.repeat(100));
    console.log('测试完成！');
    console.log('='.repeat(100));
    console.log('\n📊 总体统计:');
    console.log(`   总测试数: ${results.total}`);
    console.log(`   ✅ 成功: ${results.success} (${(results.success/results.total*100).toFixed(1)}%)`);
    console.log(`   ⚠️  无中文版: ${results.noZh} (${(results.noZh/results.total*100).toFixed(1)}%)`);
    console.log(`   ❌ 页面不存在: ${results.notFound} (${(results.notFound/results.total*100).toFixed(1)}%)`);
    console.log(`   ❌ 错误: ${results.error} (${(results.error/results.total*100).toFixed(1)}%)`);
    
    // By category
    console.log('\n📚 按分类统计:');
    Object.keys(results.byCategory).sort().forEach(cat => {
        const stat = results.byCategory[cat];
        const rate = (stat.success / stat.total * 100).toFixed(0);
        console.log(`   ${cat}: ${stat.success}/${stat.total} 成功 (${rate}%) | 无中文:${stat.noZh} | 不存在:${stat.notFound}`);
    });
    
    // By language
    console.log('\n🌍 按语言统计:');
    Object.keys(results.byLanguage).sort().forEach(lang => {
        const stat = results.byLanguage[lang];
        const rate = (stat.success / stat.total * 100).toFixed(0);
        console.log(`   ${lang}: ${stat.success}/${stat.total} 成功 (${rate}%) | 无中文:${stat.noZh} | 不存在:${stat.notFound}`);
    });
    
    // Success examples
    console.log('\n✅ 成功案例示例 (前10个):');
    results.details.filter(d => d.status === 'success').slice(0, 10).forEach(d => {
        console.log(`   ${d.lang}:${d.title} → ${d.zhTitle}`);
    });
    
    // No Chinese version examples
    if (results.noZh > 0) {
        console.log('\n⚠️  无中文版示例:');
        results.details.filter(d => d.status === 'no_zh').slice(0, 5).forEach(d => {
            console.log(`   ${d.lang}:${d.title}`);
        });
    }
    
    console.log('\n完成时间:', new Date().toLocaleString('zh-CN'));
    console.log('='.repeat(100));
    
    return results;
}

// Run tests
runTests().then(results => {
    console.log('\n✅ 所有测试完成！');
    process.exit(0);
}).catch(error => {
    console.error('\n❌ 测试失败:', error);
    process.exit(1);
});
