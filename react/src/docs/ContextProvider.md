# ContextProvider komponens

## Magyarázat

A ContextProvider egy React Context komponens, ami az alkalmazás állapotkezelését végzi, főként a felhasználói authentikációhoz kapcsolódóan.

## React Context API

A Context API a React egyik beépített megoldása az állapotkezelésre, ami lehetővé teszi az adatok globális megosztását a komponensfában anélkül, hogy minden szinten explicit módon át kellene adni props-ként ("prop drilling").

Főbb elemei:

-   `createContext()`: Létrehoz egy új Context objektumot
-   `Context.Provider`: Komponens, ami biztosítja az értékeket a leszármazottaknak
-   `useContext()`: Hook, amivel komponensekben elérhetjük a context értékeit

Előnyei:

-   Egyszerűsíti a globális állapotkezelést
-   Csökkenti a props átadások számát
-   Tisztább kód struktúra

## Működés részletesen

-   StateContext létrehozása 4 alapértékkel (user, token, setUser, setToken)
-   User és token állapot kezelése useState hook-kal
-   Token automatikus mentése/törlése localStorage-ben
-   Központi hozzáférés biztosítása useStateContext hook-kal

## Használat példa

```javascript
// Érték olvasása komponensben
const { user, token } = useStateContext();

// Érték módosítása
const { setUser, setToken } = useStateContext();
```

## Teljes kód

```javascript
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

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
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
```
