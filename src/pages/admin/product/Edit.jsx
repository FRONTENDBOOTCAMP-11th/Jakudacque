import tw from "tailwind-styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useState, useEffect } from "react";
import { TableTitle } from "@components/AdminTable";
import Spinner from "@components/Spinner";
import InputGroup from "@components/InputGroup";
import InputToggle from "@components/InputToggle";
import { PRODUCT_KEYS } from "@constants/admin";

export default function Edit() {
  const [product, setProduct] = useState({
    name: "상품명", // 상품명(필수)
    price: 0, // 상품 가격(필수)
    quantity: 0, // 상품 수량(필수)
    content: "상품 설명", // 상품 설명(필수)
    shippingFees: 0, // 배송비
    mainImages: [], // 상품 이미지
    extra: {
      category: [], // 카테고리
      isNew: false, // 신상품 여부
      isBest: false, // 베스트 상품 여부
    },
    show: true, // 상품 노출 여부
  });

  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const { _id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["productItem"],
    // 로그인 기능 완성 후 /seller/products로 변경
    queryFn: () => axios.get(`/seller/products/${_id}`),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  // 상품 정보가 로드되면 상품 정보를 상태에 반영
  useEffect(() => {
    if (data) {
      const newProduct = { ...product };
      for (const key in product) {
        if (data.item[key]) {
          newProduct[key] = data.item[key];
        }
      }
      console.log(newProduct);

      setProduct(newProduct);
    }
  }, [data]);

  // 상품 수정 시 상품 목록 캐시를 무효화
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("productItem");
    };
  }, [_id]);

  // 상품 데이터 변경 시 상태 업데이트
  const handleChange = (e, key) => {
    const newData = { ...product };
    newData[key] = e.target.value;
    setProduct(newData);
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
      <TableTitle>상품 관리</TableTitle>
      <div className="grid grid-cols-12 my-8">
        <div className="col-span-5">
          <InputToggle
            label="노출여부"
            checked={product.show}
            onChange={e => setProduct({ ...product, show: e.target.checked })}
          />
          {Object.keys(product).map(key => {
            if (
              key !== "content" &&
              (typeof product[key] === "string" ||
                typeof product[key] === "number")
            ) {
              return (
                <InputGroup
                  key={key}
                  id={key}
                  label={PRODUCT_KEYS[key]}
                  placeholder={PRODUCT_KEYS[key]}
                  value={product[key]}
                  onChange={e => handleChange(e, key)}
                />
              );
            } else {
              // return (
              //   <InputGroup
              //     key={key}
              //     id={key}
              //     label={key}
              //     placeholder={key}
              //     value={product[key]}
              //     onChange={e => handleChange(e, key)}
              //   />
              // );
              return null;
            }
          })}
          {/* <InputGroup
            id="name"
            label="상품명"
            placeholder="상품명을 입력하세요."
            value={product.name}
            onChange={e => handleChange(e, "name")}
          /> */}
        </div>
      </div>
    </>
  );
}
