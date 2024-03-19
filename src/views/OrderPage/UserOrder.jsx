import { useState, useEffect } from "react"
import ClipLoader from "react-spinners/PulseLoader";
import httpClient from "../../components/HttpsClient"
import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import { CiCalendarDate } from "react-icons/ci";

export default function UserOrder() {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])

    const [date, setDate] = useState(new Date());
    const [orderID, setOrderID] = useState()
    const [paymentMethod, setPaymentMethod] = useState("")
    const [status, setStatus] = useState("")

    const onSubmit = async(e) => {
        e.preventDefault()
        let data = {
            date, orderID, 
            paymentMethod, status
        }
        console.log(data)
    } 

    useEffect(() => {
        fetchOrder()
    },[])

    const fetchOrder = async() => {
        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        let url = backend_url + "/api/getuserorder"

        await httpClient.get(url).then(response => {
            setOrders(response.data["orders"])
        })
        .catch(error => {
            alert(error.response.data.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }
    

    return (
        <section className="user-order-section">
            <div><h1>My Orders</h1></div>
            <form className="user-order-filter" onSubmit={onSubmit}>
                <div>
                    <input placeholder="Transaction ID" type="text"
                    value={orderID}
                    onChange={(e) => setOrderID(e.target.value)} />
                </div>
                <div>
                    <CiCalendarDate id="date-picker-icon"/>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} id="date-picker"/>
                </div>
                <div>
                    <select onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="">Payment Method</option>
                        <option value="crebit">Credit or Debit Card</option>
                        <option value="cash">Cash on Delivery</option>
                    </select>
                </div>
                <div>
                    <select  onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Status</option>
                        <option value="transit">Transit</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
                <button type="submit">Filter</button>
            </form>
            <div className="user-order-container">
                {loading ? (
                    <section className='loader--section'>
                        <ClipLoader margin={10} size={20} color={"#E55F34"} loading={loading} speedMultiplier={1}/>
                    </section>
                ):(
                    <div className="user-order-content">
                        <Table>
                            <thead className="thead-order">
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Transaction Date</th>
                                    <th>Payment Method</th>
                                    <th>Total Cost</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="tbody-order">
                                {orders.map(order => (
                                    <tr key={order["user_order_id"]}>
                                        <td>{order["user_order_id"]}</td>
                                        <td>{order["order_created"]}</td>
                                        { order["payment_method"] === "crebit" ? (
                                            <td>Credit or Debit Card</td>
                                        ):(
                                            <td>Cash on Delivery</td>
                                        )}
                                        <td>${order["order_total_cost"]}.00</td>
                                        <td>transit</td>
                                        <td>
                                            <button>View Detail</button>
                                        </td>
                                    </tr>
                                ))} 
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </section>
    )
}