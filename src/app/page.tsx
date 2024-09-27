import { api, HydrateClient } from "~/trpc/server";
import { WritingPad } from "./_components/writingPad/writingPad";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex items-center justify-center p-4">
        <div className="flex w-full max-w-3xl flex-col">
          <WritingPad />
        </div>
      </main>
    </HydrateClient>
  );
}
