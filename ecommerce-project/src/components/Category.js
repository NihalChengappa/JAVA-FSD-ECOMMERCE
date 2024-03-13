import React, { useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import useVantaNetEffect from './NetEffect';

function Category() {
    const [categories, setCategories] = useState([]);
    const [searchValue,setSearchValue]=useState('');
    const [searchField,setSearchField]=useState('');
    const vantaRef = useVantaNetEffect();

    useEffect(() => {
        fetchCategories();
    }, []);

    

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8060/productandcategory/ecommerceapp/api/v1/category/getcategories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            window.location.href = '/logout';
        }
    };

    const FindCategory = async (id) => {
        try {
            if(searchField=='' || searchValue==''){
                fetchCategories();
                return;
            }
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/category/getcategorybyfield?field=${searchField}&value=${searchValue}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                setCategories([response.data]);
            }
        } catch(error) {
            console.error('Error finding Category', error);
        }
    };

    return (
        <div>
            <div style={{textAlign: "center"}}>
            <Link to="add-category" className="btn btn-outline-success">Add Category</Link>
            <Link to="update-category" className="btn btn-outline-warning">Update Category</Link>
                <Link to="delete-category" className="btn btn-outline-danger">Delete Category</Link>
            </div>
            <div style={{ display: 'flex' }}>
                <select className="form-select" aria-label="Default select example" onChange={(e)=>setSearchField(e.target.value)} style={{width:"150px"}}>
                    <option selected >Select Field</option>
                    <option value="name">Name</option>
                    <option value="description">Description</option>
                    <option value="id">ID</option>
                </select>
                <div className="input-group">
                    <div className="form-control" data-mdb-input-init>
                        <input id="search-focus" type="search" className="form-control" onChange={(e)=>setSearchValue(e.target.value)} />
                        
                    </div>
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={FindCategory}>
                        Search
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            
            <div ref={vantaRef} className="vanta-effect" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {categories.map((category, index) => (
                    <div className="col" key={index}>
                        <div className="card bg-info">
                            <img src={`https://medicaldialogues.in/h-upload/2022/01/21/168768-category.webp`} className="card-img-top" alt={category.name} />
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                                <p className="card-text">{category.categoryDescription}</p>
                                <a href={`https://medicaldialogues.in/h-upload/2022/01/21/168768-category.webp`} className="btn btn-primary">View Products</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;
