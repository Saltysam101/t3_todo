"use client";

import { UserButton } from "@clerk/nextjs";

export default function Todo() {
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
        <div>A todo item</div>
      </main>
    </>
  )
}
