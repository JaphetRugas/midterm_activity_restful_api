"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { Todo } from "@prisma/client";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleCheckboxChange = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="mt-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="p-4 border border-gray-200 my-3 rounded-lg bg-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  handleCheckboxChange(todo.id, e.target.checked)
                }
              />
              <span className="ml-2 text-gray-800">{todo.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="text-red-400"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <HiOutlineTrash size={24} />
              </button>
              <Link
                href={`/tasks/editTodo/${todo.id}`}
                className="text-gray-600 hover:text-blue-600"
              >
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
