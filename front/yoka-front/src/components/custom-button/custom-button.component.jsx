import React from "react";

import './custom-button.styles.scss'

const CustomButton = ({children, isRounded, ...otherProps}) => (

    <button className={` ${isRounded? 'is-rounded':''} custom-button`} {...otherProps}> 
        {children}
    </button>

)
export default CustomButton;