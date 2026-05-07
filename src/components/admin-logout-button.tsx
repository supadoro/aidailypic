"use client";

export function AdminLogoutButton() {
  const logout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white/65 hover:text-white" onClick={logout} type="button">
      로그아웃
    </button>
  );
}
