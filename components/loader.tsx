import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <BarLoader color="white" />
    </div>
  );
}
