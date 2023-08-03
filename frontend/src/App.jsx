import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      {/* Render the Header component */}
      <Header />

      {/* Render the child routes */}
      <Outlet />
    </div>
  );
};

export default App;
