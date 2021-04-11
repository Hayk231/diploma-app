import React, {useEffect, useRef, useState} from 'react';
import './EditModal.scss';
import {useDispatch} from "react-redux";
import {closeEditModal} from "../../../redux/User/userActions";
import InfoContent from "./InfoContent";
import PassContent from "./PassContent";
import CardContent from "./CardContent";
import ReminderContent from "./ReminderContent";

const ModalContainer = ({ type }) => {

    const [openClass, setOpenClass] = useState('')
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', closeModal);
        setTimeout(() => {
            setOpenClass('open');
        }, 0)

        return () => {
            document.removeEventListener('click', closeModal);
            setOpenClass('');
        }
    }, [])

    const closeModal = (e) => {
        if (e.target.contains(modalRef.current)) {
            dispatch(closeEditModal())
        }
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
        <div className='modal_container' ref={modalRef}>
            <div className={`modal_content ${openClass}`}>
                { content }
            </div>
        </div>
    );
};

export default ModalContainer;