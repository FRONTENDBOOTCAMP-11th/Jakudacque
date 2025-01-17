import Address from "@components/Address";
import { useAddress } from "@hooks/useAddress";
import useAddressModalState from "@zustand/AddressModalState";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

export default function AddressModal() {
  const { modalIsOpen } = useAddressModalState();

  const { addressBook, handleModal, mutateCallback } = useAddress();

  // 주소 선택 폼
  const { register, handleSubmit } = useForm();

  // 배송 주소 확정
  const selectedAddress = data => {
    const address = { address: JSON.parse(data) };
    console.log("확정 주소: ", address);
    mutateCallback(address);
  };

  // 배송 주소 처리
  const handleOrder = handleSubmit(data => {
    selectedAddress(data.address);
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
                  <div key={index} className="flex gap-y-2 bg-gray-100 px-4">
                    <input
                      type="radio"
                      name="address"
                      value={JSON.stringify({ name: e.name, value: e.value })}
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
              to="/user/mypage?category=editProfile"
              className="px-16 py-3 border-r border-neutral-300 rounded-b hover:bg-secondary-base flex justify-center"
              onClick={handleModal}
            >
              주소 변경
            </Link>
            <button
              className="grow px-16 py-3 rounded-b hover:bg-secondary-base flex justify-center text-align"
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
    text-sm
  `;

// 모달 메시지 영역
const ModalMsgArea = tw.div`
    p-6
    border-b
    border-neutral-300
  `;

// 모달 버튼 영역
const ModalBtnArea = tw.div`
    flex
    text-sm
    text-align
  `;
