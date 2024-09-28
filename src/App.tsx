import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { ItemBoard } from "./components/ItemBoard/ItemBoard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={import.meta.env.BASE_URL} element={<ItemBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
