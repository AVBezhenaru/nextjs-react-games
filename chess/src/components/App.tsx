import { Routes, Route } from 'react-router-dom';

import LoginForm from '../../../components/forms/loginForm';

import Chess from './Chess';

const App = () => (
  <Routes>
    <Route path="/chess" element={<Chess />} />
    <Route path="/login" element={<LoginForm />} />
  </Routes>
);

export default App;
