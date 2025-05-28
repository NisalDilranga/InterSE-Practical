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
   
    if (!item || typeof item !== "object") {
      toast.error(`Invalid item data`);
      return;
    }

    if (item.quantity === 0) {
      toast.error(`${item.name || "Item"} is out of stock`);
      return;
    }

    const existingItem = cartItems.find(
      (cartItem) => cartItem?.item?.id === item.id
    );
    if (existingItem) {
   
      const updatedItems = cartItems.map((cartItem) => {
        if (cartItem?.item?.id === item.id) {
          const updatedQuantity = (cartItem.quantity || 0) + quantity;
          return {
            ...cartItem,
            quantity: updatedQuantity,
            selectedIngredients,
            totalPrice: updatedQuantity * (item.price || 0),
          };
        }
        return cartItem;
      });
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
    if (!itemId || itemId.trim() === "") {
      console.warn("Invalid item ID provided to removeFromCart");
      return;
    }

    const updatedItems = cartItems.filter(
      (cartItem) => cartItem?.item?.id !== itemId
    );
    setCartItems(updatedItems);
    saveCart(updatedItems);
    toast.info("Item removed from cart");
  };
  const updateQuantity = (itemId: string, quantity: number) => {
    if (!itemId || itemId.trim() === "") {
      console.warn("Invalid item ID provided to updateQuantity");
      return;
    }

    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem?.item?.id === itemId) {
        return {
          ...cartItem,
          quantity,
          totalPrice: quantity * (cartItem?.item?.price || 0),
        };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
    saveCart(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
    toast.info("Cart cleared");
  };
  const getTotalPrice = () => {
    if (!cartItems || !Array.isArray(cartItems)) {
      return 0;
    }
    return cartItems.reduce(
      (total, item) => total + (item?.totalPrice || 0),
      0
    );
  };

  const getTotalItems = () => {
    if (!cartItems || !Array.isArray(cartItems)) {
      return 0;
    }
    return cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);
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
