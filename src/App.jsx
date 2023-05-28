import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Me from "./components/pages/Me";
import Register from "./components/pages/Register";
import { AuthProvider } from "./context/AuthContext";
import PostDetail from "./components/pages/PostDetail";
import LatestPosts from "./components/pages/LatestPosts";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/latestposts" element={<LatestPosts />} />
            <Route path="/detail/:param" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Me />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
