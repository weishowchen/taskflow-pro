import { createContext, useReducer, useEffect } from 'react';
import { getToken, getStoredUser, setToken, setStoredUser, clearAuth } from '../utils/token';

export const AuthContext = createContext(null);

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 頁面重整後從 localStorage 恢復登入狀態
  useEffect(() => {
    const token = getToken();
    const user = getStoredUser();
    if (token && user) {
      dispatch({ type: 'LOGIN', payload: { token, user } });
    }
  }, []);

  function loginAction(token, user) {
    setToken(token);
    setStoredUser(user);
    dispatch({ type: 'LOGIN', payload: { token, user } });
  }

  function logoutAction() {
    clearAuth();
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider value={{ ...state, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
}
