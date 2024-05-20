import React, { useState } from "react";
import { useMedicines } from "../../hooks/admin/useMedicines";
import { useDeleteMedicine } from "../../hooks/admin/useDeleteMedicine";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { FaDeleteLeft } from "react-icons/fa6";

const AdminMedicines = () => {
  const { medicines, isMedicinesLoading } = useMedicines();
  const { deleteRecord } = useDeleteMedicine();
  const [search, setSearch] = useState("");

  if (isMedicinesLoading) {
    return <Loader />;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredMedicines = medicines.filter((medicine) => {
    return medicine.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Header />

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Search for medicine"
          className="rounded border border-teal-400 p-2"
          onChange={handleSearch}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2 xl font-normal">Medicines</h2>
        <div className="flex flex-col gap-4">
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="relative flex flex-col rounded-md bg-white p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="h-auto w-28"
                />

                <div className="flex w-full flex-col gap-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-normal">{medicine.name}</h2>

                      <FaDeleteLeft
                        onClick={() => deleteRecord(medicine.id)}
                        className=" text-3xl text-red-500"
                      />
                    </div>
                    <p className="text-md font-light">
                      Category: {medicine.category}
                    </p>
                    <p className="text-md font-light">
                      {medicine.description.substring(0, 100)}...
                    </p>
                  </div>
                  <span className="h-[1px] w-full bg-slate-200"></span>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-normal">Price:</p>
                    <p className="text-xl font-normal">${medicine.price}.00</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredMedicines.length === 0 && (
            <div className="text-center text-xl">No medicines found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMedicines;
