"use client";
import { Link } from "@/navigation";

export default function Footer() {
  return (
    <div className="gradient footer">
      <div>
        <Link href="/legals">Legals / Data</Link>
      </div>
      <div>© {new Date().getFullYear()}, Motion Portals</div>
    </div>
  );
}
