# Login komponens

## Magyarázat

A Login komponens egy React funkcionális komponens, ami a felhasználói bejelentkezést kezeli. Tartalmazza a bejelentkezési űrlapot, validációt és hibakezelést.

## Főbb elemek

### State és Referenciák

```javascript
const emailRef = useRef();
const passwordRef = useRef();
const [errors, setErrors] = useState(null);
const { setUser, setToken } = useStateContext();

// useRef hook-ok az input mezők közvetlen eléréséhez
// useState a hibaüzenetek kezeléséhez
// Context értékek a sikeres bejelentkezés kezeléséhez
```

```javascript
const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
    };

    setErrors(null);

    axiosClient
        .post("/login", payload)
        .then(({ data }) => {
            setUser(data.user);
            setToken(data.token);
        })
        .catch((err) => {
            // Hibakezelés
        });
};
```

```Javascript
//Hibakezelés
{errors && (
    <div className="alert">
        {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
        ))}
    </div>
)}
```

```Javascript
// Működés részletesen
// Felhasználó kitölti az űrlapot
// Submit eseménynél:
// Űrlap adatok összegyűjtése
// API hívás a backend felé
// Sikeres bejelentkezésnél:
// Token és user adatok mentése
// Átirányítás
// Hiba esetén:
// Hibaüzenetek megjelenítése
// Stílusok
// A komponens a következő CSS osztályokat használja:

// login-signup-form: Fő konténer
// animated fadeInDown: Animációk
// form: Űrlap stílusok
// btn: Gomb stílusok
// alert: Hibaüzenetek stílusa
<div className="login-signup-form animated fadeInDown">
    <div className="form">
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            {/* Hibaüzenetek */}
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered? <Link to="/signup">Create an account</Link>
            </p>
        </form>
    </div>
</div>
```
