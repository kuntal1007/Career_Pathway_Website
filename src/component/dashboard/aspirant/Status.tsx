import React, { useMemo } from "react";
import styled from "styled-components";
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetApplyJobIntershipDetailsQuery } from "../../../redux/services/dashboard";

interface DataType {
  key: string;
  company: string;
  profile: string;
  applied_on: string;
  type: string;
  application_status: string;
}

const StatusWrapper = styled.div`
  .table-main--conatiner{
    padding: 125px 135px;
  }
  .ant-table-wrapper table {
    border-collapse: none !important;
  }
  .ant-table-thead >tr>th {
    font-family: 'Manrope';
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    color: #222222;
    background: rgba(40, 104, 197, 0.06);
    border-radius: 0 !important;
    text-align-last: center;
    border-top: 1px solid rgba(166, 166, 166, 0.3);
    border-bottom: 1px solid rgba(166, 166, 166, 0.3);
  }
  .ant-table-thead >tr:first-child >*:first-child {
    border-left: 1px solid rgba(166, 166, 166, 0.3);
  }
  .ant-table-thead >tr:last-child >*:last-child {
    border-right: 1px solid rgba(166, 166, 166, 0.3);
  }
  .ant-table-tbody >tr >td {
    font-family: 'Manrope';
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    text-transform: capitalize;
    color: #222222;
  }
  .ant-table-wrapper table {
    border-collapse: none;
    border-left: 1px solid rgba(166, 166, 166, 0.3);
    border-right: 1px solid rgba(166, 166, 166, 0.3);
  }
  .ant-tag{
    width: 117px;
    height: 40px;
    background: rgba(40, 104, 197, 0.1);
    border-radius: 40px;
    border: none;
    color: #2868C5;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    padding-top: 8.5px;
  }
  .filled_tag{
    color: #A6A6A6;
  }
  @media only screen and (max-width: 980px) {
    .table-main--conatiner {
      padding: 40px 20px;
      margin-right: 20px;
      overflow: auto;
    }
    .ant-table-pagination.ant-pagination {
      display: none;
    }
  }
`;

const Status = () => {
  const {data: appliedJobIntershipDetails} = useGetApplyJobIntershipDetailsQuery("");

  const appliedJobData = useMemo(() => {
    if (appliedJobIntershipDetails && appliedJobIntershipDetails?.data?.length) {
      return appliedJobIntershipDetails.data.map((a: any, i:any) => {
        return {
          title: a.job?.title || a.internship?.title,
          application_status: a?.status,
          company_name: a.job?.company?.name || a.internship?.company?.name,
          type: a.job ? "Job" : "SCP",
          key: i,
          applied_on: a?.createdAt?.slice(0,10),
        };
      });
    }
    return [];
  }, [appliedJobIntershipDetails])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company',
    },
    {
      title: 'Profile',
      dataIndex: 'title',
      key: 'profile',
    },
    {
      title: 'Applied On',
      dataIndex: 'applied_on',
      key: 'applied_on',
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: 'Application Status',
      dataIndex: 'application_status',
      key: 'application_status',
      render: (text) => {
        let bg_color = "rgba(166, 166, 166, 0.13)"; 
        if(text === "Applied"){
          bg_color = "rgba(40, 104, 197, 0.1)"
        }
        return(
          <Tag color={bg_color} className={text === "Position Filled" ? "filled_tag" : ""}>{text}</Tag>
        )
      }
    },
  ];

  return (
    <StatusWrapper>
      <div className="table-main--conatiner flex justify-center">
        <div className="full-width">
          <Table columns={columns} dataSource={appliedJobData} />
        </div>
      </div>
    </StatusWrapper>
  );
};

export default Status;
