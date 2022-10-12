import { Routes, Route } from "react-router-dom";
import Chess from "./Chess";

const App = () => {
  return (
    <Routes>
      <Route path="/chess" element={<Chess />} />
    </Routes>
  );
};

export default App;
