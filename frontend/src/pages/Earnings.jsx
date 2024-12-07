import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Earnings = (props) => {
    const [dailyEarnings, setDailyEarnings] = useState(0);
    const [weeklyEarnings, setWeeklyEarnings] = useState([0, 0, 0, 0, 0, 0, 0]); // Store earnings for a week

    // Accumulate earnings
    const addEarnings = (fare) => {
        setDailyEarnings((prev) => prev + fare);
    };

    // Simulate weekly earnings and reset after a week
    useEffect(() => {
        const currentDay = new Date().getDay(); // Get current day (0=Sunday, 1=Monday, etc.)
        let updatedEarnings = [...weeklyEarnings];
        updatedEarnings[currentDay] = dailyEarnings; // Update today's earnings in the array

        setWeeklyEarnings(updatedEarnings);

        // Reset daily earnings after updating
        setDailyEarnings(0);
    }, [dailyEarnings]);

    // Chart data for the week
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Weekly Earnings (₹)',
                data: weeklyEarnings,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Earnings</h2>
                <Link to="/dashboard" className="text-xl text-gray-800 hover:text-blue-800 ml-auto">
                    <FaTachometerAlt className="inline-block mr-2" />
                </Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Earnings Chart</h3>
                <Line data={data} />
            </div>
        </div>
    );
};

export default Earnings;
