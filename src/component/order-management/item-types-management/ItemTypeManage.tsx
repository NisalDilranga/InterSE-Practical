import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import {
  createTypes,
  deleteTypes,
  getAllTypes,
} from "../../../services/itemTypeServices";
import type { itemType } from "../../../types/types";

const ItemTypeManage = () => {
  const [itemTypes, setItemTypes] = useState<itemType[]>([]);
  const [newItemType, setNewItemType] = useState("");
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    fetchItemTypes();
  }, []);

  const fetchItemTypes = async () => {
    setLoading(true);
    try {
      const types = await getAllTypes();
      setItemTypes(types);
    } catch (error) {
      toast.error("Failed to load item types");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItemType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemType.trim()) {
      toast.error("Item type name cannot be empty");
      return;
    }

    setAddLoading(true);
    try {
      const now = new Date();
      await createTypes({
        name: newItemType,
        createdAt: now,
        updatedAt: now,
      });
      toast.success("Item type added successfully");
      setNewItemType("");
      fetchItemTypes();
    } catch (error) {
      toast.error("Failed to add item type");
      console.error(error);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteItemType = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item type?")) {
      try {
        await deleteTypes(id);
        toast.success("Item type deleted successfully");
        fetchItemTypes();
      } catch (error) {
        toast.error("Failed to delete item type");
        console.error(error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Item Types Management</h1>

      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Item Type</h2>
        <form onSubmit={handleAddItemType} className="flex gap-2">
          <input
            type="text"
            value={newItemType}
            onChange={(e) => setNewItemType(e.target.value)}
            placeholder="Enter item type name"
            className="flex-1 p-2 border rounded"
            disabled={addLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={addLoading}
          >
            {addLoading ? "Adding..." : "Add Type"}
          </button>
        </form>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Item Types List</h2>
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : itemTypes.length === 0 ? (
          <p className="text-center py-4">No item types found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {itemTypes.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => handleDeleteItemType(item.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemTypeManage;
