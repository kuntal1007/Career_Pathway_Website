import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useGetUserByIdQuery, useUpdateUserProfileMutation, useVerifyEmailQuery } from "../../../redux/services/user";
import { useSelector } from "react-redux";
import { Button, Modal, Tooltip, message } from "antd";
import { uploadImage } from "../../../utils/imageupload";
import profile_image from "../../../assets/images/Dashboard/profile_image.svg"
import cancel_icon from "../../../assets/images/Dashboard/cancel_icon.svg";
import edit_profile from "../../../assets/images/Dashboard/edit_profile.png";
import Input from "../../common/Form/Input";
import FileUpload from "../../common/Form/FileUpload";
import TextArea from "../../common/Form/TextArea";
import DropDown from "../../common/Form/DropDown";
import { interest, skills, total_language } from "../../../utils/constant_data";
import { useNavigate } from "react-router-dom";

interface Props {}

const AboutMeWrapper = styled.div`
  .profile-image{
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  .user-bio{
    max-width: 467px;
  }
  .input-section--container{
    max-width: 370px;
  }
  .main--container{
    padding: 40px 135px 48px 135px;
  }
  .edit-btn:hover{
    background: #407BFF;
    border: 1px solid #2868C5;
    color: #FFFFFF;
    transition: ease-in-out 0.4s;
  }
  .file-visible-sec {
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
  .resume-img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
		object-fit: cover;
  }
  .change-profile-photo{
    background: #2868C5;
    border-radius: 50%;
    border: 1px solid #FFFFFF;
    height: 23px;
    width: 23px;
    bottom: 0;
    right: 2px;
  }
  .change-profile-photo img {
    padding-left: 3px;
    height: 14px;
    width: 18.5px;
  }
  .profile-photo-container {
    overflow: hidden;
    display: inline-block;
  }
  .profile-photo-container input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .edit-btn-mobile {
    display: none;
  }
  .verify-text {}
  .non-verify-text {
    color: red;
  }
  @media only screen and (max-width: 1060px) {
    .main--container {
      padding: 40px 40px 48px 40px;
    }
    .form--container {
      gap: 40px;
    }
  }
  @media only screen and (max-width: 680px) {
    .main--container {
      padding: 75px 16px 48px 16px;
    }
    .file-upload-text{
      font-size: 14px;
    }
    .edit-btn{
      display: none;
    }
    .profile-image {
      height: 88px;
      width: 88px;
    }
    .user-name{
      font-size: 17px;
    }
    .user-bio{
      width: 247px;
      font-size: 12px;
    }
    .form--container{
      flex-direction: column;
      gap: 0;
    }
    .edit-btn-mobile{
      display: flex;
      position: absolute;
      right: 16px;
      top: 21px;
    }
    .input-width{
      width: calc(100vw - 32px);
      max-width: calc(100vw - 32px);
    }
  }
`;

const AboutMe = ({}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedSkills, setSelectedSkills] = useState([]);
	const [selectedInterests, setSelectedInterests] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [updateProfilePhoto, setUpdateProfilePhoto] = useState<any>(null);
  const [uploadedResume, setUploadedResume] = useState<any>(null);
  const [uploadedProject, setUploadedProject] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isLoader2, setIsLoader2] = useState<boolean>(false);
  const [isBackEnable, setIsBackEnable] = useState(false);

  const userId = useSelector((state: any) => state?.auth?.user?._id);
  const {data, refetch} = useGetUserByIdQuery(userId)
  const userData = data?.data;
  const navigate = useNavigate();
  const [updateProfile] = useUpdateUserProfileMutation();

  const [formData, setFormData] = useState({
    email: "",
    address: "",
    phone: "",
    college_name: "",
    dob: "",
    interests: [],
    skills: [],
    adharcard: "",
    pancard: "",
    profile_photo: "",
    languages: [],
    projects: "",
    resume: "",
    newentry: "" || false,
  })
  
  // useMemo(() => {
  //   if(formData?.newentry === true && formData?.email){
  //     document.cookie = "editedData" + "=" + JSON.stringify(formData);
  //   }
  // },[formData])

  // function getCookie(cname: string) {
  //   let name = cname + "=";
  //   let decodedCookie = decodeURIComponent(document.cookie);
  //   let ca = decodedCookie.split(';');
  //   for(let i = 0; i <ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }

  // const cookieData = getCookie("editedData");
  // const editedCookieData = cookieData && JSON.parse(cookieData);
  
  // useEffect(() => {
  //   window.onpopstate = (e: any) => {
  //     e.preventDefault();
  //     if (isBackEnable) {
  //       if (!window.confirm("Your changes have not been saved! Are you sure you want to leave?")) {
  //         navigate("/aspirant-dashboard");
  //       } else if(window.confirm("Your changes have not been saved! Are you sure you want to leave?")) {
  //         document.cookie = "editedData" + "=" + null;
  //       }
  //     }
  //   };
  // }, [isBackEnable]);

  // useMemo(() => {
  //   if(formData.newentry){
  //     setIsBackEnable(true);
  //   }else{
  //     setIsBackEnable(false);
  //   }
  // },[formData.newentry])

  useEffect(() => {
    // if (editedCookieData?.email) {
    //   setFormData({
    //     email: editedCookieData?.email,
    //     address: editedCookieData?.address,
    //     phone: editedCookieData?.phone,
    //     college_name: editedCookieData?.college_name,
    //     dob: editedCookieData?.dob?.slice(0, 10),
    //     interests: editedCookieData?.interests,
    //     skills: editedCookieData?.skills,
    //     adharcard: editedCookieData?.adharcard,
    //     pancard: editedCookieData?.pancard,
    //     languages: editedCookieData?.languages,
    //     projects: editedCookieData?.projects,
    //     profile_photo: editedCookieData?.profile_photo,
    //     resume: editedCookieData?.resume,
    //     newentry: false,
    //   })
    // } 
    if(userData?.email) {
      setFormData({
        email: userData?.email,
        address: userData?.address,
        phone: userData?.phone,
        college_name: userData?.college_name,
        dob: userData?.dob?.slice(0, 10),
        interests: userData?.interests,
        skills: userData?.skills,
        adharcard: userData?.adharcard,
        pancard: userData?.pancard,
        languages: userData?.languages,
        projects: userData?.projects,
        profile_photo: userData?.profile_photo,
        resume: userData?.resume,
        newentry: false,
      })
    }
  },[userData])

  // useEffect(() => {
  //   if(editedCookieData?.name){
  //     setFormData({
  //       email: editedCookieData?.email,
  //       address: editedCookieData?.address,
  //       phone: editedCookieData?.phone,
  //       college_name: editedCookieData?.college_name,
  //       dob: editedCookieData?.dob?.slice(0, 10),
  //       interests: editedCookieData?.interests,
  //       skills: editedCookieData?.skills,
  //       adharcard: editedCookieData?.adharcard,
  //       pancard: editedCookieData?.pancard,
  //       languages: editedCookieData?.languages,
  //       projects: editedCookieData?.projects,
  //       profile_photo: editedCookieData?.profile_photo,
  //       resume: editedCookieData?.resume,
  //       newentry: true,
  //     })
  //   }
  // },[editedCookieData?.email]);

  useMemo(() => {
		setFormData({...formData, skills: selectedSkills, interests: selectedInterests, languages: selectedLanguage, newentry: true})
	}, [selectedSkills, selectedInterests, selectedLanguage]);

  useMemo(async() => {
		let profileUrl = null;
		if(updateProfilePhoto !== null){
			profileUrl = await uploadImage(updateProfilePhoto);
			messageApi.open({
				type: 'success',
				content: 'Profile photo has been sccessfully uploaded',
			});
		}
		setFormData({...formData, profile_photo: profileUrl, newentry: true })
	}, [updateProfilePhoto])

  useMemo(async() => {
		let resumeUrl = null;
		if(uploadedResume !== null){
      setIsLoader(true);
			resumeUrl = await uploadImage(uploadedResume);
			messageApi.open({
				type: 'success',
				content: 'Resume has been successfully uploaded',
			});
      setIsLoader(false);
		}
		setFormData({...formData, resume: resumeUrl, newentry: true })
	}, [uploadedResume])

  useMemo(async() => {
    let projectUrl = null;
		if(uploadedProject !== null){
      setIsLoader2(true);
			projectUrl = await uploadImage(uploadedProject);
			messageApi.open({
				type: 'success',
				content: 'Project has been successfully uploaded',
			});
      setIsLoader(false);
		}
		setFormData({...formData, projects: projectUrl, newentry: true })
	}, [uploadedProject])

  const handleEditHandler = async() => {
    if(formData){
      const updateUserProfile: any = await updateProfile({ id: userData?._id, data: formData})
      if(updateUserProfile?.data?.code === 200){
        messageApi.open({
          type: 'success',
          content: 'Profile Updated!',
        });
        refetch();
      }else{
        messageApi.open({
          type: 'error',
          content: updateUserProfile?.error?.data?.message,
        });
      }
    }
  }
  
  const [emailVerify, setEmailVerify] = useState("");
  const [emailVerifyRes, setEmailVerifyRes] = useState<any>(null);
  const {data: verifyEmail} = useVerifyEmailQuery(emailVerify);

  useMemo(() => {
    if(verifyEmail?.code === 200){
      setEmailVerifyRes(verifyEmail);
    }
  },[emailVerify, verifyEmail])

  const verifyHandler = async(email: string) => {
    setEmailVerify(email);
    if(emailVerify && emailVerifyRes?.code === 200 || emailVerifyRes === null){
      messageApi.open({
        type: 'success',
				content: 'Email Verification Link Has Been Send To Your Mail',
			});
    } else {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
      });
    }
  }

  return (
    <AboutMeWrapper>
      {contextHolder}
        <div className="main--container relative">
          <div className="flex justify-between mb48">
            <div className="flex gap16">
              <div className="relative profile-photo-container">
                <img src={formData.profile_photo || profile_image} alt="Profile" className="profile-image"/>
                <div className="absolute change-profile-photo cursor-pointer"><img src={edit_profile} alt="change" /></div>
                <input type="file"accept="image/*"  onChange={(e:any)=> {setUpdateProfilePhoto(e.target.files[0])}}/>
              </div>
              <div className="self-center flex flex-col gap8">
                <div className="font-20 semi-bold-text user-name">{userData?.name}{userData?.is_verified ? <img src="https://img.icons8.com/color/48/null/verified-account--v1.png" style={{height: "23px", width: "23px"}}/> : <Tooltip title="Click here to verify"><span className="non-verify-text font-14 cursor-pointer" onClick={() => verifyHandler(userData?.email)}>{" "}(Not Verify)<span className="font-12">{" "}Click to verify</span></span></Tooltip>}</div>
                <div className="font-14 semi-bold-text user-bio full-width">{userData?.bio}</div>
              </div>
            </div>
            {!formData.newentry ?
              <button className="edit-btn border1 primary--border px42 py17 primary--text font-16 bold-text white br8 fill-height self-center cursor-pointer">Edit Profile</button> :
              <button className="edit-btn border1 primary--border px42 py17 white--text font-16 bold-text primary br8 fill-height self-center cursor-pointer" onClick={() => handleEditHandler()}>Save</button>
            }
            {!formData.newentry ?
              <div className="edit-btn-mobile font-16 semi-bold-text primary--text cursor-pointer">EDIT</div> :
              <div className="edit-btn-mobile font-16 semi-bold-text primary--text cursor-pointer" onClick={() => handleEditHandler()}>SAVE</div>
            }
          </div>
          <div className="flex justify-between form--container">
            <div className="input-section--container full-width">
              <Input label="Email Address" inputType="email" inputClassname="mb32 input-width" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value, newentry: true})}/>
              <Input label="Phone Number" limit={10} inputType="number" inputClassname="mb32 input-width" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value, newentry: true})}/>
              <Input label="Date of Birth" inputType="date" inputClassname="mb32 input-width" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value, newentry: true})}/>
              <Input label="Aadhar card Number" limit={12} inputType="text" inputClassname="mb32 input-width" value={formData.adharcard} onChange={(e) => setFormData({...formData, adharcard: e.target.value, newentry: true})}/>
              <Input label="Pan card Number" limit={10} inputType="text" inputClassname="mb32 input-width" value={formData.pancard} onChange={(e) => setFormData({...formData, pancard: e.target.value, newentry: true})}/>
              {formData?.resume ?
						    uploadedResume?.type === "application/pdf" ?
                  <>
                    <div className="font-18 normal-text pb10">Resume</div>
                      <div className="mb24 input-width project-visible-sec relative relative cursor-pointer input-style-visible br8 font-18 normal-text px10 py13">
                        <img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => {setFormData({...formData, resume: ""}); setUploadedResume(null)}}/>
                        <div className="font-14 normal-text text-center">{uploadedResume?.name}</div>
                    </div> 
                  </> : uploadedResume?.type === "image/png" || uploadedResume?.type === "image/jpeg" ?
                  <>
                    <div className="font-18 normal-text input-width pb10 file-upload-text">Resume</div>
                    <div className="mb24 file-visible-sec relative">
                      <img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => {setFormData({...formData, resume: ""}); setUploadedResume(null)}}/>
                      <img src={formData?.resume} alt="resume" className="resume-img"/>
                    </div> 
                  </> :
                  <>
                    <div className="font-18 normal-text pb10 file-upload-text">Resume</div>
                      <div className="mb24 project-visible-sec input-width relative relative cursor-pointer input-style-visible br8 font-18 normal-text px10 py13">
                        <img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => {setFormData({...formData, resume: ""}); setUploadedResume(null)}}/>
                        <div className="font-14 normal-text text-center" onClick={() =>  window.open(formData?.resume)}>Click here to preview your resume</div>
                    </div> 
                  </> :
                  <FileUpload label="Resume" accept="image/*, application/pdf" LoaderVal="Resume" isLoader={isLoader} onChange={(e:any)=> {setUploadedResume(e.target.files[0])}}/>
					      }
            </div>
            <div className="input-section--container full-width">
              <TextArea label="Address" inputClassname="mb27 input-width" value={formData.address} onChange={(e:any) => setFormData({...formData, address: e.target.value, newentry: true})}/>
              <Input label="College Name" inputClassname="mb27 input-width" value={formData.college_name} onChange={(e) => setFormData({...formData, college_name: e.target.value, newentry: true})}/>
              <DropDown label="Interests" options={interest} inputClassname="mb27 input-width" dropdownclassName="input-width" value={formData.interests} setFormData={setSelectedInterests}/>
              <DropDown label="Skills" options={skills} inputClassname="mb27 input-width" dropdownclassName="input-width" value={formData.skills} setFormData={setSelectedSkills}/>
              <DropDown label="Speaking Languages Known" options={total_language} inputClassname="mb27 input-width" dropdownclassName="input-width" value={formData.languages} setFormData={setSelectedLanguage}/>
              {formData?.projects ?
						    uploadedProject?.type === "application/pdf" ?
                  <>
                    <div className="font-18 normal-text pb10 file-upload-text">Project Reports</div>
                      <div className="mb24 project-visible-sec input-width relative cursor-pointer input-style-visible br8 font-18 normal-text px10 py13">
                        <img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => {setFormData({...formData, projects: ""}); setUploadedProject(null)}}/>
                        <div className="font-14 normal-text text-center">{uploadedProject?.name}</div>
                    </div> 
                  </> :
                  <>
                    <div className="font-18 normal-text pb10 file-upload-text">Project Reports</div>
                      <div className="mb24 project-visible-sec input-width relative cursor-pointer input-style-visible br8 font-18 normal-text px10 py13">
                        <img src={cancel_icon} alt="cancel" className="absolute cancel-icon cursor-pointer" onClick={() => {setFormData({...formData, projects: ""}); setUploadedProject(null)}}/>
                        <div className="font-14 normal-text text-center" onClick={() =>  window.open(formData?.projects)}>Click here to preview your projects reports</div>
                    </div> 
                  </> :
                  <FileUpload label="Projects" accept="image/*, application/pdf" LoaderVal="Projects" isLoader={isLoader2} onChange={(e:any)=> {setUploadedProject(e.target.files[0])}} inputClassname="input-width text-center"/>
					      }
            </div>
          </div>
        </div>
    </AboutMeWrapper>
  );
};

export default AboutMe;
