import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Header from "../../component/landing/Header";
import down_arrow from "../../assets/images/SCP/down_arrow.svg";
import search_icon from "../../assets/images/SCP/search_icon.svg";
import filter_icon from "../../assets/images/Dashboard/filter_icon.svg";
import close_icon from "../../assets/images/Dashboard/close_icon.svg";
import JobCard from "../../component/common/JobCard";
import { useGetAllScpQuery } from "../../redux/services/dashboard";
import CommonButton from "../../component/common/Button";
import { Pagination } from "antd";

const CareerPathSCPPageWrapper = styled.div`
  position: relative;
  .main--container {
    max-width: 1440px;
    margin: 0 auto;
  }
  .scp--section {
    padding: 135px 105px 52px 105px;
  }
  .scp-left-section {
    background: rgba(40, 104, 197, 0.04);
    max-width: 270px;
  }
  .checkbox-style {
    height: 20px;
    width: 20px;
    color: rgba(34, 34, 34, 0.4);
    background: rgba(40, 104, 197, 0.04) !important;
    margin: 0;
  }
  .search_bar {
    top: 40px;
    right: 105px;
  }
  .search-bar-style {
    background: rgba(40, 104, 197, 0.1);
    border-radius: 10px;
    letter-spacing: -0.408px;
    color: rgba(60, 60, 67, 0.6);
    border: none;
  }
  .search-bar-style:focus-visible {
    outline: none;
  }
  .search-bar-style::placeholder {
    color: rgba(60, 60, 67, 0.6);
    font-size: 17px;
  }
  .search-icon {
    top: 3px;
    left: 7px;
  }
  input[type="checkbox"] {
    accent-color: #2868c5;
    background: rgba(255, 255, 255, 0.4);
  }
  .rotated-arrow {
    transform: rotate(180deg);
  }
  .select-box {
    border: 1px solid #a6a6a6;
    border-radius: 40px;
  }
  .cards-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
  }
  .filter-btn-mobile-container, .scp-filter-mobile-section {
    display: none;
  }
  .pagination-container {
    bottom: -64px;
    right: 0;
  }
  .ant-pagination {
    display: flex;
  }
  @media (min-width: 880px) {
    .cards-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1300px) {
    .cards-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media only screen and (max-width: 1200px) {
    .scp--section {
      padding: 135px 40px 52px 40px;
    }
  }
  @media only screen and (max-width: 580px) {
    .scp--section {
      padding: 95px 16px 40px 16px;
    }
    .scp-left-section {
      display: none;
    }
    .search_bar {
      display: none;
    }
    .scp-filter-mobile-section {
      display: block;
      position: absolute;
      top: 62px;
      padding-bottom: 70px;
      background: #FFFFFF;;
      z-index: 998;
    }
    .filter-single-section{ 
      padding: 6px 8px;
      margin-bottom: 16px;
      background: rgba(40, 104, 197, 0.04);
      border-radius: 4px;
    }
    .filter-type-mobile{
      font-size: 14px;
    }
    .filter-data, .total-count, .select-box {
      font-size: 12px;
    }
    .checkbox-style {
      height: 15px;
      width: 15px;
    }
    .filter-btn-mobile-container {
      display: flex;
      position: fixed;
      bottom: 0;
      background-color: #ffffff;
      padding: 18px 0;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
      z-index: 999;
    }
    .filter-btn-mobile {
      display: flex;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
      border-radius: 26px;
      width: 109px;
      margin: 0 auto;
    }
    .cards-container{
      padding-bottom: 45px;
    }
    .close-icon{
      top: -46px;
      right: 20px;
    }
    .close-icon img{
      height: 24px;
      width: 24px;
    }
  }
`;

export const departments = [
  "IT Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Accounts",
  "Agriculture",
  "Civil Engineering",
  "Management",
  "MSC",
];

export const companyType = [
  "Foreign MNC",
  "Indian MNC",
  "Corporate",
  "Startup",
];

export const role = [
  "Network administrator",
  "User experience designer",
  "Systems analysts",
  "Database administrator",
  "Full-stack Developer",
  "Senior Software Engineer",
  "Data Scientist",
  "Cloud engineer",
  "IT security specialist",
  "Analytics Manager",
  "Director of Information Techonology",
  "Web developer",
  "Web administrator",
  "Manager",
  "CEO",
  "COO",
  "Network architecture",
  "Application Developer",
  "Accounts Assistant",
  "Accounting Technician",
  "Insurance Account Manager",
  "Accounts Executive",
  "Accountant",
  "Chartered Accountant",
  "Investment Analyst",
  "Digital Marketer",
  "Financial Adviser",
  "Credit Manager",
  "Fund Accounting",
  "Advertising Account Manager",
  "Account Manager(NAPS/NATS)",
  "Accounts & Tax (GST)",
  "Corporate Account Manager",
  "Accounts & Finance Executive",
  "Retail Account Manager",
  "Strategic Account Planner",
  "IC Design Engineer",
  "Electrical Technician",
  "Electrian",
  "Controls Engineer",
  "Test Engineer",
  "Electrical Project Manager",
  "Electrical Designer",
  "Sustainability Engineer",
  "Electrical Engineer",
  "Equipment Engineer",
  "Geotechnical Engineer",
  "Water Engineer",
  "Transport Engineer",
  "Architect",
  "Technologist",
  "Land Surveyor",
  "Inspectors and Regulatory Officers",
  "Social Media Manager",
  "Marketing Manager",
  "Human Resource Manager",
  "Sales Manager",
  "Operations Manager",
  "Credit Analyst",
  "Chief Executive",
  "Accounting Manager",
  "Finance Manager",
  "Architectural Manager",
  "Business Manager",
  "Team Management",
  "Management(HR)",
  "Digital Media",
  "Management Consultant",
  "Logistic Manager",
  "Brand Manager",
  "Event Manager",
  "Chemist",
  "Marine Biologist",
  "Financial Analyst",
  "Research Assistant",
  "Investment Analyst",
  "Clinical Psychologist",
  "Statistician",
  "Information Security",
  "Analyst Ecologist",
  "Quality Manager",
  "Actuary",
  "Data Scientist",
  "Cyber Security",
  "Big Data",
  "Artificial Intelligence",
  "Business Ethics",
  "Business Law",
  "Cloud Engineer",
];

export const postingDate = ["7 days", "15 days"];

const CareerPathSCP = () => {
  const [search, setSearch] = useState<string | number>("");
  const [mode, setMode] = useState("");
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const totalDepartmentLength = departments.length;
  const [departmentCount, setDepartmentCount] = useState<number>(5);
  const [onClickSortedType, setOnClickSortedType] = useState<string>("");
  const [isMobileFilterActive, setIsMobileFilterActive] = useState(false);
  const [selectedRoleCount, setSelectedRoleCount] = useState<number>(5);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("");
  const [searchRole, setSearchRole] = useState<string>("")
  const { data: allScpData } = useGetAllScpQuery({
    search: search,
    mode: mode,
    role: selectedRoleFilter,
    page: pageNo,
    limit: pageLimit
  });
  
  const roleData = useMemo(() => {
    if (!searchRole) {
      return role;
    } else {
      return role.filter((item: any) => {
        return (
          item.toLowerCase().includes(searchRole.toLowerCase())
        );
      });
    }
  }, [searchRole, role]);
    
  const totalRoleLength = roleData.length;

  // Add Debounce to search for performance and prevent to extra call
  const onSearchDebounce = useCallback((text: string | number) => {
    setTimeout(function () {
      setSearch(text);
    }, 1000);
  }, []);

  const onSearchTextChangeHandler = (text: string | number) => {
    onSearchDebounce(text);
  };

  return (
    <CareerPathSCPPageWrapper>
      <div className="absolute full-width z-99">
        <Header />
      </div>
      <div className="main--container full-width relative">
        <div className="search_bar z-99 absolute">
          <img src={search_icon} alt="" className="absolute search-icon" />
          <input
            type="search"
            placeholder="Search"
            className="search-bar-style br10 py7 pl36 pr8 font-17"
            onChange={(e) => onSearchTextChangeHandler(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap30 scp--section">
          <div className="scp-left-section pa16 full-width">
          <div className="pb56">
              <div className="flex justify-between">
                <div className="font-18 normal-text">Role</div>
                {onClickSortedType === "company" ? (
                  <img
                    src={down_arrow}
                    alt=""
                    className="rotated-arrow cursor-pointer"
                    onClick={() => setOnClickSortedType("")}
                  />
                ) : (
                  <img
                    src={down_arrow}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setOnClickSortedType("company")}
                  />
                )}
              </div>
              <input type="search" placeholder="Search..." className="search-input py6 px10 br4 mb12 mt10 font-14" value={searchRole} onChange={(e) => setSearchRole(e.target.value)}/>
              {onClickSortedType !== "company" &&
                roleData && roleData
                .filter((_, i) => i < selectedRoleCount)
                .map((role) => (
                  <div className="flex gap10 items-center pb12">
                    <input
                      type="checkbox"
                      className="checkbox-style cursor-pointer"
                      checked={selectedRoleFilter === role}
                      onChange={() => {selectedRoleFilter === role ? setSelectedRoleFilter("") : setSelectedRoleFilter(role)}}
                    />
                    <span className="font-14 normal-text">{role}</span>
                  </div>
                ))}
              {totalRoleLength !== selectedRoleCount &&
                onClickSortedType !== "department" && (
                  <div
                    className="font-14 bold-text primary--text cursor-pointer"
                    onClick={() => setSelectedRoleCount(totalRoleLength)}
                  >
                    {totalRoleLength < 5 ? " " : `${totalRoleLength - 5} + more`}
                  </div>
                )}
            </div>
            {/* <div className="pb56">
              <div className="flex justify-between pb18">
                <div className="font-18 normal-text">Department</div>
                {onClickSortedType === "department" ? (
                  <img
                    src={down_arrow}
                    alt=""
                    className="rotated-arrow cursor-pointer"
                    onClick={() => setOnClickSortedType("")}
                  />
                ) : (
                  <img
                    src={down_arrow}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setOnClickSortedType("department")}
                  />
                )}
              </div>
              {onClickSortedType !== "department" &&
                departments &&
                departments
                  .filter((_, i) => i < departmentCount)
                  .map((department) => (
                    <div className="flex gap10 items-center pb12">
                      <input
                        type="checkbox"
                        className="checkbox-style cursor-pointer"
                      />
                      <span className="font-14 normal-text">{department}</span>
                    </div>
                  ))}
              {totalDepartmentLength !== departmentCount &&
                onClickSortedType !== "department" && (
                  <div
                    className="font-14 bold-text primary--text cursor-pointer"
                    onClick={() => setDepartmentCount(totalDepartmentLength)}
                  >
                    {totalDepartmentLength - 5}+ more
                  </div>
                )}
            </div> */}
            <div className="pb56">
              <div className="flex justify-between pb18">
                <div className="font-18 normal-text">Company type</div>
                {onClickSortedType === "company" ? (
                  <img
                    src={down_arrow}
                    alt=""
                    className="rotated-arrow cursor-pointer"
                    onClick={() => setOnClickSortedType("")}
                  />
                ) : (
                  <img
                    src={down_arrow}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setOnClickSortedType("company")}
                  />
                )}
              </div>
              {onClickSortedType !== "company" &&
                companyType &&
                companyType.map((company) => (
                  <div className="flex gap10 items-center pb12">
                    <input
                      type="checkbox"
                      className="checkbox-style cursor-pointer"
                    />
                    <span className="font-14 normal-text">{company}</span>
                  </div>
                ))}
            </div>
            <div className="pb56">
              <div className="flex justify-between pb18">
                <div className="font-18 normal-text">Training posting date</div>
                {onClickSortedType === "training-date" ? (
                  <img
                    src={down_arrow}
                    alt=""
                    className="rotated-arrow cursor-pointer"
                    onClick={() => setOnClickSortedType("")}
                  />
                ) : (
                  <img
                    src={down_arrow}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setOnClickSortedType("training-date")}
                  />
                )}
              </div>
              <div className="flex gap10">
                {onClickSortedType !== "training-date" &&
                  postingDate &&
                  postingDate.map((day) => (
                    <div className="py8 px26 font-12 normal-text cursor-pointer select-box">
                      &lt; {day}
                    </div>
                  ))}
              </div>
            </div>
            <div className="pb56">
              <div className="flex justify-between pb18">
                <div className="font-18 normal-text">Training Mode</div>
                {onClickSortedType === "training-mode" ? (
                  <img
                    src={down_arrow}
                    alt=""
                    className="rotated-arrow cursor-pointer"
                    onClick={() => setOnClickSortedType("")}
                  />
                ) : (
                  <img
                    src={down_arrow}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setOnClickSortedType("training-mode")}
                  />
                )}
              </div>
              {onClickSortedType !== "training-mode" && (
                <div className="flex gap10">
                  <div
                    className="py8 px31 font-12 normal-text cursor-pointer select-box"
                    onClick={() => {
                      mode === "offline" ? setMode("") : setMode("offline");
                    }}
                  >
                    Offline
                  </div>
                  <div
                    className="py8 px32 font-12 normal-text cursor-pointer select-box"
                    onClick={() => {
                      mode === "online" ? setMode("") : setMode("online");
                    }}
                  >
                    Online
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative cards-container full-width fill-height gap30">
            {allScpData &&
              allScpData?.data &&
              allScpData?.data?.user?.map((job: any) => <JobCard job={job} />)}
            <div className="absolute pagination-container">
              <Pagination defaultCurrent={1} total={allScpData?.data?.total} onChange={(page, limit) => {setPageNo(page); setPageLimit(limit)}} showSizeChanger/>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-btn-mobile-container">
        {!isMobileFilterActive ? 
          <div className="filter-btn-mobile gap10 px23 py9" onClick={() => setIsMobileFilterActive(true)}>
            <img src={filter_icon} alt="filter" />
            <div className="font-16 normal-text">Filter</div>
          </div> :
          <div className="filter-apply-btn-mobile flex full-width justify-center gap10">
            <CommonButton classname="font-16 full-width semi-bold-text py13 px60 br8 primary--text white border1 primary--border" title="Reset"/>
            <CommonButton classname="font-16 full-width semi-bold-text py13 px60 br8 white--text primary border1 primary--border" title="Done" onClick={() => setIsMobileFilterActive(false)}/>
          </div>
        }
      </div>
      {isMobileFilterActive && (
        <div className="scp-filter-mobile-section pa16 full-width">
          <div className="absolute close-icon" onClick={() => setIsMobileFilterActive(false)}><img src={close_icon} alt="close"/></div>
          <div className="font-18 semi-bold-text pb20">Filter</div>
          <div className="pb56 filter-single-section">
            <div className="flex justify-between pb18">
              <div className="font-18 normal-text filter-type-mobile">Department</div>
            </div>
            {onClickSortedType !== "department" &&
              departments &&
              departments
                .filter((_, i) => i < departmentCount)
                .map((department) => (
                  <div className="flex gap10 items-center pb12">
                    <input
                      type="checkbox"
                      className="checkbox-style cursor-pointer"
                    />
                    <span className="font-14 normal-text filter-data">{department}</span>
                  </div>
                ))}
            {totalDepartmentLength !== departmentCount &&
              onClickSortedType !== "department" && (
                <div
                  className="font-14 bold-text primary--text cursor-pointer total-count"
                  onClick={() => setDepartmentCount(totalDepartmentLength)}
                >
                  {totalDepartmentLength - 5}+ more
                </div>
              )}
          </div>
          <div className="pb56 filter-single-section">
            <div className="flex justify-between pb18">
              <div className="font-18 normal-text filter-type-mobile">Company type</div>
            </div>
            {onClickSortedType !== "company" &&
              companyType &&
              companyType.map((company) => (
                <div className="flex gap10 items-center pb12">
                  <input
                    type="checkbox"
                    className="checkbox-style cursor-pointer"
                  />
                  <span className="font-14 normal-text filter-data">{company}</span>
                </div>
              ))}
          </div>
          <div className="pb56 filter-single-section">
            <div className="flex justify-between pb18">
              <div className="font-18 normal-text filter-type-mobile">Training posting date</div>
            </div>
            <div className="flex gap10">
              {onClickSortedType !== "training-date" &&
                postingDate &&
                postingDate.map((day) => (
                  <div className="py8 px26 font-12 normal-text cursor-pointer select-box">
                    &lt; {day}
                  </div>
                ))}
            </div>
          </div>
          <div className="pb56 filter-single-section">
            <div className="flex justify-between pb18">
              <div className="font-18 normal-text filter-type-mobile">Training Mode</div>
            </div>
            {onClickSortedType !== "training-mode" && (
              <div className="flex gap10">
                <div
                  className="py8 px31 font-12 normal-text cursor-pointer select-box"
                  onClick={() => {
                    mode === "offline" ? setMode("") : setMode("offline");
                  }}
                >
                  Offline
                </div>
                <div
                  className="py8 px32 font-12 normal-text cursor-pointer select-box"
                  onClick={() => {
                    mode === "online" ? setMode("") : setMode("online");
                  }}
                >
                  Online
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </CareerPathSCPPageWrapper>
  );
};

export default CareerPathSCP;
