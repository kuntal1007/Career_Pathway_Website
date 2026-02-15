import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Landing_Blue_Bg from "../../assets/images/Landing/Landing_blue_bg.svg";
import Landing_White_Bg from "../../assets/images/Landing/Landing_white_bg.svg";
import Landing_cloud from "../../assets/images/Landing/Landing_cloud.svg";
import Landing_road from "../../assets/images/Landing/Landing_road.svg";
import Landing_mountain1 from "../../assets/images/Landing/Landing_mountain1.svg";
import Landing_mountain2 from "../../assets/images/Landing/Landing_mountain2.svg";
import Landing_trees from "../../assets/images/Landing/Landing_trees.svg";
import sun_animation from "../../assets/images/Landing/sun_animation.svg";
import CommonButton from "../common/Button";
import CustomTooltip from "../common/CustomTooltip";
import { useNavigate } from "react-router-dom";

const LandingTopWrapper = styled.div`
  .main-landing {
    max-height: 780px;
    height: 100vh;
  }
  .bg-blue {
    max-height: 780px;
    height: 100vh;
    background-image: url(${Landing_Blue_Bg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: 0px;
    box-shadow: -4px 0px 0px rgba(0, 0, 0, 0.5);
  }
  .bg-white {
    max-height: 780px;
    height: 100vh;
    background-image: url(${Landing_White_Bg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: 82px;
  }
  .title {
    font-family: "Dosis", sans-serif;
    letter-spacing: 0.13em;
    padding: 155px 0 0 100px;
  }
  .road-container {
    bottom: 0px;
    right: 260px;
    z-index: 15;
  }
  .mountains-container1 {
    right: 85px;
    bottom: 359px;
    z-index: 22;
  }
  .mountains-container2 {
    right: 181px;
    bottom: 359px;
  }
  .white-bg {
    background-color: white;
    height: 120px;
    width: 245px;
    right: 259px;
    bottom: 239px;
    z-index: 9;
  }
  .tree-container {
    right: 268px;
    bottom: 249px;
    z-index: 24;
  }
  .button-container {
    bottom: 46px;
    right: 332px;
    z-index: 30;
  }
  .button-container-mobile {
    display: none;
  }
  .sun-animation {
    animation-name: floating-sun;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    right: 231px !important;
    bottom: 359px !important;
  }
  @keyframes floating-sun {
    0% {
      transform: translate(0, 110px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, 110px);
    }
  }
  .cloud-animation {
    animation-name: floating-cloud;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    right: 0px;
    top: 82px;
  }
  @keyframes floating-cloud {
    0% {
      transform: translate(-80px, 0);
    }
    50% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-80px, 0);
    }
  }
  #floating-sun-animation {
    position: absolute;
    right: 231px !important;
    bottom: 250px;
  }
  #floating-cloud-animation {
    right: 0px;
    position: absolute;
    top: 82px;
  }
  @media only screen and (max-width: 870px) {
    .road-container {
      right: 40px;
    }
    #floating-cloud-animation,
    .white-bg,
    #floating-sun-animation,
    .road-container,
    .mountains-container1,
    .mountains-container2,
    .tree-container {
      display: none;
    }
    .bg-white,
    .bg-blue {
      background-image: none;
      min-height: 100%;
      height: 100%;
    }
    .main-landing {
      min-height: 600px;
    }
    .title {
      padding: 250px 0 0 0;
      text-align: center;
    }
    .button-container {
      right: 0;
      bottom: 88px;
      left: 0;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 670px) {
    .title {
      padding: 96px 0 0 0;
      font-size: 18px;
    }
    .bg-white,
    .bg-blue {
      max-height: 100%;
    }
    .button-container {
      display: none;
    }
    .button-container-mobile {
      display: flex;
    }
    .main-landing {
      min-height: 100%;
      max-height: 100%;
      height: 100%;
    }
  }
`;

const LandingTop = () => {
  const [mouseHover, setIsMouseHover] = useState<string | null>(null);
  const [isSunAnimationOn, setIsSunAnimationOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cloud: any = document.getElementById("floating-cloud-animation");
    let sun: any = document.getElementById("floating-sun-animation");
    window.addEventListener("scroll", () => {
      let value = window.scrollY;
      let sunvalue = 252;
      sunvalue = window.scrollY + 250;
      if (cloud && sun) {
        cloud.style.right = value * 1 + "px";
        if (sunvalue <= 345) {
          sun.style.bottom = sunvalue + "px";
        }
      }
    });
  }, []);

  return (
    <LandingTopWrapper>
      <div className="main-landing primary relative">
        <div className="bg-blue">
          <div className="bg-white">
            <div className="title font-40 semi-bold-text white--text">
              CHOOSE YOUR OWN PATH
            </div>
            <div
              id="floating-cloud-animation"
              className={`${isSunAnimationOn ? "cloud-animation" : ""}`}
            >
              <img src={Landing_cloud} alt="clouds" />
            </div>
            <div
              className="road-container absolute"
              onMouseOver={() => setIsSunAnimationOn(true)}
              onMouseLeave={() => setIsSunAnimationOn(false)}
            >
              <img src={Landing_road} alt="road" />
            </div>
            <div className="mountains-container2 absolute">
              <img src={Landing_mountain2} alt="mountain" />
            </div>
            <div className="white-bg absolute" />
            <div
              id="floating-sun-animation"
              className={`${isSunAnimationOn ? "sun-animation" : ""}`}
            >
              <img src={sun_animation} alt="mountain" />
            </div>
            <div className="mountains-container1 absolute">
              <img src={Landing_mountain1} alt="mountain" />
            </div>
            <div
              className="tree-container absolute"
              onMouseOver={() => setIsSunAnimationOn(true)}
              onMouseLeave={() => setIsSunAnimationOn(false)}
            >
              <img src={Landing_trees} alt="mountain" />
            </div>
            <div className="absolute button-container flex gap43">
              <div
                className="relative"
                onMouseEnter={() => setIsMouseHover("SCP")}
                onMouseLeave={() => setIsMouseHover(null)}
              >
                {mouseHover === "SCP" && (
                  <CustomTooltip
                    text="Get a job training inside the college for students with CCP feature"
                    onClick={() => navigate("/CareerPath-scp")}
                  />
                )}
                <CommonButton
                  title="CareerPath College Program(CCP)"
                  classname="font-18 px32 py23 white secondary--text secondary--border border3 br8"
                  onClick={() => navigate("/CareerPath-scp")}
                />
              </div>
              <div
                className="relative"
                onMouseEnter={() => setIsMouseHover("Jobs")}
                onMouseLeave={() => setIsMouseHover(null)}
              >
                {mouseHover === "Jobs" && (
                  <CustomTooltip
                    text="Free Job post and Job search platform for everyone"
                    onClick={() => navigate("/CareerPath-job")}
                  />
                )}
                <CommonButton
                  title="CareerPath Jobs"
                  classname="font-18 px32 py23 white secondary--text secondary--border border3 br8"
                  onClick={() => navigate("/CareerPath-job")}
                />
              </div>
            </div>
            <div className="button-container-mobile gap32 justify-center pt40 pb90">
              <button className="font-14 border-none semi-bold-text py9 px12 white primary--text br8" onClick={() => navigate("/CareerPath-scp")}>
                CareerPath SCP
              </button>
              <button className="font-14 border-none semi-bold-text py9 px12 white primary--text br8" onClick={() => navigate("/CareerPath-job")}>
                CareerPath Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </LandingTopWrapper>
  );
};

export default LandingTop;
