// React Imports
import { FC, Fragment, useState } from "react";

// React Query Imports
import { UserLoginMutationHook } from "@/services/react-query-client/auth/user-login";

// Custom Component Imports
import { Button } from "@/components/ui/button";
import { setCookieClientSideFn } from "@/utils/storage.util";
import Router from "next/router";

interface ISignInViewProps {}

const SignInView: FC<ISignInViewProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync } = UserLoginMutationHook();

  /**
   * @description Handles the login process for the user
   *
   * @returns {void}
   */
  const handleLogin = async (formData: FormData): Promise<void> => {
    console.log("inside login");
    const userName = formData.get("username") as string;
    const password = formData.get("password") as string;

    console.log(userName);
    console.log(password);

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("inside login if");
        setCookieClientSideFn("accessToken", data.token); // Fixed typo in token name
        Router.push("/product"); // Redirect to the products page
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("inside submit");

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleLogin(formData);
  };

  return (
    <Fragment>
      <section className="">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="border-2 border-black border-solid lg:px-10 lg:py-10 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>

            <form
              action="#"
              method="POST"
              className="mt-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    User Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      name="username"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      name="password"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Get started{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SignInView;
