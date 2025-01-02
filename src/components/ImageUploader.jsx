import tw from "tailwind-styled-components";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useRef } from "react";
import { IoPencilSharp } from "react-icons/io5";
import PropTypes from "prop-types";
// import { resolve } from "path";

ImageUploader.propTypes = {
  imgUrl: PropTypes.string,
  setImgUrl: PropTypes.func.isRequired,
};

export default function ImageUploader({ imgUrl, setImgUrl }) {
  const image = useRef(null);
  const axios = useAxiosInstance();

  const onFileChanged = async e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("attach", file);

    const response = await axios("/files", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    const data = await response.data.item[0];
    setImgUrl(data.path);
  };
  const onRemoveImage = () => {
    setImgUrl("");
  };
  const onClick = () => {
    image.current && image.current.click();
  };

  return (
    <div className="flex flex-col h-full">
      <ImageContainer onClick={onClick}>
        <div className="absolute flex items-center justify-center w-full h-full transition-opacity opacity-0 cursor-pointer overlay rounded-t-md hover:bg-stone-900 hover:opacity-80">
          <span className="sr-only ">이미지 업로드 버튼</span>
          <IoPencilSharp color="white" size={24} />
        </div>
        <input
          ref={image}
          type="file"
          accept="image/png, image/bmp, image/jpeg, image/jpg, image/jpe"
          className="hidden w-full text-xs text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-xs file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
          onChange={e => onFileChanged(e)}
        />
        <div className="flex justify-center p-10">
          {imgUrl && <img src={imgUrl} alt="이미지 미리보기" />}
        </div>
      </ImageContainer>

      <BtnRemove onClick={onRemoveImage}>이미지 삭제</BtnRemove>
    </div>
  );
}
const ImageContainer = tw.div`
image-container
relative 
flex-1 flex justify-center
max-h-96
rounded-t-md bg-gray-100
`;
const BtnRemove = tw.button`
  remove-btn
  w-full h-12
  text-sm font-semibold
  rounded-b-md bg-red-500 text-white
`;
