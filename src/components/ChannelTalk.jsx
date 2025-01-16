import { useEffect, useRef, Component } from 'react';
import useUserStore from '@zustand/userStore';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // prop-types import 추가

// ErrorBoundary 컴포넌트
class ChannelTalkErrorBoundary extends Component {
  // propTypes 정의
  static propTypes = {
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('ChannelTalk Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function ChannelTalk() {
  const channelTalkRef = useRef(null);
  const user = useUserStore(state => state.user);
  const location = useLocation();

  useEffect(() => {
    const isAuthPage = location?.pathname.startsWith('/admin') ||
                      location?.pathname.startsWith('/user/signin') ||
                      location?.pathname.startsWith('/user/signup');

    const isInitialized = !!window.ChannelIO;

    // 인증 페이지일 때는 숨기기
    if (isAuthPage && isInitialized) {
      window.ChannelIO('hide');
      return;
    }

    // 이미 초기화되어 있으면 아무것도 하지 않음
    if (isInitialized) {
      return;
    }

    // 최초 한 번만 초기화
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
        }
      });
    };

    document.head.appendChild(script);

    // cleanup
    return () => {
      if (isAuthPage && isInitialized) {
        window.ChannelIO('hide');
      }
    };
  }, [user]); // location.pathname 의존성 제거

  return null;
}

// 단순화된 래퍼 컴포넌트
const WrappedChannelTalk = () => (
  <ChannelTalkErrorBoundary>
    <ChannelTalk />
  </ChannelTalkErrorBoundary>
);

export default WrappedChannelTalk;