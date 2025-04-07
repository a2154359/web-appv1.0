// src/app/api/getData/route.js 在服务器上运行
import { query } from '../../../../lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get("page") || "1", 10);
    let columns = searchParams.get("columns"); // 需要查询的列
    let keyvalue = searchParams.get("inputValue");//需要查询的关键字
    const limit = 100;  // 每页显示100条数据
    const offset = (page - 1) * limit;  // 计算跳过的数据量

    // console.log(`查询第 ${page} 页数据，每页 ${limit} 条，跳过 ${offset} 条`);
    // 将 keyvalue 字符串转换为数组
    let keywords = keyvalue.split(",").map(keyword => keyword.trim());  // 数组 ["keyword1", "keyword2", "keyword3"]

    // 输出分页信息调试
    console.log(`查询的列 ${columns} `);
    console.table(`查询的关键字 ${keywords}`);

    // **检查 columns 是否为空**
    if (!columns) {
      return new Response(JSON.stringify({ success: false, message: "必须指定查询列" }), { status: 400 });
    }

    // **防止 SQL 注入，验证 columns**
    const allowedColumns = ["title", "author", "institution", "source", "year"];
    const selectedColumns = columns.split(",").map(col => col.trim()).filter(col => allowedColumns.includes(col));
    // console.log(`查询的参数===` + selectedColumns);
    if (selectedColumns.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "无效的列名" }), { status: 400 });
    }






    //     const sql = `
    //   SELECT *
    //   FROM webdata
    //   WHERE ${selectedColumns.map(col =>
    //       `(${col} IS NOT NULL AND ${col} != '' AND ${col} LIKE '%${keyvalue}%')`
    //     ).join(" OR ")}
    // `;

    const sql = `
  SELECT *
  FROM webdata
  WHERE ${selectedColumns.map(col =>
      `(${keywords.map(keyword =>
        `${col} IS NOT NULL AND ${col} != '' AND ${col} LIKE '%${keyword}%'`).join(" OR ")})`
    ).join(" OR ")}
`;

    console.log(`sql查询语句 ：` + sql);
    // const results = await query(sql, [limit, offset]);
    const results = await query(sql);
    // console.log(`数据库返回结果 ：` + results);
    return new Response(JSON.stringify({ success: true, data: results }), { status: 200 });




    // 使用字符串拼接避免参数绑定问题
    // const sql = `SELECT * FROM webdata LIMIT ${limit} OFFSET ${offset}`;
    // const results = await query(sql);


  } catch (error) {
    console.error("数据库查询失败:", error);
    return new Response(JSON.stringify({ success: false, message: "数据库查询失败", error: error.message }), { status: 500 });
  }
}