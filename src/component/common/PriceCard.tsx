import React from "react";
import styled from "styled-components";
import check_white from "../../assets/images/pricing/check_white.svg";
import check_blue from "../../assets/images/pricing/check_blue.svg";
import popular_badge from "../../assets/images/pricing/popular_badge.svg";

interface Props {
	price: number;
	planType: string;
	planDescription: Array<string>;
  isPopular?: boolean;
}

const PriceCardWrapper = styled.div`
  .pricing--card {
    min-width: 360px;
    width: 100%;
  }
  .popular-text {
    color: rgba(255, 255, 255, 0.68);
  }
  .popular-badge {
    top: 13px;
    left: 10px;
  }
`;

const PriceCard = ({ isPopular, price, planType, planDescription }: Props) => {
  return (
    <PriceCardWrapper>
      <div
        className={`pricing--card text-center border3 primary--border br8 relative ${
          isPopular ? "primary white--text" : ""
        }`}
      >
        {isPopular && (
          <>
            <img src={popular_badge} alt="" className="popular-badge absolute"/>
            <div className="font-16 semi-bold-text popular-text pt20">POPULAR</div>
          </>
        )}
        <div className="pt48 font-32 semi-bold-text">
          Rs. {price}/<span className="font-24 semi-bold-text">mon</span>
        </div>
        <div className="pt16 font-20 semi-bold-text ">{planType}</div>
        <div className="pt36 pl28">
					{planDescription && planDescription.map((data: string) => (
						<div className="flex items-center gap11 pt20">
							<img src={!isPopular ? check_blue : check_white} alt="" />
							<div className="font-13 self-center ">
								{data}
							</div>
						</div>
					))}
        </div>
        <div>
          <button className="font-16 bold-text primary--text px40 py17 border1 primary--border br8 white my47 cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </PriceCardWrapper>
  );
};

export default PriceCard;
