import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../../component/common/Form/Input";
import Header from "../../../component/landing/Header";
import sign_img_1 from "../../../assets/gif/login.gif";
import book_goggle from "../../../assets/images/SignUpScreen/book_goggle.svg";
import company from "../../../assets/images/SignUpScreen/company.svg";
import CommonButton from "../../../component/common/Button";
import { useLoginMutation } from "../../../redux/services/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import SignOptionModal from "../../../component/common/SignOptionModal";

const LoginPageWrapper = styled.div`
  .login-left-img,
  .login-right-form {
    width: 50%;
    align-self: center;
    font-family: "Manrope", sans-serif !important;
  }
  .login-left-img img{
    width: 80%;
    height: 40%;
    object-fit: cover;
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
  .title-mob{
    display: none;
  }
  @media only screen and (max-width: 880px) {
    .log-in-container{
      flex-direction: column;
      align-items: center;
    }
    .title, .nbsp{
      display: none;
    }
    .title-mob{
      display: flex;
    }
    .form-area {
      max-width: 405px;
      min-width: auto;
      width: 100%;
      padding: 0 16px;      
    }
    .login-left-img img {
      height: 100%;
    }
    .login-left-img {
      width: 47%;
      margin-top: 50px;
    }
    .login-right-form {
      width: 100%;
    }
    .checkbox-container {
      margin-bottom: 66px;
    }
    .checkbox-container span, .forgot-pass{
      font-size: 12px;
    }
    .checkbox-style {
      height: 16px;
      width: 16px;
    }
    .sign-up-text, .sign-up-text span{
      font-size: 14px;
    }
    .log-in-btn{
      font-size: 14px;
      padding: 13px 0;
    }
  }
`;

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [handleLogin] = useLoginMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginbtnText, setLoginbtnText] = useState("Log In");

  const signUpModalData = [
    {
      title: "Aspirant",
      image: book_goggle,
      navigatePath: "/aspirant-signup",
    },
    {
      title: "Company",
      image: company,
      navigatePath: "/company-signup",
    },
  ];

  const handleLoginSubmit = async() => {
    if(userEmail && userPassword) {
      setLoginbtnText("Loading...")
      const loginData: any = await handleLogin({email: userEmail, password: userPassword});
      if(loginData?.data?.code === 200){
        if(loginData?.data?.data?.user){
          navigate("/aspirant-dashboard")
        } else{
          navigate("/company-dashboard")
        }
        messageApi.open({
          type: 'success',
          content: 'Login Success!',
        });
      }else{
        setLoginbtnText("Log In")
        messageApi.open({
          type: 'error',
          content: loginData?.error?.data?.message,
        });
      }
    }
  }

  return (
    <LoginPageWrapper>
      {contextHolder}
      <div>
        <div className="absolute full-width z-99">
          <Header />
        </div>
        <div className="flex full-height relative log-in-container">
          <div className="login-left-img text-center">
            <img src={sign_img_1} alt="" />
          </div>
          <div className="login-right-form text-center flex flex-col justify-between mb40 full-height">
            <div className="nbsp">&nbsp;</div>
            <div className="form-area text-left">
              <h1 className="font-40 bold-text mb64 title">Welcome to CareerPath</h1>
              <div className="font-20 semi-bold-text mb24 title-mob black--text">Log In</div>
              <Input
                label="Email Address"
                inputType="email"
                inputClassname="mb24"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
              />
              <Input
                label="Password"
                inputType="password"
                inputClassname="mb24"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)}
              />
              <div className="checkbox-container flex justify-between">
                <div className="flex">
                  <input
                    type="checkbox"
                    name="rememberme"
                    className="checkbox-style br4"
                  />
                  <span className="font-14 normal-text pl4 self-center">
                    Remember me
                  </span>
                </div>
                <div className="primary--text font-14 bold-text self-center cursor-pointer forgot-pass" onClick={() => navigate("/forgot-password")}>
                  Forgot password?
                </div>
              </div>
              <CommonButton
                classname="primary full-width py10 white--text font-20 semi-bold-text log-in-btn border-none br8"
                title={loginbtnText}
                onClick={() => handleLoginSubmit()}
              />
            </div>
            <div className="font-18 normal-text sign-up-text">
              Don’t have an account?{" "}
              <span className="font-18 bold-text primary--text cursor-pointer" onClick={() => setIsModalOpen(true)}> Sign Up </span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SignOptionModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          signUpModalData={signUpModalData}
        />
      )}
    </LoginPageWrapper>
  );
};

export default Login;
