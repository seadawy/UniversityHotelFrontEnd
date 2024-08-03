import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('AuthProvider not in Scoop');
    }
    return context;
}