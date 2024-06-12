import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();
  console.log(user.id);
  return (
    <main>
      <h1>
        {user?.fullName}:{user?.id}
      </h1>
    </main>
  );
}
