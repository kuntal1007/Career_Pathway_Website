import React, { useMemo } from "react";
import styled from "styled-components";
import DashboardHeader from "../../component/common/DashboardHeader";
import { useGetAllJobsQuery } from "../../redux/services/dashboard";
import JobCard from "../../component/common/JobCard";
import header_back_icon from "../../assets/images/Dashboard/header_back_icon.svg";
import { useNavigate } from "react-router-dom";
import { useGetSavedJobQuery } from "../../redux/services/user";

const SavedJobsPageWrapper = styled.div`
	.saved-jobs-container{
		max-width: 1440px;
		width: 100%;
		margin: 0 auto;
		padding: 61px 90px;
	}
	.header-back-icon{
		top: 92px;
		left: 128px;
	}
  .cards-container {
    max-width: 1300px;
    margin: 0 auto;
    display: grid;
  }
  @media (min-width: 833px) {
    .cards-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1033px) {
    .cards-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1300px) {
    .cards-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media only screen and (max-width: 854px) {
    .saved-jobs-container{
      padding: 40px 16px;
	  }
    .save-title{
      font-size: 16px;
    }
    .header-back-icon {
      position: absolute;
      left: 18px;
      top: 17px;
      z-index: 999;
    }
    .header-back-icon img{
      height: 24px;
      width: 24px;
    }
  }
`;

const SavedJobs = () => {
  const { data: savedJobsData } = useGetSavedJobQuery("");
	const navigate = useNavigate();

  const savedJobs = useMemo(() => {
    const data = savedJobsData?.data?.filter((job: any) => job?.job !== null )
    return data;
  },[savedJobsData])

  return (
    <SavedJobsPageWrapper>
      <div className="logo-icon">
				<DashboardHeader nologo/>
      </div>
			<div className="header-back-icon absolute cursor-pointer" onClick={() => navigate("/aspirant-dashboard")}><img src={header_back_icon} alt="" /></div>
			<div className="saved-jobs-container">
				<div className="font-24 bold-text pb40 save-title">Saved Jobs</div>
				<div className="cards-container full-width fill-height gap30">
            {savedJobs &&
              savedJobs?.map((job: any) => (
                  <JobCard job={job?.job} isJobCard/>
              ))}
          </div>
			</div>
    </SavedJobsPageWrapper>
  );
};

export default SavedJobs;
