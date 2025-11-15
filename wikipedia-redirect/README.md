# Wikipedia 自动跳转到简体中文

## 📁 文件说明

### 主文件
- **wikipedia-to-zh-hans.js** - Tampermonkey 脚本主文件 (v1.0.2)

### 文档
- **README-wikipedia-to-zh-hans.md** - 详细使用说明和功能介绍
- **INDEX.md** - 完整项目索引和测试数据总览
- **TEST-SUMMARY.md** - 测试结果可视化总结
- **WIKIPEDIA-API-TEST-REPORT.md** - 详细的 API 测试报告
- **TESTING-WORKFLOW-DIAGRAM.md** - 测试工作流程图

### 测试文件
- **test-wikipedia-redirect.html** - 交互式浏览器测试页面
- **test-wikipedia-api.js** - API 调试和测试工具
- **test-entries.js** - 44个多语言测试用例定义
- **run-comprehensive-test.js** - 自动化批量测试脚本

## 🚀 快速开始

### 安装脚本
1. 确保已安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 打开 `wikipedia-to-zh-hans.js` 文件
3. 复制内容到 Tampermonkey 新建脚本
4. 保存并启用脚本

### 测试脚本
1. 在浏览器中打开 `test-wikipedia-redirect.html`
2. 点击测试按钮访问英文 Wikipedia 页面
3. 脚本应自动重定向到简体中文页面

## 📊 测试结果

- **测试数量**: 7 个真实条目
- **成功率**: 100%
- **支持语言**: 英语、日语、德语、阿拉伯语等
- **测试分类**: 动漫、地理、科技、文化

## 🔗 相关链接

详细文档请查看：
- [完整使用手册](./README-wikipedia-to-zh-hans.md)
- [项目索引](./INDEX.md)
- [测试报告](./WIKIPEDIA-API-TEST-REPORT.md)

## 📝 版本信息

当前版本: **v1.0.2**  
状态: ✅ 生产就绪  
发布日期: 2025-11-15
