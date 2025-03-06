"use client"
import React from 'react';
import dynamic from 'next/dynamic';

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

import { useState } from 'react';
import { fonts } from 'pdfmake/build/pdfmake';
// Dynamically import pdfmake to ensure it works on the client-side only
const pdfMake = dynamic(() => import('pdfmake/build/pdfmake'), { ssr: false });
const pdfFonts = dynamic(() => import('pdfmake/build/vfs_fonts'), { ssr: false });

// 假数据
const data = [
    {
        "title": "Face discuss people avoid various arrive.",
        "author": "John Kramer",
        "institution": "Garyport",
        "source": "Blankenship-Jacobson",
        "url": "http://www.white-wilson.com/",
        "year": 2001,
        "date": "2022-02-04"
    },
    {
        "title": "Its couple paper guy card.",
        "author": "Sean Foster",
        "institution": "West Lori",
        "source": "Miller, Miranda and Smith",
        "url": "https://watts.com/",
        "year": 2016,
        "date": "2020-06-18"
    },
    {
        "title": "Pull past her tend.",
        "author": "Robert Perez",
        "institution": "West Sandra",
        "source": "Oconnor, Huerta and Phelps",
        "url": "https://www.flores.com/",
        "year": 2021,
        "date": "2021-08-06"
    },
    {
        "title": "Remain blood task throw land power.",
        "author": "Sarah Serrano",
        "institution": "Port Deborah",
        "source": "Carlson-Jacobson",
        "url": "https://lloyd.com/",
        "year": 2023,
        "date": "2020-06-06"
    },
    {
        "title": "Game green often maybe wrong edge.",
        "author": "Jeremy Jones",
        "institution": "Brownburgh",
        "source": "Robles-Kent",
        "url": "http://chung.biz/",
        "year": 2016,
        "date": "2020-05-16"
    },
    {
        "title": "House there as yourself build.",
        "author": "Michael Hale",
        "institution": "Lake Danielfort",
        "source": "Vasquez LLC",
        "url": "https://www.russo-castillo.com/",
        "year": 2023,
        "date": "2025-01-31"
    },
    {
        "title": "Evidence cover than general.",
        "author": "Debra Martinez",
        "institution": "South Jessicaside",
        "source": "Lee PLC",
        "url": "https://smith-carter.com/",
        "year": 2011,
        "date": "2021-05-15"
    },
    {
        "title": "Situation nor positive stop still whose.",
        "author": "Crystal Weaver",
        "institution": "Hernandezfort",
        "source": "Sanders Group",
        "url": "http://www.tran.com/",
        "year": 2002,
        "date": "2023-01-12"
    },
    {
        "title": "Leader offer old ago.",
        "author": "Kyle Gray",
        "institution": "Lake Leonardhaven",
        "source": "Colon-Jacobson",
        "url": "https://www.ramos.biz/",
        "year": 2011,
        "date": "2021-08-30"
    },
    {
        "title": "Bag suddenly include clear.",
        "author": "Matthew White",
        "institution": "East Jessicabury",
        "source": "Nelson Inc",
        "url": "http://obrien-taylor.info/",
        "year": 2013,
        "date": "2020-02-09"
    },
    {
        "title": "Firm finish call second PM check.",
        "author": "Ashley Jackson",
        "institution": "Lake Michele",
        "source": "Black-Gibson",
        "url": "http://www.chen.com/",
        "year": 2011,
        "date": "2020-02-18"
    },
    {
        "title": "Wind deep garden writer forget.",
        "author": "Lauren Powell",
        "institution": "Lake Jamesfort",
        "source": "Morris PLC",
        "url": "http://www.taylor.com/",
        "year": 2013,
        "date": "2023-04-15"
    },
    {
        "title": "Big even kind yourself at first structure.",
        "author": "Andrew Foster",
        "institution": "North Suzanne",
        "source": "Lucas, Parks and Hunt",
        "url": "https://www.thomas.com/",
        "year": 2020,
        "date": "2024-09-23"
    },
    {
        "title": "Race various become blue.",
        "author": "Tara Taylor",
        "institution": "East Daniel",
        "source": "Hayden-Simmons",
        "url": "https://www.smith.info/",
        "year": 2010,
        "date": "2020-09-06"
    },
    {
        "title": "By star story price no call meeting.",
        "author": "Jill Pineda",
        "institution": "Mooreside",
        "source": "Church, Mccarthy and Cooper",
        "url": "http://wilkins.com/",
        "year": 2024,
        "date": "2022-04-26"
    },
    {
        "title": "One individual kitchen everybody half debate.",
        "author": "Bailey Yang",
        "institution": "Leeton",
        "source": "Brown, Mercado and Anderson",
        "url": "http://martin-fisher.com/",
        "year": 2017,
        "date": "2024-10-23"
    }, {
        "title": "Face discuss people avoid various arrive.",
        "author": "John Kramer",
        "institution": "Garyport",
        "source": "Blankenship-Jacobson",
        "url": "http://www.white-wilson.com/",
        "year": 2001,
        "date": "2022-02-04"
    },
    {
        "title": "Its couple paper guy card.",
        "author": "Sean Foster",
        "institution": "West Lori",
        "source": "Miller, Miranda and Smith",
        "url": "https://watts.com/",
        "year": 2016,
        "date": "2020-06-18"
    },
    {
        "title": "Pull past her tend.",
        "author": "Robert Perez",
        "institution": "West Sandra",
        "source": "Oconnor, Huerta and Phelps",
        "url": "https://www.flores.com/",
        "year": 2021,
        "date": "2021-08-06"
    },
    {
        "title": "Remain blood task throw land power.",
        "author": "Sarah Serrano",
        "institution": "Port Deborah",
        "source": "Carlson-Jacobson",
        "url": "https://lloyd.com/",
        "year": 2023,
        "date": "2020-06-06"
    },
    {
        "title": "Game green often maybe wrong edge.",
        "author": "Jeremy Jones",
        "institution": "Brownburgh",
        "source": "Robles-Kent",
        "url": "http://chung.biz/",
        "year": 2016,
        "date": "2020-05-16"
    },
    {
        "title": "House there as yourself build.",
        "author": "Michael Hale",
        "institution": "Lake Danielfort",
        "source": "Vasquez LLC",
        "url": "https://www.russo-castillo.com/",
        "year": 2023,
        "date": "2025-01-31"
    },
    {
        "title": "Evidence cover than general.",
        "author": "Debra Martinez",
        "institution": "South Jessicaside",
        "source": "Lee PLC",
        "url": "https://smith-carter.com/",
        "year": 2011,
        "date": "2021-05-15"
    },
    {
        "title": "Situation nor positive stop still whose.",
        "author": "Crystal Weaver",
        "institution": "Hernandezfort",
        "source": "Sanders Group",
        "url": "http://www.tran.com/",
        "year": 2002,
        "date": "2023-01-12"
    },
    {
        "title": "Leader offer old ago.",
        "author": "Kyle Gray",
        "institution": "Lake Leonardhaven",
        "source": "Colon-Jacobson",
        "url": "https://www.ramos.biz/",
        "year": 2011,
        "date": "2021-08-30"
    },
    {
        "title": "Bag suddenly include clear.",
        "author": "Matthew White",
        "institution": "East Jessicabury",
        "source": "Nelson Inc",
        "url": "http://obrien-taylor.info/",
        "year": 2013,
        "date": "2020-02-09"
    },
    {
        "title": "Firm finish call second PM check.",
        "author": "Ashley Jackson",
        "institution": "Lake Michele",
        "source": "Black-Gibson",
        "url": "http://www.chen.com/",
        "year": 2011,
        "date": "2020-02-18"
    },
    {
        "title": "Wind deep garden writer forget.",
        "author": "Lauren Powell",
        "institution": "Lake Jamesfort",
        "source": "Morris PLC",
        "url": "http://www.taylor.com/",
        "year": 2013,
        "date": "2023-04-15"
    },
    {
        "title": "Big even kind yourself at first structure.",
        "author": "Andrew Foster",
        "institution": "North Suzanne",
        "source": "Lucas, Parks and Hunt",
        "url": "https://www.thomas.com/",
        "year": 2020,
        "date": "2024-09-23"
    },
    {
        "title": "Race various become blue.",
        "author": "Tara Taylor",
        "institution": "East Daniel",
        "source": "Hayden-Simmons",
        "url": "https://www.smith.info/",
        "year": 2010,
        "date": "2020-09-06"
    },
    {
        "title": "By star story price no call meeting.",
        "author": "Jill Pineda",
        "institution": "Mooreside",
        "source": "Church, Mccarthy and Cooper",
        "url": "http://wilkins.com/",
        "year": 2024,
        "date": "2022-04-26"
    },
    {
        "title": "One individual kitchen everybody half debate.",
        "author": "Bailey Yang",
        "institution": "Leeton",
        "source": "Brown, Mercado and Anderson",
        "url": "http://martin-fisher.com/",
        "year": 2017,
        "date": "2024-10-23"
    },
    {
        "title": "Face discuss people avoid various arrive.",
        "author": "John Kramer",
        "institution": "Garyport",
        "source": "Blankenship-Jacobson",
        "url": "http://www.white-wilson.com/",
        "year": 2001,
        "date": "2022-02-04"
    },
    {
        "title": "Its couple paper guy card.",
        "author": "Sean Foster",
        "institution": "West Lori",
        "source": "Miller, Miranda and Smith",
        "url": "https://watts.com/",
        "year": 2016,
        "date": "2020-06-18"
    },
    {
        "title": "Pull past her tend.",
        "author": "Robert Perez",
        "institution": "West Sandra",
        "source": "Oconnor, Huerta and Phelps",
        "url": "https://www.flores.com/",
        "year": 2021,
        "date": "2021-08-06"
    },
    {
        "title": "Remain blood task throw land power.",
        "author": "Sarah Serrano",
        "institution": "Port Deborah",
        "source": "Carlson-Jacobson",
        "url": "https://lloyd.com/",
        "year": 2023,
        "date": "2020-06-06"
    },
    {
        "title": "Game green often maybe wrong edge.",
        "author": "Jeremy Jones",
        "institution": "Brownburgh",
        "source": "Robles-Kent",
        "url": "http://chung.biz/",
        "year": 2016,
        "date": "2020-05-16"
    },
    {
        "title": "House there as yourself build.",
        "author": "Michael Hale",
        "institution": "Lake Danielfort",
        "source": "Vasquez LLC",
        "url": "https://www.russo-castillo.com/",
        "year": 2023,
        "date": "2025-01-31"
    },
    {
        "title": "Evidence cover than general.",
        "author": "Debra Martinez",
        "institution": "South Jessicaside",
        "source": "Lee PLC",
        "url": "https://smith-carter.com/",
        "year": 2011,
        "date": "2021-05-15"
    },
    {
        "title": "Situation nor positive stop still whose.",
        "author": "Crystal Weaver",
        "institution": "Hernandezfort",
        "source": "Sanders Group",
        "url": "http://www.tran.com/",
        "year": 2002,
        "date": "2023-01-12"
    },
    {
        "title": "Leader offer old ago.",
        "author": "Kyle Gray",
        "institution": "Lake Leonardhaven",
        "source": "Colon-Jacobson",
        "url": "https://www.ramos.biz/",
        "year": 2011,
        "date": "2021-08-30"
    },
    {
        "title": "Bag suddenly include clear.",
        "author": "Matthew White",
        "institution": "East Jessicabury",
        "source": "Nelson Inc",
        "url": "http://obrien-taylor.info/",
        "year": 2013,
        "date": "2020-02-09"
    },
    {
        "title": "Firm finish call second PM check.",
        "author": "Ashley Jackson",
        "institution": "Lake Michele",
        "source": "Black-Gibson",
        "url": "http://www.chen.com/",
        "year": 2011,
        "date": "2020-02-18"
    },
    {
        "title": "Wind deep garden writer forget.",
        "author": "Lauren Powell",
        "institution": "Lake Jamesfort",
        "source": "Morris PLC",
        "url": "http://www.taylor.com/",
        "year": 2013,
        "date": "2023-04-15"
    },
    {
        "title": "Big even kind yourself at first structure.",
        "author": "Andrew Foster",
        "institution": "North Suzanne",
        "source": "Lucas, Parks and Hunt",
        "url": "https://www.thomas.com/",
        "year": 2020,
        "date": "2024-09-23"
    },
    {
        "title": "Race various become blue.",
        "author": "Tara Taylor",
        "institution": "East Daniel",
        "source": "Hayden-Simmons",
        "url": "https://www.smith.info/",
        "year": 2010,
        "date": "2020-09-06"
    },
    {
        "title": "By star story price no call meeting.",
        "author": "Jill Pineda",
        "institution": "Mooreside",
        "source": "Church, Mccarthy and Cooper",
        "url": "http://wilkins.com/",
        "year": 2024,
        "date": "2022-04-26"
    },
    {
        "title": "One individual kitchen everybody half debate.",
        "author": "Bailey Yang",
        "institution": "Leeton",
        "source": "Brown, Mercado and Anderson",
        "url": "http://martin-fisher.com/",
        "year": 2017,
        "date": "2024-10-23"
    }, {
        "title": "Face discuss people avoid various arrive.",
        "author": "John Kramer",
        "institution": "Garyport",
        "source": "Blankenship-Jacobson",
        "url": "http://www.white-wilson.com/",
        "year": 2001,
        "date": "2022-02-04"
    },
    {
        "title": "Its couple paper guy card.",
        "author": "Sean Foster",
        "institution": "West Lori",
        "source": "Miller, Miranda and Smith",
        "url": "https://watts.com/",
        "year": 2016,
        "date": "2020-06-18"
    },
    {
        "title": "Pull past her tend.",
        "author": "Robert Perez",
        "institution": "West Sandra",
        "source": "Oconnor, Huerta and Phelps",
        "url": "https://www.flores.com/",
        "year": 2021,
        "date": "2021-08-06"
    },
    {
        "title": "Remain blood task throw land power.",
        "author": "Sarah Serrano",
        "institution": "Port Deborah",
        "source": "Carlson-Jacobson",
        "url": "https://lloyd.com/",
        "year": 2023,
        "date": "2020-06-06"
    },
    {
        "title": "Game green often maybe wrong edge.",
        "author": "Jeremy Jones",
        "institution": "Brownburgh",
        "source": "Robles-Kent",
        "url": "http://chung.biz/",
        "year": 2016,
        "date": "2020-05-16"
    },
    {
        "title": "House there as yourself build.",
        "author": "Michael Hale",
        "institution": "Lake Danielfort",
        "source": "Vasquez LLC",
        "url": "https://www.russo-castillo.com/",
        "year": 2023,
        "date": "2025-01-31"
    },
    {
        "title": "Evidence cover than general.",
        "author": "Debra Martinez",
        "institution": "South Jessicaside",
        "source": "Lee PLC",
        "url": "https://smith-carter.com/",
        "year": 2011,
        "date": "2021-05-15"
    },
    {
        "title": "Situation nor positive stop still whose.",
        "author": "Crystal Weaver",
        "institution": "Hernandezfort",
        "source": "Sanders Group",
        "url": "http://www.tran.com/",
        "year": 2002,
        "date": "2023-01-12"
    },
    {
        "title": "Leader offer old ago.",
        "author": "Kyle Gray",
        "institution": "Lake Leonardhaven",
        "source": "Colon-Jacobson",
        "url": "https://www.ramos.biz/",
        "year": 2011,
        "date": "2021-08-30"
    },
    {
        "title": "Bag suddenly include clear.",
        "author": "Matthew White",
        "institution": "East Jessicabury",
        "source": "Nelson Inc",
        "url": "http://obrien-taylor.info/",
        "year": 2013,
        "date": "2020-02-09"
    },
    {
        "title": "Firm finish call second PM check.",
        "author": "Ashley Jackson",
        "institution": "Lake Michele",
        "source": "Black-Gibson",
        "url": "http://www.chen.com/",
        "year": 2011,
        "date": "2020-02-18"
    },
    {
        "title": "Wind deep garden writer forget.",
        "author": "Lauren Powell",
        "institution": "Lake Jamesfort",
        "source": "Morris PLC",
        "url": "http://www.taylor.com/",
        "year": 2013,
        "date": "2023-04-15"
    },
    {
        "title": "Big even kind yourself at first structure.",
        "author": "Andrew Foster",
        "institution": "North Suzanne",
        "source": "Lucas, Parks and Hunt",
        "url": "https://www.thomas.com/",
        "year": 2020,
        "date": "2024-09-23"
    },
    {
        "title": "Race various become blue.",
        "author": "Tara Taylor",
        "institution": "East Daniel",
        "source": "Hayden-Simmons",
        "url": "https://www.smith.info/",
        "year": 2010,
        "date": "2020-09-06"
    },
    {
        "title": "By star story price no call meeting.",
        "author": "Jill Pineda",
        "institution": "Mooreside",
        "source": "Church, Mccarthy and Cooper",
        "url": "http://wilkins.com/",
        "year": 2024,
        "date": "2022-04-26"
    },
    {
        "title": "One individual kitchen everybody half debate.",
        "author": "Bailey Yang",
        "institution": "Leeton",
        "source": "Brown, Mercado and Anderson",
        "url": "http://martin-fisher.com/",
        "year": 2017,
        "date": "2024-10-23"
    }, {
        "title": "Face discuss people avoid various arrive.",
        "author": "John Kramer",
        "institution": "Garyport",
        "source": "Blankenship-Jacobson",
        "url": "http://www.white-wilson.com/",
        "year": 2001,
        "date": "2022-02-04"
    },
    {
        "title": "Its couple paper guy card.",
        "author": "Sean Foster",
        "institution": "West Lori",
        "source": "Miller, Miranda and Smith",
        "url": "https://watts.com/",
        "year": 2016,
        "date": "2020-06-18"
    },
    {
        "title": "Pull past her tend.",
        "author": "Robert Perez",
        "institution": "West Sandra",
        "source": "Oconnor, Huerta and Phelps",
        "url": "https://www.flores.com/",
        "year": 2021,
        "date": "2021-08-06"
    },
    {
        "title": "Remain blood task throw land power.",
        "author": "Sarah Serrano",
        "institution": "Port Deborah",
        "source": "Carlson-Jacobson",
        "url": "https://lloyd.com/",
        "year": 2023,
        "date": "2020-06-06"
    },
    {
        "title": "Game green often maybe wrong edge.",
        "author": "Jeremy Jones",
        "institution": "Brownburgh",
        "source": "Robles-Kent",
        "url": "http://chung.biz/",
        "year": 2016,
        "date": "2020-05-16"
    },
    {
        "title": "House there as yourself build.",
        "author": "Michael Hale",
        "institution": "Lake Danielfort",
        "source": "Vasquez LLC",
        "url": "https://www.russo-castillo.com/",
        "year": 2023,
        "date": "2025-01-31"
    },
    {
        "title": "Evidence cover than general.",
        "author": "Debra Martinez",
        "institution": "South Jessicaside",
        "source": "Lee PLC",
        "url": "https://smith-carter.com/",
        "year": 2011,
        "date": "2021-05-15"
    },
    {
        "title": "Situation nor positive stop still whose.",
        "author": "Crystal Weaver",
        "institution": "Hernandezfort",
        "source": "Sanders Group",
        "url": "http://www.tran.com/",
        "year": 2002,
        "date": "2023-01-12"
    },
    {
        "title": "Leader offer old ago.",
        "author": "Kyle Gray",
        "institution": "Lake Leonardhaven",
        "source": "Colon-Jacobson",
        "url": "https://www.ramos.biz/",
        "year": 2011,
        "date": "2021-08-30"
    },
    {
        "title": "Bag suddenly include clear.",
        "author": "Matthew White",
        "institution": "East Jessicabury",
        "source": "Nelson Inc",
        "url": "http://obrien-taylor.info/",
        "year": 2013,
        "date": "2020-02-09"
    },
    {
        "title": "Firm finish call second PM check.",
        "author": "Ashley Jackson",
        "institution": "Lake Michele",
        "source": "Black-Gibson",
        "url": "http://www.chen.com/",
        "year": 2011,
        "date": "2020-02-18"
    },
    {
        "title": "Wind deep garden writer forget.",
        "author": "Lauren Powell",
        "institution": "Lake Jamesfort",
        "source": "Morris PLC",
        "url": "http://www.taylor.com/",
        "year": 2013,
        "date": "2023-04-15"
    },
    {
        "title": "Big even kind yourself at first structure.",
        "author": "Andrew Foster",
        "institution": "North Suzanne",
        "source": "Lucas, Parks and Hunt",
        "url": "https://www.thomas.com/",
        "year": 2020,
        "date": "2024-09-23"
    },
    {
        "title": "Race various become blue.",
        "author": "Tara Taylor",
        "institution": "East Daniel",
        "source": "Hayden-Simmons",
        "url": "https://www.smith.info/",
        "year": 2010,
        "date": "2020-09-06"
    },
    {
        "title": "By star story price no call meeting.",
        "author": "Jill Pineda",
        "institution": "Mooreside",
        "source": "Church, Mccarthy and Cooper",
        "url": "http://wilkins.com/",
        "year": 2024,
        "date": "2022-04-26"
    },
    {
        "title": "One individual kitchen everybody half debate.",
        "author": "Bailey Yang",
        "institution": "Leeton",
        "source": "Brown, Mercado and Anderson",
        "url": "http://martin-fisher.com/",
        "year": 2017,
        "date": "2024-10-23"
    }, {
        "title": "Face discuss people avoid various arrive.",
        "author": "John Kramer",
        "institution": "Garyport",
        "source": "Blankenship-Jacobson",
        "url": "http://www.white-wilson.com/",
        "year": 2001,
        "date": "2022-02-04"
    },
    {
        "title": "Its couple paper guy card.",
        "author": "Sean Foster",
        "institution": "West Lori",
        "source": "Miller, Miranda and Smith",
        "url": "https://watts.com/",
        "year": 2016,
        "date": "2020-06-18"
    },
    {
        "title": "Pull past her tend.",
        "author": "Robert Perez",
        "institution": "West Sandra",
        "source": "Oconnor, Huerta and Phelps",
        "url": "https://www.flores.com/",
        "year": 2021,
        "date": "2021-08-06"
    },
    {
        "title": "Remain blood task throw land power.",
        "author": "Sarah Serrano",
        "institution": "Port Deborah",
        "source": "Carlson-Jacobson",
        "url": "https://lloyd.com/",
        "year": 2023,
        "date": "2020-06-06"
    },
    {
        "title": "Game green often maybe wrong edge.",
        "author": "Jeremy Jones",
        "institution": "Brownburgh",
        "source": "Robles-Kent",
        "url": "http://chung.biz/",
        "year": 2016,
        "date": "2020-05-16"
    },
    {
        "title": "House there as yourself build.",
        "author": "Michael Hale",
        "institution": "Lake Danielfort",
        "source": "Vasquez LLC",
        "url": "https://www.russo-castillo.com/",
        "year": 2023,
        "date": "2025-01-31"
    },
    {
        "title": "Evidence cover than general.",
        "author": "Debra Martinez",
        "institution": "South Jessicaside",
        "source": "Lee PLC",
        "url": "https://smith-carter.com/",
        "year": 2011,
        "date": "2021-05-15"
    },
    {
        "title": "Situation nor positive stop still whose.",
        "author": "Crystal Weaver",
        "institution": "Hernandezfort",
        "source": "Sanders Group",
        "url": "http://www.tran.com/",
        "year": 2002,
        "date": "2023-01-12"
    },
    {
        "title": "Leader offer old ago.",
        "author": "Kyle Gray",
        "institution": "Lake Leonardhaven",
        "source": "Colon-Jacobson",
        "url": "https://www.ramos.biz/",
        "year": 2011,
        "date": "2021-08-30"
    },
    {
        "title": "Bag suddenly include clear.",
        "author": "Matthew White",
        "institution": "East Jessicabury",
        "source": "Nelson Inc",
        "url": "http://obrien-taylor.info/",
        "year": 2013,
        "date": "2020-02-09"
    },
    {
        "title": "Firm finish call second PM check.",
        "author": "Ashley Jackson",
        "institution": "Lake Michele",
        "source": "Black-Gibson",
        "url": "http://www.chen.com/",
        "year": 2011,
        "date": "2020-02-18"
    },
    {
        "title": "Wind deep garden writer forget.",
        "author": "Lauren Powell",
        "institution": "Lake Jamesfort",
        "source": "Morris PLC",
        "url": "http://www.taylor.com/",
        "year": 2013,
        "date": "2023-04-15"
    },
    {
        "title": "Big even kind yourself at first structure.",
        "author": "Andrew Foster",
        "institution": "North Suzanne",
        "source": "Lucas, Parks and Hunt",
        "url": "https://www.thomas.com/",
        "year": 2020,
        "date": "2024-09-23"
    },
    {
        "title": "Race various become blue.",
        "author": "Tara Taylor",
        "institution": "East Daniel",
        "source": "Hayden-Simmons",
        "url": "https://www.smith.info/",
        "year": 2010,
        "date": "2020-09-06"
    },
    {
        "title": "By star story price no call meeting.",
        "author": "Jill Pineda",
        "institution": "Mooreside",
        "source": "Church, Mccarthy and Cooper",
        "url": "http://wilkins.com/",
        "year": 2024,
        "date": "2022-04-26"
    },
    {
        "title": "One individual kitchen everybody half debate.",
        "author": "Bailey Yang",
        "institution": "Leeton",
        "source": "Brown, Mercado and Anderson",
        "url": "http://martin-fisher.com/",
        "year": 2017,
        "date": "2024-10-23"
    }
];



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

    // 返回上一级页面的函数
    const handleGoBack = () => {
        router.back();  // Go back to the previous page
    };

    // 导出PDF的函数
    const exportToPdf = async () => {
        const pdfMake = await import('pdfmake/build/pdfmake');
        const pdfFonts = await import('pdfmake/build/vfs_fonts');
        // pdfMake.vfs = pdfFonts.pdfMake.vfs;

        // 处理数据，排除不可见的列
        const tableData = [
            ['#',
                columnsVisibility.title && 'Title',
                columnsVisibility.author && 'Author',
                columnsVisibility.institution && 'Institution',
                columnsVisibility.source && 'Source',
                columnsVisibility.url && 'URL',
                columnsVisibility.year && 'Year',
                columnsVisibility.date && 'Date'
            ].filter(Boolean),  // 过滤掉值为 false 的列名
            ...data.map((row, index) => [
                index + 1,
                columnsVisibility.title && row.title,
                columnsVisibility.author && row.author,
                columnsVisibility.institution && row.institution,
                columnsVisibility.source && row.source,
                columnsVisibility.url && row.url,
                columnsVisibility.year && row.year,
                columnsVisibility.date && row.date,
            ].filter(Boolean)), // 过滤掉值为 false 的数据
        ];



        // PDF 文档的定义
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            content: [
                {
                    text: 'Data Table',
                    style: 'header',
                    alignment: 'center',
                },
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
                header: {
                    fontSize: 10,
                    // bold: true,
                    margin: [0, 10],
                },
                tableExample: {
                    margin: [0, 5, 0, 15],
                    fontSize: 5,
                },
            }
        };

        // 创建PDF并下载
        pdfMake.createPdf(docDefinition).download('data.pdf');
    };

    // 切换列的可见性
    const toggleColumnVisibility = (column) => {
        setColumnsVisibility((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    return (
        <Box sx={{ width: '100%', padding: 3 }}>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleGoBack}
                sx={{
                    marginBottom: 2,
                    boxShadow: 3,
                    '&:hover': { boxShadow: 6 },
                }}
            >
                返回
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={exportToPdf}
                sx={{ marginBottom: 2, marginLeft: 2 }}
            >
                导出PDF
            </Button>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Data Table
            </Typography>

            {/* 可见列的控制按钮 */}
            <Box sx={{ width: '100%', padding: 3 }}>
                {/* 可见列的控制复选框 */}
                <Typography variant="h6" gutterBottom>
                    导出筛选
                </Typography>
                <Box sx={{ marginBottom: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={columnsVisibility.title}
                                onChange={() => toggleColumnVisibility('title')}
                                color="primary"
                            />
                        }
                        label="标题列"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={columnsVisibility.author}
                                onChange={() => toggleColumnVisibility('author')}
                                color="primary"
                            />
                        }
                        label="作者列"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={columnsVisibility.institution}
                                onChange={() => toggleColumnVisibility('institution')}
                                color="primary"
                            />
                        }
                        label="机构地区列"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={columnsVisibility.source}
                                onChange={() => toggleColumnVisibility('source')}
                                color="primary"
                            />
                        }
                        label="出处列"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={columnsVisibility.url}
                                onChange={() => toggleColumnVisibility('url')}
                                color="primary"
                            />
                        }
                        label="网址列"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={columnsVisibility.year}
                                onChange={() => toggleColumnVisibility('year')}
                                color="primary"
                            />
                        }
                        label="年期列"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={columnsVisibility.date}
                                onChange={() => toggleColumnVisibility('date')}
                                color="primary"
                            />
                        }
                        label="上网时间列"
                    />
                </Box>
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
                        {data.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                    '&:hover': { backgroundColor: '#f1f1f1' },
                                    borderTop: '1px solid #ddd',
                                    borderBottom: '1px solid #ddd',
                                }}
                            >
                                <TableCell sx={tableCellStyle}>{index + 1}</TableCell>
                                {columnsVisibility.title && <TableCell sx={tableCellStyle}>{row.title}</TableCell>}
                                {columnsVisibility.author && <TableCell sx={tableCellStyle}>{row.author}</TableCell>}
                                {columnsVisibility.institution && <TableCell sx={tableCellStyle}>{row.institution}</TableCell>}
                                {columnsVisibility.source && <TableCell sx={tableCellStyle}>{row.source}</TableCell>}
                                {columnsVisibility.url && <TableCell sx={tableCellStyle}>
                                    <Link href={row.url} target="_blank" rel="noopener" color="primary" sx={{ wordWrap: 'break-word' }}>
                                        {row.url}
                                    </Link>
                                </TableCell>}
                                {columnsVisibility.year && <TableCell sx={tableCellStyle}>{row.year}</TableCell>}
                                {columnsVisibility.date && <TableCell sx={tableCellStyle}>{row.date}</TableCell>}
                            </TableRow>
                        ))}
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