import { createContext, useState, useContext, ReactNode } from "react";
import type { item } from "../types/types";
import { toast } from "react-toastify";

interface Ingredient {
  name: string;
  quantity: string;
}

interface CartItem {
  item: item;
  quantity: number;
  selectedIngredients: Ingredient[];
  totalPrice: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    item: item,
    quantity: number,
    selectedIngredients: Ingredient[]
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
   
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (
    item: item,
    quantity: number,
    selectedIngredients: Ingredient[]
  ) => {
    if (item.quantity === 0) {
      toast.error(`${item.name} is out of stock`);
      return;
    }

    const existingItem = cartItems.find(
      (cartItem) => cartItem.item.id === item.id
    );

    if (existingItem) {
   
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.item.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + quantity,
              selectedIngredients,
              totalPrice: (cartItem.quantity + quantity) * item.price,
            }
          : cartItem
      );
      setCartItems(updatedItems);
      saveCart(updatedItems);
      toast.success(`${item.name} quantity updated in cart`);
    } else {
  
      const newItem: CartItem = {
        item,
        quantity,
        selectedIngredients,
        totalPrice: quantity * item.price,
      };
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      saveCart(updatedItems);
      toast.success(`${item.name} added to cart`);
    }
  };

  const removeFromCart = (itemId: string) => {
    const updatedItems = cartItems.filter(
      (cartItem) => cartItem.item.id !== itemId
    );
    setCartItems(updatedItems);
    saveCart(updatedItems);
    toast.info("Item removed from cart");
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedItems = cartItems.map((cartItem) =>
      cartItem.item.id === itemId
        ? {
            ...cartItem,
            quantity,
            totalPrice: quantity * cartItem.item.price,
          }
        : cartItem
    );
    setCartItems(updatedItems);
    saveCart(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
    toast.info("Cart cleared");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
