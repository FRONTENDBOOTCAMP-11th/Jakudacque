import { useEffect, useRef } from 'react';
import useUserStore from '@zustand/userStore';

export default function ChannelTalk() {
 const channelTalkRef = useRef(null);
 const user = useUserStore(state => state.user); // 사용자 정보 가져오기

 useEffect(() => {
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

   // 사용자 정보가 변경될 때 채널톡 업데이트
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

 return null;
}