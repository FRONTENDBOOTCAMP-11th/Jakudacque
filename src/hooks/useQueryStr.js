import { useLocation } from "react-router-dom";

export default function useQueryStr() {
  return new URLSearchParams(useLocation().search);
}
