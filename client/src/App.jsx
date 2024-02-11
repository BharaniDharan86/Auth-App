import { BrowserRouter, Routes, Route } from "react-router-dom";
import store, { persistore } from "./utils/store";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistore}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
