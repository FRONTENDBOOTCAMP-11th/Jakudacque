import moment from "moment";

function getTime(day = 0, second = 0) {
  return moment()
    .add(day, "days")
    .add(second, "seconds")
    .format("YYYY.MM.DD HH:mm:ss");
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq("user"),
        email: "admin@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "무지",
        phone: "01011112222",
        address: "서울시 강남구 역삼동 123",
        type: "admin",
        loginType: "email",
        image: `/files/${clientId}/user-muzi.webp`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: "03-23",
          membershipClass: "MC03",
          addressBook: [
            {
              id: 1,
              name: "집",
              value: "서울시 강남구 역삼동 123",
            },
            {
              id: 2,
              name: "회사",
              value: "서울시 강남구 신사동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "s1@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "네오",
        phone: "01022223333",
        address: "서울시 강남구 삼성동 456",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-neo.webp`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: "11-23",
          membershipClass: "MC01",
          addressBook: [
            {
              id: 1,
              name: "회사",
              value: "서울시 강남구 삼성동 567",
            },
            {
              id: 2,
              name: "학교",
              value: "서울시 강남구 역삼동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "s2@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "어피치",
        phone: "01033334444",
        address: "서울시 강남구 도곡동 789",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-apeach.webp`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          confirm: false, // 관리자 승인이 안됨
          birthday: "11-24",
          membershipClass: "MC02",
          addressBook: [
            {
              id: 1,
              name: "회사",
              value: "서울시 마포구 연희동 123",
            },
            {
              id: 2,
              name: "가게",
              value: "서울시 강남구 학동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "u1@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "제이지",
        phone: "01044445555",
        address: "서울시 강남구 논현동 222",
        type: "user",
        loginType: "email",
        image: `/files/${clientId}/user-jayg.webp`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: "11-30",
          membershipClass: "MC02",
          address: [
            {
              id: 1,
              name: "회사",
              value: "서울시 강동구 천호동 123",
            },
            {
              id: 2,
              name: "집",
              value: "서울시 강동구 성내동 234",
            },
          ],
        },
      },
    ],
    // 상품
    product: [
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 6000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "2025 두들링 다이어리",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary1.png`,
            name: "diary1.png",
            originalname: "diary1.png",
          },
          {
            path: `/files/${clientId}/diary1-detail_1.png`,
            name: "diary1-detail_1.png",
            originalname: "diary1-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary1-detail_2.png`,
            name: "diary1-detail_2.png",
            originalname: "diary1-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>2025 두들링 다이어리</p>          
          </div>`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          isNew: true,
          isBest: true,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 18000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "[B6] 블랭크북 ver.2",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary2.png`,
            name: "diary2.png",
            originalname: "diary2.png",
          },
          {
            path: `/files/${clientId}/diary2-detail_1.png`,
            name: "diary2-detail_1.png",
            originalname: "diary2-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary2-detail_2.png`,
            name: "diary2-detail_2.png",
            originalname: "diary2-detail_2.png",
          },
          {
            path: `/files/${clientId}/diary2-detail_3.png`,
            name: "diary2-detail_3.png",
            originalname: "diary2-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>[B6] 블랭크북 ver.2</p>         
          </div>`,
        createdAt: getTime(-38, -60 * 60 * 6),
        updatedAt: getTime(-33, -60 * 55),
        extra: {
          isNew: false,
          isBest: false,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 3150,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "[wawa109] 중철노트 핑크",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary3.png`,
            name: "diary3.png",
            originalname: "diary3.png",
          },
          {
            path: `/files/${clientId}/diary3-detail_1.png`,
            name: "diary3-detail_1.png",
            originalname: "diary3-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary3-detail_2.png`,
            name: "diary3-detail_2.png",
            originalname: "diary3-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>[wawa109] 중철노트 핑크</p>           
          </div>`,
        createdAt: getTime(-35, -60 * 60 * 6),
        updatedAt: getTime(-10, -60 * 19),
        extra: {
          isNew: true,
          isBest: true,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 9600,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "아이코닉 2025 이겨낸다 다이어리",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary4.png`,
            name: "diary4.png",
            originalname: "diary4.png",
          },
          {
            path: `/files/${clientId}/diary4-detail_1.png`,
            name: "diary4-detail_1.png",
            originalname: "diary4-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary4-detail_2.png`,
            name: "diary4-detail_2.png",
            originalname: "diary4-detail_2.png",
          },
          {
            path: `/files/${clientId}/diary4-detail_3.png`,
            name: "diary4-detail_3.png",
            originalname: "diary4-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>아이코닉 2025 이겨낸다 다이어리</p>          
          </div>`,
        createdAt: getTime(-33, -60 * 60 * 7),
        updatedAt: getTime(-22, -60 * 60 * 3),
        extra: {
          isNew: false,
          isBest: true,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 6000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "[날짜형] 나의색 나의하루 vol.7 2025 다이어리",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary5.png`,
            name: "diary5.png",
            originalname: "diary5.png",
          },
          {
            path: `/files/${clientId}/diary5-detail_1.png`,
            name: "diary5-detail_1.png",
            originalname: "diary5-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary5-detail_2.png`,
            name: "diary5-detail_2.png",
            originalname: "diary5-detail_2.png",
          },
          {
            path: `/files/${clientId}/diary5-detail_3.png`,
            name: "diary5-detail_3.png",
            originalname: "diary5-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>[날짜형] 나의색 나의하루 vol.7 2025 다이어리</p>          
          </div>`,
        createdAt: getTime(-30, -60 * 60 * 10),
        updatedAt: getTime(-10, -60 * 56),
        extra: {
          isNew: true,
          isBest: false,
          today: true,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 4860,
        shippingFees: 3000,
        show: false,
        active: true,
        name: "[만년형] 컴포지션스튜디오 컴포지션 북 스택 먼슬리 다이어리",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary6.png`,
            name: "diary6.png",
            originalname: "diary6.png",
          },
          {
            path: `/files/${clientId}/diary6-detail_1.png`,
            name: "diary6-detail_1.png",
            originalname: "diary6-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary6-detail_2.png`,
            name: "diary6-detail_2.png",
            originalname: "diary6-detail_2.png",
          },
          {
            path: `/files/${clientId}/diary6-detail_3.png`,
            name: "diary6-detail_3.png",
            originalname: "diary6-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>[만년형] 컴포지션스튜디오 컴포지션 북 스택 먼슬리 다이어리</p>          
          </div>`,
        createdAt: getTime(-30, -60 * 60 * 21),
        updatedAt: getTime(-20, -60 * 10),
        extra: {
          isNew: false,
          isBest: false,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 16800,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "[만년형] 러빗띵스 라벨 다이어리 세트",
        quantity: 100,
        buyQuantity: 98,
        mainImages: [
          {
            path: `/files/${clientId}/diary7.png`,
            name: "diary7.png",
            originalname: "diary7.png",
          },
          {
            path: `/files/${clientId}/diary7-detail_1.png`,
            name: "diary7-detail_1.png",
            originalname: "diary7-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary7-detail_2.png`,
            name: "diary7-detail_2.png",
            originalname: "diary7-detail_2.png",
          },
          {
            path: `/files/${clientId}/diary7-detail_3.png`,
            name: "diary7-detail_3.png",
            originalname: "diary7-detail_3.png",
          },
          {
            path: `/files/${clientId}/diary7-detail_4.png`,
            name: "diary7-detail_4.png",
            originalname: "diary7-detail_4.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>[만년형] 러빗띵스 라벨 다이어리 세트</p>         
          </div>`,
        createdAt: getTime(-25, -60 * 60 * 12),
        updatedAt: getTime(-24, -60 * 23),
        extra: {
          isNew: false,
          isBest: true,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 28800,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "Thence Scrap Book Set",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary8.png`,
            name: "diary8.png",
            originalname: "diary8.png",
          },
          {
            path: `/files/${clientId}/diary8-detail_1.png`,
            name: "diary8-detail_1.png",
            originalname: "diary8-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary8-detail_2.png`,
            name: "diary8-detail_2.png",
            originalname: "diary8-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>Thence Scrap Book Set</p>        
          </div>`,
        createdAt: getTime(-22, -60 * 60 * 22),
        updatedAt: getTime(-20, -60 * 33),
        extra: {
          isNew: true,
          isBest: true,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 14560,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "2025 레인보우 다이어리 L",
        quantity: 100,
        buyQuantity: 96,
        mainImages: [
          {
            path: `/files/${clientId}/diary9.png`,
            name: "diary9.png",
            originalname: "daiary9.png",
          },
          {
            path: `/files/${clientId}/diary9-detail.png`,
            name: "diary9-detail.png",
            originalname: "daiary9-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>2025 레인보우 다이어리 L</p>          
          </div>`,
        createdAt: getTime(-21, -60 * 60 * 4),
        updatedAt: getTime(-16, -60 * 15),
        extra: {
          isNew: true,
          isBest: false,
          today: true,
          category: ["PC01"],
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 26000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "Shabby Rose book cover",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary10.png`,
            name: "diary10.png",
            originalname: "diary10.png",
          },
          {
            path: `/files/${clientId}/diary10-detail_1.png`,
            name: "diary10-detail_1.png",
            originalname: "diary10-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary10-detail_2.png`,
            name: "diary10-detail_2.png",
            originalname: "diary10-detail_2.png",
          },
          {
            path: `/files/${clientId}/diary10-detail_3.png`,
            name: "diary10-detail_3.png",
            originalname: "diary10-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>Shabby Rose book cover</p>         
          </div>`,
        createdAt: getTime(-18, -60 * 60 * 7),
        updatedAt: getTime(-12, -60 * 33),
        extra: {
          isNew: false,
          isBest: true,
          category: ["PC01"],
          depth: 1,
        },
      },
      // 11번 상품, 여기부터 카테고리도 설정
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 10620,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "2025 동동 다이어리",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary11.png`,
            name: "diary11.png",
            originalname: "diary11.png",
          },
          {
            path: `/files/${clientId}/diary11-detail_1.png`,
            name: "diary11-detail_1.png",
            originalname: "diary11-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary11-detail_2.png`,
            name: "diary11-detail_2.png",
            originalname: "diary11-detail_2.png",
          },
          {
            path: `/files/${clientId}/diary11-detail_3.png`,
            name: "diary11-detail_3.png",
            originalname: "diary11-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>2025 동동 다이어리</p>        
          </div>`,
        createdAt: getTime(-16, -60 * 60 * 3),
        updatedAt: getTime(-15, -60 * 45),
        extra: {
          isNew: false,
          isBest: false,
          today: true,
          category: ["PC01"], // 다이어리
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 9000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "큐피드곰 그림 일기장",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/diary12.png`,
            name: "diary12.png",
            originalname: "diagy12.png",
          },
          {
            path: `/files/${clientId}/diary12-detail_1.png`,
            name: "diary12-detail_1.png",
            originalname: "diary12-detail_1.png",
          },
          {
            path: `/files/${clientId}/diary12-detail_2.png`,
            name: "diary12-detail_2.png",
            originalname: "diary12-detail_2.png",
          },
          {
            path: `/files/${clientId}/diary12-detail_3.png`,
            name: "diary12-detail_3.png",
            originalname: "diary12-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>큐피드곰 그림 일기장</p>        
          </div>`,
        createdAt: getTime(-11, -60 * 60 * 12),
        updatedAt: getTime(-5, -60 * 60 * 6),
        extra: {
          isNew: true,
          isBest: true,
          category: ["PC01"], // 다이어리
          sort: 7,
        },
      },
      // 14번 상품, 키링
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 21600,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "유유클로버 플라워토끼 키링",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/keyring1.png`,
            name: "keyring1.png",
            originalname: "keyring1.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_1.png`,
            name: "keyring1-2-detail_1.png",
            originalname: "keyring1-2-detail_1.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_2.png`,
            name: "keyring1-2-detail_2.png",
            originalname: "keyring1-2-detail_2.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_3.png`,
            name: "keyring1-2-detail_3.png",
            originalname: "keyring1-2-detail_3.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_4.png`,
            name: "keyring1-2-detail_4.png",
            originalname: "keyring1-2-detail_4.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_5.png`,
            name: "keyring1-2-detail_5.png",
            originalname: "keyring1-2-detail_5.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>유유클로버 플라워토끼 키링</p>        
          </div>`,
        createdAt: getTime(-10, -60 * 60 * 12),
        updatedAt: getTime(-5, -60 * 60 * 6),
        extra: {
          isNew: true,
          isBest: false,
          category: ["PC05"], // 키링
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 6000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "유유클로버 강아지쿠키 키링",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/keyring2.png`,
            name: "keyring2.png",
            originalname: "keyring2.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_1.png`,
            name: "keyring1-2-detail_1.png",
            originalname: "keyring1-2-detail_1.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_2.png`,
            name: "keyring1-2-detail_2.png",
            originalname: "keyring1-2-detail_2.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_3.png`,
            name: "keyring1-2-detail_3.png",
            originalname: "keyring1-2-detail_3.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_4.png`,
            name: "keyring1-2-detail_4.png",
            originalname: "keyring1-2-detail_4.png",
          },
          {
            path: `/files/${clientId}/keyring1-2-detail_5.png`,
            name: "keyring1-2-detail_5.png",
            originalname: "keyring1-2-detail_5.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>유유클로버 강아지쿠키 키링</p>        
          </div>`,
        createdAt: getTime(-10, -60 * 60 * 12),
        updatedAt: getTime(-5, -60 * 60 * 6),
        extra: {
          isNew: true,
          isBest: false,
          category: ["PC05"], // 키링
          depth: 1,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 7000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "차냐 자동차 햄스터 키링",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/keyring3.png`,
            name: "keyring3.png",
            originalname: "keyring3.png",
          },
          {
            path: `/files/${clientId}/keyring3-detail.png`,
            name: "keyring3-detail.png",
            originalname: "keyring3-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>차냐 자동차 햄스터 키링</p>         
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          isNew: false,
          isBest: true,
          category: ["PC05"], // 키링
          sort: 5,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 9000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "엑스디 덕이 키링",
        quantity: 300,
        buyQuantity: 298,
        mainImages: [
          {
            path: `/files/${clientId}/keyring4.png`,
            name: "keyring4.png",
            originalname: "keyring4.png",
          },
          {
            path: `/files/${clientId}/keyring4-detail.png`,
            name: "keyring4-detail.png",
            originalname: "keyring4-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>엑스디 덕이 키링</p>          
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          isNew: false,
          isBest: true,
          category: ["PC05"], // 키링
          sort: 5,
        },
      },
      // 19번 상품. 마스킹테이프
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 5000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "담담 눈사람 스몰 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape1.png`,
            name: "maskingtape1.png",
            originalname: "maskingtape1.png",
          },
          {
            path: `/files/${clientId}/matae1-detail_1.png`,
            name: "matae1-detail_1.png",
            originalname: "matae1-detail_1.png",
          },
          {
            path: `/files/${clientId}/matae1-detail_2.png`,
            name: "matae1-detail_2.png",
            originalname: "matae1-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>담담 눈사람 스몰 마스킹테이프</p>         
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 4500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "츄로네집 별이내린꿀 글리터 다이컷 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape2.png`,
            name: "maskingtape2.png",
            originalname: "maskingtape2.png",
          },
          {
            path: `/files/${clientId}/matae2-detail_1.png`,
            name: "matae2-detail_1.png",
            originalname: "matae2-detail_1.png",
          },
          {
            path: `/files/${clientId}/matae2-detail_2.png`,
            name: "matae2-detail_2.png",
            originalname: "matae2-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>츄로네집 별이내린꿀 글리터 다이컷 마스킹테이프</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 4200,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "조무래기 오늘의 제목 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape3.png`,
            name: "maskingtape3.png",
            originalname: "maskingtape3.png",
          },
          {
            path: `/files/${clientId}/matae3-detail.png`,
            name: "matae3-detail.png",
            originalname: "matae3-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>조무래기 오늘의 제목 마스킹테이프</p>
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 5500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "츄로네집 버블 구름 마스킹테이프 5종",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape4.png`,
            name: "maskingtape4.png",
            originalname: "maskingtape4.png",
          },
          {
            path: `/files/${clientId}/matae4-detail.png`,
            name: "matae4-detail.png",
            originalname: "matae4-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>츄로네집 버블 구름 마스킹테이프 5종</p>         
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 5000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "보돔보돔 보송블러 키스컷 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape5.png`,
            name: "maskingtape5.png",
            originalname: "maskingtape5.png",
          },
          {
            path: `/files/${clientId}/matae5-detail_1.png`,
            name: "matae5-detail_1.png",
            originalname: "matae5-detail_1.png",
          },
          {
            path: `/files/${clientId}/matae5-detail_2.png`,
            name: "matae5-detail_2.png",
            originalname: "matae5-detail_2.png",
          },
          {
            path: `/files/${clientId}/matae5-detail_3.png`,
            name: "matae5-detail_3.png",
            originalname: "matae5-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>보돔보돔 보송블러 키스컷 마스킹테이프</p>         
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 7000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "보돔보돔 메모이지컷 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape6.png`,
            name: "maskingtape6.png",
            originalname: "maskingtape6.png",
          },
          {
            path: `/files/${clientId}/matae6-detail_1.png`,
            name: "matae6-detail_1.png",
            originalname: "matae6-detail_1.png",
          },
          {
            path: `/files/${clientId}/matae6-detail_2.png`,
            name: "matae6-detail_2.png",
            originalname: "matae6-detail_2.png",
          },
          {
            path: `/files/${clientId}/matae6-detail_3.png`,
            name: "matae6-detail_3.png",
            originalname: "matae6-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>보돔보돔 메모이지컷 마스킹테이프</p>          
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          isBest: true,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 5500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "보돔보돔 래빗 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape7.png`,
            name: "maskingtape7.png",
            originalname: "maskingtape7.png",
          },
          {
            path: `/files/${clientId}/matae7-detail.png`,
            name: "matae7-detail.png",
            originalname: "matae7-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>보돔보돔 래빗 마스킹테이프</p>          
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          isBest: true,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 5500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "보돔보돔 클로버 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape8.png`,
            name: "maskingtape8.png",
            originalname: "maskingtape8.png",
          },
          {
            path: `/files/${clientId}/matae8-detail.png`,
            name: "matae8-detail.png",
            originalname: "matae8-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>보돔보돔 클로버 마스킹테이프</p>         
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 4500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "츄로네집 별구름 유테 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape9.png`,
            name: "maskingtape9.png",
            originalname: "maskingtape9.png",
          },
          {
            path: `/files/${clientId}/matae9-detail.png`,
            name: "matae9-detail.png",
            originalname: "matae9-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>츄로네집 별구름 유테 마스킹테이프</p>  
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC04"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 4500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "미찌샵 멍멍 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/maskingtape10.png`,
            name: "maskingtape10.png",
            originalname: "maskingtape10.png",
          },
          {
            path: `/files/${clientId}/matae10-detail_1.png`,
            name: "matae10-detail_1.png",
            originalname: "matae10-detail_1.png",
          },
          {
            path: `/files/${clientId}/matae10-detail_2.png`,
            name: "matae10-detail_2.png",
            originalname: "matae10-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>미찌샵 멍멍 마스킹테이프</p>         
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC04"],
        },
      },
      // 29번 상품 메모지
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "모나니스튜디오 도람이 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo1.png`,
            name: "memo1.png",
            originalname: "memo1.png",
          },
          {
            path: `/files/${clientId}/memo1-2-3-detail_1.png`,
            name: "memo1-2-3-detail_1.png",
            originalname: "memo1-2-3-detail_1.png",
          },
          {
            path: `/files/${clientId}/memo1-detail_2.png`,
            name: "memo1-detail_2.png",
            originalname: "memo1-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>모나니스튜디오 도람이 메모지</p>        
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          isBest: true,
          isNew: true,
          category: ["PC03"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 3000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "모나니스튜디오 모아 클로버 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo2.png`,
            name: "memo2.png",
            originalname: "memo2.png",
          },
          {
            path: `/files/${clientId}/memo1-2-3-detail_1.png`,
            name: "memo1-2-3-detail_1.png",
            originalname: "memo1-2-3-detail_1.png",
          },
          {
            path: `/files/${clientId}/memo2-detail_2.png`,
            name: "memo2-detail_2.png",
            originalname: "memo2-detail_2.png",
          },
          {
            path: `/files/${clientId}/memo2-detail_3.png`,
            name: "memo2-detail_3.png",
            originalname: "memo2-detail_3.png",
          },
          {
            path: `/files/${clientId}/memo2-detail_4.png`,
            name: "memo2-detail_4.png",
            originalname: "memo2-detail_4.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>모나니스튜디오 모아 클로버 메모지</p>  
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          isBest: true,
          isNew: true,
          category: ["PC03"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 3500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "모나니스튜디오 모아 풀밭 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo3.png`,
            name: "memo3.png",
            originalname: "memo3.png",
          },
          {
            path: `/files/${clientId}/memo1-2-3-detail_1.png`,
            name: "memo1-2-3-detail_1.png",
            originalname: "memo1-2-3-detail_1.png",
          },
          {
            path: `/files/${clientId}/memo3-detail_2.png`,
            name: "memo3-detail_2.png",
            originalname: "memo3-detail_2.png",
          },
          {
            path: `/files/${clientId}/memo3-detail_3.png`,
            name: "memo3-detail_3.png",
            originalname: "memo3-detail_3.png",
          },
          {
            path: `/files/${clientId}/memo3-detail_4.png`,
            name: "memo3-detail_4.png",
            originalname: "memo3-detail_4.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>모나니스튜디오 모아 풀밭 메모지</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC03"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 5000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "컬루 노트패드 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo4.png`,
            name: "memo4.png",
            originalname: "memo4.png",
          },
          {
            path: `/files/${clientId}/memo4-detail.png`,
            name: "memo4-detail.png",
            originalname: "memo4-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>컬루 노트패드 메모지</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC03"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 5000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "엑스디 에그위클리 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo5.png`,
            name: "memo5.png",
            originalname: "memo5.png",
          },
          {
            path: `/files/${clientId}/memo5-detail.png`,
            name: "memo5-detail.png",
            originalname: "memo5-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>엑스디 에그위클리 메모지</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC03"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "보돔보돔 포근 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo6.png`,
            name: "memo6.png",
            originalname: "memo6.png",
          },
          {
            path: `/files/${clientId}/memo6-detail.png`,
            name: "memo6-detail.png",
            originalname: "memo6-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>보돔보돔 포근 메모지</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC03"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 3200,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "키치키치 체크리스트 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo7.png`,
            name: "memo7.png",
            originalname: "memo7.png",
          },
          {
            path: `/files/${clientId}/memo7-detail_1.png`,
            name: "memo7-detail_1.png",
            originalname: "memo7-detail_1.png",
          },
          {
            path: `/files/${clientId}/memo7-detail_2.png`,
            name: "memo7-detail_2.png",
            originalname: "memo7-detail_2.png",
          },
          {
            path: `/files/${clientId}/memo7-detail_3.png`,
            name: "memo7-detail_3.png",
            originalname: "memo7-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>키치키치 체크리스트 메모지</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC03"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "게이트17 영수증 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo8.png`,
            name: "memo8.png",
            originalname: "memo8.png",
          },
          {
            path: `/files/${clientId}/memo8-detail.png`,
            name: "memo8-detail.png",
            originalname: "memo8-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>게이트17 영수증 메모지</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC03"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "게이트17 보딩패스 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/memo9.png`,
            name: "memo9.png",
            originalname: "memo9.png",
          },
          {
            path: `/files/${clientId}/memo9-detail.png`,
            name: "memo9-detail.png",
            originalname: "memo9-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>게이트17 보딩패스 떡메모지</p>
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC03"],
        },
      },
      // 27번 상품. 스티커
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2800,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "모서리스튜디오 햄찌세자매 줄줄이 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker1.png`,
            name: "sticker1.png",
            originalname: "sticker1.png",
          },
          {
            path: `/files/${clientId}/sticker1-detail.png`,
            name: "sticker1-detail.png",
            originalname: "sticker1-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>모서리스튜디오 햄찌세자매 줄줄이 스티커</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2800,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "모서리스튜디오 소다냥 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker2.png`,
            name: "sticker2.png",
            originalname: "sticker2.png",
          },
          {
            path: `/files/${clientId}/sticker2-detail.png`,
            name: "sticker2-detail.png",
            originalname: "sticke2-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>모서리스튜디오 소다냥 스티커</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2800,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "모서리스튜디오 미어독 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker3.png`,
            name: "sticker3.png",
            originalname: "sticker3.png",
          },
          {
            path: `/files/${clientId}/sticker3-detail.png`,
            name: "sticker3-detail.png",
            originalname: "sticke3-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>모서리스튜디오 미어독 스티커</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 8000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "메이빈 오늘은 뭐할까 스티커팩",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker4.png`,
            name: "sticker4.png",
            originalname: "sticker4.png",
          },
          {
            path: `/files/${clientId}/sticker4-detail.png`,
            name: "sticker4-detail.png",
            originalname: "sticke4-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>메이빈 오늘은 뭐할까 스티커팩</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          isNew: true,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 8000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "메이빈 달콤한 여름 간식 스티커팩",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker5.png`,
            name: "sticker5.png",
            originalname: "sticker5.png",
          },
          {
            path: `/files/${clientId}/sticker5-detail.png`,
            name: "sticker5-detail.png",
            originalname: "sticke5-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>메이빈 달콤한 여름 간식 스티커팩</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          isNew: true,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 8000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "메이빈 꽃 향기 나는 날 스티커팩",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker6.png`,
            name: "sticker6.png",
            originalname: "sticker6.png",
          },
          {
            path: `/files/${clientId}/sticker6-detail.png`,
            name: "sticker6-detail.png",
            originalname: "sticke6-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>메이빈 꽃 향기 나는 날 스티커팩</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          isNew: true,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "조무래기 폼폼컨페티 메론 씰스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker7.png`,
            name: "sticker7.png",
            originalname: "sticker7.png",
          },
          {
            path: `/files/${clientId}/sticker7-8-detail_1.png`,
            name: "sticker7-8-detail_1.png",
            originalname: "sticker7-8-detail_1.png",
          },
          {
            path: `/files/${clientId}/sticker7-8-detail_2.png`,
            name: "sticker7-8-detail_2.png",
            originalname: "sticker7-8-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>조무래기 폼폼컨페티 메론 씰스티커</p>
            <p>사이즈: 80 * 175 mm</p>
            <p>구성: 1 Sheet</p>
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "조무래기 폼폼컨페티 딸기 씰스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker8.png`,
            name: "sticker8.png",
            originalname: "sticker8.png",
          },
          {
            path: `/files/${clientId}/sticker7-8-detail_1.png`,
            name: "sticker7-8-detail_1.png",
            originalname: "sticker7-8-detail_1.png",
          },
          {
            path: `/files/${clientId}/sticker7-8-detail_2.png`,
            name: "sticker7-8-detail_2.png",
            originalname: "sticker7-8-detail_2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>조무래기 폼폼컨페티 딸기 씰스티커</p>
            <p>사이즈: 80 * 175 mm</p>
            <p>구성: 1 Sheet</p>
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "조무래기 폼폼컨페티 푸딩 씰스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker9.png`,
            name: "sticker9.png",
            originalname: "sticker9.png",
          },
          {
            path: `/files/${clientId}/sticker9-detail_1.png`,
            name: "sticker9-detail_1.png",
            originalname: "sticker9-detail_1.png",
          },
          {
            path: `/files/${clientId}/sticker9-detail_2.png`,
            name: "sticker9-detail_2.png",
            originalname: "sticker9-detail_2.png",
          },
          {
            path: `/files/${clientId}/sticker9-detail_3.png`,
            name: "sticker9-detail_3.png",
            originalname: "sticker9-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>조무래기 폼폼컨페티 푸딩 씰스티커</p>
            <p>사이즈: 80 * 175 mm</p>
            <p>구성: 1 Sheet</p>
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "조무래기 폼폼컨페티 스노우 씰스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker10.png`,
            name: "sticker10.png",
            originalname: "sticker10.png",
          },
          {
            path: `/files/${clientId}/sticker10-detail_1.png`,
            name: "sticker10-detail_1.png",
            originalname: "sticker10-detail_1.png",
          },
          {
            path: `/files/${clientId}/sticker10-detail_2.png`,
            name: "sticker10-detail_2.png",
            originalname: "sticker10-detail_2.png",
          },
          {
            path: `/files/${clientId}/sticker10-detail_3.png`,
            name: "sticker10-detail_3.png",
            originalname: "sticker10-detail_3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>조무래기 폼폼컨페티 스노우 씰스티커</p>
            <p>사이즈: 80 * 175 mm</p>
            <p>구성: 1 Sheet</p>
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "게이트17 손글씨 알파벳 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker11.png`,
            name: "sticker11.png",
            originalname: "sticker11.png",
          },
          {
            path: `/files/${clientId}/sticker11-detail.png`,
            name: "sticker11-detail.png",
            originalname: "sticke11-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>손글씨 알파벳 스티커</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 3000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "플러피 알파벳 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sticker12.png`,
            name: "sticker12.png",
            originalname: "sticker12.png",
          },
          {
            path: `/files/${clientId}/sticker12-detail.png`,
            name: "sticker12-detail.png",
            originalname: "sticke12-detail.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>플러피 알파벳 스티커</p>            
          </div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
          category: ["PC02"],
        },
      },
    ],
    // 주문
    order: [
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS020",
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: "OS020",
            name: "심플 파스텔 다이어리리",
            image: {
              path: `/files/${clientId}/diary7.png`,
              name: "diary7.png",
              originalname: "diary7.png",
            },
            quantity: 2,
            price: 1500,
            review_id: 3,
          },
        ],
        cost: {
          products: 1500,
          shippingFees: 3000,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 5000,
        },
        address: {
          name: "회사",
          value: "서울시 강남구 신사동 521",
        },
        createdAt: getTime(-6, -60 * 60 * 5),
        updatedAt: getTime(-6, -60 * 60 * 5),
      },
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS010",
        products: [
          {
            _id: 3,
            seller_id: 2,
            state: "OS010",
            name: "엑스디 덕이 키링",
            image: {
              path: `/files/${clientId}/keyring3.png`,
              name: "keyring3.png",
              originalname: "엑스디 덕이 키링.png",
            },
            quantity: 2,
            price: 12900,
          },
          {
            _id: 4,
            seller_id: 2,
            state: "OS010",
            name: "담담 눈사람 스몰 마스킹테이프",
            image: {
              path: `/files/${clientId}/maskingtape1.png`,
              name: "maskingtape1.png",
              originalname: "마스킹테이프1.png",
            },
            quantity: 2,
            price: 3500,
            review_id: 2,
          },
        ],
        cost: {
          products: 32800,
          shippingFees: 0,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 32800,
        },
        address: {
          name: "집",
          value: "서울시 강남구 논현동 938",
        },
        createdAt: getTime(-3, -60 * 60 * 52),
        updatedAt: getTime(-2, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS040",
        products: [
          {
            _id: 4,
            seller_id: 2,
            state: "OS110",
            name: "람지 봄꽃 메모지",
            image: {
              path: `/files/${clientId}/memo6.png`,
              name: "memo6.png",
              originalnam9: "memo6.png",
            },
            quantity: 3,
            price: 3500,
            review_id: 1,
          },
        ],
        cost: {
          products: 10500,
          shippingFees: 3500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 14000,
        },
        address: {
          name: "학교",
          value: "서울시 강남구 역삼동 918",
        },
        payment: {
          success: true,
          imp_uid: "imp_138601212227",
          pay_method: "card",
          merchant_uid: "mid_1702540599641",
          name: "람지 봄꽃 메모지",
          paid_amount: 14000,
          currency: "KRW",
          pg_provider: "html5_inicis",
          pg_type: "payment",
          pg_tid: "StdpayCARDINIpayTest20231214165706277441",
          apply_num: "30123157",
          buyer_name: "제이지",
          buyer_email: "aceppin@daum.net",
          buyer_tel: "01044445555",
          buyer_addr: "",
          buyer_postcode: "",
          custom_data: null,
          status: "paid",
          paid_at: 1702540626,
          receipt_url:
            "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20231214165706277441&noMethod=1",
          card_name: "국민KB카드",
          bank_name: null,
          card_quota: 0,
          card_number: "457973*********5",
        },
        delivery: {
          company: "한진 택배",
          trackingNumber: "364495958003",
          url: "https://trace.cjlogistics.com/next/tracking.html?wblNo=364495958003",
        },
        createdAt: getTime(-3, -60 * 60 * 18),
        updatedAt: getTime(-1, -60 * 60 * 1),
      },
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS040",
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: "OS310",
            name: "소다냥 스티커",
            image: {
              path: `/files/${clientId}/sticker2.png`,
              name: "sticker2.png",
              originalnam9: "sticker2.png",
            },
            quantity: 2,
            price: 2900,
            review_id: 2,
          },
        ],
        cost: {
          products: 5800,
          shippingFees: 3500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 9300,
        },
        address: {
          name: "학교",
          value: "서울시 강남구 역삼동 234",
        },
        delivery: {
          company: "한진 택배",
          trackingNumber: "364495958003",
          url: "https://trace.cjlogistics.com/next/tracking.html?wblNo=364495958003",
        },
        createdAt: getTime(-3, -60 * 60 * 18),
        updatedAt: getTime(-1, -60 * 60 * 1),
      },
    ],
    // 후기
    review: [
      {
        _id: await nextSeq("review"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        order_id: 1,
        product_id: 2,
        rating: 5,
        content: "아이가 좋아해요.",
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("review"),
        user_id: 2,
        user: {
          _id: 2,
          name: "네오",
          image: "user-neo.webp",
        },
        order_id: 4,
        product_id: 2,
        rating: 4,
        content: "배송이 좀 느려요.",
        createdAt: getTime(-3, -60 * 60 * 1),
      },
      {
        _id: await nextSeq("review"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        order_id: 2,
        product_id: 3,
        rating: 1,
        content: "하루만에 고장났어요.",
        extra: {
          title: "추천하지 않습니다.",
        },
        createdAt: getTime(-2, -60 * 60 * 10),
      },
    ],
    // 장바구니
    cart: [
      {
        _id: await nextSeq("cart"),
        user_id: 4,
        product_id: 1,
        quantity: 2,
        createdAt: getTime(-7, -60 * 30),
        updatedAt: getTime(-7, -60 * 30),
      },
      {
        _id: await nextSeq("cart"),
        user_id: 4,
        product_id: 2,
        quantity: 1,
        createdAt: getTime(-4, -60 * 30),
        updatedAt: getTime(-3, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("cart"),
        user_id: 2,
        product_id: 3,
        quantity: 2,
        createdAt: getTime(-3, -60 * 60 * 4),
        updatedAt: getTime(-3, -60 * 60 * 4),
      },
      {
        _id: await nextSeq("cart"),
        user_id: 2,
        product_id: 4,
        quantity: 3,
        createdAt: getTime(-2, -60 * 60 * 12),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
    ],
    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq("bookmark"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: "product",
        target_id: 2,
        memo: "첫째 크리스마스 선물.",
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: "product",
        target_id: 4,
        memo: "둘째 생일 선물",
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("bookmark"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: "user",
        target_id: 2,
        memo: "단골 셀러",
        createdAt: getTime(-2, -60 * 60 * 20),
      },
      {
        _id: await nextSeq("bookmark"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: "post",
        target_id: 1,
        memo: "크기 문의글 북마크",
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("bookmark"),
        user_id: 2,
        user: {
          _id: 2,
          name: "네오",
          image: `/files/${clientId}/user-neo.webp`,
        },
        type: "product",
        target_id: 4,
        memo: "1순위로 살것!",
        createdAt: getTime(-1, -60 * 60 * 12),
      },
    ],
    // QnA, 공지사항 등의 게시판
    post: [
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        title: "크기가 얼만만한가요?",
        content: "아이가 6살인데 가지고 놀기 적당한 크기인가요?",
        replies: [
          {
            _id: 1,
            user_id: 2,
            user: {
              _id: 2,
              name: "네오",
              image: "user-neo.webp",
            },
            content: "크기는 상품 상세정보에 나와 있습니다.",
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: 2,
            user_id: 4,
            user: {
              _id: 4,
              name: "제이지",
              image: "user-jayg.webp",
            },
            content: "어디있나 모르겠어요.",
            like: 7,
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: 3,
            user_id: 2,
            user: {
              _id: 2,
              name: "네오",
              image: "user-neo.webp",
            },
            content: "높이 60cm 입니다.",
            like: 3,
            createdAt: getTime(-2, -60 * 60 * 9),
            updatedAt: getTime(-1, -60 * 60 * 20),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 1,
        seller_id: 2,
        views: 50,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        title: "이번주 토요일까지 받아볼 수 있을까요?",
        content: "토요일 생일 선물로 준비중인데 그때까지 배송 가능할까요?",
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 4,
        seller_id: 3,
        views: 0,
        user: {
          _id: 2,
          name: "네오",
          image: "user-neo.webp",
        },
        title: "배송 빨리 보내주세요.",
        content: "양품으로 보내주세요.",
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        views: 10,
        user: {
          _id: 1,
          name: "무지",
          image: "user-muzi.webp",
        },
        title: "배송지연 안내",
        content:
          "크리스마스 물류 증가로 인해 평소보다 2~3일 지연될 예정입니다.",
        createdAt: getTime(-4, -60 * 60 * 2),
        updatedAt: getTime(-2, -60 * 60 * 13),
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        views: 15,
        user: {
          _id: 1,
          name: "무지",
          image: "user-muzi.webp",
        },
        title: "배송비 인상 안내",
        content:
          "택배사 배송비 인상으로 인해 기존 3,000원에서 3,500원으로 인상됩니다.",
        createdAt: getTime(-6, -60 * 60 * 20),
        updatedAt: getTime(-4, -60 * 60 * 13),
      },
    ],
    // 코드
    code: [
      {
        _id: "productCategory",
        title: "상품 카테고리",
        codes: [
          {
            sort: 1,
            code: "PC01",
            value: "다이어리",
            depth: 1,
          },
          {
            sort: 2,
            code: "PC02",
            value: "스티커",
            depth: 1,
          },
          {
            sort: 3,
            code: "PC03",
            value: "메모지",
            depth: 1,
          },
          {
            sort: 4,
            code: "PC04",
            value: "마스킹테이프",
            depth: 1,
          },
          {
            sort: 5,
            code: "PC05",
            value: "키링",
            depth: 1,
          },
        ],
      },
      {
        _id: "orderState",
        title: "주문 상태",
        codes: [
          {
            sort: 1,
            code: "OS010",
            value: "주문 완료",
          },
          {
            sort: 2,
            code: "OS020",
            value: "결제 완료",
          },
          {
            sort: 3,
            code: "OS030",
            value: "배송 준비중",
          },
          {
            depth: 1,
            code: "OS035",
            value: "배송중",
          },
          {
            sort: 5,
            code: "OS040",
            value: "배송 완료",
          },
          {
            depth: 1,
            code: "OS110",
            value: "반품 요청",
          },
          {
            sort: 7,
            code: "OS120",
            value: "반품 처리중",
          },
          {
            sort: 8,
            code: "OS130",
            value: "반품 완료",
          },
          {
            sort: 9,
            code: "OS210",
            value: "교환 요청",
          },
          {
            sort: 10,
            code: "OS220",
            value: "교환 처리중",
          },
          {
            sort: 11,
            code: "OS230",
            value: "교환 완료",
          },
          {
            sort: 12,
            code: "OS310",
            value: "환불 요청",
          },
          {
            sort: 13,
            code: "OS320",
            value: "환불 처리중",
          },
          {
            sort: 14,
            code: "OS330",
            value: "환불 완료",
          },
        ],
      },
      {
        _id: "membershipClass",
        title: "회원 등급",
        codes: [
          {
            sort: 1,
            code: "MC01",
            value: "일반",
            discountRate: 0, // 할인율
          },
          {
            sort: 2,
            code: "MC02",
            value: "프리미엄",
            discountRate: 10,
          },
          {
            sort: 3,
            code: "MC03",
            value: "VIP",
            discountRate: 20,
          },
        ],
      },
    ],
    // 설정
    config: [
      {
        _id: "shippingFees",
        title: "배송비",
        value: 3000,
      },
      {
        _id: "freeShippingFees",
        title: "배송비 무료 금액",
        value: 30000,
      },
    ],
  };
};
