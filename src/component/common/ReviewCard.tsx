import React from "react";
import styled from "styled-components";
import profile_img from "../../assets/images/Dashboard/profile_image.svg";
import star_icon from "../../assets/images/Dashboard/star_fill_icon.svg";

interface Props {}

const ReviewCardWrapper = styled.div`
  .reviewcard-container {
    border: 1px solid rgba(40, 104, 197, 0.23);
    min-height: 279px;
		/* max-width: 730px; */
  }
  .profile-image {
    height: 64px;
    width: 64px;
    border-radius: 50%;
  }
`;

const ReviewCard = ({reviewData}: any) => {
  return (
    <ReviewCardWrapper>
      <div className="full-width reviewcard-container br8 fill-height pl16 pt16 pr28">
        <div className="flex justify-between">
          <div className="flex gap6">
            <img src={reviewData?.user?.profile_photo ? reviewData?.user?.profile_photo : profile_img} alt="" className="profile-image" />
            <div className="flex flex-col gap4 self-center pl4">
              <div className="font-16 semi-bold-text">{reviewData?.user?.name}</div>
              <div className="font-12 semi-bold-text darkgray--text">
                {reviewData?.employment_status} <span>•</span> {reviewData?.employment_option} Employee
              </div>
            </div>
          </div>
          <div className="flex gap4 items-center">
            <img src={star_icon} alt="rating" />
            <div className="font-16 semi-bold-text">{reviewData?.rating}</div>
          </div>
        </div>
        <div className="font-16 semi-bold-text pl8 pt48 pb63">
          {reviewData?.feedback}
        </div>
      </div>
    </ReviewCardWrapper>
  );
};

export default ReviewCard;
