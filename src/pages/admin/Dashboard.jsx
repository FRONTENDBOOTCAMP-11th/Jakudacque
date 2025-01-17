import { TableTitle } from "@components/AdminTable";
import { useEffect, useState, useMemo } from "react";
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

// 숫자 단위 축소 함수
const formatYAxis = value => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`; // 백만 단위
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`; // 천 단위
  return value;
};

// 라인 차트 렌더링 함수
const renderLineChart = (
  data,
  dataKey = "totalQuantity",
  color = "#8884d8",
) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        style={{ width: "100%" }}
      >
        <Line type="monotone" dataKey={dataKey} stroke={color} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        {/* Y축 포맷터와 너비 조정 */}
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip
          formatter={value => {
            if (dataKey === "totalSales") {
              return `${Number(value).toLocaleString()}원`;
            }
            return value;
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

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
    queryKey: ["orderStatistics", period.startDate, period.endDate],
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

  const total = useMemo(() => {
    if (!data) return { totalQuantity: 0, totalSales: 0 };

    return data.item.reduce(
      (acc, cur) => {
        return {
          totalQuantity: acc.totalQuantity + cur.totalQuantity,
          totalSales: acc.totalSales + cur.totalSales,
        };
      },
      { totalQuantity: 0, totalSales: 0 },
    );
  }, [data]);

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
        <>
          {/* totalQuantity */}
          <div className="w-full mt-8 chart">
            <h3 className="mb-2 text-lg font-bold">일일 주문량</h3>
            <p className="mb-2">총 주문량 : {total.totalQuantity}</p>
            {renderLineChart(data.item, "totalQuantity", "#7DD3FC")}
          </div>

          {/* totalSales */}
          <div className="w-full mt-8 chart">
            <h3 className="mb-2 text-lg font-bold">일일 주문금액</h3>
            <p className="mb-2">
              총 주문금액 : {Number(total.totalSales).toLocaleString()}원
            </p>
            {renderLineChart(data.item, "totalSales", "#C02365")}
          </div>
        </>
      )}
    </>
  );
}
