import React, { useEffect, useState } from 'react';
import useVantaNetEffect from './NetEffect';
import axios from 'axios';
import Select from 'react-select';
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

function CategoryForm() {
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [loading, setLoading] = useState(true);
    const[emsg,setEmsg]=useState('');
    const[smsg,setSmsg]=useState('');
    const vantaRef = useVantaNetEffect();
    const [products, setProducts] = useState([]);
    const [selectProducts, setSelectProducts] = useState([]);
    
    useEffect(() => {
        getProducts().then(() => {
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
            window.location.href="/logout";
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
            for (const productId of selectProducts) {
                const linkResponse = await axios.post(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/link/createlink?productId=${productId}&categoryId=${categoryId}`,{},{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Category linked to product:', linkResponse.data);
            }
            console.log('Category added and linked to products:', response.data);
            setSmsg("Category Added Successfully")
            setName('');
            setDescription('');
            setSelectProducts('');
        } catch (error) {
            setEmsg("Error Adding Category")
            console.error('Error fetching products:', error);
        }
        finally{
            setTimeout(() => {
              setEmsg('');
              setSmsg('');
          }, 3000);
              return;
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
            
            <form onSubmit={handleSubmit} className="container">
                <div className="col-md-6 offset-3 justify-content-center p-5 card-body row mt-4 border rounded" style={{background:"#e3f2fd"}}>
                {emsg && <ErrorAlert msg={emsg}/>}
                {smsg && <SuccessAlert msg={smsg}/>}
                    <div className="form-group p-3 ">
                        <label htmlFor="categoryname">Category Name</label>
                        <input type="text" className="form-control" value={name} id="categoryname" placeholder="Enter Category Name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="categorydescription">Category Description</label>
                        <input type="text" className="form-control" value={description} id="categorydescription" onChange={(e) => setDescription(e.target.value)} placeholder="Enter Category Description" />
                    </div>
                    <div className="form-group p-3">
                        <label htmlFor="inlineFormCustomSelect">Product to link</label>
                        <Select
                            isMulti
                            options={productOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleProductChange}
                        />
                    </div>
                    <div className="col-md-6 offset-3">
                        <button type="submit" className="btn btn-light">Add Category</button>
                    </div>
            </div>
</form>

        </>
            )}
            </>
    );
}

export default CategoryForm;
