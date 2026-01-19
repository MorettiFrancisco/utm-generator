"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const countries = [
      { code: "1", flag: "🇺🇸", name: "Estados Unidos", label: "+1" },
      { code: "1", flag: "🇨🇦", name: "Canadá", label: "+1" },
      { code: "52", flag: "🇲🇽", name: "México", label: "+52" },
      { code: "501", flag: "🇧🇿", name: "Belice", label: "+501" },
      { code: "502", flag: "🇬🇹", name: "Guatemala", label: "+502" },
      { code: "503", flag: "🇸🇻", name: "El Salvador", label: "+503" },
      { code: "504", flag: "🇭🇳", name: "Honduras", label: "+504" },
      { code: "505", flag: "🇳🇮", name: "Nicaragua", label: "+505" },
      { code: "506", flag: "🇨🇷", name: "Costa Rica", label: "+506" },
      { code: "507", flag: "🇵🇦", name: "Panamá", label: "+507" },
      { code: "549", flag: "🇦🇷", name: "Argentina (Cel)", label: "+54 9" },
      { code: "591", flag: "🇧🇴", name: "Bolivia", label: "+591" },
      { code: "55", flag: "🇧🇷", name: "Brasil", label: "+55" },
      { code: "56", flag: "🇨🇱", name: "Chile", label: "+56" },
      { code: "57", flag: "🇨🇴", name: "Colombia", label: "+57" },
      { code: "593", flag: "🇪🇨", name: "Ecuador", label: "+593" },
      { code: "592", flag: "🇬🇾", name: "Guyana", label: "+592" },
      { code: "595", flag: "🇵🇾", name: "Paraguay", label: "+595" },
      { code: "51", flag: "🇵🇪", name: "Perú", label: "+51" },
      { code: "597", flag: "🇸🇷", name: "Surinam", label: "+597" },
      { code: "598", flag: "🇺🇾", name: "Uruguay", label: "+598" },
      { code: "58", flag: "🇻🇪", name: "Venezuela", label: "+58" },
      { code: "1264", flag: "🇦🇮", name: "Anguila", label: "+1-264" },
      { code: "1268", flag: "🇦🇬", name: "Antigua y Barbuda", label: "+1-268" },
      { code: "297", flag: "🇦🇼", name: "Aruba", label: "+297" },
      { code: "1242", flag: "🇧🇸", name: "Bahamas", label: "+1-242" },
      { code: "1246", flag: "🇧🇧", name: "Barbados", label: "+1-246" },
      { code: "1441", flag: "🇧🇲", name: "Bermudas", label: "+1-441" },
      { code: "599", flag: "🇧🇶", name: "Bonaire", label: "+599" },
      { code: "1345", flag: "🇰🇾", name: "Islas Caimán", label: "+1-345" },
      { code: "53", flag: "🇨🇺", name: "Cuba", label: "+53" },
      { code: "599", flag: "🇨🇼", name: "Curazao", label: "+599" },
      { code: "1767", flag: "🇩🇲", name: "Dominica", label: "+1-767" },
      { code: "1809", flag: "🇩🇴", name: "Rep. Dominicana", label: "+1-809" },
      { code: "1473", flag: "🇬🇩", name: "Granada", label: "+1-473" },
      { code: "590", flag: "🇬🇵", name: "Guadalupe", label: "+590" },
      { code: "509", flag: "🇭🇹", name: "Haití", label: "+509" },
      { code: "1876", flag: "🇯🇲", name: "Jamaica", label: "+1-876" },
      { code: "596", flag: "🇲🇶", name: "Martinica", label: "+596" },
      { code: "1664", flag: "🇲🇸", name: "Montserrat", label: "+1-664" },
      { code: "1787", flag: "🇵🇷", name: "Puerto Rico", label: "+1-787" },
      {
        code: "1869",
        flag: "🇰🇳",
        name: "San Cristóbal y Nieves",
        label: "+1-869",
      },
      { code: "1758", flag: "🇱🇨", name: "Santa Lucía", label: "+1-758" },
      {
        code: "1784",
        flag: "🇻🇨",
        name: "San Vicente y las Granadinas",
        label: "+1-784",
      },
      { code: "1721", flag: "🇸🇽", name: "San Martín", label: "+1-721" },
      { code: "1868", flag: "🇹🇹", name: "Trinidad y Tobago", label: "+1-868" },
      {
        code: "1649",
        flag: "🇹🇨",
        name: "Islas Turcas y Caicos",
        label: "+1-649",
      },
      {
        code: "1340",
        flag: "🇻🇮",
        name: "Islas Vírgenes (EE.UU.)",
        label: "+1-340",
      },
    ];

    const wrapper = document.getElementById("customSelect");
    const trigger = wrapper?.querySelector(".custom-select-trigger");
    const optionsList = document.getElementById("optionsList");
    const searchInput = document.getElementById(
      "countrySearch",
    ) as HTMLInputElement | null;
    const realInput = document.getElementById(
      "country-code",
    ) as HTMLInputElement | null;
    const selectedFlag = document.getElementById("selected-flag");
    const selectedCode = document.getElementById("selected-code");

    if (
      !wrapper ||
      !trigger ||
      !optionsList ||
      !searchInput ||
      !realInput ||
      !selectedFlag ||
      !selectedCode
    ) {
      return;
    }

    const normalizeUrl = (url: string) => {
      if (!url || !url.trim()) return "";
      let normalizedUrl = url.trim();
      if (!normalizedUrl.match(/^https?:\/\//i)) {
        normalizedUrl = "https://" + normalizedUrl;
      }
      return normalizedUrl;
    };

    const normalizeUTMParam = (value: string) => {
      if (!value || !value.trim()) return "";
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_-]/g, "_");
    };

    const constructWhatsAppURL = (params: {
      phone: string;
      fullMessage: string;
      websiteUrl: string;
      utm_source: string;
      utm_medium: string;
      utm_campaign: string;
    }) => {
      let fullMessage = params.fullMessage;
      const websiteUrl = normalizeUrl(params.websiteUrl);
      const urlRegex = /https?:\/\/[^\s]+/g;
      let urlMatches: string[] | null = fullMessage.match(urlRegex);

      if (urlMatches) {
        urlMatches = urlMatches.map((url) => normalizeUrl(url));
        let tempMessage = fullMessage;
        const originalUrls = fullMessage.match(urlRegex);
        if (originalUrls) {
          originalUrls.forEach((originalUrl, index) => {
            tempMessage = tempMessage.replace(originalUrl, urlMatches![index]);
          });
          fullMessage = tempMessage;
        }
      }

      if ((!urlMatches || urlMatches.length === 0) && websiteUrl) {
        fullMessage += "\n\n" + websiteUrl;
        urlMatches = [websiteUrl];
      }

      if (urlMatches && urlMatches.length > 0) {
        const originalUrl = urlMatches[urlMatches.length - 1];
        const utmParams: string[] = [];
        const normalizedSource = normalizeUTMParam(params.utm_source);
        const normalizedMedium = normalizeUTMParam(params.utm_medium);
        const normalizedCampaign = normalizeUTMParam(params.utm_campaign);

        if (normalizedSource) utmParams.push(`utm_source=${normalizedSource}`);
        if (normalizedMedium) utmParams.push(`utm_medium=${normalizedMedium}`);
        if (normalizedCampaign)
          utmParams.push(`utm_campaign=${normalizedCampaign}`);

        if (utmParams.length > 0) {
          const separator = originalUrl.includes("?") ? "&" : "?";
          const urlWithUTM = originalUrl + separator + utmParams.join("&");
          const messageWithUTM = fullMessage.replace(originalUrl, urlWithUTM);
          const encodedMessage = encodeURIComponent(messageWithUTM);
          return `https://wa.me/${params.phone}?text=${encodedMessage}`;
        }
      }

      const encodedMessage = encodeURIComponent(fullMessage);
      return `https://wa.me/${params.phone}?text=${encodedMessage}`;
    };

    const updatePreview = () => {
      const countryCode =
        (document.getElementById("country-code") as HTMLInputElement | null)
          ?.value || "";
      const phoneNumber =
        (document.getElementById("phone") as HTMLInputElement | null)?.value ||
        "";
      const fullPhone = countryCode + phoneNumber;

      const params = {
        phone: fullPhone,
        fullMessage:
          (document.getElementById("fullMessage") as HTMLTextAreaElement | null)
            ?.value || "",
        websiteUrl:
          (document.getElementById("websiteUrl") as HTMLInputElement | null)
            ?.value || "",
        utm_source:
          (document.getElementById("utm_source") as HTMLInputElement | null)
            ?.value || "",
        utm_medium:
          (document.getElementById("utm_medium") as HTMLInputElement | null)
            ?.value || "",
        utm_campaign:
          (document.getElementById("utm_campaign") as HTMLInputElement | null)
            ?.value || "",
      };

      const url = constructWhatsAppURL(params);
      const contactName = params.phone ? params.phone.slice(-4) : "AUTO";
      const contactAvatar = document.getElementById("contactAvatar");
      if (contactAvatar) contactAvatar.textContent = contactName.slice(0, 2);

      const messageContainer = document.getElementById("messageContainer");
      if (!params.fullMessage.trim()) {
        if (messageContainer) {
          messageContainer.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-icon">🚗</div>
                            <p>Escribe un mensaje para ver cómo se verá en WhatsApp</p>
                        </div>
                    `;
        }
        const resultSection = document.getElementById("resultSection");
        if (resultSection) resultSection.style.display = "none";
        return;
      }

      const fullText = params.fullMessage;
      const urlRegex = /https?:\/\/[^\s]+/g;
      let urlMatches: string[] | null = fullText.match(urlRegex);
      let hasUrl = urlMatches && urlMatches.length > 0;

      if (!hasUrl && params.websiteUrl.trim()) {
        const normalizedWebUrl = normalizeUrl(params.websiteUrl.trim());
        if (normalizedWebUrl) {
          urlMatches = [normalizedWebUrl];
          hasUrl = true;
        }
      } else if (hasUrl && urlMatches) {
        urlMatches = urlMatches.map((url) => normalizeUrl(url));
      }

      const lines = fullText.split("\n").filter((line) => line.trim());
      const messageText = lines[0] || "";
      const textWithoutUrl = fullText.replace(urlRegex, "").trim();
      const vehicleLines = textWithoutUrl
        .split("\n")
        .filter((line) => line.trim());

      let linkTitle = "Vehículo Disponible";
      let linkDescription = "Ver detalles, precio y financiación";

      if (vehicleLines.length > 1) {
        const vehicleLine =
          vehicleLines.find(
            (line) =>
              line.toLowerCase().includes("toyota") ||
              line.toLowerCase().includes("ford") ||
              line.toLowerCase().includes("chevrolet") ||
              line.toLowerCase().includes("volkswagen") ||
              line.toLowerCase().includes("fiat") ||
              line.toLowerCase().includes("peugeot") ||
              line.toLowerCase().includes("renault") ||
              line.includes("2020") ||
              line.includes("2021") ||
              line.includes("2022") ||
              line.includes("2023") ||
              line.includes("2024") ||
              line.toLowerCase().includes("automático") ||
              line.toLowerCase().includes("manual"),
          ) || vehicleLines[1];

        if (vehicleLine) {
          linkTitle = vehicleLine;
          linkDescription =
            vehicleLines.slice(2).join(" - ").substring(0, 100) ||
            linkDescription;
        }
      }

      const currentTime = new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
      let linkPreviewHTML = "";
      if (hasUrl && urlMatches) {
        let domain = "concesionaria.com";
        try {
          domain = new URL(urlMatches[urlMatches.length - 1]).hostname;
        } catch {
          // ignore
        }

        linkPreviewHTML = `
                    <div class="link-preview">
                        <div class="link-preview-image">🚘</div>
                        <div class="link-preview-content">
                            <div class="link-preview-title">${linkTitle}</div>
                            <div class="link-preview-description">${linkDescription}</div>
                            <div class="link-preview-url">${domain}</div>
                        </div>
                    </div>
                `;
      }

      if (messageContainer) {
        messageContainer.innerHTML = `
                    <div class="message-container">
                        <div class="message-bubble">
                            <div class="message-text">${messageText}</div>
                            ${linkPreviewHTML}
                            <div class="message-time">
                                ${currentTime}
                                <svg class="message-status" viewBox="0 0 16 11" fill="currentColor">
                                    <path d="M11.071.643a1 1 0 0 1 1.414 0l3.54 3.536a1 1 0 0 1 0 1.414l-7.07 7.071a1 1 0 0 1-1.415 0L3.07 8.196a1 1 0 1 1 1.414-1.414L8 10.268l6.657-6.625a.502.502 0 0 1 .414 0z"/>
                                    <path d="M6.071.643a1 1 0 0 1 1.414 0l3.54 3.536a1 1 0 0 1 0 1.414l-7.07 7.071a1 1 0 0 1-1.415 0L-1.93 8.196a1 1 0 1 1 1.414-1.414L3 10.268l6.657-6.625a.502.502 0 0 1 .414 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                `;
      }

      const urlDisplay = document.getElementById("urlDisplay");
      const resultSection = document.getElementById("resultSection");
      if (phoneNumber.trim() && params.fullMessage.trim()) {
        if (urlDisplay) urlDisplay.textContent = url;
        if (resultSection) resultSection.style.display = "block";
      } else if (resultSection) {
        resultSection.style.display = "none";
      }
    };

    const renderOptions = (filterText = "") => {
      optionsList.innerHTML = "";
      const filtered = countries.filter(
        (c) =>
          c.name.toLowerCase().includes(filterText.toLowerCase()) ||
          c.label.includes(filterText),
      );

      if (filtered.length === 0) {
        optionsList.innerHTML =
          '<div style="padding:10px; color:rgba(255,255,255,0.5); font-size:12px;">No encontrado</div>';
        return;
      }

      filtered.forEach((country) => {
        const div = document.createElement("div");
        div.className = `custom-option ${
          country.code === realInput.value ? "selected" : ""
        }`;
        div.innerHTML = `<span style="font-size:1.2rem">${country.flag}</span> <span>${country.name}</span> <span style="margin-left:auto; opacity:0.6; font-size:11px;">${country.label}</span>`;
        div.addEventListener("click", () => {
          realInput.value = country.code;
          selectedFlag.textContent = country.flag;
          selectedCode.textContent = country.label;
          wrapper.classList.remove("open");
          renderOptions();
          updatePreview();
        });
        optionsList.appendChild(div);
      });
    };

    trigger.addEventListener("click", () => {
      wrapper.classList.toggle("open");
      if (wrapper.classList.contains("open")) {
        searchInput.value = "";
        renderOptions();
        setTimeout(() => searchInput.focus(), 100);
      }
    });

    searchInput.addEventListener("input", (e) => {
      renderOptions((e.target as HTMLInputElement).value);
    });

    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target as Node)) {
        wrapper.classList.remove("open");
      }
    });

    const websiteUrlInput = document.getElementById(
      "websiteUrl",
    ) as HTMLInputElement | null;
    websiteUrlInput?.addEventListener("blur", function () {
      const normalizedUrl = normalizeUrl(this.value);
      if (normalizedUrl !== this.value && normalizedUrl) {
        this.value = normalizedUrl;
        updatePreview();
      }
    });

    ["utm_source", "utm_medium", "utm_campaign"].forEach((fieldId) => {
      const input = document.getElementById(fieldId) as HTMLInputElement | null;
      input?.addEventListener("blur", function () {
        const normalizedValue = normalizeUTMParam(this.value);
        if (normalizedValue !== this.value) {
          this.value = normalizedValue;
          updatePreview();
        }
      });
    });

    document.querySelectorAll("input, textarea").forEach((input) => {
      if ((input as HTMLElement).id === "countrySearch") return;
      input.addEventListener("input", updatePreview);
      input.addEventListener("keyup", updatePreview);
      input.addEventListener("change", updatePreview);
      input.addEventListener("paste", () => setTimeout(updatePreview, 10));
    });

    const copyBtn = document.getElementById("copyBtn");
    copyBtn?.addEventListener("click", () => {
      const urlText = document.getElementById("urlDisplay")?.textContent || "";
      navigator.clipboard.writeText(urlText).then(() => {
        const btn = document.getElementById("copyBtn");
        if (btn) {
          const originalText = btn.textContent;
          btn.textContent = "✅ ¡Copiado!";
          btn.setAttribute("style", "background: #28a745;");
          setTimeout(() => {
            btn.textContent = originalText;
            btn.setAttribute("style", "");
          }, 2000);
        }
      });
    });

    const testBtn = document.getElementById("testBtn");
    testBtn?.addEventListener("click", () => {
      const urlText = document.getElementById("urlDisplay")?.textContent || "";
      window.open(urlText, "_blank");
    });

    renderOptions();
    updatePreview();
  }, []);
  return (
    <>
      <div className="main-container">
        <div className="constructor-section">
          <div className="hero-section">
            <h1 className="hero-title">Tecnom Link</h1>
            <p className="hero-subtitle">
              Constructor de URLs WhatsApp para Concesionarias - Conecta con tus
              clientes al instante
            </p>
          </div>

          <div className="constructor-card">
            <form id="whatsappForm">
              <div className="form-section">
                <div className="section-title">
                  🚗 Información de la Concesionaria
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    WHATSAPP DE LA CONCESIONARIA
                  </label>

                  <div className="phone-input-group">
                    <input type="hidden" id="country-code" value="549" />

                    <div className="custom-select-wrapper" id="customSelect">
                      <div className="custom-select-trigger">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <span id="selected-flag">🇦🇷</span>
                          <span id="selected-code">+54 9</span>
                        </div>
                        <span className="arrow">▼</span>
                      </div>
                      <div className="custom-options">
                        <div className="select-search-container">
                          <input
                            type="text"
                            className="select-search"
                            placeholder="Buscar país..."
                            id="countrySearch"
                          />
                        </div>
                        <div className="options-list" id="optionsList"></div>
                      </div>
                    </div>

                    <input
                      type="tel"
                      id="phone"
                      className="form-input phone-input-split"
                      placeholder="Ej: 1123456789"
                      maxLength={15}
                      inputMode="numeric"
                      onInput={(event) => {
                        const target = event.currentTarget;
                        target.value = target.value.replace(/[^0-9]/g, "");
                      }}
                    />
                  </div>
                  <small
                    style={{
                      color: "var(--celeste-secundario)",
                      opacity: 0.7,
                      fontSize: "12px",
                      marginTop: "5px",
                      display: "block",
                    }}
                  >
                    * Solo números, sin guiones ni espacios.
                  </small>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="fullMessage">
                    MENSAJE COMPLETO
                  </label>
                  <textarea
                    id="fullMessage"
                    className="form-textarea"
                    placeholder="Hola, quiero mas info de EL MODELO."
                    rows={8}
                  ></textarea>
                </div>
              </div>

              <div className="url-section">
                <div className="section-title">⚙️ Configuración</div>

                <div className="form-group">
                  <label className="form-label" htmlFor="websiteUrl">
                    URL de la Web
                  </label>
                  <input
                    type="text"
                    id="websiteUrl"
                    className="form-input"
                    placeholder="concesionaria-premium.com"
                  />
                </div>

                <div className="utm-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="utm_source">
                      UTM_SOURCE
                    </label>
                    <label className="form-label">
                      (lo vas a ver como origen de Tecnom Sales)
                    </label>
                    <input
                      type="text"
                      id="utm_source"
                      className="form-input"
                      placeholder="web_site"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="utm_medium">
                      UTM_MEDIUM
                    </label>
                    <label className="form-label">
                      (lo vas a ver como medio en Tecnom Sales)
                    </label>
                    <input
                      type="text"
                      id="utm_medium"
                      className="form-input"
                      placeholder="whatsapp"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="utm_campaign">
                      UTM_CAMPAIGN
                    </label>
                    <label className="form-label">
                      (lo vas a ver como campaña en Tecnom Sales)
                    </label>
                    <input
                      type="text"
                      id="utm_campaign"
                      className="form-input"
                      placeholder="promo_enero"
                    />
                  </div>
                </div>
              </div>
            </form>

            <div id="resultSection" className="result-section">
              <div className="result-title">✅ URL Generada</div>
              <div id="urlDisplay" className="url-display"></div>
              <button id="copyBtn" className="copy-btn">
                📋 Copiar URL
              </button>
              <button id="testBtn" className="test-btn">
                🧪 Probar en WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="preview-section">
          <div className="whatsapp-preview">
            <div className="phone-frame">
              <div className="volume-up"></div>
              <div className="power-button"></div>
              <div className="phone-screen">
                <div className="status-bar">
                  <div className="status-left">
                    <span>9:41</span>
                  </div>
                  <div className="status-right">
                    <div className="signal-bars">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="wifi-icon"></div>
                    <div className="battery"></div>
                  </div>
                </div>

                <div className="chat-header">
                  <div className="back-arrow">←</div>
                  <div className="contact-avatar" id="contactAvatar">
                    CO
                  </div>
                  <div className="contact-info">
                    <div className="contact-name">Concesionaria Premium</div>
                    <div className="contact-status">en línea</div>
                  </div>
                  <div className="header-icons">
                    <span>📞</span>
                    <span>⋮</span>
                  </div>
                </div>

                <div className="chat-body">
                  <div id="messageContainer" className="empty-state">
                    <div className="empty-icon">🚗</div>
                    <p>Escribe un mensaje para ver cómo se verá en WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
