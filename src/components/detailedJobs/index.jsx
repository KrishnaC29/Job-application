import './index.css';
import { useParams } from 'react-router-dom';
import Header from '../header';
import Cookies from 'js-cookie';
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { useEffect, useState } from 'react';
import SimilarJobs from '../similarJobs';

// company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png"
// company_website_url: "https://about.netflix.com/en"
// employment_type: "Internship"
// id: "bb95e51b-b1b2-4d97-bee4-1d5ec2b96751"
// job_description: "We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support."
// life_at_company: {description: 'Our core philosophy is people over process. Our cu…us common ground. We want to entertain the world.',
//  image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png'}
// location: "Delhi"
// package_per_annum: "10 LPA"
// rating: 4
// skills: Array(6)
// 0: {name: 'Docker', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png'}
// 1: {name: 'Kubernetes', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/kubernetes-img.png'}
// 2: {name: 'Terraform', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/terraform-img.png'}
// 3: {name: 'Jenkins', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/jenkins-img.png'}
// 4: {name: 'GO', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/go-img.png'}
// 5: {name: 'Ansible', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/ansible-img.png'}
// title: "Devops Engineer"


// company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png"
// employment_type: "Freelance"
// id: "2b40029d-e5a5-48cc-84a6-b6e12d25625d"
// job_description: "The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration."
// location: "Delhi"
// rating: 4
// title: "Frontend Engineer"

const DetailedJobs = () => {

    const { id } = useParams();
    const token = Cookies.get("jwtToken");

    const [allValues, setValues] = useState({
        companyDetails: [],
        requiredSkills: [],
        lifeAtComapny: [],
        similarJobsDetails: [],
        isFetchDetailedJobs: false
    })

    useEffect(() => {



        const fetchDetailedJobs = async () => {

            setValues({ ...allValues, isFetchDetailedJobs: true });
            const api = `https://apis.ccbp.in/jobs/${id}`;
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }
            const response = await fetch(api, options);
            const data = await response.json();

            console.log(data);


            if (response.ok === true) {
                setValues({ ...allValues, companyDetails: data.job_details, requiredSkills: data.job_details.skills, lifeAtComapny: data.job_details.life_at_company, similarJobsDetails: data.similar_jobs, isFetchDetailedJobs: false });
            }
        }

        fetchDetailedJobs();
    }, [])


    return (

        <>
            <Header />


            <div className='detailed-jobs-page'>


                <div className='job-Detailed-cont'>
                    <div className='about-cont'>
                        <div className='company-logo-cont'>
                            <img className='logo' src={allValues.companyDetails.company_logo_url} alt='commpany-logo'></img>
                        </div>
                        <div className='title-rating-cont'>
                            <h5 className='title'>{allValues.companyDetails.title}</h5>
                            <h6> <FaStar className='rating-logo' /> {allValues.companyDetails.rating}</h6>
                        </div>
                    </div>
                    <div className='location-salary-container'>
                        <div className='location-cont'>
                            <p className='company-location'><FaLocationDot /> {allValues.companyDetails.location}</p>
                            <p className='company-internship'><BsBriefcaseFill /> {allValues.companyDetails.employment_type}</p>

                        </div>
                        <div className='salary-cont'>
                            <h6>{allValues.companyDetails.package_per_annum}</h6>
                        </div>
                    </div>
                    <div className='discription-visit-cont'>
                        <span className='visit-cont'>
                            <h6 className='side-line'>Description</h6>
                            <h6 ><a className='visit-link' href={allValues.companyDetails.company_website_url}>Visit<HiMiniArrowTopRightOnSquare className='visit' /></a></h6>
                        </span>
                        <div className='discription-text'>
                            <p> {allValues.companyDetails.job_description}</p>
                        </div>
                    </div><br />
                    <h6 className='side-line'>Skills</h6>
                    <div className='skills-cont'>
                        <ul className='skills-list'>
                            {allValues.requiredSkills.map((items, index) => (
                                <li className='skills' key={index}>
                                    <p><img className='skills-image' src={items.image_url}></img>  {items.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h6 className='side-line'>Life at Comapny</h6>
                    <div className='life-at-company'>
                        <div className='text-cont'>
                            <p>{allValues.lifeAtComapny.description}</p>
                        </div>
                        <div className='life-at-comp-img-cont'>
                            <img className='life-at-comp-img' src={allValues.lifeAtComapny.image_url}></img>
                        </div>

                    </div>


                </div>

                <div className='similar-jobs-cont'>
                    <h5>Similar Jobs</h5>
                    
                    {allValues.isFetchDetailedJobs   ? (<div className='job-detailed-loader'>
                        <div className="spinner-border" role="status">
                        </div>
                    </div>)   : (<ul className='similar-job-list-cont'>
                        {allValues.similarJobsDetails.map((info,index) => <SimilarJobs key={`${info.id}-${index}`} jobInfo={info} />)}
                    </ul>) }
                    

                </div>





            </div>


        </>
    )

}



export default DetailedJobs;