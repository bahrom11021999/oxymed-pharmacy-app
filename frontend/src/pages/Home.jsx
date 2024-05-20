import { AiOutlineShoppingCart } from "react-icons/ai";
import Loader from "../components/Loader";
import useMedicines from "../hooks/useMedicines";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const { medicines, isLoading, error } = useMedicines();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Header />
      <Search setSearch={setSearch} />

      {search.length === 0 && <Banner />}

      <Categories />

      <Medicines medicines={medicines.slice(0, 6)} />
    </div>
  );
};

export default Home;

const Search = ({ setSearch }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Search for medicine"
        className="rounded border border-teal-400 p-2"
        onChange={handleSearch}
      />
    </div>
  );
};

const Banner = () => {
  return (
    <img
      src="https://www.imedicalapps.com/wp-content/uploads/2018/02/iStock-465420910.jpg"
      alt="Banner"
      className="h-44 w-full rounded-md object-cover shadow-lg sm:h-80"
    />
  );
};

const Medicines = ({ medicines }) => {
  return (
    <div className="flex flex-col gap-4">
      {medicines.map((medicine) => (
        <Medicine key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
};

const Medicine = ({ medicine }) => {
  const { addToCart } = useCart();

  return (
    <div
      key={medicine.id}
      className="relative flex flex-col rounded-md bg-white p-4"
    >
      <div className="flex gap-4">
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
                {medicine.quantity} pills in a strip
              </p>
            </NavLink>

            <span className="h-[0.1px] rounded-full bg-slate-400 text-white"></span>

            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-normal">Price</span>
                <span className="text-xl font-semibold">${medicine.price}</span>
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
  );
};

const Categories = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Category name="Headache" />
      <Category name="Back-pain" />
      <Category name="Heart" />
      <Category name="Leg-pain" />
      <Category name="Mouth" />
      <Category name="Stomach" />
    </div>
  );
};

const Category = ({ name }) => {
  return (
    <NavLink
      className="flex w-full flex-col items-center gap-2 rounded-lg bg-white p-4"
      to={`/medicines?category=${name.toLowerCase()}`}
    >
      <img
        src={`/images/categories/${name.toLowerCase()}.svg`}
        alt="Category"
        className="h-16 w-16"
      />
      <span className="text-sm font-normal">{name}</span>
    </NavLink>
  );
};
