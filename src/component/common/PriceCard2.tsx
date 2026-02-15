import React from "react";
import styled from "styled-components";
import popular_badge from "../../assets/images/pricing/popular_badge.svg";
import stairs_img from "../../assets/gif/stairs_pricing.gif";

interface Props {
  price: number;
  planType: string;
  planDescription: Array<string>;
  onClick?: any;
  isLoader?: boolean
}

const PriceCard2Wrapper = styled.div`
  .pricing--card {
    max-width: 822px;
    width: 100%;
    margin: 0 auto;
  }
  .popular-text {
    color: rgba(255, 255, 255, 0.68);
  }
  
  .ribbon{
    width: 147px;
    height: 141px;
    position: absolute;
    top: -10px;
    left: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .ribbon:before{
    content: 'Early Access';
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    font-weight: 600;
    position: absolute;
    width: 150%;
    height: 26px;
    transform: rotate(320deg) translateY(-23px);
    background: #FFC727;
  }
  .ribbon:after{
    z-index: -1;
    content: '';
    position: absolute;
    width: 150%;
    height: 30px;
    transform: rotate(225deg) translateY(15px);
  }
  @media only screen and (max-width: 654px) {
    .card-content{
      flex-direction: column-reverse;
    }
    .pricing--card {
      max-width: calc(100vw - 32px);
      padding: 15px 16px;
    }
    .image-badge{
      height: 21px;
      width: 21px;
    }
    .gap16{
      gap: 8px;
    }
    .img-center{
      height: 145px;
      width: 116px;
    }
    .popular-text{
      font-size: 12px;
    }
    .price-text{
      font-size: 24px;
      padding-top: 15px;
      font-weight: 600;
      text-align: center;
    }
    .plan-text{
      font-size: 16px;
      font-weight: 500;
      text-align: center;
    }
    .plan-description li{
      font-size: 12px;
    }
    .get-started-btn{
      font-size: 16px;
      padding: 13px 38px;
      margin-bottom: 18px; 
    }
  }
`;

const PriceCard2 = ({ price, planType, planDescription, onClick, isLoader }: Props) => {
  return (
    <PriceCard2Wrapper>
      <div className="pricing--card relative pt21 px40 pb48 border3 primary--border br8 primary white--text">
        <div className="ribbon"></div>
        <div className="flex justify-center gap16 pb47">
          <img src={popular_badge} alt="popular" className="image-badge"/>
          <div className="font-16 semi-bold-text popular-text self-center">
            POPULAR
          </div>
        </div>
        <div className="flex justify-between card-content">
          <div>
            <div className="font-40 semi-bold-text text-left price-text">
              Rs. {price} {" "} <s className="font-24 regular-text">7000</s>
              {/* /<span className="font-25 semi-bold-text">mon</span> */}
            </div>
            <div className="pt8 font-20 semi-bold-text plan-text text-left">
              {planType}
            </div>
            <ul className="plan-description ml0 pl20 pt38">
              {planDescription &&
                planDescription.map((data: string) => (
                  <li className="font-14 text-left py12">{data}</li>
                ))}
            </ul>
          </div>
          <div className="self-center"><img src={stairs_img} alt="stairs" className="img-center"/></div>
        </div>
        <button className="font-16 get-started-btn bold-text primary--text px40 py17 border1 primary--border br8 white mt45 cursor-pointer" onClick={onClick}>
          {isLoader ? "Processing..." : "Get Started"}
        </button>
      </div>
    </PriceCard2Wrapper>
  );
};

export default PriceCard2;
