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

function App() {
  const [t, setTranslation] = useState(
    window.localStorage.getItem("t")
      ? JSON.parse(window.localStorage.getItem("t"))
      : null
  );
  const value = useMemo(() => ({ t, setTranslation }), [t, setTranslation]);

  return (
    <div>
      <TranslationContext.Provider value={value}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/arcticle/:id" element={<ArcticlePage />} />
          <Route path="/furniture-category/:id" element={<ShowArcticles />} />
          <Route path="/shoppingcart" element={<Cart/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
