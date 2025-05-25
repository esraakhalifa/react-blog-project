import React from 'react'

export default function Hero() {
  return (
<div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url('https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp')",
  }}
>

<div className="hero-overlay"></div>
<div className="hero-content text-neutral-content text-center">
  <div className="max-w-md">
    <h1 className="mb-5 text-5xl font-bold">Welcome to Maktoob</h1>
    <p className="mb-5 text-lg">
      Where every keystroke counts, and every click carves a story.<br />
      Your story. Your stack. Your script.
    </p>
  </div>
</div>
</div>
  )
}
