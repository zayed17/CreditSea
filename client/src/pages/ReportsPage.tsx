import { useParams ,useNavigate} from "react-router-dom";
import { useGetReportByIdQuery } from "../api/creditApi";
import { Space, Spin, Alert } from "antd";
import CreditSummary from "../components/CreditSummary";
import AccountCharts from "../components/AccountCharts";
import CreditTable from "../components/CreditTable";
import Button from "../components/Button";

const ReportsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { data: report, isLoading, error } = useGetReportByIdQuery(id || "");

  if (isLoading) return <Spin size="large" style={{ display: "block", margin: "48px auto" }} />;
  if (error) return <Alert message="Error" description="Failed to load report. Please try again." type="error" style={{ margin: "24px" }} />;

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <CreditSummary {...report} />
        <AccountCharts reportSummary={report.reportSummary} />
        <CreditTable creditAccounts={report.creditAccounts} />
        <Button onClick={() => navigate("/")} text="Upload Another Report" />
      </Space>
    </div>
  );
};

export default ReportsPage;
