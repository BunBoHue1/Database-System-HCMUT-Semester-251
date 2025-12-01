// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // 1. Áp dụng cho tất cả các file js, ts
  { files: ["**/*.{js,mjs,cjs,ts}"] },

  // 2. Định nghĩa môi trường là Node.js (để không báo lỗi khi dùng process.env, require...)
  { languageOptions: { globals: globals.node } },

  // 3. Sử dụng các bộ luật khuyến nghị (Recommended)
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 4. Tùy chỉnh luật riêng (Rules)
  {
    rules: {
      // Ví dụ: Bắt buộc dùng const nếu biến không thay đổi
      "prefer-const": "error",
      // Ví dụ: Cho phép dùng 'any' (đôi khi cần thiết lúc mới học, sau này nên tắt)
      "@typescript-eslint/no-explicit-any": "warn",
      // Báo lỗi nếu có biến khai báo mà không dùng
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
