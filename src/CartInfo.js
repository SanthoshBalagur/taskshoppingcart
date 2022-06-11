import React from "react";
import styled from "styled-components";
import { numberFormat } from "./numberFormat";
import { Button } from "./Button";
import { P } from "./P";
import { Arrow } from "./Arrow";
import { VerticalBar } from "./VerticalBar";
import { CartButtons } from "./CartButtons";

export const CartInfo = ({
  cart,
  increaseQ,
  decreaseQ,
  removeFromCart,
  day
}) => (
  <>
    {cart.map((item, i) => (
      <DetailColumn key={item.name}>
        {day === 4 && item.name === "Cookie" ? (
          <P>
            {item.name} <VerticalBar />
            {item.quantity} x ${item.price} <Arrow />{" "}
            <s>${numberFormat(item.price * item.quantity)}</s>
            <VerticalBar /> {item.bulkPrice}
          </P>
        ) : day === 1 && item.name === "Mini Gingerbread Donut" ? (
          <P>
            {item.name}
            <VerticalBar />
            {item.quantity} x ${item.price} <Arrow /> $
            {numberFormat(item.price * item.quantity)}
            <br />
            {numberFormat(Math.round(item.quantity / 2))}
            {item.name} Free
          </P>
        ) : day === 9 && item.name === "Key Lime Cheesecake" ? (
          <P>
            {item.name} <VerticalBar /> {item.quantity} x ${item.price}{" "}
            <Arrow /> ${numberFormat(item.price * item.quantity * 25)}
          </P>
        ) : (
          <P>
            {item.name} <VerticalBar /> {item.quantity} x ${item.price}{" "}
            <Arrow /> ${numberFormat(item.price * item.quantity)}
          </P>
        )}

        <CartButtons
          increaseQ={() => increaseQ(i)}
          decreaseQ={() => decreaseQ(i)}
          removeFromCart={() => removeFromCart(i)}
        />
      </DetailColumn>
    ))}
    <CheckoutButton>Checkout</CheckoutButton>
  </>
);
const DetailColumn = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 5px 0;
  width: 95%;
  border-bottom: 1px solid black;
`;

const CheckoutButton = styled(Button).attrs(() => ({
  backgroundColor: "darkblue"
}))`
  margin-top: 15px;
  margin-bottom: 15px;
`;
