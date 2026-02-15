import React from "react";
import styled from "styled-components";
import TestinomialCard from "../common/TestinomialCard";
import Slider from "react-slick";
import { reviewData } from "../../utils/constant_data";

const TestinomialPageWrapper = styled.div`
  @media only screen and (max-width: 980px) {
    .testonimal-title {
      font-size: 30px;
    }
  }
  @media only screen and (max-width: 580px) {
    .testonimal-title {
      font-size: 14px;
    }
    .img-with-description-container {
      margin-top: 40px;
      margin-bottom: 55px;
    }
    .single-card--container {
      margin:auto;
    }
  }
`;

const Testinomial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2.6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <TestinomialPageWrapper>
      <div className="testonimal-title font-40 bold-text mb51">
        What Do Our Students Say?
      </div>
      <div className="relative">
        <Slider {...settings}>
          {reviewData?.map((data: any)=>(
            <TestinomialCard data={data}/>
          ))}
        </Slider>
      </div>
    </TestinomialPageWrapper>
  );
};

export default Testinomial;
