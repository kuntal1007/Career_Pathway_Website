import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../component/landing/Header";
import LandingTop from "../../component/landing/LandingTop";
import ImageWithTitleDescription from "../../component/landing/ImageWithTitleDescription";
import project_landing from "../../assets/gif/project-landing.gif";
import rotate from "../../assets/gif/rotate-landing.gif";
import Testinomial from "../../component/landing/Testinomial";
import Footer from "../../component/landing/Footer";
// import LoaderAnimation from "../../component/common/LoaderAnimation";

const LandingPageWrapper = styled.div`
  .landing--container {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
  }
  .header--container {
    z-index: 99;
    width: 100%;
  }
  .testinomial--container {
    padding: 0 95px 0 100px;
  }
  @media only screen and (max-width: 980px) {
    .testinomial--container {
      padding: 0 26px;
    }
  }
  @media only screen and (max-width: 580px) {
    .testinomial--container {
      padding: 0 0 0 16px;
      width: 87%;
      margin-right: 0 !important;
    }
    .img-with-description-container {
      margin-top: 40px;
      margin-bottom: 55px;
    }
  }
`;

const Landing = () => {
  const [isload, setIsload] = useState(false);

  function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const is_user_visited = getCookie("isUserVisited") || null;

  function createCookie(name: string, value: boolean, minute: number) {
    let expires = ""
    if (minute) {
      let date = new Date();
      date.setTime(date.getTime()+(minute*60*1000));
      expires = "; expires="+date.toUTCString();
    }
    document.cookie = name+"="+value+expires;
  }

  useEffect(() => {
    if (is_user_visited) {
      setIsload(true);
    } else {
      setTimeout(function () {
        createCookie("isUserVisited", true, 20)
        setIsload(true);
      }, 6000);
    }
  }, []);

  return (
    <LandingPageWrapper>
      {!isload ? (
        <div className={`${isload ? "hidden" : ""}`}>
          {/* <LoaderAnimation /> */}
        </div>
      ) : (
        <div>
          <div className="absolute header--container">
            <Header isLanding />
          </div>
          <LandingTop />
          <div className="landing--container">
            <div className="img-with-description-container">
              <ImageWithTitleDescription
                title="Industrial training inside the college"
                description="We are team CareerPath we want to create a platform to help students who are struggling in this modern world. We believe that students play an important role in the development of a country. Adding industrial training along with their degree will help students to find suitable job for them."
                image={rotate}
                isrotate
              />
            </div>
            <div className="img-with-description-container">
              <ImageWithTitleDescription
                title="Why CareerPath?"
                description="Modern problems require modern solutions. We need a new kind of hiring process which helps students as well as companies. We are in a place where interest and knowledge play a key role to find a job. Everyone wants to follow their passion. We CareerPath can help those who wants to follow their passion."
                image={project_landing}
                isImageRight
              />
            </div>
            <div className="testinomial--container mt-40 mb76">
              <Testinomial />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </LandingPageWrapper>
  );
};

export default Landing;
