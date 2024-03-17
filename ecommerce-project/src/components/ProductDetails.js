import React from 'react';
import { useLocation } from 'react-router-dom';
import useVantaNetEffect from './NetEffect';

function ProductDetails() {
    const vantaRef = useVantaNetEffect();
    const location = useLocation();
    const product = location.state.prods;

    const handleBuyNow = () => {
        // Handle buy now logic here
        alert(`Buying ${product.productName}`);
    };

    return (
        <>
            <div ref={vantaRef} className="vanta-effect" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center mb-4">{product.productName}</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center">
                                <img src={`https://source.unsplash.com/featured/?${encodeURIComponent(product.productName)}`} alt={product.productName} className="img-fluid" style={{ maxWidth: '300px' }} />
                            </div>
                            <div className="col-md-6">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Description</th>
                                            <td>{product.productDescription}</td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td>${product.productPrice}</td>
                                        </tr>
                                        {product.categoryList && <tr>
                                            <th>Categories</th>
                                            <td>{product.categoryList.map((category, index) => index === product.categoryList.length - 1 ? category.name : `${category.name}, `)}</td>
                                        </tr>}
                                    </tbody>
                                </table>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
