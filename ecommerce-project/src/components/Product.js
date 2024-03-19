import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useVantaNetEffect from './NetEffect';
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios';
import "../styles/products.css";

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [searchField, setSearchField] = useState('');
    const role = localStorage.getItem('role');
    const vantaRef = useVantaNetEffect();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts().then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchValue, searchField]);

    const viewProd = (prods) => {
        navigate(`/product/${prods.productName}`, { state: { prods } });
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8060/productandcategory/ecommerceapp/api/v1/product/getproducts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            window.location.href = '/logout';
        }
    };

    const filterProducts = () => {
        if (!searchField || !searchValue) {
            fetchProducts();
            return;
        }
        const filteredProducts = products.filter(product => {
            const fieldValue = product[searchField];
            if (fieldValue) {
                return fieldValue.toString().toLowerCase().includes(searchValue.toLowerCase());
            }
            return false;
        });
        setProducts(filteredProducts);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
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
                {role === '[ROLE_ADMIN]' && <Link to="add-product" className="btn btn-outline-success">Add Product</Link>}
                {role === '[ROLE_ADMIN]' && <Link to="update-product" className="btn btn-outline-warning">Update Product</Link>}
                {role === '[ROLE_ADMIN]' && <Link to="delete-product" className="btn btn-outline-danger">Delete Product</Link>}
                {role === '[ROLE_ADMIN]' && <Link to="/add-user" className="btn btn-outline-danger">Add User </Link>}
            </div>
            <div style={{ display: 'flex' }}>
                <select className="form-select" aria-label="Default select example" onChange={(e) => setSearchField(e.target.value)} style={{ width: "150px" }}>
                    <option selected>Select Field</option>
                    <option value="productName">Name</option>
                    <option value="productDescription">Description</option>
                    <option value="productPrice">Price</option>
                    <option value="productId">ID</option>
                </select>
                <div className="input-group">
                    <div className="form-control" data-mdb-input-init>
                        <input id="search-focus" type="search" className="form-control" onChange={handleSearchChange} />
                    </div>
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={filterProducts}>
                        Search
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-1">
                {products.map((product, index) => (
                    <div className="col" key={index}>
                        <div className="card bg-info">
                            <img src={`https://source.unsplash.com/featured/?${encodeURIComponent(product.productName)}`} width="250px" height="250px" className="card-img-top" alt={product.productName} />
                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="card-text"><strong>Description:</strong>
                                            <span className="description">
                                                {product.productDescription}
                                            </span>
                                        </p>
                                        <p className="card-text"><strong>Price:</strong> ${product.productPrice}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="card-text"><strong>Categories:</strong><span className="category-list">
                                            {product.categoryList.map((category, index) => index === product.categoryList.length - 1 ? category.name : `${category.name}, `)}
                                        </span></p>
                                    </div>
                                    <div className="text-end">
                                        <button className="btn btn-primary" onClick={() => viewProd(product)}>More Details</button>
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

export default Product;
