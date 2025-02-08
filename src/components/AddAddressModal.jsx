import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";

export default function AddAddressModal({
  isOpen,
  setIsOpen,
  address,
  setAddress,
}) {
  // 배송지 추가 폼
  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: resetAddress,
  } = useForm({ mode: "onsubmit" });

  // 배송지 추가 폼 제출
  const onAddressSubmit = data => {
    if (address.length) {
      data.id = address[address.length - 1].id + 1;
    } else {
      data.id = 1;
    }
    setAddress(prev => [...prev, data]);
    setIsOpen(false);
    resetAddress();
  };

  return (
    <>
      {isOpen && (
        <Container onClick={() => setIsOpen(false)}>
          <ModalWindow onClick={e => e.stopPropagation()}>
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
                        className="px-2 py-1 border rounded-md focus:outline-none border-neutral-400"
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
                        className="px-2 py-1 border rounded-md focus:outline-none border-neutral-400"
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
                      className="grow px-16 py-3 border-r rounded-l border-neutral-300 hover:bg-secondary-base flex justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="grow px-16 py-3 rounded-b hover:bg-secondary-base flex justify-center text-align"
                    >
                      추가
                    </button>
                  </ModalBtnArea>
                </form>
              </div>
            </ModalMsgArea>
          </ModalWindow>
        </Container>
      )}
    </>
  );
}

AddAddressModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  address: PropTypes.arrayOf(PropTypes.shape()),
  setAddress: PropTypes.func,
};

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
  grid grid-cols-[88px_minmax(200px,300px)] gap-y-3 items-center
`;

const ErrorText = tw.p`
  col-start-2 text-sm text-red-500
`;
