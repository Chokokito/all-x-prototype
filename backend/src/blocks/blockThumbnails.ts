// Crisp SVG miniature previews for each documentation block in Payload CMS Admin.
// Rendered when the user clicks "+ Adicionar Seção na Página" in the block drawer.

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`
}

export const BLOCK_THUMBNAILS = {
  callout: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" width="480" height="260">
      <rect width="480" height="260" rx="14" fill="#0B0B0E"/>
      <rect x="1" y="1" width="478" height="258" rx="13" fill="none" stroke="#26262E" stroke-width="2"/>
      <!-- Header Tag -->
      <rect x="24" y="22" width="148" height="24" rx="6" fill="#D98E68" fill-opacity="0.16"/>
      <text x="36" y="38" fill="#EBAA89" font-family="monospace" font-size="11" font-weight="bold">AVISO EM DESTAQUE</text>
      <!-- Callout Card Preview -->
      <rect x="24" y="64" width="432" height="156" rx="12" fill="#131318" stroke="#D98E68" stroke-opacity="0.45" stroke-width="1.5"/>
      <rect x="24" y="64" width="6" height="156" rx="3" fill="#D98E68"/>
      <!-- Icon Circle -->
      <circle cx="62" cy="106" r="16" fill="#D98E68" fill-opacity="0.18"/>
      <circle cx="62" cy="106" r="8" fill="none" stroke="#D98E68" stroke-width="2"/>
      <line x1="62" y1="103" x2="62" y2="109" stroke="#D98E68" stroke-width="2"/>
      <circle cx="62" cy="99" r="1.2" fill="#D98E68"/>
      <!-- Text Lines -->
      <rect x="92" y="92" width="210" height="14" rx="4" fill="#F4F4F5"/>
      <rect x="92" y="118" width="336" height="10" rx="3" fill="#9A9AA2"/>
      <rect x="92" y="138" width="310" height="10" rx="3" fill="#9A9AA2"/>
      <rect x="92" y="158" width="240" height="10" rx="3" fill="#6E6E77"/>
    </svg>
  `),

  introPillars: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" width="480" height="260">
      <rect width="480" height="260" rx="14" fill="#0B0B0E"/>
      <rect x="1" y="1" width="478" height="258" rx="13" fill="none" stroke="#26262E" stroke-width="2"/>
      <!-- Header Tag -->
      <rect x="24" y="20" width="175" height="24" rx="6" fill="#D98E68" fill-opacity="0.16"/>
      <text x="36" y="36" fill="#EBAA89" font-family="monospace" font-size="11" font-weight="bold">INTRODUÇÃO + PILARES</text>
      <!-- Intro Paragraph with Inline Code -->
      <rect x="24" y="58" width="130" height="11" rx="3" fill="#C8C8CD"/>
      <rect x="160" y="54" width="54" height="19" rx="5" fill="#D98E68" fill-opacity="0.22" stroke="#D98E68" stroke-width="1"/>
      <text x="171" y="67" fill="#EBAA89" font-family="monospace" font-size="10" font-weight="bold">wl_...</text>
      <rect x="220" y="58" width="220" height="11" rx="3" fill="#C8C8CD"/>
      <rect x="24" y="80" width="380" height="10" rx="3" fill="#8E8E96"/>
      <!-- 3 Bullet Pillars -->
      <g transform="translate(24, 108)">
        <rect x="0" y="0" width="432" height="34" rx="8" fill="#131318" stroke="#22222A"/>
        <circle cx="18" cy="17" r="4" fill="#D98E68"/>
        <rect x="32" y="12" width="120" height="10" rx="3" fill="#F4F4F5"/>
        <rect x="160" y="12" width="230" height="10" rx="3" fill="#8E8E96"/>
      </g>
      <g transform="translate(24, 150)">
        <rect x="0" y="0" width="432" height="34" rx="8" fill="#131318" stroke="#22222A"/>
        <circle cx="18" cy="17" r="4" fill="#D98E68"/>
        <rect x="32" y="12" width="140" height="10" rx="3" fill="#F4F4F5"/>
        <rect x="180" y="12" width="210" height="10" rx="3" fill="#8E8E96"/>
      </g>
      <g transform="translate(24, 192)">
        <rect x="0" y="0" width="432" height="34" rx="8" fill="#131318" stroke="#22222A"/>
        <circle cx="18" cy="17" r="4" fill="#D98E68"/>
        <rect x="32" y="12" width="130" height="10" rx="3" fill="#F4F4F5"/>
        <rect x="170" y="12" width="220" height="10" rx="3" fill="#8E8E96"/>
      </g>
    </svg>
  `),

  prerequisites: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" width="480" height="260">
      <rect width="480" height="260" rx="14" fill="#0B0B0E"/>
      <rect x="1" y="1" width="478" height="258" rx="13" fill="none" stroke="#26262E" stroke-width="2"/>
      <!-- Header Tag -->
      <rect x="24" y="18" width="196" height="24" rx="6" fill="#D98E68" fill-opacity="0.16"/>
      <text x="36" y="34" fill="#EBAA89" font-family="monospace" font-size="11" font-weight="bold">PASSO A PASSO + COMPLIANCE</text>
      <!-- Checklist Box -->
      <rect x="24" y="52" width="432" height="114" rx="10" fill="#121217" stroke="#25252E"/>
      <circle cx="46" cy="76" r="9" fill="#D98E68" fill-opacity="0.2"/>
      <text x="43" y="80" fill="#EBAA89" font-family="monospace" font-size="10" font-weight="bold">1</text>
      <rect x="64" y="71" width="320" height="10" rx="3" fill="#E4E4E7"/>
      <circle cx="46" cy="108" r="9" fill="#D98E68" fill-opacity="0.2"/>
      <text x="43" y="112" fill="#EBAA89" font-family="monospace" font-size="10" font-weight="bold">2</text>
      <rect x="64" y="103" width="280" height="10" rx="3" fill="#E4E4E7"/>
      <circle cx="46" cy="140" r="9" fill="#D98E68" fill-opacity="0.2"/>
      <text x="43" y="144" fill="#EBAA89" font-family="monospace" font-size="10" font-weight="bold">3</text>
      <rect x="64" y="135" width="350" height="10" rx="3" fill="#E4E4E7"/>
      <!-- KYC Status Box -->
      <rect x="24" y="178" width="432" height="60" rx="10" fill="#141419" stroke="#D98E68" stroke-opacity="0.35"/>
      <rect x="42" y="196" width="136" height="24" rx="12" fill="#4ADE80" fill-opacity="0.15" stroke="#4ADE80" stroke-opacity="0.5"/>
      <circle cx="56" cy="208" r="4" fill="#4ADE80"/>
      <text x="66" y="212" fill="#4ADE80" font-family="monospace" font-size="10" font-weight="bold">kyc: approved</text>
      <rect x="192" y="196" width="150" height="24" rx="12" fill="#FBBF24" fill-opacity="0.15" stroke="#FBBF24" stroke-opacity="0.5"/>
      <circle cx="206" cy="208" r="4" fill="#FBBF24"/>
      <text x="216" y="212" fill="#FCD34D" font-family="monospace" font-size="10" font-weight="bold">compliance_check</text>
    </svg>
  `),

  apiEndpoint: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" width="480" height="260">
      <rect width="480" height="260" rx="14" fill="#0B0B0E"/>
      <rect x="1" y="1" width="478" height="258" rx="13" fill="none" stroke="#26262E" stroke-width="2"/>
      <!-- Header Tag -->
      <rect x="24" y="18" width="210" height="24" rx="6" fill="#4ADE80" fill-opacity="0.14"/>
      <text x="36" y="34" fill="#4ADE80" font-family="monospace" font-size="11" font-weight="bold">EXEMPLO DE API &amp; CÓDIGO</text>
      <!-- Terminal Request Card -->
      <rect x="24" y="52" width="432" height="122" rx="10" fill="#111116" stroke="#2B2B36"/>
      <rect x="24" y="52" width="432" height="34" rx="10" fill="#18181F"/>
      <!-- SDK Tabs -->
      <rect x="36" y="59" width="46" height="20" rx="5" fill="#2A2A35"/>
      <text x="46" y="73" fill="#FFFFFF" font-family="monospace" font-size="10" font-weight="bold">cURL</text>
      <text x="94" y="73" fill="#8E8E96" font-family="monospace" font-size="10">Node.js</text>
      <text x="152" y="73" fill="#8E8E96" font-family="monospace" font-size="10">Python</text>
      <text x="204" y="73" fill="#8E8E96" font-family="monospace" font-size="10">Go</text>
      <!-- Code Lines -->
      <text x="40" y="106" fill="#4ADE80" font-family="monospace" font-size="11" font-weight="bold">curl</text>
      <rect x="76" y="97" width="240" height="10" rx="3" fill="#9A9AA2"/>
      <rect x="52" y="117" width="290" height="10" rx="3" fill="#D98E68"/>
      <rect x="52" y="137" width="200" height="10" rx="3" fill="#38BDF8"/>
      <!-- Response 200 OK Card -->
      <rect x="24" y="184" width="432" height="56" rx="10" fill="#111116" stroke="#25252E"/>
      <circle cx="44" cy="212" r="5" fill="#4ADE80"/>
      <text x="58" y="216" fill="#4ADE80" font-family="monospace" font-size="11" font-weight="bold">Response 200 OK</text>
      <rect x="190" y="207" width="180" height="10" rx="3" fill="#6E6E77"/>
    </svg>
  `),

  featureGrid: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" width="480" height="260">
      <rect width="480" height="260" rx="14" fill="#0B0B0E"/>
      <rect x="1" y="1" width="478" height="258" rx="13" fill="none" stroke="#26262E" stroke-width="2"/>
      <!-- Header Tag -->
      <rect x="24" y="20" width="228" height="24" rx="6" fill="#D98E68" fill-opacity="0.16"/>
      <text x="36" y="36" fill="#EBAA89" font-family="monospace" font-size="11" font-weight="bold">CARTÕES LADO A LADO (2 COLUNAS)</text>
      <!-- Left Card (Pay-in Green) -->
      <rect x="24" y="58" width="208" height="178" rx="12" fill="#121217" stroke="#262630"/>
      <rect x="42" y="76" width="34" height="34" rx="8" fill="#4ADE80" fill-opacity="0.14" stroke="#4ADE80" stroke-opacity="0.4"/>
      <path d="M54 88 L64 98 M64 88 L64 98 L54 98" stroke="#4ADE80" stroke-width="2" fill="none"/>
      <rect x="42" y="124" width="130" height="13" rx="3" fill="#F4F4F5"/>
      <rect x="42" y="148" width="170" height="9" rx="3" fill="#8E8E96"/>
      <rect x="42" y="164" width="145" height="9" rx="3" fill="#8E8E96"/>
      <rect x="42" y="194" width="138" height="22" rx="5" fill="#1A1A22"/>
      <text x="52" y="209" fill="#4ADE80" font-family="monospace" font-size="9.5">payment.received</text>
      <!-- Right Card (Pay-out Copper) -->
      <rect x="248" y="58" width="208" height="178" rx="12" fill="#121217" stroke="#262630"/>
      <rect x="266" y="76" width="34" height="34" rx="8" fill="#D98E68" fill-opacity="0.16" stroke="#D98E68" stroke-opacity="0.45"/>
      <path d="M278 98 L288 88 M278 88 L288 88 L288 98" stroke="#D98E68" stroke-width="2" fill="none"/>
      <rect x="266" y="124" width="130" height="13" rx="3" fill="#F4F4F5"/>
      <rect x="266" y="148" width="170" height="9" rx="3" fill="#8E8E96"/>
      <rect x="266" y="164" width="145" height="9" rx="3" fill="#8E8E96"/>
      <rect x="266" y="194" width="138" height="22" rx="5" fill="#1A1A22"/>
      <text x="276" y="209" fill="#EBAA89" font-family="monospace" font-size="9.5">payout.settled</text>
    </svg>
  `),

  metadataBox: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" width="480" height="260">
      <rect width="480" height="260" rx="14" fill="#0B0B0E"/>
      <rect x="1" y="1" width="478" height="258" rx="13" fill="none" stroke="#26262E" stroke-width="2"/>
      <!-- Header Tag -->
      <rect x="24" y="22" width="220" height="24" rx="6" fill="#D98E68" fill-opacity="0.16"/>
      <text x="36" y="38" fill="#EBAA89" font-family="monospace" font-size="11" font-weight="bold">CAIXA DE METADADOS &amp; WEBHOOKS</text>
      <!-- Title & Subtitle -->
      <rect x="24" y="64" width="240" height="15" rx="4" fill="#F4F4F5"/>
      <rect x="24" y="88" width="340" height="10" rx="3" fill="#8E8E96"/>
      <!-- Metadata Highlight Box -->
      <rect x="24" y="116" width="432" height="108" rx="12" fill="#131318" stroke="#D98E68" stroke-opacity="0.4" stroke-width="1.5"/>
      <rect x="44" y="142" width="110" height="11" rx="3" fill="#C8C8CD"/>
      <rect x="162" y="137" width="138" height="22" rx="5" fill="#D98E68" fill-opacity="0.2" stroke="#D98E68"/>
      <text x="172" y="152" fill="#EBAA89" font-family="monospace" font-size="10" font-weight="bold">customer_id</text>
      <rect x="310" y="137" width="122" height="22" rx="5" fill="#D98E68" fill-opacity="0.2" stroke="#D98E68"/>
      <text x="320" y="152" fill="#EBAA89" font-family="monospace" font-size="10" font-weight="bold">ledger_account</text>
      <rect x="44" y="176" width="370" height="10" rx="3" fill="#9A9AA2"/>
      <rect x="44" y="194" width="260" height="10" rx="3" fill="#6E6E77"/>
    </svg>
  `),
}
