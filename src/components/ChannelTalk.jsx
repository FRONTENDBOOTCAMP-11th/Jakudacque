import { useEffect, useRef } from 'react';
import useUserStore from '@zustand/userStore';
import { useLocation } from 'react-router-dom';

function ChannelTalk() {
  const channelTalkRef = useRef(null);
  const user = useUserStore(state => state.user);
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

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
    channelTalkRef.current = script;

    script.onload = () => {
      window.ChannelIO('boot', {
        "pluginKey": "81010319-9027-4bd0-8c9d-2f19caa0f5d1",
        "memberId": user?.id || '',
        "profile": {
          "name": user?.name || '게스트',
          "email": user?.email || ''
        },
        "hideChannelButtonOnBoot": true // 초기 로딩 시 버튼이 잠깐 보였다가 사라지는 것을 방지하기 위한 안전장치로 사용(없어도 됨)
      });
    };

    document.head.appendChild(script);
  };

  // 초기화는 한 번만
  useEffect(() => {
    if (!window.ChannelIO) {
      initializeChannelTalk();
    }
  }, []);

  // 페이지 변경 감지 및 처리
  useEffect(() => {
    const isAuthPage = location.pathname.startsWith('/admin') ||
                      location.pathname.startsWith('/user/signin') ||
                      location.pathname.startsWith('/user/signup');

    if (window.ChannelIO) {
      if (isAuthPage) {
        window.ChannelIO('hideChannelButton');
      } else {
        window.ChannelIO('showChannelButton');
      }
    }
  }, [location.pathname]);

  return null;
}

export default ChannelTalk;