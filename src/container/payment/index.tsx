import React from "react";
import styled from "styled-components";
import Header from "../../component/landing/Header";
import mastercard from "../../assets/images/Payment/mastercard.svg";
import CommonButton from "../../component/common/Button";

const PaymentPageWrapper = styled.div`
  .payment--container {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 110px 90px;
  }
  .one--section {
    width: 764px;
    max-width: 100%;
  }
  .border--static {
    border: 1px solid rgba(125, 124, 124, 0.4);
  }
  .border-top--static {
    border-top: 1px solid rgba(125, 124, 124, 0.4);
  }
  .border-left--static {
    border-left: 1px solid rgba(125, 124, 124, 0.4) !important;
  }
  .border-bottom--static {
    border-bottom: 1px solid rgba(125, 124, 124, 1) !important;
  }
  .radio--btn {
    height: 24px;
    width: 24px;
  }
  .checkout--container {
    background: rgba(40, 104, 197, 0.08);
    width: 421px;
    height: 408px;
  }
`;

const Payment = () => {
  return (
    <PaymentPageWrapper>
      <div>
        <Header />
      </div>
      <div className="payment--container">
        <div className="font-32 bold-text pb40">Checkout</div>
        <div className="flex justify-between gap65">
          <div>
            <div>
              <div className="font-24 semi-bold-text pb24">Billing address</div>
              <div className="pt21 pb14 px16 one--section border--static">
                <div className="flex gap16">
                  <input type="radio" className="radio--btn" />
                  <label className="font-16 semi-bold-text">
                    Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
                    Bangalore-560016
                  </label>
                </div>
                <div className="pt17 flex gap18 items-center">
                  <div className="font-28 darkgray--text pl4">+</div>
                  <div className="font-16 semi-bold-text primary--text">
                    Add a new address
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-24 semi-bold-text pt40 pb24">
                Payment Method
              </div>
              <div className="border--static one--section">
                <div className="flex justify-between items-center px16 py12">
                  <div className="flex gap16">
                    <input type="radio" className="radio--btn" />
                    <label className="font-16 semi-bold-text pt2">
                      Credit/Debit Card
                    </label>
                  </div>
                  <div>
                    <img src={mastercard} alt="mastercard" />
                  </div>
                </div>
                <div className="flex justify-between items-center px16 py12 border-top--static">
                  <div className="flex gap16">
                    <input type="radio" className="radio--btn" />
                    <label className="font-16 semi-bold-text pt2">UPI</label>
                  </div>
                  <div>
                    <img src={mastercard} alt="mastercard" />
                  </div>
                </div>
                <div className="flex justify-between items-center px16 py12 border-top--static">
                  <div className="flex gap16">
                    <input type="radio" className="radio--btn" />
                    <label className="font-16 semi-bold-text pt2">
                      Amazon Pay
                    </label>
                  </div>
                  <div>
                    <img src={mastercard} alt="mastercard" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-24 semi-bold-text pt40 pb24">
                Offers & Benefits
              </div>
              <div className="border--static flex one--section justify-between">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="font-16 semi-bold-text darkgray--text py22 px16 border-none"
                />
                <button className="font-18 semi-bold-text white border-left--static border-none primary--text px30">
                  Apply
                </button>
              </div>
            </div>
            <div>
              <div className="font-24 semi-bold-text pt40 pb24">
                Order Details
              </div>
              <div className="flex justify-between">
                <div className="font-16 semi-bold-text">Career plan</div>
                <div className="font-16 semi-bold-text">Rs. 500</div>
              </div>
            </div>
          </div>
          <div className="checkout--container pt32 px25">
            <div className="font-24 semi-bold-text pb29 pl5 pr15">Summary</div>
            <div className="flex justify-between pb32 pl5 pr15">
              <div className="font-16 semi-bold-text">Original Price:</div>
              <div className="font-16 semi-bold-text">Rs. 500</div>
            </div>
            <div className="flex justify-between pb32 pl5 pr15 border-bottom--static">
              <div className="font-16 semi-bold-text">Discounts:</div>
              <div className="font-16 semi-bold-text">Rs. 0</div>
            </div>
            <div className="flex justify-between pt32 pb48 pl5 pr15">
              <div className="font-20 bold-text">Total</div>
              <div className="font-20 bold-text">Rs. 500</div>
            </div>
            <CommonButton
              classname="primary white--text font-16 bold-text py17 border-none br8 full-width"
              title="Complete Checkout"
            />
          </div>
        </div>
      </div>
    </PaymentPageWrapper>
  );
};

export default Payment;
