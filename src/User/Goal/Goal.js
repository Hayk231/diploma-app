import React, {useEffect} from 'react';
import './Goal.scss';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CarouselComponent from "../../Helpers/components/CarouselComponent/CarouselComponent";
import ChartComponent from "../../Helpers/components/ChartComponent/ChartComponent";
import CustomButton from "../../Helpers/components/CustomButton";
import EventIcon from '@material-ui/icons/Event';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import {openEditModal} from "../../redux/User/userActions";
import ModalContainer from "../../Helpers/components/ModalContainer/ModalContainer";
import axios from "axios";
import {baseUrl, getToken} from "../../Helpers/Constants";

const Goal = () => {

    const {allGoals} = useSelector(state => state.user);
    const {organizationUserId, goalId} = useParams();
    const goalData = allGoals.find(el => el.organizationUserId == organizationUserId && el.id == goalId);
    const { editModal } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const AuthStr = 'Bearer '.concat(getToken());
        axios.get(baseUrl + `goals/${organizationUserId}/${goalId}/data`, {
            headers: {Authorization: AuthStr}
        })
            .then(res => {
            console.log(res.data)
        })
    }, [])

    if (!goalData) {
        return <div>loading</div>
    }
    return (
        <div className='goal_expanded'>
            { editModal && <ModalContainer type={editModal}/> }
            <div className='goal_expanded_image' style={{backgroundImage: `url(${goalData.thumbnailImageData.url})`}}>
            </div>
            <div className='goal_expanded_content'>
                <div className='goal_expanded_texts'>
                    <h2>{goalData.title}</h2>
                    <p>{goalData.description}</p>
                </div>
                <div className='goal_expanded_statistics_container'>
                    <div className='goal_expanded_col_and_amount'>
                        <span>$ {goalData.statistics.collected}</span>
                        <span>$ {goalData.amount}</span>
                    </div>
                    <div className='goal_expanded_statistics_scale'>
                        <div style={{width: `${(goalData.statistics.collected / goalData.amount) * 100}%`}}></div>
                    </div>
                    <div className='goal_expanded_supporters'>
                        {`${goalData.statistics.supportersCount} supporter${(goalData.statistics.supportersCount > 1) ? 's' : ''}`}
                    </div>
                </div>
                <ChartComponent/>
                <CarouselComponent/>
                <div className='goal_expanded_buttons'>
                    <div>
                        <CustomButton radius='4px'
                                      onClick={() => history.push(`/user/donate/${goalData.organizationUserId}-${goalData.id}`)}>
                            Donate Now
                        </CustomButton>
                    </div>
                    <div>
                        <CustomButton radius='4px' style='light' customWidth='160px' customPadding='10px 20px'
                                      icon={EventIcon} onClick={() => dispatch(openEditModal('reminder'))}>
                            Set Reminder
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