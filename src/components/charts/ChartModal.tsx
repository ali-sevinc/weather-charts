import { ReactNode, useEffect, useRef } from "react";

type PropsType = { open: boolean; children: ReactNode; onClose: () => void };
export default function ChartModal({ open, children, onClose }: PropsType) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(
    function () {
      if (!ref.current) return;
      if (open) {
        ref.current.showModal();
      } else {
        ref.current.close();
      }
    },
    [ref, open]
  );

  return (
    <dialog
      onClose={onClose}
      className="backdrop:bg-slate-800/90 sm:w-4/5 md:w-3/5 py-4 px-1 rounded-xl w-full border-none focus:outline-none relative"
      ref={ref}
    >
      {children}
      <button
        className="absolute text-xl right-4 top-1 duration-200 hover:ring-red-400 focus:outline-none px-2 hover:ring-1 rounded-full"
        onClick={onClose}
      >
        X
      </button>
    </dialog>
  );
}
