import React from "react";
import useTransactions from "../../hooks/useTransactions";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";

const Transactions = () => {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <Loader />;
  }

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const filteredTransactions = sortedTransactions.filter((transaction) => {
    return transaction.medicines.some((item) => item.medicine);
  });

  return (
    <div className="flex h-full w-full flex-col gap-4 bg-slate-100 p-4">
      <Header />

      <div className="flex flex-col gap-4">
        {filteredTransactions.map((transaction, index) => (
          <Transaction key={index} transaction={transaction} />
        ))}

        {sortedTransactions.length === 0 && (
          <div className="text-center text-xl">No transactions yet</div>
        )}
      </div>
    </div>
  );
};

export default Transactions;

const Transaction = ({ transaction }) => {
  return (
    <NavLink
      className="flex flex-col gap-2 rounded-md border shadow-md"
      to={`/transactions/${transaction.id}`}
    >
      <div className="flex flex-col gap-2 p-2">
        {transaction.medicines.map((item, index) => {
          if (item.medicine) {
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
          }
        })}
      </div>

      <span className="h-[1px] w-full bg-slate-300"></span>

      <div className="flex items-center justify-between px-2">
        <div>
          <p className="text-sm text-gray-600">Delivery Address:</p>
        </div>
        <p className="text-sm text-gray-600">{transaction.deliveryAddress}</p>
      </div>

      <div className="flex items-center justify-between px-2">
        <div>
          <p className="text-sm text-gray-600">
            Date: {format(new Date(transaction.createdAt), "yyyy-mm-dd hh:mm")}
          </p>
        </div>
        <p className="text-lg font-bold text-red-500">- ${transaction.total}</p>
      </div>
    </NavLink>
  );
};
