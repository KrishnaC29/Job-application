import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './index.css';


const DisplayAllJobs = (props) => {

    const { jobItems } = props;


    return (

        <Link className='link-cont' to={`/jobs/${jobItems.id}`}>
                <li className='job-card'>
                    <div className='top-cont'>
                        <div className='logo-cont'>
                            <img className='company-logo' src={jobItems.company_logo_url}></img>
                            <div className='post-rating-cont'>
                                <h6>{jobItems.title}</h6>

                             <h6><FontAwesomeIcon className='rating-icon' icon={faStar} />  {jobItems.rating}</h6>
                            </div>
                        </div>
                        <div className='location-salary-cont'>
                            <span>
                                <h6 className='location'><FontAwesomeIcon icon={faLocationDot} />  {jobItems.location}</h6>
                                <h6 className='internship'><FontAwesomeIcon icon={faBriefcase} />  {jobItems.employment_type}</h6>
                            </span>
                            <h6>{jobItems.package_per_annum}</h6>
                        </div>
                    </div>
                    <div className='discription-cont'>
                        <h6 className='discription'>Description</h6>
                        <p className='job-discription'>{jobItems.job_description}</p>
                    </div>


                </li>
                
        </Link>
    )
}

export default DisplayAllJobs;