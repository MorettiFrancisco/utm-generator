"use client";

import { useEffect, useMemo, useState } from "react";
import { CountrySelect } from "@/components/CountrySelect";
import { WhatsAppPreview } from "@/components/WhatsAppPreview";
import { Button, buttonClass } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { DEFAULT_COUNTRY, type Country } from "@/lib/countries";
import {
  buildWhatsAppLink,
  normalizeUTMParam,
  EMPTY_UTM,
  RECOMMENDED_MEDIUMS,
  RECOMMENDED_SOURCES,
  REQUIRED_UTM,
  UTM_ORDER,
  type UtmKey,
  type UtmValues,
} from "@/lib/utm-link";

const UTM_FIELDS: Record<
  UtmKey,
  { hint: string; placeholder: string; suggestions?: string[] }
> = {
  source: {
    hint: "Lo vas a ver como origen en Tecnom Sales",
    placeholder: "web",
    suggestions: RECOMMENDED_SOURCES,
  },
  medium: {
    hint: "Lo vas a ver como medio en Tecnom Sales",
    placeholder: "cpc",
    suggestions: RECOMMENDED_MEDIUMS,
  },
  campaign: {
    hint: "Lo vas a ver como campaña en Tecnom Sales",
    placeholder: "promo_usados_q2_2026",
  },
  term: {
    hint: "Palabra clave o segmentación, típico de Google Ads",
    placeholder: "autos_usados",
  },
  content: {
    hint: "Diferencia avisos o creatividades de una misma campaña",
    placeholder: "imagen_suv",
  },
};

/** Marcador de step del TDS (spec §5.12): círculo 24px primary-600. */
function StepMarker({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-base text-white"
    >
      {n}
    </span>
  );
}

function Card({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="tds-card p-6">
      <div className="mb-5 flex items-start gap-3">
        <StepMarker n={step} />
        <div>
          <h2 className="text-lg font-semibold text-strong">{title}</h2>
          {description && <p className="text-base text-muted">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

/** Un ítem del checklist de la guía: cumple, o explica qué falta. */
function Check({
  ok,
  label,
  detail,
}: {
  ok: boolean;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex gap-2">
      <Icon
        name={ok ? "circle-check" : "circle-info"}
        size={16}
        className={`mt-0.5 shrink-0 ${ok ? "text-success-600" : "text-gray-400"}`}
      />
      <span className="min-w-0">
        <span className={`text-base ${ok ? "text-muted" : "text-strong"}`}>
          {label}
        </span>
        {!ok && <span className="tds-helper">{detail}</span>}
      </span>
    </li>
  );
}

export default function Home() {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [utm, setUtm] = useState<UtmValues>(EMPTY_UTM);
  const [copied, setCopied] = useState(false);

  const fullPhone = country.code + phone.replace(/\D/g, "");

  const result = useMemo(
    () => buildWhatsAppLink({ phone: fullPhone, message, websiteUrl, utm }),
    [fullPhone, message, websiteUrl, utm],
  );

  const missingRequired = REQUIRED_UTM.filter((key) => !utm[key].trim());
  const canBuild = phone.trim().length > 0 && message.trim().length > 0;

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const setUtmValue = (key: UtmKey, value: string) =>
    setUtm((prev) => ({ ...prev, [key]: value }));

  // La guía pide minúsculas, sin espacios ni caracteres especiales: se aplica
  // al salir del campo para no pelear con lo que la persona está tipeando.
  const normalizeOnBlur = (key: UtmKey) =>
    setUtm((prev) => ({ ...prev, [key]: normalizeUTMParam(prev[key]) }));

  // El checklist que la guía pide antes de publicar un link, evaluado en vivo.
  const formatOk = UTM_ORDER.every(
    (key) => !utm[key].trim() || utm[key] === normalizeUTMParam(utm[key]),
  );

  const checks = [
    {
      ok: canBuild,
      label: "Teléfono y mensaje",
      detail: "Son lo mínimo para armar el link.",
    },
    {
      ok: result.hasUrl,
      label: "Un link dentro del mensaje",
      detail:
        "Los UTM se cuelgan de una URL. Escribila en el mensaje o completá «URL de la web»: sueltos no miden nada.",
    },
    {
      ok: missingRequired.length === 0,
      label: "Los tres UTM obligatorios",
      detail: `Faltan ${missingRequired.map((key) => `utm_${key}`).join(", ")}.`,
    },
    {
      ok: formatOk,
      label: "Minúsculas, sin espacios ni símbolos",
      detail: "Hay valores fuera de formato; se corrigen al salir del campo.",
    },
  ];

  const isComplete = checks.every((check) => check.ok);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(result.waUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* TopBar (spec §5.9): 64px, blanco, sombra, padding 12/20 */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex min-h-16 max-w-[1280px] items-center px-5 py-3">
          {/* PageHeader (spec §5.15): glifo Regular primary-600 + título */}
          <div className="flex items-center gap-3">
            <Icon name="link" size={24} className="shrink-0 text-primary-600" />
            <div>
              <h1 className="text-3xl font-medium text-strong">Tecnom Link</h1>
              <p className="text-base text-muted">
                Links de WhatsApp con UTM para medir el origen de cada lead
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] p-6">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* ---------- Formulario ---------- */}
          <div className="flex flex-col gap-6">
            <Card
              step={1}
              title="El mensaje"
              description="Lo que el cliente va a enviarle a la concesionaria."
            >
              <div className="flex flex-col gap-5">
                <div>
                  <span className="tds-label">
                    WhatsApp de la concesionaria
                    <span className="text-error-600" title="Obligatorio">
                      {" *"}
                    </span>
                  </span>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="sm:w-[220px]">
                      <CountrySelect value={country} onChange={setCountry} />
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="1123456789"
                      aria-label="Número de teléfono"
                      className="tds-field font-mono"
                    />
                  </div>
                  <span className="tds-helper">
                    Solo números, sin guiones ni espacios.
                  </span>
                </div>

                <label className="block">
                  <span className="tds-label">
                    Mensaje
                    <span className="text-error-600" title="Obligatorio">
                      {" *"}
                    </span>
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hola, quiero más info de este vehículo."
                    className="tds-field"
                  />
                </label>

                <Field
                  label="URL de la web"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  onBlur={(e) => setWebsiteUrl(e.target.value.trim())}
                  placeholder="concesionaria.com.ar/usados/suv-2022"
                  mono
                  hint="Acá se cuelgan los UTM. Si el mensaje ya trae un link, se usa ese."
                />
              </div>
            </Card>

            <Card
              step={2}
              title="Parámetros UTM"
              description="Los cinco de la guía. Los tres primeros son obligatorios."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {UTM_ORDER.map((key) => {
                  const field = UTM_FIELDS[key];
                  const required = REQUIRED_UTM.includes(key);
                  return (
                    <Field
                      key={key}
                      label={`utm_${key}`}
                      required={required}
                      optional={!required}
                      value={utm[key]}
                      onChange={(e) => setUtmValue(key, e.target.value)}
                      onBlur={() => normalizeOnBlur(key)}
                      placeholder={field.placeholder}
                      suggestions={field.suggestions}
                      hint={field.hint}
                      mono
                    />
                  );
                })}
              </div>
            </Card>
          </div>

          {/* ---------- Preview y resultado ---------- */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-6">
            <WhatsAppPreview
              messageText={result.messageText}
              phone={fullPhone}
            />

            <section className="tds-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <StepMarker n={3} />
                <h2 className="flex-1 text-lg font-semibold text-strong">
                  Link generado
                </h2>
                {isComplete && (
                  <span className="tds-chip tds-chip--success">Listo</span>
                )}
              </div>

              <ul className="mb-4 flex flex-col gap-3 rounded-md bg-gray-50 p-3">
                {checks.map((check) => (
                  <Check key={check.label} {...check} />
                ))}
              </ul>

              {canBuild ? (
                <>
                  <p className="rounded-md bg-gray-50 p-3 font-mono text-sm text-strong [overflow-wrap:anywhere]">
                    {result.waUrl}
                  </p>

                  {result.appliedParams.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.appliedParams.map((param) => (
                        <span key={param} className="tds-chip font-mono">
                          {param}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      kind={copied ? "success" : "filled"}
                      onClick={copyUrl}
                      className="flex-1"
                    >
                      {copied ? "Copiado" : "Copiar link"}
                    </Button>
                    <a
                      href={result.waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonClass("outlined")}
                    >
                      Probar
                    </a>
                  </div>
                </>
              ) : (
                <p className="tds-panel p-5 text-center text-base text-muted">
                  Completá el teléfono y el mensaje para generar el link.
                </p>
              )}
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
