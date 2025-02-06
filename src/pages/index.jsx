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
import { useMemo, useState } from "react";
import CartModal from "@components/CartModal";

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
        id: String(item._id),
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

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Best/New 상품 리스트 스와이퍼 공통으로 묶기
  const renderSlides = (title, products) => {
    const isLoopEnabled = products.length > 4; // 조건적으로 loop 설정
    return (
      <StyledSwiper>
        <div className="relative px-5 mx-auto mt-20 max-w-7xl">
          <h1 className="text-xl font-semibold">{title}</h1>
          <Swiper
            navigation={true}
            loop={isLoopEnabled}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerGroup={1}
            breakpoints={{
              360: {
                slidesPerView: 2,
              },
              720: {
                slidesPerView: 3,
              },
              1080: {
                slidesPerView: 4,
              },
            }}
            modules={[Navigation, Autoplay]}
            className="w-full h-auto mt-8"
          >
            {products.map((product, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <Product
                  product={product}
                  setIsCartModalOpen={setIsCartModalOpen}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </StyledSwiper>
    );
  };

  return (
    <div className="h-full px-4 mb-20 sm:px-0">
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
          className="w-full h-[200px] xl:h-[500px] lg:h-[400px] md:h-[400px] sm:h-[300px] mx-auto max-w-7xl"
        >
          {mainBanner.map((banner, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center text-center"
            >
              <Link to={banner.link}>
                <img
                  src={banner.image}
                  alt={`Slide ${index + 1}`}
                  className="block object-cover w-full h-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiper>
      {renderSlides("Best Item", bestProducts)} {/* 베스트제품 리스트 */}
      {renderSlides("New Item", newProducts)} {/* 신제품 리스트 */}
      <CartModal
        isCartModalOpen={isCartModalOpen}
        setIsCartModalOpen={setIsCartModalOpen}
      />
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
    background-color: #fff;
    border: 3px solid #e5e5e5;
    width: 45px;
    height: 45px;
    padding: 15px;
    border-radius: 50%;
    color: #737373;
    transition: transform 0.3s ease;
    position: absolute;
    top: 48%;
    transform: translateY(-50%);
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
  }

  .swiper-button-prev:after {
    transform: translate(-15%, 5%);
  }

  .swiper-button-next:after {
    transform: translate(20%, 5%);
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    transform: translateY(-50%) scale(1.2);
    top: 48%;
  }
`;
