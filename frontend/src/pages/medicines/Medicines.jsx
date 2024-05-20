import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import useMedicines from "../../hooks/useMedicines";
import Loader from "../../components/Loader";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../context/CartContext";
import { NavLink, useSearchParams } from "react-router-dom";

const Medicines = () => {
  const { medicines, isLoading } = useMedicines();
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();

  const { addToCart } = useCart();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const search = searchParams.get("category");
    console.log(search);
    setSearch(search || "");
  }, [searchParams]);

  if (isLoading) {
    return <Loader />;
  }

  if (!medicines) {
    return <div>Error: Medicines not found</div>;
  }

  const filteredMedicines = medicines?.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(search?.toLowerCase()) ||
      medicine.category.toLowerCase().includes(search?.toLowerCase()),
  );

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
        <h2 className="text-2xl font-normal">Medicines</h2>
        <div className="flex flex-col gap-4">
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="relative flex flex-col rounded-md bg-white p-4"
            >
              <div className="flex items-center gap-4">
                <NavLink to={`/medicines/${medicine.id}`}>
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="h-auto w-40"
                  />
                </NavLink>

                <div className="flex w-full flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <NavLink
                      className="flex flex-col gap-2 hover:text-blue-800"
                      to={`/medicines/${medicine.id}`}
                    >
                      <h2 className="text-xl font-normal">{medicine.name}</h2>
                      <p className="text-sm font-light">
                        This is a medicine for {medicine.category}.
                      </p>
                      <p className="text-sm font-light">
                        {medicine.quantity} pills in a strip
                      </p>
                    </NavLink>

                    <span className="h-[0.1px] rounded-full bg-slate-400 text-white"></span>

                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-normal">Price</span>
                        <span className="text-xl font-semibold">
                          ${medicine.price}
                        </span>
                      </div>
                      <button
                        className="rounded-full bg-slate-800 p-2 text-white"
                        onClick={() => {
                          addToCart(medicine);
                        }}
                      >
                        <AiOutlineShoppingCart className="text-xl" />
                      </button>
                    </div>
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

export default Medicines;
