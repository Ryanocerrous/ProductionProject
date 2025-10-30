import { useState } from 'react';
import Button from '../components/Button.jsx';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="auth-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <span className="badge">{isLogin ? 'Secure access' : 'Create account'}</span>
          <h1>{isLogin ? 'Sign in to ByteBite Ops' : 'Launch your ByteBite profile'}</h1>
          <p>
            {isLogin
              ? 'Use your field-issued credentials to reach the operations console.'
              : 'Provision a new operator account for staging field deployments and mission rehearsals.'}
          </p>
        </header>

        <form className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Alex Mercer" autoComplete="name" required />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="alex@agency.gov" autoComplete="email" required />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required />
          </div>

          {!isLogin && (
            <div className="auth-field">
              <label htmlFor="confirm">Confirm password</label>
              <input id="confirm" name="confirm" type="password" placeholder="••••••••" autoComplete="new-password" required />
            </div>
          )}

          <Button type="submit">{isLogin ? 'Secure login' : 'Create account'}</Button>
        </form>

        <footer className="auth-footer">
          <button type="button" onClick={() => setIsLogin((prev) => !prev)}>
            {isLogin ? 'Need an account? Register here.' : 'Already have access? Sign in instead.'}
          </button>
        </footer>
      </div>
    </main>
  );
}

export default AuthPage;
