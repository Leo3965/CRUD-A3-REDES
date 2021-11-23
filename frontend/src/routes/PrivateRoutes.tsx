import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { UserPage } from "../pages/User/UserPage";
import { UsersPage } from "../pages/Users/UsersPage";

export const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
