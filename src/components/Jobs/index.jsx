
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Header from '../header';
import DisplayAllJobs from '../displayAllJobs';
import FilterSection from '../filterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
<script src="https://kit.fontawesome.com/daac4c333d.js" crossorigin="anonymous"></script>
import './index.css';

// company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png"
// employment_type: "Internship"
// id: "bb95e51b-b1b2-4d97-bee4-1d5ec2b96751"
// job_description: "We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support."
// location: "Delhi"//package_per_annum: "10 LPA"
// rating: 4
// title: "Devops Engineer"

const Jobs = () => {

    const [allValues, setValues] = useState({
        jobDetails: [],
        empType: [],
        salaryRange: '',
        searchInput: '',
        isFetchCorrectly: false
    })

    useEffect(() => {



        const fetchJobsData = async () => {
            
            setValues({...allValues,isFetchCorrectly:true})
            const api = `https://apis.ccbp.in/jobs?employment_type=${allValues.empType}&minimum_package=${allValues.salaryRange}&search=${allValues.searchInput}`;


            const token = Cookies.get("jwtToken");

            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(api, options);
            const fetchingData = await response.json();
            console.log(fetchingData.jobs);


            if (response.ok === true) {
                setValues({ ...allValues, jobDetails: fetchingData.jobs, isFetchCorrectly:false });

            }



        }

        fetchJobsData();
    }, [allValues.searchInput, allValues.empType, allValues.salaryRange])

    const onSearchingJob = (e) => {

        if (e.key === "Enter") {
            console.log(e.target.value);
            setValues({ ...allValues, searchInput: e.target.value });
        }
    }

    const onChangeEmpType = (value, checked) => {
        console.log(checked);

        if (checked === true) {
            setValues({ ...allValues, empType: [...allValues.empType, value] });

        }
        else {
            setValues({ ...allValues, empType: allValues.empType.filter(each => each !== value) });


        }


    }


    const onChangeSalaryRange = (value) => {
        setValues({ ...allValues, salaryRange: value })
    }

    return (
        <>
            <div>
                <Header />
            </div>


            <div className='filer-alljobs-container'>
                <div className='filter-section-cont'>
                    <FilterSection empTypeChangeFunction={onChangeEmpType} salaryRangeChangeFunction={onChangeSalaryRange} />
                </div>
                 
                <div className='all-jobs-cont'>
                    <div className='search-icon-btn'>
                        <input onKeyDown={onSearchingJob} className='search-bar' type='search' placeholder='Search' />
                        <button className='search-btn'><FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} /> </button>
                    </div>
                    {allValues.isFetchCorrectly   ?  ( <div className='spinner'>
                        <div class="spinner-border" role="status">
                        </div>
                    </div>) : 
                    (<ul className='card-list'>

                        {allValues.jobDetails.map((each) => <DisplayAllJobs key='each.id' jobItems={each} />)}
                    </ul>) }

                    
                </div>
            </div>


        </>
    );
}

export default Jobs;