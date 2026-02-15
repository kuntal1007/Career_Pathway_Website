import React, { useState } from "react";
import styled from "styled-components";
import DashboardHeader from "../../component/common/DashboardHeader";
import AboutMe from "../../component/dashboard/company/AboutMe";
import Status from "../../component/dashboard/company/Status";
import Resume from "../../component/dashboard/company/Resume";
import Review from "../../component/dashboard/company/Review";
import scp_signup from "../../assets/images/SignUpScreen/scp_signup.svg";
import job_signup from "../../assets/images/SignUpScreen/job_signup.svg";
import SignOptionModal from "../../component/common/SignOptionModal";

const CompanyDashboardPageWrapper = styled.div`
  .main--container {
    max-width: 1440px;
    margin: 0 auto;
  }
`;

const CompanyDashboard = () => {
  const tabNames = ["About Me", "Status", "Resume", "Review"];
  const [selectedActiveTab, setSelectedActiveTab] = useState<string>(tabNames[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const signUpModalData = [
    {
      title: "SCP",
      image: scp_signup,
      hoverData: "Get a job training inside the college for students with CCP feature",
      navigatePath: "/create-scp-post",
    },
    {
      title: "Job",
      image: job_signup,
      hoverData: "Free Job post",
      navigatePath: "/create-job-post",
    },
  ];

  return (
    <CompanyDashboardPageWrapper>
      <DashboardHeader tabNames={tabNames} selectedActiveTab={selectedActiveTab} setSelectedActiveTab={setSelectedActiveTab} />
      <div className="main--container full-width">
        <div>
          {selectedActiveTab === tabNames[0] && <AboutMe setIsModalOpen={setIsModalOpen} />}
          {selectedActiveTab === tabNames[1] && <Status setSelectedJobId={setSelectedJobId} setSelectedActiveTab={setSelectedActiveTab}/>}
          {selectedActiveTab === tabNames[2] && <Resume selectedJobId={selectedJobId}/>}
          {selectedActiveTab === tabNames[3] && <Review />}
        </div>
      </div>
      {isModalOpen && (
        <SignOptionModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          signUpModalData={signUpModalData}
        />
      )}
    </CompanyDashboardPageWrapper>
  );
};

export default CompanyDashboard;
