export type Country = {
  /** Prefijo que se antepone al número, sin el "+". */
  code: string;
  flag: string;
  name: string;
  /** Cómo se muestra el prefijo en la UI. */
  label: string;
};

export const COUNTRIES: Country[] = [
  // América del Norte
  { code: "1", flag: "🇺🇸", name: "Estados Unidos", label: "+1" },
  { code: "1", flag: "🇨🇦", name: "Canadá", label: "+1" },
  { code: "52", flag: "🇲🇽", name: "México", label: "+52" },

  // América Central
  { code: "501", flag: "🇧🇿", name: "Belice", label: "+501" },
  { code: "502", flag: "🇬🇹", name: "Guatemala", label: "+502" },
  { code: "503", flag: "🇸🇻", name: "El Salvador", label: "+503" },
  { code: "504", flag: "🇭🇳", name: "Honduras", label: "+504" },
  { code: "505", flag: "🇳🇮", name: "Nicaragua", label: "+505" },
  { code: "506", flag: "🇨🇷", name: "Costa Rica", label: "+506" },
  { code: "507", flag: "🇵🇦", name: "Panamá", label: "+507" },

  // América del Sur
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

  // Caribe
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
  { code: "1869", flag: "🇰🇳", name: "San Cristóbal y Nieves", label: "+1-869" },
  { code: "1758", flag: "🇱🇨", name: "Santa Lucía", label: "+1-758" },
  {
    code: "1784",
    flag: "🇻🇨",
    name: "San Vicente y las Granadinas",
    label: "+1-784",
  },
  { code: "1721", flag: "🇸🇽", name: "San Martín", label: "+1-721" },
  { code: "1868", flag: "🇹🇹", name: "Trinidad y Tobago", label: "+1-868" },
  { code: "1649", flag: "🇹🇨", name: "Islas Turcas y Caicos", label: "+1-649" },
  { code: "1340", flag: "🇻🇮", name: "Islas Vírgenes (EE.UU.)", label: "+1-340" },
];

export const DEFAULT_COUNTRY =
  COUNTRIES.find((c) => c.code === "549") ?? COUNTRIES[0];
