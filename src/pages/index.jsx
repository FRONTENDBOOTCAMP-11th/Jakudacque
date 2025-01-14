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

export default function Index() {
  // 메인 베너 슬라이드 데이터
  const mainSlides = [
    {
      image: "images/banner1.png",
      link: "/list",
    },
    {
      image: "images/banner2.png",
      link: "/list?category=BEST",
    },
    {
      image: "images/banner3.png",
      link: "/list?category=NEW",
    },
  ];

  const axios = useAxiosInstance();

  const { data: bestData } = useQuery({
    queryKey: ["bestProductList"],
    queryFn: async () => {
      const params = {};
      params.custom = JSON.stringify({
        "extra.isBest": true,
        show: true,
      });
      const response = await axios.get("/products", { params });
      return response.data;
    },
  });

  const { data: newData } = useQuery({
    queryKey: ["newProductList"],
    queryFn: async () => {
      const params = {};
      params.custom = JSON.stringify({
        "extra.isNew": true,
        show: true,
      });
      const response = await axios.get("/products", { params });
      return response.data;
    },
  });

  const bestProducts =
    bestData?.item?.map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.mainImages?.[0]?.path
        ? "https://11.fesp.shop" + item.mainImages[0].path
        : "",
      link: `/product/${item._id}`,
    })) || [];

  const newProducts =
    newData?.item?.map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.mainImages?.[0]?.path
        ? "https://11.fesp.shop" + item.mainImages[0].path
        : "",
      link: `/product/${item._id}`,
    })) || [];

  return (
    <div className="h-full mb-20">
      <StyledSwiper>
        <Swiper // 메인베너
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="w-full h-[200px] xl:h-[500px] lg:h-[400px] md:h-[400px] sm:h-[300px] mx-auto max-w-[1240px]"
        >
          {mainSlides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center text-center"
            >
              <Link to={slide.link}>
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="block w-full h-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiper>

      <StyledSwiper>
        <div className="relative mt-20 mx-auto max-w-[1240px]">
          <h1 className="text-xl font-semibold">Best Item</h1>
          <Swiper // BEST 아이템 리스트
            navigation={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={4}
            slidesPerGroup={2}
            modules={[Navigation, Autoplay]}
            className="w-full h-auto mt-8"
          >
            {bestProducts.map((product, index) => (
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

      <StyledSwiper>
        <div className="relative mt-20 mx-auto max-w-[1240px]">
          <h1 className="text-xl font-semibold">New Item</h1>
          <Swiper // NEW 아이템 리스트
            navigation={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={4}
            slidesPerGroup={2}
            modules={[Navigation, Autoplay]}
            className="w-full h-auto mt-8"
          >
            {newProducts.map((product, index) => (
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
