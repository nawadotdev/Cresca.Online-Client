import { createContext, Dispatch, FC, ReactNode, useContext, useEffect, useReducer } from "react"
import { getMe } from "../services/UserService";

interface AuthState {
    token: string | null;
    user: {
        username: string;
        userRole: number;
        balance: number;
    } | null
}

interface AuthContextAction {
    type: "LOGIN" | "LOGOUT" | "SET_USER";
    payload?: {
        token?: string | null,
        user?: {
            username: string;
            userRole: number;
            balance: number;
        } | null
    }
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthReducer = (state: AuthState, action: AuthContextAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                token: action.payload?.token || null,
            };
        case "LOGOUT":
            return {
                ...state,
                token: null,
                user: null
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload?.user || null
            }
        default:
            return state;
    }
}

const AuthContext = createContext<{
    state: AuthState;
    dispatch: Dispatch<AuthContextAction>,
    refreshUser: () => void
}>({
    state: {
        token: null,
        user: null
    },
    dispatch: () => null,
    refreshUser: () => null
})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

    let token: string | null

    if (typeof window !== "undefined") {
        token = localStorage.getItem("token") || sessionStorage.getItem("token")
    } else {
        token = null
    }

    const [state, dispatch] = useReducer(AuthReducer, {
        token,
        user: null
    } as AuthState)

    const refreshUser = async () => {

        if (!state.token) return

        try {
            const userData = await getMe(state.token)
            dispatch({ type: "SET_USER", payload: { user: userData.data.user } })
        } catch (_) {
            dispatch({ type: "LOGOUT" })
        }

    }

    useEffect(() => {
        refreshUser()
    }, [state.token])

    console.log("Auth State", {
        state
    })

    return (
        <AuthContext.Provider value={{ state, dispatch, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )


}