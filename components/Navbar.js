import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <header className="top-nav">
      <div style={{ width: 40 }} />

      <div className="brand-center">WORKLY</div>

      <Link href="/join" className="join-button">
        Join
      </Link>
    </header>
  );
}

export default Navbar;
