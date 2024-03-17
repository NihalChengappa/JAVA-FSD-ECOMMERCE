import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useVantaNetEffect from './NetEffect';

function CategoryProducts() {
    const vantaRef = useVantaNetEffect();
    const location = useLocation();
    const productList = location.state.prods;
    const desc = location.state.catdesc;
    const navigate = useNavigate();

    const viewProd = (prods) => {
        navigate(`/product/${prods.productName}`, { state: { prods } });
    }

    return (
        <>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <p className="fs-5"><strong>Category Description:</strong> {desc}</p>
                    </div>
                </div>
            </div>
            <div ref={vantaRef} className="vanta-effect" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-1">
                {productList.map((product, index) => (
                    <div className="col" key={index}>
                        <div className="card bg-info">
                            <img src={`https://source.unsplash.com/featured/?${encodeURIComponent(product.productName)}`} width="250px" height="250px" className="card-img-top" />
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
    )
}

export default CategoryProducts;
