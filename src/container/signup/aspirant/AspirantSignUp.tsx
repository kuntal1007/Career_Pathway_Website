import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../../component/landing/Header";
import sign_up from "../../../assets/gif/sign-up-aspirant.gif";
import right_arrow from "../../../assets/images/SignUpScreen/arrow_right.svg";
import left_arrow from "../../../assets/images/SignUpScreen/arrow_left.svg";
import SignUpForm from "./SignUpForm";
import { useAspirantSignUpMutation } from "../../../redux/services/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AspirantSignUpPageWrapper = styled.div`
  .signup-left-img,
  .signup-right-form {
    width: 48%;
    font-family: "Manrope", sans-serif !important;
  }
  .signup-right-form h1 {
    color: #407bff;
  }
  .sign-left-img {
    object-fit: cover;
    margin-top: 30px;
  }
  .form-area {
    min-width: 405px;
    max-width: 405px;
    margin: 0 auto;
  }
  .button-area {
    min-width: 405px;
    max-width: 405px;
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
    .sign-left-img{
      margin-top: 50px;
    }
    .sign-left-img img{
      width: 49%;
    }
    .signup-left-img, .signup-right-form{
      width: 100%;
    }
    .next-btn {
      font-size: 16px;
      bottom: -14px;
      right: 16px;
      padding-left: 27px;
    }
    .next-img, .back-btn {
      display: none;
    }
  }
`;

const AspirantSignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [handleSignUp] = useAspirantSignUpMutation();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoader, setIsLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    adharcard: "",
    pancard: "",
    languages: "",
    profile_photo: "",
    college_name: "",
    skills: [],
    interests: [],
    projects: "",
    id_card: "",
    bio: "",
  });

  const handleSubmit = async() => {
    if (formData) {
      setIsLoader(true);
      const submit: any = await handleSignUp(formData);
      if (submit && submit?.data?.code === 200) {
        setIsLoader(false);
        messageApi.open({
          type: 'success',
          content: 'Congratulations, your account has been successfully created.',
        });
        navigate("/aspirant-dashboard")
      }else{
        setIsLoader(false);
        messageApi.open({
          type: 'error',
          content: submit?.error?.data?.message,
        });
      }
    }
  }

  return (
    <AspirantSignUpPageWrapper>
      {contextHolder}
      <div>
        <div>
          <div className="absolute full-width z-99">
            <Header />
          </div>
          <div className="flex fill-height relative sign-up-container">
            <div className="signup-left-img text-center">
              <div className="sign-left-img">
                <img src={sign_up} alt="" className="" />
              </div>
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
                  <div className="self-center ml30 pageno">Page {pageNumber} of 3</div>
                  <div className="nbsp_space"></div>
                  {pageNumber !== 3 ? (
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
                    <div onClick={() => handleSubmit()} className="absolute font-20 bold-text px46 py14 primary white--text br8 next-btn cursor-pointer">
                      {isLoader ? "Loading..." :  "Sign Up"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AspirantSignUpPageWrapper>
  );
};

export default AspirantSignUp;
