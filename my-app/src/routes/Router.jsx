import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/account/login/Login";
import Register from "../pages/account/register/Register";
import EditProfileSignUp from "../pages/account/register/EditProfileSignUp";
import Splash from "../pages/splash/Splash";
import HomeFeed from "../pages/feed/home/HomeFeed";
import PostDetail from "../pages/feed/post/PostDetail";
import UploadEditPost from "../pages/feed/post/UploadEditPost";
import UploadProduct from "../pages/feed/product/UploadProduct";
import ChatList from "../pages/chat/ChatList";
import ChattingRoom from "../pages/chat/ChattingRoom";
import Error from "../pages/errorLoading/Error";
import Profile from "../pages/profile/userprofile/Profile";
import EditProfile from "../pages/profile/userprofile/EditProfile";
import Follower from "../pages/profile/follow/Follower";
import Following from "../pages/profile/follow/Following";
import Search from "../pages/feed/search/Search";

export default function Router() {
    return (
        <BrowserRouter basename="">
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/account/" element={<Outlet />}>
                    <Route path="login/" element={<Login />} />
                    <Route path="register/" element={<Register />} />
                    <Route path="register/profile" element={<EditProfileSignUp />} />
                    <Route path="profile/:username/" element={<Outlet />}>
                        <Route path="" element={<Profile />} />
                        <Route path="follower/" element={<Follower />} />
                        <Route path="following/" element={<Following />} />
                        <Route path="edit/" element={<EditProfile />} />
                    </Route>
                    <Route path="*" element={<Error />}/>
                </Route>
                <Route path="/search" element={<Search />}/>
                <Route path="/post/" element={<Outlet />}>
                    <Route path="" element={<HomeFeed />} />
                    <Route path=":id/" element={<PostDetail />} />
                    <Route path=":id/edit" element={<UploadEditPost />} />
                    <Route path="upload/" element={<UploadEditPost />} />
                    <Route path="upload/product" element={<UploadProduct />} />
                    <Route path="*" element={<Error />}/>
                </Route>
                <Route path="/chat/" element={<Outlet />}>
                    <Route path="" element={<ChatList />} />
                    <Route path=":id/" element={<ChattingRoom />} />
                    <Route path="*" element={<Error />}/>
                </Route>
                <Route path="/*" element={<Error />}/>
            </Routes>
        </BrowserRouter>
    );
}
