import React, {useEffect, useState} from 'react';
import './Goal.scss';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CarouselComponent from "../../Helpers/components/CarouselComponent/CarouselComponent";
import ChartComponent from "../../Helpers/components/ChartComponent/ChartComponent";
import CustomButton from "../../Helpers/components/CustomButton";
import EventIcon from '@material-ui/icons/Event';
import EventBusyIcon from '@material-ui/icons/EventBusy';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
// import {openEditModal} from "../../redux/User/userActions";
import ModalContainer from "../../Helpers/components/ModalContainer/ModalContainer";
import axios from "axios";
import {baseUrl, getToken} from "../../Helpers/Constants";
import {deleteReminder, setReminder} from "../../redux/User/userMiddlewares";
import defImage from '../images/default_image.jpg';
import Loading from "../../Helpers/components/Loading/Loading";
import moment from "moment";
import ShareButtons from "../../Helpers/components/ShareButtons";

const Goal = () => {
    const [reminderActive, setReminderActive] = useState(false);
    const [goalData, setGoalData] = useState('');
    const [goalStatData, setGoalStatData] = useState([]);
    const [orgUserId, setOrgUserId] = useState([]);
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
            setGoalData(res.data[0]);
            setOrgUserId(res.data[0].organizationUserId)
            getGoalStatData({
                ...res.data[0], range: {
                    from: new Date((new Date()).setMonth((new Date()).getMonth() - 1)),
                    to: new Date(),
                }
            })
        })
    }

    const getGoalStatData = ({organizationUserId = orgUserId, id = goalId, range}) => {
        axios.get(baseUrl + `goals/${organizationUserId}/${id}/data`, {
            params: {
                chartMinDate: moment(range.from).valueOf(),
                chartMaxDate: moment(range.to).valueOf()
            },
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

    const shareUrl = `https://fndrisr.herokuapp.com/goals/${goalData.organizationUserId}/${goalData.id}/view`;
    const mediaUrl = goalData.thumbnailImageData ? goalData.thumbnailImageData.url : '';

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
                <ChartComponent data={goalStatData.chartData || []} sortBy='count'
                                submitRange={(range) => getGoalStatData({range})}/>
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
                                      icon={reminderActive ? EventBusyIcon : EventIcon} onClick={setReminderHandler}>
                            {reminderActive ? 'Remove Reminder' : 'Set Reminder'}
                        </CustomButton>
                        {/*<CustomButton radius='4px' style='light' customWidth='160px'*/}
                        {/*              customPadding='10px 20px' icon={NotificationsActiveIcon}>*/}
                        {/*    Subscribe*/}
                        {/*</CustomButton>*/}
                    </div>
                    <div className='goal_expanded_share'>
                        <div>
                            <ShareOutlinedIcon/>
                            Share Goal:
                        </div>
                        <ShareButtons shareUrl={shareUrl} mediaUrl={mediaUrl}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Goal;