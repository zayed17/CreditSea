import React from "react";
import { Card, Typography, Statistic, Row, Col, Space } from "antd";

const { Title, Text } = Typography;

interface CreditSummaryProps {
  name: string;
  mobilePhone: string;
  pan: string;
  creditScore: number;
}

const getCreditScoreColor = (score: number) => {
  if (score >= 750) return "#52c41a";
  if (score >= 650) return "#faad14";
  return "#f5222d";
};

const CreditSummary: React.FC<CreditSummaryProps> = ({ name, mobilePhone, pan, creditScore }) => {
  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Title level={2}>Credit Report</Title>
          <Space direction="vertical">
            <Text strong style={{ fontSize: 18 }}>Name: {name}</Text>
            <Space>
              <Text>Mobile: {mobilePhone}</Text>
              <Text>PAN: {pan}</Text>
            </Space>
          </Space>
        </Col>
        <Col xs={24} md={8}>
          <Statistic
            title="Credit Score"
            value={creditScore}
            valueStyle={{ color: getCreditScoreColor(creditScore), fontSize: 36 }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CreditSummary;
