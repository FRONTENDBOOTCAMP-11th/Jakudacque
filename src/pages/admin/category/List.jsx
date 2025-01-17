import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useState, useEffect } from "react";
import { produce } from "immer";
import { TableTitle } from "@components/AdminTable";
import Button from "@components/Button";
import Spinner from "@components/Spinner";
import InputGroup from "@components/InputGroup";
import { IoAddOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Edit() {
  const [newCategory, setNewCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const axios = useAxiosInstance();
  const queryClient = useQueryClient();

  // 카테고리 코드 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["categoryList"],
    // 로그인 기능 완성 후 /seller/products로 변경
    queryFn: () => axios.get("codes/productCategory"),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  // 상품 정보가 로드되면 상품 정보를 상태에 반영
  useEffect(() => {
    if (data) {
      setCategoryList(data.item.productCategory.codes);
    }
  }, [data]);

  const handleAdd = () => {
    if (!newCategory) return;
    const lc = { ...categoryList[categoryList.length - 1] };
    const newList = produce(categoryList, draft => {
      draft.push({
        sort: lc.sort + 1,
        code: `PC${String(lc.sort + 1).padStart(2, "0")}`,
        value: newCategory,
        depth: 1,
      });
    });

    setCategoryList(newList);
    setNewCategory("");
  };

  // 데이터 변경 시 상태 업데이트
  const handleChange = (e, key) => {
    const value = e.target.value;
    const newList = produce(categoryList, draft => {
      const index = draft.findIndex(category => category.code === key);
      draft[index].value = value;
    });
    setCategoryList(newList);
  };
  // 카테고리 삭제
  const handleDelete = key => {
    const newList = categoryList.filter(category => category.code !== key);
    setCategoryList(newList);
  };

  // 카테고리 추가
  const saveChanged = async () => {
    console.log("categoryList", categoryList);

    const isConfirmed = confirm("카테고리 정보를 저장하시겠습니까?");
    if (!isConfirmed) return;
    try {
      await axios.put(`/admin/codes/productCategory`, {
        title: "상품 카테고리",
        codes: categoryList,
      });
      queryClient.invalidateQueries("categoryList");
      toast("카테고리 정보를 저장했습니다.");
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className="flex items-center justify-between gap-2">
        <TableTitle>카테고리 관리</TableTitle>
        <Button color="info" onClick={saveChanged}>
          저장
        </Button>
      </div>

      <div className="flex flex-col w-full gap-8 mt-8">
        {/* 신규 카테고리 */}
        <div>
          <h3 className="mb-2 text-lg font-bold">신규 카테고리</h3>
          <div className="flex items-center gap-2">
            <InputGroup
              id="newCategory"
              placeholder={"카테고리 이름"}
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            />
            <button
              className="p-1 border-2 border-neutral-500 rounded-lg btn"
              onClick={handleAdd}
            >
              <IoAddOutline size={24} />
            </button>
          </div>
        </div>

        {/* 카테고리 목록 */}
        <div>
          <h3 className="mb-2 text-lg font-bold">카테고리 목록</h3>
          <div className="flex flex-wrap w-full gap-2">
            {categoryList.map(category => (
              <div
                key={category.code}
                className="flex items-center gap-2 p-2 bg-neutral-300 rounded-lg"
              >
                <InputGroup
                  id={category.code}
                  value={category.value}
                  onChange={e => handleChange(e, category.code)}
                />
                <button
                  className="p-2 btn"
                  onClick={() => handleDelete(category.code)}
                >
                  <IoTrashOutline size={24} color="red" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
