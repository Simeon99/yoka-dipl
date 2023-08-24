import React from "react";

import './footer-items.styles.scss'

const FooterItems = ({itemsList}) =>(

    <div className="footer-items">
        {itemsList.map((item, i) =>(
            <a key={i} href="/">{item}</a>
        ))}
    </div>

)
export default FooterItems