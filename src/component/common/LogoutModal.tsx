import React from "react";
import styled from "styled-components";
import back_icon from "../../assets/images/SignUpScreen/back_icon.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/auth";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModalWrapper = styled.div`
  .logout-modal-wrapper {
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.75);
    z-index: 9999;
    position: fixed;
		top: 0;
  }
  .logout-modal {
    max-width: 749px;
    width: 100%;
    padding: 121px 0 97px 0;
  }
  .back-btn {
    top: 88px;
    left: 135px;
  }
  .back-btn-mobile,
  .modal-header {
    display: none;
  }
  .logout-btn:hover, .cancel-btn:hover{
    color: #fff;
    background-color: rgba(40, 104, 197, 0.9);
    transition: ease-in 0.2s;
  }
  @media only screen and (max-width: 1100px) {
    .back-btn {
      top: 88px;
      left: 75px;
    }
  }
  @media only screen and (max-width: 680px) {
    .back-btn-mobile {
      display: block;
      top: 16px;
      left: 18px;
      height: 24px;
      width: 24px;
    }
    .back-btn {
      display: none;
    }
    .logout-modal {
      max-width: 322px;
      padding: 48px 0 47px 0;
    }
    .logout-text{
      font-size: 24px;
    }
    .logout-bottom{
      font-size: 14px;
      padding-top: 38px;
    }
    .btn-container{
      padding-top: 36px;
      gap: 40px;
    }
    .logout-btn, .cancel-btn{
      font-size: 16px;
      padding: 9px 22px;
    }
  }
`;

const LogoutModal = ({
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  const dispatch = useDispatch();
  return (
    <LogoutModalWrapper>
      <div className="logout-modal-wrapper flex justify-center items-center">
        <img
          src={back_icon}
          alt="back"
          className="absolute back-btn cursor-pointer"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
        <img
          src={back_icon}
          alt="back"
          className="absolute back-btn-mobile cursor-pointer"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
        <div className="white br16 text-center logout-modal">
          <div className="font-40 bold-text logout-text">Logout</div>
          <div className="font-24 normal-text pt53 logout-bottom">
            Are you sure you want to log out?
          </div>
          <div className="flex gap80 pt72 justify-center btn-container">
            <button className="logout-btn white border1 br8 primary--text bold-text primary--border font20 py14 px48 cursor-pointer" onClick={() => {dispatch(logout()); setIsModalOpen(!isModalOpen)}}>
              Log out
            </button>
            <button className="cancel-btn primary border1 br8 white--text bold-text primary--border font20 py14 px48 cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </LogoutModalWrapper>
  );
};

export default LogoutModal;
