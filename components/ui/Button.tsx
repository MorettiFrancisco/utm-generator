/**
 * Button del TDS v2 (spec §5.1).
 * Píldora completa (radio 100), alto 41px en medium y 30px en small, peso de
 * texto 400 — no 500 ni 600. La geometría vive en `.tds-btn` en globals.css.
 *
 * Se exporta también `buttonClass` para los casos en que el control tiene que
 * ser un `<a>` y no un `<button>` (abrir WhatsApp, abrir la guía).
 */

type ButtonKind = "filled" | "outlined" | "neutral" | "success";
type ButtonSize = "sm" | "md";

export function buttonClass(
  kind: ButtonKind = "filled",
  size: ButtonSize = "md",
  extra = "",
) {
  return `tds-btn tds-btn--${kind} ${size === "sm" ? "tds-btn--sm" : ""} ${extra}`;
}

type ButtonProps = {
  children: React.ReactNode;
  kind?: ButtonKind;
  size?: ButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  kind = "filled",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} type={type} className={buttonClass(kind, size, className)}>
      {children}
    </button>
  );
}
