export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-500 font-inter text-sm tracking-normal w-full border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          PulseRelay
        </div>
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
          <a
            className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:ring-2 focus:ring-emerald-500"
            href="#"
          >
            Status
          </a>
          <a
            className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:ring-2 focus:ring-emerald-500"
            href="#"
          >
            API Docs
          </a>
          <a
            className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:ring-2 focus:ring-emerald-500"
            href="#"
          >
            Changelog
          </a>
        </div>
        <div className="text-zinc-500 dark:text-zinc-500 text-xs text-center md:text-right">
          &copy; 2024 PulseRelay Systems. All rights reserved. Built for
          high-precision notifications.
        </div>
      </div>
    </footer>
  );
}