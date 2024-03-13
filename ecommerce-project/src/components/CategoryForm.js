import React, { useEffect, useState } from 'react';
import useVantaNetEffect from './NetEffect';
import axios from 'axios';
import Select from 'react-select';

function CategoryForm() {
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const vantaRef = useVantaNetEffect();
    const [products, setProducts] = useState([]);
    const [selectProducts, setSelectProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
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
        }
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8060/productandcategory/ecommerceapp/api/v1/category/addcategory', 
            {name:name,
            categoryDescription:description},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const categoryId = response.data.categoryId;
            console.log(categoryId)
            for (const productId of selectProducts) {
                const linkResponse = await axios.post(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/link/createlink?productId=${productId}&categoryId=${categoryId}`,{},{
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
    }

    const handleProductChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setSelectProducts(selectedIds);
    };

    const productOptions = products.map(product => ({
        value: product.productId,
        label: product.productName
    }));

    return (
        <>
            <div ref={vantaRef} className="vanta-effect" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="categoryname">Category Name</label>
                        <input type="text" className="form-control" id="categoryname" placeholder="Enter Category Name" onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="categorydescription">Category Description</label>
                        <input type="text" className="form-control" id="categorydescription" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter Category Description" />
                    </div>
                </div>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Product to link</label>
                        <Select
                            isMulti
                            options={productOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleProductChange}
                        />
                        {console.log(selectProducts)}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </>
    );
}

export default CategoryForm;
