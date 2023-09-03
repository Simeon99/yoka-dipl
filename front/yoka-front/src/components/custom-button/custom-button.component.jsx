import React from "react";

import './custom-button.styles.scss'

const CustomButton = ({children, isRounded, ...otherProps}) => (

    <button className={` ${isRounded? 'is-rounded':''} ${otherProps.unclickable ? 'unclickable': ''} ${otherProps.isWhite ? 'isWhite': ''} custom-button`} {...otherProps}> 
        {children}
    </button>

)
export default CustomButton;