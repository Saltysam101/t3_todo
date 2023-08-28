"use client";
import { api } from "~/utils/api";

import { UserButton } from "@clerk/nextjs";

export default function Todo() {
  const {data} = api.todo.getAll.useQuery();
  return (
    <>
      <nav>
        <UserButton afterSignOutUrl="/" />
      </nav>
        <h2>Your Todo List</h2>
      <form>
        <input placeholder="Add Your Todo Here" type="text" />
      </form>
      <main>
        <div>{data?.map((todo)=>( 
          <div key={todo.id}>{todo.text}</div>)
        )}
        </div>
      </main>
    </>
  )
}
