import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl, getToken} from "../../../Helpers/Constants";
import Loading from "../../../Helpers/components/Loading/Loading";

const GoalImageModal = ({data}) => {

    const [goalStatData, setGoalStatData] = useState([]);
    const [customLoading, setCustomLoading] = useState(false);
    const AuthStr = 'Bearer '.concat(getToken());

    useEffect(() => {
        setCustomLoading(true)
        axios.get(baseUrl + `goals/${data.organizationUserId}/${data.id}/data`, {
            headers: {Authorization: AuthStr}
        }).then(res => {
            setGoalStatData(res.data);
            setCustomLoading(false)
        })
    },[])
    console.log('stat', goalStatData)
    return (
        <>
            { customLoading && <Loading/>}
            image
        </>
    );
}

export default GoalImageModal;