import React, { useState } from "react";
import styled from "styled-components";
import Header from "../landing/Header";
import bell_icon from "../../assets/images/Dashboard/bell_icon.svg";
import setting_icon from "../../assets/images/Dashboard/setting_icon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutModal from "./LogoutModal";

interface Props {
  tabNames?: string[];
  selectedActiveTab?: string;
  setSelectedActiveTab?: React.Dispatch<React.SetStateAction<string>>;
  nologo?: boolean;
}

const DashboardHeaderWrapper = styled.div`
  background: rgba(40, 104, 197, 0.1);
  .header-main--container {
    max-height: 143px;
    max-width: 1440px;
    margin: 0 auto;
  }
  .header-section {
    padding: 94px 135px 0 135px;
  }
  .active-tab {
    border-bottom: 2px solid #2868c5;
  }
  .icons-container {
    height: 32px;
    bottom: 6px;
    z-index: 9999;
  }
  .pop-over-container {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    width: 159px;
    top: 49px;
    left: 0px;
    z-index: 99;
  }
  .pop-over-container div {
    border-bottom: 1px solid rgba(40, 104, 197, 0.04);
  }
  .tab-name:hover {
    color: rgba(40, 104, 197, 0.7);
    transition: ease-in 0.2s;
  }
  @media only screen and (max-width: 854px) {
    .header-section {
      padding: 94px 40px 0 40px;
    }
  }
  @media only screen and (max-width: 654px) {
    .header-section {
      padding: 94px 15px 0 15px;
    }
    .pop-over-container{
      top: 35px;
      right: 0;
      left: auto;
    }
    .content--section{
      gap: 40px;
    }
    .content--section-4tab{
      gap: 25px;
    }
    .content--section div{
      width: max-content;
    }
    .icons-container img{
      height: 24px;
      width: 24px;
    }
    .icons-container {
      position: absolute;
      gap: 28px;
      top: 15px;
      right: 16px;
    }
  }
`;

const DashboardHeader = ({ tabNames, selectedActiveTab, setSelectedActiveTab, nologo }: Props) => {
  const [isSettingPopupActive, setIsSettingPopupActive] = useState(false);
  const User = useSelector((state: any) => state?.auth?.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <DashboardHeaderWrapper>
      <div className="absolute full-width z-99">
        <Header nologo={nologo}/>
      </div>
      <div className="header-main--container full-width">
        <div className="flex header-section justify-between">
          <div className={`flex gap72 ${tabNames && tabNames?.length >= 3 ? "content--section-4tab" : "content--section"}`}>
            {tabNames &&
              tabNames.map((data) => (
                <div className={`font-16 bold-text pb21 cursor-pointer ${selectedActiveTab === data ? "active-tab primary--text" : "darkgray--text tab-name"}`} onClick={() => setSelectedActiveTab && setSelectedActiveTab(data)}>
                  {data}
                </div>
              ))}
          </div>
          <div className="flex gap68 mb14 icons-container relative">
            {/* <img
              src={bell_icon}
              alt="notification"
              className="cursor-pointer"
            /> */}
            <img
              src={setting_icon}
              alt="setting"
              className="cursor-pointer"
              onClick={() => setIsSettingPopupActive(!isSettingPopupActive)}
            />
            {isSettingPopupActive && (
              <div className="absolute white pop-over-container">
                {/* <div className="font-14 normal-text px16 py14 cursor-pointer" onClick={() => navigate("/pricing")}>
                  Subscription
                </div> */}
                <div className="font-14 normal-text px16 py14 cursor-pointer" onClick={() => navigate("/change-password")}>
                  Change Password
                </div>
                {User &&
                  <>
                    <div className="font-14 normal-text px16 py14 cursor-pointer" onClick={() => navigate("/saved-job")}>
                      Saved Jobs
                    </div>
                    <div className="font-14 normal-text px16 py14 cursor-pointer" onClick={() => navigate("/saved-scp")}>
                      Saved SCP
                    </div>
                  </>
                }
                {/* <div className="font-14 normal-text px16 py14 cursor-pointer">
                  Report Error
                </div> */}
                <div onClick={() => setIsLogoutModalOpen(true)} className="font-14 normal-text px16 py14 cursor-pointer">
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isLogoutModalOpen && (
        <LogoutModal
          isModalOpen={isLogoutModalOpen}
          setIsModalOpen={setIsLogoutModalOpen}
        />
      )}
    </DashboardHeaderWrapper>
  );
};

export default DashboardHeader;
