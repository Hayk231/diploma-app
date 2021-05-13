import React from 'react';
import './SingleGoal.scss';
import CustomButton from "../CustomButton";
import {useHistory} from "react-router-dom";
// import noImage from '../../../User/images/noImage.png';
import defImage from '../../../User/images/default_image.jpg';

const SingleGoal = ({goal}) => {

    const history = useHistory();

    const donateForGoal = (e, goalId) => {
        e.stopPropagation();
        history.push(`/user/donate/${goalId}`)
    }
    return (
        <div className='news_single_goal' onClick={() => history.push(`/user/goal/${goal.id}`)}>
            <div className='news_single_goal_image'
                 style={{backgroundImage: `url(${goal.thumbnailImageData ? goal.thumbnailImageData.url : defImage})`}}>
            </div>
            <div className='news_single_goal_content'>
                <div className='news_single_goal_texts'>
                    <h2>{goal.title}</h2>
                    <p>{goal.description}</p>
                </div>
                <div className='news_single_goal_statistics_container'>
                    <div className='news_single_goal_statistics_info'>
                        <div className='goal_col_and_amount'>
                            <span>$ {Math.round(goal.statistics.collected * 100) / 100}</span>
                            <span>$ {Math.round(goal.amount * 100) / 100}</span>
                        </div>
                        <div className='goal_statistics_scale'>
                            <div style={{width: `${(goal.statistics.collected / goal.amount) * 100}%`}}></div>
                        </div>
                        <div className='goal_supporters'>
                            {`${goal.statistics.supportersCount} supporter${(goal.statistics.supportersCount > 1) ? 's' : ''}`}
                        </div>
                    </div>
                    <CustomButton radius='4px' customHeight='40px'
                                  onClick={(e) => donateForGoal(e, goal.id)}>
                        Donate
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default SingleGoal;