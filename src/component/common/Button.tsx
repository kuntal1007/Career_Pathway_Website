import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  classname: string;
	title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CommonButtonWrapper = styled.div``;

const CommonButton = ({ classname, title, onClick }: Props) => {
  return (
    <CommonButtonWrapper>
      <button className={`${classname} cursor-pointer`} onClick={onClick}>{title}</button>
    </CommonButtonWrapper>
  );
};

export default CommonButton;
