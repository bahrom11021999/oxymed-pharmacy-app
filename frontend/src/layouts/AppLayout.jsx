import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlusCircle,
  AiOutlineShoppingCart,
  AiOutlineWallet,
  AiFillPushpin,
} from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { useCheckAuth } from "../hooks/useCheckAuth";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

const links = [
  {
    Icon: AiOutlineHome,
    text: "Home",
    to: "/",
  },
  {
    Icon: GiMedicines,
    text: "Medicines",
    to: "/medicines",
  },
  {
    Icon: AiOutlineShoppingCart,
    text: "Cart",
    to: "/cart",
  },
  {
    Icon: AiOutlineWallet,
    text: "Transactions",
    to: "/transactions",
  },
  {
    Icon: AiFillPushpin,
    text: "Locations",
    to: "/locations",
  },
  {
    Icon: AiOutlineUser,
    text: "24/7 Support",
    to: "/support",
  },
];

const adminLinks = [
  {
    Icon: AiOutlineHome,
    text: "Home",
    to: "/admin/dashboard",
  },
  {
    Icon: AiOutlineUser,
    text: "Users",
    to: "/admin/users",
  },
  {
    Icon: GiMedicines,
    text: "Medicines",
    to: "/admin/medicines",
  },
  {
    Icon: AiOutlineWallet,
    text: "Transactions",
    to: "/admin/transactions",
  },
  {
    Icon: AiOutlinePlusCircle,
    text: "Add Medicine",
    to: "/admin/create-medicine",
  },
];

const AppLayout = () => {
  const { user, isLoading } = useCheckAuth();

  if (isLoading) {
    return <Loader />;
  }

  const isAdmin = user.data.role === "admin";

  return (
    <div className="relative grid h-[100dvh] w-[100dvw] grid-cols-1 grid-rows-[auto,12%] bg-slate-100 lg:grid-cols-[auto,1fr,auto] lg:grid-rows-1">
      {isAdmin ? <Sidebar isAdmin={isAdmin} /> : <Sidebar />}

      <main className="h-full w-full overflow-scroll">
        <Outlet />
      </main>

      <div className="hidden h-full w-80 lg:block"></div>

      {isAdmin ? <BottomNav isAdmin={isAdmin} /> : <BottomNav />}
    </div>
  );
};

export default AppLayout;

const Sidebar = ({ isAdmin }) => {
  return (
    <div className="hidden w-80 flex-col gap-4 border-r bg-white p-4 lg:flex">
      <div className="flex items-center justify-between rounded-md py-4">
        <img src="/images/oxymed.jpeg" alt="Oxymed" className="h-14 w-fit" />
      </div>

      <div className="flex flex-col gap-4">
        {isAdmin ? (
          <>
            {adminLinks.map((link) => (
              <NavItem
                key={link.text}
                Icon={link.Icon}
                text={link.text}
                to={link.to}
              />
            ))}
          </>
        ) : (
          <>
            {links.map((link) => (
              <NavItem
                key={link.text}
                Icon={link.Icon}
                text={link.text}
                to={link.to}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const BottomNav = ({ isAdmin }) => {
  return (
    <nav className="absolute bottom-2 left-1/2 flex h-16 min-h-14 w-[95%] -translate-x-1/2 transform gap-4 rounded-full border-t bg-slate-800 p-2 text-slate-50 lg:hidden">
      {isAdmin ? (
        <>
          {adminLinks.map((link) => (
            <BottomNavItem
              key={link.text}
              Icon={link.Icon}
              text={link.text}
              to={link.to}
            />
          ))}
        </>
      ) : (
        <>
          {links.map((link) => (
            <BottomNavItem
              key={link.text}
              Icon={link.Icon}
              text={link.text}
              to={link.to}
            />
          ))}
        </>
      )}
    </nav>
  );
};

const NavItem = ({ Icon, text, to }) => {
  const { cartLength } = useCart();

  if (text === "Cart" && cartLength > 0) {
    return (
      <NavLink
        className={({ isActive }) => {
          return isActive
            ? "relative flex h-12 w-full items-center gap-2 rounded-md bg-slate-800 px-4 text-slate-50"
            : "relative flex h-12 w-full items-center gap-2 rounded-md px-4";
        }}
        to={to}
      >
        <Icon className="text-2xl" />
        {text}
        <span className="absolute left-7 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-50">
          {cartLength}
        </span>
      </NavLink>
    );
  }

  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? "flex h-12 w-full items-center gap-2 rounded-md bg-slate-800 px-4 text-slate-50"
          : "flex h-12 w-full items-center gap-2 rounded-md px-4";
      }}
      to={to}
    >
      <Icon className="text-2xl" />
      {text}
    </NavLink>
  );
};

const BottomNavItem = ({ Icon, text, to }) => {
  const { cartLength } = useCart();

  if (text === "Cart" && cartLength > 0) {
    return (
      <NavLink
        className={({ isActive }) => {
          return isActive
            ? "relative flex flex-1 items-center justify-center  gap-2 rounded-full border-2"
            : "relative flex flex-1 items-center justify-center gap-2";
        }}
        to={to}
      >
        <Icon className="text-3xl" />
        <span className="absolute left-10 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-50 text-xs text-slate-800">
          {cartLength}
        </span>
      </NavLink>
    );
  }

  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? "flex flex-1 items-center justify-center  gap-2 rounded-full border-2"
          : "flex flex-1 items-center justify-center gap-2";
      }}
      to={to}
    >
      <Icon className="text-3xl" />
    </NavLink>
  );
};
