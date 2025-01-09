import { useEffect, useRef } from 'react';
import useUserStore from '@zustand/userStore';

export default function ChannelTalk() {
  const channelTalkRef = useRef(null);
  const user = useUserStore(state => state.user);

  const isAuthPage = () => {
    const path = window.location.pathname;
    return path.startsWith('/admin') || 
           path.includes('/signin') || 
           path.includes('/signup');
  };

  useEffect(() => {
    // 관리자 페이지나 인증 페이지면 초기화하지 않음
    if (isAuthPage()) return;

    const initChannelTalk = () => {
      if (window.ChannelIO) {
        return;
      }

      const w = window;
      if (w.ChannelIO) return;

      const ch = function() {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function(args) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      channelTalkRef.current = script;

      script.onload = () => {
        w.ChannelIO('boot', {
          "pluginKey": "81010319-9027-4bd0-8c9d-2f19caa0f5d1",
          "memberId": user?.id,
          "profile": {
            "name": user?.name || '게스트',
            "email": user?.email
          }
        });
      };

      document.head.appendChild(script);
    };

    initChannelTalk();

    if (window.ChannelIO && user) {
      window.ChannelIO('updateUser', {
        "memberId": user.id,
        "name": user.name,
        "email": user.email
      });
    }

    return () => {
      if (window.ChannelIO) {
        window.ChannelIO('shutdown');
      }
      if (channelTalkRef.current && channelTalkRef.current.parentNode) {
        channelTalkRef.current.parentNode.removeChild(channelTalkRef.current);
      }
    };
  }, [user]);

  // 관리자 페이지나 인증 페이지면 null 반환
  if (isAuthPage()) return null;

  return null;
}