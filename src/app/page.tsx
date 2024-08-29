import { api, HydrateClient } from "~/trpc/server";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { WritingPad } from "./_components/writingPad/writingPad";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-row justify-end rounded-md bg-blue-300 p-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <main className="flex items-center justify-center p-4">
        <div className="flex w-full max-w-3xl flex-col">
          <WritingPad />
        </div>
      </main>
    </HydrateClient>
  );
}
