"use client"

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';



export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState(0)


  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  // 监听回车事件
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // alert(inputValue);
      router.push('/ShowForm'); // 跳转到 anotherPage 页面
      // 你可以在这里做你想做的事情，例如提交表单等
    }
  };


  const InputFiledhandleChange = (event) => {
    setInputValue(event.target.value);
  };

  // 跳转到指定页面
  const handleButtonClick = () => {
    router.push('/ShowForm'); // 跳转到 anotherPage 页面
  };

  return (
    <div>
      <Box sx={
        {
          display: 'flex',            // 启用 Flexbox 布局
          justifyContent: 'center',   // 横向居中
          alignItems: 'center',       // 纵向居中
          height: '100vh',             // 高度为 100% 的视口高度
          width: '100%',               // 宽度为 100%
          backgroundColor: 'lightblue', // 背景色
          flexDirection: 'column',
          gap: '10px',

        }
      }>
        <Box sx={{
          transform: 'translate(0%, -200%)',
        }}>

          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              fontFamily: 'Roboto,sans-serif',
              // color:'white'
            }}
          >
            大数据
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              检索
            </Typography>
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center', // 水平居中
          alignItems: 'center',     // 垂直居中
          transform: 'translate(0%, -100%)',
        }}>
          <Tabs value={value} onChange={handleChange} >
            <Tab label="标题" {...a11yProps(value)} onClick={handleButtonClick} />
            <Tab label="作者" {...a11yProps(value)}onClick={handleButtonClick} />
            <Tab label="机构地区" {...a11yProps(value)} onClick={handleButtonClick}/>
            <Tab label="出处" {...a11yProps(value)} onClick={handleButtonClick}/>
            <Tab label="网址" {...a11yProps(value)} onClick={handleButtonClick}/>
            <Tab label="年期" {...a11yProps(value)} onClick={handleButtonClick}/>
            <Tab label="上网时间" {...a11yProps(value)} />
          </Tabs>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // 水平居中
            alignItems: 'center',     // 垂直居中
            transform: 'translate(0%, -50%)',
          }}
        >
          <FormControl >

            <OutlinedInput
              value={inputValue}
              onKeyDown={handleKeyDown}  // 监听回车键
              onChange={InputFiledhandleChange}
              sx={{
                width: '800px',      // 设置宽度
                height: '50px',      // 设置高度
                fontSize: '16px',    // 设置字体大小
                padding: '12px',     // 设置内边距
              }}
              placeholder="请输入关键词以便查询"
            //  size="small"
            />

            {/* <Button variant="contained" sx={{ marginLeft: 2 }}>检索</Button> */}
          </FormControl>
        </Box>
      </Box>
    </div >
  );
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

}
