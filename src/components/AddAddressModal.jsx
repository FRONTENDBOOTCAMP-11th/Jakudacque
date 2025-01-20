import useAddAddressModalState from "@zustand/AddAddressModalState";
import useAddressStore from "@zustand/AddressStore";
// import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";

export default function AddAddressModal() {
  const { modalIsOpen } = useAddAddressModalState();

  const handleModal = useAddAddressModalState(state => state.handleModal);

  const addAddress = useAddressStore(state => state.addAddress);

  // 주소 데이터
  const { addressData } = useAddressStore();

  // 배송지 추가 폼
  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: resetAddress,
  } = useForm({ mode: "onsubmit" });

  // 배송지 추가 폼 제출
  const onAddressSubmit = data => {
    if (addressData.length) {
      data.id = addressData[addressData.length - 1].id + 1;
    } else {
      data.id = 1;
    }
    addAddress(data);
    handleModal();
    resetAddress();
  };

  return (
    modalIsOpen && (
      <Container>
        <ModalWindow>
          <ModalMsgArea>
            <div className="flex flex-col gap-y-2">
              <form onSubmit={handleAddressSubmit(onAddressSubmit)}>
                <StyledFormContainer>
                  <InfoTitle>배송지 추가</InfoTitle>
                  <StyledGridContainer>
                    <label htmlFor="addressName">배송지명</label>
                    <input
                      type="text"
                      id="addressName"
                      className="px-1 border rounded-md focus:outline-none border-neutral-400"
                      {...registerAddress("name", {
                        required: "배송지명을 입력해주세요.",
                      })}
                    />
                    {addressErrors.name && (
                      <ErrorText>{addressErrors.name.message}</ErrorText>
                    )}
                    <label htmlFor="address">주소</label>
                    <input
                      type="text"
                      id="address"
                      className="px-1 border rounded-md focus:outline-none border-neutral-400"
                      {...registerAddress("value", {
                        required: "주소를 입력해주세요.",
                      })}
                    />
                    {addressErrors.value && (
                      <ErrorText>{addressErrors.value.message}</ErrorText>
                    )}
                  </StyledGridContainer>
                </StyledFormContainer>
                <ModalBtnArea>
                  <button
                    className="px-16 py-3 border-r rounded-l border-neutral-300 hover:bg-secondary-base flex justify-center"
                    onClick={handleModal}
                  >
                    취소
                  </button>
                  <button
                    className="grow px-16 py-3 rounded-b hover:bg-secondary-base flex justify-center text-align"
                    onClick="submit"
                  >
                    추가
                  </button>
                </ModalBtnArea>
              </form>
            </div>
          </ModalMsgArea>
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
    border-b
    border-neutral-300
  `;

// 모달 버튼 영역
const ModalBtnArea = tw.div`
    flex
    text-sm
    text-align
    border-t
  `;

const InfoTitle = tw.p`
  pb-2 text-lg font-semibold border-b border-neutral-300
`;

const StyledFormContainer = tw.div`
  flex flex-col gap-y-7 p-6
`;

const StyledGridContainer = tw.div`
  grid grid-cols-[88px_minmax(200px,300px)] gap-y-3
`;

const ErrorText = tw.p`
  col-start-2 text-sm text-red-500
`;
