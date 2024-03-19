import React, { useEffect, useState } from 'react';
import CategoryForm from './components/CategoryForm';
import './styles/app.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
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
import ProductForm from './components/ProductForm';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';
import CategoryProducts from './components/CategoryProducts';
import ProductDetails from './components/ProductDetails';
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [cname,setCname]=useState('');
  const [role,setRole]=useState('');
  const [pds,setPds]=useState(null);
  useEffect(() => {
    if(localStorage.getItem('token')!==null){
      setAuthenticated(true);
      setRole(localStorage.getItem('role'));
    }},[]);
  return (
    <BrowserRouter>
    <Navbar auth={authenticated}/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          {!authenticated && <Route path="/login" element={<Login setAuth={setAuthenticated} setR={setRole}/>} />}
        {!authenticated && <Route path="/register" element={<Register />} />}
          {authenticated && <Route path="/products" element={<Product/>} />}
          {authenticated && <Route path="/category/:categoryName" element={<CategoryProducts/>} />}
          {authenticated && <Route path="/product/:productName" element={<ProductDetails/>} />}
          {authenticated && <Route path="/category" element={<Category/>} />}
          {role==='[ROLE_ADMIN]' && authenticated && <Route path="/category/add-category" element={<CategoryForm/>} />}
          {role==='[ROLE_ADMIN]' && authenticated && <Route path="/category/delete-category" element={<DeleteCategory/>} />}
          {role==='[ROLE_ADMIN]' && authenticated && <Route path="/category/update-category" element={<UpdateCategory/>} />}
          {role==='[ROLE_ADMIN]' && authenticated && <Route path="/products/add-product" element={<ProductForm/>} />}
          {role==='[ROLE_ADMIN]' && authenticated && <Route path="/products/update-product" element={<UpdateProduct/>} />}
          {role==='[ROLE_ADMIN]' && authenticated && <Route path="/products/delete-product" element={<DeleteProduct/>} />}
          {role==='[ROLE_ADMIN]' && authenticated && <Route path="/add-user" element={<Register/>} />}
          {authenticated && <Route path="/logout" element={<Logout/>} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
