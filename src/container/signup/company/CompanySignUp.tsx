import React, { useState } from "react";
import styled from "styled-components";
import { message } from "antd";
import Header from "../../../component/landing/Header";
import sign_up from "../../../assets/gif/sign-up.gif";
import right_arrow from "../../../assets/images/SignUpScreen/arrow_right.svg";
import left_arrow from "../../../assets/images/SignUpScreen/arrow_left.svg";
import SignUpForm from "./SignUpForm";
import { useCompanySignUpMutation } from "../../../redux/services/auth";
import { useNavigate } from "react-router-dom";

const CompanySignUpPageWrapper = styled.div`
  .signup-left-img,
  .signup-right-form {
    width: 100%;
    font-family: "Manrope", sans-serif !important;
  }
  .signup-right-form h1 {
    color: #407bff;
  }
  .sign-left-img {
    height: 80%;
    width: 100%;
    object-fit: cover;
  }
  .form-area {
    min-width: 379px;
    margin: 0 auto;
  }
  .button-area {
    min-width: 405px;
    margin: 0 auto;
  }
  .next-btn {
    bottom: -7px;
    right: -120px;
  }
  .nbsp_space {
    width: 80px;
    height: 33px;
  }
  .nbsp_space_2 {
    height: 53px;
  }
  
  @media only screen and (max-width: 880px) {
    .sign-up-container{
      flex-direction: column;
      align-items: center;
    }
    .nbsp_space{
      display: none;
    }
    .form-area {
      max-width: 405px;
      min-width: auto;
      width: 100%;
      padding: 0 16px;      
    }
    .button-area {
      max-width: 405px;
      min-width: auto;
      width: 100%;
      padding: 0 16px;
    }
    .pageno {
      margin-left: 0;
      font-size: 12px;
    }
    .signup-left-img{
      width: 70%;
    }
    .signup-right-form{
      width: 100%;
    }
    .next-btn {
      font-size: 16px;
      bottom: -14px;
      right: 16px;
    }
    .next-img, .back-btn {
      display: none;
    }
  }
`;

const CompanySignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [handleSignUp] = useCompanySignUpMutation();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoader, setIsLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    about: "",
    email: "",
    password: "",
    address: "",
    founded_year: "",
    site_link: "",
    phone: "",
    services: [],
    companty_email: "",
    profile_photo: "",
  });

  const onSubmitHandler = async () => {
    if (formData) {
      setIsLoader(true);
      const submit: any = await handleSignUp(formData);
      if (submit && submit?.data?.code === 200) {
        setIsLoader(false);
        navigate("/company-dashboard");
        messageApi.open({
          type: 'success',
          content: 'Congratulations, your account has been successfully created.',
        });
      }else{
        setIsLoader(false);
        messageApi.open({
          type: 'error',
          content: submit?.error?.data?.message,
        });
      }
    }
  };

  return (
    <CompanySignUpPageWrapper>
      {contextHolder}
      <div>
        <div>
          <div className="absolute full-width z-99">
            <Header />
          </div>
          <div className="flex fill-height relative sign-up-container">
            <div className="signup-left-img text-center">
              <img src={sign_up} alt="" className="sign-left-img" />
            </div>
            <div className="signup-right-form fill-height text-center flex flex-col justify-between mb70">
              <div className="form-area text-left">
                <SignUpForm
                  pageNumber={pageNumber}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="relative button-area">
                <div className="flex justify-between mt40 align-center">
                  {pageNumber !== 1 ? (
                    <div
                      className="flex cursor-pointer back-btn"
                      onClick={() => setPageNumber(pageNumber - 1)}
                    >
                      <img src={left_arrow} alt="" />
                      <span className="font-20 bold-text primary--text self-center">
                        Back
                      </span>
                    </div>
                  ) : (
                    <div className="nbsp_space"></div>
                  )}
                  <div className="self-center ml30 pageno">Page {pageNumber} of 2</div>
                  <div className="nbsp_space"></div>
                  {pageNumber !== 2 ? (
                    <div
                      className="absolute py14 flex cursor-pointer px43 border1 primary--border br8 next-btn"
                      onClick={() => setPageNumber(pageNumber + 1)}
                    >
                      <span className="font-20 bold-text primary--text pr13 next-btn">
                        Next
                      </span>
                      <img src={right_arrow} alt="" className="self-center next-img" />
                    </div>
                  ) : (
                    <div
                      onClick={() => onSubmitHandler()}
                      className="absolute font-20 bold-text px46 py14 primary white--text br8 next-btn cursor-pointer"
                    >
                      {isLoader ? "Loading..." :  "Sign Up"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CompanySignUpPageWrapper>
  );
};

export default CompanySignUp;
