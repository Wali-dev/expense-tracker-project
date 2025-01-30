import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center justify-center text-white px-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl"
            >
                <h1 className="text-5xl font-bold leading-tight">
                    Take Control of Your <span className="text-yellow-300">Expenses</span>
                </h1>
                <p className="text-lg mt-4 text-gray-200">
                    Track your spending, manage budgets, and gain financial freedom with ease.
                </p>
                <div className="mt-8 flex gap-6 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black text-white px-6 py-3 rounded-lg text-lg"
                        onClick={() => navigate("/sign-up")}
                    >
                        Register
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-blue-500 px-6 py-3 rounded-lg text-lg hover:bg-gray-100"
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign In
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
