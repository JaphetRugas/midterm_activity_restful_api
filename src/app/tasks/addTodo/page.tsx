"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddTask() {
  const [title, setTitle] = useState("");
  const router = useRouter()

  const handleSaveTask = async () => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      // Refresh the todo list or fetch the updated list of todos
      router.push("/tasks");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveTask();
        }}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}
