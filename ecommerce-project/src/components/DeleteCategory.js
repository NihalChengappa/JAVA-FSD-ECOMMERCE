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
            setSelectedCategory("");
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
                <form onSubmit={handleSubmit}>
                <div className="col-md-6 offset-3 justify-content-center p-5 card-body row border rounded" style={{background:"#e3f2fd", marginTop:"180px"}}>
                    <div className="form-group p-3">
                            <label htmlFor="categoryname" style={{width:"200px"}}>Category Name</label>
                            <select className="form-select " aria-label="Default select example" onChange={(e)=>{setSelectedCategory(e.target.value)}}>
                                <option selected>Choose Category</option>
                                {categories.map(category => (
                                    <option key={category.categoryId} value={category.categoryId} >{category.name}</option>
                                ))}
                            </select>
                    </div>
                    <div className="col-md-6 offset-3">
                    <button type="submit" className="btn btn-light" >Delete Category</button>
                    </div>
                    </div>
                </form>
            
        </>
    )
}

export default DeleteCategory;
