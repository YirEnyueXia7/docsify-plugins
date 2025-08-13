# docsify-plugins-scroll-to-top

### Usage
1. Include the script in index.html:
  ``` html
  <script src="./core-socialist-values.js"></script>
  ```
2. Configure the plugin (optional):
  ```
  // 社会主义核心价值观
  textPopup: {
    texts: ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'],
    // texts: [['Prosperity', 'Democracy', 'Civility', 'Harmony', 'Freedom', 'Equality', 'Justice', 'Rule of Law', 'Patriotism', 'Dedication', 'Integrity', 'Friendship']],
    colors: ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#cc00ff'],
    fontSize: '16px',     // 默认字体大小
    fontWeight: '400',    // 默认字体粗细
    duration: 700,        // 动画持续时间(ms)
    translatey: '-70px',  // 动画高度
  },
  ```
