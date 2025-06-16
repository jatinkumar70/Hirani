"use client";


export default function FullPageLoader() {
  return (
    <div className="fixed inset-1 flex items-center justify-center  z-[1000]">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
