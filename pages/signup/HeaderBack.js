import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function HeaderBack() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-200 transition"
    >
      <ChevronLeftIcon className="h-4 w-4" />
      Back to Workly
    </Link>
  );
}
