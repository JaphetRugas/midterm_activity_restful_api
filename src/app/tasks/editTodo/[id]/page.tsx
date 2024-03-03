import EditTodoForm from "@/components/EditTodoForm";
import { Todo } from "@prisma/client";

const getTodoById = async (id: string): Promise<Todo> => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch todo");
      }
  
      return res.json();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

export default async function EditTodo({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const todo = await getTodoById(id);
    return <EditTodoForm id={id} todo={todo} />;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return <div>Error fetching todo. Please try again later.</div>;
  }
}
