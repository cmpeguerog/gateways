import {api as rest} from "./Axios";
import {useEffect, useMemo} from "react";
import {debug, error} from "../utils/logger/logger";
import {useHistory} from "react-router-dom";
import isUnauthorized from "../components/validation/is-unauthorized";
import env from "../utils/env";

const withLogs = env("LOG_AXIOS", "0") === "1";

const useAuthentication = function ({withKeyValidation = true}) {
  const history = useHistory();

  const request = useMemo(() => {
    const token = localStorage.getItem("token");

    return rest.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;

        withLogs && debug(config, "useAuthentication.js");

        return config;
      },
      (throwable) => {
        withLogs && error(throwable, "useAuthentication.js");

        return Promise.reject(throwable);
      }
    );
  }, []);

  const response = useMemo(() => {
    return rest.interceptors.response.use(
      (response) => {
        withLogs && debug(response, "useAuthentication.js");
        return response;
      },
      (throwable) => {
        withLogs && error(throwable, "useAuthentication.js");
        if (isUnauthorized(throwable)) {
          localStorage.removeItem("token");
          history.replace("/login");
        }

        return Promise.reject(throwable);
      }
    );
  }, [history]);

  useEffect(() => {
    if (withKeyValidation) {
      const token = localStorage.getItem("token");
      if (token === null) {
        history.replace("/login");
      }
    }
    return () => {
      rest.interceptors.request.eject(request);
      rest.interceptors.response.eject(response);
    };
  }, [request, response, history, withKeyValidation]);
};

export default useAuthentication;
