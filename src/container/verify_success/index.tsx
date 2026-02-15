import React,{useEffect} from 'react'
import approve_icon from '../../assets/gif/approval-icon.gif';
import styled from 'styled-components';
import { useUpdateUserProfileMutation } from '../../redux/services/user';
import Header from '../../component/landing/Header';

const VerifyPageWrapper = styled.div`
  .main-sec{
    height: 100%;
    padding-top: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const VerifySuccess = () => {
  const params: any = new URLSearchParams(window.location.search)
  const [updateVerifyStatusUser] = useUpdateUserProfileMutation();
  const [updateVerifyStatusCompany] = useUpdateUserProfileMutation();

  useEffect(() => {
    for (const param of params) {
      updateVerifyStatusUser({id: param[1], data: {is_verified: true}});
      updateVerifyStatusCompany({id: param[1], data: {is_verified: true}});
    }
  }, [])
  
  return (
    <VerifyPageWrapper>
      <Header />
      <div className='main-sec flex flex-col items-center'>
        <img src={approve_icon} className='verify-icon align-center' alt='success' />
        <div className='font-24 extra-bold-text'>Email Verification Successfully!</div>
        <a href='/' className='pt25'>Back to home</a>
      </div>
    </VerifyPageWrapper>
  )
}

export default VerifySuccess