import React, { useState, useEffect } from 'react';

const InvoiceSum = () => {
    const [sumByDay, setSumByDay] = useState([]);
    const [sumByMonth, setSumByMonth] = useState([]);
    const [sumByYear, setSumByYear] = useState([]);
    const [totalAllTime, setTotalAllTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/invoice/invoices/sum');
                const data = await response.json();
                setSumByDay(data.sumByDay);
                setSumByMonth(data.sumByMonth);
                setSumByYear(data.sumByYear);
                setTotalAllTime(data.totalAllTime);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Invoice Sum</h2>

            <div>
                <h3>Sum by Day</h3>
                <ul>
                    {sumByDay.map((item) => (
                        <li key={item.day}>
                            {item.day}: {item.total}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Sum by Month</h3>
                <ul>
                    {sumByMonth.map((item) => (
                        <li key={item.month}>
                            Month {item.month}: {item.total}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Sum by Year</h3>
                <ul>
                    {sumByYear.map((item) => (
                        <li key={item.year}>
                            Year {item.year}: {item.total}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Total All Time</h3>
                <p>{totalAllTime}</p>
            </div>
        </div>
    );
};

export default InvoiceSum;
