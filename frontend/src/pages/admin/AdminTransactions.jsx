import React, { useState } from "react";
import useTransactions from "../../hooks/admin/useTransactions";
import Header from "../../components/Header";
import { format } from "date-fns";

const AdminTransactions = () => {
  const { transactions, isLoading } = useTransactions();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.medicines.some(
      (item) =>
        item.medicine &&
        item.medicine.name.toLowerCase().includes(search.toLowerCase()),
    );
  });

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Header />

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Search for transaction"
          className="rounded border border-teal-400 p-2"
          onChange={handleSearch}
        />
      </div>

      <div className="flex flex-col gap-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex flex-col gap-2 rounded-md border shadow-md"
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

            <div className="flex justify-between p-2">
              <p className="text-lg font-thin">Total: ${transaction.total}</p>
              <p className="text-lg font-thin">
                Date:{" "}
                {format(new Date(transaction.createdAt), "yyyy-MM-dd HH:mm")}
              </p>
            </div>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="flex h-64 items-center justify-center">
            <p className="text-2xl">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTransactions;
