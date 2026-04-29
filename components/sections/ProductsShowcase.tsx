"use client";

import { motion } from "motion/react";
import Link from "next/link";

// ── XenInspect custom visual: conveyor belt QC scene ─────────────────────────

function XenInspectVisual() {
  const products = [
    { id: 1, cx: 48,  cy: 148, pass: true  },
    { id: 2, cx: 122, cy: 148, pass: false },
    { id: 3, cx: 200, cy: 148, pass: true  },
    { id: 4, cx: 265, cy: 148, pass: true  },
  ];

  return (
    <svg viewBox="0 0 320 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="320" height="320" fill="rgba(2,4,14,0.88)" />

      {/* Grid */}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={28 + (i + 1) * 22} x2="320" y2={28 + (i + 1) * 22}
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} x1={(i + 1) * 24} y1="28" x2={(i + 1) * 24} y2="274"
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}

      {/* Conveyor belt surface */}
      <rect x="0" y="120" width="320" height="56" fill="rgba(28,38,58,0.55)" />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={`bt${i}`} x1={i * 24} y1="120" x2={i * 24} y2="176"
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      <line x1="0" y1="120" x2="320" y2="120" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
      <line x1="0" y1="176" x2="320" y2="176" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />

      {/* Scan beam (on the defective product) */}
      <defs>
        <linearGradient id="xiBeam" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00AEEF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00AEEF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="115" y="28" width="14" height="246" fill="url(#xiBeam)" />
      <rect x="121" y="28" width="2"  height="246" fill="rgba(0,174,239,0.45)" />

      {/* Products */}
      {products.map((p) => {
        const pw = 44, ph = 52;
        const bx = p.cx - pw / 2, by = p.cy - ph / 2;
        const dx = bx - 7, dy = by - 7, dw = pw + 14, dh = ph + 14;
        const col = p.pass ? "#00E676" : "#ff4757";
        const fillDim = p.pass ? "rgba(0,230,118,0.05)" : "rgba(255,71,87,0.08)";

        return (
          <g key={p.id}>
            {/* Product body */}
            <rect x={bx} y={by} width={pw} height={ph} rx="4"
              fill={p.pass ? "rgba(55,75,110,0.85)" : "rgba(80,28,32,0.85)"}
              stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Cap circle */}
            <circle cx={p.cx} cy={p.cy - 7} r="10" fill="rgba(90,110,155,0.9)" />
            {/* Barcode lines */}
            {[0, 3, 6, 9, 12, 15].map((off) => (
              <line key={`${p.id}-bc${off}`}
                x1={bx + 6 + off} y1={p.cy + 8} x2={bx + 6 + off} y2={p.cy + 18}
                stroke="rgba(200,215,240,0.45)" strokeWidth={off % 6 === 0 ? 2 : 1} />
            ))}
            {/* Crack on defective product */}
            {!p.pass && (
              <path
                d={`M${p.cx - 7},${p.cy - 17} L${p.cx - 1},${p.cy - 10} L${p.cx + 7},${p.cy - 14} L${p.cx + 3},${p.cy - 5}`}
                stroke="#ff6b6b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            )}

            {/* Detection box */}
            <rect x={dx} y={dy} width={dw} height={dh}
              fill={fillDim} stroke={col} strokeWidth={p.pass ? 1 : 1.5}
              strokeDasharray={p.pass ? "3 2" : "0"} rx="2" />
            {/* TL */}
            <path d={`M${dx},${dy+8} L${dx},${dy} L${dx+8},${dy}`}
              stroke={col} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* TR */}
            <path d={`M${dx+dw-8},${dy} L${dx+dw},${dy} L${dx+dw},${dy+8}`}
              stroke={col} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* BL */}
            <path d={`M${dx},${dy+dh-8} L${dx},${dy+dh} L${dx+8},${dy+dh}`}
              stroke={col} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* BR */}
            <path d={`M${dx+dw-8},${dy+dh} L${dx+dw},${dy+dh} L${dx+dw},${dy+dh-8}`}
              stroke={col} strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Label badge */}
            <rect x={dx} y={dy + dh + 2} width={dw} height={12} fill={col} rx="2" />
            <text x={p.cx} y={dy + dh + 10.5}
              textAnchor="middle" fill={p.pass ? "#001a08" : "#fff"}
              fontSize="7" fontFamily="monospace" fontWeight="bold">
              {p.pass ? "PASS" : "DEFECT"}
            </text>
          </g>
        );
      })}

      {/* Defect alert panel */}
      <rect x="8" y="215" width="304" height="54" rx="6"
        fill="rgba(255,71,87,0.1)" stroke="rgba(255,71,87,0.45)" strokeWidth="1" />
      <circle cx="24" cy="234" r="5" fill="#ff4757" />
      <text x="34" y="229" fill="#ff4757"               fontSize="9"  fontFamily="monospace" fontWeight="bold">DEFECT DETECTED</text>
      <text x="34" y="242" fill="rgba(255,255,255,0.65)" fontSize="8"  fontFamily="monospace">Micro-scratch · Product #142 · LINE-01</text>
      <text x="34" y="256" fill="rgba(255,255,255,0.38)" fontSize="7.5" fontFamily="monospace">Confidence: 97.3%   |   Auto-rejected</text>

      {/* Top HUD */}
      <rect width="320" height="28" fill="rgba(0,0,0,0.72)" />
      <circle cx="13" cy="14" r="4.5" fill="#ff4757" />
      <circle cx="13" cy="14" r="8"   fill="none" stroke="#ff4757" strokeWidth="0.75" opacity="0.45" />
      <text x="22"  y="18.5" fill="white"                fontSize="9"   fontFamily="monospace" fontWeight="bold">LIVE</text>
      <text x="50"  y="18.5" fill="rgba(255,255,255,0.3)" fontSize="9"  fontFamily="monospace">|</text>
      <text x="57"  y="18.5" fill="rgba(255,255,255,0.65)" fontSize="8" fontFamily="monospace">LINE-01 · QC STATION</text>
      <text x="312" y="18.5" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="monospace" textAnchor="end">1080p</text>

      {/* Scanning badge */}
      <rect x="234" y="34" width="78" height="17" rx="8.5"
        fill="rgba(0,174,239,0.12)" stroke="#00AEEF" strokeWidth="0.75" />
      <circle cx="247" cy="42.5" r="2.5" fill="#00AEEF" />
      <text x="254" y="46.5" fill="#00AEEF" fontSize="8" fontFamily="monospace" fontWeight="bold">scanning...</text>

      {/* Stats bar */}
      <rect y="278" width="320" height="42" fill="rgba(0,0,0,0.68)" />
      <line x1="115" y1="284" x2="115" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="218" y1="284" x2="218" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      <text x="10"  y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">INSPECTED</text>
      <text x="10"  y="311" fill="#00AEEF"                fontSize="15"  fontFamily="monospace" fontWeight="bold">1,247</text>
      <text x="58"  y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace"> items</text>

      <text x="125" y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">PASS RATE</text>
      <text x="125" y="311" fill="#00E676"                fontSize="15"  fontFamily="monospace" fontWeight="bold">98.2</text>
      <text x="160" y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace">%</text>

      <text x="228" y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">DEFECTS</text>
      <text x="228" y="311" fill="#ff4757"                fontSize="15"  fontFamily="monospace" fontWeight="bold">22</text>
      <text x="253" y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace"> today</text>
    </svg>
  );
}

// ── XenRead custom visual: OCR document scanning ──────────────────────────────

function XenReadVisual() {
  const fields = [
    { label: "COMPANY", x: 30, y: 68,  w: 95,  h: 13, color: "#00AEEF" },
    { label: "INV #",   x: 30, y: 92,  w: 55,  h: 11, color: "#00E676" },
    { label: "DATE",    x: 107, y: 92, w: 62,  h: 11, color: "#ffcc00" },
    { label: "ITEM",    x: 30, y: 135, w: 115, h: 11, color: "#00AEEF" },
    { label: "QTY",     x: 30, y: 152, w: 30,  h: 11, color: "#ff9800" },
    { label: "AMOUNT",  x: 118, y: 152, w: 55, h: 11, color: "#ff4757" },
    { label: "TOTAL",   x: 90, y: 196, w: 85,  h: 14, color: "#00E676" },
  ];

  const extracted = [
    { key: "company",  val: "Acme Corp"   },
    { key: "inv_no",   val: "#INV-2847"   },
    { key: "date",     val: "24 Apr 2026" },
    { key: "amount",   val: "$4,280.00"   },
    { key: "total",    val: "$4,566.96"   },
  ];

  const bodyLines = [
    { y: 115, w: 90 }, { y: 125, w: 60 },
    { y: 167, w: 105 }, { y: 177, w: 45 }, { y: 187, w: 75 },
  ];

  return (
    <svg viewBox="0 0 320 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="320" fill="rgba(3,5,18,0.87)" />

      {/* Grid */}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={28 + (i + 1) * 22} x2="320" y2={28 + (i + 1) * 22}
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} x1={(i + 1) * 24} y1="28" x2={(i + 1) * 24} y2="274"
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}

      {/* Document shadow */}
      <rect x="23" y="46" width="165" height="205" rx="3" fill="rgba(0,0,0,0.35)" />

      {/* Document body (with folded top-right corner) */}
      <path d="M20,42 L157,42 L177,62 L177,247 L20,247 Z"
        fill="rgba(225,232,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      {/* Fold crease */}
      <path d="M157,42 L177,62 L157,62 Z"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.11)" strokeWidth="1" />

      {/* Simulated document header */}
      <rect x="30" y="52" width="85" height="7" rx="2" fill="rgba(255,255,255,0.55)" />
      <rect x="30" y="78" width="38" height="4" rx="1" fill="rgba(255,255,255,0.18)" />
      <rect x="75" y="78" width="52" height="4" rx="1" fill="rgba(255,255,255,0.18)" />

      {/* Table divider lines */}
      <line x1="25" y1="123" x2="172" y2="123" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
      <line x1="25" y1="163" x2="172" y2="163" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
      <line x1="25" y1="183" x2="172" y2="183" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />

      {/* Body text lines */}
      {bodyLines.map(({ y, w }) => (
        <rect key={y} x="30" y={y} width={w} height="4" rx="1" fill="rgba(255,255,255,0.11)" />
      ))}

      {/* OCR field highlights */}
      {fields.map((f) => (
        <g key={f.label}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h}
            fill={f.color} fillOpacity={0.09} stroke={f.color} strokeWidth="0.75" rx="1" />
          {/* Tag label */}
          <rect x={f.x} y={f.y - 10} width={f.label.length * 5 + 4} height={9}
            fill={f.color} rx="1" />
          <text x={f.x + 2} y={f.y - 3}
            fill="#000d06" fontSize="6" fontFamily="monospace" fontWeight="bold">
            {f.label}
          </text>
        </g>
      ))}

      {/* Extracted data panel */}
      <rect x="191" y="42" width="120" height="205" rx="5"
        fill="rgba(12,18,42,0.92)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <text x="200" y="58" fill="#00AEEF" fontSize="8" fontFamily="monospace" fontWeight="bold">EXTRACTED</text>
      <line x1="191" y1="63" x2="311" y2="63" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {extracted.map((e, i) => (
        <g key={e.key}>
          <text x="200" y={78 + i * 30}
            fill="rgba(255,255,255,0.38)" fontSize="7" fontFamily="monospace">{e.key}</text>
          <text x="200" y={91 + i * 30}
            fill="rgba(255,255,255,0.88)" fontSize="8.5" fontFamily="monospace" fontWeight="bold">{e.val}</text>
        </g>
      ))}

      {/* Confidence badge inside panel */}
      <rect x="196" y="222" width="72" height="18" rx="4"
        fill="rgba(0,230,118,0.13)" stroke="#00E676" strokeWidth="0.75" />
      <text x="232" y="234" textAnchor="middle" fill="#00E676" fontSize="8.5" fontFamily="monospace" fontWeight="bold">99.4% conf.</text>

      {/* Top HUD */}
      <rect width="320" height="28" fill="rgba(0,0,0,0.72)" />
      <circle cx="13" cy="14" r="4.5" fill="#ff4757" />
      <circle cx="13" cy="14" r="8"   fill="none" stroke="#ff4757" strokeWidth="0.75" opacity="0.45" />
      <text x="22"  y="18.5" fill="white"                 fontSize="9"   fontFamily="monospace" fontWeight="bold">LIVE</text>
      <text x="50"  y="18.5" fill="rgba(255,255,255,0.3)"  fontSize="9"  fontFamily="monospace">|</text>
      <text x="57"  y="18.5" fill="rgba(255,255,255,0.65)" fontSize="8"  fontFamily="monospace">OCR ENGINE · DOC-SCAN</text>
      <text x="312" y="18.5" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="monospace" textAnchor="end">processing</text>

      {/* Fields found badge */}
      <rect x="226" y="34" width="86" height="17" rx="8.5"
        fill="rgba(0,230,118,0.12)" stroke="#00E676" strokeWidth="0.75" />
      <circle cx="239" cy="42.5" r="2.5" fill="#00E676" />
      <text x="246" y="46.5" fill="#00E676" fontSize="8" fontFamily="monospace" fontWeight="bold">7 fields found</text>

      {/* Stats bar */}
      <rect y="278" width="320" height="42" fill="rgba(0,0,0,0.68)" />
      <line x1="115" y1="284" x2="115" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="218" y1="284" x2="218" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      <text x="10"  y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">PROCESSED</text>
      <text x="10"  y="311" fill="#00AEEF"                fontSize="15"  fontFamily="monospace" fontWeight="bold">8,429</text>
      <text x="58"  y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace"> docs</text>

      <text x="125" y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">ACCURACY</text>
      <text x="125" y="311" fill="#00E676"                fontSize="15"  fontFamily="monospace" fontWeight="bold">99.4</text>
      <text x="162" y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace">%</text>

      <text x="228" y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">AVG FIELDS</text>
      <text x="228" y="311" fill="#ffcc00"                fontSize="15"  fontFamily="monospace" fontWeight="bold">12</text>
      <text x="253" y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace"> /doc</text>
    </svg>
  );
}

// ── XenCapture custom visual: 3D photogrammetry reconstruction ────────────────

function XenCaptureVisual() {
  // Isometric cube — top face center at (160, 112)
  const ct = { lft:[130,112], top:[160,95], rgt:[190,112], btm:[160,129] };
  const cb = { lft:[130,162], ctr:[160,179], rgt:[190,162] };

  const cameras = [
    { x: 52,  y: 62  },
    { x: 252, y: 62  },
    { x: 44,  y: 193 },
    { x: 256, y: 193 },
  ];

  const pts: Array<[number, number]> = [
    [150,90],[172,86],[127,110],[195,110],[163,130],[138,118],
    [182,117],[143,163],[177,160],[127,150],[194,148],[158,180],
    [115,137],[207,135],[155,89],[165,92],[142,100],[179,105],
  ];

  return (
    <svg viewBox="0 0 320 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="320" fill="rgba(3,5,18,0.87)" />

      {/* Grid */}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={28+(i+1)*22} x2="320" y2={28+(i+1)*22}
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} x1={(i+1)*24} y1="28" x2={(i+1)*24} y2="272"
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}

      {/* Orbit ring */}
      <circle cx="160" cy="135" r="90" fill="none"
        stroke="rgba(0,174,239,0.13)" strokeWidth="1" strokeDasharray="5 4" />

      {/* Camera → cube connection lines */}
      {cameras.map((c, i) => (
        <line key={i} x1={c.x} y1={c.y} x2="160" y2="135"
          stroke="rgba(0,174,239,0.18)" strokeWidth="1" strokeDasharray="4 3" />
      ))}

      {/* Reconstruction progress ring (87% filled) */}
      <circle cx="160" cy="135" r="63" fill="none"
        stroke="rgba(0,230,118,0.1)" strokeWidth="5" />
      <circle cx="160" cy="135" r="63" fill="none" stroke="#00E676" strokeWidth="5"
        strokeDasharray="345 396" strokeLinecap="round"
        transform="rotate(-90 160 135)" />

      {/* Point cloud */}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.3}
          fill="#00AEEF" opacity={0.35 + (i % 4) * 0.12} />
      ))}

      {/* ── Isometric cube wireframe ── */}
      {/* Top face */}
      <path d={`M${ct.lft} L${ct.top} L${ct.rgt} L${ct.btm} Z`}
        fill="rgba(0,174,239,0.07)" stroke="#00AEEF" strokeWidth="1.5" />
      {/* Left face */}
      <path d={`M${ct.lft} L${ct.btm} L${cb.ctr} L${cb.lft} Z`}
        fill="rgba(0,174,239,0.04)" stroke="#00AEEF" strokeWidth="1.5" opacity="0.75" />
      {/* Right face */}
      <path d={`M${ct.top} L${ct.rgt} L${cb.rgt} L${cb.ctr} Z`}
        fill="rgba(0,174,239,0.09)" stroke="#00AEEF" strokeWidth="1.5" opacity="0.9" />
      {/* Mesh diagonals */}
      <line x1={ct.lft[0]} y1={ct.lft[1]} x2={ct.rgt[0]} y2={ct.rgt[1]}
        stroke="#00AEEF" strokeWidth="0.6" opacity="0.3" />
      <line x1={ct.btm[0]} y1={ct.btm[1]} x2={cb.lft[0]} y2={cb.lft[1]}
        stroke="#00AEEF" strokeWidth="0.6" opacity="0.25" />
      <line x1={ct.rgt[0]} y1={ct.rgt[1]} x2={cb.ctr[0]} y2={cb.ctr[1]}
        stroke="#00AEEF" strokeWidth="0.6" opacity="0.25" />

      {/* 3D MESH label */}
      <rect x="132" y="184" width="56" height="13" rx="2"
        fill="rgba(0,174,239,0.18)" stroke="#00AEEF" strokeWidth="0.75" />
      <text x="160" y="193.5" textAnchor="middle" fill="#00AEEF"
        fontSize="7.5" fontFamily="monospace" fontWeight="bold">3D MESH</text>

      {/* Camera icons (smartphone) */}
      {cameras.map((c, i) => (
        <g key={i}>
          <rect x={c.x-9} y={c.y-13} width="18" height="26" rx="3"
            fill="rgba(10,20,46,0.92)" stroke="#00AEEF" strokeWidth="1.5" opacity="0.85" />
          <rect x={c.x-6} y={c.y-10} width="12" height="15" rx="1"
            fill="rgba(0,174,239,0.18)" />
          <circle cx={c.x} cy={c.y} r="3" fill="none" stroke="#00AEEF" strokeWidth="1" />
          <circle cx={c.x} cy={c.y} r="1.2" fill="#00AEEF" />
        </g>
      ))}

      {/* Export format tags */}
      {["glTF", "USDZ", "FBX", "OBJ"].map((fmt, i) => (
        <g key={fmt}>
          <rect x={68 + i*48} y="224" width="38" height="13" rx="2"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />
          <text x={87 + i*48} y="233.5" textAnchor="middle"
            fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="monospace">{fmt}</text>
        </g>
      ))}

      {/* Top HUD */}
      <rect width="320" height="28" fill="rgba(0,0,0,0.72)" />
      <circle cx="13" cy="14" r="4.5" fill="#00AEEF" />
      <circle cx="13" cy="14" r="8"   fill="none" stroke="#00AEEF" strokeWidth="0.75" opacity="0.45" />
      <text x="22"  y="18.5" fill="white"                 fontSize="9"   fontFamily="monospace" fontWeight="bold">PROC</text>
      <text x="52"  y="18.5" fill="rgba(255,255,255,0.3)"  fontSize="9"  fontFamily="monospace">|</text>
      <text x="59"  y="18.5" fill="rgba(255,255,255,0.65)" fontSize="8"  fontFamily="monospace">AI-3D · RECONSTRUCTION</text>
      <text x="312" y="18.5" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="monospace" textAnchor="end">87%</text>

      {/* Processing badge */}
      <rect x="224" y="34" width="88" height="17" rx="8.5"
        fill="rgba(0,174,239,0.12)" stroke="#00AEEF" strokeWidth="0.75" />
      <circle cx="237" cy="42.5" r="2.5" fill="#00AEEF" />
      <text x="244" y="46.5" fill="#00AEEF" fontSize="8" fontFamily="monospace" fontWeight="bold">building mesh...</text>

      {/* Stats bar */}
      <rect y="278" width="320" height="42" fill="rgba(0,0,0,0.68)" />
      <line x1="115" y1="284" x2="115" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="218" y1="284" x2="218" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      <text x="10"  y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">MODELS</text>
      <text x="10"  y="311" fill="#00AEEF"                fontSize="15"  fontFamily="monospace" fontWeight="bold">3,241</text>
      <text x="57"  y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace"> built</text>

      <text x="125" y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">AVG TIME</text>
      <text x="125" y="311" fill="#ffcc00"                fontSize="15"  fontFamily="monospace" fontWeight="bold">3.2</text>
      <text x="157" y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace"> min</text>

      <text x="228" y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">ACCURACY</text>
      <text x="228" y="311" fill="#00E676"                fontSize="15"  fontFamily="monospace" fontWeight="bold">98.7</text>
      <text x="267" y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace">%</text>
    </svg>
  );
}

// ── XenScan custom visual: facial recognition + ANPR ─────────────────────────

function XenScanVisual() {
  const faces = [
    { cx: 72,  cy: 108, status: "matched",   label: "J. SMITH",  color: "#00E676" },
    { cx: 175, cy: 112, status: "scanning",  label: "SCANNING",  color: "#00AEEF" },
    { cx: 268, cy: 104, status: "watchlist", label: "WATCHLIST", color: "#ff4757" },
  ];

  function lm(cx: number, cy: number) {
    return [
      { x: cx - 9,  y: cy - 6  }, // 0 left eye
      { x: cx + 9,  y: cy - 6  }, // 1 right eye
      { x: cx - 15, y: cy - 11 }, // 2 left temple
      { x: cx + 15, y: cy - 11 }, // 3 right temple
      { x: cx,      y: cy + 4  }, // 4 nose
      { x: cx - 16, y: cy + 5  }, // 5 left cheek
      { x: cx + 16, y: cy + 5  }, // 6 right cheek
      { x: cx - 8,  y: cy + 12 }, // 7 mouth-left
      { x: cx + 8,  y: cy + 12 }, // 8 mouth-right
      { x: cx,      y: cy + 13 }, // 9 mouth-center
      { x: cx,      y: cy + 21 }, // 10 chin
    ];
  }

  const meshEdges = [
    [0,1],[2,0],[3,1],[0,4],[1,4],[4,7],[4,8],[7,8],[9,10],
  ];

  return (
    <svg viewBox="0 0 320 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="320" fill="rgba(3,5,18,0.87)" />

      {/* Grid */}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={28 + (i + 1) * 22} x2="320" y2={28 + (i + 1) * 22}
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} x1={(i + 1) * 24} y1="28" x2={(i + 1) * 24} y2="272"
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}

      {/* Faces */}
      {faces.map((f, fi) => {
        const pts = lm(f.cx, f.cy);
        const bx = f.cx - 28, by = f.cy - 30, bw = 56, bh = 58;

        return (
          <g key={fi}>
            {/* Face oval */}
            <ellipse cx={f.cx} cy={f.cy} rx="19" ry="23"
              fill="rgba(200,210,235,0.11)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

            {/* Scan lines on "scanning" face */}
            {f.status === "scanning" && [0,4,8,12,16,20].map((off) => (
              <line key={off}
                x1={f.cx - 18} y1={f.cy - 10 + off} x2={f.cx + 18} y2={f.cy - 10 + off}
                stroke="rgba(0,174,239,0.22)" strokeWidth="1" />
            ))}

            {/* Landmark mesh */}
            {meshEdges.map(([a, b], ei) => (
              <line key={ei}
                x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y}
                stroke={f.color} strokeWidth="0.5" opacity="0.3" />
            ))}

            {/* Landmark dots */}
            {pts.map((pt, pi) => (
              <circle key={pi} cx={pt.x} cy={pt.y} r="1.8" fill={f.color} opacity="0.7" />
            ))}

            {/* Detection box */}
            <rect x={bx} y={by} width={bw} height={bh}
              fill={f.color} fillOpacity={0.04} stroke={f.color}
              strokeWidth={f.status === "watchlist" ? 1.5 : 1}
              strokeDasharray={f.status === "scanning" ? "0" : "3 2"} rx="1" />
            {/* TL */}<path d={`M${bx},${by+8} L${bx},${by} L${bx+8},${by}`}
              stroke={f.color} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* TR */}<path d={`M${bx+bw-8},${by} L${bx+bw},${by} L${bx+bw},${by+8}`}
              stroke={f.color} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* BL */}<path d={`M${bx},${by+bh-8} L${bx},${by+bh} L${bx+8},${by+bh}`}
              stroke={f.color} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* BR */}<path d={`M${bx+bw-8},${by+bh} L${bx+bw},${by+bh} L${bx+bw},${by+bh-8}`}
              stroke={f.color} strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* ID badge */}
            <rect x={bx} y={by + bh + 2} width={bw} height={12} fill={f.color} rx="2" />
            <text x={f.cx} y={by + bh + 10.5}
              textAnchor="middle" fill={f.status === "watchlist" ? "#fff" : "#001a08"}
              fontSize="6.5" fontFamily="monospace" fontWeight="bold">{f.label}</text>
          </g>
        );
      })}

      {/* ── ANPR section ── */}
      <line x1="0" y1="183" x2="320" y2="183" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* Car body */}
      <rect x="50" y="193" width="220" height="50" rx="4"
        fill="rgba(28,38,58,0.65)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Windshield */}
      <rect x="90" y="198" width="140" height="22" rx="2" fill="rgba(0,28,55,0.45)" />
      {/* Wheels */}
      <circle cx="73"  cy="247" r="7" fill="rgba(18,22,36,0.9)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <circle cx="247" cy="247" r="7" fill="rgba(18,22,36,0.9)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {/* ANPR label on car */}
      <rect x="50" y="193" width="36" height="11" fill="#00E676" rx="1.5" />
      <text x="68" y="201.5" textAnchor="middle" fill="#001a08" fontSize="6.5" fontFamily="monospace" fontWeight="bold">ANPR</text>

      {/* Number plate detection box */}
      <rect x="120" y="224" width="80" height="22" rx="2"
        fill="rgba(0,230,118,0.08)" stroke="#00E676" strokeWidth="1.5" />
      <path d="M120,231 L120,224 L127,224" stroke="#00E676" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M193,224 L200,224 L200,231" stroke="#00E676" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M120,239 L120,246 L127,246" stroke="#00E676" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M200,239 L200,246 L193,246" stroke="#00E676" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="160" y="239" textAnchor="middle" fill="#00E676"
        fontSize="8.5" fontFamily="monospace" fontWeight="bold" letterSpacing="1">MH12 AB 4782</text>

      {/* Top HUD */}
      <rect width="320" height="28" fill="rgba(0,0,0,0.72)" />
      <circle cx="13" cy="14" r="4.5" fill="#ff4757" />
      <circle cx="13" cy="14" r="8"   fill="none" stroke="#ff4757" strokeWidth="0.75" opacity="0.45" />
      <text x="22"  y="18.5" fill="white"                 fontSize="9"   fontFamily="monospace" fontWeight="bold">LIVE</text>
      <text x="50"  y="18.5" fill="rgba(255,255,255,0.3)"  fontSize="9"  fontFamily="monospace">|</text>
      <text x="57"  y="18.5" fill="rgba(255,255,255,0.65)" fontSize="8"  fontFamily="monospace">CAM-03 · SECURITY GATE</text>
      <text x="312" y="18.5" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="monospace" textAnchor="end">1080p</text>

      {/* Watchlist alert badge */}
      <rect x="208" y="34" width="104" height="17" rx="8.5"
        fill="rgba(255,71,87,0.14)" stroke="#ff4757" strokeWidth="0.75" />
      <circle cx="221" cy="42.5" r="2.5" fill="#ff4757" />
      <text x="228" y="46.5" fill="#ff4757" fontSize="8" fontFamily="monospace" fontWeight="bold">WATCHLIST ALERT</text>

      {/* Stats bar */}
      <rect y="278" width="320" height="42" fill="rgba(0,0,0,0.68)" />
      <line x1="115" y1="284" x2="115" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="218" y1="284" x2="218" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      <text x="10"  y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">FACES</text>
      <text x="10"  y="311" fill="#00AEEF"                fontSize="15"  fontFamily="monospace" fontWeight="bold">4,812</text>
      <text x="57"  y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace"> today</text>

      <text x="125" y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">PLATES READ</text>
      <text x="125" y="311" fill="#00E676"                fontSize="15"  fontFamily="monospace" fontWeight="bold">1,290</text>

      <text x="228" y="294" fill="rgba(255,255,255,0.4)"  fontSize="7.5" fontFamily="monospace">ALERTS</text>
      <text x="228" y="311" fill="#ff4757"                fontSize="15"  fontFamily="monospace" fontWeight="bold">3</text>
      <text x="248" y="311" fill="rgba(255,255,255,0.45)" fontSize="8"   fontFamily="monospace"> today</text>
    </svg>
  );
}

// ── XenTrack custom visual: bird's-eye CCTV scene ─────────────────────────────

function XenTrackVisual() {
  const people = [
    { id: 1, cx: 65,  cy: 110 },
    { id: 2, cx: 102, cy: 158 },
    { id: 3, cx: 175, cy: 98  },
    { id: 4, cx: 262, cy: 148 },
  ];

  return (
    <svg viewBox="0 0 320 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Dark overlay on the card gradient */}
      <rect width="320" height="320" fill="rgba(2,6,18,0.84)" />

      {/* Subtle floor grid */}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={28 + (i + 1) * 22} x2="320" y2={28 + (i + 1) * 22}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} x1={(i + 1) * 24} y1="28" x2={(i + 1) * 24} y2="274"
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      <defs>
        <radialGradient id="xtHot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff5500" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="xtMed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="xtCool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0099ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0099ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Heat zones */}
      <ellipse cx="82"  cy="142" rx="72" ry="82" fill="url(#xtHot)" />
      <ellipse cx="178" cy="118" rx="66" ry="70" fill="url(#xtMed)" />
      <ellipse cx="268" cy="155" rx="48" ry="55" fill="url(#xtCool)" />

      {/* People — bird's-eye circles with detection corner brackets */}
      {people.map((p) => {
        const bx = p.cx - 18, by = p.cy - 18, bs = 36;
        return (
          <g key={p.id}>
            {/* Dashed detection box */}
            <rect x={bx} y={by} width={bs} height={bs}
              fill="rgba(0,230,118,0.06)" stroke="#00E676" strokeWidth="1" strokeDasharray="3 2" />
            {/* Corner accents */}
            <path d={`M${bx},${by+9} L${bx},${by} L${bx+9},${by}`}
              stroke="#00E676" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d={`M${bx+bs-9},${by} L${bx+bs},${by} L${bx+bs},${by+9}`}
              stroke="#00E676" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d={`M${bx},${by+bs-9} L${bx},${by+bs} L${bx+9},${by+bs}`}
              stroke="#00E676" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d={`M${bx+bs-9},${by+bs} L${bx+bs},${by+bs} L${bx+bs},${by+bs-9}`}
              stroke="#00E676" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Shadow */}
            <ellipse cx={p.cx} cy={p.cy + 2} rx="11" ry="4" fill="rgba(0,0,0,0.35)" />
            {/* Head (top-down) */}
            <circle cx={p.cx} cy={p.cy} r="9"   fill="rgba(225,230,255,0.88)" />
            <circle cx={p.cx} cy={p.cy} r="4"   fill="rgba(170,180,230,0.9)"  />
            {/* ID tag */}
            <rect x={bx} y={by + bs + 2} width={bs} height={11} fill="#00E676" rx="1.5" />
            <text x={p.cx} y={by + bs + 10}
              textAnchor="middle" fill="#001a08" fontSize="7" fontFamily="monospace" fontWeight="bold">
              {`P-0${p.id}`}
            </text>
          </g>
        );
      })}

      {/* ── Top HUD bar ── */}
      <rect width="320" height="28" fill="rgba(0,0,0,0.72)" />
      {/* Live dot */}
      <circle cx="14" cy="14" r="4.5" fill="#ff4757" />
      <circle cx="14" cy="14" r="8"   fill="none" stroke="#ff4757" strokeWidth="0.75" opacity="0.45" />
      <text x="24" y="18.5" fill="white"               fontSize="9"   fontFamily="monospace" fontWeight="bold">LIVE</text>
      <text x="52" y="18.5" fill="rgba(255,255,255,0.3)" fontSize="9"  fontFamily="monospace">|</text>
      <text x="59" y="18.5" fill="rgba(255,255,255,0.65)" fontSize="8" fontFamily="monospace">CAM-02 · ENTRANCE HALL</text>
      <text x="312" y="18.5" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="monospace" textAnchor="end">1080p</text>

      {/* Detected count badge */}
      <rect x="238" y="34" width="74" height="17" rx="8.5"
        fill="rgba(0,230,118,0.14)" stroke="#00E676" strokeWidth="0.75" />
      <circle cx="251" cy="42.5" r="2.5" fill="#00E676" />
      <text x="258" y="46.5" fill="#00E676" fontSize="8" fontFamily="monospace" fontWeight="bold">4 detected</text>

      {/* ── Heat legend ── */}
      <text x="8" y="271" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">HEAT:</text>
      <rect x="40" y="263" width="14" height="8" rx="1.5" fill="#0099ff" opacity="0.7" />
      <rect x="56" y="263" width="14" height="8" rx="1.5" fill="#ffcc00" opacity="0.8" />
      <rect x="72" y="263" width="14" height="8" rx="1.5" fill="#ff5500" opacity="0.9" />
      <text x="90" y="271" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">LOW → HIGH</text>

      {/* ── Bottom stats bar ── */}
      <rect y="278" width="320" height="42" fill="rgba(0,0,0,0.68)" />
      <line x1="115" y1="284" x2="115" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="220" y1="284" x2="220" y2="312" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Stat 1 */}
      <text x="10" y="294" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="monospace">TODAY</text>
      <text x="10" y="311" fill="#00E676"              fontSize="15"  fontFamily="monospace" fontWeight="bold">247</text>
      <text x="42" y="311" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace"> visitors</text>

      {/* Stat 2 */}
      <text x="125" y="294" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="monospace">ZONE A</text>
      <text x="125" y="311" fill="#ffcc00"              fontSize="15"  fontFamily="monospace" fontWeight="bold">4.2</text>
      <text x="155" y="311" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace"> min avg</text>

      {/* Stat 3 */}
      <text x="230" y="294" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="monospace">ZONE B</text>
      <text x="230" y="311" fill="#4db8ff"              fontSize="15"  fontFamily="monospace" fontWeight="bold">1.8</text>
      <text x="260" y="311" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace"> min avg</text>
    </svg>
  );
}

// ── Product data ───────────────────────────────────────────────────────────────

interface Product {
  slug: string;
  name: string;
  label: string;
  description: string;
  features: string[];
  color: string;
  iconPath?: string;
  customVisual?: React.ComponentType;
}

const PRODUCTS: Product[] = [
  {
    slug: "xentrack",
    name: "XenTrack",
    label: "AI-enabled Video Analytics",
    description:
      "Understand how people move through your space with real-time footfall counting, zone dwell-time analytics, and AI-generated heatmaps.",
    features: [
      "Video analytics from existing CCTV feeds",
      "Real-time people movement tracking",
      "Zone-level dwell time and engagement metrics",
      "Dashboards and reports for actionable insights",
    ],
    color: "from-blue-600 to-blue-800",
    customVisual: XenTrackVisual,
  },
  {
    slug: "xeninspect",
    name: "XenInspect",
    label: "AI Defect Detection",
    description:
      "Catch defects before they reach your customers. XenInspect runs custom Computer Vision models on your production line to flag faults in real time.",
    features: [
      "Production-speed defect detection on any line",
      "Custom model training on your products & defect types",
      "Automated QC reports per batch and shift",
      "REST API and OPC-UA integration ready",
    ],
    color: "from-indigo-600 to-indigo-800",
    customVisual: XenInspectVisual,
  },
  {
    slug: "xenread",
    name: "XenRead",
    label: "OCR & Image Intelligence",
    description:
      "Turn any image or document into clean, structured data instantly. XenRead extracts, validates and routes information from images, forms, invoices, labels and more.",
    features: [
      "Multi-language OCR with field-level extraction",
      "Handwritten and printed data processing",
      "Automatic image or document classification and routing",
      "Simple REST API and webhook delivery",
    ],
    color: "from-violet-600 to-violet-800",
    customVisual: XenReadVisual,
  },
  {
    slug: "xenscan",
    name: "XenScan",
    label: "Recognition & Surveillance",
    description:
      "Enterprise-grade facial recognition, object tracking and number plate recognition — designed for security, operational intelligence and access control.",
    features: [
      "Multi-feed facial recognition with sub-second latency",
      "Vehicle tracking with number plates across entry points, car parks & roadways",
      "Anonymised demographic crowd profiling",
      "Instant watchlist alerts with GDPR-compliant modes",
    ],
    color: "from-cyan-600 to-cyan-800",
    customVisual: XenScanVisual,
  },
  {
    slug: "xencapture",
    name: "XenCapture",
    label: "3D Content Creation",
    description:
      "Create photorealistic 3D models in minutes. Capture images with any smartphone — XenCapture reconstructs precise, AR/VR-ready 3D models automatically.",
    features: [
      "Automatically reconstruct 3D models using AI — bring the physical world into the digital space effortlessly",
      "Capture images from any smartphone camera",
      "Export to glTF, USDZ, FBX and OBJ formats",
      "Cloud processing — no specialist hardware needed",
    ],
    color: "from-teal-600 to-teal-800",
    customVisual: XenCaptureVisual,
  },
];

// ── Animations ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function ProductsShowcase() {
  return (
    <section className="bg-white">
      {PRODUCTS.map((product, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={product.slug}
            id={product.slug}
            className={`py-24 ${isEven ? "bg-white" : "bg-gray-50"}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div
                className={`flex flex-col lg:flex-row items-center gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                  className="w-full lg:w-1/2 shrink-0"
                >
                  {product.customVisual ? (
                    <div
                      className={`rounded-3xl bg-gradient-to-br ${product.color} aspect-square max-w-md mx-auto shadow-2xl overflow-hidden`}
                    >
                      <product.customVisual />
                    </div>
                  ) : (
                    <div
                      className={`rounded-3xl bg-gradient-to-br ${product.color} p-16 flex items-center justify-center aspect-square max-w-md mx-auto shadow-2xl`}
                    >
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-90"
                      >
                        <path d={product.iconPath} />
                      </svg>
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="w-full lg:w-1/2"
                >
                  <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
                    {product.label}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-lg text-gray-500 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2E3192] to-[#00AEEF] hover:opacity-90 text-white font-semibold px-8 py-3.5 rounded-full transition-opacity text-base"
                  >
                    Know more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
