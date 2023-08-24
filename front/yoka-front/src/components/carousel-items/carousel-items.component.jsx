import React from "react";
import CarouselItem from "../carousel-item/carousel-item.component";

class CarouselItemsList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            images: ['img/home-page/sugg-flat-sh.png','img/home-page/sugg-oyster-kitc.png','img/home-page/sugg-bark-sb.png']
        }
    }

    render(){
        return(
            
            this.state.images.map( i =>(
                <CarouselItem imageUrl={i}/>
            ))
            
        )
    }
} export default CarouselItemsList