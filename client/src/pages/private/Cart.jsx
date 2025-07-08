import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/cart/cartService";
import { createOrder } from "../../features/order/orderService";
import { IoBagCheckOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    // Initialize quantities and selections when cart is loaded
    if (cart && cart.length) {
      const initialSelection = {};
      const initialQuantities = {};
      cart.forEach((item) => {
        initialSelection[item._id] = true; // all selected by default
        initialQuantities[item._id] = 1;
      });
      setSelected(initialSelection);
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: Math.max(1, Number(value)),
    });
  };

  const handleSelectChange = (id) => {
    setSelected({
      ...selected,
      [id]: !selected[id],
    });
  };

  const handleCheckout = async() => {
   try {
     const selectedItems = cart
      .filter((item) => selected[item._id])
      .map((item) => ({
        ...item,
        quantity: quantities[item._id] || 1,
      }));

    if (selectedItems.length === 0) {
      toast.error("Please select at least one item to checkout.");
      return;
    }
    if(!user.address){
      toast.error("Please add an address to checkout.");
      return;
    }
   await dispatch(
      createOrder({
        orderItems: selectedItems,
        shippingAddress: user.address,
      })
    ).unwrap();
    toast.success("Order placed successfully!");
    
   } catch (error) {
    console.log(error);
    toast.error("Failed to place order!");
   }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      if (selected[item._id]) {
        const qty = quantities[item._id] || 1;
        return total + item.price * qty;
      }
      return total;
    }, 0);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 m-2">
        {cart &&
          cart.map((book) => (
            <div className="m-2 shadow-lg p-4" key={book._id}>
              <h3 className="font-bold text-center truncate overflow-hidden whitespace-nowrap">
                {book.name}
              </h3>
              <img
                className="m-auto w-40 h-60"
                src={book.image}
                alt={book.name}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm">by {book.author}</p>
                <p className="font-bold">${book.price}</p>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!selected[book._id]}
                  onChange={() => handleSelectChange(book._id)}
                />
                <label>Select</label>
              </div>

              <div className="mt-2">
                <label>Quantity: </label>
                <input
                  type="number"
                  min="1"
                  className="border px-2 py-1 w-16"
                  value={quantities[book._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(book._id, e.target.value)
                  }
                />
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-col my-10 bg-gray-100 p-10">
        <h1 className="text-end font-bold text-xl">
          Total: ${calculateTotal().toFixed(2)}
        </h1>
        <button
          className="flex items-center gap-4 text-lg font-bold bg-red-400 max-w-80 rounded-2xl px-20 py-2 cursor-pointer self-center hover:bg-red-600"
          onClick={handleCheckout}
        >
          Checkout <IoBagCheckOutline />
        </button>
      </div>
    </div>
  );
};

export default Cart;