import { BrowserRouter, useLocation } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Routess from "./Routes";
import InsDahRoutes from "./Components/InsDashComponents/InsDahRoutes";
import { Provider } from "react-redux";
import store from "./Store/store";

function AppContent() {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.startsWith("/instructor") ? (
        <Layout>
          <Routess />
        </Layout>
      ) : (
        <InsDahRoutes />
      )}
    </>
  );
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
