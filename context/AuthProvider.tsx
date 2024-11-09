import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useState, useContext, Children } from "react";
import { ReactNode } from "react";
import React from "react";
import { UserProps } from "@/types";

const AuthContext = createContext({

});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setIsLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);