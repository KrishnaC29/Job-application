import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';



const ProctectingRouter = (props) => {

    const { Component } = props;

   const token = Cookies.get("jwtToken");
    const navigate = useNavigate();

    useEffect(() => {

        if (token === undefined) {
            navigate("/login");
        }
    },[]);


    return (
        <>
        {Component}
        </>
    )
}

export default ProctectingRouter;