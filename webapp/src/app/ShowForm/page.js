"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const fontBase64 = (await import("../../../public/fonts/fontBase64.js")).default;
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
        year: true,
        date: true,
    });


    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageData, setPageData] = useState([]); // Current page data
    // Fetch data for the current page
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/getData?page=${currentPage}`);
            const data = await response.json();
            if (data.success) {
                setPageData(data.data);  // Store the data for the current page
            } else {
                console.error("数据加载失败");
            }
        };

        fetchData();
    }, [currentPage]);

    // 返回上一级页面
    const handleGoBack = () => {
        router.back();
    };




    // 导出PDF
    const exportToPdf = async () => {

        const pdfMakeModule = await import("pdfmake/build/pdfmake");
        const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

        const pdfMake = pdfMakeModule.default;

        if (pdfMake && pdfFontsModule) {
            console.log("pdfFonts.pdfMake is not null");

            pdfMakeModule.default.vfs = pdfFontsModule.default.vfs;
            // console.log("pdfFonts.pdfMake fontBase64.NotoSansSC ======"+fontBase64.NotoSansSC );
            // pdfMakeModule.vfs = pdfFontsModule.pdfMake.vfs;
        }
        
        pdfMake.vfs = {
            "NotoSansSC-Regular.ttf": fontBase64.NotoSansSC// 你的字体的 base64 字符串
        };

        // // **再次使用 Object.assign() 进行扩展**
        pdfMake.fonts = {
            NotoSansSC: {
                normal: "NotoSansSC-Regular.ttf",   // 确保字体名称一致
                bold: "NotoSansSC-Regular.ttf",
                italics: "NotoSansSC-Regular.ttf",
                bolditalics: "NotoSansSC-Regular.ttf"
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
                columnsVisibility.year && 'Year',
                columnsVisibility.date && 'Date'
            ].filter(Boolean),
            ...pageData.map((row, index) => [
                index + 1,
                columnsVisibility.title && row.title,
                columnsVisibility.author && row.author,
                columnsVisibility.institution && row.institution,
                columnsVisibility.source && row.source,
                columnsVisibility.url && row.url,
                columnsVisibility.year && row.year,
                columnsVisibility.date && row.date,
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
                font: "NotoSansSC", // 这里必须指定 NotoSansSC
            },
        };

        // 这里一定要使用 pdfMakeModule.default.createPdf
        pdfMakeModule.default.createPdf(docDefinition).download("data.pdf");
    };

    // 切换列可见性
    const toggleColumnVisibility = (column) => {
        setColumnsVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
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
                            {columnsVisibility.year && <TableCell sx={headerCellStyle}>年期</TableCell>}
                            {columnsVisibility.date && <TableCell sx={headerCellStyle}>上网时间</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(pageData) && pageData.length > 0 ? (
                            pageData.map((row, index) => (
                                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#f1f1f1' }, borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                    <TableCell sx={tableCellStyle}>{index + 1}</TableCell>
                                    {columnsVisibility.title && <TableCell sx={tableCellStyle}>{row.title}</TableCell>}
                                    {columnsVisibility.author && <TableCell sx={tableCellStyle}>{row.author}</TableCell>}
                                    {columnsVisibility.institution && <TableCell sx={tableCellStyle}>{row.institution}</TableCell>}
                                    {columnsVisibility.source && <TableCell sx={tableCellStyle}>{row.source}</TableCell>}
                                    {columnsVisibility.url && (
                                        <TableCell sx={tableCellStyle}>
                                            <Link href={row.url} target="_blank" rel="noopener" color="primary" sx={{ wordWrap: 'break-word' }}>
                                                {row.url}
                                            </Link>
                                        </TableCell>
                                    )}
                                    {columnsVisibility.year && <TableCell sx={tableCellStyle}>{row.year}</TableCell>}
                                    {columnsVisibility.date && <TableCell sx={tableCellStyle}>{row.date}</TableCell>}
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
