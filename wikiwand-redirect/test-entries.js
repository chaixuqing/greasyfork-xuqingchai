// Comprehensive Wikipedia API Test Suite
const testEntries = [
    // Popular anime/manga
    { lang: 'en', title: "Natsume's Book of Friends", category: 'Anime/Manga' },
    { lang: 'en', title: 'One Piece', category: 'Anime/Manga' },
    { lang: 'en', title: 'Naruto', category: 'Anime/Manga' },
    { lang: 'en', title: 'Attack on Titan', category: 'Anime/Manga' },
    { lang: 'en', title: 'Demon Slayer: Kimetsu no Yaiba', category: 'Anime/Manga' },
    { lang: 'en', title: 'My Hero Academia', category: 'Anime/Manga' },
    { lang: 'ja', title: '進撃の巨人', category: 'Anime/Manga' },
    
    // Technology
    { lang: 'en', title: 'Python (programming language)', category: 'Technology' },
    { lang: 'en', title: 'JavaScript', category: 'Technology' },
    { lang: 'en', title: 'Artificial intelligence', category: 'Technology' },
    { lang: 'en', title: 'Machine learning', category: 'Technology' },
    { lang: 'en', title: 'ChatGPT', category: 'Technology' },
    { lang: 'de', title: 'Künstliche Intelligenz', category: 'Technology' },
    { lang: 'fr', title: 'Intelligence artificielle', category: 'Technology' },
    
    // Geography
    { lang: 'en', title: 'Tokyo', category: 'Geography' },
    { lang: 'en', title: 'Beijing', category: 'Geography' },
    { lang: 'en', title: 'Mount Fuji', category: 'Geography' },
    { lang: 'en', title: 'Great Wall of China', category: 'Geography' },
    { lang: 'ja', title: '東京', category: 'Geography' },
    { lang: 'ja', title: '富士山', category: 'Geography' },
    { lang: 'ko', title: '도쿄', category: 'Geography' },
    { lang: 'es', title: 'Tokio', category: 'Geography' },
    { lang: 'ru', title: 'Токио', category: 'Geography' },
    
    // Culture
    { lang: 'en', title: 'Anime', category: 'Culture' },
    { lang: 'en', title: 'Manga', category: 'Culture' },
    { lang: 'en', title: 'Sushi', category: 'Culture' },
    { lang: 'en', title: 'Ramen', category: 'Culture' },
    { lang: 'en', title: 'Japanese tea ceremony', category: 'Culture' },
    { lang: 'fr', title: 'Anime', category: 'Culture' },
    { lang: 'de', title: 'Anime', category: 'Culture' },
    
    // History
    { lang: 'en', title: 'World War II', category: 'History' },
    { lang: 'en', title: 'Chinese Civil War', category: 'History' },
    { lang: 'en', title: 'Meiji Restoration', category: 'History' },
    { lang: 'de', title: 'Zweiter Weltkrieg', category: 'History' },
    { lang: 'fr', title: 'Seconde Guerre mondiale', category: 'History' },
    
    // Science
    { lang: 'en', title: 'Quantum mechanics', category: 'Science' },
    { lang: 'en', title: 'Theory of relativity', category: 'Science' },
    { lang: 'en', title: 'DNA', category: 'Science' },
    { lang: 'en', title: 'Evolution', category: 'Science' },
    
    // Less common languages
    { lang: 'ar', title: 'اليابان', category: 'Arabic' },
    { lang: 'ar', title: 'طوكيو', category: 'Arabic' },
    { lang: 'hi', title: 'जापान', category: 'Hindi' },
    { lang: 'th', title: 'ประเทศญี่ปุ่น', category: 'Thai' },
    { lang: 'vi', title: 'Nhật Bản', category: 'Vietnamese' },
];

console.log(`Total test cases: ${testEntries.length}\n`);
console.log('Test entries by category:');
const categories = {};
testEntries.forEach(entry => {
    categories[entry.category] = (categories[entry.category] || 0) + 1;
});
Object.keys(categories).sort().forEach(cat => {
    console.log(`  ${cat}: ${categories[cat]} entries`);
});
console.log('\nTest entries by language:');
const languages = {};
testEntries.forEach(entry => {
    languages[entry.lang] = (languages[entry.lang] || 0) + 1;
});
Object.keys(languages).sort().forEach(lang => {
    console.log(`  ${lang}: ${languages[lang]} entries`);
});

module.exports = testEntries;
