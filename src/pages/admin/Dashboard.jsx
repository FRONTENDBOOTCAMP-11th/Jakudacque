import { TableTitle } from "@components/AdminTable";
import { useEffect, useState } from "react";
import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminHome() {
  const [period, setPeriod] = useState({
    startDate: "",
    endDate: "",
  });

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

  const axios = useAxiosInstance();

  const { data, isLoading } = useQuery({
    queryKey: ["orderList", period.startDate, period.endDate],
    // 로그인 기능 완성 후 /seller/orders 로 변경
    queryFn: () =>
      axios.get("/admin/statistics/orders", {
        params: {
          // yyyy.mm.dd 형식으로 변환
          start: period.startDate.replace(/-/g, "."),
          finish: period.endDate.replace(/-/g, "."),
          by: "day",
        },
      }),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <Spinner />
      </div>
    );
  }
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  const renderLineChart = () => {
    return (
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data.item}
          label="일일 주문량"
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          style={{ width: "100%" }}
        >
          <Line type="monotone" dataKey="totalQuantity" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );
  };

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

      {data && (
        <div className="w-full mt-8 chart">
          <h3 className="mb-2 text-lg font-bold">일일 주문량</h3>
          {renderLineChart()}
        </div>
      )}
    </>
  );
}
