import React from 'react';
import { Link, Outlet } from 'react-router-dom';
function Navbar({auth }){
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:" #e3f2fd"}}>
            <div className="container-fluid">
            <a className="navbar-brand" href="/">EcommerceApp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                <Link className='nav-link' to="/home">Home</Link>
                </li>
                {!auth && <li className="nav-item" >
                  <Link className='nav-link' to="/login">Login</Link>
                </li>}
                {auth &&<li>
                    <Link className='nav-link' to="/products">Products</Link>
                </li>}
                {auth &&<li>
                    <Link className='nav-link' to="/category">Category</Link>
                </li>}
                {auth &&<li>
                    <Link className='nav-link' to="/logout">Logout</Link>
                </li>}
                </ul>
            </div>
            </div>
        </nav>
        <Outlet/>
        </>
    )
}
export default Navbar;