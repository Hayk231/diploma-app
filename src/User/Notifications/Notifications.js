import React from 'react';
import './Notifications.scss';
import CustomButton from "../../Helpers/components/CustomButton";
import {useDispatch, useSelector} from "react-redux";
// import noImage from "../images/noImage.png";
import defImage from '../images/default_image.jpg';
import {useHistory} from "react-router-dom";
import {notificationDelete, notificationSeen} from "../../redux/User/userMiddlewares";

const Notifications = () => {

        const {notifications} = useSelector(state => state.user);
        const dispatch = useDispatch();
        const history = useHistory();

        const openGoal = (notif) => {
            history.push(`goal/${notif.goalId}`);
            dispatch(notificationSeen(notif.notificationId))
        }

        const openGoalDonation = (event, notif) => {
            event.stopPropagation()
            history.push(`donate/${notif.goalId}`);
            dispatch(notificationSeen(notif.notificationId))
        }

        return (
            <div className='notifications_container'>
                {
                    notifications.map(el => (
                        <div key={el.notificationId} className='notification_single_container'>
                            <div className='notification_single' onClick={() => openGoal(el)}>
                                <img src={el.thumbnailImageUrl || defImage} alt={el.title}/>
                                <div className='notification_single_right_wrapper'>
                                    <div className='notification_single_texts'>
                                        <h2>{el.title}</h2>
                                        <div>{el.description}</div>
                                    </div>
                                    {el.type === 'REMINDER' && (
                                        <div className='notifications_single_button'>
                                            <CustomButton radius='4px' customHeight='40px'
                                                          customWidth='140px' onClick={(e) => openGoalDonation(e, el)}>
                                                Donate Now
                                            </CustomButton>
                                        </div>
                                    )}
                                </div>
                                {el.isNew && <div className='notification_single_indicator'></div>}
                            </div>
                            <button onClick={(event) => {
                                event.stopPropagation();
                                dispatch(notificationDelete(el.notificationId))
                            }} className='notification_single_delete_button'>
                                X
                            </button>
                        </div>
                    ))
                }
            </div>
        );
    }
;

export default Notifications;