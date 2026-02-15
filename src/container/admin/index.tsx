import React, { useMemo, useState } from 'react'
import styled from 'styled-components';
import { useAdminCompanyListQuery } from '../../redux/services/company';
import { useAdminUserListQuery } from '../../redux/services/user';
import { CSVLink } from "react-csv";
import { DatePicker, DatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';

const AdminWrapper = styled.div`
  .form-container{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn-download {
    padding: 10px 20px;
    background: blue;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    margin-top: 10px !important;
  }
  .btn-download:hover{
    opacity: 0.8;
  }
`

export const AdminDownload = () => {
  const { data: adminCompanyData } = useAdminCompanyListQuery("");
  const { data: adminUserData } = useAdminUserListQuery("");
  const { RangePicker } = DatePicker;
  const [selectedDate, setSelectedDate] = useState<string | [string, string]>();

  const companyData = useMemo(() => {
    if(selectedDate?.length){    
      const startDate = new Date(selectedDate[0]);
      const endDate = new Date(selectedDate[1]);
      const resultProductData: any = adminCompanyData && adminCompanyData?.data?.filter(function (a:any) {
        let hitDates = a?.createdAt;
        hitDates = new Date(hitDates);
        const hitDateMatches = hitDates >= startDate && hitDates <= endDate;
        return hitDateMatches;
      });
      return resultProductData;
    } else if(adminCompanyData && adminCompanyData.data){
      return adminCompanyData.data;
    }
    return [];
  },[adminCompanyData, selectedDate])

  const userData = useMemo(() => {
    if(selectedDate?.length){
      const startDate = new Date(selectedDate[0]);
      const endDate = new Date(selectedDate[1]);
      const resultProductData: any = adminUserData && adminUserData?.data?.filter(function (a:any) {
        let hitDates = a?.createdAt;
        hitDates = new Date(hitDates);
        const hitDateMatches = hitDates >= startDate && hitDates <= endDate;
        return hitDateMatches;
      });
      return resultProductData;
    } else if(adminUserData && adminUserData.data){
      return adminUserData.data;
    }
    return [];
  },[adminUserData, selectedDate])

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    if(dateString.length){
      setSelectedDate(dateString);
    }
  };

  return (
    <div>
      <div className='text-center pb40'><RangePicker onChange={onChange}/></div>
      <div style={{display: "flex", gap:"15px"}}>
        <div>
          <div className='font-22 text-center pb15 bold-text'>CareerPath Company</div>
          <div className='font-24 text-center mb30 extra-bold-text'>{companyData?.length}</div>
          <CSVLink
            data={companyData}
            filename={"CareerPath-companylist.csv"}
            className="btn-download mt20"
            target="_blank"
          >
            Download CompanyList
          </CSVLink>
        </div>
        <div>
          <div className='font-22 text-center pb15 bold-text'>CareerPath Users</div>
          <div className='font-24 text-center mb30 extra-bold-text'>{userData?.length}</div>
          <CSVLink
            data={userData}
            filename={"CareerPath-userlist.csv"}
            className="btn-download mt20"
            target="_blank"
          >
            Download UserList
          </CSVLink>
        </div>
      </div>
    </div>
  )
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const passWordCheckHandler = (e:any) => {
    e.preventDefault();
    if(password === "CareerPath@admin"){
      setIsAdmin(true); 
    } else {
      window.alert("Please check your password");
    }
  }

  return (
    <AdminWrapper>
      <div className='form-container'>
        {isAdmin ?
          <AdminDownload /> :
          <form>
            <input type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' onClick={(e) => passWordCheckHandler(e)}>Submit</button>
          </form>
        }
      </div>
    </AdminWrapper>
  )
}

export default Admin