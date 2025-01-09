import { useHandleWish } from "@hooks/useHandleWish";
import useUserStore from "@zustand/userStore";
import { useEffect } from "react";

export default function RestoreWishList() {
  const { refetchAll } = useHandleWish();
  const user = useUserStore(state => state.user);

  useEffect(() => {
    if (user) {
      refetchAll(); // 로그인 상태일 때만 호출
    }
  }, [user, refetchAll]);
}
