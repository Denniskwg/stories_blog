import React, { useCallback, useContext, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthContextInterface } from "./auth-context";
import { reducer } from "./reducer";
import { initialAuthState, User } from "./auth-state";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  TOKEN_LOCALSTORAGE_KEY,
  EXPIRES_AT,
} from "./auth";


interface AuthProviderOptions {
  children?: React.ReactNode;
}

let refreshPromise: Promise<AxiosResponse<any, any>> | null = null;

export const AuthProvider = (opts: AuthProviderOptions): JSX.Element => {
  const { children } = opts;
  const HOST_URL = process.env.REACT_APP_API_HOST_URL || "http://localhost:8000/";
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || "xwYKg1b4eazi2OPlObUOzBvZaqoQ7z866Bcd2dVx";
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || "fa8K70L2nPaiUFQo47xp9xJRwVbq8Pg1yqZXXCRHo5I3wLG0B95NBLIwzXzPtkkIOvDyz9hpF3Ip8ZA6YeDigOMMmzuS5VArLyGN6SOfBXaPmcaqPA0mrKh1d4lO7hIR";

  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const navigate = useNavigate();


  const refreshToken = useCallback((username: string, password: string): Promise<AxiosResponse<any>> => {
    const local = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
      if (local === null) {
        reject("already refreshing or localstorage token not found");
        return;
      }
      const token = JSON.parse(local);
      const url = HOST_URL + "o/token/";
      const request = axios.post(
        url,
        new URLSearchParams({
          username: username,
          password: password,
          refresh_token: token.refresh_token,
          grant_type: "password",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      request
        .then((res) => {
          const token = JSON.stringify(res.data);
          let expires_at = new Date();
          expires_at.setHours(expires_at.getHours() + 1)
          localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
          expires_at = '' + expires_at.getTime();
          localStorage.setItem(EXPIRES_AT, expires_at);
          navigate(-1);
          resolve(res);
        })
        .catch((err) => {
          navigate("/login", { replace: true });
          reject(err);
        });
    });
  }, [CLIENT_ID, CLIENT_SECRET, HOST_URL, navigate]);

  const getClient = useCallback((): AxiosInstance => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use((config) => {
      const local = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
      if (!config.url?.includes(HOST_URL)) config.url = HOST_URL + config.url;
      dispatch({ type: "LOADING", value: true });
      if (local === null) return config;
      const token = JSON.parse(local).access_token;
      if (token && config.headers !== undefined) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    newInstance.interceptors.response.use(
      (response) => {
        dispatch({ type: "LOADING", value: false });
        return response;
      },
      async (error) => {
        dispatch({ type: "LOADING", value: false });
        const originalRequest = error.config;
        if (error.response === undefined) return Promise.reject(error);
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          if (refreshPromise === null) {
            const prom = refreshToken().then((res) => {
              refreshPromise = null;
              return res;
            });
            refreshPromise = prom;
            await prom;
          } else {
            await refreshPromise;
          }

          return newInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
    return newInstance;
  }, [HOST_URL, refreshToken]);

  const login = useCallback(
    async (username: string, password: string): Promise<AxiosResponse<any>> => {
        const url = HOST_URL + "o/token/";
        const request = axios.post(
          url,
          new URLSearchParams({
            username: username,
            password: password,
            grant_type: "password",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
          request
            .then((res) => {
              const token = JSON.stringify(res.data);
              let expires_at = new Date();
              expires_at.setHours(expires_at.getHours() + 1)
              localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
              expires_at = '' + expires_at.getTime()
              localStorage.setItem(EXPIRES_AT, expires_at);
              navigate('/');
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
    },
    [CLIENT_ID, CLIENT_SECRET, HOST_URL, navigate]
  );

  const createUser = useCallback(
    async (
      username: string,
      password: string,
      firstName: string,
      lastName: string,
      email: string
    ) => {
      const url = HOST_URL + "register";
      const request = await axios.post(
        url,
        {
          user_name: username,
          password: password,
          first_name: firstName,
          last_name: lastName,
          email: email
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(request);
      //await request;
    },
    [HOST_URL]
  );

  const contextValue = useMemo(() => {
    return {
      ...state,
      refreshToken,
      login,
      createUser,
      getClient,
    };
  }, [state, refreshToken, login, createUser, getClient]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = <
  TUser extends User = User
>(): AuthContextInterface<TUser> =>
  useContext(AuthContext) as AuthContextInterface<TUser>;
