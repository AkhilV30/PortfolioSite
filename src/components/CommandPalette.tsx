import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, FileText, Github, Hash, Linkedin, Mail, Search } from 'lucide-react';
import { EASE, scrollToId, useUI } from '../lib/ui';
import { NAV_ITEMS } from './Nav';
import { ALL_PROJECTS } from '../data/projects';

type Item = { id: string; group: string; label: string; hint?: string; Icon: typeof Hash; run: () => void };

const EMAIL = 'akhil.vishnubhotla2005@gmail.com';

const CommandPalette = () => {
  const { paletteOpen, setPaletteOpen, openCase } = useUI();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const close = () => setPaletteOpen(false);
    const go = (id: string) => () => { close(); setTimeout(() => scrollToId(id), 60); };
    const open = (url: string) => () => { close(); window.open(url, '_blank', 'noopener,noreferrer'); };
    return [
      { id: 'home', group: 'Navigate', label: 'Home', Icon: Hash, run: go('home') },
      ...NAV_ITEMS.map(n => ({ id: n.id, group: 'Navigate', label: n.name, Icon: Hash, run: go(n.id) })),
      ...ALL_PROJECTS.map(p => ({
        id: `case-${p.slug}`, group: 'Case studies', label: p.title, hint: 'Open', Icon: FileText,
        run: () => { close(); openCase(p.slug); },
      })),
      { id: 'sourced-live', group: 'Links', label: 'Visit sourcedai.app', Icon: ArrowUpRight, run: open('https://www.sourcedai.app/') },
      { id: 'email', group: 'Links', label: 'Email Akhil', hint: EMAIL, Icon: Mail, run: () => { close(); window.location.href = `mailto:${EMAIL}`; } },
      { id: 'github', group: 'Links', label: 'GitHub', Icon: Github, run: open('https://github.com/AkhilV30') },
      { id: 'linkedin', group: 'Links', label: 'LinkedIn', Icon: Linkedin, run: open('https://www.linkedin.com/in/akhil-vishnubhotla-a51379369/') },
    ];
  }, [openCase, setPaletteOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter(i => `${i.label} ${i.group} ${i.hint ?? ''}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  // Global shortcuts: ⌘K / Ctrl+K toggles, "/" opens when not typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, [contenteditable="true"]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      } else if (e.key === '/' && !typing && !paletteOpen) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, setPaletteOpen]);

  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [paletteOpen]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[active]?.run(); }
    else if (e.key === 'Escape') { e.preventDefault(); setPaletteOpen(false); }
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm" onClick={() => setPaletteOpen(false)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/95 shadow-2xl shadow-black/60 overflow-hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 px-4 border-b border-zinc-800">
              <Search className="h-4 w-4 text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Jump to a section, project or link…"
                className="w-full h-14 bg-transparent text-[15px] text-zinc-100 placeholder:text-zinc-600 outline-none"
                aria-label="Search"
              />
              <kbd className="hidden sm:block text-[10px] text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <div ref={listRef} className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-zinc-500">No results for “{query}”.</p>
              )}
              {filtered.map((item, idx) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                const isActive = idx === active;
                return (
                  <div key={item.id}>
                    {header && (
                      <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-600">{header}</p>
                    )}
                    <button
                      data-idx={idx}
                      onMouseMove={() => setActive(idx)}
                      onClick={item.run}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                        isActive ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400'
                      }`}
                    >
                      <item.Icon className="h-4 w-4 shrink-0 text-zinc-500" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint && <span className="hidden sm:block text-xs text-zinc-600 truncate max-w-[45%]">{item.hint}</span>}
                      {isActive && <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-4 px-4 py-2.5 border-t border-zinc-800 text-[10px] text-zinc-600">
              <span>↑↓ to move</span><span>↵ to open</span><span>esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
