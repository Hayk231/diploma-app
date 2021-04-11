import React from 'react';
import './News.scss';
import {useSelector} from "react-redux";
import SingleGoal from "../../Helpers/components/SingleGoal/SingleGoal";

const News = () => {

    const {allGoals} = useSelector(state => state.user);

    return (
        <div className='news_container'>
            {
                allGoals.map(goal => (
                    <SingleGoal goal={goal} key={goal.id}/>
                ))
            }
        </div>
    );
};

export default News;