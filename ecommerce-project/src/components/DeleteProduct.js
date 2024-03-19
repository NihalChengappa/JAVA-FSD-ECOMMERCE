import React,{ useEffect, useState } from "react";
import useVantaNetEffect from "./NetEffect";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

function DeleteProduct(){
    const [products,setProducts]=useState([]);
    const [selectedProduct,setSelectedProduct]=useState('');
    const vantaRef = useVantaNetEffect();
    const[emsg,setEmsg]=useState('');
    const[smsg,setSmsg]=useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then(() => {
            setLoading(false);
        });
    }, []);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8060/productandcategory/ecommerceapp/api/v1/product/deleteproduct/${selectedProduct}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Product Delete Successfully:', response.data);
            setSmsg("Product Deleted");
            fetchProducts();
            setSelectedProduct('');

        } catch (error) {
            console.error('Error Deleting Product:', error);
            setSmsg("Error Deleting Product")
        }
        finally{
            setTimeout(() => {
              setEmsg('');
              setSmsg('');
          }, 3000);
              return;
        }
    }

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
            window.location.href="/logout";
        }
    };

    return(
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
                        <div className="col-md-6 offset-3 justify-content-center p-5 card-body row border rounded" style={{background:"#e3f2fd", marginTop:"180px"}}>
                            <div className="form-group p-3">
                                    <label htmlFor="productname" style={{width:"200px"}}>Product Name</label>
                                    <select className="form-select " aria-label="Default select example" onChange={(e)=>{setSelectedProduct(e.target.value)}}>
                                        <option selected>Choose Product</option>
                                        {products.map(product => (
                                            <option key={product.productId} value={product.productId} >{product.productName}</option>
                                        ))}
                                    </select>
                                </div>
                            <div className="col-md-6 offset-3">
                                <button type="submit" className="btn btn-light" >Delete Product</button>
                            </div>
                            {emsg && <ErrorAlert msg={emsg}/>}
                            {smsg && <SuccessAlert msg={smsg}/>}
                            </div>
                        </form>
                </>
            )}
            </>
    );
}

export default DeleteProduct;
