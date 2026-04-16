import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductPageClient, { type ProductData } from "./ProductPageClient";

// ── Product data ──────────────────────────────────────────────────────────────

const PRODUCTS: Record<string, ProductData> = {
  xentrack: {
    slug: "xentrack",
    name: "XenTrack",
    label: "Footfall & Zone Analytics",
    tagline: "Know exactly where your customers go — and why.",
    heroSubtext:
      "Real-time footfall counting, zone dwell-time analytics, and AI heatmaps give you the data to optimise every square foot of your physical space.",
    introHeadline: "Stop guessing. Start knowing.",
    introSubtext:
      "XenTrack brings data-driven decision making to physical spaces — giving operators the same behavioural insights that e-commerce teams have had for years.",
    tabs: [
      {
        label: "Footfall Counting",
        heading: "Accurate people counting at every entry point",
        body: "XenTrack uses overhead AI sensors to count people entering, exiting, and moving through your space with millimetre precision — at any volume, in any lighting condition.",
        bullets: [
          "Real-time counts updated every second",
          "Bi-directional tracking at entries and exits",
          "Works in low-light and crowded conditions",
          "No personal data captured — fully privacy compliant",
        ],
      },
      {
        label: "Zone Analytics",
        heading: "Measure engagement in every corner of your space",
        body: "Divide your floor plan into custom zones and instantly see which areas attract the most attention, how long visitors stay, and where they go next.",
        bullets: [
          "Unlimited custom zones per location",
          "Dwell time, traffic density, and path analysis",
          "Zone-to-zone transition flows",
          "Compare zones across time periods or locations",
        ],
      },
      {
        label: "Live Heatmaps",
        heading: "See the full picture with live floor heatmaps",
        body: "Colour-coded heatmaps updated in real time show exactly where activity is concentrated — and where you're losing visitor attention.",
        bullets: [
          "Live and historical heatmap views",
          "Overlay on your actual floor plan",
          "Export snapshots for presentations and reports",
          "Identify dead zones and high-engagement areas instantly",
        ],
      },
      {
        label: "Peak Hours",
        heading: "Plan smarter with automatic peak detection",
        body: "XenTrack automatically identifies your busiest periods across the day, week, and season — so you can staff smarter and plan campaigns with confidence.",
        bullets: [
          "Hourly, daily, and weekly traffic patterns",
          "Automatic peak and trough detection",
          "Staffing and resource planning alerts",
          "Forecast future peaks based on historical trends",
        ],
      },
      {
        label: "Multi-Site",
        heading: "One dashboard for all your locations",
        body: "Monitor, compare, and benchmark performance across unlimited sites from a single cloud dashboard — no hardware expertise required.",
        bullets: [
          "Unlimited locations in one view",
          "Cross-site benchmarking and league tables",
          "Scheduled PDF and CSV reports",
          "Role-based access for teams and clients",
        ],
      },
    ],
    useCases: [
      "Retail & Shopping Centres",
      "Airports & Transport Hubs",
      "Stadiums & Live Venues",
      "Museums & Exhibitions",
      "Office & Smart Buildings",
    ],
  },

  xeninspect: {
    slug: "xeninspect",
    name: "XenInspect",
    label: "AI Defect Detection",
    tagline: "Catch defects before they reach your customers.",
    heroSubtext:
      "XenInspect integrates directly with your production line to deliver real-time defect detection — reducing waste, recall risk, and quality control costs at scale.",
    introHeadline: "Zero tolerance for defects. Zero compromise on speed.",
    introSubtext:
      "Traditional quality control relies on manual sampling — slow, inconsistent, and expensive. XenInspect inspects 100% of output, at full line speed, every shift.",
    tabs: [
      {
        label: "Defect Detection",
        heading: "Real-time detection at full production speed",
        body: "XenInspect runs custom Computer Vision models trained on your exact products and defect types, catching faults the moment they occur — with zero throughput impact.",
        bullets: [
          "Surface scratches, dents, discolouration, misalignment",
          "Runs at full line speed — no slowdowns",
          "Sub-100ms inference latency",
          "Multi-camera support for 360° coverage",
        ],
      },
      {
        label: "Custom Training",
        heading: "Models built exclusively for your products",
        body: "Unlike off-the-shelf solutions, XenInspect trains on your specific products and defect catalogue — delivering accuracy that generic tools cannot match.",
        bullets: [
          "Trained on your production images and defect types",
          "Continuous improvement as more data is collected",
          "Handles variations in lighting, angle, and product finish",
          "New defect types added without retraining from scratch",
        ],
      },
      {
        label: "QC Reports",
        heading: "Automated quality reports, every batch and shift",
        body: "XenInspect generates detailed inspection reports automatically — no manual logging, no paperwork, no gaps.",
        bullets: [
          "Per-batch and per-shift defect summaries",
          "Defect type breakdown with image evidence",
          "Trend analysis across shifts, lines, and products",
          "Export to PDF, CSV, or push to your QMS",
        ],
      },
      {
        label: "Line Integration",
        heading: "Connect to your existing line and systems",
        body: "XenInspect integrates with your MES, ERP, SCADA, or reject mechanisms via standard industrial protocols — no bespoke middleware required.",
        bullets: [
          "REST API and OPC-UA connectivity",
          "Trigger conveyors, gates, and alarms automatically",
          "Connects to SAP, Oracle, and custom MES platforms",
          "On-premise or edge deployment options",
        ],
      },
      {
        label: "Quality Metrics",
        heading: "Track quality KPIs across your entire operation",
        body: "Monitor pass rates, defect trends, and line performance from a single dashboard — and get alerted before a quality issue becomes a recall.",
        bullets: [
          "Live pass rate and defect rate per line",
          "Shift-over-shift and week-over-week comparisons",
          "Automatic threshold alerts via email or webhook",
          "PPAP and ISO documentation support",
        ],
      },
    ],
    useCases: [
      "Manufacturing & Assembly",
      "Electronics & PCB Inspection",
      "Food & Beverage Quality",
      "Automotive Production",
      "Pharmaceutical Packaging",
    ],
  },

  xenread: {
    slug: "xenread",
    name: "XenRead",
    label: "OCR & Document Intelligence",
    tagline: "Turn any document into structured data — instantly.",
    heroSubtext:
      "XenRead uses advanced OCR and AI to extract, validate, and structure data from any document type: forms, invoices, labels, receipts, contracts, and more.",
    introHeadline: "Stop re-keying data. Start automating it.",
    introSubtext:
      "Manual data entry is slow, error-prone, and expensive. XenRead processes documents in under a second and delivers clean, validated data straight to your systems.",
    tabs: [
      {
        label: "OCR Extraction",
        heading: "Extract text from any document, in any language",
        body: "XenRead handles printed text, handwriting, low-quality scans, and mixed layouts — across 50+ languages — with character-level accuracy that outperforms general-purpose OCR.",
        bullets: [
          "50+ language support including Arabic and CJK scripts",
          "Works on scans, photos, and PDFs",
          "Handles skewed, rotated, and low-resolution documents",
          "Table and column structure preserved in output",
        ],
      },
      {
        label: "Field Extraction",
        heading: "Named fields extracted automatically, every time",
        body: "XenRead identifies and extracts named fields — invoice numbers, amounts, dates, addresses, signatures — from any layout without templates or configuration.",
        bullets: [
          "Zero-template setup for common document types",
          "Custom field definitions for your specific forms",
          "Handles variable layouts and multi-page documents",
          "Normalises dates, currencies, and phone numbers automatically",
        ],
      },
      {
        label: "Form Processing",
        heading: "Process handwritten and printed forms at scale",
        body: "From patient intake forms to delivery notes, XenRead processes any form — handwritten or printed — and populates your downstream systems automatically.",
        bullets: [
          "Handwriting recognition with high accuracy",
          "Checkbox and tick-box detection",
          "Signature detection and verification",
          "Direct integration with CRM, EHR, and ERP systems",
        ],
      },
      {
        label: "Classification",
        heading: "Automatically sort incoming documents by type",
        body: "XenRead classifies every incoming document before extraction — routing invoices to accounts, contracts to legal, and forms to the right team — with no manual sorting.",
        bullets: [
          "Pre-built classifiers for 30+ document types",
          "Train custom classifiers on your own document categories",
          "Handles mixed batches and multi-document PDFs",
          "Confidence thresholds for human-review routing",
        ],
      },
      {
        label: "API & Webhooks",
        heading: "Plug extracted data directly into your software",
        body: "XenRead delivers extraction results via a simple REST API or webhook — so your ERP, CRM, or custom application receives clean structured data in real time.",
        bullets: [
          "JSON output with per-field confidence scores",
          "Webhooks for real-time push to any endpoint",
          "Pre-built connectors for popular platforms",
          "Full API documentation and SDKs provided",
        ],
      },
    ],
    useCases: [
      "Logistics & Supply Chain",
      "Healthcare & Clinical Records",
      "Finance & Insurance",
      "Legal & Compliance",
      "Government & Public Sector",
    ],
  },

  xenscan: {
    slug: "xenscan",
    name: "XenScan",
    label: "Recognition & Profiling",
    tagline: "Identify, profile, and protect — in real time.",
    heroSubtext:
      "Enterprise-grade facial recognition, anonymised customer profiling, and number plate recognition — designed for security, retail intelligence, and access control.",
    introHeadline: "See more. Know more. Act faster.",
    introSubtext:
      "XenScan turns your existing camera infrastructure into an intelligent recognition layer — delivering instant identification and behavioural insights without additional hardware.",
    tabs: [
      {
        label: "Face Recognition",
        heading: "Identify known individuals across every camera",
        body: "XenScan runs recognition across multiple feeds simultaneously, matching faces against your enrolled database with sub-second latency — even in crowds.",
        bullets: [
          "Multi-feed recognition at sub-second latency",
          "Works in crowds, side-profiles, and low light",
          "Scales to millions of enrolled identities",
          "Liveness detection to prevent photo spoofing",
        ],
      },
      {
        label: "ANPR",
        heading: "Read every plate — any speed, any condition",
        body: "XenScan's ANPR engine reads and logs vehicle registration plates across entry points, car parks, and roadways in all lighting and weather conditions.",
        bullets: [
          "Reads plates at up to 100km/h",
          "Night, rain, glare, and partial occlusion handling",
          "Multi-country plate format support",
          "Log, search, and export plate history",
        ],
      },
      {
        label: "Customer Profiling",
        heading: "Understand your audience without storing personal data",
        body: "XenScan builds anonymised demographic profiles — age range, gender, visit frequency — to help you understand who your customers are, without compromising their privacy.",
        bullets: [
          "Age and gender estimation (anonymised)",
          "Repeat visitor detection without identity capture",
          "Dwell time and engagement by demographic",
          "GDPR-compliant by design — no facial data stored",
        ],
      },
      {
        label: "Watchlists",
        heading: "Instant alerts when it matters most",
        body: "Define watchlists for known individuals or vehicles and receive instant alerts — via push notification, email, or webhook — the moment they are detected.",
        bullets: [
          "Separate watchlists for people and vehicles",
          "Real-time alert delivery via push, email, or webhook",
          "Alert history with image evidence",
          "Integration with access control and security systems",
        ],
      },
      {
        label: "Access Control",
        heading: "Frictionless access without cards or PINs",
        body: "Replace cards, fobs, and PINs with face-based access control — faster, more secure, and impossible to share or clone.",
        bullets: [
          "Door and gate unlock in under 0.5 seconds",
          "Anti-tailgating detection",
          "Time-based and zone-based access rules",
          "Full audit trail of every access event",
        ],
      },
    ],
    useCases: [
      "Retail Loss Prevention",
      "Car Park Management",
      "Physical Access Control",
      "Smart City & Traffic",
      "Hospitality & VIP Management",
    ],
  },

  xencapture: {
    slug: "xencapture",
    name: "XenCapture",
    label: "AI 3D Content Creation",
    tagline: "From real world to 3D — in minutes.",
    heroSubtext:
      "Capture physical objects, spaces, and environments with any smartphone. XenCapture's AI photogrammetry engine reconstructs photorealistic, AR/VR-ready 3D models automatically.",
    introHeadline: "Professional 3D. No specialist hardware.",
    introSubtext:
      "Creating 3D content used to require expensive equipment and weeks of post-processing. XenCapture reduces that to a smartphone and a few minutes.",
    tabs: [
      {
        label: "3D Scanning",
        heading: "Capture anything with your smartphone",
        body: "Walk around any object or space with your phone and XenCapture handles the rest — AI photogrammetry reconstructs a precise, textured 3D model from your footage automatically.",
        bullets: [
          "Any iOS or Android smartphone — no accessories needed",
          "Guided capture mode for optimal coverage",
          "Automatic alignment and mesh generation",
          "Sub-millimetre accuracy for small objects",
        ],
      },
      {
        label: "AR & VR Export",
        heading: "Ready for every platform, out of the box",
        body: "XenCapture exports to every major 3D and AR/VR format — so your models work in Unity, Unreal, Shopify, Apple Vision Pro, and everywhere else.",
        bullets: [
          "glTF, USDZ, FBX, OBJ, and STL export",
          "Optimised LODs for real-time rendering",
          "Compatible with Unity, Unreal, and WebGL",
          "Apple Vision Pro and Meta Quest ready",
        ],
      },
      {
        label: "Spatial Scanning",
        heading: "Scan entire rooms, buildings, and sites",
        body: "XenCapture handles large-scale spatial scanning too — generating navigable 3D walkthroughs of rooms, warehouses, and construction sites for remote stakeholders.",
        bullets: [
          "Room and building-scale scanning",
          "Interactive 3D walkthrough viewer",
          "Shareable links — no app required to view",
          "Measurement and annotation tools",
        ],
      },
      {
        label: "E-commerce",
        heading: "Boost conversions with interactive 3D product viewers",
        body: "Embed interactive 3D and AR product viewers directly in your online store with one line of code — letting customers inspect products from every angle before they buy.",
        bullets: [
          "One-line embed for Shopify, WooCommerce, and custom stores",
          "AR 'place in your room' on iOS and Android",
          "360° spin and zoom interaction",
          "Proven to increase conversion and reduce returns",
        ],
      },
      {
        label: "Digital Twins",
        heading: "Create living digital twins of physical assets",
        body: "Keep your digital twin up to date with regular rescans — tracking changes to equipment, facilities, or products over time for simulation, planning, and remote monitoring.",
        bullets: [
          "Scheduled or on-demand rescan workflows",
          "Change detection between scan versions",
          "Integration with IoT sensor overlays",
          "BIM and CAD export for engineering teams",
        ],
      },
    ],
    useCases: [
      "E-commerce & Retail",
      "Real Estate & Architecture",
      "Manufacturing & Digital Twins",
      "Gaming & Entertainment",
      "Cultural Heritage & Museums",
    ],
  },
};

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) return {};
  return {
    title: product.name,
    description: product.heroSubtext,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) notFound();

  return <ProductPageClient product={product} />;
}
