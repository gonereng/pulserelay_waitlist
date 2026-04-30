import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
    return (
        <footer className=" text-emerald-600 dark:text-emerald-500 font-inter text-sm tracking-normal w-full border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <Link className="flex items-center gap-2" href="/">
                    <div className="flex h-8 w-8 items-center justify-center rounded-none bg-primary text-white">
                        <Shield className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                        <span className="font-sans text-base font-black leading-tight text-zinc-900 dark:text-zinc-100">
                            PulseRelay
                        </span>
                        <p className="text-[8px] uppercase tracking-widest text-muted-foreground">
                            Incident Guardian
                        </p>
                    </div>
                </Link>
                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:ring-2 focus:ring-emerald-500"
                        href="#"
                    >
                        Privacy
                    </a>
                    <a
                        className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:ring-2 focus:ring-emerald-500"
                        href="#"
                    >
                        Terms
                    </a>
                </div>
                <div className="text-zinc-500 dark:text-zinc-500 text-xs text-center md:text-right">
                    &copy; 2026 PulseRelay. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
