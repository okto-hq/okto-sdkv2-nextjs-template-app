import { useOkto } from "@okto_web3/react-sdk";
import React, { useState } from "react";

export default function ModalWithOTP({ setUserSWA }: { setUserSWA: (swa: string) => void }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [method, setMethod] = useState<"email" | "whatsapp">("email");
    const [contact, setContact] = useState("");
    const [isOTPRequested, setIsOTPRequested] = useState(false);
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");
    const oktoClient = useOkto();


    const handleSendOTP = async () => {
        try {
            console.log("Sending OTP with:", { contact, method });
            const response = await oktoClient.sendOTP(contact, method);

            if (response.status === "success" && response.token) {
                console.log("sendOTP response:", response);
                setToken(response.token);
                alert(`OTP sent to ${contact} via ${method}`);
                setIsOTPRequested(true);
            } else {
                console.error("Unexpected response:", response);
                alert("Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOTP = async () => {
        // Replace this with your backend API call for OTP verification
        if (method === 'email') {
            console.log('Verifying Email OTP:', {
                email: contact,
                otp,
                token: token
            });
            const response = await oktoClient.loginUsingEmail(contact, otp, token, () => {
                alert(`OTP verified successfully!`);
                setIsModalOpen(false); // Close modal on successful verification
                setIsOTPRequested(false); // Reset state for next use
                setContact(""); // Clear contact input
                setOtp(""); // Clear OTP input
            });
            console.log("Email OTP verification response:", response); 
            setUserSWA(response as string);      
        } else {
            console.log('Verifying WhatsApp OTP:', {
                phoneNumber: contact,
                otp,
                token: token
            });
            const response = await oktoClient.loginUsingWhatsApp(contact, otp, token, () => {
                alert(`OTP verified successfully!`);
                setIsModalOpen(false); // Close modal on successful verification
                setIsOTPRequested(false); // Reset state for next use
                setContact(""); // Clear contact input
                setOtp(""); // Clear OTP input
            });
            console.log("WhatsApp OTP verification response:", response);
            setUserSWA(response as string);
        }

    };

    return (
        <div>
            {/* Button to open modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
                Open OTP Modal
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        {!isOTPRequested ? (
                            <>
                                <h2 className="text-lg font-medium text-gray-700 mb-4">
                                    Verify Contact
                                </h2>

                                {/* Method Selection */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Method
                                    </label>
                                    <select
                                        value={method}
                                        onChange={(e) => setMethod(e.target.value as "email" | "whatsapp")}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="email">Email</option>
                                        <option value="whatsapp">WhatsApp</option>
                                    </select>
                                </div>

                                {/* Contact Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {method === "email" ? "Email Address" : "Phone Number"}
                                    </label>
                                    <input
                                        type="text"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder={
                                            method === "email" ? "Enter your email" : "Enter your phone number"
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Send OTP Button */}
                                <button
                                    onClick={handleSendOTP}
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Send OTP
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-lg font-medium text-gray-700 mb-4">
                                    Enter OTP
                                </h2>

                                {/* OTP Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        OTP
                                    </label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter the OTP"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Verify OTP Button */}
                                <button
                                    onClick={handleVerifyOTP}
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}

                        {/* Close Modal Button */}
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                setIsOTPRequested(false); // Reset state on close
                                setContact(""); // Clear contact input
                                setOtp(""); // Clear OTP input
                            }}
                            className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}