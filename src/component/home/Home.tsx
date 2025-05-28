import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import HomeNav from "./HomeNav";
import { getAllItems } from "../../services/itemManageServices";
import { getAllTypes } from "../../services/itemTypeServices";
import type { item, itemType } from "../../types/types";
import { useCart } from "../../context/CartContext";

// Define Ingredient interface locally to avoid import issues
interface Ingredient {
  name: string;
  quantity: string;
}

const Home = () => {
  const [items, setItems] = useState<item[]>([]);
  const [itemTypes, setItemTypes] = useState<itemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const { addToCart } = useCart();

  useEffect(() => {
    fetchItems();
    fetchItemTypes();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch items");
      console.error(err);
      toast.error("Failed to load items");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchItemTypes = async () => {
    try {
      const data = await getAllTypes();
      setItemTypes(data);
    } catch (err) {
      console.error("Failed to fetch item types:", err);
      toast.error("Failed to load item types");
    }
  };

  const filteredItems =
    selectedType === "all"
      ? items
      : items.filter((item) => item.type === selectedType);

  const handleAddToCart = () => {
    if (!selectedItem) return;

    addToCart(selectedItem, quantity, selectedIngredients);
    setSelectedItem(null);
    setQuantity(1);
    setSelectedIngredients([]);
  };

  const handleIngredientToggle = (ingredient: Ingredient) => {
    // Check if ingredient is already selected
    const isSelected = selectedIngredients.some(
      (item) => item.name === ingredient.name
    );

    if (isSelected) {
      // Remove if already selected
      setSelectedIngredients(
        selectedIngredients.filter((item) => item.name !== ingredient.name)
      );
    } else {
      // Add if not selected
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const isIngredientDisabled = (ingredient: Ingredient) => {
    // Check if ingredient quantity is 0
    return ingredient.quantity === "0";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeNav />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>

        {/* Type Filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                selectedType === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              All
            </button>

            {itemTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  type.id === itemTypes[itemTypes.length - 1].id
                    ? "rounded-r-lg"
                    : ""
                } ${
                  selectedType === type.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No items found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const itemType = itemTypes.find((type) => type.id === item.type);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/300?text=No+Image";
                      }}
                    />
                    {item.quantity === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                      {itemType?.name || "Unknown Type"}
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                    <p className="text-gray-700 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-blue-600 font-bold text-lg mb-4">
                      ${item.price.toFixed(2)}
                    </p>

                    <button
                      onClick={() => setSelectedItem(item)}
                      disabled={item.quantity === 0}
                      className={`w-full py-2 px-4 rounded flex items-center justify-center ${
                        item.quantity === 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <FaShoppingCart className="mr-2" />
                      {item.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for item selection and ingredient choices */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setSelectedItem(null);
                    setQuantity(1);
                    setSelectedIngredients([]);
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/2">
                  <img
                    src={selectedItem.imgUrl}
                    alt={selectedItem.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300?text=No+Image";
                    }}
                  />
                </div>

                <div className="md:w-1/2">
                  <p className="text-gray-700 mb-2">
                    {selectedItem.description}
                  </p>
                  <p className="text-blue-600 font-bold text-xl mb-4">
                    ${selectedItem.price.toFixed(2)}
                  </p>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Quantity:
                    </label>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 rounded-l px-3 py-1 hover:bg-gray-300"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      <span className="bg-white px-4 py-1 border-t border-b">
                        {quantity}
                      </span>
                      <button
                        className="bg-gray-200 rounded-r px-3 py-1 hover:bg-gray-300"
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {selectedItem.ingredients &&
                selectedItem.ingredients.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedItem.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className={`
                          flex items-center p-2 border rounded
                          ${
                            isIngredientDisabled(ingredient)
                              ? "bg-gray-100 opacity-50"
                              : "hover:bg-gray-50 cursor-pointer"
                          }
                          ${
                            selectedIngredients.some(
                              (item) => item.name === ingredient.name
                            )
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200"
                          }
                        `}
                          onClick={() => {
                            if (!isIngredientDisabled(ingredient)) {
                              handleIngredientToggle(ingredient);
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedIngredients.some(
                              (item) => item.name === ingredient.name
                            )}
                            disabled={isIngredientDisabled(ingredient)}
                            onChange={() => {}}
                            className="mr-2"
                          />
                          <label className="flex-1 cursor-pointer">
                            {ingredient.name}
                            {isIngredientDisabled(ingredient) && (
                              <span className="text-red-500 text-xs ml-1">
                                (Unavailable)
                              </span>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex justify-between items-center">
                <div className="text-xl font-bold">
                  Total: ${(selectedItem.price * quantity).toFixed(2)}
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
