import React from 'react';
import './Notifications.scss';
import CustomButton from "../../Helpers/components/CustomButton";

const notifications = [
    {
        title: 'Reminder-Company name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcu \n' +
            'tpat interdum aliquet. consectetur adipiscing elit. Mauris ullamcorper massa volutpat interdum aliquet.',
        image: 'https://p0.pikist.com/photos/453/521/night-city-architecture-urban-lights-dark-buildings-modern.jpg',
        type: 'reminder'
    },
    {
        title: 'Reminder-Company name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcu \n' +
            'tpat interdum aliquet. consectetur adipiscing elit. Mauris ullamcorper massa volutpat interdum aliquet.',
        image: 'https://p0.pikist.com/photos/453/521/night-city-architecture-urban-lights-dark-buildings-modern.jpg',
        type: 'reminder'
    },
    {
        title: 'Notify-Company name',
        count: 150,
        image: 'https://www.breakingparadigms.org/wp-content/cache/podlove/22/7e96547aa39fce3bb4175c263bd6fe/car-and-the-city_500x.jpg',
    },
    {
        title: 'Reminder-Company name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcu \n' +
            'tpat interdum aliquet. consectetur adipiscing elit. Mauris ullamcorper massa volutpat interdum aliquet.',
        image: 'https://p0.pikist.com/photos/453/521/night-city-architecture-urban-lights-dark-buildings-modern.jpg',
        type: 'reminder'
    },
    {
        title: 'Reminder-Company name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcu \n' +
            'tpat interdum aliquet. consectetur adipiscing elit. Mauris ullamcorper massa volutpat interdum aliquet.',
        image: 'https://p0.pikist.com/photos/453/521/night-city-architecture-urban-lights-dark-buildings-modern.jpg',
        type: 'reminder'
    },
]

const Notifications = () => {
    return (
        <div className='notifications_container'>
            {
                notifications.map((el, index) => (
                    <div className='notification_single' key={index}>
                        <img src={el.image} alt={el.title}/>
                        <div className='notification_single_texts'>
                            <h2>{el.title}</h2>
                            <div>
                                {el.type === 'reminder' ? el.description : `Charged: ${el.count}$`}
                            </div>
                        </div>
                        {el.type === 'reminder' && (
                            <div className='notifications_single_button'>
                                <CustomButton radius='4px' customHeight='40px' customWidth='140px'>
                                    Donate Now
                                </CustomButton>
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    );
}
;

export default Notifications;