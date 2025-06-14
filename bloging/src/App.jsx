import Register from "./components/register"
import Login from "./components/login"
import CreateBlog from "./components/createBlog"
import {  Routes, Route } from "react-router-dom";

import AppNavbar from "./components/navBar";
import Bloglist from "./components/blogList";
import BlogDetail from "./components/blogDetail";
import Home from "./components/home";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
function App() {
  

  return (
    <>
    <AppNavbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_blog" element={<CreateBlog/>} />
        <Route path="/Blogs" element={<Bloglist/>} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/profile" element={<Profile />} />

        
      </Routes>
      <Footer/>
    </>
  )
}

export default App
