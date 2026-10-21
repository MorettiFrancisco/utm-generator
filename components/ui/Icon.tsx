/**
 * Iconos del TDS v2.
 *
 * SUSTITUCIÓN ANOTADA (spec §4): el sistema pide Font Awesome 6/7 Pro como
 * webfont, donde el "estilo" es el peso de la fuente. Este repo no tiene la
 * licencia de FA Pro, así que se aplica el reemplazo que el propio spec
 * autoriza: Lucide con `strokeWidth: 1.5`, que es lo más cercano al peso
 * Regular (400). Los nombres de glifo se mantienen en la nomenclatura de FA,
 * para que cambiar a la webfont sea reemplazar este archivo y nada más.
 *
 * Escala del spec: XS 16 · SM 20 · MD 24 · LG 32 · XL 48.
 */

export type IconName =
  | "link"
  | "caret-down"
  | "circle-check"
  | "circle-info"
  | "comment"
  | "chevron-left";

const PATHS: Record<IconName, React.ReactNode> = {
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  "caret-down": <path d="m6 9 6 6 6-6" />,
  "circle-check": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "circle-info": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </>
  ),
  comment: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  "chevron-left": <path d="m15 18-6-6 6-6" />,
};

type Props = {
  name: IconName;
  /** Tamaño en px. Escala del spec: 16, 20, 24, 32, 48. */
  size?: 16 | 20 | 24 | 32 | 48;
  className?: string;
};

export function Icon({ name, size = 24, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
