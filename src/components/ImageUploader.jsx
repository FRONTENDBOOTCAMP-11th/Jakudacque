import tw from "tailwind-styled-components";
import { useRef, useState } from "react";

import { HiPencil } from "react-icons/hi2";
import { resolve } from "path";

export default function ImageUploader() {
  const [imgUrl, setImgUrl] = useState("");
  const image = useRef(null);
  const onFileChanged = e => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = data => {
        setImgUrl(data.target?.result);
        resolve();
      };
    }
  };
  const onRemoveImage = () => {
    setImgUrl("");
  };
  const onClick = () => {
    image.current && image.current.click();
  };

  return (
    <>
      <form className="flex flex-col">
        <ImageContainer onClick={onClick}>
          <div className="absolute flex items-center justify-center w-full h-full transition-opacity opacity-0 cursor-pointer overlay rounded-t-md hover:bg-stone-900 hover:opacity-80">
            <HiPencil color="white" />
          </div>
          <label className="block">
            <input
              ref={image}
              type="file"
              accept="image/png, image/bmp, image/jpeg, image/jpg, image/jpe"
              className="hidden w-full text-xs text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-xs file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
              onChange={e => onFileChanged(e)}
            />
          </label>
          <div className="flex justify-center p-10">
            {imgUrl && <img src={imgUrl} alt="이미지 미리보기" />}
          </div>
        </ImageContainer>
      </form>
      <BtnRemove onClick={onRemoveImage}>이미지 삭제</BtnRemove>
    </>
  );
}
const ImageContainer = tw.div`
relative max-h-[300px] min-h-[160px]
flex justify-center
rounded-t-md bg-gray-100
`;
const BtnRemove = tw.button`
  w-full h-12
  text-sm font-semibold
  rounded-b-md bg-red-500 text-white
`;
