import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Input from "../../../component/common/Form/Input";
import password_icon from "../../../assets/images/Form/password_eye_icon.svg";
import cancel_icon from "../../../assets/images/Dashboard/cancel_icon.svg";
import FileUpload from "../../../component/common/Form/FileUpload";
import DropDown from "../../../component/common/Form/DropDown";
import { uploadImage } from "../../../utils/imageupload";
import { message } from "antd";
import { services } from "../../../utils/constant_data";

interface Props {
	pageNumber: number;
	formData: any;
	setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SignUpFormPageWrapper = styled.div`
  .radiobox-style {
    margin: 1px 0 0 0;
    height: 20px;
    width: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .profile-img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
	object-fit: cover;
  }
  .profile-visible-sec {
    border: 1px solid #b6b6b6;
    padding: 6px;
    border-radius: 8%;
	width: fit-content;
  }
  .cancel-icon{
	height: 21px;
    right: -10px;
    top: -10px;
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
    .mt85{
      margin-top: 25px;
    }
  }
`;

const SignUpForm = ({pageNumber, formData, setFormData}: Props) => {
	const [messageApi, contextHolder] = message.useMessage();
  	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [selectedServices, setSelectedServices] = useState([]);
	const [selectedProfileImg, setSelectedProfileImg] = useState(null);
	const [isLoader, setIsLoader] = useState(false);

	useMemo(() => setFormData({...formData, services: selectedServices}), [selectedServices])

	useMemo(async() => {
		if(selectedProfileImg !== null){
			setIsLoader(true);
			const profilePic = await uploadImage(selectedProfileImg);
			messageApi.open({
				type: 'success',
				content: 'Company logo has been successfully uploaded',
			});
			setIsLoader(false);
			setFormData({ ...formData, profile_photo: profilePic })
		}
	}, [selectedProfileImg])
  
  return (
    <SignUpFormPageWrapper>
		{contextHolder}
			<div className="mt85">
				{pageNumber === 1 &&
					<div>
						<h1 className="font-40 bold-text mb54 title">Welcome to CareerPath</h1>
						<div className="font-20 semi-bold-text mb24 title-mob black--text">sign-up</div>
						<Input label="Comapany Name" inputType="text" inputClassname="mb24" value={formData.name}  onChange={(e) => setFormData({...formData, name: e.target.value})}/>
						<Input label="Tagline" inputType="text" inputClassname="mb24" value={formData.tagline}  onChange={(e) => setFormData({...formData, tagline: e.target.value})}/>
						<Input label="About Company" inputType="text" inputClassname="mb24" value={formData.about}  onChange={(e) => setFormData({...formData, about: e.target.value})}/>
						<Input label="Founded Year" inputType="text" inputClassname="mb24" value={formData.founded_year}  onChange={(e) => setFormData({...formData, founded_year: e.target.value})}/>
						<Input label="Company Site Link" inputType="text" inputClassname="mb24" value={formData.site_link}  onChange={(e) => setFormData({...formData, site_link: e.target.value})}/>
						<DropDown label="Services" inputClassname="mb24" options={services} value={formData.services} setFormData={setSelectedServices}/>
					</div>
				}
				{pageNumber === 2 &&
					<div>
						<h1 className="font-40 bold-text mb54 title">Welcome to CareerPath</h1>
						<div className="font-20 semi-bold-text mb24 title-mob black--text">sign-up</div>
						{formData?.profile_photo ?
							<>
								<div className="font-18 normal-text pb10">Uploaded Company Logo</div>
								<div className="mb24 profile-visible-sec relative">
									<img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => setFormData({...formData, profile_photo: ""})}/>
									<img src={formData?.profile_photo} alt="profile" className="profile-img"/>
								</div> 
							</> :
							<FileUpload label="Upload Company Logo" LoaderVal="Upload Company Logo" isLoader={isLoader} inputClassname="mb24" accept="image/*" onChange={(e: any) => { setSelectedProfileImg(e.target.files[0]) }}/>
						}
						<Input label="Email Address" inputType="email" inputClassname="mb24" value={formData.email}  onChange={(e) => setFormData({...formData, email: e.target.value})}/>
						<Input label="Create Password" inputType={isPasswordVisible ? "":"password"} inputClassname="mb60" icon={password_icon} onIconClick={() => setIsPasswordVisible(!isPasswordVisible)} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
						<div className="font-20 semi-bold-text mb41">Company Contact Details</div>
						<Input label="Email Address" inputType="email" inputClassname="mb24" value={formData.company_email}  onChange={(e) => setFormData({...formData, company_email: e.target.value})}/>
						<Input label="Address" inputClassname="mb24" value={formData.address}  onChange={(e) => setFormData({...formData, address: e.target.value})}/>
						<Input label="Phone Number" limit={10} inputType="number" inputClassname="mb24" value={formData.phone}  onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
					</div>
				}
			</div>
    </SignUpFormPageWrapper>
  );
};

export default SignUpForm;
