import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/Header/cp.png";
import location_icon from "../../assets/images/Footer/location_icon.svg";
import mail_icon from "../../assets/images/Footer/mail_icon.svg";
import contact_icon from "../../assets/images/Footer/contact_icon.svg";
import twitter_icon from "../../assets/images/Social_icon/twitter_icon.svg";
import facebook_icon from "../../assets/images/Social_icon/facebook_icon.svg";
import linkedin_icon from "../../assets/images/Social_icon/linkedin_icon.svg";
import insta_icon from "../../assets/images/Social_icon/insta_icon.svg";
import down_arrow from "../../assets/images/Footer/down_arrow.svg";

const FooterWrapper = styled.div`
  background: #294363;
  a {
    text-decoration: none;
  }
  .logo {
    height: 35px;
    width: 35px;
  }
  .footer--main-container {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
  }
  .footer--container {
    padding: 51px 95px 32px 100px;
  }
  .CareerPath--text {
    letter-spacing: 0.2em;
  }
  .skilled-description {
    max-width: 581px;
    width: 100%;
  }
  .footer-copyright-section {
    border-top: 1px solid #ffffff;
    padding-left: 135px;
    padding-right: 135px;
  }
  .email-submit-btn {
    width: max-content;
  }
  .footer-address,
  .about-us,
  .quick-link {
    width: 360px;
  }
  .about-us {
    width: auto;
    justify-self: center;
  }
  .quick-link {
    width: auto;
    justify-self: end;
  }
  .get-in-touch ul li {
    list-style-type: none;
  }
  .links-section {
    grid-gap: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .footer--mobile-container {
    display: none;
  }
  @media only screen and (max-width: 870px) {
    .footer--container {
      padding: 50px 30px 32px 30px;
    }
    .footer-address {
      width: 280px;
    }
  }
  .footer-logo{
    height: 35px;
    width: 35px;
  }

  @media only screen and (max-width: 690px) {
    .footer--container {
      display: none;
    }
    .footer--mobile-container {
      display: block;
      padding: 26px 15px 40px 17px;
    }
    .email--container-mobile input {
      border: 0.746154px solid #8991a4;
      border-radius: 5.96923px 0 0 5.96923px;
      color: #8991a4;
      width: calc(100% - 40px);
    }
    .email--container-mobile button {
      border-radius: 0px 5.96923px 5.96923px 0px;
    }
    .footer-copyright-section {
      font-size: 10px;
      padding: 9px 17px 16px 17px;
    }
    .social-icon-mobile {
      height: 16px;
    }
    .isContainerOpen {
      transform: rotate(180deg);
    }
  }
`;

const Footer = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  return (
    <FooterWrapper>
      <div className="footer--main-container">
        <div className="footer--container white--text">
          <div>
            <div className="flex justify-between pb74 gap20">
              <div>
                <div className="flex gap22 pb22">
                  <img src={Logo} alt="logo"className="footer-logo" />
                  <div className="CareerPath--text font-32 semibold-text">
                    CareerPath
                  </div>
                </div>
                <div className="font-16 skilled-description regular-text">
                  CareerPath is a new generation hiring company which helps
                  students to find their dream job irrespective of marks and
                  degree.
                </div>
              </div>
              <div>
                <div className="font-24 semibold-text pb18">Newsletter</div>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="pt17 pb14 pl13 font-18 darkgray--text"
                  />
                  <button
                    type="submit"
                    className="email-submit-btn py15 px29 secondary white--text border-none font-18 cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <div className="links-section pb48 gap25">
              <div className="get-in-touch">
                <div className="font-24 semi-bold-text pb27">Get in Touch</div>
                <ul className="pl0 mb0">
                  <li className="font-16 regular-text flex pb8">
                    <img src={location_icon} alt="location" className="pr20" />
                    <div className="footer-address">
                      <div className="full-width pb5">506,suvas scala,near Suvas Caspia,Nikol</div>
                      <div className="font-14">Ahmedabad,Gujarat 382350</div>
                    </div>
                  </li>
                  <li className="font-16 regular-text flex py8">
                    <img src={contact_icon} alt="contact" className="pr20" />
                    <a href="tel:919480609465" className="white--text">+91 94806 09465</a>
                  </li>
                  <li className="font-16 regular-text flex pt8">
                    <img src={mail_icon} alt="mail" className="pr20" />
                    <a href="mailto: CareerPath@gmail.com" className="white--text">CareerPath@gmail.com</a>
                  </li>
                </ul>
                <div className="pt25">
                  <img
                    src={twitter_icon}
                    alt="twitter"
                    className="pr15 cursor-pointer"
                  />
                  <img
                    src={facebook_icon}
                    alt="facebook"
                    className="pr15 cursor-pointer"
                  />
                  <img
                    src={linkedin_icon}
                    alt="linkedin"
                    className="pr15 cursor-pointer"
                  />
                  <img
                    src={insta_icon}
                    alt="instagram"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {/* <div className="about-us">
                <div className="font-24 semi-bold-text pb27">About Us</div>
                <ul className="pl0 mb0">
                  <li className="font-16 regular-text flex pb8">Services</li>
                  <li className="font-16 regular-text flex py8">
                    Create Mentor Profile
                  </li>
                  <li className="font-16 regular-text flex pt8">
                    Create Industry Professional Profile
                  </li>
                </ul>
              </div> */}
              {/* <div className="quick-link">
                <div className="font-24 semi-bold-text pb27">Quick Links</div>
                <ul className="pl0 mb0">
                  <li className="font-16 regular-text flex pb8">
                    Create a company profile
                  </li>
                  <li className="font-16 regular-text flex py8">
                    Privacy Policy
                  </li>
                  <li className="font-16 regular-text flex py8">
                    Terms & Conditions
                  </li>
                  <li className="font-16 regular-text flex py8">
                    Regular FAQs
                  </li>
                  <li className="font-16 regular-text flex py8">
                    Help & Support
                  </li>
                  <li className="font-16 regular-text flex pt8">Contact</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div className="footer--mobile-container white--text">
          <div className="font-16 bold-text">Join our Newsletter</div>
          <div className="email--container-mobile full-width flex pt16">
            <input
              type="email"
              className="email--container-mobile transparent font-14 py9 px14 darkgray--text"
              placeholder="Email"
            />
            <button className="primary white--text px22 py14 border-none">
              <img
                src={down_arrow}
                alt=""
                style={{ transform: "rotate(270deg)" }}
              />
            </button>
          </div>
          {/* <div className="mt28 mb16">
            <div
              className="flex justify-between"
              onClick={() => {
                setSelectedCategory("quick-link");
                setIsOpenCategory(!isOpenCategory);
              }}
            >
              <div className="font-14 bold-text lh-28">Quick Links</div>
              <img src={down_arrow} alt="" className={`${selectedCategory === "quick-link" && isOpenCategory ? "isContainerOpen" : ""}`}/>
            </div>
            {selectedCategory === "quick-link" && isOpenCategory && (
              <div>
                <ul className="pl15 pt10 mb0">
                  <li className="font-12 regular-text flex pb8">
                    Create a company profile
                  </li>
                  <li className="font-12 regular-text flex py8">
                    Privacy Policy
                  </li>
                  <li className="font-12 regular-text flex py8">
                    Terms & Conditions
                  </li>
                  <li className="font-12 regular-text flex py8">
                    Regular FAQs
                  </li>
                  <li className="font-12 regular-text flex py8">
                    Help & Support
                  </li>
                  <li className="font-12 regular-text flex pt8">Contact</li>
                </ul>
              </div>
            )}
          </div>
          <div className="mb16">
            <div
              className="flex justify-between"
              onClick={() => {
                setSelectedCategory("about-us");
                setIsOpenCategory(!isOpenCategory);
              }}
            >
              <div className="font-14 bold-text lh-28">About Us</div>
              <img src={down_arrow} alt="" className={`${selectedCategory === "about-us" && isOpenCategory ? "isContainerOpen" : ""}`}/>
            </div>
            {selectedCategory === "about-us" && isOpenCategory && (
              <div>
                <ul className="pl15 mb0 pt10">
                  <li className="font-12 regular-text flex pb8">Services</li>
                  <li className="font-12 regular-text flex py8">
                    Create Mentor Profile
                  </li>
                  <li className="font-12 regular-text flex pt8">
                    Create Industry Professional Profile
                  </li>
                </ul>
              </div>
            )}
          </div> */}
          <div>
            <div
              className="flex justify-between pt20"
              onClick={() => {
                setSelectedCategory("get-in-touch");
                setIsOpenCategory(!isOpenCategory);
              }}
            >
              <div className="font-14 bold-text lh-28">Get In Touch</div>
              {/* <img src={down_arrow} alt="" className={`${selectedCategory === "get-in-touch" && isOpenCategory ? "isContainerOpen" : ""}`}/> */}
            </div>
            {/* {selectedCategory === "get-in-touch" && isOpenCategory && ( */}
              <ul className="pl15 mb0 pt10">
                <li className="font-12 regular-text flex pb8 items-center">
                  <img
                    src={location_icon}
                    alt="location"
                    className="pr10"
                    style={{ height: "17px" }}
                  />
                  <div className="footer-address">
                  506,suvas scala,near Suvas Caspia,Nikol, <br/>
                   Ahmedabad,Gujarat 382350
                  </div>
                </li>
                <li className="font-12 regular-text flex py8">
                  <img
                    src={contact_icon}
                    alt="contact"
                    className="pr10"
                    style={{ height: "17px" }}
                  />
                  <a href="tel:919480609465" className="white--text">+91 94806 09465</a>
                </li>
                <li className="font-12 regular-text flex pt8">
                  <img
                    src={mail_icon}
                    alt="mail"
                    className="pr10"
                    style={{ height: "17px" }}
                  />
                  <a href="mailto: CareerPath@gmail.com" className="white--text">CareerPath@gmail.com</a>
                </li>
              </ul>
            {/* )}   */}
          </div>
          <div className="pt25">
            <img
              src={twitter_icon}
              alt="twitter"
              className="pr10 cursor-pointer social-icon-mobile"
            />
            <img
              src={facebook_icon}
              alt="facebook"
              className="pr10 cursor-pointer social-icon-mobile"
            />
            <img
              src={linkedin_icon}
              alt="linkedin"
              className="pr10 cursor-pointer social-icon-mobile"
            />
            <img
              src={insta_icon}
              alt="instagram"
              className="cursor-pointer social-icon-mobile"
            />
          </div>
        </div>
      </div>
      <div className="nevyblue gray--text flex justify-between pt30 pb32 footer-copyright-section font-16">
        <div>
          Copyright © <span className="white--text">CareerPath.</span> All Rights
          Reserved.
        </div>
        {/* <div onClick={() => window.open("https://techjet.in/")} className="cursor-pointer">
          Powered By <span className="white--text">Techjet.</span>
        </div> */}
      </div>
    </FooterWrapper>
  );
};

export default Footer;
