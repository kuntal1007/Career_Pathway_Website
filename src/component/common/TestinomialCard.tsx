import React, { useState } from "react";
import styled from "styled-components";
import BlueDesign from "../../assets/images/Landing/TestonomialBottom.svg";
import BlueDesignMobile from "../../assets/images/Landing/TestonomialBottomMobile.svg";
import TestonomialUser from "../../assets/images/Landing/profile.png";

const TestinomialCardWrapper = styled.div`
  .single-card--container {
    height: 332px;
    width: 370px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .review {
    max-height: 201px;
    padding: 47px 53px 0 53px;
    font-family: "Source Sans Pro", sans-serif;
    color: #37474f;
    margin-top: 10px;
    letter-spacing: -0.06em;
    overflow: auto;
  }
  .review::-webkit-scrollbar {
    width: 8px;
  }
  .review::-webkit-scrollbar-thumb {
    background-color: #376fc2;
    border-radius: 10px;
    outline: 1px solid slategrey;
  }
  .quote-img {
    font-family: "Source Sans Pro", sans-serif;
    color: #2b6ac6;
    line-height: 175.4%;
    top: 8px;
    left: 18px;
  }
  .bottom-blue-design {
    bottom: -6px;
  }
  .reviewer-image {
    bottom: 80px;
    left: 157px;
    text-align: center;
  }
  .reviewer-image img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 3px solid #ffffff;
  }
	.reviewer-name {
    font-family: "Source Sans Pro", sans-serif;
		bottom: 48px !important;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
		z-index: 101;
	}
  .reviewer-position{
    top: 287px;
    text-align-last: center;
  }
  .bottom-blue-design-mobile{
    display: none;
  }
  @media only screen and (max-width: 580px) {
    .single-card--container {
    height: 186px;
    width: 168px;
  }
  .review {
    padding: 28px 7px 33px 7px;
    font-size: 10px;
    width: 158px;
    max-height: 111px;
  }
  .review::-webkit-scrollbar {
    width: 4px;
  }
  .reviewer-image {
    bottom: 42px;
    left: 70px;
    text-align: center;
  }
  .reviewer-image img {
    width: 27px;
    height: 27px;
    border: 1px solid #ffffff;
  }
	.reviewer-name {
    bottom: 20px !important;
    font-size: 10px;
    left: 0;
	}
	.reviewer-position {
    top: 166px !important;
    font-size: 8px;
    left: 0;
	}
  .bottom-blue-design{
    display: none;
  }
  .bottom-blue-design-mobile{
    display: block;
    bottom: 0px;
  }
  .quote-img {
    font-size: 16px;
    top: 8px;
    left: 8px;
  }
}
`;

const TestinomialCard = ( data: any ) => {
  return (
    <TestinomialCardWrapper>
      <div className="single-card--container relative white mr30">
        <div className="quote-img absolute font-40 bold-text">“</div>
        <div className="review font-18 text-center">
          {data?.data?.review}
        </div>
        <div className="absolute reviewer-image z-99">
          <img src={TestonomialUser} alt="" />
        </div>
				<div className="absolute font-18 semi-bold-text white--text reviewer-name reviewer-image">{data?.data?.name}</div>
				<div className="absolute font-13 white--text reviewer-name reviewer-position">{data?.data?.position}</div>
        <div className="absolute bottom-blue-design">
          <img src={BlueDesign} alt="" />
        </div>
        <div className="absolute bottom-blue-design-mobile">
          <img src={BlueDesignMobile} alt="" />
        </div>
      </div>
    </TestinomialCardWrapper>
  );
};

export default TestinomialCard;
