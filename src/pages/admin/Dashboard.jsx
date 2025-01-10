import { TableTitle } from "@components/AdminTable";
import { useEffect, useMemo, useState } from "react";

export default function AdminHome() {
  const [period, setPeriod] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setPeriod({
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
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
    </>
  );
}
