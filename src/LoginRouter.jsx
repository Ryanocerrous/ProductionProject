import App from './App.jsx';
import AuthPage from './pages/AuthPage.jsx';

const isAuthRoute = window.location.pathname.replace(/\/$/, '') === '/login';

function LoginRouter() {
  return isAuthRoute ? <AuthPage /> : <App />;
}

export default LoginRouter;
