"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS, CONFERENCE } from "@/lib/data";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="NIDC - Home"
          >
            <span className="text-2xl font-black tracking-tight" aria-hidden="true">
              <span className="text-nidc-pink">NI</span>
              <span className="text-white">DC</span>
              <span className="text-nidc-pink ml-1 text-lg">&lt;&gt;</span>
            </span>
            <div className="hidden sm:block text-xs text-nidc-muted leading-tight">
              <div>WATERFRONT ICC BELFAST</div>
              <div>8TH NOVEMBER 2025</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <button
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 min-h-[44px] ${
                      pathname === item.href
                        ? "text-nidc-pink"
                        : "text-gray-200 hover:text-white hover:bg-white/5"
                    }`}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors min-h-[44px] inline-flex items-center ${
                      pathname === item.href
                        ? "text-nidc-pink"
                        : "text-gray-200 hover:text-white hover:bg-white/5"
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown - pt-2 creates invisible hover bridge, -top-2 on inner panel offsets it visually */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div
                      className="glass rounded-xl overflow-hidden shadow-2xl"
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/tickets"
              className="hidden sm:inline-flex items-center px-5 py-2 min-h-[44px] bg-nidc-pink hover:bg-nidc-pink/90 text-white text-sm font-bold rounded-full transition-all hover:shadow-lg hover:shadow-nidc-pink/25"
            >
              GET TICKETS
            </Link>
            <Link
              href="/agenda"
              className="hidden sm:inline-flex items-center px-4 py-2 min-h-[44px] border-2 border-nidc-cyan/60 text-nidc-cyan text-sm font-bold rounded-full hover:bg-nidc-cyan/10 transition-all"
            >
              VIEW AGENDA
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-3 min-w-[44px] min-h-[44px] text-gray-200 hover:text-white rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden glass border-t border-white/5 max-h-[calc(100vh-4rem)] overflow-y-auto"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.children ? item.children[0].href : item.href}
                  className="block px-3 py-3 min-h-[44px] text-base font-medium text-gray-200 hover:text-white rounded-lg hover:bg-white/5"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-3 min-h-[44px] text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                href="/tickets"
                className="block text-center px-5 py-3 min-h-[44px] bg-nidc-pink text-white font-bold rounded-full"
              >
                GET TICKETS
              </Link>
              <Link
                href="/agenda"
                className="block text-center px-4 py-3 min-h-[44px] border-2 border-nidc-cyan/60 text-nidc-cyan font-bold rounded-full"
              >
                VIEW AGENDA
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
