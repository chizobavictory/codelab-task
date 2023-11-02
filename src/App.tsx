import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
