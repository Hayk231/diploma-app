import React, {useEffect} from 'react';
import '../News/News.scss';
import {getGoals} from "../../redux/User/userMiddlewares";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../Helpers/components/Loading/Loading";
import SingleGoal from "../../Helpers/components/SingleGoal/SingleGoal";

const MyGoals = () => {

    const dispatch = useDispatch();
    const { myGoals } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.loading);

    useEffect(() => {
        dispatch(getGoals('SUBSCRIPTION'));
    }, []);

    return (
        <div className='news_container'>
            { loading && <Loading/> }
            {
                myGoals.map(goal => (
                    <SingleGoal goal={goal} key={goal.id}/>
                ))
            }
        </div>
    );
};

export default MyGoals;