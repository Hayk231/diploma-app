import React from 'react';
import Carousel from 'react-material-ui-carousel'

const CarouselComponent = (props) => {
    const items = [
        'https://d302e0npexowb4.cloudfront.net/wp-content/uploads/2017/09/04142300/IMG-WORLDS-THEME-PARK-EXTERIOR-a.jpg',
        'https://www.cloud3dprint.com/assets/images/img/1920x1080/img19.jpg',
        'https://wallpaperaccess.com/full/30100.jpg'
    ]

    return (
        <Carousel timeout={300}>
            {
                items.map((item, i) => (
                    <div key={i} className='goal_expanded_carousel_item' style={{backgroundImage: `url(${item})`}}/>
                ))
            }
        </Carousel>
    )
}

export default CarouselComponent