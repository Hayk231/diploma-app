import React, {useEffect, useRef, useState} from 'react';
import './ModalContainer.scss';
import {useDispatch, useSelector} from "react-redux";
import {closeEditModal} from "../../../redux/User/userActions";
import InfoContent from "./InfoContent";
import PassContent from "./PassContent";
import CardContent from "./CardContent";
import ReminderContent from "./ReminderContent";
import Loading from "../Loading/Loading";
import GoalTextModal from "../../../Admin/Goals/GoalModal/GoalTextModal";
import GoalImageModal from "../../../Admin/Goals/GoalModal/GoalImageModal";
import GoalAddModal from "../../../Admin/Goals/GoalModal/GoalAddModal";
import UserAddModal from "../../../Admin/Users/UserModal/UserAddModal";

const ModalContainer = ({type: editData}) => {

    const [openClass, setOpenClass] = useState('');
    const { loading } = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const modalContentRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setOpenClass('open');
        }, 0)

        return () => {
            setOpenClass('');
        }
    }, [])

    const closeModal = () => {
        dispatch(closeEditModal())
    }

    const getComponent = (type) => {
        const components = {
            info: <InfoContent/>,
            pass: <PassContent/>,
            card: <CardContent/>,
            reminder: <ReminderContent/>
        }
        return components[type]
    }

    const getComponentWIthData = (editData) => {
        const components = {
            goalTextEdit: <GoalTextModal data={editData.data}/>,
            goalAdd: <GoalAddModal/>,
            goalImageEdit: <GoalImageModal data={editData.data}/>,
            userAdd: <UserAddModal data={editData.data}/>,
        }
        return components[editData.type]
    }

    let content = '';
    if (editData.data) {
        content = getComponentWIthData(editData);
    } else {
        content = getComponent(editData);
    }

    return (
        <div className='modal_container' ref={modalRef} onClick={closeModal}>
            { loading && <Loading/> }
            <div className={`modal_content ${openClass}`} ref={modalContentRef}
                 onClick={event => event.stopPropagation()}>
                {content}
            </div>
        </div>
    );
};

export default ModalContainer;