import React from "react";

import './carousel-item.styles.scss'

const CarouselItem = ({imageUrl, title, size}) =>(
    <div className="image-container increase-size">
        <img 
         draggable={false}
         style={{ width: "100%", cursor: "pointer" }}
        src={imageUrl} />
    </div>
)
export default CarouselItem