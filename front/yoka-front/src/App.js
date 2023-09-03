import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import Footer from "./components/footer/footer.component";
import ErrorPage from "./pages/ErrorPage/error-page.component";
import ShowArcticles from "./pages/show-arcticle-page/show-arcticles";
import ArcticlePage from "./pages/arcticle-page/article-page";
import { Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import { TranslationContext } from "./context/translation/TranslationContext";
import Cart from "./pages/cart/cart";
import LogIn from "./pages/log-in/log-in";
import { UserContext } from "./context/user/UserContext";
import Register from "./pages/register/register";
import Profile from "./pages/profile/profile";

function App() {
  const [t, setTranslation] = useState(
    window.localStorage.getItem("t")
      ? JSON.parse(window.localStorage.getItem("t"))
      : null
  );
  const value = useMemo(() => ({ t, setTranslation }), [t, setTranslation]);

  const [user, setUser] = useState(
    window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user"))
      : null
  );
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <UserContext.Provider value={userValue}>
        <TranslationContext.Provider value={value}>
          <Header setIsLoggedOut={setIsLoggedOut}/>
          <Routes>
            <Route path="/" element={<HomePage isLoggedOut={isLoggedOut}/>} />
            <Route path="/arcticle/:id" element={<ArcticlePage />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/furniture-category/:id" element={<ShowArcticles />} />
            <Route path="/shoppingcart" element={<Cart />} />
            <Route path="/authentication/signin" element={<LogIn />} />
            <Route path="/authentication/register" element={<Register/>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </TranslationContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
