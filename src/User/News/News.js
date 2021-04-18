import React from 'react';
import './News.scss';
import { useSelector } from "react-redux";
import SingleGoal from "../../Helpers/components/SingleGoal/SingleGoal";
import Loading from "../../Helpers/components/Loading/Loading";

const News = () => {

    const { allGoals } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.loading);

    return (
        <div className='news_container'>
            { loading && <Loading/> }
            {
                allGoals.map(goal => (
                    <SingleGoal goal={goal} key={goal.id}/>
                ))
            }
        </div>
    );
};

export default News;