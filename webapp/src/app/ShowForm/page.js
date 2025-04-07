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
    FormControlLabel,
    FormControl,
    MenuItem,
    Select,
    CircularProgress,
    TextField
} from '@mui/material';

import { useRouter } from 'next/navigation';

export default function DataTable() {
    // 控制每列的可见性
    const [columnsVisibility, setColumnsVisibility] = useState({
        标题: true,
        作者: true,
        机构地区: true,
        出处: true,
        期刊: true,
    });

    const itemsPerPage = 100;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageData, setPageData] = useState([]); // 保存所有的数据
    const [currentPageData, setCurrentPageData] = useState([]);//当前页的数据

    const [searchField, setSearchField] = useState('title');
    // Fetch data for the current page
    const [checked, setChecked] = useState({});
    const searchParams = useSearchParams();
    const filters = searchParams.get("filters"); // 例如 filters="title,author,institution,source,url,year,date"
    const inputValue = searchParams.get("keyword");

    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true);
    // const allColumns = ["title", "author", "institution", "source", "url", "year", "date"];
    const allColumns = Object.keys(columnsVisibility);


    // console.log("ajchen filters==" + filters);



    useEffect(() => {
        const fetchData = async () => {

            setLoading(true); // 显示 loading

            const columnsParam = filters ? filters.split(",") : [];
            // console.log("ajchen columnsParam ====:", columnsParam);


            const response = await fetch(`/api/getData?page=${currentPage}&columns=${columnsParam}&inputValue=${inputValue}`);
            const data = await response.json();

            if (data.success) {
                // setPageData(data.data);  // Store the data for the current page
                const fetchedData = data.data;
                setPageData(fetchedData);


                setTotalPages(Math.ceil(fetchedData.length / itemsPerPage));  // 计算总页数
                setCurrentPageData(data.data.slice(0, itemsPerPage));  // 初始时显示第一页的数据
                // console.log("ajchen ===" + currentPageData);
                console.table("当前页数据:" + currentPageData);
                setLoading(false); // 数据拿到后隐藏 loading
                // 如果有输入值 (关键字)，则对数据进行筛选
                // if (inputValue) {
                //     const keywords = inputValue.split(',').map(keyword => keyword.trim().toLowerCase()); // 去除空格并转换为小写字母
                //     console.log("ajchen =======" + keywords);
                //     // 筛选数据
                //     const filteredData = fetchedData.filter(item => {
                //         return keywords.some(keyword => {
                //             // 遍历每个关键字，检查它是否出现在数据的任一列中
                //             return Object.values(item).some(value =>
                //                 value && value.toString().toLowerCase().includes(keyword) // 转换为字符串并小写化后进行匹配
                //             );
                //         });
                //     });

                //     // 设置筛选后的数据
                //     setAllData(filteredData);
                //     // setPageData(filteredData);
                //     setTotalPages(Math.ceil(filteredData.length / itemsPerPage));  // 计算总页数
                // } else {
                //     // 如果没有关键字，直接设置获取到的原始数据
                //     setPageData(fetchedData);
                // }

            } else {
                console.error("数据加载失败");
            }
        };

        fetchData();
    }, []);



    // 根据当前页码和搜索条件更新 pageData
    // useEffect(() => {
    //     let filteredData = pageData;

    //     if (inputValue) {
    //         // 处理关键词搜索
    //         const keywords = inputValue.split(',').map(keyword => keyword.trim().toLowerCase());
    //         filteredData = filteredData.filter(item =>
    //             keywords.some(keyword => Object.values(item).some(value =>
    //                 value && value.toString().toLowerCase().includes(keyword)
    //             ))
    //         );
    //     }

    //     // 计算当前页的数据
    //     const tempPage = filteredData.slice(
    //         (currentPage - 1) * itemsPerPage,
    //         currentPage * itemsPerPage
    //     );

    //     setPageData(tempPage);  // 更新页面数据
    // }, [currentPage, inputValue]);  // 当页码或搜索条件变化时更新



    useEffect(() => {
        console.log("filters 参数:", filters); // 检查 filters 传入的值

        // // 解析 filters，确保没有空格影响解析
        const selectedFilters = Array.isArray(filters) ? filters.map(f => f.trim()) : [];


        console.log("解析后的 selectedFilters:", selectedFilters);

        // // 初始化所有列的选中状态
        // const newCheckedState = allColumns.reduce((acc, col) => {
        //     acc[col] = selectedFilters.includes(col);
        //     return acc;
        // }, {});

        // console.log("最终的 checked 状态:", newCheckedState);

        // setChecked(newCheckedState);
        // setColumnsVisibility(newCheckedState);


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
                columnsVisibility.year && 'Year',
            ].filter(Boolean),
            ...pageData.map((row, index) => [
                index + 1,
                columnsVisibility.title && row.title,
                columnsVisibility.author && row.author,
                columnsVisibility.institution && row.institution,
                columnsVisibility.source && row.source,
                columnsVisibility.year && row.year,
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
            //切换页的时候把这一页大数据给pageData中
            // 计算当前页的起始位置
            const offset = (newPage - 1) * itemsPerPage;
            setCurrentPageData(pageData.slice(offset, offset + itemsPerPage));  // 设置当前页的数据
        }
    };


    const handleSearch = async () => {
        if (!searchValue.trim()) return;


        // const activeColumns = Object.keys(columnsVisibility)
        //     .filter(col => columnsVisibility[col]) // 只用选中的列
        //     .join(',');

        console.log("ajchen activeColumns======" + searchField);
        setLoading(true); // 显示 loading
        try {
            const response = await fetch(`/api/getData?page=1&columns=${searchField}&inputValue=${encodeURIComponent(searchValue)}`);

            const result = await response.json();

            if (result.success) {
                setPageData(result.data);
                setCurrentPage(1);
                setCurrentPageData(result.data.slice(0, itemsPerPage));
                setTotalPages(Math.ceil(result.data.length / itemsPerPage));
                console.log("ajchen  数据返回成功");
                setLoading(false); // 显示 loading
            } else {
                console.error('查询失败：', result.message);
            }
        } catch (error) {
            console.error('请求失败：', error);
        }
    };

    return (


        <Box sx={{ width: '100%', padding: 3 }}>

            {/* 顶部标题和搜索框 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                {/* 左侧标题 */}
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} color='black'>期刊论文数据检索</Typography>


                {/* 右侧搜索栏 */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl sx={{ minWidth: 120, marginRight: 1 }} size="small">
                        <Select
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="title">标题</MenuItem>
                            <MenuItem value="author">作者</MenuItem>
                            <MenuItem value="institution">机构地区</MenuItem>
                            <MenuItem value="source">出处</MenuItem>
                            <MenuItem value="year">期刊</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        placeholder="输入关键词搜索..."
                        size="small"
                        sx={{ marginRight: 1 }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* <Button variant="contained" color="primary" onClick={handleSearch}>搜索</Button> */}
                </Box>
            </Box>

            {/* 导出PDF按钮（放在表格上方靠右） */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <Button variant="contained" color="primary" onClick={exportToPdf}>
                    导出PDF
                </Button>
            </Box>

            {/* 可见列筛选 */}
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h6" color='black'>显示列</Typography>
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

            {loading ? (
                <Box sx={{
                    height: '60vh', // 可根据需要调整高度
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ marginTop: 2 }}>正在加载数据，请稍候...</Typography>
                </Box>
            ) : (
                <>
                    {/* 表格 */}
                    <TableContainer component={Paper} elevation={3} sx={{ boxShadow: 3 }}>
                        <Table sx={{ borderCollapse: 'collapse' }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
                                    <TableCell sx={headerCellStyle}>序号</TableCell>
                                    {columnsVisibility.标题 && <TableCell sx={headerCellStyle}>标题</TableCell>}
                                    {columnsVisibility.作者 && <TableCell sx={headerCellStyle}>作者</TableCell>}
                                    {columnsVisibility.机构地区 && <TableCell sx={headerCellStyle}>机构地区</TableCell>}
                                    {columnsVisibility.出处 && <TableCell sx={headerCellStyle}>出处</TableCell>}
                                    {columnsVisibility.期刊 && <TableCell sx={headerCellStyle}>期刊</TableCell>}
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {Array.isArray(pageData) && pageData.length > 0 ? (
                                    currentPageData.map((row, index) => (
                                        <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#f1f1f1' }, borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                            <TableCell align="center">{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                                            {columnsVisibility.标题 && <TableCell align="center">{row.title}</TableCell>}
                                            {columnsVisibility.作者 && <TableCell align="center">{row.author}</TableCell>}
                                            {columnsVisibility.机构地区 && <TableCell align="center">{row.institution}</TableCell>}
                                            {columnsVisibility.出处 && <TableCell align="center">{row.source}</TableCell>}
                                            {columnsVisibility.期刊 && <TableCell align="center">{row.year}</TableCell>
                                            }
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
                </>
            )}


            {/* 分页 */}
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


