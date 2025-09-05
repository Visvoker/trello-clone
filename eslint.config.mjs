import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 👉 忽略不要掃的資料夾（含 Prisma 生成）
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "lib/generated/**", // 這裡是你出錯的位置
      "prisma/generated/**", // 若你有這個目錄也一起忽略
    ],
  },
];

export default eslintConfig;
