import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";

function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[0],response[1])
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value);
                  }}
                />
               
              </form>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container d-flex flex-wrap">
  {foodCat !== []
    ? foodCat.map((data) => {
        return (
          <div key={data._id} className="col-12 mb-3">
            <div className="fs-3 m-3">{data.CategoryName}</div>
            <hr />
            <div className="d-flex flex-wrap">
              {foodItem !== []
                ? foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                            
                          ></Card>
                        </div>
                      );
                    })
                : "No Such Data Found"}
            </div>
          </div>
        );
      })
    : ""}
</div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Home;


/* <div className="container">
        {
          foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div classname="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []  ? 
                    foodItem
                      .filter(
                        (item) =>
                          (item.CategoryName === data.CategoryName) &&
                          (item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase()))
                      )
                      .map((filterItems) => {
                        return (
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                            <Card
                              foodName={filterItems.name}
                              options={filterItems.options[0]}
                              imgSrc={filterItems.img}
                            ></Card>
                          </div>
                        );
                      })
                   : (
                    <div>No Such Data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>*/
