"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { COUNTRIES, type Country } from "@/lib/countries";

/**
 * Select de prefijo telefónico, siguiendo el Select del TDS v2 (spec §5.3) y
 * el ItemMenu para las filas (§5.9).
 *
 * Sin banderas: el spec prohíbe emoji, y las banderas son emoji. El prefijo y
 * el nombre del país alcanzan para identificarlo.
 */
type Props = {
  value: Country;
  onChange: (country: Country) => void;
};

export function CountrySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Cerrar limpia la búsqueda, así la próxima apertura arranca de cero.
  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const term = query.trim().toLowerCase();
  const filtered = term
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(term) || c.label.includes(query.trim()),
      )
    : COUNTRIES;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="tds-select-trigger"
      >
        <span className="truncate">
          <span className="font-mono">{value.label}</span>
          <span className="ml-2 text-muted">{value.name}</span>
        </span>
        <Icon
          name="caret-down"
          size={20}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ease-standard ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="tds-menu absolute left-0 top-[calc(100%+4px)] z-50 w-full min-w-[280px] overflow-hidden">
          <div className="p-2">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar país"
              aria-label="Buscar país"
              className="tds-field tds-field--sm"
            />
          </div>

          <ul
            role="listbox"
            className="thin-scroll max-h-[264px] overflow-y-auto px-2 pb-2"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-sm text-muted">Sin resultados</li>
            )}
            {filtered.map((country) => {
              const selected =
                country.code === value.code && country.name === value.name;
              return (
                <li key={`${country.code}-${country.name}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(country);
                      close();
                    }}
                    className="tds-option"
                  >
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="font-mono text-sm text-muted">
                      {country.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
