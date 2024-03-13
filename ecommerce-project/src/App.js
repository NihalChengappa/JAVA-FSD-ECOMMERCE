import React, { useEffect, useState } from 'react';
import CategoryForm from './components/CategoryForm';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './components/Product';
import Category from './components/Category';
import Logout from './components/Logout';
import DeleteCategory from './components/DeleteCategory';
import UpdateCategory from './components/UpdateCategory';
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      setAuthenticated(true);
    }
  }, []);
  return (
    <BrowserRouter>
    <Navbar auth={authenticated}/>
      <Routes>
        {console.log(authenticated)}
          <Route path="/home" element={<Home/>} />
          {!authenticated && <Route path="/login" element={<Login setAuth={setAuthenticated} />} />}
        {!authenticated && <Route path="/register" element={<Register />} />}
          {authenticated && <Route path="/products" element={<Product/>} />}
          {authenticated && <Route path="/category" element={<Category/>} />}
          {authenticated && <Route path="/category/add-category" element={<CategoryForm/>} />}
          {authenticated && <Route path="/category/delete-category" element={<DeleteCategory/>} />}
          {authenticated && <Route path="/category/update-category" element={<UpdateCategory/>} />}
          {authenticated && <Route path="/logout" element={<Logout/>} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
