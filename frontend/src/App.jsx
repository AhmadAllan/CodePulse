import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer className="bg-gray-900 text-white" />
      </div>
    </div>
  );
};

export default App;
