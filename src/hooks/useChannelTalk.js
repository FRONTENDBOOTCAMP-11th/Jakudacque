import { useEffect } from 'react';

export const useChannelTalk = (user = null) => {  // user 파라미터 추가
  useEffect(() => {
    const loadChannelTalk = async () => {
      const channelTalkScript = document.querySelector('script[src*="channel.io"]');
      
      if (!channelTalkScript) {
        const script = document.createElement('script');
        script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        script.id = 'ch-plugin';
        script.async = true;

        script.onload = () => {
          if (window.ChannelIO) {
            window.ChannelIO('boot', {
              "pluginKey": "81010319-9027-4bd0-8c9d-2f19caa0f5d1",
              "memberId": user?.id || '',          // 사용자 ID
              "profile": {
                "name": user?.name || '게스트',     // 사용자 이름
                "email": user?.email || '',        // 이메일
                "mobileNumber": user?.phone || '', // 전화번호
                "avatarUrl": user?.image || ''     // 프로필 이미지
              }
            });
          }
        };

        document.head.appendChild(script);
      } else {
        if (window.ChannelIO) {
          if (user) {
            // 로그인 상태: 사용자 정보 업데이트
            window.ChannelIO('updateUser', {
              "memberId": user.id,
              "name": user.name,
              "email": user.email,
              "mobileNumber": user.phone,
              "avatarUrl": user.image
            });
          } else {
            // 로그아웃 상태: 채널톡 리셋
            window.ChannelIO('reset');
          }
        }
      }
    };

    loadChannelTalk();

    return () => {
      if (window.ChannelIO) {
        window.ChannelIO('shutdown');
      }
    };
  }, [user]); // user를 의존성 배열에 추가
};