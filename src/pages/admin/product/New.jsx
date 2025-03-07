import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useState, useEffect, useMemo } from "react";
import useCodeStore from "@zustand/codeStore";
import { produce } from "immer";
import { TableTitle } from "@components/AdminTable";
import Button from "@components/Button";
import InputGroup from "@components/InputGroup";
import InputToggle from "@components/InputToggle";
import InputSelect from "@components/InputSelect";
import ImageUploader from "@components/ImageUploader";
import QuillEditor from "@components/QuillEditor";
import { PRODUCT_KEYS, IMAGE_URL_PREFIX } from "@constants/admin";

export default function New() {
  const [product, setProduct] = useState({
    name: "", // 상품명(필수)
    price: 0, // 상품 가격(필수)
    quantity: 99999, // 상품 수량(필수)
    content: "", // 상품 설명(필수)
    shippingFees: 3000, // 배송비
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
  const navigate = useNavigate();

  // 카테고리 코드 데이터 가져오기
  const { codes } = useCodeStore();
  const selectOptions = useMemo(() => {
    if (!codes) return [];
    return Object.keys(codes.productCategory).map(key => ({
      value: key,
      label: codes.productCategory[key],
    }));
  }, [codes]);

  // 코드 데이터가 로드되면 상품 카테고리 초기값 설정
  useEffect(() => {
    if (selectOptions.length > 0) {
      const newProduct = { ...product };
      newProduct.extra.category = [selectOptions[0]?.value];
      setProduct(newProduct);
    }
  }, [selectOptions]);

  // 상품 데이터 변경 시 상태 업데이트
  const handleChange = (e, key) => {
    const newData = { ...product };
    // 숫자 입력 필드는 숫자만 입력되도록 제한
    switch (key) {
      case "price":
      case "quantity":
      case "shippingFees":
        newData[key] = e.target.value.replace(/[^0-9]/g, "");
        break;
      default:
        newData[key] = e.target.value;
    }
    setProduct(newData);
  };

  // mainImages 상태 업데이트
  const setMainImage = data => {
    setProduct(prev =>
      produce(prev, draft => {
        if (!data) {
          draft.mainImages = [];
          return;
        }
        draft.mainImages = [data];
      }),
    );
  };

  // 상품 저장
  const saveProduct = async () => {
    try {
      await axios.post(`/seller/products`, product);
      // 상품 목록 캐시 무효화
      queryClient.invalidateQueries("productList");
      navigate("/admin/product");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableTitle>상품 관리</TableTitle>
      <div className="flex items-center justify-end gap-2">
        <Button color="warning" onClick={() => navigate(-1)}>
          목록
        </Button>
        <Button color="info" onClick={saveProduct}>
          저장
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-4 my-8">
        {/* 토글 속성들 */}
        <div className="flex items-center col-span-12 gap-4 mb-4">
          <InputToggle
            label="노출여부"
            checked={product.show}
            onChange={e => setProduct({ ...product, show: e.target.checked })}
          />
          <InputToggle
            label="신상품"
            checked={product.extra.isNew}
            onChange={e =>
              setProduct({
                ...product,
                extra: { ...product.extra, isNew: e.target.checked },
              })
            }
          />
          <InputToggle
            label="베스트 상품"
            checked={product.extra.isBest}
            onChange={e =>
              setProduct({
                ...product,
                extra: { ...product.extra, isBest: e.target.checked },
              })
            }
          />
        </div>
        {/* left */}
        <div className="col-span-6">
          {/* category */}
          {codes?.productCategory && (
            <InputSelect
              id="category"
              label="카테고리"
              value={product.extra.category[0]}
              options={selectOptions}
              onChange={e =>
                setProduct({
                  ...product,
                  extra: { ...product.extra, category: [e.target.value] },
                })
              }
            />
          )}

          {/* input-Group */}
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
                  value={product[key].toString()}
                  onChange={e => handleChange(e, key)}
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        {/* right */}
        {/* 이미지 업로드 */}
        <div className="col-span-6 col-start-7">
          <ImageUploader
            imgUrl={
              product?.mainImages[0]?.path &&
              IMAGE_URL_PREFIX + product?.mainImages[0].path
            }
            setMainImage={setMainImage}
          />
        </div>

        {/* QuillEditor */}
        <QuillEditor
          content={product.content}
          setContent={value => {
            setProduct(prev =>
              produce(prev, draft => {
                draft.content = value;
              }),
            );
          }}
        />
      </div>
    </>
  );
}
