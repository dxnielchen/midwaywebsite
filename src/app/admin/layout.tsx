'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Image,
  GlassWater,
  Sparkles,
  PartyPopper,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/photos', label: 'Hero Photos', icon: Image },
  { href: '/admin/specials', label: 'Weekly Specials', icon: Sparkles },
  { href: '/admin/drinks', label: 'Drink Menu', icon: GlassWater },
  { href: '/admin/party', label: 'Party Photos', icon: PartyPopper },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('midway_admin_token');
    if (token) {
      fetch('/api/admin/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setIsLoggedIn(res.ok);
          setLoading(false);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('midway_admin_token', token);
        setIsLoggedIn(true);
      } else {
        setLoginError('Invalid password');
      }
    } catch {
      setLoginError('Something went wrong');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('midway_admin_token');
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midway-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-midway-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-midway-black flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-white/5 p-8 max-w-sm w-full">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-scarlet mb-2">MIDWAY</h1>
            <p className="text-white/40 text-sm">Admin Portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="admin-input"
              autoFocus
            />
            {loginError && (
              <p className="text-red-400 text-sm">{loginError}</p>
            )}
            <button type="submit" className="admin-btn w-full">
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-white/30 text-xs hover:text-white/50 transition-colors">
              &larr; Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midway-black flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-midway-dark border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/5">
            <Link href="/admin" className="block">
              <h1 className="font-display text-xl font-bold text-scarlet">MIDWAY</h1>
              <p className="text-white/30 text-xs mt-1">Admin Portal</p>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-midway-accent/10 text-midway-accent border border-midway-accent/20'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon size={18} />
                  {link.label}
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/30 hover:text-white/60 transition-colors mb-1"
            >
              View Website &rarr;
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center justify-between px-6 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-white/60 hover:text-white"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="text-sm text-white/30">
              {sidebarLinks.find((l) => l.href === pathname)?.label || 'Admin'}
            </div>
            <div className="text-xs text-white/20">Midway Admin</div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
