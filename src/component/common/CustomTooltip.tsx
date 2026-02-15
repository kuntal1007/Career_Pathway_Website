import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CustomTooltipWrapper = styled.div`
  .tooltip--container {
    left: 3px;
    bottom: 75px;
  }
  .custom-tooltip {
    height: 72px;
    /* width: 170px; */
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 22px;
  }
  .triangle {
    position: relative;
    float: left;
    width: 0;
    height: 0;
    border-style: solid;
  }
  .triangle-bottom {
    border-width: 20px 11px 0 11px;
    border-color: #2868c5 transparent transparent transparent;
    left: 45%;
  }
`;

const CustomTooltip = ({ text, onClick }: Props) => {
  return (
    <CustomTooltipWrapper>
      <div className="tooltip--container absolute full-width cursor-pointer" onClick={onClick}>
        <div className="custom-tooltip br8 pa10 text-center full-width primary font-14 white--text">
          {text}
        </div>
        <div className="triangle triangle-bottom absolute"></div>
      </div>
    </CustomTooltipWrapper>
  );
};

export default CustomTooltip;
