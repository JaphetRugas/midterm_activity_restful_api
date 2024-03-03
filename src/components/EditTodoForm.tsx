"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importing from next/navigation
import { Todo } from "@prisma/client";

const EditTodoForm = ({ id, todo }: { id: string; todo: Todo }) => {
  const [newTitle, setTitle] = useState(todo.title);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, title: newTitle }), // Send the updated title
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      router.push("/tasks"); // Redirect to the home page after successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodoForm;


