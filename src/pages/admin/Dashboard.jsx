import { TableTitle } from "@components/AdminTable";
import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "2025.01.04", order: 1000 },
  { name: "2025.01.05", order: 300 },
  { name: "2025.01.06", order: 200 },
  { name: "2025.01.07", order: 278 },
  { name: "2025.01.08", order: 189 },
  { name: "2025.01.09", order: 239 },
  { name: "2025.01.10", order: 349 },
];

const renderLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        style={{ width: "100%" }}
      >
        <Line type="monotone" dataKey="order" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default function AdminHome() {
  const [period, setPeriod] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {}, [period]);

  useEffect(() => {
    const today = new Date(); // 현재 날짜
    const oneWeekAgo = new Date(); // 현재 날짜를 복사

    oneWeekAgo.setDate(today.getDate() - 7); // 일주일 전으로 설정

    // yyyy-mm-dd 형식으로 변환
    const formatDate = date => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // 기본 기간 7일로 설정 yyyy-mm-dd
    setPeriod({
      startDate: formatDate(oneWeekAgo),
      endDate: formatDate(today),
    });
  }, []);

  return (
    <>
      <TableTitle>대시보드</TableTitle>
      {/* date-input */}
      <div className="flex items-center gap-4 mt-4">
        <input
          type="date"
          name="시작일"
          id=""
          className="p-2 border rounded"
          value={period.startDate}
          onChange={e => setPeriod({ ...period, startDate: e.target.value })}
        />
        <span>~</span>
        <input
          type="date"
          name="종료일"
          id=""
          className="p-2 border rounded"
          value={period.endDate}
          onChange={e => setPeriod({ ...period, endDate: e.target.value })}
        />
      </div>
      <div className="w-full chart">{renderLineChart()}</div>
    </>
  );
}
