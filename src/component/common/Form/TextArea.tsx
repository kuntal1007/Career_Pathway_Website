import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  labelClassname?: string;
  inputClassname?: string;
  value?: string;
  onChange?: any;
  labelrighttext?: string;
 }

const TextAreaWrapper = styled.div`
  .input-style{
    max-width: 100%;
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
  .input-style::-webkit-scrollbar {
    width: 10px;
  }
  .input-style::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
  }
  .input-style::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: darkgrey;
    outline: 1px solid slategrey;
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
  }
`;

const TextArea = ({ labelClassname = "", inputClassname = "", label, value, onChange, labelrighttext }: Props) => {
  return (
    <TextAreaWrapper>
    <div className="relative">
      <div className={`${labelClassname} font-18 normal-text pb8 label`}>{label}<span className="font-13 relative optional-label darkgray--text pl5">{labelrighttext}</span></div>
			<textarea value={value} onChange={onChange} className={`${inputClassname} input-style bordercolor--border border2  br8 font-18 normal-text px10 py12`}/>
    </div>
    </TextAreaWrapper>
  );
};

export default TextArea;
