import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import DropDown_icon from "../../../assets/images/Form/dropdown_icon.svg";

interface Props {
  label: string;
  options: any;
  isDisabled?: boolean;
  labelClassname?: string;
  inputClassname?: string;
  dropdownclassName?: string;
  setFormData?: any;
  value?: any;
  isOneSelect?: boolean;
}

const DropDownWrapper = styled.div`
  .input-style {
    max-width: 404px;
    width: 100%;
    padding-right: 40px;
    min-height: 50.6px;
    flex-wrap: wrap;
  }
  .input-style:focus-visible {
    border: 2px solid #e0dfdf;
    outline: none;
  }
  .input-icon {
    top: 45.5px;
    right: 18px;
  }
  .dropdown-option {
    z-index: 9999;
    border: 2px solid #e0dfdf;
    width: 99.7%;
    border-radius: 0 0 8px 8px;
    border-top: 1px solid #e0dfdf;
  }
  .dropdown-option input{
    border: 1px solid #e0dfdf;
    border-radius: 8px;
    margin: 6px 8px;
    width: 95%;
  }
  .dropdown-option input:focus-visible{
    outline: 0;
  }
  .dropdown-option ul {
    list-style: none;
    max-height: 170px;
    overflow: auto;
    padding-left: 0;
    margin: 5px 15px 10px 15px;
  }
  .dropdown-option ul::-webkit-scrollbar {
    width: 8px;
  }
  .dropdown-option ul::-webkit-scrollbar-thumb {
    background-color: #376fc2;
    border-radius: 10px;
    outline: 1px solid slategrey;
  }
  .dropdown-option ul li {
    padding: 8px 8px;
  }
  .dropdown-option ul li:hover {
    padding: 8px 8px;
    background: rgba(40, 104, 197, 0.1);
  }
  .rotated-img {
    transform: rotate(180deg);
  }
  .disable-input {
    opacity: 0.3;
    pointer-events: none;
  }
  .open-options {
    border-radius: 8px 8px 0 0;
    border-bottom: none;
  }
  @media only screen and (max-width: 780px) {
    .label{
      font-size: 14px;
    }
    .input-style{
      font-size: 14px;
      min-height: 47px;
    }
    .input-icon {
      top: 37.5px;
      right: 18px;
    }
    ul li{
      font-size: 14px;
    }
  }
`;

const DropDown = ({
  labelClassname = "",
  inputClassname = "",
  label,
  options,
  isDisabled,
  setFormData,
  value,
  isOneSelect,
  dropdownclassName
}: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[] | any>([]);
  const [search, setSearch] = useState("")

  const optionData = useMemo(() => {
      if (!search) {
        return options;
      } else {
        return options.filter((item: any) => {
          return (
            item.toLowerCase().includes(search.toLowerCase())
          );
        });
      }
  }, [search, options]);

  useEffect(() => {
    setSelectedValues(value);
  },[value])

  const handlerSelectedValues = (data: string) => {
    if(isOneSelect){
      setSelectedValues(data);
      setFormData(data);
    }else{
      setSelectedValues([...selectedValues, data]);
      setFormData([...selectedValues, data]);
      const isExits = selectedValues.includes(data);
      if(isExits){
        const filterdValues = selectedValues && selectedValues.filter((val: string) => val !== data);
        setSelectedValues(filterdValues);
        setFormData(filterdValues)
      }
    }
  };

  const inputField = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isDropDownOpen && inputField.current && !inputField.current.contains(e.target)) {
        setIsDropDownOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isDropDownOpen])

  return (
    <DropDownWrapper>
      <div ref={inputField}>

      <div
        className={`${
          isDisabled ? "disable-input" : ""
        } relative ${inputClassname}`}
      >
        <div className={`${labelClassname} font-18 normal-text pb8 label`}>
          {label}
        </div>
        <div onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
          <div
            className={`flex gap8 input-style cursor-pointer bordercolor--border border2 ${dropdownclassName} ${
              !isDropDownOpen ? "br8" : "open-options"
            } font-18 normal-text px10 py12`}
          >
            {isOneSelect && value ? (
              <div className="px16 py4 br40 primary white--text font-12">
                {value}
              </div>
            ) : (
              selectedValues &&
              selectedValues?.map((value: string) => (
                <div className="px16 py4 br40 primary white--text font-12">
                  {value}
                </div>
              ))
            )}
          </div>
          <img
            src={DropDown_icon}
            alt=""
            className={`${
              isDropDownOpen ? "rotated-img" : ""
            } input-icon absolute cursor-pointer`}
          />
        </div>
        {isDropDownOpen && (
          <div className="absolute white dropdown-option">
            <input type="search" placeholder="Search..." className="py6 px10" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <ul>
              {optionData &&
                optionData.map((data: string) => (
                  <li
                    className="cursor-pointer font-16"
                    onClick={() => {
                      handlerSelectedValues(data);
                      {isOneSelect && setFormData(data)};
                    }}
                  >
                    {data}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
            </div>
    </DropDownWrapper>
  );
};

export default DropDown;
