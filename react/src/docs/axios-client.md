# Axios Client konfiguráció

## Magyarázat

Az axios-client.js egy konfigurált Axios példányt hoz létre, ami az alkalmazás API kommunikációját kezeli. Tartalmazza az alapvető beállításokat és interceptorokat a kérések és válaszok kezeléséhez.

## Axios példány létrehozása

```javascript
// Új Axios példány létrehozása
// Base URL beállítása környezeti változóból
// Az összes kérés az /api végpontra fog irányulni
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});
```

```Javascript
// Minden kimenő kérést elfog
// Kiolvassa a tokent a localStorage-ból
// Hozzáadja a Bearer tokent az Authorization fejléchez
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

```Javascript
// Sikeres válasz esetén továbbítja azt
// Hiba esetén:
// 401-es státuszkódnál (unauthorized) törli a tokent
// Egyéb hibáknál továbbdobja a hibát
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (e) {
      // Hiba esetén csendes kezelés
    }
    throw error;
  }
);

```

```Javascript

// Főbb jellemzők
// Központosított API kommunikáció
// Automatikus token kezelés
// Egységes hibakezelés
// Környezeti változók használata
// JWT autentikáció támogatása
// Ez a konfiguráció biztosítja az alkalmazás egységes és biztonságos API kommunikációját, valamint megfelelően kezeli a felhasználói munkamenetet.


// GET kérés
axiosClient.get('/users')
  .then(response => {
    // Adatok kezelése
  });

// POST kérés
axiosClient.post('/login', {
    email: 'user@example.com',
    password: '123456'
});

```
