import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../../features/order/orderService";

const Orders = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = (e) => {
    const { value, id } = e.target;
    const payload = { id, data: { status: value } };
    dispatch(updateOrder(payload));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Orders Management
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold uppercase">Order ID</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">User</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Status</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Payment</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Total</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders?.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.user?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    onChange={handleStatusChange}
                    value={item.status}
                    id={item._id}
                    className="border rounded px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Out for delivery">Out for Delivery</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${item.totalAmount || "320,800"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.createdAt?.split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
