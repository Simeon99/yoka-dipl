import React from "react";

import './drop-down-card.styles.scss'

const DropDownCard = ({imageUrl, title}) =>(
    <div className="drop-down-card">
        <div className="background-image"
        style={{
            backgroundImage: `url(${imageUrl})`
        }} 
        
        />
        <div className='content'>
            <h1 className='title'>{title}</h1>
            <span className="subtitle">View products</span>
        </div>
    </div>
)
export default DropDownCard