import React, {useEffect, useRef, useState} from 'react';
import './ModalContainer.scss';
import {useDispatch, useSelector} from "react-redux";
import {closeEditModal} from "../../../redux/User/userActions";
import InfoContent from "./InfoContent";
import PassContent from "./PassContent";
import CardContent from "./CardContent";
import ReminderContent from "./ReminderContent";
import Loading from "../Loading/Loading";

const ModalContainer = ({type}) => {

    const [openClass, setOpenClass] = useState('');
    const { loading } = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setOpenClass('open');
        }, 0)

        return () => {
            setOpenClass('');
        }
    }, [])

    const closeModal = (e) => {
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

    let content = getComponent(type);

    return (
        <div className='modal_container' ref={modalRef} onClick={closeModal}>
            { loading && <Loading/> }
            <div className={`modal_content ${openClass}`} onClick={event => event.stopPropagation()}>
                {content}
            </div>
        </div>
    );
};

export default ModalContainer;