import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import { useNavigate } from "react-router-dom";

const paymentMethods = [
  {
    id: 1,
    name: "Click",
    image: "/images/click.png",
  },
  {
    id: 2,
    name: "Humo",
    image: "/images/humo.jpg",
  },
  {
    id: 3,
    name: "Payme",
    image: "/images/payme.png",
  },
];

const Payment = () => {
  const { cart } = useCart();

  const { createTransaction, isCreating } = useCreateTransaction();

  const [deliveryAddress, setDeliveryAddress] = useState("Chikago 0010220");
  const [paymentMethod, setPaymentMethod] = useState("Click");

  const navigate = useNavigate();

  const handlePay = () => {
    const newTransaction = {
      medicines: cart.map((item) => ({
        medicine: item.id,
        quantity: item.quantity,
      })),
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      deliveryAddress: deliveryAddress,
      paymentMethod: paymentMethod,
    };

    createTransaction(newTransaction);

    navigate("/transactions");
  };

  const handleDeliveryAddress = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-normal">Payment</h2>
      </div>

      <div className="flex flex-col gap-1">
        {cart.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col bg-slate-100 pb-1"
          >
            <div className="flex justify-between gap-2">
              <h2 className="text-xl font-light">{item.name}</h2>

              <span className="text-xl font-normal">{item.quantity}x</span>
            </div>
          </div>
        ))}
      </div>

      <span className="h-[1px] w-full bg-slate-300"></span>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-normal">DELIVERY TO</h2>

        <div className="flex w-full items-center gap-4">
          <input
            type="text"
            placeholder="Delivery Address"
            className="w-full rounded border border-slate-400 p-2"
            defaultValue="Chikago 0010220"
            onChange={handleDeliveryAddress}
          />
        </div>
      </div>

      <span className="h-[1px] w-full bg-slate-300"></span>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-normal">PAYMENT METHOD</h2>

        <div className="flex items-center gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`relative flex items-center justify-center rounded-md bg-white p-2 ${
                paymentMethod === method.name ? "border-2 border-slate-800" : ""
              }`}
              onClick={() => setPaymentMethod(method.name)}
            >
              <img
                src={method.image}
                alt={method.name}
                className="h-10 w-24 rounded-md bg-white object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <span className="h-[1px] w-full bg-slate-300"></span>

      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-light">TOTAL</h2>
          <span className="text-sm font-thin">Inclusive of all taxes</span>
        </div>
        <span className="text-5xl font-light">
          ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}.00
        </span>
      </div>

      <button
        className="ml-auto w-fit rounded-md bg-slate-800 p-2 px-4 text-white"
        onClick={handlePay}
      >
        {isCreating ? "Processing..." : "Pay"}
      </button>

      <span className="h-14 w-full sm:hidden"></span>
    </div>
  );
};

export default Payment;
