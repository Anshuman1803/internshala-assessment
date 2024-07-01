import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import pageStyle from "./opportunity.module.css"
import { MdLocationOn } from "react-icons/md";
import { MdNotStarted } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { userAppliedJob } from "../../redux/ReduxSlice";
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoader from "../../components/Loader/ButtonLoader";
import toast from "react-hot-toast"
import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function DetailsOpportunitiesPage() {
    const { userEmail, appliedJobs } = useSelector((state) => state.App)
    const { state } = useLocation();
    const navigateTO = useNavigate();
    const dispatchTO = useDispatch();
    const [loading, setLoading] = useState(false)
    const handleApplyButtonClick = (e, jobID) => {
        e.preventDefault();
        if (userEmail) {
            setLoading(true)
            axios.patch(`${BACKEND_URL}user/apply-job/${userEmail}`, { jobID }).then((response) => {
                console.log(response)
                if (response.data.success) {
                    toast.success(response.data.msg);
                    dispatchTO(userAppliedJob(jobID));
                    setLoading(false)
                } else {
                    toast.success(response.data.msg);
                    dispatchTO(userAppliedJob(jobID));
                    setLoading(false)
                }
            }).catch((error) => {
                toast.error(error.message);
                setLoading(false)
            })
        } else {
            toast.error("Access denied");
            setTimeout(() => {
                navigateTO('/user/auth/signin');
            }, 1500);
        }
    }
    return (
        <section className={`${pageStyle.__detailsPageContainer}`}>
            <h1 className={`${pageStyle.__detailsPageContainer__heading}`}>{state?.profileName} {state?.type}</h1>
            <div className={`${pageStyle.__detailsPage__Box}`}>
                <div className={`${pageStyle.__detailsPage_jobNameBox}`}>
                    <p className={`${pageStyle.__detailsPage_jobName}`}>
                        <span>{state?.profileName}</span>
                        <span> {state?.companyName}</span>
                    </p>
                    <img className={`${pageStyle.__detailsPage_companyLOGO}`} src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="CompanyLOGO" />
                </div>
                <p className={`${pageStyle.__detailsPage__locations}`}>
                    {
                        state?.location?.map((location, index) => <span key={index}><MdLocationOn className={`${pageStyle.__locationICON}`} /> {location}</span>)
                    }
                </p>

                <div className={`${pageStyle.__jobDetailsBox}`}>
                    <p className={`${pageStyle.__jobDetailsBox__item}`}>
                        <span className={`${pageStyle.__jobDetailsBox__itemTitle}`}><MdNotStarted className={`${pageStyle.__jobDetailsBox__itemICON}`} />start date</span>
                        <span className={`${pageStyle.__jobDetailsBox__itemValue}`}>{state?.startDate}</span>
                    </p>
                    <p className={`${pageStyle.__jobDetailsBox__item}`}>
                        <span className={`${pageStyle.__jobDetailsBox__itemTitle}`}><FaCalendarDays className={`${pageStyle.__jobDetailsBox__itemICON}`} />duration</span>
                        <span className={`${pageStyle.__jobDetailsBox__itemValue}`}>{state?.duration}</span>
                    </p>
                    <p className={`${pageStyle.__jobDetailsBox__item}`}>
                        <span className={`${pageStyle.__jobDetailsBox__itemTitle}`}><FaMoneyBillWave className={`${pageStyle.__jobDetailsBox__itemICON}`} />stipend</span>
                        <span className={`${pageStyle.__jobDetailsBox__itemValue}`}>{state?.stipend}</span>
                    </p>
                </div>
            </div>

            <div className={`${pageStyle.__buttonContainer}`}>
                <button onClick={() => navigateTO(-1)} className={`${pageStyle.__buttonContainer_buttons} ${loading && `${pageStyle.UnactiveButton}`}`}>Back</button>
                {
                    appliedJobs?.includes(state?.opportunityID) ?  <button className={`${pageStyle.__buttonContainer_buttons} ${pageStyle.__alreadyAppliedButton}`}>
                    Already applied
                </button> :
                        <button className={`${pageStyle.__buttonContainer_buttons} ${loading && `${pageStyle.UnactiveButton}`}`} onClick={(e) => handleApplyButtonClick(e, state?.opportunityID)}>
                            {
                                loading ? <ButtonLoader /> : "Apply Now"
                            }
                        </button>
                }
            </div>
        </section>
    )
}

export default DetailsOpportunitiesPage