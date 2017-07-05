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
import image6 from './images/06.png';
import image7 from './images/07.png';

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
                    <p className='legend'>Difficile de vous organiser</p>               
                </div>
                <div>
                    <Image src={image2} centered/> 
                    <p className='legend'>OLGA vous assiste pour les RDV</p>
                </div>
                <div>
                    <Image src={image3} centered/> 
                    <p className='legend'>De toute la famille</p>
                </div>
                <div>
                    <Image src={image4} centered/> 
                    <p className='legend'>Pour vos projets également</p>
                </div>
                <div>
                    <Image src={image5} centered/> 
                    <p className='legend'>Les vacances</p>
                </div>
                <div>
                    <Image src={image6} centered/> 
                    <p className='legend'>L'éducation</p>
                </div>
                <div>
                    <Image src={image7} centered/> 
                    <p className='legend'>Venez découvrir OLGA</p>
                </div>
            </Carousel>
        )
    }
}

export default CarouselACDO;