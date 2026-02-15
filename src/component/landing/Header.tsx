import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/Header/cp.png";
import SignOptionModal from "../common/SignOptionModal";
import { useNavigate } from "react-router-dom";
import book_goggle from "../../assets/images/SignUpScreen/book_goggle.svg";
import company from "../../assets/images/SignUpScreen/company.svg";
import { useSelector } from "react-redux";
import LogoutModal from "../common/LogoutModal";
import { useGetCompanyByIdQuery } from "../../redux/services/company";

interface Props {
  isLanding?: boolean;
  nologo?: boolean;
}

const LandingHeaderWrapper = styled.div`
  .header-container {
    padding: 36px 60px 0 26px;
    z-index: 9999;
  }
  .logo {
    height: 35px;
    width: 35px;
  }
  .CareerPath-title {
    font-family: "Cabin Sketch";
    text-transform: uppercase;
  }
  .center-logo {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: fit-content;
    /* margin-left: 325px; */
  }
  .header-auth-btn {
    gap: 78px;
  }
  .signup-btn {
    border: 1px solid #b4aeae;
    margin-right: 99px;
  }
  .user-profile-img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    z-index: 9999;
    object-fit: cover;
  }
  .pop-over-container {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    width: 159px;
    top: 112px;
    right: 40px;
    z-index: 99;
  }
  .pop-over-container div {
    border-bottom: 1px solid rgba(40, 104, 197, 0.04);
  }
  .logo
  @media only screen and (max-width: 870px) {
    .center-logo-landing {
      color: white;
    }
    .header-auth-btn {
      gap: 33px;
    }
    .signup-btn {
      margin-right: 0px;
    }
  }
  @media only screen and (max-width: 670px) {
    .header-auth-btn img{
      height: 32px;
      width: 32px;
      margin-right: 0 !important;
    }
    .pop-over-container {
      width: 131px;
      top: 61px;
      right: 20px;
    }
    .pop-over-container div{
      font-size: 12px;
      padding: 12px 16px;
    }
    .CareerPath-title {
      font-size: 14px;
    }
    .login-btn {
      font-size: 14px;
      color: white;
    }
    .signup-btn {
      display: none;
    }
    .logo {
      height: 24px;
      width: 24px;
    }
    .header-container {
      padding: 16px 19px 0 16px;
    }
  }
`;

const Header = ({ isLanding, nologo }: Props) => {
  const isLogin = useSelector((state: any) => state?.auth?.isLogin);
  const User = useSelector((state: any) => state?.auth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isProfilePopupActive, setIsProfilePopupActive] = useState<boolean>(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isModalOpen]);

  return (
    <LandingHeaderWrapper>
      <div className="header-container flex justify-between items-center">
        <div>
          {!nologo &&
            <img
            src={Logo}
            alt="logo"
            className="logo cursor-pointer"
            onClick={() => navigate("/")}
            />
          }
        </div>
        <div
          className={`${
            isLanding ? "center-logo-landing" : ""
          } CareerPath-title center-logo primary--text font-24 bold-text cursor-pointer`}
          onClick={() => navigate("/")}
        >
          CareerPath
        </div>
        {isLanding ? (
          <div className="header-auth-btn flex font-18 bold-text">
            {isLogin ? (
              <img
                src={
                  (User && User?.user?.profile_photo) ||
                  User?.company?.profile_photo
                }
                alt="user"
                className="user-profile-img mr80 cursor-pointer"
                onClick={() => setIsProfilePopupActive(!isProfilePopupActive)}
              />
            ) : (
              <>
                <div
                  className="login-btn self-center cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </div>
                <div
                  className="signup-btn px25 py13 br10 cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  Sign up
                </div>
              </>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
      {isProfilePopupActive && (
        <div className="absolute white pop-over-container">
          <div
            className="font-14 normal-text px16 py14 cursor-pointer"
            onClick={() => {
              User && User?.user
                ? navigate("/aspirant-dashboard")
                : navigate("/company-dashboard");
            }}
          >
            Dashboard
          </div>
          <div
            className="font-14 normal-text px16 py14 cursor-pointer"
            onClick={() => {setIsLogoutModalOpen(true); setIsProfilePopupActive(false)}}
          >
            Log out
          </div>
        </div>
      )}
      {isLogoutModalOpen && (
        <LogoutModal
          isModalOpen={isLogoutModalOpen}
          setIsModalOpen={setIsLogoutModalOpen}
        />
      )}

      {isModalOpen && (
        <SignOptionModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          signUpModalData={signUpModalData}
        />
      )}
    </LandingHeaderWrapper>
  );
};

export default Header;
