module.exports = {
  trailingComma: 'all', // 末尾のカンマをどうするか。"es5" | "none" | "all"
  printWidth: 100, //折り返し幅文字数を指定 / .editorconfigで設定している場合は無視される
  semi: true, // セミコロンをつけるかどうか
  bracketSameLine: false, // ブラケットを同じ行にするかどうか
  overrides: [
    {
      files: ['**/*.jsx', '**/*.tsx'],
      options: {
        jsxSingleQuote: false, // JSXでシングルクォートを使うかどうか
      },
    },
  ],
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html'],
      options: {
        singleQuote: false, // シングルクォートを使うかどうか[CSS, SCSS, HTML]
      },
    },
  ],
};
