import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Popconfirm, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useApproveResumeMutation, useGetUserListByJobIdQuery } from "../../../redux/services/dashboard";
import { useGetAllAppliedListQuery } from "../../../redux/services/company";
import confirm_icon from "../../../assets/images/Dashboard/confirm-icon.svg"
import cancel_icon from "../../../assets/images/Dashboard/cancel-icon.svg"
import { useSelector } from "react-redux";

interface DataType {
  key: string;
  name: string;
  type: string;
  profile: string;
  applied_on: string;
  resume: string;
}

interface Props {
  selectedJobId: string | null;
}

const ResumeWrapper = styled.div`
  .table-main--conatiner {
    padding: 125px 135px;
  }
  .ant-table-wrapper table {
    border-collapse: none !important;
  }
  .ant-table-thead > tr > th {
    font-family: "Manrope";
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
  .ant-table-thead > tr:first-child > *:first-child {
    border-left: 1px solid rgba(166, 166, 166, 0.3);
  }
  .ant-table-thead > tr:last-child > *:last-child {
    border-right: 1px solid rgba(166, 166, 166, 0.3);
  }
  .ant-table-tbody > tr > td {
    font-family: "Manrope";
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
  .ant-tag {
    width: 117px;
    height: 40px;
    background: rgba(40, 104, 197, 0.1);
    border-radius: 40px;
    border: none;
    color: #2868c5;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    padding-top: 8.5px;
  }
  .resume_download {
    text-decoration: underline;
  }
  .action-img {
    gap: 10px;
    justify-content: center;
  }
  .action-img img{
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  @media only screen and (max-width: 980px) {
    .table-main--conatiner {
      padding: 40px 10px;
      margin-right: 10px;
      overflow: auto;
    }
    .ant-table-pagination.ant-pagination {
      display: none;
    }
  }
`;

const Resume = ({ selectedJobId }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const companyId = useSelector((state: any) => state?.auth?.company?._id);
  const { data: userList } = useGetUserListByJobIdQuery(selectedJobId);
  const getAllApplications = useGetAllAppliedListQuery(companyId);
  const [approveResume] = useApproveResumeMutation();

  const userListData = useMemo(() => {
    if (userList && userList?.data?.length) {
      return userList.data.map((a: any, i: any) => {
        return {
          key: i,
          id: a?._id,
          name: a?.user?.name,
          type: a?.job ? "Job" : "SCP",
          profile: a?.job?.title || a?.internship?.title,
          applied_on: a?.createdAt?.slice(0, 10),
          Resume: a?.user?.resume,
          status: a?.status,
        };
      }).filter((data:any) => data.status === "applied");
    }
    return [];
  }, [userList, approveResume]);

  const allApplicationsListData = useMemo(() => {
    if (getAllApplications && getAllApplications?.data?.data) {
      return getAllApplications?.data?.data.map((a: any, i: any) => {
        return {
          key: i,
          id: a?._id,
          name: a?.user?.name,
          type: a?.job ? "Job" : "SCP",
          profile: a?.job?.title || a?.internship?.title,
          applied_on: a?.createdAt?.slice(0, 10),
          Resume: a?.user?.resume,
          status: a?.status,
        };
      }).filter((data:any) => data.status === "applied");
    }
    return [];
  }, [getAllApplications, approveResume]);

  const resumehandler = async({text, status}: any) => {
    const resumeUpdate: any = await approveResume({id: text, status: status});
    if(resumeUpdate?.data?.data?.status === "approved"){
      messageApi.open({
        type: 'success',
				content: 'Resume Approved Successfully',
			});
    } else if (resumeUpdate?.data?.data?.status === "rejected"){
      messageApi.open({
        type: 'success',
        content: 'Resume Rejected Successfully',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
      });
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: "Applied on",
      key: "applied_on",
      dataIndex: "applied_on",
    },
    {
      title: "Resume",
      dataIndex: "Resume",
      key: "resume",
      render: (text: string) => {
        return (
          <a onClick={() => window.open(text)} className="resume_download">
            {text.slice(79, text.indexOf('?alt'))}
          </a>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text: string) => {
        return (
          <div className="flex action-img">
            <Popconfirm
              title="Are you sure approve this resume?"
              onConfirm={() => resumehandler({text,status:"approved"})}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <img src={confirm_icon} alt="confirm"/>
            </Popconfirm>
            <Popconfirm
              title="Are you sure reject this resume?"
              onConfirm={() => resumehandler({text,status:"rejected"})}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <img src={cancel_icon} alt="remove"/> 
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <ResumeWrapper>
      {contextHolder}
      <div className="table-main--conatiner flex justify-center">
        <div className="full-width">
          {selectedJobId ? (
            <Table columns={columns} dataSource={userListData} />
          ) : (
            <Table columns={columns} dataSource={allApplicationsListData} />
          )}
        </div>
      </div>
    </ResumeWrapper>
  );
};

export default Resume;
