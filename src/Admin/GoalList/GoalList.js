import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGoals} from "../../redux/User/userMiddlewares";
import Loading from "../../Helpers/components/Loading/Loading";
import EnhancedTable from "./ListTable";

const GoalList = () => {

    const { loading } = useSelector(state => state.loading);
    const { allGoals } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGoals('DISCOVER'))
    }, []);

    if (loading) {
        return <Loading/>
    }
    console.log(allGoals)
    return (
        <div>
            <EnhancedTable rows={allGoals}/>
        </div>
    );
};

export default GoalList;