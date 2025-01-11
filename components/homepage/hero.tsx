"use client"
import { MagicWandIcon, DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const Hero = () => {
	return (
		<section className="pt-40 h-[100vh] mb-4">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
				<div className="text-center flex justify-center items-center flex-col">
					<motion.h1
						className="text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-clip-text tracking-tighter bg-gradient-to-b from-[#555] to-[#000] dark:bg-gradient-to-b dark:from-[#fff] dark:to-[#adadad]"
						style={{ WebkitTextFillColor: "transparent" }}
						initial={{ y:100, opacity:0 }}
						animate={{ y:0, opacity:1 }}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 20
						}}
					>
						Your Dream Career Starts Here
					</motion.h1>
					<motion.p 
						className="max-w-2xl my-4 text-xl text-[#666] dark:text-slate-200 font-normal"
						initial={{ y:100, opacity:0 }}
						animate={{ y:0, opacity:1 }}
						transition={{
						type: "spring",
							stiffness: 260,
							damping: 20,
							delay:0.25
						}}
					>
						Job hunting made easy: Get instant alerts for jobs
						matching your skills and innovative job finder.
					</motion.p>
					<motion.div 
						className="flex justify-center items-center mt-5"
						initial={{ scale:0 }}
						animate={{ scale:1 }}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 20,
							delay:0.5
						}}
					>
						<div className="mr-2 flex items-center outline outline-1 outline-slate-400 rounded-full px-4 py-2 hover:outline-slate-500 focus:outline-slate-500 dark:outline-slate-300 dark:active:outline-slate-400 focus-within:outline-slate-500 min-w-[600px]">
							<input
								type="text"
								className="outline-none focus:outline-none w-full bg-transparent text-black dark:text-white"
								placeholder="Search for a Job"
							/>
							<button>
								<MagicWandIcon className="ml-2 text-gray-950 dark:text-slate-100 dark:hover:text-slate-50 hover:text-gray-700 hover:scale-110" />
							</button>
						</div>
					</motion.div>
				</div>
				<motion.div 
					className="text-xl mt-20"
					initial={{ y:100, opacity:0 }}
					animate={{ y:0, opacity:1 }}
					transition={{
					type: "spring",
						stiffness: 260,
						damping: 20,
						delay:0.25
					}}
				>
					<DoubleArrowDownIcon height={30} width={30} className="text-gray-400 animate-bounce" />
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
