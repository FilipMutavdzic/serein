import FitnessCalendar from "@/components/FitnessCalendar";

export const metadata = { title: "Fitness | Serein" };

export default function Fitness() {
  return (
    <>
      <h1 className="h1">Fitness</h1>
      <p className="lead">Track simple habits and workouts.</p>
      <div className="section"><FitnessCalendar /></div>
    </>
  );
}

