import React, { useState } from "react";
import styled from "styled-components";
import back_icon from "../../assets/images/SignUpScreen/back_icon.svg";
import back_icon_mobile from "../../assets/images/SignUpScreen/back_icon_mobile.svg";
import { useNavigate } from "react-router-dom";
import Header from "../landing/Header";
import CustomTooltip from "./CustomTooltip";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  signUpModalData: {
    title: string;
    image: string;
    navigatePath: string;
    hoverData?: string;
  }[];
}

const SignOptionModalWrapper = styled.div`
  .option-btn {
    height: 270px;
    width: 270px;
    background: #f2f2f2;
  }
  .option-btn:hover {
    background: #2868c5;
    color: #fff;
  }
  .sign-modal {
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.75);
    z-index: 9999;
    position: fixed;
    top: 0;
  }
  .back-btn {
    top: 88px;
    left: 135px;
  }
  .back-btn-mobile,
  .modal-header {
    display: none;
  }
  .tooltip-card {
    position: absolute;
    bottom: -52px;
    text-align: center;
    left: 0;
    right: 0;
    align-self: center;
    margin: 0 auto;
  }
  .tooltip-card div {
    min-height: 40px;
  }
  @media only screen and (max-width: 1100px) {
    .back-btn {
      top: 88px;
      left: 75px;
    }
  }
  @media only screen and (max-width: 680px) {
    .sign-modal {
      background: rgba(255, 255, 255, 1);
      z-index: 99;
    }
    .back-btn-mobile {
      display: block;
      top: 16px;
      left: 18px;
    }
    .modal-header {
      display: block;
      z-index: 9999;
    }
    .back-btn {
      display: none;
    }
    .option-btn {
      height: 128px;
      width: 128px;
      background: #f2f2f2;
    }
    .button-title {
      font-size: 14px;
    }
    .button-image {
      width: 63.05px;
      height: 39.35px;
    }
    .modal--header-title {
      color: black;
      font-size: 16px;
      padding-bottom: 43px;
    }
    .buttons-container {
      gap: 40px;
    }
  }
`;

const SignOptionModal = ({
  isModalOpen,
  setIsModalOpen,
  signUpModalData,
}: Props) => {
  const [mouseHover, setIsMouseHover] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <SignOptionModalWrapper>
      <div className="modal-header">
        <Header />
      </div>
      <div className="sign-modal flex justify-center items-center">
        <img
          src={back_icon}
          alt="back"
          className="absolute back-btn cursor-pointer"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
        <img
          src={back_icon_mobile}
          alt="back"
          className="absolute back-btn-mobile cursor-pointer"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
        <div>
          <div className="modal--header-title font-32 bold-text pb32 white--text text-center">
            Choose an Option
          </div>
          <div className="flex gap49 buttons-container">
            {signUpModalData &&
              signUpModalData.map((data) => (
                <div className="relative">
                  {mouseHover === data?.title && data?.hoverData && (
                    <div className="tooltip-card white br8">
                      <div className="px4 py2 font-15 flex justify-center items-center semi-bold-text">
                        {data?.hoverData}
                      </div>
                    </div>
                  )}
                  <div
                    className="option-btn br12 flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => navigate(data.navigatePath)}
                    onMouseEnter={() => setIsMouseHover(data?.title)}
                    onMouseLeave={() => setIsMouseHover(null)}
                  >
                    <img
                      src={data.image}
                      alt=""
                      height="121px"
                      width="152px"
                      className="button-image"
                    />
                    <div className="button-title font-24 bold-text pt10">
                      {data.title}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </SignOptionModalWrapper>
  );
};

export default SignOptionModal;
