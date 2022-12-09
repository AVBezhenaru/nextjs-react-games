import { Routes, Route } from 'react-router-dom';

import LoginForm from '../../src/components/forms/loginForm';

import Chess from './chess/Chess';

const App = () => (
  <Routes>
    <Route path="/chess" element={<Chess />} />
    <Route path="/login" element={<LoginForm />} />
  </Routes>
);

export default App;
