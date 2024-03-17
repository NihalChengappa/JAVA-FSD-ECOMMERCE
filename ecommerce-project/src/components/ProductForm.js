import React, { useEffect, useState } from 'react';
import useVantaNetEffect from './NetEffect';
import axios from 'axios';
import Select from 'react-select';
import ScaleLoader from 'react-spinners/ScaleLoader';

function ProductForm() {
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const[price,setPrice]=useState(0);
    const vantaRef = useVantaNetEffect();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    useEffect(() => {
        getCategories().then(() => {
            setLoading(false);
        });;
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
            console.error('Error fetching products:', error);
            window.location.href="/logout";
        }
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8060/productandcategory/ecommerceapp/api/v1/product/addproduct', 
            {productName:name,
                productPrice:price,
            productDescription:description},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const productId = response.data.productId;
            console.log(productId)
            for (const categoryId of selectedCategories) {
                const linkResponse = await axios.post(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/link/createlink?productId=${productId}&categoryId=${categoryId}`,{},{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Category linked to product:', linkResponse.data);
            }
            console.log('Category added and linked to products:', response.data);
            setName('');
            setDescription('');
            setPrice(0);
            setSelectedCategories('');
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const handleCategoryChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setSelectedCategories(selectedIds);
    };

    const categoryOptions = categories.map(category => ({
        value: category.categoryId,
        label: category.name
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
            <div className="col-md-6 offset-3 justify-content-center p-5 card-body row mt-4 border rounded" style={{background:"#e3f2fd"}}>
                    <div className="form-group p-3">
                        <label htmlFor="productname">Product Name</label>
                        <input type="text" className="form-control" id="productname" value={name} placeholder="Enter Product Name" onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="productprice">Product Price</label>
                        <input type="text" className="form-control" id="productprice" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter Product Price" />
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="productdescription">Product Description</label>
                        <input type="text" className="form-control" id="productdescription" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter Product Description" />
                    </div>
                    <div className="form-group p-3">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Category to link</label>
                        <Select
                            isMulti
                            // value={selectedCategories}
                            options={categoryOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className="col-md-6 offset-3">
                        <button type="submit" className="btn btn-light">Add Product</button>
                    </div>
                    </div>
                </form>
                </>
            )}
        </>
    );
}

export default ProductForm;
