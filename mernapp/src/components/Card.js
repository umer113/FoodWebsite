import React from 'react';

const Card = (props) => {
  const options = props.options;
  const handleLogout = () => { };

  return (
    <div>
      <div className="card mt-3" style={{ width: '18rem', maxHeight: '420px' }}>
        <img
          src={props.imgSrc}
          className="card-img-top"
          alt="Dish"
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100">
            <div className="row align-items-center">
              <div className="col-4">
                <select className="m-2 h-50 bg-success rounded">
                  {Array.from(Array(6), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <select className="m-2 h-50 bg-success rounded">
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-12">
                <div className="fs-5 d-inline mr-10">Total Price</div>
              </div>
            </div>
            <hr>
            </hr>
            <button className="btn btn-success justify-center ms-2  " onClick={handleLogout}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;