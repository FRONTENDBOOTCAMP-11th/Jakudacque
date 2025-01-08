export const PRODUCT_KEYS = {
  name: "상품명",
  price: "가격",
  quantity: "재고",
  content: "상품 설명",
  shippingFees: "배송비",
  mainImages: "상품 이미지",
  category: "카테고리",
  isNew: "신상품 여부",
  isBest: "베스트 상품 여부",
};
export const CODE_KEYS = {
  productCategory: "상품 카테고리",
  orderState: "주문 상태",
  membershipClass: "회원 등급",
};
export const IMAGE_URL_PREFIX = "https://11.fesp.shop";

const CURRENT_YEAR = new Date().getFullYear();
const DAY_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

export { CURRENT_YEAR, DAY_OF_WEEK };
