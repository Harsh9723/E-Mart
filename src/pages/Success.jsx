import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequest } from "../requestMethods";

const Success = () => {
    const location = useLocation();
    const data = location.state?.stripeData;
    const cart = location.state?.products;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await useRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    amount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
                    address: data.billing_details?.address
                });
                setOrderId(res.data._id);
            } catch (error) {
                setError(error.message || 'An error occurred while creating order.');
            } finally {
                setLoading(false);
            }
        };

        if (data && cart) {
            createOrder();
        }
    }, [cart, data, currentUser]);

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* {loading && <div>Loading...</div>} */}
            {!loading && orderId && <div>Order has been created successfully. Your order number is {orderId}</div>}
            {!loading && !orderId && <div>Success. Your order is being prepared...</div>}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            <button style={{ padding: 10, marginTop: 20 }} onClick={() => history('/')}>Go to Homepage</button>
        </div>
    );
};

export default Success;
