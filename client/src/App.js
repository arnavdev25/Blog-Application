import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllBlogs from "./pages/AllBlogs";
import CategoryPage from "./pages/CategoryPage";
import CreateBlog from "./pages/CreateBlog";
import DeletePage from "./pages/DeletePage";
import EditPage from "./pages/EditPage";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import LoginPage from "./pages/LoginPage";
import SingleBlog from "./pages/SingleBlog";
import Trash from "./pages/Trash";
import Success from "./pages/Success";


function App() {
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<SignInPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/blogs" element={<AllBlogs/>}/>
      <Route path="/blogs/create" element={<CreateBlog/>}/>
      <Route path="/blogs/trash" element={<Trash/>}/>
      <Route path="/blogs/:id" element={<SingleBlog/>}/>
      <Route path="/blogs/:id/edit" element={<EditPage/>}/>
      <Route path="/blogs/:id/delete" element={<DeletePage/>}/>
      <Route path="/blogs/category/:name" element={<CategoryPage/>}/>
      <Route path="/github/callback" element={<Success/>}/>
    </Routes>
    </div>
  );
}

export default App;
