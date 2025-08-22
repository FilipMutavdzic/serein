import BreathPacer from "@/components/BreathPacer";

export const metadata = { title: "Session | Serein" };

export default async function SessionPage({
  params
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  const preset =
    roomId === "box-breath"
      ? { inhale: 4000, hold: 4000, exhale: 4000, cycles: 5 }
      : roomId === "quick-reset"
      ? { inhale: 3000, hold: 2000, exhale: 4000, cycles: 5 }
      : { inhale: 4000, hold: 4000, exhale: 6000, cycles: 5 };

  return (
    <main className="min-h-[70vh] grid place-items-center p-6">
      <BreathPacer pattern={preset} vibrate />
    </main>
  );
}
