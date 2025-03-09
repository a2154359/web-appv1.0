// src/app/api/getData/route.js
import { query } from '../../../../lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;  // 每页显示100条数据
    const offset = (page - 1) * limit;  // 计算跳过的数据量

    // 输出分页信息调试
    console.log(`查询第 ${page} 页的数据, 每页 ${limit} 条，跳过 ${offset} 条`);

    // 确保 page 和 offset 是有效的整数
    if (isNaN(page) || page < 1 || isNaN(offset)) {
      return new Response(JSON.stringify({ success: false, message: "无效的分页参数" }), { status: 400 });
    }

    // 使用字符串拼接避免参数绑定问题
    const sql = `SELECT * FROM webdata LIMIT ${limit} OFFSET ${offset}`;
    const results = await query(sql);

    return new Response(JSON.stringify({ success: true, data: results }), { status: 200 });
  } catch (error) {
    console.error("数据库查询失败:", error);
    return new Response(JSON.stringify({ success: false, message: "数据库查询失败", error: error.message }), { status: 500 });
  }
}