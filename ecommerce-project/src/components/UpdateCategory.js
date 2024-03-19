import React, { useEffect, useState } from 'react';
import useVantaNetEffect from './NetEffect';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";
import Select from 'react-select';

function UpdateCategory() {
    const [name,setName]=useState('');
    const [id,setId]=useState('');
    const [description,setDescription]=useState('');
    const[emsg,setEmsg]=useState('');
    const[smsg,setSmsg]=useState('');
    const [categories, setCategories] = useState([]);
    const vantaRef = useVantaNetEffect();
    const [products, setProducts] = useState([]);
    const [selectProducts, setSelectProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        Promise.all([getCategories(), getProducts()]).then(() => {
            setLoading(false);
        });
    }, []);
    
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

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/category/updatecategory/${id}`, 
            {name:name,
            categoryDescription:description},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            for (const productId of selectProducts) {
                const linkResponse = await axios.post(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/link/createlink?productId=${productId}&categoryId=${id}`,{},{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Category linked to product:', linkResponse.data);
            }
            console.log('Category added and linked to products:', response.data);
            setName('');
            setDescription('');
            setId('');
            setSelectProducts([]);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const handleProductChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setSelectProducts(selectedIds);
    };

    const productOptions = products.map(product => ({
        value: product.productId,
        label: product.productName
    }));
    const categoryOptions = categories.map(category => ({
        value: category.categoryId,
        label: `${category.categoryId} (${category.name})`
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
                        <label htmlFor="categoryid">Category ID</label>
                        <Select
                            options={categoryOptions}
                            onChange={(selectedOption) => setId(selectedOption.value)}
                            value={categoryOptions.find(option => option.value === id)}
                            placeholder="Select Category ID"
                            isSearchable
                            required
                        />
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="categoryname">Category Name</label>
                        <input type="text" className="form-control" value={name} id="categoryname" placeholder="Enter Category Name" onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="categorydescription">Category Description</label>
                        <input type="text" className="form-control" value={description} id="categorydescription" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter Category Description" />
                    </div>
                <div className="form-group p-3">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Product to link</label>
                        <Select
                            isMulti
                            options={productOptions}
                            value={productOptions.find(option => option.value === id)}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleProductChange}
                        />
                    </div>
                    <div className="col-md-6 offset-3">
                <button type="submit" className="btn btn-light">Update Category</button>
                </div>
                </div>
            </form>
            </>
            )}
            </>
    )
}


export default UpdateCategory;
