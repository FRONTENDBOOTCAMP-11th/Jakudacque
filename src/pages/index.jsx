import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Product from "@components/Product";

export default function index() {
  // 메인 베너 슬라이드 데이터
  const slides = [
    {
      image: "images/banner1.png",
      link: "https://example.com/page1",
    },
    {
      image: "images/banner2.png",
      link: "https://example.com/page2",
    },
    {
      image: "images/banner3.png",
      link: "https://example.com/page3",
    },
  ];

  // BEST 아이템 리스트 슬라이드 데이터
  const bestProduct = [
    {
      image: "images/diary1.png",
      name: "Product 1",
      price: 1500,
      link: "https://example.com/page1",
    },
    {
      image: "images/keyring1.png",
      name: "Product 2",
      price: 1500,
      link: "https://example.com/page2",
    },
    {
      image: "images/maskingtape1.png",
      name: "Product 3",
      price: 1500,
      link: "https://example.com/page3",
    },
    {
      image: "images/memo1.png",
      name: "Product 4",
      price: 1500,
      link: "https://example.com/page4",
    },
    {
      image: "images/sticker1.png",
      name: "Product 5",
      price: 1500,
      link: "https://example.com/page5",
    },
    {
      image: "images/diary1.png",
      name: "Product 6",
      price: 1500,
      link: "https://example.com/page6",
    },
    {
      image: "images/keyring1.png",
      name: "Product 7",
      price: 1500,
      link: "https://example.com/page7",
    },
    {
      image: "images/maskingtape1.png",
      name: "Product 8",
      price: 1500,
      link: "https://example.com/page8",
    },
  ];

  // NEW 아이템 리스트 슬라이드 데이터
  const newProduct = [
    {
      image: "images/diary1.png",
      name: "Product 1",
      price: 1500,
      link: "https://example.com/page1",
    },
    {
      image: "images/keyring1.png",
      name: "Product 2",
      price: 1500,
      link: "https://example.com/page2",
    },
    {
      image: "images/maskingtape1.png",
      name: "Product 3",
      price: 1500,
      link: "https://example.com/page3",
    },
    {
      image: "images/memo1.png",
      name: "Product 4",
      price: 1500,
      link: "https://example.com/page4",
    },
    {
      image: "images/sticker1.png",
      name: "Product 5",
      price: 1500,
      link: "https://example.com/page5",
    },
    {
      image: "images/diary1.png",
      name: "Product 6",
      price: 1500,
      link: "https://example.com/page6",
    },
    {
      image: "images/keyring1.png",
      name: "Product 7",
      price: 1500,
      link: "https://example.com/page7",
    },
    {
      image: "images/maskingtape1.png",
      name: "Product 8",
      price: 1500,
      link: "https://example.com/page8",
    },
  ];

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
          {slides.map((slide, index) => (
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
            {bestProduct.map((product, index) => (
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
            {newProduct.map((product, index) => (
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
