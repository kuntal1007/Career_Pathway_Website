import React, { useMemo, useState } from "react";
import styled from "styled-components";
import clock_icon from "../../assets/images/SCP/watch_icon.svg";
import amazon_logo from "../../assets/images/SCP/amazon_logo.svg";
import bookmark_icon from "../../assets/images/SCP/bookmart_icon.svg";
import unbookmark_icon from "../../assets/images/SCP/unbookmart_icon.svg";
import job_type_icon from "../../assets/images/Dashboard/job_type_icon.svg";
import { useNavigate } from "react-router-dom";
import { useSaveJobMutation, useSaveSCPMutation } from "../../redux/services/dashboard";
import { useGetSavedJobQuery } from "../../redux/services/user";
import { useSelector } from "react-redux";

interface Props {
  company: {
    _id: string;
    name: string;
    profile_photo: string;
  };
  duration: string;
  mode: string;
  title: string;
  type: string;
  _id: string;
  isJobCard?: boolean;
}

const JobCardWrapper = styled.div`
  .bookmark_icon {
    top: 16px;
    right: 16px;
  }
  .card--container {
    box-shadow: 0px 0px 4px rgba(40, 104, 197, 0.5);
  }
  .company-logo {
    max-width: 89px;
    min-height: 84px;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  .company-name {
    color: #8b8787;
  }
  .status-bar {
    height: 14px;
    width: 14px;
    background: #8b8787;
    border-radius: 50%;
  }
  .status-bar-active {
    background: #66ce34 !important;
  }
  @media only screen and (max-width: 580px) {
    .card--container{
      display: flex;
      padding: 16px 0 12px 10px !important;
    }
    .company-logo-container{
      padding: 0;
    }
    .company-logo-container img{
      height: 50px;
      width: 50px;
      min-height: 50px;
    }
    .status--container {
      gap: 16px;
      justify-content: left;
    }
    .job-title {
      font-size: 16px;
    }
    .company-name {
      font-size: 12px;
    }
    .bookmark_icon{
      height: 16px;
      width: 16px;
      top: 8px;
      right: 8px;
    }
    .days-text {
      position: absolute;
      bottom: 8px;
      right: 9px;
    }
  }
`;

const JobCard = ({ job, isJobCard }: any) => {
  const navigate = useNavigate();
  const [ saveJob ] = useSaveJobMutation();
  const [ saveSCP ] = useSaveSCPMutation();
  const { data: savedJobs, refetch } = useGetSavedJobQuery("");
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const today_date = yyyy + "-" + mm + "-" + dd;
  const job_posted_date = job?.createdAt && job?.createdAt?.slice(0, 10);
  const user = useSelector((state: any) => state?.auth?.user || state?.auth?.company);

  let date1, date2;
  date2 = new Date(today_date);
  date1 = new Date(job_posted_date);
  const time_difference = date2.getTime() - date1.getTime();
  const days_difference = time_difference / (1000 * 60 * 60 * 24);

  const handleSaveJob = async() => {
    if(job && job?._id && isJobCard){
      const save = await saveJob(job?._id);
      refetch();
    }else{
      const save = await saveSCP(job?._id);
      refetch();
    }
  }

  
  const checkJobIsSavedOrNot = useMemo(() => {
    if(isJobCard){
      const result = savedJobs && savedJobs?.data?.some((data: any) => data?.job?._id === job?._id)
      return result;
    }else{
      const result = savedJobs && savedJobs?.data?.some((data: any) => data?.training?._id === job?._id)
      return result;
    }
  },[savedJobs, handleSaveJob])

  return (
    <JobCardWrapper>
      <div
        className="card--container br8 full-width fill-height relative cursor-pointer mr20"
      >
        {checkJobIsSavedOrNot ?
          <img
            src={bookmark_icon}
            alt="bookmark"
            className="absolute bookmark_icon cursor-pointer"
            onClick={() => handleSaveJob()}
          /> :
          <img
            src={unbookmark_icon}
            alt="bookmark"
            className="absolute bookmark_icon cursor-pointer"
            onClick={() => handleSaveJob()}
          />
        }
        <div className="pt38 pb27 text-center company-logo-container"
          onClick={() => {!user ? navigate(`/login`) : isJobCard ? navigate(`/job-description/${job?._id}`) : navigate(`/training-information/${job?._id}`)}}
        >
          <img src={job?.company?.profile_photo || amazon_logo} alt="" className="company-logo full-width" />
        </div>
        <div className="pb16 px16" 
          onClick={() => {!user ? navigate(`/login`) : isJobCard ? navigate(`/job-description/${job?._id}`) : navigate(`/training-information/${job?._id}`)}}
        >
          <div className="font-20 normal-text pb4 job-title">{job?.title}</div>
          <div className="font-14 semi-bold-text company-name pb11">
            {job?.company?.name}
          </div>
          <div className="flex justify-between items-center full-width status--container">
            {isJobCard && (
              <div className="flex gap4 items-center">
                <img src={job_type_icon} alt="" />
                <div className="company-name font-12 semi-bold-text">
                  {job?.type === "part_time" ? "Part-Time" : "Full-Time"}
                </div>
              </div>
            )}
            {!isJobCard && (
              <div className="flex gap4 items-center">
                <div
                  className={`${
                    job?.mode === "online" ? "status-bar-active" : ""
                  } status-bar border-none`}
                />
                <div className="company-name font-12 semi-bold-text">
                  {job?.mode}
                </div>
              </div>
            )}
            {job?.duration &&
            <div className="flex gap4">
              <img src={clock_icon} alt="" />
              <div className="company-name font-12 semi-bold-text">
                {job?.duration}
              </div>
            </div>
            }
            {days_difference >= 0 ? (
              <div className="font-8 semi-bold-text days-text darkgray--text">
                {days_difference} days ago
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </JobCardWrapper>
  );
};

export default JobCard;
