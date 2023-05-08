import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Loading from "../pages/errorLoading/Loading";
const Login = lazy(() => import("../pages/account/login/Login"));
const Register = lazy(() => import("../pages/account/register/Register"));
const EditProfileSignUp = lazy(() =>
    import("../pages/account/register/EditProfileSignUp")
);
const Splash = lazy(() => import("../pages/splash/Splash"));
const HomeFeed = lazy(() => import("../pages/feed/home/HomeFeed"));
const PostDetail = lazy(() => import("../pages/feed/post/PostDetail"));
const UploadEditPost = lazy(() => import("../pages/feed/post/UploadEditPost"));
const UploadProduct = lazy(() => import("../pages/feed/product/UploadProduct"));
const ChatList = lazy(() => import("../pages/chat/ChatList"));
const ChattingRoom = lazy(() => import("../pages/chat/ChattingRoom"));
const Error = lazy(() => import("../pages/errorLoading/Error"));
const Profile = lazy(() => import("../pages/profile/userprofile/Profile"));
const EditProfile = lazy(() =>
    import("../pages/profile/userprofile/EditProfile")
);
const Follower = lazy(() => import("../pages/profile/follow/Follower"));
const Following = lazy(() => import("../pages/profile/follow/Following"));
const Search = lazy(() => import("../pages/feed/search/Search"));

export default function Router() {
    return (
        <BrowserRouter basename="">
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="/" element={<Splash />} />
                    <Route path="/account/" element={<Outlet />}>
                        <Route path="login/" element={<Login />} />
                        <Route path="register/" element={<Register />} />
                        <Route
                            path="register/profile"
                            element={<EditProfileSignUp />}
                        />
                        <Route path="profile/:username/" element={<Outlet />}>
                            <Route path="" element={<Profile />} />
                            <Route path="follower/" element={<Follower />} />
                            <Route path="following/" element={<Following />} />
                            <Route path="edit/" element={<EditProfile />} />
                        </Route>
                        <Route path="*" element={<Error />} />
                    </Route>
                    <Route path="/search" element={<Search />} />
                    <Route path="/post/" element={<Outlet />}>
                        <Route path="" element={<HomeFeed />} />
                        <Route path=":id/" element={<PostDetail />} />
                        <Route path=":id/edit" element={<UploadEditPost />} />
                        <Route path="upload/" element={<UploadEditPost />} />
                        <Route
                            path="upload/product"
                            element={<UploadProduct />}
                        />
                        <Route path="*" element={<Error />} />
                    </Route>
                    <Route path="/chat/" element={<Outlet />}>
                        <Route path="" element={<ChatList />} />
                        <Route path=":id/" element={<ChattingRoom />} />
                        <Route path="*" element={<Error />} />
                    </Route>
                    <Route path="/*" element={<Error />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
