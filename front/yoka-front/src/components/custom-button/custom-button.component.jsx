import React from "react";

import './custom-button.styles.scss'

const CustomButton = ({children, isRounded, ...otherProps}) => (

    <button className={` ${isRounded? 'is-rounded':''} ${otherProps.unclickable ? 'unclickable': ''} custom-button`} {...otherProps}> 
        {children}
    </button>

)
export default CustomButton;