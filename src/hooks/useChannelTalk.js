import { useEffect } from "react";

const PLUGIN_KEY = import.meta.env.VITE_CHANNEL_TALK_PLUGIN_KEY;

export const useChannelTalk = (user = null) => {
  // user 파라미터 추가
  useEffect(() => {
    const loadChannelTalk = async () => {
      const channelTalkScript = document.querySelector(
        'script[src*="channel.io"]',
      );

      if (!channelTalkScript) {
        const script = document.createElement("script");
        script.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        script.id = "ch-plugin";
        script.async = true;

        script.onload = () => {
          if (window.ChannelIO) {
            window.ChannelIO("boot", {
              pluginKey: PLUGIN_KEY,
              memberId: user?.id || "", // 사용자 ID
              profile: {
                name: user?.name || "게스트", // 사용자 이름
                email: user?.email || "", // 이메일
                mobileNumber: user?.phone || "", // 전화번호
                avatarUrl: user?.image || "", // 프로필 이미지
              },
            });
          }
        };

        document.head.appendChild(script);
      } else {
        if (window.ChannelIO) {
          if (user) {
            // 로그인 상태: 사용자 정보 업데이트
            window.ChannelIO("updateUser", {
              memberId: user.id,
              name: user.name,
              email: user.email,
              mobileNumber: user.phone,
              avatarUrl: user.image,
            });
          } else {
            // 로그아웃 상태: 채널톡 리셋
            window.ChannelIO("reset");
          }
        }
      }
    };

    loadChannelTalk();

    return () => {
      if (window.ChannelIO) {
        window.ChannelIO("shutdown");
      }
    };
  }, [user]); // user를 의존성 배열에 추가
};
