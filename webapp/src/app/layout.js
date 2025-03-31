import localFont from "next/font/local";
import "./globals.css";

// 加载本地字体
const notoSansSC = localFont({
  src: [
    {
    
      path: "../../public/fonts/yahei_mono_0.ttf", // 使用绝对路径
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/yahei_mono_0.ttf", // 使用绝对路径
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-yahei-mono", // 可以设置 CSS 变量
});

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={notoSansSC.className}>
      <body>{children}</body>
    </html>
  );
}