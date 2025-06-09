import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css';

// {
//     "profile_details": {
//       "profile_image_url": "https://assets.ccbp.in/frontend/react-js/male-avatar-img.png",
//       "name": "Rahul Attluri",
//       "short_bio": "Lead Software Developer and AI-ML expert"
//     }
//   }

const employmentTypeList = [
    {
        employmentTypeId: 'FULLTIME',
        label: "Full Time"
    },
    {
        employmentTypeId: 'PARTTIME',
        label: "Part Time"
    },
    {
        employmentTypeId: 'INTERNSHIP',
        label: "Internship"
    },
    {
        employmentTypeId: 'FREELANCE',
        label: "Freelance"
    }
]

const empSalaryRangeList = [
    {
        empSalaryRangeId: '1000000',
        label: "10 LPA and above"
    },
    {
        empSalaryRangeId: '2000000',
        label: "20 LPA and above"
    },
    {
        empSalaryRangeId: '3000000',
        label: "30 LPA and above"
    },
    {
        empSalaryRangeId: '4000000',
        label: "40 LPA and above"
    }
]


const FilterSection = (props) => {

    const [allValues, setValues] = useState({
        profileDetails: {},
        isFetchCorrectly: false
    })

    const { empTypeChangeFunction } = props;
    const { salaryRangeChangeFunction } = props;

    const token = Cookies.get("jwtToken");

    useEffect(() => {

        setValues({ ...allValues, isFetchCorrectly: true });
        const getProfileDetails = async () => {

            const api = "https://apis.ccbp.in/profile";

            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const response = await fetch(api, options);
            const data = await response.json();
            console.log(data.profile_details);

            if (response.ok === true) {
                setValues({ ...allValues, profileDetails: data.profile_details, isFetchCorrectly: false })
            }
        }

        getProfileDetails();
    }, [])


    const onChangeEmployementType = (e) => {

        empTypeChangeFunction(e.target.value, e.target.checked);
        console.log(e);
        console.log(e.target.checked);
    }

    const onChangeEmpSalaryRange = (e) => {
        salaryRangeChangeFunction(e.target.value);
        console.log(e.target.value);
    }

    return (
        <>
            {allValues.isFetchCorrectly ? (<div className='loader'>
                        <div class="spinner-border" role="status">
                        </div>
                    </div>) : (<div className='profile-cont'>
                <img className='profile-img' src={allValues.profileDetails.profile_image_url}></img>
                <h4 className='profile-name'>{allValues.profileDetails.name}</h4>
                <h6 className='profile-bio'>{allValues.profileDetails.short_bio}</h6>

            </div>
            )}

            <ul className='emp-type-list'>
                <h6>Type of Employment</h6>
                {
                    employmentTypeList.map(eachType => (
                        <li className='job-type' key={eachType.employmentTypeId}>
                            <input onChange={onChangeEmployementType} id={eachType.employmentTypeId} type='checkbox' value={eachType.employmentTypeId}></input>
                            <label htmlFor={eachType.employmentTypeId}>{eachType.label}</label>
                        </li>
                    ))
                }
            </ul>



            <ul className='salary-range-list'>
                <h6>Salary Range</h6>
                {
                    empSalaryRangeList.map(eachType => (
                        <li className='salary' key={eachType.empSalaryRangeId}>
                            <input onChange={onChangeEmpSalaryRange} id={eachType.empSalaryRangeId} type='radio' value={eachType.empSalaryRangeId} name='salaryRange'></input>
                            <label htmlFor={eachType.empSalaryRangeId}>{eachType.label}</label>
                        </li>
                    ))
                }
            </ul>




        </>
    )
}

export default FilterSection;