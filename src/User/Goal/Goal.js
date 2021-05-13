import React, {useEffect, useState} from 'react';
import './Goal.scss';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CarouselComponent from "../../Helpers/components/CarouselComponent/CarouselComponent";
import ChartComponent from "../../Helpers/components/ChartComponent/ChartComponent";
import CustomButton from "../../Helpers/components/CustomButton";
import EventIcon from '@material-ui/icons/Event';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
// import {openEditModal} from "../../redux/User/userActions";
import ModalContainer from "../../Helpers/components/ModalContainer/ModalContainer";
import axios from "axios";
import {baseUrl, getToken} from "../../Helpers/Constants";
import {deleteReminder, setReminder} from "../../redux/User/userMiddlewares";
import defImage from '../images/default_image.jpg';
import Loading from "../../Helpers/components/Loading/Loading";

const Goal = () => {
    const [reminderActive, setReminderActive] = useState(false);
    const [goalData, setGoalData] = useState('');
    const [goalStatData, setGoalStatData] = useState([]);
    const {goalId} = useParams();
    const {editModal} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const AuthStr = 'Bearer '.concat(getToken());

    useEffect(() => {
        getGoalData()
        getGoalReminderStatus();
    }, []);

    const getGoalData = () => {
        const AuthStr = 'Bearer '.concat(getToken());
        axios.get(baseUrl + 'goals', {
            params: {filter: 'ID', goalId},
            headers: {Authorization: AuthStr}
        }).then(res => {
            setGoalData(res.data[0])
            getGoalStatData(res.data[0])
        })
    }

    const getGoalStatData = ({organizationUserId, id}) => {
        axios.get(baseUrl + `goals/${organizationUserId}/${id}/data`, {
            headers: {Authorization: AuthStr}
        }).then(res => {
            setGoalStatData(res.data)
        })
    }

    const getGoalReminderStatus = () => {
        axios.get(baseUrl + `reminders/${goalId}`, {
            headers: {Authorization: AuthStr}
        }).then(res => {
            setReminderActive(res.data.exists)
        })
    }

    const setReminderHandler = () => {
        reminderActive ? dispatch(deleteReminder(goalId)) : dispatch(setReminder(goalId));
        setReminderActive(!reminderActive);
    }

    if (!goalData.id) {
        return <Loading/>
    }
    return (
        <div className='goal_expanded'>
            {editModal && <ModalContainer type={editModal}/>}
            <div className='goal_expanded_image'
                 style={{backgroundImage: `url(${goalData.thumbnailImageData ? goalData.thumbnailImageData.url : defImage})`}}>
            </div>
            <div className='goal_expanded_content'>
                <div className='goal_expanded_texts'>
                    <h2>{goalData.title}</h2>
                    <p>{goalData.description}</p>
                </div>
                <div className='goal_expanded_statistics_container'>
                    <div className='goal_expanded_col_and_amount'>
                        <span>$ {Math.round(goalData.statistics.collected * 100) / 100}</span>
                        <span>$ {Math.round(goalData.amount * 100) / 100}</span>
                    </div>
                    <div className='goal_expanded_statistics_scale'>
                        <div style={{width: `${(goalData.statistics.collected / goalData.amount) * 100}%`}}></div>
                    </div>
                    <div className='goal_expanded_supporters'>
                        {`${goalData.statistics.supportersCount} supporter${(goalData.statistics.supportersCount > 1) ? 's' : ''}`}
                    </div>
                </div>
                <ChartComponent data={goalStatData.chartData || []}/>
                <CarouselComponent imagesData={goalStatData.imagesData || []}/>
                <div className='goal_expanded_buttons'>
                    <div>
                        <CustomButton radius='4px'
                                      onClick={() => history.push(`/user/donate/${goalData.id}`)}>
                            Donate Now
                        </CustomButton>
                    </div>
                    <div>
                        <CustomButton radius='4px' style='light' customWidth='auto' customPadding='10px 20px'
                                      icon={EventIcon} onClick={setReminderHandler}>
                            { reminderActive ? 'Remove Reminder' : 'Set Reminder' }
                        </CustomButton>
                        <CustomButton radius='4px' style='light' customWidth='160px'
                                      customPadding='10px 20px' icon={NotificationsActiveIcon}>
                            Subscribe
                        </CustomButton>
                        <CustomButton radius='4px' style='light' customWidth='160px'
                                      customPadding='10px 20px' icon={ShareOutlinedIcon}>
                            Share
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Goal;