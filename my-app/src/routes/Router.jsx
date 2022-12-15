import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/account/Login";
import Register from "../pages/account/Register";
// import EditProfile from "../pages/account/EditProfile"
import EditProfileSignUp from "../pages/account/EditProfileSignUp";
import Splash from "../pages/splash/Splash";
import HomeFeed from "../pages/feed/HomeFeed";
import PostDetail from "../pages/feed/PostDetail";
import UploadPost from "../pages/feed/UploadPost";
import UploadProduct from "../pages/feed/UploadProduct";
import ChatList from "../pages/chat/ChatList";
import ChattingRoom from "../pages/chat/ChattingRoom";
import Search from "../pages/feed/Search";

export default function Router() {
    return (
        <BrowserRouter basename="">
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/account/*" element={<Outlet />}>
                    <Route path="login/" element={<Login />} />
                    <Route path="register/" element={<Register />} />
                    <Route path="profile/" element={<EditProfileSignUp />} />
                </Route>
                <Route path="/post/*" element={<Outlet />}>
                    <Route path="" element={<HomeFeed />} />
                    <Route path=":id/" element={<PostDetail />} />
                    <Route path="upload/" element={<UploadPost />} />
                    <Route path="upload/product" element={<UploadProduct />} />
                </Route>
                <Route path="/chat/*" element={<Outlet />}>
                    <Route path="" element={<ChatList />} />
                    <Route path=":id/" element={<ChattingRoom />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
