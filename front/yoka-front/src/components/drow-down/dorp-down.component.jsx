import React from "react";
import './drop-down.styles.scss'

import { NavDropdown } from "react-bootstrap";
import DropDownCard from "../drop-down-card/drop-down-card.component";
import { Link } from "react-router-dom";




const DropDown = (props) => {
    return (
        <div className="drop-down">
            <NavDropdown
                // id="nav-dropdown-dark-example"
                title={props.title}
                id="nav-dropdown"
            >
                <div className="items">
                    <div className="item-1">
                        {props.items.map(item => (

                            <Link key={item.id} style={{ textDecoration: 'none' }} to={`/furniture-category/${item.id}`}><NavDropdown.Item key={item.id} className="dd-item"  href="#action/3.1"> {item.name}</NavDropdown.Item></Link>
                        ))}
                    </div>
                    
                        <div className="item-2">
                            <DropDownCard imageUrl="img/home-page/sugg1.png" title="Sideboards & Media Furniture" />
                        </div>
                        <div className="item-3">
                            <DropDownCard imageUrl="img/home-page/sugg1.png" title="Sideboards & Media Furniture" />
                        </div>
                    

                </div>

            </NavDropdown>
        </div>
    )
}
export default DropDown