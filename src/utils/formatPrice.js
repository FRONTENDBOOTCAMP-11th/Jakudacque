// 화폐 단위 표시된 가격으로 변경(10000 → 10,000)
export const formatPrice = price => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
