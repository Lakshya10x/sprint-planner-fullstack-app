import { createContext, useContext, useRef, useState } from "react";
import { apiClient, executeBasicAuth } from "../../Api/SprintApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  //     const [number,setNumber] = useState(10)
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  const interceptorRef = useRef(null);

  async function login(username, password) {
    const baToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuth(baToken);

      if (response.status == 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(baToken);

        if (interceptorRef.current !== null) {
          apiClient.interceptors.request.eject(interceptorRef.current);
        }

        interceptorRef.current = apiClient.interceptors.request.use(
          (config) => {
            console.log("intercepting & adding a token");
            config.headers.Authorization = baToken;
            return config;
          }
        );
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUsername(null);

    if (interceptorRef.current !== null) {
      apiClient.interceptors.request.eject(interceptorRef.current);
      interceptorRef.current = null;
    }
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
