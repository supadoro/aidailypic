export async function submitToServer(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) return false;
    const result = (await response.json()) as { ok?: boolean };
    return Boolean(result.ok);
  } catch {
    return false;
  }
}
