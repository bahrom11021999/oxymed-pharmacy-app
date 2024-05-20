import React from "react";
import useMedicine from "../../hooks/useMedicine";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../context/CartContext";
import Loader from "../../components/Loader";
import Header from "../../components/Header";

const Medicine = () => {
  const { medicine, isLoading, error } = useMedicine();
  const { addToCart } = useCart();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col gap-8 p-4">
      <Header title="Medicine" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-8 rounded-md bg-white p-4">
          <div className="flex flex-col-reverse items-center gap-4 sm:flex-row">
            <div className="flex w-full flex-col gap-2">
              <h2 className="text-2xl font-normal">{medicine.name}</h2>
              <h2 className="w-3/4 font-light sm:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                vehicula, mauris nec ultrices aliquam, mi justo consequat nunc,
              </h2>

              <span className="mt-6 text-lg font-semibold">
                Category: {medicine.category}
              </span>

              <span className="mt-6 text-lg font-semibold">
                Pills Count:
                {medicine.quantity}
              </span>

              <span className="text-lg font-semibold">
                Price: ${medicine.price}.00
              </span>
            </div>

            <img
              src={medicine.image}
              alt={medicine.name}
              className="mb-auto mr-auto h-fit w-32 sm:w-60"
            />
          </div>

          <button
            className="ml-auto flex w-fit items-center gap-1 rounded-md bg-slate-800 p-2 px-4 text-white"
            onClick={() => addToCart(medicine)}
            type="button"
          >
            <AiOutlineShoppingCart className="text-xl" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="h-14 w-full"></div>
    </div>
  );
};

export default Medicine;
