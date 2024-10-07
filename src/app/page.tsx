import { WritingPad } from "./_components/writingPad/writingPad";

export default async function Home() {
  return (
    <main className="flex items-center justify-center p-4">
      <div className="flex w-full max-w-3xl flex-col">
        <WritingPad />
      </div>
    </main>
  );
}
