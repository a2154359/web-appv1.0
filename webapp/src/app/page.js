"use client"

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Checkbox, FormControlLabel, Typography, InputAdornment } from '@mui/material';
import { useRouter } from 'next/navigation';





export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState({
    title: true,
    author: false,
    institution: false,
    source: false,
    year: false,
  });

  // const selectedFilters = Object.keys(checked).filter(key => checked[key]); // 过滤出选中的选项
  // console.log(`/ShowForm?filters=${encodeURIComponent(selectedFilters.join(','))}&keyword=${encodeURIComponent(inputValue)}`);




  // // 使用 useEffect 来在组件加载时获取数据
  // React.useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("/api/getData");
  //       const jsonData = await response.json();
  //       if (jsonData.success) {
  //         setData(jsonData.data);
  //         console.log("数据获取成功", jsonData.data);
  //       }
  //     } catch (error) {
  //       console.error("数据获取失败", error);
  //     }
  //   }
  //   fetchData();
  // }, []);


  // 监听 Tab 切换
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 监听输入框回车事件
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const selectedFilters = Object.keys(checked).filter(key => checked[key]); // 过滤出选中的选项
      console.log(`参数传递=${encodeURIComponent(selectedFilters.join(','))}&keyword=${encodeURIComponent(inputValue)}`);
      router.push(`/ShowForm?filters=${encodeURIComponent(selectedFilters.join(','))}&keyword=${encodeURIComponent(inputValue)}`);

      // router.push('/ShowForm'?selectedFilters.join(','));
      // router.push({
      //   pathname:'/ShowForm',
      //   query:{ filters: selectedFilters.join(','), keyword: inputValue }
      // });
    }
  };


  

  // 监听输入框变化
  const InputFiledhandleChange = (event) => {
    setInputValue(event.target.value);
  };

  // 复选框变化
  const handleCheckboxChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // 使页面完全居中
        width: '100%',
        backgroundColor: 'white',
        gap: '20px', // 增加间距，避免元素挤在一起
      }}
    >
      {/* 标题 */}
      <Typography
        variant="h1"
        sx={{
          fontSize: 'clamp(3rem, 10vw, 3.5rem)',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold', // 标题加粗
          color: 'black', // 设为黑色
        }}
      >
        期刊论文数据检索
        <Typography
          component="span"
          variant="h1"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            //间距
          }}
        >
        </Typography>
      </Typography>

      {/* 复选框 + Tabs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Tabs value={value} onChange={handleChange} sx={{ minHeight: 48 }}>
          {[
            { key: 'title', label: '标题' },
            { key: 'author', label: '作者' },
            { key: 'institution', label: '机构地区' },
            { key: 'source', label: '出处' },
            { key: 'year', label: '期刊' },
        
          ].map(({ key, label }) => (
            <Tab
              key={key}
              label={
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked[key]}
                      onChange={handleCheckboxChange}
                      name={key}
                    />
                  }
                  label={label}
                />
              }
              sx={{ minHeight: 48 }}
            />
          ))}
        </Tabs>
      </Box>

      {/* 输入框 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <FormControl sx={{ width: '60%' }}>
          <OutlinedInput
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={InputFiledhandleChange}
            sx={{
              width: '100%', // 让输入框适应容器大小
              height: '60px', // 增大输入框
              fontSize: '18px', // 增大字体
              padding: '12px',
            }}
            placeholder="请输入关键词以便查询"
            startAdornment={
              <InputAdornment position="start">
                <img src="/images/searchIcon.png" alt="搜索" width="24" height="24" />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Box>
  );
}
