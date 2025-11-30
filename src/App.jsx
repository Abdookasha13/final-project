import { BrowserRouter, useLocation } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Routess from "./Routes";
import InsDahRoutes from "./Components/InsDashComponents/InsDahRoutes";
import { Provider } from "react-redux";
import store from "./Store/store";
import StdProfileRoutes from "./Components/StudentProfileComponnent/StdProfileRoutes";

function AppContent() {
  const { pathname } = useLocation();

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
