import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LoginRegister() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const [toggleButton, setToggleButton] = useState(false);
  const [formClass, setFormClass] = useState({
    title: "Inicia sesión con tu cuenta",
    link: "Crea tu cuenta",
    footerClass: "flex items-center justify-between",
    button: "Iniciar Sesión",
  });

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/user/supervisor/register",
    }).then((res) => console.log(res));
  };
  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/user/supervisor/login",
    }).then((res) => console.log(res));
  };
  const getUser = () => {
    console.log("aqui");
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/api/user/supervisor",
    })
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleUsername = (e) => {
    if (toggleButton) {
      setRegisterUsername(e.target.value);
    } else {
      setLoginUsername(e.target.value);
    }
  };
  const handlePassword = (e) => {
    if (toggleButton) {
      setRegisterPassword(e.target.value);
    } else {
      setLoginPassword(e.target.value);
    }
  };
  const handleButton = () => {
    if (toggleButton) {
      register();
    } else {
      login();
    }
  };
  const handleFormInfo = () => {
    if (toggleButton) {
      setFormClass({
        title: "Inicia sesión con tu cuenta",
        link: "Crea tu cuenta",
        footerClass: "flex items-center justify-between",
        button: "Iniciar Sesión",
      });
    } else {
      setFormClass({
        title: "Crea una cuenta",
        link: "Inicia sesión",
        footerClass: "hidden",
        button: "Registrar",
      });
    }
    setToggleButton(!toggleButton);
  };
  return (
    <div>
      {/*<div>
      <h1>Get User</h1>
      <button onClick={getUser}>Submit</button>
      {data ? <h1>Bienvenido {data.username}</h1> : null}
    </div>*/}

      <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {formClass.title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              o&nbsp;
              <Link
                to=""
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={handleFormInfo}
              >
                {formClass.link}
              </Link>
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Correo Electrónico"
                  onChange={handleUsername}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  onChange={handlePassword}
                />
              </div>
            </div>

            <div className={formClass.footerClass}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recordar Cuenta
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to=""
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleButton}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {formClass.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
