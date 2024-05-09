    import { Link } from "react-router-dom";
    import "./home.css";
    import Chart from "../../components/chart/Chart";
    import PublishIcon from '@mui/icons-material/Publish';
    import { useLocation } from 'react-router-dom';
    import { useSelector } from 'react-redux';
    import { useEffect, useMemo, useState } from "react";
    import { userRequest } from "../../requestmethods";

    export default function Product() {
        const location = useLocation();
        const productId = location.pathname.split("/")[2];
        const products = useSelector((state) => state.products);
        const product = products ? products.find(product => product._id === productId) : null;
        // Add null check for products before calling find

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

        // useEffect(() => {
        //     const getStats = async () => {
        //         try {
        //             console.log("userRequest:", userRequest); // Log userRequest to check its value
        //             // const res = await userRequest.get(`/orders/income?pid=${productId}`);
        //             console.log("Response:", res); // Log response to check its content
        //             const list = res.data.sort((a, b) => a._id - b._id);
        //             setPStats(list.map(item => ({
        //                 name: MONTHS[item._id - 1],
        //                 Sales: item.total
        //             })));
        //         } catch (err) {
        //             console.log(err);
        //         }
        //     };
        //     getStats();
        // }, [productId, MONTHS]);
        

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
                                <span className="productInfoValue"></span>
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
                            <input type="text" placeholder={product?.title} />
                            <label>Product description</label>
                            <input type="text" placeholder={product?.desc} />
                            <label>Price</label>
                            <input type="text" placeholder={product?.price} />
                            <label>In Stock</label>
                            <select name="inStock" id="inStock">
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                            <label>Active</label>
                            <select name="active" id="active">
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
