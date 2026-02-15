import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  options: {
    label: string;
    val: string | boolean | number;
  }[];
  labelClassname?: string;
  RadioButtonClassname?: string;
  onChange?: any;
  value?: string;
}

const RadioButtonWrapper = styled.div`
	.radiobox-style {
    margin: 1px 0 0 0;
    height: 20px;
    width: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  @media only screen and (max-width: 780px) {
    .label{
      font-size: 14px;
    }
    .content {
      font-size: 12px;
    }
    .radiobox-style{
      height: 16px;
      width: 16px;
    }
  }
`;

const RadioButton = ({
  label,
  options,
  labelClassname = "",
  RadioButtonClassname = "",
  onChange,
  value
}: Props) => {
  return (
    <RadioButtonWrapper>
      <div className="font-18 normal-text pb8 label">{label}</div>
      <div className={`${RadioButtonClassname} radiobox-container flex mb24`} onChange={onChange}>
        {options &&
          options.map((data: any, i) => (
            <div className="flex" key={i}>
              <input
                type="radio"
                value={data?.val}
                name="gender"
                className="radiobox-style br4"
                checked={data?.val === value}
                onChange={() => ""}
              />
              <span className="font-14 normal-text pl4 self-center content">
                {data?.label}
              </span>
            </div>
          ))}
      </div>
    </RadioButtonWrapper>
  );
};

export default RadioButton;
