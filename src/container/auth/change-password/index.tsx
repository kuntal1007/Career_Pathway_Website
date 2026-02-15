import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../../component/common/Form/Input";
import Header from "../../../component/landing/Header";
import change_password from "../../../assets/gif/change-password.gif";
import CommonButton from "../../../component/common/Button";
import { message } from "antd";

const ChangePasswordWrapper = styled.div`
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
    .submit-btn{
      font-size: 14px;
      padding: 13px 0;
      margin-top: 24px;
    }
  }
`;

const ChangePassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userCurrentPassword, setUserCurrentPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const handleChangePasswordSubmit = async() => {
    if(userNewPassword === userConfirmPassword) {
      // const loginData: any = await handleLogin({email: userEmail, password: userPassword});
      // if(loginData?.data?.code === 200){
      //   if(loginData?.data?.data?.user){
      //     navigate("/aspirant-dashboard")
      //   } else{
      //     navigate("/company-dashboard")
      //   }
      //   messageApi.open({
      //     type: 'success',
      //     content: 'Login Success!',
      //   });
      // }else{
      //   messageApi.open({
      //     type: 'error',
      //     content: loginData?.error?.data?.message,
      //   });
      // }
    }
  }

  return (
    <ChangePasswordWrapper>
      {contextHolder}
      <div>
        <div className="absolute full-width z-99">
          <Header />
        </div>
        <div className="flex full-height relative log-in-container">
          <div className="login-left-img text-center">
            <img src={change_password} alt="" />
          </div>
          <div className="login-right-form text-center flex flex-col justify-center mb40 full-height">
            <div>&nbsp;</div>
            <div className="form-area text-left">
              <h1 className="font-40 bold-text mb64 title">Change Password</h1>
              <h1 className="font-20 semi-bold-text mb24 black-text title-mob">Change Password</h1>
              <Input
                label="Current Password"
                inputType="password"
                inputClassname="mb32"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserCurrentPassword(e.target.value)}
              />
              <Input
                label="New Password"
                inputType="password"
                inputClassname="mb32"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserNewPassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                inputType="password"
                inputClassname="mb80"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserConfirmPassword(e.target.value)}
              />
              <CommonButton
                classname="primary submit-btn full-width py10 white--text font-20 semi-bold-text border-none br8"
                title="Save Changes"
                onClick={() => handleChangePasswordSubmit()}
              />
            </div>
          </div>
        </div>
      </div>
    </ChangePasswordWrapper>
  );
};

export default ChangePassword;
