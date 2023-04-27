module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layouts/**/*.tsx'],
  corePlugins: {
    preflight: false, // 解决 button `background-color: transparent;` 问题 https://www.jianshu.com/p/2162daf865d9。
  },
};
