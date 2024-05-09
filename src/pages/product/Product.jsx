import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import PublishIcon from '@mui/icons-material/Publish';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestmethods";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    const products = useSelector((state) => state.products);
    const product = products ? products.find(product => product._id === productId) : null;
    const [pStats, setPStats] = useState([]);
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get('/orders/income?pid=' + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id;
                });
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        price: "",
        inStock: false,
        active: "yes"
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                desc: product.desc,
                price: product.price,
                inStock: product.inStock,
                active: product.active
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={product?.img}
                            alt={product?.title}
                        />
                        <span className="productName">{product?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product?._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product?.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        <label>Product description</label>
                        <input type="text" name="desc" value={formData.desc} onChange={handleChange} />
                        <label>Price</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange} />
                        <label>In Stock</label>
                        <select name="inStock" value={formData.inStock} onChange={handleChange}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" value={formData.active} onChange={handleChange}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product?.img} alt={product?.title} />
                            <label htmlFor="file">
                                <PublishIcon />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
