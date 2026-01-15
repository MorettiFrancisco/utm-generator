
 const countries = [
     // América del Norte
     { code: '1', flag: '🇺🇸', name: 'Estados Unidos', label: '+1' },
     { code: '1', flag: '🇨🇦', name: 'Canadá', label: '+1' },
     { code: '52', flag: '🇲🇽', name: 'México', label: '+52' },
     
     // América Central
     { code: '501', flag: '🇧🇿', name: 'Belice', label: '+501' },
     { code: '502', flag: '🇬🇹', name: 'Guatemala', label: '+502' },
     { code: '503', flag: '🇸🇻', name: 'El Salvador', label: '+503' },
     { code: '504', flag: '🇭🇳', name: 'Honduras', label: '+504' },
     { code: '505', flag: '🇳🇮', name: 'Nicaragua', label: '+505' },
     { code: '506', flag: '🇨🇷', name: 'Costa Rica', label: '+506' },
     { code: '507', flag: '🇵🇦', name: 'Panamá', label: '+507' },
     
     // América del Sur
     { code: '549', flag: '🇦🇷', name: 'Argentina (Cel)', label: '+54 9' },
     { code: '591', flag: '🇧🇴', name: 'Bolivia', label: '+591' },
     { code: '55', flag: '🇧🇷', name: 'Brasil', label: '+55' },
     { code: '56', flag: '🇨🇱', name: 'Chile', label: '+56' },
     { code: '57', flag: '🇨🇴', name: 'Colombia', label: '+57' },
     { code: '593', flag: '🇪🇨', name: 'Ecuador', label: '+593' },
     { code: '592', flag: '🇬🇾', name: 'Guyana', label: '+592' },
     { code: '595', flag: '🇵🇾', name: 'Paraguay', label: '+595' },
     { code: '51', flag: '🇵🇪', name: 'Perú', label: '+51' },
     { code: '597', flag: '🇸🇷', name: 'Surinam', label: '+597' },
     { code: '598', flag: '🇺🇾', name: 'Uruguay', label: '+598' },
     { code: '58', flag: '🇻🇪', name: 'Venezuela', label: '+58' },
     
     // Caribe
     { code: '1264', flag: '🇦🇮', name: 'Anguila', label: '+1-264' },
     { code: '1268', flag: '🇦🇬', name: 'Antigua y Barbuda', label: '+1-268' },
     { code: '297', flag: '🇦🇼', name: 'Aruba', label: '+297' },
     { code: '1242', flag: '🇧🇸', name: 'Bahamas', label: '+1-242' },
     { code: '1246', flag: '🇧🇧', name: 'Barbados', label: '+1-246' },
     { code: '1441', flag: '🇧🇲', name: 'Bermudas', label: '+1-441' },
     { code: '599', flag: '🇧🇶', name: 'Bonaire', label: '+599' },
     { code: '1345', flag: '🇰🇾', name: 'Islas Caimán', label: '+1-345' },
     { code: '53', flag: '🇨🇺', name: 'Cuba', label: '+53' },
     { code: '599', flag: '🇨🇼', name: 'Curazao', label: '+599' },
     { code: '1767', flag: '🇩🇲', name: 'Dominica', label: '+1-767' },
     { code: '1809', flag: '🇩🇴', name: 'Rep. Dominicana', label: '+1-809' },
     { code: '1473', flag: '🇬🇩', name: 'Granada', label: '+1-473' },
     { code: '590', flag: '🇬🇵', name: 'Guadalupe', label: '+590' },
     { code: '509', flag: '🇭🇹', name: 'Haití', label: '+509' },
     { code: '1876', flag: '🇯🇲', name: 'Jamaica', label: '+1-876' },
     { code: '596', flag: '🇲🇶', name: 'Martinica', label: '+596' },
     { code: '1664', flag: '🇲🇸', name: 'Montserrat', label: '+1-664' },
     { code: '1787', flag: '🇵🇷', name: 'Puerto Rico', label: '+1-787' },
     { code: '1869', flag: '🇰🇳', name: 'San Cristóbal y Nieves', label: '+1-869' },
     { code: '1758', flag: '🇱🇨', name: 'Santa Lucía', label: '+1-758' },
     { code: '1784', flag: '🇻🇨', name: 'San Vicente y las Granadinas', label: '+1-784' },
     { code: '1721', flag: '🇸🇽', name: 'San Martín', label: '+1-721' },
     { code: '1868', flag: '🇹🇹', name: 'Trinidad y Tobago', label: '+1-868' },
     { code: '1649', flag: '🇹🇨', name: 'Islas Turcas y Caicos', label: '+1-649' },
     { code: '1340', flag: '🇻🇮', name: 'Islas Vírgenes (EE.UU.)', label: '+1-340' }
 ];

 const wrapper = document.getElementById('customSelect');
 const trigger = wrapper.querySelector('.custom-select-trigger');
 const optionsList = document.getElementById('optionsList');
 const searchInput = document.getElementById('countrySearch');
 const realInput = document.getElementById('country-code');
 const selectedFlag = document.getElementById('selected-flag');
 const selectedCode = document.getElementById('selected-code');

 export function renderOptions(filterText = '') {
     optionsList.innerHTML = '';
     const filtered = countries.filter(c => 
         c.name.toLowerCase().includes(filterText.toLowerCase()) || 
         c.label.includes(filterText)
     );

     if (filtered.length === 0) {
         optionsList.innerHTML = '<div style="padding:10px; color:rgba(255,255,255,0.5); font-size:12px;">No encontrado</div>';
         return;
     }

     filtered.forEach(country => {
         const div = document.createElement('div');
         div.className = `custom-option ${country.code === realInput.value ? 'selected' : ''}`;
         div.innerHTML = `<span style="font-size:1.2rem">${country.flag}</span> <span>${country.name}</span> <span style="margin-left:auto; opacity:0.6; font-size:11px;">${country.label}</span>`;
         
         div.addEventListener('click', () => {
             selectCountry(country);
         });
         optionsList.appendChild(div);
     });
 }

 export function selectCountry(country) {
     realInput.value = country.code;
     selectedFlag.textContent = country.flag;
     selectedCode.textContent = country.label;
     wrapper.classList.remove('open');
     renderOptions();
     updatePreview(); 
 }

 trigger.addEventListener('click', () => {
     wrapper.classList.toggle('open');
     if(wrapper.classList.contains('open')) {
         searchInput.value = '';
         renderOptions();
         setTimeout(() => searchInput.focus(), 100);
     }
 });

 searchInput.addEventListener('input', (e) => {
     renderOptions(e.target.value);
 });

 document.addEventListener('click', (e) => {
     if (!wrapper.contains(e.target)) {
         wrapper.classList.remove('open');
     }
 });

 renderOptions(); 

 // --- LOGICA DE AUTOLINK PRO ---

 export function normalizeUrl(url) {
     if (!url || !url.trim()) return '';
     let normalizedUrl = url.trim();
     if (!normalizedUrl.match(/^https?:\/\//i)) {
         normalizedUrl = 'https://' + normalizedUrl;
     }
     return normalizedUrl;
 }

export function normalizeUTMParam(value) {
     if (!value || !value.trim()) return '';
     return value.trim()
         .toLowerCase()                    // Convertir a minúsculas
         .replace(/\s+/g, '_')             // Reemplazar espacios con guiones bajos
         .replace(/[^a-z0-9_-]/g, '_');    // Reemplazar caracteres especiales con guiones bajos
 }

 export function constructWhatsAppURL(params) {
     let fullMessage = params.fullMessage;
     let websiteUrl = normalizeUrl(params.websiteUrl);
     const urlRegex = /https?:\/\/[^\s]+/g;
     let urlMatches = fullMessage.match(urlRegex);
     
     if (urlMatches) {
         urlMatches = urlMatches.map(url => normalizeUrl(url));
         let tempMessage = fullMessage;
         const originalUrls = fullMessage.match(urlRegex);
         if (originalUrls) {
             originalUrls.forEach((originalUrl, index) => {
                 tempMessage = tempMessage.replace(originalUrl, urlMatches[index]);
             });
             fullMessage = tempMessage;
         }
     }
     
     if ((!urlMatches || urlMatches.length === 0) && websiteUrl) {
         fullMessage += '\n\n' + websiteUrl;
         urlMatches = [websiteUrl];
     }
     
     if (urlMatches && urlMatches.length > 0) {
         const originalUrl = urlMatches[urlMatches.length - 1];
         const utmParams = [];
         const normalizedSource = normalizeUTMParam(params.utm_source);
         const normalizedMedium = normalizeUTMParam(params.utm_medium);
         const normalizedCampaign = normalizeUTMParam(params.utm_campaign);
         const normalizedTerm = normalizeUTMParam(params.utm_term);
         const normalizedContent = normalizeUTMParam(params.utm_content);
         
         if (normalizedSource) utmParams.push(`utm_source=${normalizedSource}`);
         if (normalizedMedium) utmParams.push(`utm_medium=${normalizedMedium}`);
         if (normalizedCampaign) utmParams.push(`utm_campaign=${normalizedCampaign}`);
         if (normalizedTerm) utmParams.push(`utm_term=${normalizedTerm}`);
         if (normalizedContent) utmParams.push(`utm_content=${normalizedContent}`);
         
         if (utmParams.length > 0) {
             const separator = originalUrl.includes('?') ? '&' : '?';
             const urlWithUTM = originalUrl + separator + utmParams.join('&');
             const messageWithUTM = fullMessage.replace(originalUrl, urlWithUTM);
             const encodedMessage = encodeURIComponent(messageWithUTM);
             return `https://wa.me/${params.phone}?text=${encodedMessage}`;
         }
     }
     
     const encodedMessage = encodeURIComponent(fullMessage);
     return `https://wa.me/${params.phone}?text=${encodedMessage}`;
 }

 export function updatePreview() {
     const countryCode = document.getElementById('country-code').value;
     const phoneNumber = document.getElementById('phone').value;
     const fullPhone = countryCode + phoneNumber;
    
     const params = {
         phone: fullPhone,
         fullMessage: document.getElementById('fullMessage').value,
         websiteUrl: document.getElementById('websiteUrl').value,
         utm_source: document.getElementById('utm_source').value,
         utm_medium: document.getElementById('utm_medium').value,
         utm_campaign: document.getElementById('utm_campaign').value
     };
     
     const url = constructWhatsAppURL(params);
     
     const contactName = params.phone ? params.phone.slice(-4) : 'AUTO';
     document.getElementById('contactAvatar').textContent = contactName.slice(0, 2);
     
     if (!params.fullMessage.trim()) {
         document.getElementById('messageContainer').innerHTML = `
             <div className="empty-state">
                 <div className="empty-icon">🚗</div>
                 <p>Escribe un mensaje para ver cómo se verá en WhatsApp</p>
             </div>
         `;
         document.getElementById('resultSection').style.display = 'none';
         return;
     }
     
     const fullText = params.fullMessage;
     const urlRegex = /https?:\/\/[^\s]+/g;
     let urlMatches = fullText.match(urlRegex);
     let hasUrl = urlMatches && urlMatches.length > 0;
     
     if (!hasUrl && params.websiteUrl.trim()) {
         const normalizedWebUrl = normalizeUrl(params.websiteUrl.trim());
         if (normalizedWebUrl) {
             urlMatches = [normalizedWebUrl];
             hasUrl = true;
         }
     } else if (hasUrl && urlMatches) {
         urlMatches = urlMatches.map(url => normalizeUrl(url));
     }
     
     const lines = fullText.split('\n').filter(line => line.trim());
     const messageText = lines[0] || '';
     const textWithoutUrl = fullText.replace(urlRegex, '').trim();
     const vehicleLines = textWithoutUrl.split('\n').filter(line => line.trim());
     
     let linkTitle = 'Vehículo Disponible';
     let linkDescription = 'Ver detalles, precio y financiación';
     
     if (vehicleLines.length > 1) {
         const vehicleLine = vehicleLines.find(line => 
             line.toLowerCase().includes('toyota') || 
             line.toLowerCase().includes('ford') ||
             line.toLowerCase().includes('chevrolet') ||
             line.toLowerCase().includes('volkswagen') ||
             line.toLowerCase().includes('fiat') ||
             line.toLowerCase().includes('peugeot') ||
             line.toLowerCase().includes('renault') ||
             line.includes('2020') || line.includes('2021') ||
             line.includes('2022') || line.includes('2023') ||
             line.includes('2024') ||
             line.toLowerCase().includes('automático') ||
             line.toLowerCase().includes('manual')
         ) || vehicleLines[1];
         
         if (vehicleLine) {
             linkTitle = vehicleLine;
             linkDescription = vehicleLines.slice(2).join(' - ').substring(0, 100) || 'Ver detalles, precio y financiación';
         }
     }
     
     const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
     const messageContainer = document.getElementById('messageContainer');
     
     let linkPreviewHTML = '';
    if (hasUrl) {
        let domain = 'concesionaria.com';
        try { domain = new URL(urlMatches[urlMatches.length - 1]).hostname; } catch { }
         
         linkPreviewHTML = `
             <div className="link-preview">
                 <div className="link-preview-image">🚘</div>
                 <div className="link-preview-content">
                     <div className="link-preview-title">${linkTitle}</div>
                     <div className="link-preview-description">${linkDescription}</div>
                     <div className="link-preview-url">${domain}</div>
                 </div>
             </div>
         `;
     }
     
     messageContainer.innerHTML = `
         <div className="message-container">
             <div className="message-bubble">
                 <div className="message-text">${messageText}</div>
                 ${linkPreviewHTML}
                 <div className="message-time">
                     ${currentTime}
                     <svg className="message-status" viewBox="0 0 16 11" fill="currentColor">
                         <path d="M11.071.643a1 1 0 0 1 1.414 0l3.54 3.536a1 1 0 0 1 0 1.414l-7.07 7.071a1 1 0 0 1-1.415 0L3.07 8.196a1 1 0 1 1 1.414-1.414L8 10.268l6.657-6.625a.502.502 0 0 1 .414 0z"/>
                         <path d="M6.071.643a1 1 0 0 1 1.414 0l3.54 3.536a1 1 0 0 1 0 1.414l-7.07 7.071a1 1 0 0 1-1.415 0L-1.93 8.196a1 1 0 1 1 1.414-1.414L3 10.268l6.657-6.625a.502.502 0 0 1 .414 0z"/>
                     </svg>
                 </div>
             </div>
         </div>
     `;
     
     if (phoneNumber.trim() && params.fullMessage.trim()) {
         document.getElementById('urlDisplay').textContent = url;
         document.getElementById('resultSection').style.display = 'block';
     } else {
         document.getElementById('resultSection').style.display = 'none';
     }
 }

 document.getElementById('websiteUrl').addEventListener('blur', function() {
     const normalizedUrl = normalizeUrl(this.value);
     if (normalizedUrl !== this.value && normalizedUrl) {
         this.value = normalizedUrl;
         updatePreview();
     }
 });

 // Normalizar parámetros UTM automáticamente
 ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function(fieldId) {
     document.getElementById(fieldId).addEventListener('blur', function() {
         const normalizedValue = normalizeUTMParam(this.value);
         if (normalizedValue !== this.value) {
             this.value = normalizedValue;
             updatePreview();
         }
     });
 });

 document.querySelectorAll('input, textarea').forEach(input => {
     if(input.id === 'countrySearch') return; 
     input.addEventListener('input', updatePreview);
     input.addEventListener('keyup', updatePreview);
     input.addEventListener('change', updatePreview);
     input.addEventListener('paste', () => setTimeout(updatePreview, 10));
 });

 document.getElementById('copyBtn').addEventListener('click', function() {
     const urlText = document.getElementById('urlDisplay').textContent;
     navigator.clipboard.writeText(urlText).then(function() {
         const btn = document.getElementById('copyBtn');
         const originalText = btn.textContent;
         btn.textContent = '✅ ¡Copiado!';
         btn.style.background = '#28a745';
         setTimeout(() => {
             btn.textContent = originalText;
             btn.style.background = '';
         }, 2000);
     });
 });

 document.getElementById('testBtn').addEventListener('click', function() {
     const urlText = document.getElementById('urlDisplay').textContent;
     window.open(urlText, '_blank');
 });

 updatePreview();