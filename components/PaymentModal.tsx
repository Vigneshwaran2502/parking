import React, { useState } from 'react';
import { X, CreditCard, Smartphone, CheckCircle, SmartphoneNfc, ScanLine } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onPaymentComplete: (method: 'UPI' | 'CARD') => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onClose, onPaymentComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);

    try {
      // 1. Create Order on Backend
      const response = await fetch('http://localhost:5000/api/payment/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount, currency: 'INR' })
      });

      if (!response.ok) throw new Error('Failed to create order');
      const order = await response.json();

      // 2. Initialize Razorpay
      const options = {
        key: "rzp_test_Rv8cTIJoSHbhQM", // Client-side key
        amount: order.amount,
        currency: order.currency,
        name: "ParkWise Green",
        description: "Parking Slot Booking",
        order_id: order.id,
        handler: function (response: any) {
          console.log("Payment Successful", response);
          setIsProcessing(false);
          setIsSuccess(true);
          setTimeout(() => {
            onPaymentComplete('UPI'); // Defaulting to UPI as generic success
          }, 1500);
        },
        prefill: {
          name: "Demo User",
          email: "demo@parkwise.com",
          contact: "9999999999"
        },
        theme: {
          color: "#10B981"
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert(response.error.description);
        setIsProcessing(false);
      });
      rzp1.open();

    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      alert("Payment initiation failed. Ensure backend is running.");
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md">
        <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Payment Successful!</h2>
          <p className="text-slate-500 font-medium">Your parking slot has been confirmed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl border border-slate-100">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Secure Payment</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Powered by Razorpay</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white text-center shadow-lg shadow-slate-200">
            <p className="text-xs opacity-70 uppercase font-black tracking-widest mb-2">Total Amount</p>
            <div className="text-4xl font-black flex items-center justify-center">
              <span className="text-2xl mr-1">₹</span>
              {amount}
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-slate-500">
              Click below to verify payment via UPI, Cards, or Netbanking.
              <br />
              <span className="text-xs opacity-70">Scan QR in the next step for instant UPI pay.</span>
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-50">
          <button
            disabled={isProcessing}
            onClick={handleRazorpayPayment}
            className={`w-full py-4 text-white rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center space-x-2 ${isProcessing ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}`}
          >
            {isProcessing ? (
              <>
                <SmartphoneNfc className="w-5 h-5 animate-pulse" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <ScanLine className="w-5 h-5" />
                <span>Pay Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
