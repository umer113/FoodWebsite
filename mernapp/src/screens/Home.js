import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Carousel from '../components/CarouselComponent'; // Import Carousel component

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:7200/api/foodData", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const responseData = await response.json();
      setFoodItem(responseData[0]);
      setFoodCategory(responseData[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ width: "50%", height: "1200px", filter: "brightness(20%)",objectFit:"fill" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ width: "50%", height: "1200px", filter: "brightness(20%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?fries" className="d-block w-100" style={{ width: "50%", height: "1200px", filter: "brightness(20%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
        </div>
      </div>
      <div className='container'>
        {foodCategory.length > 0 ? (
          foodCategory.map((data) => (
            <div key={data._id} className='row mb-3'>
              <div className='fs-3 m-3'>{data.categoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter((item) => item.categoryName === data.categoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                  .map((filterItems) => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodName={filterItems.name}
                        options={filterItems.options}
                        imgSrc={filterItems.img}
                      />
                    </div>
                  ))
              ) : (
                <div>no such data found</div>
              )}
            </div>
          ))
        ) : (
          <div>no such data found</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}