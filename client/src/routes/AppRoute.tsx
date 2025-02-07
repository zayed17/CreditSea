import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadXML from "../components/UploadXML";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadXML />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
