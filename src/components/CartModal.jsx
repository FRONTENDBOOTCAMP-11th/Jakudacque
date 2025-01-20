import cartModalState from "@zustand/cartModalState";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

export default function CartModal() {
  const { modalIsOpen } = cartModalState();

  const handleModal = cartModalState(state => state.handleModal);

  return (
    modalIsOpen && (
      <Container>
        <ModalWindow>
          <ModalMsgArea>
            <p>선택하신 상품을 장바구니에 담았습니다.</p>
          </ModalMsgArea>
          <ModalBtnArea>
            <button
              className="flex-1 py-3 border-r rounded-b border-neutral-300 hover:bg-secondary-base"
              onClick={handleModal}
            >
              계속 쇼핑
            </button>
            <Link
              to="/cart"
              className="flex justify-center flex-1 py-3 rounded-b hover:bg-secondary-base"
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
    z-50
    inset-0
    bg-neutral-800/80
    flex
    justify-center
    items-center
  `;

// 모달창
const ModalWindow = tw.div`
    w-72 min-h-44
    bg-white
    flex
    flex-col
    rounded
    text-sm
  `;

// 모달 메시지 영역
const ModalMsgArea = tw.div`
    flex-1 flex items-center justify-center
    px-6
    border-b
    border-neutral-300
  `;

// 모달 버튼 영역
const ModalBtnArea = tw.div`
    flex
    text-sm
  `;
