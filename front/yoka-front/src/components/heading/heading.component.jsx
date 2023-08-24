import React from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom-button/custom-button.component";

import './headnig.styles.scss'


const Heading = () => {
    
    const { t } = useTranslation()

    return(
    <div className="heading" style={{ backgroundImage: "url(img/home-page/cover1.jpg)" }}>
        <div className="container">
            <div className="img" style={{ backgroundImage: "url(img/home-page/cover-title.png)" }} >
                
            </div>
            
            <div className="custom-btn">
            <CustomButton isRounded>
                {t('app.body.heading.button')}
            </CustomButton>
            </div>
            
        </div>   
    </div>
    )
}

export default Heading