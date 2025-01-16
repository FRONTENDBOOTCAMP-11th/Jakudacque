import Address from "@components/Address";
import { useUserProfile } from "@hooks/useUserProfile";
import useAddressModalState from "@zustand/AddressModalState";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

export default function Modal() {
  const { modalIsOpen } = useAddressModalState();

  const { addressBook, handleModal, mutateCallback } = useUserProfile();

  // 주소 선택 폼
  const { register, handleSubmit } = useForm();

  // 배송 주소 확정
  const selectedAddress = data => {
    console.log("확정 주소: ", data);
    mutateCallback(data);
  };

  // 구매
  const handleOrder = handleSubmit(data => {
    selectedAddress(data);
    handleModal();
  });
  return (
    modalIsOpen && (
      <Container>
        <ModalWindow>
          <ModalMsgArea>
            <div className="flex flex-col gap-y-2">
              <p className="font-medium text-base mb-2">
                배송 받을 주소를 선택해주세요.
              </p>
              <form action="" className="flex flex-col gap-y-3">
                {addressBook?.map((e, index) => (
                  <div key={index} className="flex gap-y-2 bg-[#f8f8f8] px-4">
                    <input
                      type="radio"
                      name="address"
                      value={e.value}
                      {...register("address")}
                    />
                    <Address address={e} />
                  </div>
                ))}
              </form>
            </div>
          </ModalMsgArea>
          <ModalBtnArea>
            <Link
              to="/user/mypage"
              className="w-[139.5px] py-[12px] border-r border-[#ddd] rounded-b hover:bg-secondary-base flex justify-center"
              onClick={handleModal}
            >
              주소 변경
            </Link>
            <button
              className="w-[139.5px] py-[12px] rounded-b hover:bg-secondary-base flex justify-end"
              onClick={handleOrder}
            >
              구매하기
            </button>
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
    bg-[#333]/80
    flex
    justify-center
    items-center
  `;

// 모달창
const ModalWindow = tw.div`
    w-[400px]
    bg-white
    flex
    flex-col
    rounded
    text-[14.5px]
  `;

// 모달 메시지 영역
const ModalMsgArea = tw.div`
    py-[26px]
    px-[26px]
    border-b
    border-[#ddd]
  `;

// 모달 버튼 영역
const ModalBtnArea = tw.div`
    flex
    text-[14px]
  `;
