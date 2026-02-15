import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  icon?: string;
  name?: string;
  isDisabled?: boolean;
	inputType?: React.HTMLInputTypeAttribute | undefined;
  labelClassname?: string;
  inputClassname?: string;
  onIconClick? : React.MouseEventHandler<HTMLImageElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
  labelrighttext?: string;
  limit?: number;
 }

const InputWrapper = styled.div`
  .input-style{
    width: 100%;
  }
	.input-style:focus-visible{
		border: 2px solid #E0DFDF;
		outline: none;
	}
  .input-icon{
    top: 43.5px;
    right: 18px;
  }
  .disable-input{
    opacity: 0.3;
    pointer-events: none;
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
  @media only screen and (max-width: 780px) {
    .label{
      font-size: 14px;
    }
    .optional-label{
      font-size: 11px;
    }
    .input-style{
      font-size: 14px;
    }
    .input-icon {
      top: 37.5px;
      right: 18px;
    }
  }
`;

const Input = ({ icon, name, value, limit, isDisabled, onClick, labelClassname = "", inputClassname = "", label, inputType, onIconClick, onChange, labelrighttext }: Props) => {
  return (
    <InputWrapper>
    <div className={`${isDisabled ? "disable-input" : ""} relative`}>
      <div className={`${labelClassname} font-18 normal-text pb8 label`}>{label}<span className="font-13 relative optional-label darkgray--text pl5">{labelrighttext}</span></div>
			<input type={inputType} max={limit} maxLength={limit} value={value} name={name} className={`${inputClassname} input-style bordercolor--border border2  br8 font-18 normal-text px10 py12`} onChange={onChange} onClick={onClick}/>
      {icon && <img src={icon} alt="" className="input-icon absolute cursor-pointer" onClick={onIconClick}/>}
    </div>
    </InputWrapper>
  );
};

export default Input;
