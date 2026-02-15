import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../../../component/landing/Header";
import create_post from "../../../../assets/gif/create-post.gif";
import right_arrow from "../../../../assets/images/SignUpScreen/arrow_right.svg";
import left_arrow from "../../../../assets/images/SignUpScreen/arrow_left.svg";
import back_icon from "../../../../assets/images/SignUpScreen/back_icon_mobile.svg";
import SignUpForm from "./SignUpForm";
import { useCreateJobMutation } from "../../../../redux/services/dashboard";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ContactPageModal from "../../../../component/common/ContactPageModal";

const JobCreatePostPageWrapper = styled.div`
  .signup-left-img,
  .signup-right-form {
    width: 50%;
    align-self: center;
    font-family: "Manrope", sans-serif !important;
  }
  .signup-right-form h1 {
    color: #407bff;
  }
  .sign-left-img {
    max-height: 95vh;
    height: 100%;
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
  .back_icon{
    display: none;
  }
  @media only screen and (max-width: 780px) {
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
      width: 60%;
      margin-top: 60px;
    }
    .signup-left-img , .signup-right-form{
      width: 100%;
    }
    .next-btn {
      font-size: 16px;
      bottom: -14px;
      right: 16px;
    }
    .next-img, .back-btn, .nbsp_space_2 {
      display: none;
    }
    .back_icon{
      display: block;
      position: absolute;
      top: 20px;
      left: 18px;
    }
    .logo-CareerPath{
      top: 17px;
    }
  }
`;

const JobCreatePost = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [createJob] = useCreateJobMutation();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    duties_and_responsibilities: "",
    experince: [],
    mode: "",
    type: "",
    duration: "",
    skill_and_abilities: [],
    about_us: "",
    faqs: "",
    vacancy: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async() => {
    if(formData){
      const submit: any = await createJob(formData);
      if (submit && submit?.data?.code === 200) {
        messageApi.open({
          type: 'success',
          content: 'Job Created Successfully!',
        });
        navigate("/CareerPath-job")
      }else{
        messageApi.open({
          type: 'error',
          content: submit?.error?.data?.message,
        });
      }
    }
  }
  
  return (
    <JobCreatePostPageWrapper>
      {contextHolder}
      <div>
        <div>
          <div className="absolute logo-CareerPath fill-width z-99">
            <Header nologo/>
          </div>
          <div className="flex fill-height relative sign-up-container">
            {pageNumber === 1 ?
              <div className="back_icon" onClick={() => navigate("/company-dashboard")}><img src={back_icon} alt="back" /></div>
              :
              <div className="back_icon" onClick={() => setPageNumber(pageNumber - 1)}><img src={back_icon} alt="back" /></div>
            }
            <div className="signup-left-img text-center">
              <img src={create_post} alt="create-post" className="sign-left-img" />
            </div>
            <div className="signup-right-form fill-height text-center flex flex-col justify-between mb70">
              <div className="nbsp_space_2">&nbsp;</div>
              <div className="form-area text-left">
                <SignUpForm
                  pageNumber={pageNumber}
                  formData={formData}
                  setFormData={setFormData}
                  setIsContactModalOpen={setIsContactModalOpen}
                />
              </div>
              <div className="relative button-area">
                <div className="flex justify-between align-center mt40">
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
                    <div className="absolute font-20 bold-text px46 py14 primary white--text br8 next-btn cursor-pointer" onClick={() => handleSubmit()}>
                      Confirm 
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isContactModalOpen && (
        <ContactPageModal
          setIsModalOpen={setIsContactModalOpen}
          isModalOpen={isContactModalOpen}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </JobCreatePostPageWrapper>
  );
};

export default JobCreatePost;
