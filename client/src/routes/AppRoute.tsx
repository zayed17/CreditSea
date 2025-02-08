import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "../pages/UploadPage";
import ReportsPage from "../pages/ReportsPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/reports/:id" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
