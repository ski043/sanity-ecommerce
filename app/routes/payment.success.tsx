import { Link } from "@remix-run/react";
import React from "react";

const PaymentSuccess = () => {
  return (
    <>
      <div className="h-[90vh] flex flex-col items-center justify-center overflow-hidden w-full">
        <div className="bg-white p-6 md:mx-auto">
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Your order was successfull
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for your order, Payment was successfull
            </p>
            <p>Have a good day!</p>
            <div className="py-10 text-center">
              <Link
                to={"/"}
                className="px-12 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold py-3"
              >
                Go to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
