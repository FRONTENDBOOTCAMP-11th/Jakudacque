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
        price: 2200,
        shippingFees: 0,
        show: true,
        active: true,
        name: "멍냥이 다이어리",
        quantity: 320,
        buyQuantity: 310,
        mainImages: [
          {
            path: `/files/${clientId}/KAnceE1JA.png`,
            name: "KAnceE1JA.png",
            originalname: "diary1.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>멍냥이 다이어리 상세 설명</p>
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
        price: 1700,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "Daisy diary",
        quantity: 200,
        buyQuantity: 198,
        mainImages: [
          {
            path: `/files/${clientId}/9CdGarxdN.png`,
            name: "9CdGarxdN.png",
            originalname: "diary2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>Daisy diary 상세 설명</p>
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
        price: 2800,
        shippingFees: 0,
        show: true,
        active: true,
        name: "ioneco diary",
        quantity: 100,
        buyQuantity: 99,
        mainImages: [
          {
            path: `/files/${clientId}/jD71t4CdR.png`,
            name: "jD71t4CdR.png",
            originalname: "diary3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>ioneco diary 상세 설명</p>
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
        price: 4500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "blahblah diary",
        quantity: 100,
        buyQuantity: 89,
        mainImages: [
          {
            path: `/files/${clientId}/JOq9BFz_b.png`,
            name: "JOq9BFz_b.png",
            originalname: "diary4.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>blahblah diary", 상세 설명</p>
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
        price: 4500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "심플 멍멍냥냥 다이어리",
        quantity: 100,
        buyQuantity: 98,
        mainImages: [
          {
            path: `/files/${clientId}/5-WndmOy2.png`,
            name: "5-WndmOy2.png",
            originalname: "diary5.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>심플 멍멍냥냥 다이어리 상세 설명</p>
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
        price: 3500,
        shippingFees: 4000,
        show: false,
        active: true,
        name: "고딕 스타일 다이어리",
        quantity: 100,
        buyQuantity: 99,
        mainImages: [
          {
            path: `/files/${clientId}/unM8a6XUm.png`,
            name: "unM8a6XUm.png",
            originalname: "diary6.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>고딕 스타일 다이어리 상세 설명</p>
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
        price: 1500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "심플 파스텔 다이어리",
        quantity: 100,
        buyQuantity: 98,
        mainImages: [
          {
            path: `/files/${clientId}/SyMfOSLFP.png`,
            name: "SyMfOSLFP.png",
            originalname: "diary7.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>심플 파스텔 다이어리 상세 설명</p>
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
        price: 2500,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "케챱스마일 다이어리",
        quantity: 100,
        buyQuantity: 97,
        mainImages: [
          {
            path: `/files/${clientId}/U-JRavpBz.png`,
            name: "U-JRavpBz.png",
            originalname: "diary8.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>케챱스마일 다이어리 상세 설명</p>
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
        price: 3000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "Rainbow 다이어리",
        quantity: 100,
        buyQuantity: 96,
        mainImages: [
          {
            path: `/files/${clientId}/PV9O31xxi.png`,
            name: "PV9O31xxi.png",
            originalname: "daiary9.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>Rainbow 다이어리" 상세 설명</p>
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
        price: 5000,
        shippingFees: 0,
        show: true,
        active: true,
        name: "폭신폭신 라푼젤 다이어리",
        quantity: 100,
        buyQuantity: 95,
        mainImages: [
          {
            path: `/files/${clientId}/KCg7WPC4w.png`,
            name: "KCg7WPC4w.png",
            originalname: "diary10.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>폭신폭신 라푼젤 다이어리 상세 설명</p>
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
        price: 14400,
        shippingFees: 3000,
        show: true,
        active: true,
        name: "모던 포레스트 다이어리",
        quantity: 100,
        buyQuantity: 94,
        mainImages: [
          {
            path: `/files/${clientId}/WHiIGBK2d.png`,
            name: "WHiIGBK2d.png",
            originalname: "diary11.png",
          },
        ],
        content: `
          <div align="center"><p>*크리스마스 배송 안내</p></div>
          <div align="center"><p>택배사 물량 증가로 평소보다 2~3일 더 걸립니다.</p></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/WHiIGBK2d.png"></div>
          <div align="center"><br></div>
          <div align="center"><p>*반품 안내</p></div>`,
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
        name: "감고미 다이어리",
        quantity: 999,
        buyQuantity: 800,
        mainImages: [
          {
            path: `/files/${clientId}/EjtiieQ1d.png`,
            name: "EjtiieQ1d.png",
            originalname: "diagy12.png",
          },
        ],
        content: `
          <div align="center">
            <p>감고미 다이어리</p>
          </div>
          `,
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
        shippingFees: 5500,
        show: true,
        active: true,
        name: "우유클로버 강아지쿠키 키링",
        quantity: 99,
        buyQuantity: 94,
        mainImages: [
          {
            path: `/files/${clientId}/Dt0L88Fmk.png`,
            name: "Dt0L88Fmk.png",
            originalname: "우유클로버 강아지쿠키 키링.png",
          },
        ],
        content: `                    
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/Dt0L88Fmk.png"></div>`,
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
        price: 21600,
        shippingFees: 5500,
        show: true,
        active: true,
        name: "우유클로버 플라워토끼 키링",
        quantity: 99,
        buyQuantity: 94,
        mainImages: [
          {
            path: `/files/${clientId}/_j8VmZrAw.png`,
            name: "_j8VmZrAw.png",
            originalname: "우유클러보 플라워토끼 키링.png",
          },
        ],
        content: `
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/_j8VmZrAw.png"></div>`,
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
        price: 12900,
        // shippingFees: 3500,
        show: true,
        active: true,
        name: "엑스디 덕이 키링",
        quantity: 300,
        buyQuantity: 298,
        mainImages: [
          {
            path: `/files/${clientId}/n_UbecHx1.png`,
            name: "n_UbecHx1.png",
            originalname: "엑스디 덕이 키링.png",
          },
        ],
        content: `
          <div align="center">
            <p>귀여운 오리 키링</p>
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
        price: 12900,
        // shippingFees: 3500,
        show: true,
        active: true,
        name: "모먼트미모먼트 흑백동물원 블랙 고양이 키링",
        quantity: 300,
        buyQuantity: 298,
        mainImages: [
          {
            path: `/files/${clientId}/HPzBE4pNa.png`,
            name: "HPzBE4pNa.png",
            originalname: "모먼트미모먼트 흑백동물원 블랙 고양이 키링.png",
          },
        ],
        content: `
          <div align="center">
            <p>모먼트미모먼트 흑백동물원 블랙 고양이 키링</p>
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "담담 눈사람 스몰 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/suFbEOrkQ.png`,
            name: "suFbEOrkQ.png",
            originalname: "마스킹테이프1.png",
          },
        ],
        content: `담담 눈사람 스몰 마스킹테이프`,
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "츄로네집 벌이내린꿀 글리터 다이컷 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/IGl3TY8aV.png`,
            name: "IGl3TY8aV.png",
            originalname: "마스킹테이프2.png",
          },
        ],
        content: `담담 눈사람 스몰 마스킹테이프`,
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "조무래기 오늘의 제목 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/mcW9k1bJK.png`,
            name: "mcW9k1bJK.png",
            originalname: "마스킹테이프3.png",
          },
        ],
        content: `담담 눈사람 스몰 마스킹테이프`,
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "버블 구름 글리터 다이컷 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/1nvBLja6q.png`,
            name: "1nvBLja6q.png",
            originalname: "마스킹테이프4.png",
          },
        ],
        content: `버블 구름 글리터 다이컷 마스킹테이프`,
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "유유클로버 빵고양이 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/JXu3f06wp.png`,
            name: "JXu3f06wp.png",
            originalname: "마스킹테이프5.png",
          },
        ],
        content: `유유클로버 빵고양이 마스킹테이프`,
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "유유클로버 꽃강아지 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/psr9E0kfH.png`,
            name: "psr9E0kfH.png",
            originalname: "마스킹테이프6.png",
          },
        ],
        content: `유유클로버 꽃강아지 마스킹테이프`,
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
        price: 2500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "보돔보돔 래빗 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/Y9NuwEntA.png`,
            name: "Y9NuwEntA.png",
            originalname: "마스킹테이프7.png",
          },
        ],
        content: `보돔보돔 래빗 마스킹테이프`,
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
        price: 2500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "보돔보돔 클로버 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/zv16u5gr0.png`,
            name: "zv16u5gr0.png",
            originalnam8: "마스킹테이프8.png",
          },
        ],
        content: `보돔보돔 클로버 마스킹테이프`,
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
        price: 2500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "별구름 유테 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/_xyf_8V4z.png`,
            name: "_xyf_8V4z.png",
            originalnam9: "마스킹테이프9.png",
          },
        ],
        content: `별구름 유테 마스킹테이프`,
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
        price: 2500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "미찌샵 멍멍 마스킹테이프",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/A1ybUe8Pd.png`,
            name: "A1ybUe8Pd.png",
            originalnam9: "마스킹테이프10.png",
          },
        ],
        content: `미찌샵 멍멍 마스킹테이프`,
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "미찌샵 곰돌이 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/eCc5FppIX.png`,
            name: "eCc5FppIX.png",
            originalnam9: "memo1.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>미찌샵 곰돌이 메모지</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "키치키치 아이캔두잇 떡메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/q2o2QvjGN.png`,
            name: "q2o2QvjGN.png",
            originalnam9: "memo2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>키치키치 아이캔두잇 떡메모지</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "수집가무무 미니메모지 오트밀체크",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/0GsRh-yDj.png`,
            name: "0GsRh-yDj.png",
            originalnam9: "memo3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>수집가무무 미니메모지 오트밀체크</p>
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "키치키치 체크리스트 떡메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/XV_uoXImA.png`,
            name: "XV_uoXImA.png",
            originalnam9: "memo4.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>키치키치 체크리스트 떡메모지</p>
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "모먼트미모먼트 픽미 핑크 떡메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/iOsypaLrm.png`,
            name: "iOsypaLrm.png",
            originalnam9: "memo5.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>모먼트미모먼트 픽미 핑크 떡메모지</p>
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "람지 봄꽃 메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/1v8dEQ7RA.png`,
            name: "1v8dEQ7RA.png",
            originalnam9: "memo6.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>람지 봄꽃 메모지</p>
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "엑스디 에그위클리 떡메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/Cu1S2KnL7.png`,
            name: "Cu1S2KnL7.png",
            originalnam9: "memo7.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>엑스디 에그위클리 떡메모지</p>
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "게이트17 영수증 떡메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/_vAhcQlQN.png`,
            name: "_vAhcQlQN.png",
            originalnam9: "memo8.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>게이트17 영수증 떡메모지</p>
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
        price: 3500,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "게이트17 보딩패스 떡메모지",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/usmF3VrjY.png`,
            name: "usmF3VrjY.png",
            originalnam9: "memo9.png",
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
        price: 2900,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "햄찌세자매 줄줄이 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/jcIHJbEz_.png`,
            name: "jcIHJbEz_.png",
            originalnam9: "sticker1.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>햄찌세자매 줄줄이 스티커</p>
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
        price: 2900,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "소다냥 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/lPQauMHO5.png`,
            name: "lPQauMHO5.png",
            originalnam9: "sticker2.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>소다냥 스티커</p>
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
        price: 2900,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "미어독 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/Pp946WtoZ.png`,
            name: "Pp946WtoZ.png",
            originalnam9: "sticker3.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>미어독 스티커</p>
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
        price: 12900,
        shippingFees: 3500,
        show: true,
        active: true,
        name: "오늘은 뭐할까? 스티커팩",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/Wye2NG_OB.png`,
            name: "Wye2NG_OB.png",
            originalnam9: "sticker4.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>오늘은 뭐할까? 스티커팩</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "달콤한 여름간식! 스티커팩",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/7MqP5fX2r.png`,
            name: "7MqP5fX2r.png",
            originalnam9: "sticker5.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>달콤한 여름간식! 스티커팩</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "꽃향기가 나는날팩 스티커팩",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/CjKEIa_31.png`,
            name: "CjKEIa_31.png",
            originalnam9: "sticker6.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>꽃향기가 나는날팩 스티커팩</p>
            <p>유테씰 3종 + 모조지 스티커 3종</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "폼폼컨페티 메론",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/uohUPajtN.png`,
            name: "uohUPajtN.png",
            originalnam9: "sticker7.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>폼폼컨페티 메론</p>
            <p>리무버블 약 6.33 * 14</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "폼폼컨페티 딸기",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/Asxq8GHyW.png`,
            name: "Asxq8GHyW.png",
            originalnam9: "sticker8.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>폼폼컨페티 딸기</p>
            <p>리무버블 약 6.33 * 14</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "폼폼컨페티 푸딩",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/wpDsHVKll.png`,
            name: "wpDsHVKll.png",
            originalnam9: "sticker9.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>폼폼컨페티 푸딩</p>
            <p>리무버블 약 6.33 * 14</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "폼폼컨페티 스노우",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/oe5VQpDnh.png`,
            name: "oe5VQpDnh.png",
            originalnam9: "sticker10.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>폼폼컨페티 스노우</p>
            <p>리무버블 약 6.33 * 14</p>
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "손글씨 알파벳 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/344pDx8Hx.png`,
            name: "344pDx8Hx.png",
            originalnam9: "sticker11.png",
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
        shippingFees: 3500,
        show: true,
        active: true,
        name: "플러피 알파벳 스티커",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/i4D0RKFw7.png`,
            name: "i4D0RKFw7.png",
            originalnam9: "sticker12.png",
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
            name: "헬로카봇 스톰다이버",
            image: {
              path: `/files/${clientId}/sample-diver.jpg`,
              name: "sample-diver.jpg",
              originalname: "헬로카봇.jpg",
            },
            quantity: 2,
            price: 34520,
            review_id: 3,
          },
        ],
        cost: {
          products: 34520,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 37020,
        },
        address: {
          name: "회사",
          value: "서울시 강남구 신사동 234",
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
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
            name: "레고 클래식 라지 조립 박스 10698",
            image: {
              path: `/files/${clientId}/sample-classic.jpg`,
              name: "sample-classic.jpg",
              originalname: "레고 클래식.jpg",
            },
            quantity: 1,
            price: 48870,
          },
          {
            _id: 4,
            seller_id: 3,
            state: "OS010",
            name: "레고 테크닉 42151 부가티 볼리드",
            image: {
              path: `/files/${clientId}/sample-bugatti.png`,
              name: "sample-bugatti.png",
              originalname: "부가티.png",
            },
            quantity: 2,
            price: 90000,
            review_id: 2,
          },
        ],
        cost: {
          products: 138840,
          shippingFees: 3500,
          discount: {
            products: 13880,
            shippingFees: 3500,
          },
          total: 124960,
        },
        address: {
          name: "집",
          value: "서울시 강남구 역삼동 123",
        },
        createdAt: getTime(-4, -60 * 60 * 22),
        updatedAt: getTime(-2, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS040",
        products: [
          {
            _id: 4,
            seller_id: 3,
            state: "OS110",
            name: "레고 테크닉 42151 부가티 볼리드",
            image: {
              path: `/files/${clientId}/sample-bugatti.png`,
              name: "sample-bugatti.png",
              originalname: "부가티.png",
            },
            quantity: 1,
            price: 45000,
            review_id: 1,
          },
        ],
        cost: {
          products: 45000,
          shippingFees: 3500,
          discount: {
            products: 4500,
            shippingFees: 0,
          },
          total: 44000,
        },
        address: {
          name: "학교",
          value: "서울시 강남구 역삼동 234",
        },
        payment: {
          success: true,
          imp_uid: "imp_138601212227",
          pay_method: "card",
          merchant_uid: "mid_1702540599641",
          name: "레고 테크닉 42151 부가티 볼리드",
          paid_amount: 45000,
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
            name: "헬로카봇 스톰다이버",
            image: {
              path: `/files/${clientId}/sample-diver.jpg`,
              name: "sample-diver.jpg",
              originalname: "헬로카봇.jpg",
            },
            quantity: 1,
            price: 17260,
            review_id: 2,
          },
        ],
        cost: {
          products: 17260,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 19760,
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
        value: 3500,
      },
      {
        _id: "freeShippingFees",
        title: "배송비 무료 금액",
        value: 50000,
      },
    ],
  };
};
