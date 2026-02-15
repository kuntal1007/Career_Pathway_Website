import React, { useState } from "react";
import styled from "styled-components";
import DashboardHeader from "../../component/common/DashboardHeader";
import AboutMe from "../../component/dashboard/aspirant/AboutMe";
import Status from "../../component/dashboard/aspirant/Status";
import Review from "../../component/dashboard/aspirant/Review";

const AspirantDashboardPageWrapper = styled.div`
  .main--container {
    max-width: 1440px;
    margin: 0 auto;
  }
`;

const AspirantDashboard = () => {
  const tabNames = ["About Me", "Status", "Review"];
  const [selectedActiveTab, setSelectedActiveTab] = useState<string>(tabNames[0]);

  return (
    <AspirantDashboardPageWrapper>
      <DashboardHeader tabNames={tabNames} selectedActiveTab={selectedActiveTab} setSelectedActiveTab={setSelectedActiveTab} />
      <div className="main--container full-width">
        <div>
          {selectedActiveTab === tabNames[0] && <AboutMe />}
          {selectedActiveTab === tabNames[1] && <Status />}
          {selectedActiveTab === tabNames[2] && <Review />}
        </div>
      </div>
    </AspirantDashboardPageWrapper>
  );
};

export default AspirantDashboard;
