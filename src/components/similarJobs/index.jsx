import './index.css';
import { FaStar,FaLocationDot } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { IconContext } from 'react-icons/lib';


const SimilarJobs = (props) => {

    const { jobInfo } = props


    return (
        <>
            <li className='similar-jobs-list'>
                <div className='logo-title-cont'>
                    <div id='logo'>
                        <img src={jobInfo.company_logo_url} alt='logo' width='100%' height='100%'></img>
                    </div>
                    <div className='title-rating-cont'>
                        <h6 className='krishna'>{jobInfo.title}</h6>
                        <h6> <FaStar className='rating-logo'/> {jobInfo.rating}</h6>
                    </div>

                </div>
                <div id='description-cont'>
                    <h6 className='side-line'>Description</h6>
                    <p id='description-text'>{jobInfo.job_description}</p>
                </div>
                <div id='location-jobtype-cont'>
                     <p id='company-location'><FaLocationDot /> {jobInfo.location}</p>
                     <p id='company-internship'><BsBriefcaseFill /> {jobInfo.employment_type}</p>
                </div>
            </li >


        </>
    )
}

export default SimilarJobs;

