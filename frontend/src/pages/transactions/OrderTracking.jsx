import React from "react";
import Header from "../../components/Header";
import useTransaction from "../../hooks/useTransaction";
import Loader from "../../components/Loader";
import { format } from "date-fns";
import {
  AiOutlineFileText,
  AiOutlineCloud,
  AiOutlineMail,
} from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

const OrderTracking = () => {
  const { transaction, isLoading } = useTransaction();

  if (isLoading) {
    return <Loader />;
  }

  const createdAt = new Date(transaction.createdAt);

  const generateRandomTime = (date, step) => {
    const randomTime = new Date(date);

    randomTime.setHours(
      randomTime.getHours() + step + Math.floor(Math.random() * 3),
    );

    randomTime.setMinutes(
      randomTime.getMinutes() + Math.floor(Math.random() * 60),
    );

    return format(randomTime, "hh:mm a");
  };

  const getRandomTime = (date, step) => {
    const randomTime = new Date(date);

    randomTime.setHours(
      randomTime.getHours() + step + Math.floor(Math.random() * 3),
    );

    randomTime.setMinutes(
      randomTime.getMinutes() + Math.floor(Math.random() * 60),
    );

    return randomTime;
  };

  const isCompleted = (date) => {
    return new Date() > date;
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Header title="Tracking" />

      <div className="grid h-full w-full gap-4 lg:grid-cols-2">
        <div className="flex h-fit w-full rounded-md bg-white px-4 pb-12 pt-4">
          <div className="flex w-full flex-col gap-10">
            <h2 className="text-xl font-normal">SHIPPING DETAILS</h2>

            <div
              className={
                isCompleted(getRandomTime(createdAt, 0))
                  ? "grid h-fit grid-cols-[20%,14%,auto] gap-4"
                  : "grid h-fit grid-cols-[20%,14%,auto] gap-4 opacity-50"
              }
            >
              <div className="flex flex-col">
                {generateRandomTime(createdAt, 1)}
                <br />
                <span className="text-sm text-gray-500">
                  {format(new Date(transaction.createdAt), "MMM dd")}
                </span>
              </div>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <AiOutlineFileText className="text-2xl text-white" />
              </span>

              <div className="flex flex-col justify-center">
                <div className="text-lg">Order Processing</div>
              </div>
            </div>

            <div
              className={
                isCompleted(getRandomTime(createdAt, 1))
                  ? "grid h-fit grid-cols-[20%,14%,auto] gap-4"
                  : "grid h-fit grid-cols-[20%,14%,auto] gap-4 opacity-50"
              }
            >
              <div className="flex flex-col">
                {generateRandomTime(createdAt, 2)}
                <br />
                <span className="text-sm text-gray-500">
                  {format(new Date(transaction.createdAt), "MMM dd")}
                </span>
              </div>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <AiOutlineCloud className="text-2xl text-white" />
              </span>

              <div className="flex flex-col justify-center">
                <div className="text-md text-slate-600">
                  Your order is being processed in our warehouse
                </div>
              </div>
            </div>

            <div
              className={
                isCompleted(getRandomTime(createdAt, 2))
                  ? "grid h-fit grid-cols-[20%,14%,auto] gap-4"
                  : "grid h-fit grid-cols-[20%,14%,auto] gap-4 opacity-50"
              }
            >
              <div className="flex flex-col">
                {generateRandomTime(createdAt, 3)}
                <br />
                <span className="text-sm text-gray-500">
                  {format(new Date(transaction.createdAt), "MMM dd")}
                </span>
              </div>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <AiOutlineMail className="text-2xl text-white" />
              </span>

              <div className="flex flex-col justify-center">
                <div className="text-md">Shipped</div>
              </div>
            </div>

            <div
              className={
                isCompleted(getRandomTime(createdAt, 3))
                  ? "grid h-fit grid-cols-[20%,14%,auto] gap-4"
                  : "grid h-fit grid-cols-[20%,14%,auto] gap-4 opacity-50"
              }
            >
              <div className="flex flex-col">
                {generateRandomTime(createdAt, 4)}
                <br />
                <span className="text-sm text-gray-500">
                  {format(new Date(transaction.createdAt), "MMM dd")}
                </span>
              </div>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <AiOutlineCheck className="text-white" />
              </span>
              <div className="flex flex-col justify-center">
                <p className="text-md">
                  Arriving to {transaction.deliveryAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-fit w-full rounded-md bg-white p-4">
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-xl font-normal">MEDICINES</h2>

            {transaction.medicines.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 rounded-md bg-slate-50 p-2"
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
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
