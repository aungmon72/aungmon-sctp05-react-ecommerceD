import React from 'react';


 function ProductCard2(props) {
    return (
        
        <>

          <div className="card">
              <img
                src={props.imageUrl}
                className="card-img-top"
                alt={props.productName}
              />
              <div className="card-body">
                <h5 className="card-title">{props.productName}</h5>
                <p className="card-text">${props.price}</p>
                <a href="#" className="btn btn-primary" onClick={(props)=>{
                  console.log("added to cart");
                  props.onAddToCart();
                }}>Add to Cart</a>
              </div>
            </div>
        </>
    )
}


export default function ProductCard(props) {
    return (
        <>
          <div className="card">
              <img
                src={props.imageUrl}
                className="card-img-top"
                alt={props.productName}
              />
              <div className="card-body">
                <h5 className="card-title">{props.productName}</h5>
                <p className="card-text">${props.price}</p>
                <a href="#" className="btn btn-primary" onClick={()=>{
                  console.log("added to cart");
                  props.onAddToCart();
                  //                    props.onAddToCart();
                }}>Add to Cart</a>
              </div>
            </div>
        </>
    )
}