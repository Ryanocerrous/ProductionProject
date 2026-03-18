import App from './App.jsx';
import AuthPage from './pages/AuthPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import SupportTopicPage from './pages/SupportTopicPage.jsx';
import { getSupportTopicBySlug } from './content/supportTopics.js';

const currentRoute = window.location.pathname.replace(/\/$/, '') || '/';

function LoginRouter() {
  if (currentRoute === '/login') {
    return <AuthPage />;
  }

  if (currentRoute === '/support') {
    return <SupportPage />;
  }

  if (currentRoute.startsWith('/support/')) {
    const topicSlug = currentRoute.slice('/support/'.length);
    const topic = getSupportTopicBySlug(topicSlug);

    if (topic) {
      return <SupportTopicPage topic={topic} />;
    }

    return <SupportPage />;
  }

  return <App />;
}

export default LoginRouter;
