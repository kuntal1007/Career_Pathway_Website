import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Input from "../../../component/common/Form/Input";
import password_icon from "../../../assets/images/Form/password_eye_icon.svg";
import calendar_icon from "../../../assets/images/Form/calender_icon.svg";
import TextArea from "../../../component/common/Form/TextArea";
import cancel_icon from "../../../assets/images/Dashboard/cancel_icon.svg";
import FileUpload from "../../../component/common/Form/FileUpload";
import DropDown from "../../../component/common/Form/DropDown";
import { uploadImage } from "../../../utils/imageupload";
import { message } from "antd";
import { interest, skills, total_language } from "../../../utils/constant_data";

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
  .input-style-visible {
	width: 100%;
	background: rgba(40, 104, 197, 0.13);
	z-index: 999;
	border: 1px dashed #2868C5;
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
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);
	const [selectedInterests, setSelectedInterests] = useState([]);
	const [selectedProfileImg, setSelectedProfileImg] = useState(null);
	const [selectedProject, setSelectedProject] = useState<any>(null);
	const [selectedIdCard, setSelectedIdCard] = useState<any>(null);
	const [isLoader, setIsLoader] = useState(false);
	const [loaderVal, setLoaderVal] = useState("")
	useMemo(() => {
		setFormData({...formData, skills: selectedSkills, interests: selectedInterests, languages: selectedLanguage})
	}, [selectedSkills, selectedInterests, selectedLanguage]);

	useMemo(async() => {
		let profilePic = null;
		if(selectedProfileImg !== null){
			setIsLoader(true);
			setLoaderVal("Upload Photo");
			profilePic = await uploadImage(selectedProfileImg);
			messageApi.open({
				type: 'success',
				content: 'Profile photo has been successfully uploaded',
			});
			setIsLoader(false);
		}
		setFormData({...formData, profile_photo: profilePic })
	}, [selectedProfileImg])
	useMemo(async() => {
		let projectFile = null;
		if(selectedProject !== null){
			setIsLoader(true);
			setLoaderVal("Project Reports");
			projectFile = await uploadImage(selectedProject);
			messageApi.open({
				type: 'success',
				content: 'Project file has been successfully uploaded',
			});
			setIsLoader(false);
		}
		setFormData({ ...formData, projects: projectFile })
	}, [ selectedProject ])
	useMemo(async() => {
		let idCard = null;
		if(selectedIdCard !== null){
			setIsLoader(true);
			setLoaderVal("Upload ID card");
			idCard = await uploadImage(selectedIdCard);
			messageApi.open({
				type: 'success',
				content: 'Id Card has been successfully uploaded',
			});
			setIsLoader(false);
		}
		setFormData({ ...formData, id_card: idCard })
	}, [ selectedIdCard ])

  return (
    <SignUpFormPageWrapper>
      {contextHolder}
		<div className="mt85">
			{pageNumber === 1 &&
				<div>
					<h1 className="font-40 bold-text mb54 title">Welcome to CareerPath</h1>
					<div className="font-20 semi-bold-text mb24 title-mob black--text">sign-up</div>
					<Input label="Name" inputType="text" inputClassname="mb24" value={formData.name}  onChange={(e) => setFormData({...formData, name: e.target.value})}/>
					<div className="font-18 normal-text pb8">Gender</div>
					<div className="radiobox-container flex justify-between mb24" onChange={(event: any) => setFormData({...formData, gender : event.target.value})}>
						<div className="flex">
							<input type="radio" value="male" name="gender" className="radiobox-style br4" checked={formData.gender === "male"} />
							<span className="font-14 normal-text pl4 self-center">Male</span>
						</div>
						<div className="flex">
							<input type="radio" value="female" name="gender" className="radiobox-style br4" checked={formData.gender === "female"} />
							<span className="font-14 normal-text pl4 self-center">Female</span>
						</div>
						<div className="flex">
							<input type="radio" value="prefer_not_to_say" name="gender" className="radiobox-style br4" checked={formData.gender === "prefer_not_to_say"}/>
							<span className="font-14 normal-text pl4 self-center">
								Prefer not to say
							</span>
						</div>
					</div>
					<Input label="Email Address" inputType="email" inputClassname="mb24" value={formData.email}  onChange={(e) => setFormData({...formData, email: e.target.value})}/>
					<Input
						label="Create Password"
						inputType={!isPasswordVisible ? "password" : ""}
						inputClassname="mb24"
						icon={password_icon}
						onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
						value={formData.password}  onChange={(e) => setFormData({...formData, password: e.target.value})}
					/>
					<Input label="Phone Number" limit={10} inputClassname="mb24" value={formData.phone}  onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
					<Input
						label="Date of Birth"
						inputClassname="mb24"
						icon={calendar_icon}
						inputType="date"
						value={formData.dob}  
						onChange={(e) => setFormData({...formData, dob: e.target.value})}
					/>
				</div>
			}
			{pageNumber === 2 &&
				<div>
					<h1 className="font-40 bold-text mb54 title">Welcome to CareerPath</h1>
					<div className="font-20 semi-bold-text mb24 title-mob black--text">sign-up</div>
					<TextArea label="Address" inputClassname="mb24" value={formData.address}  onChange={(e:any) => setFormData({...formData, address: e.target.value})}/>
					<Input label="Aadhar card Number" limit={12} inputClassname="mb24" value={formData.adharcard}  onChange={(e) => setFormData({...formData, adharcard: e.target.value})}/>
					<Input label="Pan card Number" limit={10} inputClassname="mb24" value={formData.pancard}  onChange={(e) => setFormData({...formData, pancard: e.target.value})}/>
					<DropDown label="Speaking Languages Known" inputClassname="mb24" options={total_language} value={formData.languages}  setFormData={setSelectedLanguage}/>
					{formData?.profile_photo ?
						<>
							<div className="font-18 normal-text pb10">Uploaded Photo</div>
							<div className="mb24 profile-visible-sec relative">
								<img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => setFormData({...formData, profile_photo: ""})}/>
								<img src={formData?.profile_photo} alt="profile" className="profile-img"/>
							</div> 
						</> :
						<FileUpload label="Upload Photo" LoaderVal={loaderVal} isLoader={isLoader} inputClassname="mb24" accept="image/*" onChange={(e: any) => { setSelectedProfileImg(e.target.files[0]) }}/>
					}
				</div>
			}
			{pageNumber === 3 &&
				<div>
					<h1 className="font-40 bold-text mb54 title">Welcome to CareerPath</h1>
					<div className="font-20 semi-bold-text mb24 title-mob black--text">sign-up</div>
					<Input label="College Name" inputClassname="mb24" value={formData.college_name}  onChange={(e) => setFormData({...formData, college_name: e.target.value})}/>
					<DropDown label="Skills" inputClassname="mb24" options={skills} value={formData?.skills} setFormData={setSelectedSkills}/>
					<DropDown label="Interests" inputClassname="mb24" options={interest} value={formData?.interests} setFormData={setSelectedInterests}/>
					{formData?.projects ?
						<>
							<div className="font-18 normal-text pb10">Uploaded Project</div>
							<div className="mb24 project-visible-sec relative relative cursor-pointer input-style-visible br8 font-18 normal-text px10 py13">
								<img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => {setFormData({...formData, projects: ""}); setSelectedProject(null)}}/>
								<div className="font-14 normal-text text-center">{selectedProject?.name}</div>
							</div> 
						</> :
						<FileUpload label="Project Reports" LoaderVal={loaderVal} isLoader={isLoader} accept="application/pdf" inputClassname="mb24" onChange={(e: any) => { setSelectedProject(e.target.files[0]) }}/>
					}
					<TextArea label="Bio" inputClassname="mb24" value={formData.bio} onChange={(e:any) => setFormData({...formData, bio: e.target.value})}/>
					{formData?.id_card ?
						selectedIdCard?.type === "application/pdf" ?
							<>
								<div className="font-18 normal-text pb10">Uploaded ID Card</div>
									<div className="mb24 project-visible-sec relative relative cursor-pointer input-style-visible br8 font-18 normal-text px10 py13">
									<img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => {setFormData({...formData, id_card: ""}); setSelectedIdCard(null)}}/>
									<div className="font-14 normal-text text-center">{selectedIdCard?.name}</div>
								</div> 
							</> :
						<>
							<div className="font-18 normal-text pb10">Uploaded ID Card</div>
							<div className="mb24 profile-visible-sec relative">
								<img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => {setFormData({...formData, id_card: ""}); setSelectedIdCard(null)}}/>
								<img src={formData?.id_card} alt="profile" className="profile-img"/>
							</div> 
						</>
					:
						<FileUpload isLoader={isLoader} label="Upload ID card" LoaderVal={loaderVal} accept="image/*, application/pdf" inputClassname="mb24" onChange={(e:any)=> {setSelectedIdCard(e.target.files[0])}}/>
					}
				</div>
			}
		</div>
    </SignUpFormPageWrapper>
  );
};

export default SignUpForm;
