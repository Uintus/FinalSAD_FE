import { useState, type ChangeEvent, type FormEvent } from "react";
import { LayoutWithHeader } from "../../common/layout/LayoutWithHeader";
import type { OrderForm, OrderItem } from "../../constant/fakeOrder";
import { ORDER_STATUS } from "../../constant/dashboard";
import { TbTrash } from "react-icons/tb";
import { Button } from "@mui/material";
import type { ProductResponse } from "../../constant/product";
import { useGetAllProductsQuery } from "../../services/api/productApi";
import { useCreateOrderMutation } from "../../services/api/orderApi";
import { toast } from "sonner";

/**
 * The fake order page component
 */
const FakeOrder = () => {
  /**
   * The product data
   */
  const { data: { data: productData } = {} } = useGetAllProductsQuery();

  /**
   * The create order mutation
   */
  const [createOrder] = useCreateOrderMutation();

  /**
   * The order form data
   */
  const [form, setForm] = useState<OrderForm>({
    customer_name: "",
    status: ORDER_STATUS.PENDING,
    created_at: "",
    items: [{ product_id: "", quantity: 0 }],
  });

  console.log("form", form);

  /**
   * Handle changes to the form
   * @param e the change event
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle changes to individual items
   * @param index the index of the item
   * @param field the field to update
   * @param value the new value
   */
  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const newItems = [...form.items];
    newItems[index][field] = value as never;
    setForm((prev) => ({ ...prev, items: newItems }));
  };

  /**
   * Add an item to the order
   */
  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { product_id: "", quantity: 0 }],
    }));
  };

  /**
   * Remove an item from the order
   * @param index the index of the item
   */
  const removeItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  /**
   * Resets the form to its initial state
   */
  const resetForm = () => {
    setForm({
      customer_name: "",
      status: ORDER_STATUS.PENDING,
      created_at: "",
      items: [{ product_id: "", quantity: 0 }],
    });
  };

  /**
   * Handle submitting the form
   * @param e the form event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!form.customer_name.trim()) {
      alert("Please enter customer name");
      return;
    }

    if (!form.status) {
      alert("Please select order status");
      return;
    }

    if (!form.created_at.trim()) {
      alert("Please select created date");
      return;
    }

    for (const [i, item] of form.items.entries()) {
      if (!item.product_id || Number(item.quantity) <= 0) {
        alert(`Item ${i + 1} is missing product or quantity`);
        return;
      }
    }

    try {
      const payload = {
        ...form,
        created_at:
          form.created_at ||
          new Date().toISOString().slice(0, 19).replace("T", " "),
        items: form.items.map((item) => ({
          product_id: Number(item.product_id),
          quantity: Number(item.quantity),
        })),
      };

      await createOrder(payload).unwrap();
      resetForm();
      toast.success("Order created successfully!");
    } catch (err) {
      toast.error("Failed to create order.");
      console.error("❌ Error creating order:", err);
    }
  };

  return (
    <LayoutWithHeader headerText="Fake an order here!">
      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 mt-[40px]"
      >
        {/* Name */}
        <div>
          <label className="block font-medium">Customer Name</label>
          <input
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
          >
            <option value={ORDER_STATUS.PENDING}>Pending</option>
            <option value={ORDER_STATUS.COMPLETED}>Completed</option>
            <option value={ORDER_STATUS.CANCELLED}>Cancelled</option>
          </select>
        </div>

        {/* Created At */}
        <div>
          <label className="block font-medium">Created At</label>
          <input
            name="created_at"
            type="datetime-local"
            value={form.created_at}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
          />
        </div>

        {/* Items */}
        <div>
          <label className="block font-medium">Items</label>
          {form.items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <select
                value={item.product_id}
                onChange={(e) =>
                  handleItemChange(index, "product_id", Number(e.target.value))
                }
                className="w-full border rounded px-3 py-1"
              >
                <option value="">-- Select Product --</option>
                {((productData as ProductResponse[]) || []).map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                className="flex-1 border rounded px-2 py-1"
                required
              />
              {form.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 text-lg px-2 hover:text-red-700 cursor-pointer"
                  title="Remove item"
                >
                  <TbTrash />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="text-sm text-blue-600 cursor-pointer mt-2"
          >
            + Add item
          </button>
        </div>

        <div className="w-full flex justify-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--main-color)",
              color: "var(--light-color)",
              height: "45px",
              width: "180px",
              textTransform: "none",
              fontSize: "16px",
            }}
            type="submit"
          >
            Create Order
          </Button>
        </div>
      </form>
    </LayoutWithHeader>
  );
};

export default FakeOrder;
