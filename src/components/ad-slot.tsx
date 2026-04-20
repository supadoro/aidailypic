export function AdSlot(props: { label?: string; heightClassName?: string }) {
  const { label = "Advertisement", heightClassName = "h-24" } = props;

  return (
    <section className="rounded-xl bg-[#eaeff2] p-3">
      <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <div
        className={`flex ${heightClassName} items-center justify-center rounded-lg border border-dashed border-slate-400/40 bg-white text-xs font-semibold text-slate-500`}
      >
        AD SLOT
      </div>
    </section>
  );
}
