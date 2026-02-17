'use client';

import DesktopNav from './DesktopNavbar';
import MobileNav from './MobileNavbar';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Desktop: hidden on small, flex on md+ */}
      <div className="hidden md:flex">
        <DesktopNav />
      </div>
      {/* Mobile: flex on small, hidden on md+ */}
      <div className="flex md:hidden">
        <MobileNav />
      </div>
    </nav>
  );
}
