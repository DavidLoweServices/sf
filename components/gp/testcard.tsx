'use client';

import { useRef, useEffect, useState } from 'react';
import Script from 'next/script';

// Add TypeScript declaration for GlobalPayments
declare global {
  interface Window {
    GlobalPayments: any;
  }
}

export default function TestCardForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Function to handle when the script loads
  const handleScriptLoad = () => {
    console.log("GlobalPayments script has loaded!");
    setScriptLoaded(true);
  };

  // Initialize the GlobalPayments form after the script loads
  useEffect(() => {
    if (!scriptLoaded) return;

    console.log("Initializing GlobalPayments...");
    
    try {
      // configuring Hosted Fields
      window.GlobalPayments.configure({
        accessToken: "4JlfZYeE6VahzuM3iwXqFJ7IkMA7",
        apiVersion: "2021-03-22",
        env: "sandbox" // or "production"
      });

      // Initialize the form
      const cardForm = window.GlobalPayments.ui.form({
        fields: {
          "card-number": {
            target: "card-number",
            placeholder: "•••• •••• •••• ••••"
          },
          "card-expiration": {
            target: "card-expiration",
            placeholder: "MM / YYYY"
          },
          "card-cvv": {
            target: "card-cvv",
            placeholder: "CVV"
          },
          "card-holder-name": {
            target: "card-holder-name",
            placeholder: "Cardholder Name"
          },
          "submit": {
            target: "submit-button",
            text: "Submit Payment"
          }
        }
      });
      
      // method to notify that hosted fields have been initialised
      cardForm.ready(() => {
        console.log("Registration of all credit card fields occurred");
        //TODO: Add your successful message
      });

      
      // appending the token to the form as a hidden field and
      // submitting it to the server-side
      cardForm.on("token-success", (resp: any) => {
        // add payment token to form as a hidden input
        const token = document.createElement("input");
        token.type = "hidden";
        token.name = "payment-reference";
        token.value = resp.paymentReference;
        //print to the console if required for testing purposes
        console.log(token.value);
        const form = document.getElementById("payment-form") as HTMLFormElement;
        if (form) {
          form.appendChild(token);
          form.submit();
        } else {
          console.error("Form element not found");
        }
      });
      
      // add error handling if token generation is not successful
      cardForm.on("token-error", (resp: any) => {
        // TODO: Add your error handling
        console.error("Token error:", resp);
      });
      
      // field-level event handlers. example:
      cardForm.on("card-number", "register", () => {
        console.log("Registration of Card Number occurred");
      });
    } catch (error) {
      console.error("Error initializing GlobalPayments:", error);
    }
  }, [scriptLoaded]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-5 text-gray-900">Payment Test Card</h1>
      
      {/* Load GlobalPayments script with proper event handling */}
      <Script 
        src="https://js.globalpay.com/v1/globalpayments.js" 
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />
      
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <form id="payment-form" method="post" action="process_payment" ref={formRef}>
          <h3 className="text-xl font-medium mb-4 text-gray-800">Payment Details</h3>
          
          <div className="mb-4">
            <label htmlFor="card-number" className="block text-sm font-medium mb-2 text-gray-700">Card Number</label>
            <div id="card-number" className="bg-gray-100 p-3 rounded border border-gray-300 h-10"></div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="card-expiration" className="block text-sm font-medium mb-2 text-gray-700">Expiry Date</label>
            <div id="card-expiration" className="bg-gray-100 p-3 rounded border border-gray-300 h-10"></div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="card-cvv" className="block text-sm font-medium mb-2 text-gray-700">Security Code</label>
            <div id="card-cvv" className="bg-gray-100 p-3 rounded border border-gray-300 h-10"></div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="card-holder-name" className="block text-sm font-medium mb-2 text-gray-700">Cardholder Name</label>
            <div id="card-holder-name" className="bg-gray-100 p-3 rounded border border-gray-300 h-10"></div>
          </div>
          
          <div id="submit-button" className="mt-6"></div>
        </form>
      </div>
    </div>
  );
} 