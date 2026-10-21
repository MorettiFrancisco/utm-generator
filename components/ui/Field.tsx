import { useId } from "react";

/**
 * Field del TDS v2 (spec §5.3).
 * Label arriba del campo — nunca flotante. El sufijo requerido es un
 * asterisco; el opcional, la palabra "opcional". Helper 12/16 abajo, que pasa
 * a error-600 cuando hay error. La geometría (44px, padding 17/16, radio 6,
 * borde inset de 1px) vive en `.tds-field` en globals.css.
 */
type FieldProps = {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  /** Valores sugeridos (datalist); el campo sigue aceptando texto libre. */
  suggestions?: string[];
  mono?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Field({
  label,
  required,
  optional,
  error,
  hint,
  suggestions,
  mono,
  className = "",
  ...inputProps
}: FieldProps) {
  const listId = useId();

  return (
    <label className="block">
      <span className="tds-label">
        {label}
        {required && (
          <span className="text-error-600" title="Obligatorio">
            {" *"}
          </span>
        )}
        {optional && (
          <span className="font-normal text-neutral-400"> opcional</span>
        )}
      </span>

      <input
        {...inputProps}
        list={suggestions ? listId : undefined}
        aria-invalid={error ? true : undefined}
        className={`tds-field ${mono ? "font-mono" : ""} ${className}`}
      />

      {suggestions && (
        <datalist id={listId}>
          {suggestions.map((value) => (
            <option key={value} value={value} />
          ))}
        </datalist>
      )}

      {error ? (
        <span className="tds-helper tds-helper--error">{error}</span>
      ) : (
        hint && <span className="tds-helper">{hint}</span>
      )}
    </label>
  );
}
