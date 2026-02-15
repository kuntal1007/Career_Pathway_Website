import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../../component/common/Form/Input";
import Header from "../../../component/landing/Header";
import reset_password from "../../../assets/gif/reset-password.gif";
import CommonButton from "../../../component/common/Button";
import { message } from "antd";
import { usePostResetPasswordMutation } from "../../../redux/services/user";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPasswordWrapper = styled.div`
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
      height: 310px;
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
      height: 92%;
    }
    .login-right-form {
      width: 100%;
    }
    .confirm-btn{
      font-size: 14px;
      padding: 13px 0;
    }
  }
`;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userNewPassword, setUserNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [ resetPassword ] = usePostResetPasswordMutation();
  let query = useQuery();
  const userId = query.get("user");

  const handleResetPasswordSubmit = async() => {
    if(userNewPassword === userConfirmPassword) {
      setIsLoading(true);
      const resetData: any = await resetPassword({ userId: userId, password: userConfirmPassword });
      if(resetData?.data?.code === 200){
        setIsLoading(false);
        navigate("/password-reset-success")
      }else{
        setIsLoading(false);
        messageApi.open({
          type: 'error',
          content: 'Something went wrong!',
        });
      }
    } else{
      setIsLoading(false);
      messageApi.open({
        type: 'error',
        content: 'Password & Confirm Password Not Match!',
      });
    }
  }

  return (
    <ResetPasswordWrapper>
      {contextHolder}
      <div>
        <div className="absolute full-width z-99">
          <Header />
        </div>
        <div className="flex full-height relative log-in-container">
          <div className="login-left-img text-center">
            <img src={reset_password} alt="" />
          </div>
          <div className="login-right-form text-center flex flex-col justify-center mb40 full-height">
            <div>&nbsp;</div>
            <div className="form-area text-left">
              <h1 className="font-40 bold-text mb72 title">Reset Password</h1>
              <h1 className="font-20 semi-bold-text mb24 black-text title-mob">Reset Password</h1>
              <Input
                label="New Password"
                inputType="password"
                inputClassname="mb32"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserNewPassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                inputType="password"
                inputClassname="mb100"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserConfirmPassword(e.target.value)}
              />
              <CommonButton
                classname="confirm-btn primary mt6 full-width py10 white--text font-20 semi-bold-text border-none br8"
                title={isLoading ? "Loading..." : "Confirm"}
                onClick={() => handleResetPasswordSubmit()}
              />
            </div>
          </div>
        </div>
      </div>
    </ResetPasswordWrapper>
  );
};

export default ResetPassword;
