/**
 * Armado del link de WhatsApp con UTMs.
 *
 * Regla de oro: los UTM van pegados a una URL DENTRO del mensaje, nunca como
 * texto suelto. Si el mensaje no lleva ningún link, no hay nada que medir.
 * Ver la guía: https://intercom.help/tecnom/es/articles/13514765-guia-de-parametros-utm
 */

export const GUIDE_URL =
  "https://intercom.help/tecnom/es/articles/13514765-guia-de-parametros-utm";

export type UtmKey = "source" | "medium" | "campaign" | "term" | "content";

export type UtmValues = Record<UtmKey, string>;

export const EMPTY_UTM: UtmValues = {
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
};

/** Orden en que la guía los lista, y en que se escriben en la URL. */
export const UTM_ORDER: UtmKey[] = [
  "source",
  "medium",
  "campaign",
  "term",
  "content",
];

/** Los tres que la guía marca como obligatorios para un buen tracking. */
export const REQUIRED_UTM: UtmKey[] = ["source", "medium", "campaign"];

/** Valores recomendados por la guía (lista cerrada para medium). */
export const RECOMMENDED_MEDIUMS = [
  "cpc",
  "email",
  "social",
  "referral",
  "display",
];

/** Fuentes habituales de la industria automotriz, según la guía. */
export const RECOMMENDED_SOURCES = [
  "web",
  "facebook",
  "instagram",
  "google",
  "mercadolibre",
  "autocosmos",
  "whatsapp",
  "email_ventas",
];

export function normalizeUrl(url: string): string {
  if (!url || !url.trim()) return "";
  let normalizedUrl = url.trim();
  if (!normalizedUrl.match(/^https?:\/\//i)) {
    normalizedUrl = "https://" + normalizedUrl;
  }
  return normalizedUrl;
}

/**
 * Reglas de la guía: todo en minúsculas, sin espacios (guión bajo) y sin
 * caracteres especiales.
 */
export function normalizeUTMParam(value: string): string {
  if (!value || !value.trim()) return "";
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "_");
}

export type BuildInput = {
  phone: string;
  message: string;
  websiteUrl: string;
  utm: UtmValues;
};

export type BuildResult = {
  /** El link de WhatsApp listo para pegar. */
  waUrl: string;
  /** El texto tal como le llega al vendedor, ya con los UTM aplicados. */
  messageText: string;
  /** La URL del mensaje con los UTM pegados, si hubo alguna. */
  taggedUrl: string | null;
  /** false cuando no hay ninguna URL donde colgar los UTM. */
  hasUrl: boolean;
  /** Los pares `utm_x=valor` que se aplicaron, en orden. */
  appliedParams: string[];
};

export function buildWhatsAppLink({
  phone,
  message,
  websiteUrl,
  utm,
}: BuildInput): BuildResult {
  let fullMessage = message;
  const normalizedWebsite = normalizeUrl(websiteUrl);
  const urlRegex = /https?:\/\/[^\s]+/g;
  let urlMatches: string[] | null = fullMessage.match(urlRegex);

  // Normaliza las URLs que ya venían escritas en el mensaje.
  if (urlMatches) {
    const originalUrls = [...urlMatches];
    urlMatches = urlMatches.map(normalizeUrl);
    originalUrls.forEach((originalUrl, index) => {
      fullMessage = fullMessage.replace(originalUrl, urlMatches![index]);
    });
  }

  // Si el mensaje no trae link, se le agrega el de la web al final.
  if ((!urlMatches || urlMatches.length === 0) && normalizedWebsite) {
    fullMessage += "\n\n" + normalizedWebsite;
    urlMatches = [normalizedWebsite];
  }

  const hasUrl = Boolean(urlMatches && urlMatches.length > 0);
  const appliedParams: string[] = [];

  if (urlMatches && urlMatches.length > 0) {
    // Los UTM van en la última URL del mensaje: es la que el cliente abre.
    const originalUrl = urlMatches[urlMatches.length - 1];

    for (const key of UTM_ORDER) {
      const normalized = normalizeUTMParam(utm[key]);
      if (normalized) appliedParams.push(`utm_${key}=${normalized}`);
    }

    if (appliedParams.length > 0) {
      const separator = originalUrl.includes("?") ? "&" : "?";
      const taggedUrl = originalUrl + separator + appliedParams.join("&");
      const messageWithUTM = fullMessage.replace(originalUrl, taggedUrl);
      return {
        waUrl: `https://wa.me/${phone}?text=${encodeURIComponent(messageWithUTM)}`,
        messageText: messageWithUTM,
        taggedUrl,
        hasUrl,
        appliedParams,
      };
    }
  }

  return {
    waUrl: `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`,
    messageText: fullMessage,
    taggedUrl: null,
    hasUrl,
    appliedParams,
  };
}
