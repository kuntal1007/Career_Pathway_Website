import React from "react";
import { Route, Routes } from "react-router-dom";
import CareerPathSCP from "../container/CareerPath-scp";
import TrainingInformation from "../container/CareerPath-scp/TrainingInfomation";
// import Pricing from "../container/pricing";
import AspirantDashboard from "../container/dashboard/AspirantDashboard";
import CompanyDashboard from "../container/dashboard/CompanyDashboard";
import SCPCreatePost from "../container/dashboard/create-post/scp/SCPCreatePost";
import JobCreatePost from "../container/dashboard/create-post/job/JobCreatePost";
import {
  AspirantProtectedRoute,
  CompanyProtectedRoute,
  ProtectedRoute,
} from "./ProtectedRoute";
import CareerPathJob from "../container/CareerPath-job";
import JobDescription from "../container/CareerPath-job/JobDescription";
import { useSelector } from "react-redux";
import ChangePassword from "../container/auth/change-password";
import SavedJobs from "../container/saved-job";
// import Payment from "../container/payment";
import SavedSCP from "../container/saved-scp";

const ContentRoutes = () => {
  const isCompanyLogin = useSelector((state: any) => state?.auth?.company);
  return (
    <ProtectedRoute>
      <Routes>
        
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/saved-job" element={<SavedJobs />} />
        <Route path="/saved-scp" element={<SavedSCP />} />
        <Route
          path="/training-information/:id"
          element={<TrainingInformation />}
        />
        <Route path="/job-description/:id" element={<JobDescription />} />
        
        <Route
          path="/company-dashboard"
          element={
            <CompanyProtectedRoute>
              <CompanyDashboard />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/create-scp-post"
          element={
            <CompanyProtectedRoute>
              <SCPCreatePost />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/create-job-post"
          element={
            <CompanyProtectedRoute>
              <JobCreatePost />
            </CompanyProtectedRoute>
          }
        />
        <Route
          path="/aspirant-dashboard"
          element={
            <AspirantProtectedRoute>
              <AspirantDashboard />
            </AspirantProtectedRoute>
          }
        />
      </Routes>
    </ProtectedRoute>
  );
};

export default ContentRoutes;
