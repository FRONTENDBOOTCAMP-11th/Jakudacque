import useModalState from "@zustand/modalState";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

export default function Modal() {
  const { modalIsOpen } = useModalState();

  const handleModal = useModalState(state => state.handleModal);

  return (
    modalIsOpen && (
      <Container>
        <ModalWindow>
          <ModalMsgArea>
            <p>선택하신 상품을 장바구니에 담았습니다.</p>
          </ModalMsgArea>
          <ModalBtnArea>
            <button
              className="w-[140px] py-[12px] border-r border-neutral-300 rounded-b hover:bg-secondary-base"
              onClick={handleModal}
            >
              계속 쇼핑
            </button>
            <Link
              to="/cart"
              className="w-[140px] py-[12px] rounded-b hover:bg-secondary-base flex justify-center"
              onClick={handleModal}
            >
              장바구니 가기
            </Link>
          </ModalBtnArea>
        </ModalWindow>
      </Container>
    )
  );
}

// 전체 컨테이너
const Container = tw.div`
    fixed
    z-[60]
    inset-0
    bg-neutral-800/80
    flex
    justify-center
    items-center
  `;

// 모달창
const ModalWindow = tw.div`
    w-[280px]
    bg-white
    flex
    flex-col
    rounded
    text-sm
  `;

// 모달 메시지 영역
const ModalMsgArea = tw.div`
    py-[52px]
    pb-[46px]
    px-[26px]
    border-b
    border-neutral-300
  `;

// 모달 버튼 영역
const ModalBtnArea = tw.div`
    flex
    text-sm
  `;
