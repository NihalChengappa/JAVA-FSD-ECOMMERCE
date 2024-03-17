import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min.js';

function Home(){
    const [vantaEffect, setVantaEffect] = useState(null);
  const backgroundRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: backgroundRef.current,
          THREE:THREE,
          mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00
          // showDots: false
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
    return(
        <>
        <div
    ref={backgroundRef}
    className="vh-100 text-white"
    style={{ height: '100vh', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: -1 }}
  ></div>
        <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 col-lg-6 col-xl-5">
              <img className="img-fluid rounded" loading="lazy" src="https://cdn1.expresscomputer.in/wp-content/uploads/2023/01/04165947/EC_Retail_ECommerce_750.jpg" alt="" />
            </div>
            <div className="col-12 col-lg-6 col-xl-7">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-11">
                  <h2 className="h1 mb-3">Who Are We?</h2>
                  <p className="lead fs-4 text-muted mb-3">We are a leading eCommerce platform dedicated to providing exceptional shopping experiences to our customers. Our mission is to offer a wide range of high-quality products, seamless shopping experiences, and excellent customer service.</p>
                  {/* <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida orci ac luctus molestie. Fusce finibus congue erat, non aliquam magna tincidunt at. Aenean lacinia arcu ex, sed pharetra nibh porta a. Curabitur vel consequat nibh, ac interdum nisl. Nunc pulvinar nec massa vitae sollicitudin.</p> */}
                  <div className="row gy-4 gy-md-0 gx-xxl-5X">
                    <div className="col-12 col-md-6">
                      <div className="d-flex">
                        <div className="me-4 text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="mb-3">Versatile Brand</h4>
                          <p className="text-muted mb-0">We offer a wide range of products from various categories, ensuring that customers can find everything they need in one place.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-flex">
                        <div className="me-4 text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="mb-3">Digital Agency</h4>
                          <p className="text-muted mb-0">We utilize cutting-edge technology and digital marketing strategies to enhance the online shopping experience for our customers.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}
export default Home;