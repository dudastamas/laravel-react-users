import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState("");
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

/**
 * Context Provider az alkalmazás állapotkezeléséhez
 *
 * StateContext tartalma:
 * - user: felhasználói adatok tárolása
 * - token: authentikációs token kezelése
 * - setUser: felhasználói adatok módosítása
 * - setToken: token kezelő függvény, ami localStorage-ben is tárolja
 *
 * Használati példa:
 * const { user, setUser, token } = useStateContext();
 *
 * A Provider komponens biztosítja az értékeket az összes gyermek komponens számára.
 * A token automatikusan betöltődik a localStorage-ből induláskor.
 */
