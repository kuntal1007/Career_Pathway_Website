import React from "react";
import styled from "styled-components";
import Header from "../../../component/landing/Header";
import success_icon from "../../../assets/images/Dashboard/success_icon.svg";
import CommonButton from "../../../component/common/Button";
import { useNavigate } from "react-router-dom";

const PasswordResetSuccessWrapper = styled.div`
	.login-now-btn{
		width: 369px;
	}
  @media only screen and (max-width: 780px) {
    .success-icon img{
      height: 115px;
      width: 115px;
    }
    .title{
      font-size: 20px;
    }
    .login-text{
      font-size: 16px;
    }
    .login-now-btn{
      font-size: 14px;
      padding: 13px 0 15px 0;
    }
  }
`;

const PasswordResetSuccess = () => {
	const navigate = useNavigate();
  return (
    <PasswordResetSuccessWrapper>
      <div>
        <div className="absolute full-width z-99">
          <Header />
        </div>
        <div className="flex flex-col text-center justify-center full-height relative">
					<div className="success-icon"><img src={success_icon} alt="success" /></div>
					<div className="font-32 semi-bold-text mt100 mb32 title">Your password reset has been successful!</div>
					<div className="font-24 normal-text darkgray--text mb80 login-text">Please login to your account again</div>
					<CommonButton title="Login Now" classname="font-20 bold-text white--text primary br8 py11 login-now-btn border-none" onClick={() => navigate("/login")}/>
				</div>
      </div>
    </PasswordResetSuccessWrapper>
  );
};

export default PasswordResetSuccess;
