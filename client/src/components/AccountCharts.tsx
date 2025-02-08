import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AccountChartsProps {
  reportSummary: {
    totalAccounts: number;
    activeAccounts: number;
    closedAccounts: number;
    currentBalance: number;
    securedAmount: number;
    unsecuredAmount: number;
    last7DaysEnquiries: number;
  };
}

const AccountCharts: React.FC<AccountChartsProps> = ({ reportSummary }) => {
  const chartData = [
    { name: "Total", value: reportSummary.totalAccounts },
    { name: "Active", value: reportSummary.activeAccounts },
    { name: "Closed", value: reportSummary.closedAccounts },
    { name: "Enquiries (7 days)", value: reportSummary.last7DaysEnquiries },
  ];

  return (
    <Card title="Account Overview">
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1890ff" />
            </BarChart>
          </ResponsiveContainer>
        </Col>

        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}><Statistic title="Total Accounts" value={reportSummary.totalAccounts} /></Col>
            <Col span={12}><Statistic title="Active Accounts" value={reportSummary.activeAccounts} /></Col>
            <Col span={12}><Statistic title="Closed Accounts" value={reportSummary.closedAccounts} /></Col>
            <Col span={12}><Statistic title="7-Day Enquiries" value={reportSummary.last7DaysEnquiries} /></Col>
            <Col span={12}><Statistic title="Current Balance" value={`₹${reportSummary.currentBalance}`} /></Col>
            <Col span={12}><Statistic title="Secured Amount" value={`₹${reportSummary.securedAmount}`} /></Col>
            <Col span={12}><Statistic title="Unsecured Amount" value={`₹${reportSummary.unsecuredAmount}`} /></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default AccountCharts;
