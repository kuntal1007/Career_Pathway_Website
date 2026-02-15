import React, { useState, useMemo } from "react";
import styled from "styled-components";
import close_icon from "../../assets/images/Dashboard/close_icon.svg";
import Input from "./Form/Input";
import TextArea from "./Form/TextArea";
import CommonButton from "./Button";
import DropDown from "./Form/DropDown";
import RadioButton from "./Form/RadioButton";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	formData: any;
	setFormData: any;
}

const LocationModalWrapper = styled.div`
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

const LoactionPageModal = ({
  isModalOpen,
  setIsModalOpen,
	formData,
	setFormData
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  useMemo(() => {
		setFormData({...formData, category: selectedCategory});
	}, [selectedCategory]);
  return (
    <LocationModalWrapper>
      <div className="contact-modal-wrapper flex justify-center items-center">
        <div className="white br16 contact-modal-container relative">
          <div className="close_icon absolute cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}><img src={close_icon} alt="close" /></div>
          <div className="font-24 semi-bold-text pb37">Training Location</div>
          <DropDown label="Select Category" isOneSelect options={["college", "industry", "training center", "office", "other"]} inputClassname="mb32 mr0" value={formData.category} setFormData={setSelectedCategory}/>
          <Input label="Name Of The Training Center:" inputClassname="mb16" onChange={(e:any) => setFormData({...formData, training_center_name: e.target.value})}/>
          <TextArea label="About training center" inputClassname="mb16" onChange={(e:any) => setFormData({...formData, training_center_about: e.target.value})}/>
          <Input label="Infrastructure available" inputClassname="mb16" onChange={(e:any) => setFormData({...formData, infrastructure: e.target.value})}/>
          <Input label="Contact Details" inputClassname="mb16" onChange={(e:any) => setFormData({...formData, contact: e.target.value})}/>
          <div className="text-center">
            <CommonButton title="Save" classname="font-20 bold-text white--text primary px60 py14 br8 border-none" onClick={() => setIsModalOpen(false)}/>
          </div>
        </div>
      </div>
    </LocationModalWrapper>
  );
};

export default LoactionPageModal;
