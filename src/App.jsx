import Home from "~/pages/Home";
import Admin from "~/pages/Admin";
import Layout from "~/pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
