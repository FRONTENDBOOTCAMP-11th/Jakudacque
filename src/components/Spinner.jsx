import { ScaleLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-white">
      <ScaleLoader />
    </div>
  );
}
