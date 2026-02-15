import React, { useState } from "react";
import styled from "styled-components";

const LoadingAnimationWrapper = styled.div`
	.progress-bar {
		position: relative;
		top: 4px;
		height: 13px;
		width: 180px;
		background: white;
		border-radius: 25px;
		border: 1px solid #2868C5;
		box-shadow: 0 0 32px transparent;
	}

	.progress-fill {
		position: absolute;
		height: 12.4px;
		width: 0%;
		top: -0.8px;
		left: -1px;
		animation: progress-forward 3s infinite;
		background: rgb(34, 193, 195);
		background: linear-gradient(
			90deg,
			rgba(34, 193, 195, 1) 0%,
			rgba(45, 63, 253, 1) 100%
		);
		border-radius: 15px;
	}

	@keyframes progress-forward {
		0% {
			width: 0%;
		}
		25% {
			width: 50%;
		}
		50% {
			width: 75%;
		}
		75% {
			width: 85%;
		}
		100% {
			width: 100%;
		}
	}
`;

const LoadingAnimation = () => {
  return (
    <LoadingAnimationWrapper>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </LoadingAnimationWrapper>
  );
};

export default LoadingAnimation;
