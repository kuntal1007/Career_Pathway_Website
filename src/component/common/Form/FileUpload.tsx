import React, { useState } from "react";
import styled from "styled-components";
import LoadingAnimation from "../LoadingAnimation";

interface Props {
  label: string;
  labelClassname?: string;
  inputClassname?: string;
  accept?: string;
  onChange?: any;
  isLoader?: boolean;
  LoaderVal?: string;
}

const FileUploadWrapper = styled.div`
  .input-style {
    width: 100%;
		background: rgba(40, 104, 197, 0.13);
		z-index: 999;
		border: 1px dashed #2868C5;
  }
  .input-style:focus-visible {
    border: 2px solid #e0dfdf;
    outline: none;
  }
  .input-style::-webkit-file-upload-button {
    display: none;
  }
  input[type="file"] {
    color: rgba(0, 0, 0, 0);
  }
  .input-icon {
    top: 43.5px;
    right: 18px;
  }
  .file_label {
    color: #7b7777;
		margin: auto;
		left: 0;
		right: 0;
		top: 14px;
		z-index: 0;
    text-align: center;
    text-align: -webkit-center;
  }
  @media only screen and (max-width: 780px) {
    .label{
      font-size: 14px;
    }
    .file_label{
      font-size: 14px;
    }
    .input-style{
      padding: 10px 10px;
    }
  }
`;

const FileUpload = ({
  labelClassname = "",
  inputClassname = "",
  label,
  accept,
  onChange,
  isLoader,
  LoaderVal,
}: Props) => {
  return (
    <FileUploadWrapper>
      <div className="relative">
        <div className={`${labelClassname} font-18 normal-text pb8 label`}>
          {label}
        </div>
        <div className="relative">
          <input
            accept={accept}
            type="file"
            onChange={onChange}
            className={`${inputClassname} relative cursor-pointer input-style br8 font-18 normal-text px10 py12`}
          />
          {isLoader && LoaderVal === label ?
            <div className="normal-text file_label absolute text-center">
              <LoadingAnimation />
            </div> :
            <span className="font-14 normal-text file_label absolute text-center">
              Drag & drop or <span className="primary--text">browse</span>
            </span>
          }
        </div>
      </div>
    </FileUploadWrapper>
  );
};

export default FileUpload;
