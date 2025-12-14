import { BrowserRouter, useLocation } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Routess from "./Routes";
import InsDahRoutes from "./Components/InsDashComponents/InsDahRoutes";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Store/store";
import StdProfileRoutes from "./Components/StudentProfileComponnent/StdProfileRoutes";
import { useEffect } from "react";
import { fetchCart } from "./Store/Slices/cartSlice";

function AppContent() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth); 
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn]);

  if (pathname.startsWith("/instructor")) {
    return <InsDahRoutes />;
  } else if (pathname.startsWith("/stdprofile")) {
    return <Layout><StdProfileRoutes /></Layout>;
  } else {
    return (
      <Layout>
        <Routess />
      </Layout>
    );
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;