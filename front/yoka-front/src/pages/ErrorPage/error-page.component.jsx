import React from "react";

import { useNavigate } from 'react-router-dom';

import CustomButton from "../../components/custom-button/custom-button.component";

import './error-page.scss'

const ErrorPage = () => {

    const navigate = useNavigate();

    return (
        <div className="error-page">

            <div className='error-mesage'>
                <h1>404</h1>
                <h2>OOPS! PAGE NOT FOUND.</h2>
                <p>Sorry but the page you are looking for does not exist,
                    have been removed, name changed or is temporarily unavailable.</p>
            </div>
            <div className="error-buttons">

                <CustomButton onClick={() => navigate('')} >Go home</CustomButton>
                <CustomButton onClick={() => navigate(-1)} >Go back</CustomButton>

            </div>
        </div>
    )
} 
export default ErrorPage
