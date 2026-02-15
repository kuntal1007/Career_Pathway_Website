import React from "react";
import styled from "styled-components";
import close_icon from "../../assets/images/Dashboard/close_icon.svg";
import Input from "./Form/Input";
import TextArea from "./Form/TextArea";
import CommonButton from "./Button";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	formData: any;
	setFormData: any;
}

const ContactModalWrapper = styled.div`
  .contact-modal-wrapper {
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.75);
    z-index: 9999;
    position: fixed;
	top: 0;
  }
  .contact-modal-container {
    max-width: 478px;
    width: 100%;
    padding: 40px 32px 32px 32px;
  }
	.close_icon{
		right: 41px;
		top: 32px;
	}
`;

const ContactPageModal = ({
  isModalOpen,
  setIsModalOpen,
	formData,
	setFormData
}: Props) => {
  return (
    <ContactModalWrapper>
      <div className="contact-modal-wrapper flex justify-center items-center">
        <div className="white br16 contact-modal-container relative">
          <div className="close_icon absolute cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}><img src={close_icon} alt="close" /></div>
          <div className="font-24 semi-bold-text pb37">Contact Us</div>
          <TextArea label="Address" inputClassname="mb16" onChange={(e:any) => setFormData({...formData, address: e.target.value})}/>
          <Input label="Phone Number" limit={10} inputClassname="mb16" onChange={(e:any) => setFormData({...formData, phone: e.target.value})}/>
          <Input label="Email Address" inputClassname="mb40" onChange={(e:any) => setFormData({...formData, email: e.target.value})}/>
          <div className="text-center">
            <CommonButton title="Save" classname="font-20 bold-text white--text primary px60 py14 br8 border-none" onClick={() => setIsModalOpen(false)}/>
          </div>
        </div>
      </div>
    </ContactModalWrapper>
  );
};

export default ContactPageModal;
