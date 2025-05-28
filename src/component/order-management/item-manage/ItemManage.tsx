import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../../../services/itemManageServices";
import { getAllTypes } from "../../../services/itemTypeServices";
import type { item, itemType } from "../../../types/types";

const ItemManage = () => {
  const [items, setItems] = useState<item[]>([]);
  const [itemTypes, setItemTypes] = useState<itemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<item, "id">>({
    type: "",
    price: 0,
    imgUrl: "",
    quantity: 0,
    ingredients: [],
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "price" || name === "quantity") {
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else if (name === "ingredients") {
      setFormData({
        ...formData,
        ingredients: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const resetForm = () => {
    setFormData({
      type: "",
      price: 0,
      imgUrl: "",
      quantity: 0,
      ingredients: [],
      description: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setIsEditing(false);
    setCurrentItemId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && currentItemId) {
        await updateItem(currentItemId, formData);
        toast.success("Item updated successfully");
      } else {
        await createItem(formData);
        toast.success("Item created successfully");
      }
      fetchItems();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(
        isEditing ? "Failed to update item" : "Failed to create item"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = (item: item) => {
    setIsEditing(true);
    setCurrentItemId(item.id);
    setFormData({
      type: item.type,
      price: item.price,
      imgUrl: item.imgUrl,
      quantity: item.quantity,
      ingredients: item.ingredients,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: new Date(),
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setIsLoading(true);
      try {
        await deleteItem(id);
        toast.success("Item deleted successfully");
        fetchItems();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete item");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Item Management</h1>

      {/* Item Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Item" : "Add New Item"}
        </h2>

        <form onSubmit={handleSubmit}>
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Item Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              >
                <option value="">Select Item Type</option>
                {itemTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                type="text"
                name="imgUrl"
                value={formData.imgUrl}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Ingredients (comma-separated)
              </label>
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients.join(", ")}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              rows={3}
            ></textarea>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              {isLoading
                ? "Processing..."
                : isEditing
                ? "Update Item"
                : "Add Item"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Items List</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 mb-4">{error}</div>
        )}

        {isLoading && !items.length ? (
          <div className="p-6 text-center">Loading items...</div>
        ) : !items.length ? (
          <div className="p-6 text-center text-gray-500">No items found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {" "}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => {
                  const itemType = itemTypes.find(
                    (type) => type.id === item.type
                  );

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={item.imgUrl}
                          alt="Item"
                          className="h-16 w-16 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/150";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {itemType?.name || item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemManage;
