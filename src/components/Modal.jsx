import tw from "tailwind-styled-components";

export default function Modal() {
  // 전체 컨테이너
  const Container = tw.div`
    fixed
    z-[60]
    inset-0
    bg-[#333]/80
    flex
    justify-center
    items-center
  `;

  // 모달창
  const Modal = tw.div`
    w-[280px]
    bg-white
    flex
    flex-col
    rounded
    text-[14.5px]
  `;

  // 모달 메시지 영역
  const ModalMsgArea = tw.div`
    py-[52px]
    pb-[46px]
    px-[26px]
    border-b
    border-[#ddd]
  `;

  // 모달 버튼 영역
  const ModalBtnArea = tw.div`
    flex
    text-[14px]
  `;

  return (
    <Container>
      <Modal>
        <ModalMsgArea>
          <p>선택하신 상품을 장바구니에 담았습니다.</p>
        </ModalMsgArea>
        <ModalBtnArea>
          <button className="w-[139.5px] py-[12px] border-r border-[#ddd] rounded-b hover:bg-secondary-base">
            계속 쇼핑
          </button>
          <button className="w-[139.5px] py-[12px] rounded-b hover:bg-secondary-base">
            장바구니 가기
          </button>
        </ModalBtnArea>
      </Modal>
    </Container>
  );
}
