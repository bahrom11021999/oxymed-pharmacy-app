import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useCart } from "../../context/CartContext";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { cart, cartLength, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="flex h-full w-full flex-col gap-6 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-normal">
          Your Cart (
          <span className="text-xl font-normal">
            {cartLength > 0 ? `${cartLength} items` : `Empty`}
          </span>
          )
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col rounded-md bg-slate-100 p-2 pr-4"
          >
            <div className="flex gap-4">
              <div className="rounded-md bg-white p-1">
                <img src={item.image} alt={item.name} className="h-auto w-20" />
              </div>

              <div className="flex w-full flex-col gap-2">
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-normal">{item.name}</h2>

                    <div className="flex items-center gap-2">
                      <IoIosRemoveCircleOutline
                        className="text-2xl text-slate-800"
                        onClick={() => decreaseQuantity(item.id)}
                      />
                      <span className="text-md font-normal">
                        {item.quantity}
                      </span>
                      <IoIosAddCircleOutline
                        className="text-2xl text-slate-800"
                        onClick={() => {
                          increaseQuantity(item.id);
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-xl font-normal">${item.price}.00</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <span className="mt-auto h-[1px] w-full bg-slate-200"></span>

      <div className="flex justify-between">
        <h2 className="text-xl font-normal">Total</h2>
        <span className="text-xl font-normal">
          $
          {cart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0)}
          .00
        </span>
      </div>

      {cartLength > 0 && (
        <>
          <div className="flex justify-end">
            <NavLink
              className="rounded-md bg-slate-800 p-2 text-white"
              to="/checkout"
            >
              Checkout
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
