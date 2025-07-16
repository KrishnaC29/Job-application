
import {useEffect} from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
const Header = () => {

    const navigate = useNavigate();
       const onClickLogoutBtn =()=>{
        Cookies.remove("jwtToken");
        navigate("/login")

       }

    return (
        <>
            <nav className='navBar'>
                <Link to="/">
                    <img className='img2' src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='joblogo' />
                </Link>
                <div className='page-cont'>
                    <Link className='link' to="/">Home</Link>
                    <Link className='link' to="/jobs">Jobs</Link>
                </div>
                <button onClick={onClickLogoutBtn} id='logout-btn' type="submit">Logout</button>
            </nav>
        </>
    )
}

export default Header;