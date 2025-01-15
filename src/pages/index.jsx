import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Product from "@components/Product";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMemo } from "react";

// 메인베너 이미지
const mainBanner = [
  { image: "images/banner1.png", link: "/list" },
  { image: "images/banner2.png", link: "/list?category=BEST" },
  { image: "images/banner3.png", link: "/list?category=NEW" },
];

export default function Index() {
  const axios = useAxiosInstance();

  // 상품목록 조회 api
  const useProducts = (key, filter) =>
    useQuery({
      queryKey: [key],
      queryFn: async () => {
        const params = {
          custom: JSON.stringify(filter),
        };
        const response = await axios.get("/products", { params });
        return response.data;
      },
    });

  // Best Item 리스트 호출
  const { data: bestData } = useProducts("bestProductList", {
    "extra.isBest": true,
    show: true,
  });
  // New Item 리스트 호출
  const { data: newData } = useProducts("newProductList", {
    "extra.isNew": true,
    show: true,
  });

  // 호출된 리스트의 상품들 map으로 반환
  const mapProducts = useMemo(
    () => data =>
      data?.item?.map(item => ({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.mainImages?.[0]?.path
          ? `https://11.fesp.shop${item.mainImages[0].path}`
          : "",
        link: `/product/${item._id}`,
      })) || [],
    [],
  );

  const bestProducts = mapProducts(bestData);
  const newProducts = mapProducts(newData);

  // Best/New 상품 리스트 스와이퍼 공통으로 묶기
  const renderSlides = (title, products) => (
    <StyledSwiper>
      <div className="relative mt-20 mx-auto max-w-[1240px]">
        <h1 className="text-xl font-semibold">{title}</h1>
        <Swiper
          navigation={true}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={Math.min(products.length, 4)}
          slidesPerGroup={Math.min(products.length, 2)}
          modules={[Navigation, Autoplay]}
          className="w-full h-auto mt-8"
        >
          {products.map((product, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <Product product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </StyledSwiper>
  );

  return (
    <div className="h-full mb-20">
      {/* 메인베너 */}
      <StyledSwiper>
        <Swiper
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="w-full h-[200px] xl:h-[500px] lg:h-[400px] md:h-[400px] sm:h-[300px] mx-auto max-w-[1240px]"
        >
          {mainBanner.map((banner, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center text-center"
            >
              <Link to={banner.link}>
                <img
                  src={banner.image}
                  alt={`Slide ${index + 1}`}
                  className="block w-full h-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiper>
      {renderSlides("Best Item", bestProducts)} {/* 베스트제품 리스트 */}
      {renderSlides("New Item", newProducts)} {/* 신제품 리스트 */}
    </div>
  );
}

// Swiper 내부 클래스 재정의
const StyledSwiper = styled.div`
  .swiper-pagination-bullet {
    background-color: #fde047;
  }

  .swiper-pagination-bullet-active {
    background-color: #fde047;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #fde047;
  }
`;
