import { Routes, Route } from "react-router-dom";
import Chess from "./Chess";
import LoginForm from "../../../components/forms/loginForm";

const App = () => {
  return (
    <Routes>
      <Route path="/chess" element={<Chess />} />
        <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default App;
