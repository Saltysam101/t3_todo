"use client";

import { UserButton } from "@clerk/nextjs";

export default function Todo() {
  return (
    <div>
        <UserButton afterSignOutUrl="/" />
    </div>
  )
}
