import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./index.css";
import LayoutDashboard from "./pages/LayoutDashboard";
import { message, notification } from "antd";
import TableKhauTru from "./pages/Khautru/TableKhauTru";
import Home from "./pages/Home";
import ChitietKT from "../src/pages/Khautru/ChitietKT"
function App() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message, status) => {
    api[`${status}`]({
      message: message,
      placement: "top",
    });
  };

  return (
    <>
      {contextHolder}
      <Routes>
        <Route
          index
          path="/login"
          element={<Login openNotification={openNotification} />}
        />
        <Route
          path=""
          element={<LayoutDashboard openNotification={openNotification} />}
        >
          <Route
            path=""
            element={<Home openNotification={openNotification} />}
          />
          <Route
            path="/khautru"
            element={<TableKhauTru openNotification={openNotification} />}
          />
          <Route
            path="/khautru/:id"
            element={<ChitietKT openNotification={openNotification} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
