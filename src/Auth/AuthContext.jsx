import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                token: action.token,
                user: action.user
            }
        case 'logout':
            return {
                token: null,
                user: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        token: null,
        user: null
    });
    const login = (currentToken) => {
        fetch('/api/HotelAuth/user', {
            headers: {
                Authorization: `Bearer ${currentToken}`
            }
        }).then(rss => rss.json()).then((data) => {
            dispatch({ type: 'login', token: currentToken, user: data })
        }).catch(err => console.log(err, currentToken))
    }

    useEffect(() => {
        const storageToken = localStorage.getItem('token');
        if (storageToken) {
            login(storageToken);
        }
    }, [])
    console.log('AuthContext :', state);

    const logout = () => {
        dispatch({ type: "logout" });
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}