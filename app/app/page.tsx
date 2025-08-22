import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="h1">Welcome to Serein</h1>
      <p className="lead">Two-minute micro escapes for busy days.</p>

      <div className="section grid2 mt-3">
        <Link href="/relax" className="card pad" style={{ background: "linear-gradient(180deg,#fff, #F7FBF7)" }}>
          <div className="card-title">Relax Hub</div>
          <div className="lead">Art, quotes and ambient sound.</div>
        </Link>

        <Link href="/panic" className="card pad">
          <div className="card-title">Panic Helper</div>
          <div className="lead">Guided inhale / hold / exhale.</div>
        </Link>

        <Link href="/fitness" className="card pad">
          <div className="card-title">Fitness Calendar</div>
          <div className="lead">Tap days to track simple habits.</div>
        </Link>

        <Link href="/history" className="card pad">
          <div className="card-title">History</div>
          <div className="lead">Session notes and recents.</div>
        </Link>
      </div>
    </>
  );
}
