import { useEffect, useState } from 'react';
import styles from './OrderHistory.module.scss';
import OrderHistoryData from '../../data/orderHistory.json';
import { formatCurrency } from '../../helpers/currencyFunction';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { BsBoxSeam } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

const OrderStatus = [
    { id: 1, name: 'Orders' },
    { id: 2, name: 'Not Yet Shipped' },
    { id: 3, name: 'Cancelled Orders' },
    { id: 4, name: 'Returns' },
]
const filtersByOption = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Past 3 months' },
    { id: 3, name: '2024' },
    { id: 4, name: '2023' }
]

const OrderHistory = () => {

    const [selectedTab, setSelectedTab] = useState(OrderStatus?.[0]?.name);
    const [selectedTabData, setSelectedTabData] = useState(OrderHistoryData.orders)
    const [searchedOrder, setSearchedOrder] = useState('');
    const [dateRangeSelected, setDateRangeSelected] = useState(filtersByOption[0].name)
    const [showFilterModal, setShowFilterModal] = useState(false)

    useEffect(() => {
        if (searchedOrder) {
            setSelectedTabData(OrderHistoryData.orders.filter((order: any) => order.orderId.includes(searchedOrder)))
        } else {
            if (selectedTab == "Orders") {
                setSelectedTabData(OrderHistoryData.orders)
            } else if (selectedTab == "Not Yet Shipped") {
                setSelectedTabData(OrderHistoryData.orders.filter((order: any) => order.status.toLowerCase() == 'processing'))
            } else if (selectedTab == "Cancelled Orders") {
                setSelectedTabData(OrderHistoryData.orders.filter((order: any) => order.status.toLowerCase() == 'cancelled'))
            } else if (selectedTab == "Returns") {
                setSelectedTabData(OrderHistoryData.orders.filter((order: any) => order.status.toLowerCase() == 'returned'))
            }
        }
    }, [selectedTab, searchedOrder])

    function formatDate(dateString: string, status: string) {
        if (dateString) {
            const [day, month, year] = dateString.split('/');
            const date = new Date(`${year}-${month}-${day}`);

            const options = { month: 'long' };
            const monthName = date.toLocaleString('en-US', options);

            return `${monthName}, ${day} ${year}`;
        } else {
            switch (status.toLowerCase()) {
                case 'delivered': {
                    const date = new Date();
                    date.setDate(date.getDate() - 5);

                    const monthName = date.toLocaleString('en-US', { month: 'long' });
                    const day = String(date.getDate()).padStart(2, '0');
                    const year = date.getFullYear();

                    return `${monthName}, ${day} ${year}`;
                }

                case 'processing': {
                    const date = new Date();
                    date.setDate(date.getDate() - 2);

                    const monthName = date.toLocaleString('en-US', { month: 'long' });
                    const day = String(date.getDate()).padStart(2, '0');
                    const year = date.getFullYear();

                    return `${monthName}, ${day} ${year}`;
                }

                default: {
                    const date = new Date();

                    const monthName = date.toLocaleString('en-US', { month: 'long' });
                    const day = String(date.getDate()).padStart(2, '0');
                    const year = date.getFullYear();

                    return `${monthName}, ${day} ${year}`;
                }
            }
        }
    }

    function getSubTitle(status: string) {
        let msg = ''
        switch (status.toLowerCase()) {
            case 'delivered':
                msg = 'Your package was left near the front door '
                break;
            case 'processing':
                msg = 'Package has left the Storely facility'
                break
            case 'returned':
                msg = 'Your refund has been issued to your original payment method.'
                break;
            case 'cancelled':
                msg = 'You requested a cancellation before the item shipped'
                break
            default:
                break
        }
        return msg
    }

    function getOrderIcon(status: string) {
        switch (status.toLowerCase()) {
            case 'delivered':
                return <FaRegCheckCircle size={20} color='green' />
            case 'processing':
                return <FaRegClock size={20} color='blue' />
            case 'returned':
                return <FaUndoAlt size={18} color='orange' />
            case 'cancelled':
                return <ImCancelCircle size={18} color='red' />
            default:
                break
        }
    }

    function getStatusStyles(status: string) {
        switch (status.toLowerCase()) {
            case 'delivered':
                return { background: '#F0FDF4', color: '#22C55E' }
            case 'processing':
                return { background: '#EFF6FF', color: '#2563EB' }
            case 'returned':
                return { background: '#FDF8EE', color: '#F97316' }
            case 'cancelled':
                return { background: '#fadede', color: '#DC2626' }
            default:
                break
        }
    }

    function getDeliverdDate(status: string) {
        switch (status.toLowerCase()) {
            case 'delivered':
                {
                    const date = new Date();
                    date.setDate(date.getDate() - 1);

                    const monthName = date.toLocaleString('en-US', { month: 'short' });
                    const day = String(date.getDate()).padStart(2, '0');

                    return `${monthName}, ${day}`;
                }
            case 'processing':
                return "Arriving tomorrow by 9 PM"
            case 'returned':
                return "Return Completed"
            case 'cancelled':
                return "Cancelled"
            default:
                break
        }
    }

    const clearFilters = () => {
        setSelectedTab(OrderStatus?.[0]?.name)
        setSearchedOrder('')
        setDateRangeSelected(filtersByOption[0].name)
    }

    return (
        <div>
            <div className={styles.headerContainer}>
                <h2>Order History</h2>
                <input
                    type='text'
                    placeholder='Search all orders'
                    onChange={(e) => setSearchedOrder(e.target.value)}
                    value={searchedOrder}
                />
            </div>
            <div className={styles.statusContainer}>
                <div className={styles.statusRow}>
                    {OrderStatus.map((item: any) => {
                        return <p key={item.id} onClick={() => setSelectedTab(item.name)} className={item.name == selectedTab ? styles.selectedTab : styles.tab}>{item.name}</p>
                    })}
                </div>
                <div className={styles.secondRow}>
                    <p className={styles.orders}>{selectedTabData.length} <span>{searchedOrder.length > 0 ? `orders matching "${searchedOrder}"` : 'orders'}</span></p>
                    <p className={styles.filterBy}>Filter by: <button className={styles.filterByBtn} onClick={() => setShowFilterModal(!showFilterModal)}>{dateRangeSelected}{showFilterModal ? < FaAngleUp /> : < FaAngleDown />}</button></p>
                    {showFilterModal && <ul className={styles.filterByModal}>
                        {filtersByOption.map((filter: any) => {
                            return <li key={filter.id} onClick={() => { setDateRangeSelected(filter.name); setShowFilterModal(!showFilterModal) }} style={{ cursor: 'pointer' }}>{filter.name}</li>
                        })}
                    </ul>}
                </div>
            </div>
            {selectedTabData.length == 0 ? <div className={styles.noOrderContainer}>
                <BsBoxSeam size={50} />
                <h2>No orders found</h2>
                <p>We couldn't find any orders matching your current filters.</p>
                <p>Try changing the time period or clearing your search.</p>
                <button onClick={clearFilters}>Clear Filters</button>
            </div>
                : selectedTabData.map((order: any) => {
                    return <div key={order.id} className={styles.orderContainer}>
                        <div className={styles.firstRow}>
                            <div>
                                <div className={styles.row}>
                                    <p>order placed</p>
                                    <p>total</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.rowValues}>{formatDate(order.orderPlaced, order.status)}</p>
                                    <p className={styles.rowValues}>{formatCurrency(order.orderTotal)}</p>
                                </div>
                            </div>
                            <div className={styles.rightSide}>
                                <p>Order # {order.orderId}</p>
                                <div>
                                    <p>Order Details</p>
                                    <p>Invoice</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.secondRow}>
                            <p className={styles.orderHeader}>{getOrderIcon(order.status)} {getDeliverdDate(order.status)} <span style={getStatusStyles(order.status)}>{order.status}</span></p>
                            <p className={styles.subTitle}>{getSubTitle(order.status)}</p>
                            <div className={styles.contentContainer}>
                                <div className={styles.products}>
                                    {order.items.map((item: any) => {
                                        return <div className={styles.productContainer}>
                                            <img src={item.productImg} alt={item.productImg} className={styles.productImg} />
                                            <div>
                                                <p className={styles.productName}>{item.productName}</p>
                                                <p className={styles.qty}>Qty: {item.qty}</p>
                                                <p className={styles.price}>{formatCurrency(item.specialPrice)} <span>{formatCurrency(item.price)}</span></p>
                                            </div>
                                        </div>
                                    })}
                                </div>

                                <div className={styles.btnContainer}>
                                    <button>Return or replace items</button>
                                    <button>Write a product review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
        </div>
    )
}

export default OrderHistory;