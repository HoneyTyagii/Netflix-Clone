import React, { useEffect, useState } from "react";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";
import { useAuth } from "../common/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const [passwordError, setPasswordError] = useState<string | null>(null);

  async function authenticateUser(event: React.SyntheticEvent) {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    if (password.value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setPasswordError(null);

    await signIn(email.value, password.value);
  }

  return (
    <>
      <header className="relative z-[1] w-56">
        <img className="w-full h-full" src={netflixLogo} alt="Netflix logo" />
      </header>
      <main>
        <section className={`absolute top-0 -z-[1] w-full min-h-screen bg-[url("/netflix-cover.jpg")] bg-cover `}></section>
        <section className="absolute inset-0 bg-gradient-to-b from-zinc-900/50"></section>
        <form
          onSubmit={authenticateUser}
          className="relative mx-auto w-[350px] rounded-r-lg bg-black/75 p-16"
        >
          <article className="text-gray-300">
            <h1 className="mb-4 text-4xl text-white">Sign In</h1>
            <section className="flex flex-col gap-4">
              <input
                className="rounded-md bg-zinc-500 p-2 outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Enter username"
              />
              <input
                className="rounded-md bg-zinc-500 p-2 outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <button className="my-8 rounded-md p-2 font-semibold bg-netflixRed text-white outline-none">Sign In</button>
            </section>
            <p>
              New to Netflix?{" "}
              <Link className="text-white" to="/signup">
                Sign up now.
              </Link>
            </p>
          </article>
        </form>
      </main>
    </>
  );
}
