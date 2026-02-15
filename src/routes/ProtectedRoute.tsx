import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
	const isLogin = useSelector((state: any) => state?.auth?.isLogin);
	if (!isLogin) {
		return <Navigate to="/" />;
	}
	return children;
};

export const CompanyProtectedRoute = ({ children }: any) => {
  const isCompanyLogin = useSelector((state: any) => state?.auth?.company);
  if (!isCompanyLogin) {
    return <Navigate to="/" />;
  }
  return children;
};

export const AspirantProtectedRoute = ({ children }: any) => {
  const isUserLogin = useSelector((state: any) => state?.auth?.user);
  if (!isUserLogin ) {
    return <Navigate to="/" />;
  }
  return children;
};

export const UnProtectedRoute = ({ children }: any) => {
	const isLogin = useSelector((state: any) => state?.auth?.isLogin);
	if (isLogin) {
		return <Navigate to="/" />;
	}
	return children;
};

