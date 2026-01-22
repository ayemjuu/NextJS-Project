"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvitePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setValid(false);
      return;
    }

    async function validateToken() {
      const res = await fetch(`/api/invite/validate?token=${token}`);
      const data = await res.json();
      setValid(data.valid);
    }

    validateToken();
  }, [token]);

  if (valid === null) return <p>Checking invite...</p>;
  if (!valid) return <p>Invalid or expired invite token.</p>;

  return (
    <div>
      <h1>Complete Your Registration</h1>
      {/* Render registration form here */}
      {/* Pass token along to the form submit handler */}
    </div>
  );
}
