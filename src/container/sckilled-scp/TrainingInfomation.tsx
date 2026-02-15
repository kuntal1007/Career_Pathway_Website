import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../component/landing/Header";
import search_icon from "../../assets/images/SCP/search_icon.svg";
import amazon_logo from "../../assets/images/SCP/amazon_logo.svg";
import clock_icon from "../../assets/images/SCP/watch_icon.svg";
import location_icon from "../../assets/images/SCP/location_icon.svg";
import map_icon from "../../assets/images/SCP/map_icon.svg";
import call_icon from "../../assets/images/SCP/call_icon.svg";
import email_icon from "../../assets/images/SCP/email_icon.svg";
import JobCard from "../../component/common/JobCard";
import { useNavigate, useParams } from "react-router-dom";
import {
  useApplyScpMutation,
  useGetAllScpQuery,
  useGetScpByIdQuery,
} from "../../redux/services/dashboard";
import { useSelector } from "react-redux";
import { message } from "antd";
import CommonButton from "../../component/common/Button";
import { useGetUserByIdQuery } from "../../redux/services/user";

const TrainingInformationPageWrapper = styled.div`
  .main--container {
    max-width: 1440px;
    margin: 0 auto;
  }
  .search_bar {
    top: 40px;
    right: 105px;
  }
  .search-bar-style {
    background: rgba(40, 104, 197, 0.1);
    border-radius: 10px;
    letter-spacing: -0.408px;
    color: rgba(60, 60, 67, 0.6);
    border: none;
  }
  .search-bar-style:focus-visible {
    outline: none;
  }
  .search-bar-style::placeholder {
    color: rgba(60, 60, 67, 0.6);
    font-size: 17px;
  }
  .search-icon {
    top: 3px;
    left: 7px;
  }
  .training-info-container {
    padding: 129px 105px 50px 105px;
  }
  .apply-card-section {
    background: rgba(40, 104, 197, 0.04);
  }
  .company-logo {
    height: 100px;
    width: 120px;
    border-radius: 8px;
    object-fit: cover;
  }
  .status-bar {
    height: 19px;
    width: 19px;
    background: #8b8787;
    border-radius: 50%;
  }
  .status-bar-active {
    background: #66ce34 !important;
  }
  .clock-icon {
    height: 24px;
    width: 24px;
  }
  .apply-btn {
    height: fit-content;
  }
  .information-container {
    max-width: 770px;
    width: 100%;
    /* max-height: 378px; */
    /* height: 100%; */
    /* overflow-y: scroll; */
    padding-right: 50px;
  }
  .description-section {
    max-width: 651px;
    margin: 0;
    padding: 0 0 0 5px;
  }
  ul.description-section {
    list-style-type: none;
  }
  ul.description-section > li {
    text-indent: -5px;
    margin-bottom: 15px;
  }
  ul.description-section > li:before {
    content: "- ";
    text-indent: -5px;
  }
  .address-section {
    max-width: 228px;
  }
  .answer-section {
    max-width: 583px;
  }
  .faqs-ul {
    list-style: numeric;
    margin: 0;
    padding: 0 0 0 15px;
  }
  .similar-card-section {
    max-width: 370px;
    width: 100%;
  }
  .filter-btn-mobile-container {
    display: none;
  }
  @media only screen and (max-width: 900px) {
    .training-info-container {
      padding: 92px 50px 50px 50px;
    }
  }
  @media only screen and (max-width: 700px) {
    .apply-btn {
      display: none;
    }
    .training-info-container {
      padding: 62px 16px 50px 16px;
    }
    .company-logo {
      width: 59px;
      height: 59px;
    }
    .name-title {
      padding-left: 20px;
      top: 10px;
    }
    .apply-card-section {
      padding: 22px 13px 60px 10px;
    }
    .company-name,
    .job-title {
      font-size: 16px;
    }
    .darkgray--text {
      width: max-content;
    }
    .status-container {
      position: absolute;
      bottom: -28px;
      left: -57px;
    }
    .status-container div {
      font-size: 12px;
    }
    .mobile-icons {
      height: 16px;
      width: 16px;
    }
    .information-bottom-container {
      flex-direction: column;
    }
    .information-container,
    .similar-card-section {
      background: rgba(217, 217, 217, 0.17);
      border-radius: 4px;
    }
    .responsibility-container {
      padding-top: 16px;
    }
    .similar-cards {
      padding: 27px 0;
    }
    .filter-btn-mobile-container {
      display: flex;
      position: fixed;
      bottom: 0;
      background-color: #ffffff;
      padding: 18px 0;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
      z-index: 999;
    }
  }
`;

const TrainingInformation = () => {
  const user = useSelector((state: any) => state?.auth?.user);
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState("");
  const { data: trainingDetails } = useGetScpByIdQuery(id);
  const [applyScp] = useApplyScpMutation();
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state?.auth?.user?._id);
  const { data: userData, refetch } = useGetUserByIdQuery(userId)
  const { data: allScpData } = useGetAllScpQuery("");
  const key = "6452e350-805d-4519-93d8-0bbf04023792";

  useEffect(() => {
    refetch();
  },[])

  const handleApplyScp = async () => {
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          key: key,
          client_txn_id: userData?.data?.payment_txn_id,
          txn_date: "06-03-2023",
        }),
      };
      fetch(
        `${process.env.REACT_APP_APIBASE}/api/payment/check-order-status`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          const paymentStatus = JSON.parse(result);
          setPaymentStatus(paymentStatus?.data?.status);
        });

      if (paymentStatus === "success") {
        if (id) {
          const apply_scp: any = await applyScp({
            internship: id,
            status: "applied",
          });
          if (apply_scp?.data?.code === 200) {
            messageApi.open({
              type: "success",
              content: "Apply Successfully!",
            });
          } else {
            messageApi.open({
              type: "error",
              content: apply_scp?.error?.data?.message,
            });
          }
        }
      } else {
        navigate("/pricing");
      }
  };

  return (
    <TrainingInformationPageWrapper>
      {contextHolder}
      <div className="absolute full-width z-99">
        <Header />
      </div>
      <div className="main--container full-width relative">
        {/* <div className="search_bar absolute">
          <img src={search_icon} alt="" className="absolute search-icon" />
          <input
            type="search"
            placeholder="Search"
            className="search-bar-style br10 py7 pl36 pr8 font-17"
          />
        </div> */}
        <div className="training-info-container">
          <div className="apply-card-section flex justify-between pl45 pr99 py24">
            <div className="flex items-center">
              <img
                src={trainingDetails?.data?.company?.profile_photo}
                alt="logo"
                className="company-logo"
              />
              <div className="pl45 name-title relative">
                <div className="font-28 semi-bold-text pb8 company-name">
                  {trainingDetails?.data?.company?.name}
                </div>
                <div className="font-20 semi-bold-text darkgray--text pb18 job-title">
                  {trainingDetails?.data?.title}
                </div>
                <div className="flex items-center gap28 status-container">
                  <div className="flex gap5">
                    <div
                      className={`${
                        true ? "status-bar-active" : ""
                      } status-bar mobile-icons border-none`}
                    />
                    <div className="font-16 semi-bold-text darkgray--text">
                      {trainingDetails?.data?.mode}
                    </div>
                  </div>
                  {trainingDetails?.data?.mode === "offline" && (
                    <div className="flex gap4">
                      <img
                        src={location_icon}
                        alt=""
                        className="mobile-icons"
                      />
                      <div className="font-16 semi-bold-text darkgray--text self-center">
                        {trainingDetails?.data?.location}
                      </div>
                    </div>
                  )}
                  <div className="flex gap6">
                    <img
                      src={clock_icon}
                      alt=""
                      className="clock-icon mobile-icons"
                    />
                    <div className="font-16 semi-bold-text darkgray--text self-center">
                      {trainingDetails?.data?.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {user && (
              <button
                className="apply-btn self-center px58 py15 font-20 bold-text white--text primary br8 border-none cursor-pointer"
                onClick={() => handleApplyScp()}
              >
                Apply
              </button>
            )}
          </div>
          <div className="flex gap30 pt30 information-bottom-container">
            <div className="information-container">
              <div className="pt32 pl8 responsibility-container">
                <div className="font-16 semi-bold-text pb16">
                  Responsibilities
                </div>
                <ul className="font-12 regular-text description-section">
                  <li>{trainingDetails?.data?.duties_and_responsibilities}</li>
                  {/* <li>Create wireframes and high-fidelity prototypes</li>
                  <li>
                    Take a collaborative approach to work with motivation to
                    develop your skills by taking ownership of new challenges
                    and have a genius interest in solving complex business
                    problems.
                  </li>
                  <li>
                    Ensure that the product is working properly at all times
                  </li>
                  <li>
                    Create the user interface of products such as an app,
                    website, or any other interactive media
                  </li>
                  <li>
                    Research the user's needs at the project's beginning,
                    including conducting user interviews & surveys, engaging in
                    prototype testing, driving competitive analysis, etc.
                  </li> */}
                </ul>
              </div>
              <div className="pt28 pl8">
                <div className="font-16 semi-bold-text pb16">Skills</div>
                <ul className="font-12 regular-text description-section">
                  {trainingDetails?.data?.skill_and_abilities?.map(
                    (skill: string) => (
                      <li>{skill}</li>
                    )
                  )}
                  {/* <li>
                    Create the user interface of products such as an app,
                    website, or any other interactive media
                  </li>
                  <li>
                    Research the user's needs at the project's beginning,
                    including conducting user interviews & surveys, engaging in
                    prototype testing, driving competitive analysis, etc.
                  </li> */}
                </ul>
              </div>
              <div className="pt28 pl8">
                <div className="font-16 semi-bold-text pb16">Training Mode</div>
                <div className="font-12">{trainingDetails?.data?.mode}</div>
              </div>
              <div className="pt40 pl8">
                <div className="font-16 semi-bold-text pb16">About Us</div>
                <div className="font-12">{trainingDetails?.data?.about_us}</div>
              </div>
              <div className="py40 pl8">
                <div className="font-16 semi-bold-text pb16">Contact Us</div>
                <div className="flex gap16 pb16">
                  <img src={map_icon} alt="map" className="self-start" />
                  <div className="font-12 address-section">
                    {trainingDetails?.data?.address}
                  </div>
                </div>
                <div className="flex gap16 pb16">
                  <img src={call_icon} alt="call" className="self-start" />
                  <div className="font-12">{trainingDetails?.data?.phone}</div>
                </div>
                <div className="flex gap16">
                  <img src={email_icon} alt="call" className="self-start" />
                  <div className="font-12">{trainingDetails?.data?.email}</div>
                </div>
              </div>
              <div className="pl8">
                <div className="font-16 semi-bold-text pb16">FAQs</div>
                <div className="font-12 description-section">
                  {trainingDetails?.data?.faqs}
                </div>
                {/* <ul className="faqs-ul">
                    <li className="font-12 semi-bold-text pb24">Are you currently hiring? <br/><div className="font-12 regular-text pt8 answer-section">Absolutely! We’re looking for technology enthusiasts superheroes and ninjas to join our team and make a difference. Visit our careers page to know more.</div></li>
                    <li className="font-12 semi-bold-text pb24">Are you a remote company? <br/><div className="font-12 regular-text pt8 answer-section">Absolutely! We’re looking for technology enthusiasts superheroes and ninjas to join our team and make a difference. Visit our careers page to know more.</div></li>
                    <li className="font-12 semi-bold-text pb24">What are the open positions? <br/><div className="font-12 regular-text pt8 answer-section">Absolutely! We’re looking for technology enthusiasts superheroes and ninjas to join our team and make a difference. Visit our careers page to know more.</div></li>
                  </ul> */}
              </div>
            </div>
            <div className="px16 py22 similar-card-section">
              <div className="font-16 semi-bold-text">Similar Trainings</div>
              <div className="flex flex-col gap32 pt27 px50 similar-cards">
              {allScpData &&
                allScpData?.data &&
                allScpData?.data?.user
                    ?.filter((data: any) => data?._id !== trainingDetails?.data?._id)
                    .allScpData?.data?.user?.map(
                      (job: any, index: number) => {
                        {
                          index < 2 && <JobCard job={job} />;
                        }
                      }
                    )}
              </div>
            </div>
          </div>
        </div>
        {user && (
          <div className="filter-btn-mobile-container">
            <div className="filter-apply-btn-mobile flex full-width justify-center gap10">
              <CommonButton
                classname="font-16 full-width semi-bold-text py13 px60 br8 primary--text white border1 primary--border"
                title="Save"
              />
              <CommonButton
                classname="font-16 full-width semi-bold-text py13 px60 br8 white--text primary border1 primary--border"
                title="Apply"
                onClick={() => handleApplyScp()}
              />
            </div>
          </div>
        )}
      </div>
    </TrainingInformationPageWrapper>
  );
};

export default TrainingInformation;
