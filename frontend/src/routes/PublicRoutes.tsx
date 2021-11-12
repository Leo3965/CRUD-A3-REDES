import {Routes, Route, BrowserRouter} from "react-router-dom";
import {LoginPage} from "../pages/Login/LoginPage";
import {SignUpPage} from "../pages/SignUp/SignUpPage";

export const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<LoginPage />}/>
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    )
}