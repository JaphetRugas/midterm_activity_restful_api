import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-gray-100 px-4 py-3 shadow-md">
      <ul className="flex space-x-4">
        <li>
          <Link href="/tasks" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </li>
      </ul>
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/tasks/addTodo"
            className="text-gray-700 hover:text-blue-600 bg-blue-200 px-3 py-1 rounded-md"
          >
            Add Task
          </Link>
        </li>
      </ul>
    </nav>
  );
}
