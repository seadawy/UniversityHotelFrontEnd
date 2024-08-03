import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'logout' })
    }
    return { logout }
}