import React, { useState } from 'react';
import './styles.css';

function WithdrawalSystem() {
  const [balance, setBalance] = useState(10000);
  const [history, setHistory] = useState([
  ]);
  const [customAmount, setCustomAmount] = useState('');

  const handleWithdraw = (amount) => {
    if (amount > 0 && amount <= balance) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      setHistory([{ amount, remaining: newBalance }, ...history]);
    } else {
      alert('จำนวนเงินที่ถอนไม่ถูกต้อง');
    }
  };

  const handleCustomWithdraw = () => {
    const amount = parseInt(customAmount, 10);
    if (!isNaN(amount)) {
      handleWithdraw(amount);
      setCustomAmount('');
    } else {
      alert('ไม่สามารถถอนเงินเกินจํานวนที่มีอยู่ในบัญชีได้');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg flex space-x-6 ">
        
        {/* Withdrawal System Panel */}
        <div className="w-2/3">
          <h2 className="text-xl font-semibold mb-4">ระบบถอนเงิน</h2>
          <p className="mb-4">ยอดเงินคงเหลือ: {balance} บาท</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[100, 500, 1000, 5000].map((amount) => (
              <button
                key={amount}
                className={`p-2 rounded text-white ${amount <= 1000 ? 'bg-green-500' : 'bg-green-700'}`}
                onClick={() => handleWithdraw(amount)}
              >
                ถอน {amount} บาท
              </button>
            ))}
          </div>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="จำนวนเงินที่ต้องการถอน"
            className="border border-gray-300 p-2 w-full rounded mb-4"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded w-full"
            onClick={handleCustomWithdraw}
          >
            ถอนเงิน
          </button>
        </div>

        {/* Withdrawal History Panel */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">ประวัติการถอนเงิน</h2>
          <ul className="space-y-2">
            {history.map((entry, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>ถอน: {entry.amount} บาท</span>
                <span>คงเหลือ: {entry.remaining} บาท</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalSystem;
