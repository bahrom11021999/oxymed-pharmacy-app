/* eslint-disable no-case-declarations */
import { createContext, useCallback, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  cartLength: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        const updatedCart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });

        return {
          ...state,
          cart: updatedCart,
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
        cartLength: state.cartLength + 1,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        cartLength: state.cartLength - 1,
      };
    case "INCREASE_QUANTITY":
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      return {
        ...state,
        cart: updatedCart,
      };
    case "DECREASE_QUANTITY":
      const updatedCartRemove = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });

      if (updatedCartRemove.some((item) => item.quantity === 0)) {
        return {
          ...state,
          cart: updatedCartRemove.filter((item) => item.quantity !== 0),
          cartLength: state.cartLength - 1,
        };
      }

      return {
        ...state,
        cart: updatedCartRemove,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        cartLength: 0,
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [{ cart, cartLength }, dispatch] = useReducer(reducer, initialState);

  const addToCart = useCallback(
    (item) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: 1,
        },
      });
    },
    [dispatch],
  );

  const removeFromCart = useCallback(
    (item) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
    },
    [dispatch],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  const increaseQuantity = useCallback(
    (id) => {
      dispatch({ type: "INCREASE_QUANTITY", payload: id });
    },
    [dispatch],
  );

  const decreaseQuantity = useCallback(
    (id) => {
      dispatch({ type: "DECREASE_QUANTITY", payload: id });
    },
    [dispatch],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartLength,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export { CartProvider, useCart };
