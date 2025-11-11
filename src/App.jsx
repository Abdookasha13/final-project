import { BrowserRouter, useLocation } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Routess from "./Routes";
import InsDahRoutes from "./Components/InsDashComponents/InsDahRoutes";

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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
