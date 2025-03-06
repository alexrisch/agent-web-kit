
import { Thread } from "@/components/Thread";
import * as React from "react";


export default async function ThreadPage({params}: {params: Promise<{id: string}>}) {

  const {id} = await params;

  return (
    <main>
      <Thread id={id} />
    </main>
  )
}