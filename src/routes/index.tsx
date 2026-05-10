import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { JobTracker } from "@/components/JobTracker";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "JobTrackr — Track your job applications" },
      { name: "description", content: "Track corporate and freelance job applications, interviews, and offers in one place." },
    ],
  }),
});

function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b6860", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        Loading…
      </div>
    );
  }

  return <JobTracker />;
}
