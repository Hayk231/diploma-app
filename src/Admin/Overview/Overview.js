import React from 'react';
import './Overview.scss';
import {Link} from "react-router-dom";
import ChartComponent from "../../Helpers/components/ChartComponent/ChartComponent";

const sectionCounters = [
    { url: './users', label: 'Users', count: 12400 },
    { url: './goals', label: 'Goals', count: 17 },
    { url: './donations', label: 'Donations', count: 178000 },
];

const chartData = [
    {
        date: "2021-04-12",
        amount: 23,
        "count": 123
    },
    {
        date: "2021-04-14",
        amount: 30,
        "count": 123
    },
    {
        date: "2021-04-16",
        amount: 35,
        "count": 123
    },
    {
        date: "2021-04-20",
        amount: 40,
        "count": 123
    },
    {
        date: "2021-05-06",
        amount: 50,
        "count": 123
    },
]

const Overview = () => {
    return (
        <div className='overview_container'>
            <h1>Overview</h1>
            <div className='overview_counter_container'>
                {
                    sectionCounters.map(el => (
                        <Link to={el.url} key={el.url}>
                            <div>{el.label}</div>
                            <div>{el.count}</div>
                        </Link>
                    ))
                }
            </div>
            <div style={{width: '100%', height: '500px'}}>
                <ChartComponent data={chartData} customColor='#3751FF'/>
            </div>
        </div>
    );
};

export default Overview;