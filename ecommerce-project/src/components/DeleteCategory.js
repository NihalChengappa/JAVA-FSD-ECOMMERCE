import React,{ useEffect, useState } from "react";
import useVantaNetEffect from "./NetEffect";
import axios from "axios";

function DeleteCategory(){
    const [categories,setCategories]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState('');
    const vantaRef = useVantaNetEffect();
    
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/category/deletecategory/${selectedCategory}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Category Delete Successfully:', response.data);
        } catch (error) {
            console.error('Error Deleting Category:', error);
        }
    }

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

    return(
        <>
            <div ref={vantaRef} className="vanta-effect" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6" style={{display:"flex",marginBottom:"50px",width:"600px", alignItems: "center"}}>
                            <label htmlFor="categoryname" style={{width:"200px"}}>Category Name</label>
                            <select className="form-select " aria-label="Default select example" onChange={(e)=>{setSelectedCategory(e.target.value)}}>
                                <option selected>Choose Category</option>
                                {categories.map(category => (
                                    <option key={category.categoryId} value={category.categoryId} >{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" >Delete Category</button>
                </form>
            </div>
        </>
    )
}

export default DeleteCategory;
