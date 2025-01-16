import { useEffect, useRef } from "react";
import useUserStore from "@zustand/userStore";

export default function ChannelTalk() {
  const channelTalkRef = useRef(null);
  const user = useUserStore(state => state.user);

  const isAuthPage = () => {
    const path = window.location.pathname;
    return (
      path.startsWith("/admin") ||
      path.startsWith("/user/signin") ||
      path.startsWith("/user/signup")
    );
  };

  const cleanupChannelTalk = () => {
    if (window.ChannelIO) {
      window.ChannelIO("shutdown");
    }
    const existingScript = document.querySelector('script[src*="channel.io"]');
    if (existingScript) {
      existingScript.remove();
    }
    window.ChannelIO = undefined;
  };

  const initChannelTalk = () => {
    cleanupChannelTalk();

    if (isAuthPage()) {
      return;
    }

    const ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    window.ChannelIO = ch;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
    channelTalkRef.current = script;

    script.onload = () => {
      if (!window.ChannelIO) return;
      window.ChannelIO("boot", {
        pluginKey: "81010319-9027-4bd0-8c9d-2f19caa0f5d1",
        memberId: user?.id || "",
        profile: {
          name: user?.name || "게스트",
          email: user?.email || "",
        },
      });
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    // 페이지 로드/새로고침 시 초기화
    initChannelTalk();

    // history 변경 감지 (뒤로가기, 앞으로가기, pushState)
    const handleRouteChange = () => {
      setTimeout(() => {
        initChannelTalk();
      }, 100);
    };

    window.addEventListener("popstate", handleRouteChange);

    // React Router의 history.push() 감지
    const originalPushState = window.history.pushState;
    window.history.pushState = function () {
      originalPushState.apply(this, arguments);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.history.pushState = originalPushState;
      cleanupChannelTalk();
    };
  }, [user]);

  return null;
}
