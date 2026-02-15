import React, { useState } from "react";
import styled from "styled-components";
import landing_human from "../../assets/images/Landing/landing_human.svg"

interface Props {
  title: string;
  description: string;
  image: string;
	isImageRight? :boolean;
  isrotate? : boolean;
}

const LandingImageWithTitleDescriptionWrapper = styled.div`
  .main--container {
    padding: 0 115px 0 67px;
  }
	.title-description-container,
	.image-container{
		width: 50%;
	}
  .human-logo{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  @media only screen and (max-width: 980px) {
    .main--container {
      padding: 0 16px 0 16px;
    }
    .title--section {
      padding-left: 10px;
      font-size: 30px;
      margin-bottom: 20px;
    } 
    .descrption--section {
      padding-left: 10px;
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 580px) {
    .main--container {
      flex-direction: column;
    }
    .title-description-container{
      width: 100%;
    }
    .image-container{
      width: 170px;
    }
    .title--section {
      font-size: 14px !important;
      padding: 7px 0 0 0px;
      margin-bottom: 8px;
    } 
    .descrption--section {
      font-size: 10px !important;
      padding: 0;
    }
    .human-logo{
      height: 88px;
      width: 87px;
    }
  }
`;

const ImageWithTitleDescription = ({ title, description, image, isImageRight, isrotate }: Props) => {
  return (
    <LandingImageWithTitleDescriptionWrapper>
      <div className={`main--container flex items-center ${isImageRight ? "flex-row-reverse" : ""}`}>
        <div className="image-container text-center relative">
          {isrotate &&
            <img src={landing_human} alt="logo" className="absolute human-logo"/>
          }
          <img src={image} alt="logo" className="full-width"/>
        </div>
        <div className="title-description-container">
          <div className="title--section font-40 bold-text mb34 pl40">{title}</div>
          <div className="descrption--section font-18 semi-bold-text pl40 pr25">{description}</div>
        </div>
      </div>
    </LandingImageWithTitleDescriptionWrapper>
  );
};

export default ImageWithTitleDescription;
