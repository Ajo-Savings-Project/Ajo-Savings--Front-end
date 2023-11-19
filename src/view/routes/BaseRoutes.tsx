/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";
import NotFound from "../pages/NotFoundPage";
import DashboardLayout from "../../components/layout/DashboardLayout ";
import Dashboard from "../pages/dashboard/Dashboard";
import Savings from "../pages/savings/Savings";
import Groups from "../pages/groups/Groups";
import Transactions from "../pages/transactions/Transactions";
import Settings from "../pages/settings/Settings";
import LoginPage from "../pages/loginpage/LoginPage";
import SingleTarget from "../pages/SingleTarget /SingleTarget";
import WithdrawSuccess from "../pages/SingleTarget /WithdrawSuccess";
import FundSuccess from "../pages/SingleTarget /FundSuccess";
import { AddTarget } from "../../components/AddTarget";
import LandingPage from "../pages/landingpage/Landingpage";
import ResetPassword from "../pages/resetPasswordPage/ResetPasswordPage";
import ConfirmPassword from "../pages/confirmPaswordPage/ConfirmPasswordPage";
import ExploreGroups from "../pages/ExploreGroups";
import GroupFlow from "../pages/groups/groupflowPage";
import CreateGroup from "../../components/CreateGroup.tsx";
import SingleGroupPage from "../../components/singleGroupPage/SingleGroupPage.tsx";
import NonGroup from "../../components/NonGroup.tsx";
import SavingsRender from "../pages/savings/SavingsRender.tsx";

import { Target } from "../../components/Target";
import Signup from "../pages/Signup";
import ViewGroup from "../pages/ViewGroup.tsx";
import Logout from "../pages/logout/Logout.tsx";
import KYC from "../pages/KYC/KYC.tsx";
import AddMoneyModal from "../../components/AddMoneyModal.tsx"
import OtpPage from "../pages/OtpPage.tsx";
import PaymentVerification from "../pages/payment-verificatin.tsx"


export const BaseRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="layout" element={<DashboardLayout />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/confirmPassword" element={<ConfirmPassword />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactionpage" element={<Transactions />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addtarget" element={<AddTarget />} />
          <Route path="/fundSuccess" element={<FundSuccess />} />
          <Route path="/withdrawSuccess" element={<WithdrawSuccess />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/target"
            element={
              <Target
                onClose={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp-page" element={<OtpPage />} />
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="groups" element={<Groups />} />
            <Route path="settings" element={<Settings />} />
            <Route path="exploregroups" element={<ExploreGroups />} />
            <Route path="groupflow" element={<GroupFlow groupId={""} />} />
            <Route path="viewgroups/:id" element={<ViewGroup />} />
            <Route path="singlegroup/:id" element={<SingleGroupPage />} />
            <Route path="nongroup" element={<NonGroup />} />
            <Route path="savings" element={<SavingsRender />} />
            <Route path="addMoney" element={<AddMoneyModal
            />} />
            <Route path="singleTarget/:id" element={<SingleTarget />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="exploregroups" element={<ExploreGroups />} />
            <Route path="logout" element={<Logout />} />
            <Route path="verify-payment" element={<PaymentVerification />} />


            {/* <Route path="viewgroups" element={<ViewGroup />} /> */}
            <Route path="kyc" element={<KYC />} />

            <Route
              path="create-group"
              element={
                <CreateGroup />
              }
            />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};
