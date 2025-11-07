import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Routess from "./Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        
          <Routess />
      </BrowserRouter>
    </>
  );
}

export default App;
