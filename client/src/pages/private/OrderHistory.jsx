import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../features/order/orderService";

const OrderHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);
  
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getOrdersByUserId(user._id));
    })();
  }, [dispatch, user._id]);

  return (
    <div className="grow">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <table id="example" className="table-auto w-full text-black">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-400">Order Id</th>
            <th className="px-4 py-2 bg-gray-400">Status</th>
            <th className="px-4 py-2 bg-gray-400">Payment Method</th>
            <th className="px-4 py-2 bg-gray-400">Total Amount</th>
            <th className="px-4 py-2 bg-gray-400">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((item) => (
              <tr className="text-center" key={item._id}>
                <td className="border px-4 py-2">{item._id}</td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">{item.paymentMethod}</td>
                <td className="border px-4 py-2">$320,800</td>
                <td className="border px-4 py-2">
                  {`${item.createdAt.split("T")[0]}, ${
                    item.createdAt.split("T")[1].split(".")[0]
                  }`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
