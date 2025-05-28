import { useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import HomeNav from "../home/HomeNav";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderManageServices";
import { updateItem } from "../../services/itemManageServices";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };
  const handlePlaceOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessingOrder(true);

    try {
      for (const cartItem of cartItems) {
        if (!cartItem?.item?.id) {
          console.warn("Skipping invalid cart item", cartItem);
          continue;
        }

        const orderData = {
          userId: "customer",
          itemId: cartItem.item.id,
          quantity: cartItem.quantity || 1,
          ingredients: cartItem.selectedIngredients || [],
          price: cartItem.item?.price || 0,
          totalPrice: cartItem.totalPrice || 0,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await createOrder(orderData);

      
        if (
          cartItem?.item?.id &&
          typeof cartItem?.item?.quantity === "number" &&
          typeof cartItem?.quantity === "number"
        ) {
          const newQuantity = Math.max(
            0,
            cartItem.item.quantity - cartItem.quantity
          );
          await updateItem(cartItem.item.id, { quantity: newQuantity });
        }
      }

      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    } finally {
      setIsProcessingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeNav />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <a
              href="/home"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded inline-block"
            >
              Browse Menu
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingredients
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {" "}
                    {cartItems.map((cartItem) => (
                      <tr
                        key={cartItem?.item?.id || `item-${Math.random()}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0">
                              <img
                                className="h-12 w-12 rounded-md object-cover"
                                src={
                                  cartItem?.item?.imgUrl ||
                                  "https://via.placeholder.com/100?text=No+Image"
                                }
                                alt={cartItem?.item?.name || "Item"}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/100?text=No+Image";
                                }}
                              />{" "}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {cartItem?.item?.name || "Unknown Item"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {cartItem?.item?.description
                                  ? `${cartItem.item.description.substring(
                                      0,
                                      30
                                    )}${
                                      cartItem.item.description.length > 30
                                        ? "..."
                                        : ""
                                    }`
                                  : "No description available"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-h-20 overflow-y-auto">
                            {cartItem?.selectedIngredients?.length > 0 ? (
                              <ul className="list-disc pl-4">
                                {cartItem.selectedIngredients.map(
                                  (ingredient, index) => (
                                    <li key={index} className="text-xs">
                                      {ingredient?.name || "Unknown ingredient"}
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <span className="text-xs text-gray-500">
                                No special ingredients
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${(cartItem?.item?.price || 0).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {" "}
                            <button
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() =>
                                handleQuantityChange(
                                  cartItem?.item?.id || "",
                                  (cartItem?.quantity || 1) - 1
                                )
                              }
                            >
                              <FaMinus className="h-4 w-4" />
                            </button>
                            <span className="mx-2 text-sm">
                              {cartItem?.quantity || 0}
                            </span>
                            <button
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() =>
                                handleQuantityChange(
                                  cartItem?.item?.id || "",
                                  (cartItem?.quantity || 1) + 1
                                )
                              }
                            >
                              <FaPlus className="h-4 w-4" />
                            </button>
                          </div>
                        </td>{" "}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${(cartItem?.totalPrice || 0).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() =>
                              removeFromCart(cartItem?.item?.id || "")
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      ${(getTotalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">
                      ${(getTotalPrice() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={cartItems.length === 0 || isProcessingOrder}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded disabled:opacity-50"
                  >
                    {isProcessingOrder ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                  <button
                    onClick={clearCart}
                    disabled={cartItems.length === 0 || isProcessingOrder}
                    className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
