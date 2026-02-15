import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Input from "../../common/Form/Input";
import star_icon from "../../../assets/images/Dashboard/star_icon.svg";
import star_fill_icon from "../../../assets/images/Dashboard/star_fill_icon.svg";
import TextArea from "../../common/Form/TextArea";
import { useCreateReviewMutation } from "../../../redux/services/review";
import { useSelector } from "react-redux";
import DropDown from "../../common/Form/DropDown";
import { message } from "antd";
import { useGetApplyJobDetailsQuery } from "../../../redux/services/dashboard";

interface Props {}

const ReviewWrapper = styled.div`
  .review--container {
    padding: 64px 0 32px 0;
    max-width: 370px;
    margin: 0 auto;
  }
  .rating-icon {
    height: 32px;
    width: 32px;
  }
  .radiobox-style {
    height: 24px;
    width: 24px;
  }
  .feedback-area {
    height: 172px;
  }
  .submit-btn:hover {
    background-color: rgba(40, 104, 197, 0.9);
    transition: ease-in 0.2s;
  }
  @media only screen and (max-width: 980px) {
    .review--container {
      padding: 64px 10px 32px 10px;
    }
    .font-18{
      font-size: 16px;
    }
  }
`;

const Review = ({}: Props) => {
  const { data: appliedJobDetails } = useGetApplyJobDetailsQuery("");
  const [messageApi, contextHolder] = message.useMessage();
  const userId = useSelector((state: any) => state?.auth?.user?._id);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [postReview] = useCreateReviewMutation();

  const jobsDropdown =
    appliedJobDetails &&
    appliedJobDetails?.data.map((data: any) => data?.job?.company?.name);

  const selectedJobId = useMemo(() => {
    if (appliedJobDetails && appliedJobDetails?.data?.length) {
      let companydata = appliedJobDetails.data.find(
        (a: any) => a.job?.company?.name === selectedCompany
      );
      setCompanyName(companydata?.job?.company?.name)
      return companydata?.job?.company?._id;
    }
    return [];
  }, [selectedCompany]);

  const [formData, setFormData] = useState({
    user: userId,
    company: selectedJobId,
    rating: ratingCount || "",
    employment_option: "",
    employment_status: "",
    feedback: "",
  });

  useMemo(() => {
    setFormData({ ...formData, rating: ratingCount, company: selectedJobId });
  }, [ratingCount, selectedCompany]);

  const handleSubmit = async () => {
    const submitReview: any = await postReview(formData);
    if (submitReview?.data?.code === 200) {
      messageApi.open({
        type: "success",
        content: "Thank you, your feedback has been submitted successfully",
      });
    } else {
      messageApi.open({
        type: "error",
        content: submitReview?.error?.data?.message,
      });
    }
  };

  return (
    <ReviewWrapper>
      {contextHolder}
      <div>
        <div className="review--container full-width">
          <DropDown
            label="Company"
            inputClassname="mb40"
            options={jobsDropdown}
            value={companyName}
            isOneSelect
            setFormData={setSelectedCompany}
          />
          <div>
            <div className="font-18 normal-text pb16">Overall Rating</div>
            <div className="flex gap30 mb40">
              {[...Array(5)].map((_, index) => {
                const givenRating = index + 1;
                return (
                  <label>
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      value={givenRating}
                      onClick={() => {
                        setRatingCount(givenRating);
                      }}
                    />
                    <img
                      src={
                        givenRating < ratingCount || givenRating === ratingCount
                          ? star_fill_icon
                          : star_icon
                      }
                      alt=""
                      className="cursor-pointer rating-icon"
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <div className="font-18 normal-text pb16">Select an option</div>
            <div
              className="flex justify-between mb40"
              onChange={(event: any) =>
                setFormData({
                  ...formData,
                  employment_option: event.target.value,
                })
              }
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  value="current"
                  name="option"
                  className="radiobox-style cursor-pointer br4"
                />
                <span className="font-14 normal-text pl4 pt4 self-center">
                  Current Employee
                </span>
              </div>
              <div className="flex mr20 items-center">
                <input
                  type="radio"
                  value="former"
                  name="option"
                  className="radiobox-style cursor-pointer br4"
                />
                <span className="font-14 normal-text pl4 pt4 self-center">
                  Former Employee
                </span>
              </div>
            </div>
          </div>
          <Input
            label="Employment Status"
            inputClassname="mb40"
            value={formData.employment_status}
            onChange={(e) =>
              setFormData({ ...formData, employment_status: e.target.value })
            }
          />
          <TextArea
            label="Feedback"
            inputClassname="feedback-area"
            value={formData.feedback}
            onChange={(e: any) =>
              setFormData({ ...formData, feedback: e.target.value })
            }
          />
          <div className="mt63 mb32 flex justify-center">
            <button
              className="submit-btn font-16 semi-bold-text py17 px56 primary white--text br8 border-none cursor-pointer"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </ReviewWrapper>
  );
};

export default Review;
