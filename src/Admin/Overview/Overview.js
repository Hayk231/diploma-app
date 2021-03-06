import React, {useEffect, useState} from 'react';
import './Overview.scss';
import {Link} from "react-router-dom";
import ChartComponent from "../../Helpers/components/ChartComponent/ChartComponent";
import axios from "axios";
import {baseUrl, getToken} from "../../Helpers/Constants";
import moment from "moment";
import CountUp from 'react-countup';
import Loading from "../../Helpers/components/Loading/Loading";
import {setLoading} from "../../redux/loadingActions";
import {outUser} from "../../redux/Admin/adminActions";
import {useDispatch} from "react-redux";

const Overview = () => {

    const [appData, setAppData] = useState({});
    const AuthStr = 'Bearer '.concat(getToken());
    const dispatch = useDispatch();

    useEffect(() => {
        submitRange({
            from: new Date((new Date()).setMonth((new Date()).getMonth()-1)),
            to: new Date(),
        })
    }, []);

    const submitRange = (range) => {
        axios.get(baseUrl + 'data', {
            params: {
                chartMinDate: moment(range.from).valueOf(),
                chartMaxDate: moment(range.to).valueOf()
            },
            headers: {Authorization: AuthStr}
        }).then(res => {
            setAppData(res.data)
        }).catch(error => {
            dispatch(setLoading(false))
            if (error && error.response && error.response.status === 401) {
                dispatch(outUser())
            }
        })
    }

    const sectionCounters = [
        { url: './users', label: 'Users', count: appData.userCount || 0 },
        { url: './goals', label: 'Goals', count: (appData.activeGoalCount || appData.inactiveGoalCount)
                                                    ? appData.activeGoalCount + appData.inactiveGoalCount : 0},
        { url: './donations', label: 'Donations', count: appData.donationCount || 0 },
    ];

    if (!appData.userCount) {
        return <Loading/>
    }

    return (
        <div className='overview_container'>
            <h1>Overview</h1>
            <div className='overview_counter_container'>
                {
                    sectionCounters.map(el => (
                        <Link to={el.url} key={el.url}>
                            <div>{el.label}</div>
                            <div>
                                <CountUp end={el.count} duration={1}/>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <div style={{width: '100%', height: '500px'}}>
                <ChartComponent data={appData.chartData} customColor='#3751FF' submitRange={submitRange}/>
            </div>
        </div>
    );
};

export default Overview;