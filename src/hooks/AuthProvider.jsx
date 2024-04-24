import React from "react";
import { useContext, createContext} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    
    const [user, setUser] = useState('');
    const [token, setToken] = useState(localStorage.getItem("fa-sub-admin") || "");
    const navigate = useNavigate();

    //   const loginAction = async (data) => {
    //     try {
    //       const response = await fetch("https://jsonplaceholder.org/users", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //       });
    //       const res = await response.json();
    //       if (res.data) {
    //         setUser(res.data.user);
    //         setToken(res.token);
    //         localStorage.setItem("site", res.token);
    //         navigate("/card");
    //         return;
    //       }
    //       throw new Error(res.message);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };

    const loginAction =  (data) => {
         setUser(data.password);
        setToken(data.username);
        localStorage.setItem("fa-sub-admin", data.username);
        navigate("/dashboard");
    }
   

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("fa-sub-admin");
        navigate("/");
    };
    
    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
            
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};