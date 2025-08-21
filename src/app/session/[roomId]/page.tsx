import { use } from "react";
import SessionClient from "@components/SessionClient";

export default function SessionPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);
  return <SessionClient roomId={roomId} />;
}
