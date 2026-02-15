import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Input from "../../../../component/common/Form/Input";
import DropDown from "../../../../component/common/Form/DropDown";
import TextArea from "../../../../component/common/Form/TextArea";
import RadioButton from "../../../../component/common/Form/RadioButton";
import { skills } from "../../../../utils/constant_data";

interface Props {
  pageNumber: number;
  formData: any;
	setFormData: React.Dispatch<React.SetStateAction<any>>;
  setIsContactModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLocationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpFormPageWrapper = styled.div`
  .duties-area {
    height: 103px;
  }
  .title-mob{
	  display: none;
  }
  @media only screen and (max-width: 780px) {
    .title{
      display: none;
    }
    .title-mob{
      display: flex;
    }
    .main--container{
      margin-top: 40px;
    }
  }
`;

const SignUpForm = ({ pageNumber, formData, setFormData, setIsContactModalOpen, setIsLocationModal }: Props) => {
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [selectedSkillsForMentors, setSelectedSkillsForMentor] = useState([]);
  const [selectedLoaction, setSelectedLocation] = useState("");

  useMemo(() => {
		setFormData({...formData, skill_and_abilities: selectedSkills, skill_needed_for_mentor: selectedSkillsForMentors, location: selectedLoaction})
	}, [selectedSkills, selectedLoaction, selectedSkillsForMentors]);

  return (
    <SignUpFormPageWrapper>
      <div className="mt85 main--container">
        {pageNumber === 1 && (
          <div>
            <h1 className="font-40 bold-text mb64 title"></h1>
					  <div className="font-20 semi-bold-text mb24 title-mob black--text">Create SCP Post</div>
            <Input label="Title" inputType="text" inputClassname="mb32" value={formData.title} onChange={(e:any) => setFormData({...formData, title: e.target.value})}/>
            <TextArea label="Duties & Responsibilities" inputClassname="duties-area mb32" value={formData.duties_and_responsibilities} onChange={(e:any) => setFormData({...formData, duties_and_responsibilities: e.target.value})}/>
            <Input label="Training Duration" inputType="text" inputClassname="mb32" value={formData.duration} onChange={(e:any) => setFormData({...formData, duration: e.target.value})} />
            <DropDown label="Skills & Abilities" options={skills} inputClassname="mb32" value={formData.skill_and_abilities} setFormData={setSelectedSkills}/>
            <RadioButton label="Training mode" value={formData.mode} options={[{label:"Online", val:"online" }, {label:"Offline", val:"offline"}]} RadioButtonClassname="gap36" onChange={(event: any) => setFormData({...formData, mode : event.target.value})}/>
          </div>
        )}
        {pageNumber === 2 && (
          <div>
            <h1 className="font-40 bold-text mb54 title">Create SCP Post</h1>
					  <div className="font-20 semi-bold-text mb24 title-mob black--text">Create SCP Post</div>
            <Input label="Training Location" inputClassname="mb32" isDisabled={formData.mode === "online"} onClick={() => setIsLocationModal(true)}/>
            <RadioButton label="Need a mentor to train students" value={formData.need_mentor} options={[{label:"Yes", val:"yes" }, {label:"No", val:"no"}]} RadioButtonClassname="gap58 mb32" onChange={(event: any) => setFormData({...formData, need_mentor : event.target.value})}/>
            <DropDown label="Skills needed for the mentor" options={skills} inputClassname="mb32" isDisabled={formData.need_mentor === "no"} value={formData.skill_needed_for_mentor} setFormData={setSelectedSkillsForMentor}/>
            <TextArea label="About Us" inputClassname="duties-area mb32" value={formData.about_us} onChange={(e:any) => setFormData({...formData, about_us: e.target.value})}/>
            <Input label="Contact Us" inputType="text" inputClassname="mb32" onClick={() => setIsContactModalOpen(true)}/>
            <Input label="FAQs" inputType="text" inputClassname="mb32" value={formData.faqs} onChange={(e:any) => setFormData({...formData, faqs: e.target.value})} />
          </div>
        )}
      </div>
    </SignUpFormPageWrapper>
  );
};

export default SignUpForm;
