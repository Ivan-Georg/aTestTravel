'use client'

import Link from 'next/link';
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";
import {useUserCookie} from "@/hooks/useUserCookie";

function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const pathname = usePathname();
    const isUserCookiePresent = useUserCookie();
    const isActive = (href: string) => pathname === href;
    
    const handleLogout = (event: React.FormEvent) => {
        event.preventDefault();
        removeCookie('user', { path: '/' });
    }
    
  return (
      <>
      <header className="font-indie-flower">
          <Link href="/">
              <h1 className="text-6xl text-center content-center p-2 decoration-0">Lagom Travels</h1>
          </Link>

          <div className="text-2xl m-4 text-center space-x-6">
              <Link href="/mytravels" className={`link-travels ${isActive('/mytravels') ? 'text-orange-400' : ''}`}>
                  My Travels
              </Link>
              <Link href="/plantravels" className={`link-travels ${isActive('/plantravels') ? 'text-orange-400' : ''}`}>
                  Plan Travels
              </Link>
              <Link href="/searchtravels" className={`link-travels ${isActive('/searchtravels') ? 'text-orange-400' : ''}`}>
                  Search Travels
              </Link>
          </div>
          <div className="text-l text-center mb-5">
              {isUserCookiePresent && pathname !== '/searchtravels' ? (
                  <div className="inline-block thick-line lined thick p-4 mt-2">
                      <h3 className="text-xl mb-2">Welcome, <span className="italic">{cookies.user && cookies.user.name ? cookies.user.name : ''}</span> !</h3>
                      <button onClick={handleLogout} className="lined thin p-2">Logout</button>
                  </div>
              ): null}
          </div>
      </header>
      </>
  );
}

export default Header;
