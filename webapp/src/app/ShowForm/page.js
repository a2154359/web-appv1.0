"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from "next/navigation";
import path from "path";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
    Typography,
    Box,
    Button,
    Checkbox,
    FormControlLabel
} from '@mui/material';

import { useRouter } from 'next/navigation';

export default function DataTable() {
    // 控制每列的可见性
    const [columnsVisibility, setColumnsVisibility] = useState({
        title: true,
        author: true,
        institution: true,
        source: true,
        url: true,
    });

    const itemsPerPage = 100;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageData, setPageData] = useState([]); // Current page data

    const [allData, setAllData] = useState([]);  // 保存所有的数据

    // Fetch data for the current page
    const [checked, setChecked] = useState({});
    const searchParams = useSearchParams();
    const filters = searchParams.get("filters"); // 例如 filters="title,author,institution,source,url,year,date"
    const inputValue = searchParams.get("keyword");

    // const allColumns = ["title", "author", "institution", "source", "url", "year", "date"];
    const allColumns = Object.keys(columnsVisibility);
    //通过关键字 实际的data
    const [selectData, setselectData] = useState([]); // Current page data

    // console.log("ajchen inputValue==" + inputValue);





    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/getData?page=${currentPage}`);
            const data = await response.json();
            console.log("currentPage ====:", currentPage);
            if (data.success) {
                // setPageData(data.data);  // Store the data for the current page
                const fetchedData = data.data;

                // 如果有输入值 (关键字)，则对数据进行筛选
                if (inputValue) {
                    const keywords = inputValue.split(',').map(keyword => keyword.trim().toLowerCase()); // 去除空格并转换为小写字母
                    console.log("ajchen =======" + keywords);
                    // 筛选数据
                    const filteredData = fetchedData.filter(item => {
                        return keywords.some(keyword => {
                            // 遍历每个关键字，检查它是否出现在数据的任一列中
                            return Object.values(item).some(value =>
                                value && value.toString().toLowerCase().includes(keyword) // 转换为字符串并小写化后进行匹配
                            );
                        });
                    });

                    // 设置筛选后的数据
                    setAllData(filteredData);
                    // setPageData(filteredData);
                    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));  // 计算总页数
                } else {
                    // 如果没有关键字，直接设置获取到的原始数据
                    setPageData(fetchedData);
                }

            } else {
                console.error("数据加载失败");
            }
        };

        fetchData();
    }, []);



    // 根据当前页码和搜索条件更新 pageData
    useEffect(() => {
        let filteredData = allData;

        if (inputValue) {
            // 处理关键词搜索
            const keywords = inputValue.split(',').map(keyword => keyword.trim().toLowerCase());
            filteredData = filteredData.filter(item =>
                keywords.some(keyword => Object.values(item).some(value =>
                    value && value.toString().toLowerCase().includes(keyword)
                ))
            );
        }

        // 计算当前页的数据
        const currentPageData = filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        setPageData(currentPageData);  // 更新页面数据
    }, [currentPage, inputValue, allData]);  // 当页码或搜索条件变化时更新



    useEffect(() => {
        // console.log("filters 参数:", filters); // 检查 filters 传入的值

        // // 解析 filters，确保没有空格影响解析
        const selectedFilters = allColumns


        // console.log("解析后的 selectedFilters:", selectedFilters);

        // // 初始化所有列的选中状态
        const newCheckedState = allColumns.reduce((acc, col) => {
            acc[col] = selectedFilters.includes(col);
            return acc;
        }, {});

        // console.log("最终的 checked 状态:", newCheckedState);

        setChecked(newCheckedState);
        setColumnsVisibility(newCheckedState);


        //处理数据
    }, [filters]); // 监听 filters 变化



    // 返回上一级页面
    const handleGoBack = () => {
        router.back();
    };



    // 导出PDF
    const exportToPdf = async () => {

        const pdfMakeModule = await import("pdfmake/build/pdfmake");
        const pdfFontsModule = await import("pdfmake/build/vfs_fonts");


        const pdfMake = pdfMakeModule.default;

        pdfMake.vfs = {
            "yahei_mono_0.ttf": "../../../../public/fonts/yahei_mono_0.ttf", // 使用绝对路径
            // ...pdfFonts.pdfMake.vfs,
        };


        if (pdfMake && pdfFontsModule) {
            console.log("pdfFonts.pdfMake is not null");

            pdfMakeModule.default.vfs = pdfFontsModule.default.vfs;
            // console.log("pdfFonts.pdfMake fontBase64.NotoSansSC ======"+fontBase64.NotoSansSC );
            // pdfMakeModule.vfs = pdfFontsModule.pdfMake.vfs;
        }


        // // **再次使用 Object.assign() 进行扩展**
        pdfMake.fonts = {
            yahei_mono: {
                normal: "yahei_mono_0.ttf",   // 确保字体名称一致
                bold: "yahei_mono_0.ttf",
                italics: "yahei_mono_0.ttf",
                bolditalics: "yahei_mono_0.ttf"
            }
        };

        console.log(pdfMake.vfs);  // 查看vfs中的字体文件
        console.log(pdfMake.fonts);  // 查看fonts对象，确保字体被正确配置

        const tableData = [
            ['#',
                columnsVisibility.title && 'Title',
                columnsVisibility.author && 'Author',
                columnsVisibility.institution && 'Institution',
                columnsVisibility.source && 'Source',
                columnsVisibility.url && 'URL',
            ].filter(Boolean),
            ...pageData.map((row, index) => [
                index + 1,
                columnsVisibility.title && row.title,
                columnsVisibility.author && row.author,
                columnsVisibility.institution && row.institution,
                columnsVisibility.source && row.source,
                columnsVisibility.url && row.url,
            ].filter(Boolean)),
        ];

        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            content: [
                { text: 'Data Table', style: 'header', alignment: 'center' },
                {
                    style: 'tableExample',
                    table: {
                        headerRow: 1,
                        widths: [30, '*', '*', '*', '*', '*', '*', '*'],
                        body: tableData,
                    },
                    layout: 'lightHorizontalLines',
                },
            ],
            styles: {
                header: { fontSize: 10, margin: [0, 10] },
                tableExample: { margin: [0, 5, 0, 15], fontSize: 5 },
            },
            defaultStyle: {
                font: "yahei_mono", // 这里必须指定 NotoSansSC
            },
        };

        // 这里一定要使用 pdfMakeModule.default.createPdf
        pdfMakeModule.default.createPdf(docDefinition).download("data.pdf");
    };

    // 切换列可见性
    const toggleColumnVisibility = (column) => {
        setChecked((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
        setColumnsVisibility((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Box sx={{ width: '100%', padding: 3 }}>
            <Button variant="outlined" color="primary" onClick={handleGoBack} sx={{ marginBottom: 2, boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
                返回
            </Button>
            <Button variant="contained" color="primary" onClick={exportToPdf} sx={{ marginBottom: 2, marginLeft: 2 }}>
                导出PDF
            </Button>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Data Table
            </Typography>

            {/* 可见列筛选 */}
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h6">导出筛选</Typography>
                {Object.keys(columnsVisibility).map((column) => (
                    <FormControlLabel
                        key={column}
                        control={
                            <Checkbox
                                checked={columnsVisibility[column]}
                                onChange={() => toggleColumnVisibility(column)}
                                color="primary"
                            />
                        }
                        label={column}
                    />
                ))}
            </Box>

            <TableContainer component={Paper} elevation={3} sx={{ boxShadow: 3 }}>
                <Table sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
                            <TableCell sx={headerCellStyle}>序号</TableCell>
                            {columnsVisibility.title && <TableCell sx={headerCellStyle}>标题</TableCell>}
                            {columnsVisibility.author && <TableCell sx={headerCellStyle}>作者</TableCell>}
                            {columnsVisibility.institution && <TableCell sx={headerCellStyle}>机构地区</TableCell>}
                            {columnsVisibility.source && <TableCell sx={headerCellStyle}>出处</TableCell>}
                            {columnsVisibility.url && <TableCell sx={headerCellStyle}>网址</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(pageData) && pageData.length > 0 ? (
                            pageData.map((row, index) => (
                                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#f1f1f1' }, borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                    <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                                    {columnsVisibility.title && <TableCell>{row.title}</TableCell>}
                                    {columnsVisibility.author && <TableCell>{row.author}</TableCell>}
                                    {columnsVisibility.institution && <TableCell>{row.institution}</TableCell>}
                                    {columnsVisibility.source && <TableCell>{row.source}</TableCell>}
                                    {columnsVisibility.url && <TableCell><Link href={row.url} target="_blank" rel="noopener">{row.url}</Link></TableCell>}
                            
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ padding: 3 }}>
                                    没有数据
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>上一页</Button>
                <Typography sx={{ margin: '0 15px' }}>第 {currentPage} 页 / 共 {totalPages} 页</Typography>
                <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>下一页</Button>
            </Box>
        </Box>
    );
}

const headerCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f4f6f8',
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
};

const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
};
