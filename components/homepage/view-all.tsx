import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const ViewAll = () => {
	return (
		<section className="m-auto max-w-sm mb-10 mt-5">
			<Link
				href="/jobs"
				className="outline-1 outline outline-slate-400 text-black text-center py-2 px-5 rounded-md hover:bg-purple-500 hover:text-white hover:outline-purple-600 focus:outline-purple-600 flex justify-center items-center group dark:text-white"
			>
				See more
				<ArrowRightIcon className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
			</Link>
		</section>
	);
};

export default ViewAll;