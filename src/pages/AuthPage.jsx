import { useState } from 'react';
import Button from '../components/Button.jsx';

function AuthPage() {
  const [mode, setMode] = useState('login');
  const toggle = () => setMode((prev) => (prev === 'login' ? 'register' : 'login'));

  return (
    <main className="auth-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <span className="badge">{mode === 'login' ? 'Secure access' : 'Create account'}</span>
          <h1>{mode === 'login' ? 'Sign in to ByteBite Ops' : 'Launch your ByteBite profile'}</h1>
          <p>
            {mode === 'login'
              ? 'Use your field-issued credentials to reach the operations console.'
              : 'Provision a new operator account for staging field deployments and mission rehearsals.'}
          </p>
        </header>

        <nav className="auth-switch" aria-label="Authentication mode">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Register
          </button>
          <span className="auth-switch-indicator" aria-hidden="true" data-mode={mode} />
        </nav>

        <form className="auth-form" autoComplete="off">
          {mode === 'register' && (
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

          {mode === 'register' && (
            <div className="auth-field">
              <label htmlFor="confirm">Confirm password</label>
              <input id="confirm" name="confirm" type="password" placeholder="••••••••" autoComplete="new-password" required />
            </div>
          )}

          <Button type="submit" className="auth-submit">
            {mode === 'login' ? 'Secure login' : 'Create account'}
          </Button>
        </form>

        <footer className="auth-footer">
          <button type="button" onClick={toggle}>
            {mode === 'login' ? 'Need an account? Register here.' : 'Already authorized? Sign in instead.'}
          </button>
        </footer>
      </div>
    </main>
  );
}

export default AuthPage;
