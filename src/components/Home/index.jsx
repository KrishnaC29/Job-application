import { Link } from 'react-router-dom';
import Header from '../header';
import { useState,useEffect } from 'react';
import './index.css';
import Jobs from '../Jobs';

const Home = () => {

  const [isClicked,setIsClicked] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);


  useEffect(() => {
  setIsBouncing(true);
  setTimeout(() => setIsBouncing(false), 1400); // match bounce duration
}, []);

  const onClickingJobBtn =()=>{
    setIsClicked(true);
    console.log("ok");
    setTimeout(()=> setIsClicked(false),300);
  }
  return (
    <>
      <div className='main-container'>
        <Header/>
        <div className='home-text-cont'>
          <h1 className='heading'>Find The Job That Fits Your Life</h1><br/>
          <p className='side-heading'>Millions of  people searching for jobs, salary <br/>information, company reviews.
            Find the jobs that fits <br/>your abilities and potentials.</p><br/>
          
           <Link to="/jobs">{ <button className={`find-job-btn ${isBouncing ? 'bounce' : ''} ${isClicked ? 'animate' : ''}`}
          onClick={onClickingJobBtn}>
            Find Jobs</button>}</Link>
        </div>
      </div>
    </>
  )
}



export default Home;