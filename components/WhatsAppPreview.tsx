"use client";

import { Icon } from "@/components/ui/Icon";

/**
 * Preview del mensaje tal como le llega al vendedor.
 *
 * Esta superficie imita la UI de WhatsApp a propósito, así que NO usa los
 * tokens del TDS: los colores son los de WhatsApp, puestos literales. El resto
 * de la app sí sigue el TDS.
 */
type Props = {
  /** Texto tal como le llega al vendedor, ya con los UTM aplicados. */
  messageText: string;
  /** Teléfono completo con prefijo, sin "+". */
  phone: string;
};

/** Pinta las URLs del mensaje en azul, como hace WhatsApp. */
function renderWithLinks(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <span
        key={i}
        className="text-[#027eb5] underline [overflow-wrap:anywhere]"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function WhatsAppPreview({ messageText, phone }: Props) {
  const hasMessage = messageText.trim().length > 0;
  const contactName = phone ? `+${phone}` : "Concesionaria";
  const initials = phone ? phone.slice(-2) : "··";

  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[28px] bg-[#111b21] p-2 shadow-lg">
      <div className="overflow-hidden rounded-[22px] bg-white">
        {/* Header del chat */}
        <div className="flex items-center gap-3 bg-[#008069] px-3 py-3">
          <Icon name="chevron-left" size={16} className="text-white" />
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25 text-sm font-medium text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-medium text-white">
              {contactName}
            </p>
            <p className="text-sm text-white/80">en línea</p>
          </div>
        </div>

        {/* Cuerpo del chat */}
        <div className="wa-wallpaper thin-scroll max-h-[420px] min-h-[260px] overflow-y-auto p-3">
          {hasMessage ? (
            <div className="flex justify-end">
              <div className="wa-bubble relative max-w-[85%] px-3 py-2 shadow-sm">
                <p className="whitespace-pre-line text-md text-[#111b21]">
                  {renderWithLinks(messageText)}
                </p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  {/* La hora del prerender no coincide con la del cliente: es
                      cosmética, así que se silencia el aviso de hidratación. */}
                  <span
                    suppressHydrationWarning
                    className="text-xs text-[#667781]"
                  >
                    {new Date().toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <svg
                    viewBox="0 0 16 11"
                    className="h-3 w-4 fill-[#53bdeb]"
                    aria-label="Entregado"
                  >
                    <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.146.47.47 0 0 0-.343.146l-.311.31a.445.445 0 0 0-.14.337c0 .136.047.25.14.343l2.996 2.996a.724.724 0 0 0 .501.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.19-.374z" />
                    <path d="M15.191.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-.927-.878-.763.954 1.062 1.06a.724.724 0 0 0 .501.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.19-.374z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[240px] flex-col items-center justify-center gap-3 text-center">
              <Icon name="comment" size={48} className="text-[#8696a0]" />
              <p className="max-w-[180px] text-md text-[#667781]">
                Escribí el mensaje para ver cómo le llega al cliente
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
