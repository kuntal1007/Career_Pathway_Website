import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import profile_image from "../../../assets/images/Dashboard/profile_image.svg"
import edit_profile from "../../../assets/images/Dashboard/edit_profile.png";
import add_post_icon from "../../../assets/images/Dashboard/add_post_icon.svg";
import Input from "../../common/Form/Input";
import TextArea from "../../common/Form/TextArea";
import DropDown from "../../common/Form/DropDown";
import { useSelector } from "react-redux";
import { useGetCompanyByIdQuery, useUpdateCompanyProfileMutation } from "../../../redux/services/company";
import { Tooltip, message } from "antd";
import { uploadImage } from "../../../utils/imageupload";
import { services } from "../../../utils/constant_data";
import { useNavigate } from "react-router-dom";
import { useVerifyEmailQuery } from "../../../redux/services/user";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutMeWrapper = styled.div`
  .profile-image{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  .user-bio{
    max-width: 467px;
  }
  .input-section--container{
    max-width: 370px;
  }
  .main--container{
    padding: 40px 135px 95px 135px;
  }
  .about-textarea{
    height: 162px;
  }
  .address-textarea{
    height: 143.5px;
  }
  .add-post-btn:hover{
    background-color: rgba(40, 104, 197, 0.9);
    transition: ease-in 0.2s;
  }
  .submit-btn:hover{
    background-color: rgba(40, 104, 197, 0.9);
    transition: ease-in 0.2s;
    color: #ffffff;
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
  .edit-btn-mobile, .add-post-btn-mobile {
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
    .submit-btn, .add-post-btn{
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
    .profile--container{
      margin-bottom: 40px;
    }
    .edit-btn-mobile{
      display: flex;
      position: absolute;
      right: 16px;
      top: 21px;
    }
    .add-post-btn-mobile{
      display: flex;
      position: absolute;
      right: 77px;
      top: 19px;
    }
    .input-width{
      width: calc(100vw - 32px);
      max-width: calc(100vw - 32px);
      margin-bottom: 24px;
    }
    .company--contact-text{
      font-size: 16px;
      padding-bottom: 24px;
      padding-top: 8px;
    }
  }
`;

const AboutMe = ({ setIsModalOpen }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [updateCompanyProfile] = useUpdateCompanyProfileMutation();
  const [formData, setFormData] = useState<any>({})
  const [selectedServices, setSelectedServices] = useState([]);
  const [updateProfilePhoto, setUpdateProfilePhoto] = useState<any>(null);
  const [isBackEnable, setIsBackEnable] = useState(false);

  const companyId = useSelector((state: any) => state?.auth?.company?._id);
  const {data: companyData, refetch} = useGetCompanyByIdQuery(companyId)
  const navigate = useNavigate();

  // useMemo(() => {
  //   if(formData?.newentry === true && formData?.name){
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

  useEffect(() => {
    // if(editedCookieData?.name){
    //   setFormData({
    //     name: editedCookieData?.name || "",
    //     profile_photo: editedCookieData?.profile_photo || profile_image,
    //     tagline: editedCookieData?.tagline || "",
    //     about: editedCookieData?.about || "",
    //     email: editedCookieData?.email || "",
    //     company_email: editedCookieData?.company_email || "",
    //     founded_year: editedCookieData?.founded_year || "",
    //     services: editedCookieData?.services || [],
    //     address: editedCookieData?.address || "",
    //     phone: editedCookieData?.phone || "",
    //     site_link: editedCookieData?.site_link || "",
    //     newentry: false,
    //   })
    // }
    if(companyData?.data) {
      setFormData({
        name: companyData?.data?.name || "",
        profile_photo: companyData?.data?.profile_photo || profile_image,
        tagline: companyData?.data?.tagline || "",
        about: companyData?.data?.about || "",
        email: companyData?.data?.email || "",
        company_email: companyData?.data?.company_email || "",
        founded_year: companyData?.data?.founded_year || "",
        services: companyData?.data?.services || [],
        address: companyData?.data?.address || "",
        phone: companyData?.data?.phone || "",
        site_link: companyData?.data?.site_link || "",
        newentry: false,
      })
    }
  },[companyData])

  // useEffect(() => {
  //   if(editedCookieData?.name){
  //     setFormData({
  //       name: editedCookieData?.name || "",
  //       profile_photo: editedCookieData?.profile_photo || profile_image,
  //       tagline: editedCookieData?.tagline || "",
  //       about: editedCookieData?.about || "",
  //       email: editedCookieData?.email || "",
  //       company_email: editedCookieData?.company_email || "",
  //       founded_year: editedCookieData?.founded_year || "",
  //       services: editedCookieData?.services || [],
  //       address: editedCookieData?.address || "",
  //       phone: editedCookieData?.phone || "",
  //       site_link: editedCookieData?.site_link || "",
  //       newentry: true,
  //     })
  //   }
  // },[editedCookieData?.name]);

  useMemo(() => {
    setFormData({...formData, services: selectedServices, newentry: true})
  }, [selectedServices]);

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

  // useEffect(() => {
  //   window.onpopstate = (e: any) => {
  //     e.preventDefault();
  //     if (isBackEnable) {
  //       if (!window.confirm("Your changes have not been saved! Are you sure you want to leave?")) {
  //         navigate("/company-dashboard");
  //       } else if(window.confirm("Your changes have not been saved! Are you sure you want to leave?")) {
  //         document.cookie = "editedData" + "=" + null;
  //       }
  //     }
  //   };
  // }, [isBackEnable]);

  useMemo(() => {
    if(formData.newentry){
      setIsBackEnable(true);
    }else{
      setIsBackEnable(false);
    }
  },[formData.newentry])

  const submitHandler = async() => {
    if(formData){
      const updateProfile: any = await updateCompanyProfile({ id: companyId, data: formData});
      if(updateProfile?.data?.code === 200){
        setFormData({...formData, newentry: false});
        messageApi.open({
          type: 'success',
          content: 'Profile Updated!',
        });
        refetch();
      }else{
        messageApi.open({
          type: 'error',
          content: updateProfile?.error?.data?.message,
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

  const addpostHandler = () => {
    if(companyData?.data?.is_verified){
      setIsModalOpen(true);
    } else {
      window.alert("Please Verify Your Mail")
    }
  }

  return (
    <AboutMeWrapper>
      {contextHolder}
        <div className="main--container relative">
          <div className="flex justify-between mb60 profile--container">
            <div className="flex gap16">
              <div className="relative profile-photo-container">
                <img src={formData.profile_photo || profile_image} alt="Profile" className="profile-image"/>
                <div className="absolute change-profile-photo cursor-pointer"><img src={edit_profile} alt="change" /></div>
                <input type="file"accept="image/*"  onChange={(e:any)=> {setUpdateProfilePhoto(e.target.files[0])}}/>
              </div>
              <div className="self-center flex flex-col gap8">
                <div className="font-20 semi-bold-text user-name">{formData.name} {companyData?.data?.is_verified ? <img src="https://img.icons8.com/color/48/null/verified-account--v1.png" style={{height: "23px", width: "23px"}}/> : <Tooltip title="Click here to verify"><span className="non-verify-text font-14 cursor-pointer" onClick={() => verifyHandler(companyData?.data?.email)}>{" "}(Not Verify)<span className="font-12">{" "}Click to verify</span></span></Tooltip>}</div>
                <div className="font-14 semi-bold-text user-bio full-width">{formData.tagline}</div>
              </div>
            </div>
            <div className="flex gap40 fill-height self-center">
              <button className="add-post-btn border1 primary--border px42 py17 white--text font-16 bold-text primary br8 cursor-pointer" onClick={() => addpostHandler()}>Add a Post</button>
              <img src={add_post_icon} className="add-post-btn-mobile cursor-pointer" onClick={() => setIsModalOpen(true)}></img>
              {!formData.newentry ?
                <button className="submit-btn border1 primary--border px42 py17 primary--text font-16 bold-text white br8 cursor-pointer">Edit Profile</button> :
                <button className="submit-btn border1 primary--border px42 py17 white--text font-16 bold-text primary br8 cursor-pointer" onClick={() => submitHandler()}>Save</button>
              }
              {!formData.newentry ?
                <div className="edit-btn-mobile font-16 semi-bold-text primary--text cursor-pointer">EDIT</div> :
                <div className="edit-btn-mobile font-16 semi-bold-text primary--text cursor-pointer" onClick={() => submitHandler()}>SAVE</div>
              }
            </div>
          </div>
          <div className="flex justify-between form--container">
            <div className="input-section--container full-width mt14">
					    <TextArea label="About Company" inputClassname="about-textarea mb40 input-width"  value={formData.about} onChange={(e:any) => setFormData({...formData, about: e.target.value, newentry: true})}/>
              <Input label="Founded Year" inputType="number" inputClassname="mb40 input-width" value={formData.founded_year} onChange={(e) => setFormData({...formData, founded_year: e.target.value, newentry: true})}/>
              <DropDown label="Services" options={services} inputClassname="mb40 input-width" dropdownclassName="input-width" value={formData.services} setFormData={setSelectedServices}/>
              <Input label="Email Address" inputClassname="input-width" inputType="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value, newentry: true})}/>
            </div>
            <div className="input-section--container full-width">
              <div className="font-20 semi-bold-text pb32 company--contact-text">Company Contact Details</div>
              <Input label="Email Address" inputType="email" inputClassname="mb32 input-width" value={formData.company_email} onChange={(e) => setFormData({...formData, company_email: e.target.value, newentry: true})}/>
              <TextArea label="Address" inputClassname="address-textarea mb32 input-width" value={formData.address} onChange={(e:any) => setFormData({...formData, address: e.target.value, newentry: true})}/>
              <Input label="Phone Number" limit={10} inputType="number" inputClassname="mb32 input-width" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value, newentry: true})}/>
              <Input label="Company Site Link" inputType="url" inputClassname="input-width" value={formData.site_link} onChange={(e) => setFormData({...formData, site_link: e.target.value, newentry: true})}/>
            </div>
          </div>
        </div>
    </AboutMeWrapper>
  );
};

export default AboutMe;
