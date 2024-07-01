import React, { useEffect, useState } from 'react'
import { FaUserTie } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from "react-hot-toast"
import pageStyle from "./opportunity.module.css"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function Opportunities() {
  const [allData, setAlldata] = useState([]);
  const navigateTO = useNavigate();

  const handleShowDetails = (e, data) => {
    e.preventDefault();
    navigateTO(`/career/${data?.opportunityID}`, { state: data })
  }
  useEffect(() => {
    axios.get(`${BACKEND_URL}user/opportunities`).then((response) => {
      if (response.data.success) {
        setAlldata(response.data.opportunityData)
      }
    }).catch((error) => {
      toast.error(`${error.response.data.msg}`)
    })

  }, [])
  return (
    <section className={`${pageStyle.__careerPage_Container}`} >

      {
        allData?.map((data) => {
          return <article key={data?._id} className={`${pageStyle.__opportunityCard}`}>
            <p className={`${pageStyle.__opportunityCard_profileName}`}>{data?.profileName}</p>
            <p className={`${pageStyle.__opportunityCard_shortdetails}`}>
              <span className={`${pageStyle.__opportunityCard_type}`}><FaUserTie className={`${pageStyle.__opportunityCard_typeICON}`} />{data?.type}</span>
              <button onClick={(e) => handleShowDetails(e, data)} className={`${pageStyle.__opportunityCard_button}`}><MdChevronRight className={`${pageStyle.__opportunityCard_buttonICON}`} /></button>
            </p>
          </article>
        })
      }
    </section>
  )
}

export default Opportunities