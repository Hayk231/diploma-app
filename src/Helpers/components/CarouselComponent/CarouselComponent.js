import React from 'react';
import Carousel from 'react-material-ui-carousel'

const CarouselComponent = ({ imagesData }) => {
    let items = [
        {url: 'https://d302e0npexowb4.cloudfront.net/wp-content/uploads/2017/09/04142300/IMG-WORLDS-THEME-PARK-EXTERIOR-a.jpg'},
        {url: 'https://www.cloud3dprint.com/assets/images/img/1920x1080/img19.jpg'},
        {url: 'https://wallpaperaccess.com/full/30100.jpg'}
    ];

    if (imagesData.length) {
        items = imagesData
    }

    return (
        <Carousel timeout={300}>
            {
                items.map((item, i) => (
                    <div key={i} className='goal_expanded_carousel_item' style={{backgroundImage: `url(${item.url})`}}/>
                ))
            }
        </Carousel>
    )
}

export default CarouselComponent