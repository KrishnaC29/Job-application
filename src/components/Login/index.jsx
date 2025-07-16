import { useState, useEffect } from 'react';
import cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import './index.css';

const Login = () => {

  const [allValues, setValues] = useState({
    isClicked: false,
    username: "",
    password: "",
    showErrMsg: false,
    errorMsg: ""
  })

  const handleClick = () => {
    setValues({...allValues, isClicked:true});
    // Reset after animation completes (e.g., 500ms)
    setTimeout(() => setValues({...allValues, isClicked:false}), 500);
  };


  const token = cookies.get("jwtToken");
  const navigate = useNavigate();

  const onSubmitUserDetails = async (e) => {
    e.preventDefault();

    const api = "https://apis.ccbp.in/login";

    const userDetails = {
      username: allValues.username,
      password: allValues.password
    }

    const options = {
      method: "post",
      body: JSON.stringify(userDetails)
    }

    const response = await fetch(api, options);
    const fetchingData = await response.json();
    console.log(fetchingData);

    if (response.ok === true) {
      setValues({ ...allValues, showErrMsg: false, errorMsg: "" });
      cookies.set("jwtToken", fetchingData.jwt_token)

    }
    else {
      setValues({ ...allValues, showErrMsg: true, errorMsg: fetchingData.error_msg })
    }


  }
  const onChangeUsername = (e) => {
    setValues({ ...allValues, username: e.target.value });
  }
  const onChangePassword = (e) => {
    setValues({ ...allValues, password: e.target.value })
  }

  useEffect(() => {
    if (token !== undefined) {
      navigate("/");
      console.log("krishna")
    }
  })
  return (
    <>
      <div className='main-cont'>
        <div className='logo-username'>
          <img className='img1' src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='joblogo' />
          <p className='username-password'>[username: rahul<br />
            password: rahul@2021]</p>
        </div>
        <form className='form' onSubmit={onSubmitUserDetails}>
          <div className='mb-1'>
            <FaUserCircle className='user-logo' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input onChange={onChangeUsername} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input onChange={onChangePassword} type="password" className="form-control" id="exampleInputPassword1" />
          </div><br />

          <button id='submit-btn' type="submit" className={`my-button ${allValues.isClicked ? "animate" : ""}`}
            onClick={handleClick}
          >Login</button>
          {allValues.showErrMsg ? <p className='errstatement'>{allValues.errorMsg}</p> : null}

        </form>
      </div>
    </>
  )
}

export default Login;