import React, { useState } from "react";

export default function Home({ products }) {
  const [shoppingList, setShoppingList] = useState([]);
  const [total, setTotal] = useState(0);
  const [buttonFlag, setButtonFlag] = useState(false);

  const addToShopList = (id,title, price) => {
    let newShoppingList = shoppingList;
    newShoppingList.push({id, title, price });
    setShoppingList(newShoppingList);
    setTotal(parseInt(total) + parseInt(price));
  };

  const transaction = (summary,total)=>{
    setButtonFlag(!buttonFlag)
    setShoppingList([])
    setTotal(0)
    console.log(summary,total)
  }

  let items;
  if (products !== undefined) {
    items = products.map((item, index) => {
      return (
        <div
          key={index}
          style={{
            border: "1px solid",
            borderRadius: 5,
            height: "280px",
            width: "200px",
            marginBottom: "10px",
          }}
        >
          <img src={item.image} alt="err" width="100px" height="100px"></img>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>{item.price}$</p>
          <button onClick={() => addToShopList(item.id,item.title, item.price)}>
            Buy
          </button>{" "}
          <br /> <br />
        </div>
      );
    });
  }
  let shopList = shoppingList.map((item, index) => {
    return (
      <div key={index}>
        <label>
          {item.title}
          {`       `}
          {item.price}$
        </label>{" "}
        <br />
      </div>
    );
  });
  let shopListTotal = (
    <>
      <br />
      <br />
      total: {total}$
    </>
  );
  let payment;
  if (buttonFlag === true)
    payment = (
      <div style={{ backgroundColor: "white", zIndex: 0 }}>
        {shopList}
        {shopListTotal} <br />
        <button style={{}} onClick={(shopList,shopListTotal)=>transaction(shoppingList,total)}>Pay</button>
      </div>
    );

    

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "1100px",
          border: "1px solid black",
        }}
      >
        <button
          name="shopping cart" onClick={()=>setButtonFlag(!buttonFlag)}
        >
          Shopping Cart
        </button>
        {payment}
      </div>
      <div
        style={{
          width: "60%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          justifyContent: "space-around",
          gridGap: "0px",
          padding: "10px",
        }}
      >
        {items}
      </div>
    </div>
  );
}
