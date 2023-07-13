import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  );
};

export default App;
