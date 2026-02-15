import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../../component/common/Form/Input";
import Header from "../../../component/landing/Header";
import forget_password from "../../../assets/gif/forget-password.gif";
import CommonButton from "../../../component/common/Button";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { usePostForgetPasswordMutation } from "../../../redux/services/user";

const ForgotPasswordWrapper = styled.div`
  .login-left-img,
  .login-right-form {
    width: 50%;
    align-self: center;
    font-family: "Manrope", sans-serif !important;
  }
  .login-right-form h1 {
    color: #407bff;
  }
  .form-area {
    min-width: 379px;
    margin: 0 auto;
  }
  .checkbox-style {
    height: 20px;
    width: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .checkbox-container {
    margin-bottom: 105px;
  }
  @media only screen and (max-width: 880px) {
    .log-in-container{
      flex-direction: column;
      align-items: center;
      height: 270px;
    }
    .title, .nbsp{
      display: none;
    }
    .title-mob{
      display: flex;
      color: #000000 !important;
    }
    .form-area {
      max-width: 405px;
      min-width: auto;
      width: 100%;
      padding: 0 16px;      
    }
    .login-left-img {
      width: 100%;
      height: 100%;
      margin-top: 50px;
    }
    .login-left-img img {
      height: 87%;
    }
    .login-right-form {
      width: 100%;
    }
    .back-to-login, .save-changes-btn{
      font-size: 14px;
      padding: 13px 0;
      margin-top: 24px;
    }
  }
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const [ postForgetPassword ] = usePostForgetPasswordMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPasswordSubmit = async() => {
    setIsLoading(true);
    if(email){
      const resp: any = await postForgetPassword(email);
      if(resp && resp?.data?.code === 200){
        messageApi.open({
          type: 'success',
          content: 'Link has been send to email!',
        });
        setIsLoading(false);
      } else {
        messageApi.open({
          type: 'error',
          content: "You don't have CareerPath account with this email",
        });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      messageApi.open({
        type: 'error',
        content: 'Please enter your email address',
      });
    }
  }

  return (
    <ForgotPasswordWrapper>
      {contextHolder}
      <div>
        <div className="absolute full-width z-99">
          <Header />
        </div>
        <div className="flex full-height relative log-in-container">
          <div className="login-left-img text-center">
            <img src={forget_password} alt="" />
          </div>
          <div className="login-right-form text-center flex flex-col justify-center mb40 full-height">
            <div>&nbsp;</div>
            <div className="form-area text-left">
              <h1 className="font-40 bold-text mb88 title">Forgot Password</h1>
              <h1 className="font-20 semi-bold-text mb24 black-text title-mob">Forgot Password</h1>
              <Input
                label="Email Address"
                inputType="email"
                inputClassname="mb90"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <CommonButton
                classname="save-changes-btn primary mt30 full-width py11 white--text font-20 semi-bold-text border-none br8"
                title={isLoading ? "Loading..." : "Save Changes"}
                onClick={() => handleForgotPasswordSubmit()}
              />
              <CommonButton
                classname="back-to-login white mt32 full-width py9 primary--text font-20 mb32 semi-bold-text primary--border br8"
                title="Back to Login"
                onClick={() => navigate("/login")}
              />
            </div>
          </div>
        </div>
      </div>
    </ForgotPasswordWrapper>
  );
};

export default ForgotPassword;
