import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useVantaNetEffect from './NetEffect';
import ScaleLoader from "react-spinners/ScaleLoader";

function Category() {
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const vantaRef = useVantaNetEffect();
    const [searchField, setSearchField] = useState('');
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories().then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        filterCategories();
    }, [searchValue, searchField]);

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

    const filterCategories = () => {
        if (!searchField || !searchValue) {
            fetchCategories();
            return;
        }
        const filteredCategories = categories.filter(category => {
            const fieldValue = category[searchField];
            if (fieldValue) {
                return fieldValue.toString().toLowerCase().includes(searchValue.toLowerCase());
            }
            return false;
        });
        setCategories(filteredCategories);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const viewProds = (cat, prods, catdes) => {
        navigate(`/category/${cat}`, { state: { prods: prods, catdesc: catdes } });
    };

    return (
        <div>
            <div ref={vantaRef} className="vanta-effect" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
        {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
                    <ScaleLoader
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <>
            <div style={{ textAlign: "center" }}>
                {role === '[ROLE_ADMIN]' && <Link to="add-category" className="btn btn-outline-success">Add Category</Link>}
                {role === '[ROLE_ADMIN]' && <Link to="update-category" className="btn btn-outline-warning">Update Category</Link>}
                {role === '[ROLE_ADMIN]' && <Link to="delete-category" className="btn btn-outline-danger">Delete Category</Link>}
                {role === '[ROLE_ADMIN]' && <Link to="/add-user" className="btn btn-outline-danger">Add User </Link>}
            </div>
            <div style={{ display: 'flex' }}>
                <select className="form-select" aria-label="Default select example" onChange={(e) => setSearchField(e.target.value)} style={{ width: "150px" }}>
                    <option value="">Select Field</option>
                    <option value="name">Name</option>
                    <option value="categoryDescription">Description</option>
                    <option value="categoryId">ID</option>
                </select>
                <div className="input-group">
                    <div className="form-control" data-mdb-input-init>
                        <input id="search-focus" type="search" className="form-control" onChange={handleSearchChange} />
                    </div>
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={filterCategories}>
                        Search
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-1">
                {categories.map((category, index) => (
                    <div className="col" key={index}>
                        <div className="card bg-info">
                            <img src={`https://source.unsplash.com/featured/?${encodeURIComponent(category.name)}`} width="250px" height="250px" className="card-img-top" alt={category.name} />
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h3 className="card-title">{category.name}</h3>
                                        <hr />
                                        <p className="card-text"><span className="description">{category.categoryDescription}</span></p>
                                        <div className="text-end">
                                            <button className="btn btn-primary" onClick={() => viewProds(category.name, category.productList, category.categoryDescription)}>View Products</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </>
            )}
            </div>
    );
}

export default Category;
