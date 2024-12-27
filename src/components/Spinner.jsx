import { ScaleLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white">
      <ScaleLoader />
    </div>
  );
}
