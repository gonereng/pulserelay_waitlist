'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
    return (
        <header className=" text-emerald-600 dark:text-emerald-500 font-inter antialiased tracking-tight fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto w-full">
                <Link className="flex items-center gap-3" href="/">
                    <div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary text-white">
                        <Shield className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                        <h1 className="font-sans text-lg font-black leading-tight text-foreground">
                            PulseRelay
                        </h1>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            Incident Guardian
                        </p>
                    </div>
                </Link>
            </div>
        </header>
    );
}
