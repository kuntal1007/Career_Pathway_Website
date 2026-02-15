import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Input from "../../../../component/common/Form/Input";
import DropDown from "../../../../component/common/Form/DropDown";
import TextArea from "../../../../component/common/Form/TextArea";
import RadioButton from "../../../../component/common/Form/RadioButton";
import { skills, experience } from "../../../../utils/constant_data";

interface Props {
  pageNumber: number;
  formData: any;
	setFormData: React.Dispatch<React.SetStateAction<any>>;
	setIsContactModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

const SignUpForm = ({ pageNumber, formData, setFormData, setIsContactModalOpen }: Props) => {
  const [selectedExpirence, setSelectedExpirence] = useState("");
	const [selectedJobMode, setSelectedJobMode] = useState("");
	const [selectedSkills, setSelectedSkills] = useState([]);
  useMemo(() => {
		setFormData({...formData, skill_and_abilities: selectedSkills, mode: selectedJobMode, experince: selectedExpirence})
	}, [selectedSkills, selectedJobMode, selectedExpirence]);

  return (
    <SignUpFormPageWrapper>
      <div className="mt85 main--container">
        {pageNumber === 1 && (
          <div>
            <h1 className="font-40 bold-text mb64 title">Create Job Post</h1>
					  <div className="font-20 semi-bold-text mb24 title-mob black--text">Create Job Post</div>
            <Input label="Job Title" inputType="text" inputClassname="mb32" value={formData.title} onChange={(e:any) => setFormData({...formData, title: e.target.value})}/>
            <TextArea label="Job Duties & Responsibilities" inputClassname="duties-area mb32" value={formData.duties_and_responsibilities} onChange={(e:any) => setFormData({...formData, duties_and_responsibilities: e.target.value})}/>
            <DropDown label="Experience" options={experience} inputClassname="mb32" isOneSelect value={formData.experince}  setFormData={setSelectedExpirence}/>
            <DropDown label="Job mode" options={["remote", "hybrid", "onsite"]} inputClassname="mb32" isOneSelect value={formData.mode}  setFormData={setSelectedJobMode}/>
            <RadioButton label="Job Type" options={[{label:"Full Time", val:"full_time" }, {label:"Part Time", val:"part_time"}]} RadioButtonClassname="gap21" value={formData.type} onChange={(event: any) => setFormData({...formData, type : event.target.value})}/>
          </div>
        )}
        {pageNumber === 2 && (
          <div>
            <h1 className="font-40 bold-text mb54 title">Create Job Post</h1>
					  <div className="font-20 semi-bold-text mb24 title-mob black--text">Create Job Post</div>
            {/* <Input label="Duration" inputType="text" isDisabled={formData.type === "full_time"} inputClassname="mb32"  value={formData.duration} onChange={(e:any) => setFormData({...formData, duration: e.target.value})}/> */}
            <Input label="Vacancy" inputType="number" inputClassname="mb32" value={formData.vacancy} onChange={(e:any) => setFormData({...formData, vacancy: e.target.value})}/>
            <DropDown label="Skills & Abilities" options={skills} inputClassname="mb32" value={formData.skill_and_abilities} setFormData={setSelectedSkills}/>
            <TextArea label="About Us" labelrighttext="(If needed)" inputClassname="duties-area mb32" value={formData.about_us} onChange={(e:any) => setFormData({...formData, about_us: e.target.value})}/>
            <Input label="Contact Us" inputType="text" inputClassname="mb32" onClick={() => setIsContactModalOpen(true)}/>
            <Input label="FAQs" labelrighttext="(If needed)" inputType="text" inputClassname="mb32" value={formData.faqs} onChange={(e:any) => setFormData({...formData, faqs: e.target.value})}/>
          </div>
        )}
      </div>
    </SignUpFormPageWrapper>
  );
};

export default SignUpForm;
