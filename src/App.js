import React, { useState, useEffect } from "react";
import styled from "styled-components";
import treats from "./mockAPI";
import { ListedItems } from "./ListedItems";
import { FixedCart } from "./FixedCart";
import { CartDetails } from "./CartDetails";
import { Overlay } from "./Overlay";
import { GlobalStyles, lightGray } from "./GlobalStyles";



 function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState(treats);
  const [cartOpen, isCartOpen] = useState(false);
  const [saleActive, setSaleActive] = useState("");
  const [day, setDay] = useState(0);

  useEffect(() => {
    items.forEach((item) => {
      item.quantity = 1;
    });
  }, [items]);

  useEffect(() => {
    console.log("sale",saleActive);
  }, [saleActive]);

   

  const addToCart = (i) => {
    setItems((state) =>
      state.map((item, p) => {
        if (i === p) {
          setCart([
            ...cart,
            {
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              bulkPrice: item?.bulkPricing?.totalPrice
            }
          ]);
          return { ...item, inCart: true };
        }
        return item;
      })
    );
  };
  const handleClick = (e) => {
    const d = new Date(e.target.value);
    let day = d.getDay();
    let month = d.getMonth();
    let date = d.getDate();
  

    if (month == 8 && Number(date) == Number(30)) {
      setDay(month);
      setSaleActive("25% OFF")
      
    }
    if (day === 1) {
      setDay(day);
      setSaleActive("Buy 2 Mini Gingerbread Donut Get One Free ")
      
    }
    if (day === 4) {
      setDay(day);
      setSaleActive("OFFER! Get 8 cookies at $6.00")
     
    }
  };

  const increaseQuantity = {
    inCart: (i) => {
      setCart((state) =>
        state.map((item, o) => {
          if (i === o && item.quantity < 10) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    },
    inItems: (i) => {
      setItems((state) =>
        state.map((item, o) => {
          if (o === i && item.quantity < 10) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    }
  };

  const decreaseQuantity = {
    inCart: (i) => {
      setCart((prevCart) =>
        prevCart.map((item, o) => {
          if (i === o && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
      );
    },
    inItems: (i) => {
      setItems((state) =>
        state.map((item, o) => {
          if (i === o && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
      );
    }
  };

  const removeFromCart = (i) => {
    let chosenItem, index;
    index = 0;
    while (index < cart.length) {
      if (index === i) {
        chosenItem = cart[index].name;
        break;
      }
      index++;
    }
    setCart((state) => state.filter((item) => chosenItem !== item.name));
    setItems((state) =>
      state.map((item) => {
        if (item.name === chosenItem) {
          return { ...item, inCart: false, quantity: 1 };
        }
        return item;
      })
    );
  };

  const cartCountTotal = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <GlobalStyles />
      <CartDetails
        open={cartOpen}
        onClose={() => isCartOpen(false)}
        cart={cart}
        increaseQ={increaseQuantity.inCart}
        decreaseQ={decreaseQuantity.inCart}
        cartCountTotal={cartCountTotal}
        removeFromCart={removeFromCart}
        day={day}
      />

      <FixedCart onOpen={() => isCartOpen(true)} cartItems={cartCountTotal} />
      <Overlay onClick={() => isCartOpen(false)} open={cartOpen} />

      <Wrapper>
        <H1>Shopping Cart App</H1>
        <input type="Date" onChange={(e) => handleClick(e)} />
        <ListedItems
          items={items}
          increaseCount={increaseQuantity.inItems}
          decreaseCount={decreaseQuantity.inItems}
          addToCart={addToCart}
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 75px 0;
  display: flex;
  flex-flow: column;
  align-items: center;
`;
const H1 = styled.h1`
  padding: 0 10px 50px 10px;
  text-align: center;
  color: ${lightGray};
`;

export default App;
