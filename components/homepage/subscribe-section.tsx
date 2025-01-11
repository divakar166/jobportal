import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SubscribeSection = () => {
	return (
		<section className="m-auto mb-10 px-6 w-full h-60">
			<div className="px-10 bg-purple-200 dark:bg-gray-700 w-full h-full rounded-[2.5rem] rounded-tr-none flex justify-between items-center">
				<div className="pr-4 w-3/4">
					<h3 className="text-md text-slate-500 dark:text-slate-100">
						Let&apos;s Find your Dream Job
					</h3>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
						Ready to take your career to the next level?
					</h1>
					<p className="text-sm text-slate-600 dark:text-slate-200">
						Our job finder website is more than just a search
						engine. Sign up today and unlock a world of
						possibilities!
					</p>
				</div>
				<div className="w-1/2 ml-4">
					<div className="flex w-full">
					<div className="flex w-full max-w-sm items-center space-x-2">
						<Input type="email" className="outline-1 outline outline-gray-950 dark:outline-gray-50 text-gray-950 dark:text-gray-50" placeholder="Email" />
						<Button type="submit" className="bg-purple-600 hover:bg-purple-500 dark:text-white">Subscribe</Button>
					</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SubscribeSection;