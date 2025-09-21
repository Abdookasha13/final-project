import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Routess from "./Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routess />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
