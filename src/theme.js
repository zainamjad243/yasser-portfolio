// Shared motion easing and class strings for buttons, chips and pills.
export const EASE = [0.22, 1, 0.36, 1]

const pillBase =
  'group inline-flex items-center justify-center gap-2 rounded-full text-sm transition-shadow duration-500 ease-premium'

export const pillPrimary = `${pillBase} bg-[#111111] px-6 py-3 font-semibold text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.45)] hover:shadow-[0_18px_36px_-10px_rgba(0,0,0,0.55)]`

export const pillSecondary = `${pillBase} border border-black/[0.08] bg-white px-5 py-2.5 font-medium text-[#111111] shadow-[0_6px_18px_-8px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_26px_-10px_rgba(0,0,0,0.3)]`

export const chip =
  'inline-flex items-center rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-[#333333] shadow-[0_4px_12px_-6px_rgba(0,0,0,0.2)]'
