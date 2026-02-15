import React, { useState } from "react";
import styled from "styled-components";
import search_icon from "../../../assets/images/SCP/search_icon.svg";
import dropdown_icon from "../../../assets/images/Form/dropdown_icon.svg";
import sort_by from "../../../assets/images/Dashboard/sort_by.svg";
import ReviewCard from "../../common/ReviewCard";
import { useGetReviewByCompnayIdQuery } from "../../../redux/services/review";
import { useSelector } from "react-redux";

interface Props {}

const ReviewWrapper = styled.div`
  .review--container {
    max-width: 779px;
    margin: 0 auto;
  }
  .search_bar{
    max-width: 634px;
  }
  .search-bar-style {
    background: #F2F2F2;
    letter-spacing: -0.408px;
    color: rgba(60, 60, 67, 0.6);
  }
  .search-bar-style:focus-visible {
    outline: none;
  }
  .search-bar-style::placeholder {
    color: rgba(60, 60, 67, 0.6);
    font-size: 17px;
  }
  .search-icon {
    top: 7px;
    left: 7px;
  }
  .sort-by-mobile {
    display: none;
  }
  .rotate{
    transform: rotate(180deg)
  }
  @media only screen and (max-width: 820px) {
    .review--container {
      padding: 26px 10px;
    }
    .sort-by-deskop {
      display: none;
    }
    .sort-by-mobile {
      display: block;
    }
    .search-filter-sec {
      gap: 10px;
      padding: 0 20px;
    }
  }
`;

const Review = ({}: Props) => {
  const [filter, setFilter] = useState<string | number>("");
  const [sort, setSort] = useState("");
  const company_id = useSelector((state: any) => state?.auth?.company?._id);
  const {data: reviewData} = useGetReviewByCompnayIdQuery({id: company_id, filter, sort});

  return (
    <ReviewWrapper>
      <div className="review--container pt43 full-width">
        <div className="flex gap43 justify-between full-width search-filter-sec">
          <div className="search_bar relative full-width">
            <img src={search_icon} alt="" className="absolute search-icon" />
            <input
              type="search"
              placeholder="Search"
              className="search-bar-style br10 py10 pl36 pr8 font-17 border-none full-width"
              onChange={(e: any) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex gap20 items-center sort-by-deskop cursor-pointer" onClick={() => {sort === "top" ? setSort("down") : setSort("top")}}>
            <div className="font-16 semi-bold-text">Sort By</div>
            <img src={dropdown_icon} alt="sort" className={`${sort === "top" ? "rotate" : ""}`}/>
          </div>
          <div className="flex gap20 items-center sort-by-mobile self-center" onClick={() => {sort === "top" ? setSort("down") : setSort("top")}}>
            <img src={sort_by} alt="sort" />
          </div>
        </div>
        <div className="py21 flex flex-col gap20">
          {reviewData && reviewData?.data?.map((data:any) =>(
            <ReviewCard reviewData={data}/>
          ))}
        </div>
      </div>
    </ReviewWrapper>
  );
};

export default Review;
