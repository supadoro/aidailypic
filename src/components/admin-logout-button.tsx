"use client";

export function AdminLogoutButton() {
  const logout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#3182f6]/40 hover:text-[#3182f6]" onClick={logout} type="button">
      로그아웃
    </button>
  );
}
