import React, {Component} from 'react';
import { Image } from 'semantic-ui-react';

import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/main.css';
import 'react-responsive-carousel/lib/styles/carousel.css';

import image1 from './images/01.png';
import image2 from './images/02.png';
import image3 from './images/03.png';
import image4 from './images/04.png';
import image5 from './images/05.png';

class CarouselACDO extends Component{
    render(){
        return(
            <Carousel
                showArrows={true}
                width='600px'
                height='400px'
            >
                <div>
                    <Image src={image1} centered/>                    
                </div>
                <div>
                    <Image src={image2} centered/> 
                </div>
                <div>
                    <Image src={image3} centered/> 
                </div>
                <div>
                    <Image src={image4} centered/> 
                </div>
                <div>
                    <Image src={image5} centered/> 
                </div>
            </Carousel>
        )
    }
}

export default CarouselACDO;