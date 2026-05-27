import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Logo } from "../common/Logo";
import "../common/Buttons.scss";
import loginIllustration from "../../assets/pablo-sign-in 1.jpg";
import "./LoginPage.scss";

// Login page component that stores a simple session token and calls onLogin.
// This component is intentionally minimal to support the example app flow.
export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    window.localStorage.setItem("frontend-task:session", "true");
    onLogin();
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <Logo />
        <img className="login-illustration" src={loginIllustration} alt="" />
      </section>
      <section className="login-card">
        <h1>Welcome!</h1>
        <p>Enter details to login.</p>
        <form onSubmit={submit}>
          <span className="input-wrap">
            <Mail size={17} />
            <input
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
          </span>
          <span className="input-wrap">
            <Lock size={17} />
            <input
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
            />
            <button className="show-button" type="button">
              Show
            </button>
          </span>
          <button className="forgot-button" type="button">
            Forgot Password?
          </button>
          <button className="primary-button" type="submit">
            Log in
          </button>
        </form>
      </section>
    </main>
  );
}
