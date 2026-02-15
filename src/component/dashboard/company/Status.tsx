import React, { useMemo } from "react";
import styled from "styled-components";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetCompanyPostedJobIntershipQuery } from "../../../redux/services/dashboard";

interface DataType {
  key: string;
  role: string;
  type: string;
  no_of_applicants: string;
  posted_on: string;
  status: string;
}
interface Props{
  setSelectedJobId: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const StatusWrapper = styled.div`
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
  .filled_tag {
    color: #a6a6a6;
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

const Status = ({ setSelectedJobId, setSelectedActiveTab }: Props) => {
  const {data: postedJobIntershipDetails} = useGetCompanyPostedJobIntershipQuery("");

  const appliedJobData = useMemo(() => {
    if (postedJobIntershipDetails && postedJobIntershipDetails?.data?.length) {
      return postedJobIntershipDetails.data.map((a: any, i:any) => {
        return {
          key: i,
          role: {title: a?.title, id: a._id},
          type: a?.type,
          no_of_applicants: a?.totalApplied,
          posted_on: a?.createdAt?.slice(0,10),
          status: a?.vacancy || 0 + " vacancy",
        };
      });
    }
    return [];
  }, [postedJobIntershipDetails])

  const columns: ColumnsType<DataType> = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text: any) => {
        return (
          <div className="cursor-pointer" onClick={() => {setSelectedJobId(text?.id); setSelectedActiveTab("Resume")}}>{text?.title}</div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "profile",
    },
    {
      title: "No Of Applicants",
      dataIndex: "no_of_applicants",
      key: "no_of_applicants",
    },
    {
      title: "Posted on",
      key: "posted_on",
      dataIndex: "posted_on",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        let bg_color = "rgba(40, 104, 197, 0.1)";
        if (text === "Posted on") {
          bg_color = "rgba(166, 166, 166, 0.13)";
        }
        return (
          <Tag
            color={bg_color}
            className={text === "Position Filled" ? "filled_tag" : ""}
          >
            {text}
          </Tag>
        );
      },
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
