import React from "react";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { format } from "date-fns";
import useTransaction from "../../hooks/useTransaction";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdPin } from "react-icons/io";

const Transaction = () => {
  const { transaction, isLoading } = useTransaction();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Header title="Transaction" />

      <span className="h-[1px] w-full bg-slate-300"></span>

      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-normal">DELIVERY TO</h2>

          <p>{transaction.deliveryAddress}</p>
        </div>

        <div>
          <h2 className="text-xl font-normal">ORDERED ON</h2>

          <p>{format(new Date(transaction.createdAt), "dd MMM yyyy")}</p>
        </div>
      </div>

      <span className="h-[1px] w-full bg-slate-300"></span>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-normal">MEDICINES</h2>

        {transaction.medicines.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between gap-4 rounded-md bg-white p-2"
            >
              <img
                src={item.medicine.image}
                alt={item.medicine.name}
                className="w-16 rounded-md"
              />
              <p className="mr-auto text-lg">
                {item.medicine.name} - {item.quantity}x
              </p>
              <p className="text-lg">${item.medicine.price}</p>
            </div>
          );
        })}
      </div>

      <span className="h-[1px] w-full bg-slate-300"></span>

      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-light">TOTAL</h2>
          <span className="text-sm font-thin">Inclusive of all taxes</span>
        </div>
        <span className="text-5xl font-light">${transaction.total}</span>
      </div>

      <div className="flex bg-white h-fit w-full items-center justify-center">
        <img
          src="/images/signature.png"
          alt="Signature"
          className="h-32 w-auto"
        />
      </div>

      <span className="mt-auto h-[1px] w-full bg-slate-300"></span>

      <NavLink
        to={`/transactions/${transaction.id}/order-tracking`}
        className="ml-auto flex w-fit items-center justify-end gap-2 rounded-lg bg-slate-800 p-4 text-white"
      >
        <IoMdPin className="text-xl" />
        <span>Track Order</span>
      </NavLink>

      <span className="h-14 w-full sm:hidden"></span>
    </div>
  );
};

export default Transaction;
