import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'; // Changed import to 'react-router-dom'
import { useRequest } from "../requestMethods";

const Success = () => {
    const location = useLocation();
    const data = location.state?.stripeData; // Added null check using optional chaining
    const cart = location.state?.products; // Updated to access 'products' from location state
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await useRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart.map((item) => ({ // Updated to access 'cart' directly
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    amount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0), // Calculate total amount
                    address: data.billing_details?.address // Added null check using optional chaining
                });
                setOrderId(res.data._id);
            } catch (error) {
                console.error("Error creating order:", error); // Added error logging
            }
        };

        if (data && cart) {
            createOrder();
        }
    }, [cart, data, currentUser]);
    const navigate= useNavigate()

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <button style={{ padding: 10, marginTop: 20 }} onClick={() => navigate('/')}>Go to Homepage</button>
        </div>
    );
};

export default Success;
