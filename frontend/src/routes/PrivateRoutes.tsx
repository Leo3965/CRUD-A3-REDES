import {Route, Routes} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import {UserPage} from "../pages/UserPage";
import {UsersPage} from "../pages/UsersPage";

export const PrivateRoutes = () => {
    return(
        <Routes>
            <Route path="/user" element={<UserPage />}/>
            <Route path="/user/:id" element={<UserPage />}/>
            <Route path="/users" element={<UsersPage/>}/>
            <Route path="*" element={<HomePage />}/>
        </Routes>
    )
}