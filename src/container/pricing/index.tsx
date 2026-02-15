import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../component/landing/Header";
import PriceCard2 from "../../component/common/PriceCard2";
import {
  useCheckPaymentStatusMutation,
  useCreatePaymentMutation,
} from "../../redux/services/payment";
import { useSelector } from "react-redux";

const PricingPageWrapper = styled.div`
  .pricing-main--container {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding-top: 164px;
  }
  .cards--container {
    padding-bottom: 76px;
    max-width: 1175px;
    margin: 0 auto;
    align-items: flex-end;
  }
  .stairs_img {
    right: 118px;
    top: -80px;
  }
  @media only screen and (max-width: 654px) {
    .pricing-main--container {
      padding-top: 75px;
    }
    .title {
      font-size: 20px;
      padding-bottom: 16px;
    }
    .desc {
      font-size: 14px;
    }
    .pb80 {
      padding-bottom: 40px;
    }
  }
`;

const Pricing = () => {
  const [isLoader, setIsLoader] = useState(false);
  const userDetail = useSelector((state: any) =>
    state?.auth?.user ? state?.auth?.user : state.auth?.company
  );

  const key = "6452e350-805d-4519-93d8-0bbf04023792";
  const amount = "5000";

  async function getUserFlowId() {
    setIsLoader(true);
    const id = Math.floor(Math.random() * 100000);
    let requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" },
      body: JSON.stringify({
        userId: userDetail?._id,
        key: key,
        client_txn_id: String(id),
        amount: amount,
        p_info: "Career plan",
        customer_name: userDetail?.name,
        customer_email: userDetail?.email,
        customer_mobile: userDetail?.phone,
        redirect_url: "https://sckilled-frontend.vercel.app/",
        udf1: "user defined field 1",
        udf2: "user defined field 2",
        udf3: "user defined field 3"
      })
    }
      fetch(`${process.env.REACT_APP_APIBASE}/api/payment/create`, requestOptions)
    .then(response => response.text())
    .then((result) => {
      setIsLoader(false);
      let finalData = JSON.parse(result);
      window.open(finalData?.data?.data?.payment_url);
    })
    .catch(error => console.log('error', error));
  }

  const handlePaymentRequest = async () => {
    await getUserFlowId();
  };

  return (
    <PricingPageWrapper>
      <div>
        <div className="absolute full-width z-99">
          <Header />
        </div>
        <div className="pricing-main--container pb98 text-center">
          <div className="pb80">
            <div className="font-48 semi-bold-text pb8 title">
              Pricing Plans
            </div>
            <div className="font-24 desc">
              Simple, transparent pricing that grows with you.
            </div>
          </div>
          <div>
            <PriceCard2
              price={5000}
              planType="Career plan"
              planDescription={[
                "Get job trainings directly from companies",
                "Apply unlimited jobs",
                "Career Path placement support",
                "No need to pay anything to companies for training",
                "No need to any extra mentor fee’s for training",
              ]}
              isLoader={isLoader}
              onClick={() => handlePaymentRequest()}
            />
            {/* <div className="cards--container flex gap30 justify-between">
              <PriceCard
                price={700}
                planType="Mentor plan"
                planDescription={[
                  "Find great candidates, faster",
                  "Contact top talent directly",
                  "Build relationships with prospective hires",
                ]}
              />
              <PriceCard
                isPopular
                price={500}
                planType="Career plan"
                planDescription={[
                  "Stand out and get in touch with hiring manager",
                  "See how you compare to other applicants",
                  "Learn new skills to advance your career",
                ]}
              />
              <PriceCard
                price={750}
                planType="Recruiter plan"
                planDescription={[
                  "Find great candidates, faster",
                  "Contact top talent directly",
                  "Build relationships with prospective hires",
                ]}
              />
            </div> */}
          </div>
        </div>
      </div>
    </PricingPageWrapper>
  );
};

export default Pricing;
