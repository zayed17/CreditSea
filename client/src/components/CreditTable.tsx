import React from "react";
import { Table, Typography, Card } from "antd";

const { Text } = Typography;

interface CreditTableProps {
  creditAccounts: {
    bankName: string;
    address: string;
    accountNumber: string;
    amountOverdue: number;
    currentBalance: number;
  }[];
}

const CreditTable: React.FC<CreditTableProps> = ({ creditAccounts }) => {
  const columns: any = [
    { title: "Bank", dataIndex: "bankName", key: "bankName" },
    { title: "Address", dataIndex: "address", key: "address" }, // ✅ Added Address Column
    { title: "Account Number", dataIndex: "accountNumber", key: "accountNumber" },
    {
      title: "Balance",
      dataIndex: "currentBalance",
      key: "balance",
      align: "right",
      render: (value: number) => `₹${value}`,
    },
    {
      title: "Overdue",
      dataIndex: "amountOverdue",
      key: "overdue",
      align: "right",
      render: (value: number) => <Text type="danger">₹{value}</Text>,
    },
  ];

  return (
    <Card title="Credit Accounts">
      <Table
        columns={columns}
        dataSource={creditAccounts}
        rowKey={(_, index) => index !== undefined ? index.toString() : ''}
        pagination={false}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default CreditTable;
