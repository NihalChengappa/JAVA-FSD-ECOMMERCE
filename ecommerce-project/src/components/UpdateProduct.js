import React, { useEffect, useState } from 'react';
import useVantaNetEffect from './NetEffect';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";
import Select from 'react-select';

function UpdateProduct() {
    const [name,setName]=useState('');
    const [id,setId]=useState('');
    const [description,setDescription]=useState('');
    const vantaRef = useVantaNetEffect();
    const[emsg,setEmsg]=useState('');
    const[smsg,setSmsg]=useState('');
    const [price,setPrice]=useState(0);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectCategories, setSelectCategories] = useState([]);
    
    useEffect(() => {
        Promise.all([getCategories(), getProducts()]).then(() => {
            setLoading(false);
        });
    }, []);

    const getProducts = async () => {
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
            window.location.href="/logout";
        }
    };

    const getCategories = async () => {
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
            window.location.href="/logout";
        }
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/product/updateproduct/${id}`, 
            {productName:name,
                productPrice:price,
            productDescription:description},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            for (const categoryId of selectCategories) {
                const linkResponse = await axios.post(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/link/createlink?productId=${id}&categoryId=${categoryId}`,{},{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Category linked to product:', linkResponse.data);
            }
            console.log('Category added and linked to products:', response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setName('');
        setDescription('');
        setId('');
        setPrice(0);
        setSelectCategories('');
    }

    const handleCategoryChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setSelectCategories(selectedIds);
    };

    const categoryOptions = categories.map(category=> ({
        value: category.categoryId,
        label: category.name
    }));
    const productOptions = products.map(product => ({
        value: product.productId,
        label: `${product.productId} (${product.productName})`
    }));

    return (
        <>
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
            <form onSubmit={handleSubmit}>
            <div className="col-md-6 offset-3 justify-content-center p-5 card-body row mt-3 border rounded" style={{background:"#e3f2fd"}}>
                <div className="form-group p-3">
                        <label htmlFor="categoryid">Product ID</label>
                        <Select
                            options={productOptions}
                            onChange={(selectedOption) => setId(selectedOption.value)}
                            value={productOptions.find(option => option.value === id)}
                            placeholder="Select Product ID"
                            isSearchable
                            required
                        />
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="productname">Product Name</label>
                        <input type="text" className="form-control" value={name} id="productname" placeholder="Enter Product Name" onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="productprice">Product Price</label>
                        <input type="text" className="form-control" value={price} id="productprice" placeholder="Enter Product Price" onChange={(e)=>{setPrice(e.target.value)}}/>
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="productdescription">Product Description</label>
                        <input type="text" className="form-control" value={description} id="productdescription" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter Product Description" />
                    </div>
                <div className="form-group p-3">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Product to link</label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleCategoryChange}
                        />
                        {console.log(selectCategories)}
                    </div>
                    <div className="col-md-6 offset-3">
                <button type="submit" className="btn btn-light">Update Product</button>
                </div>
                </div>
            </form>
            </>
            )}
            </>
    )
}

export default UpdateProduct;
