import { useEffect } from "react";
import useUserStore from "@zustand/userStore";
import { useLocation } from "react-router-dom";

const PLUGIN_KEY = import.meta.env.VITE_CHANNEL_TALK_PLUGIN_KEY;

function ChannelTalk() {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  // 채널톡 초기화 함수
  const initializeChannelTalk = () => {
    const ch = function() {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function(args) {
      ch.q.push(args);
    };
    window.ChannelIO = ch;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
    script.onload = bootChannelTalk;
    document.head.appendChild(script);
  };

  // 채널톡 부트 함수
  const bootChannelTalk = () => {
    if (!PLUGIN_KEY || !window.ChannelIO) return;

    window.ChannelIO("boot", {
      pluginKey: PLUGIN_KEY,
      memberId: user?._id || `guest${Date.now()}`,
      profile: {
        name: user?.name || "비회원",
        meta: {
          userId: user?._id || "",
          type: user?.type || "guest"
        },
      },
    });
  };

  // 초기 마운트 시 한 번만 실행
  useEffect(() => {
    if (!window.ChannelIO) {
      initializeChannelTalk();
    }
  }, []);

  // 유저 정보 변경 시 처리
  useEffect(() => {
    if (window.ChannelIO) {
      window.ChannelIO("shutdown");
      bootChannelTalk();
    }
  }, [user]); // user 정보가 변경될 때마다 채널톡 재시작

  // 페이지 변경 시 버튼 상태 처리
  useEffect(() => {
    const isAuthPage = 
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/user/signin") ||
      location.pathname.startsWith("/user/signup");

    if (window.ChannelIO) {
      window.ChannelIO(isAuthPage ? "hideChannelButton" : "showChannelButton");
    }
  }, [location.pathname]);

  return null;
}

export default ChannelTalk;