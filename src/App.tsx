/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fuel, Timer, Flame, MapPin, Trophy, AlertTriangle, Heart, Maximize, Minimize, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Assets ---
const panchitosSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140"><defs><linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e6c27a" /><stop offset="50%" stop-color="#fff0b3" /><stop offset="100%" stop-color="#d4af37" /></linearGradient></defs><path d="M5,0 L95,0 C85,40 85,100 95,140 L5,140 C15,100 15,40 5,0 Z" fill="url(#gold)" /><g transform="translate(5,0)"><rect x="0" y="0" width="10" height="15" fill="#cc0000" rx="2"/><rect x="10" y="0" width="10" height="15" fill="#ffffff" rx="2"/><rect x="20" y="0" width="10" height="15" fill="#000066" rx="2"/><rect x="30" y="0" width="10" height="15" fill="#cc0000" rx="2"/><rect x="40" y="0" width="10" height="15" fill="#ffffff" rx="2"/><rect x="50" y="0" width="10" height="15" fill="#000066" rx="2"/><rect x="60" y="0" width="10" height="15" fill="#cc0000" rx="2"/><rect x="70" y="0" width="10" height="15" fill="#ffffff" rx="2"/><rect x="80" y="0" width="10" height="15" fill="#000066" rx="2"/></g><g transform="translate(5,125)"><rect x="0" y="0" width="10" height="15" fill="#cc0000" rx="2"/><rect x="10" y="0" width="10" height="15" fill="#ffffff" rx="2"/><rect x="20" y="0" width="10" height="15" fill="#000066" rx="2"/><rect x="30" y="0" width="10" height="15" fill="#cc0000" rx="2"/><rect x="40" y="0" width="10" height="15" fill="#ffffff" rx="2"/><rect x="50" y="0" width="10" height="15" fill="#000066" rx="2"/><rect x="60" y="0" width="10" height="15" fill="#cc0000" rx="2"/><rect x="70" y="0" width="10" height="15" fill="#ffffff" rx="2"/><rect x="80" y="0" width="10" height="15" fill="#000066" rx="2"/></g><ellipse cx="35" cy="25" rx="20" ry="10" fill="#000066" /><text x="35" y="29" fill="#fff" font-family="cursive, sans-serif" font-size="10" font-style="italic" text-anchor="middle">Carli</text><text x="50" y="65" fill="#ff3333" stroke="#fff" stroke-width="1.5" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">Panchitos</text><path d="M25,120 C25,80 75,80 75,120 Z" fill="#000066" /><path d="M25,105 C10,105 10,75 30,85 C20,90 25,100 25,105 Z" fill="#ffff00" stroke="#000" stroke-width="0.5"/><path d="M75,105 C90,105 90,75 70,85 C80,90 75,100 75,105 Z" fill="#ffff00" stroke="#000" stroke-width="0.5"/><path d="M50,85 L45,115 L55,115 Z" fill="#ffffff" /></svg>`;
const sancochoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#cce0e5" stroke="#8b5a2b" stroke-width="2" /><path d="M15,50 A35,35 0 0,1 50,15" fill="none" stroke="#000" stroke-width="3" /><path d="M85,50 A35,35 0 0,1 50,85" fill="none" stroke="#000" stroke-width="3" /><circle cx="25" cy="25" r="4" fill="#a06070" /><circle cx="75" cy="75" r="4" fill="#a06070" /><circle cx="75" cy="25" r="4" fill="#7060a0" /><circle cx="25" cy="75" r="4" fill="#7060a0" /><circle cx="50" cy="50" r="32" fill="#a89000" /><rect x="35" y="25" width="25" height="15" rx="2" fill="#ffcc00" /><rect x="45" y="45" width="20" height="30" rx="2" fill="#ffcc00" transform="rotate(-40 55 60)" /><rect x="25" y="45" width="18" height="18" rx="6" fill="#ffffe0" /><path d="M45,65 C55,60 65,70 60,80 C50,85 40,75 45,65 Z" fill="#d2691e" /><circle cx="40" cy="40" r="1.5" fill="#00ff00" /><circle cx="45" cy="42" r="1.5" fill="#00ff00" /><circle cx="60" cy="35" r="1.5" fill="#00ff00" /><circle cx="35" cy="60" r="1.5" fill="#00ff00" /><circle cx="55" cy="70" r="1.5" fill="#00ff00" /><circle cx="65" cy="55" r="1.5" fill="#00ff00" /></svg>`;
const gelatinaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140"><path d="M30,5 L70,5 L60,35 L40,35 Z" fill="#f5c242" stroke="#d49a1c" stroke-width="1" /><path d="M35,5 L55,35 M45,5 L60,25 M55,5 L65,20 M30,15 L45,35 M30,25 L35,35" stroke="#d49a1c" stroke-width="1" /><path d="M65,5 L45,35 M55,5 L40,25 M45,5 L35,20 M70,15 L55,35 M70,25 L65,35" stroke="#d49a1c" stroke-width="1" /><ellipse cx="50" cy="35" rx="18" ry="3" fill="#f5c242" /><rect x="42" y="35" width="16" height="15" fill="#f5c242" /><path d="M42,50 C80,45 110,80 80,125 C50,160 5,130 5,110 C5,90 30,70 42,50 Z" fill="#ffaa00" /><path d="M45,65 C70,65 85,85 75,115" fill="none" stroke="#ffcc66" stroke-width="3" stroke-linecap="round" /><path d="M15,110 C20,100 35,90 40,85" fill="none" stroke="#ffcc66" stroke-width="2" stroke-linecap="round" /></svg>`;
const veladoraSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150"><defs><linearGradient id="flameGrad" x1="0%" y1="100%" x2="30%" y2="0%"><stop offset="0%" stop-color="#cc5500"/><stop offset="40%" stop-color="#ffaa00"/><stop offset="80%" stop-color="#ffffaa"/><stop offset="100%" stop-color="#ffffff"/></linearGradient></defs><g transform="translate(50, 100)"><path d="M0,0 L0,45 A22.5,6 0 0,0 45,45 L45,0 Z" fill="#8b2a2a"/><ellipse cx="22.5" cy="0" rx="22.5" ry="6" fill="#a54242"/><path d="M22.5,0 L20,-8" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M20,-8 C28,-10 28,-20 20,-30 C15,-35 10,-40 5,-40 C10,-25 15,-15 20,-8 Z" fill="url(#flameGrad)"/><path d="M0,15 A22.5,6 0 0,0 45,15" stroke="#5a1a1a" stroke-width="1" fill="none"/><path d="M0,30 A22.5,6 0 0,0 45,30" stroke="#5a1a1a" stroke-width="1" fill="none"/></g><g transform="translate(5, 55)"><path d="M0,0 L0,90 A25,7 0 0,0 50,90 L50,0 Z" fill="#d4a017"/><ellipse cx="25" cy="0" rx="25" ry="7" fill="#e5b73b"/><path d="M25,0 L22,-10" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22,-10 C32,-15 32,-30 22,-45 C15,-55 5,-65 0,-65 C10,-40 15,-20 22,-10 Z" fill="url(#flameGrad)"/><path d="M0,10 A25,7 0 0,0 50,10" stroke="#a87b00" stroke-width="1.5" fill="none"/><path d="M0,80 A25,7 0 0,0 50,80" stroke="#a87b00" stroke-width="1.5" fill="none"/><rect x="12" y="25" width="26" height="40" fill="#1a2530" stroke="#5c3a21" stroke-width="1.5"/><path d="M25,30 L20,50 L30,50 Z" fill="#2980b9"/><circle cx="25" cy="28" r="2.5" fill="#f1c40f"/><path d="M15,55 L13,65 L18,65 Z" fill="#ecf0f1"/><path d="M35,55 L32,65 L37,65 Z" fill="#7f8c8d"/><circle cx="15.5" cy="53" r="1.5" fill="#f5b041"/><circle cx="34.5" cy="53" r="1.5" fill="#f5b041"/></g></svg>`;
const llamaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140"><path d="M22,100 L22,135 A4,4 0 0,0 30,135 L30,100 Z" fill="#b8b8b8" /><path d="M62,100 L62,135 A4,4 0 0,0 70,135 L70,100 Z" fill="#b8b8b8" /><path d="M10,80 C5,80 0,95 5,105 C10,110 15,110 20,110 L70,110 C80,110 85,100 80,90 C75,80 70,60 65,40 L65,25 C65,15 50,15 50,25 C50,35 45,50 40,65 C30,75 20,80 10,80 Z" fill="#cccccc" /><path d="M10,100 L12,135 A4,4 0 0,0 20,135 L20,100 Z" fill="#cccccc" /><path d="M52,100 L54,135 A4,4 0 0,0 62,135 L62,100 Z" fill="#cccccc" /><path d="M5,100 C0,100 0,90 5,90 Z" fill="#cccccc" /><path d="M8,95 L8,105" stroke="#b8b8b8" stroke-width="1.5" stroke-linecap="round" /><path d="M60,120 L60,135" stroke="#b8b8b8" stroke-width="1.5" stroke-linecap="round" /><path d="M18,120 L18,135" stroke="#b8b8b8" stroke-width="1.5" stroke-linecap="round" /><path d="M50,25 C50,15 65,15 65,25 L65,35 C75,35 85,35 85,25 C85,20 75,15 65,15 Z" fill="#cccccc" /><path d="M65,15 C75,15 85,20 85,25 C85,30 75,35 65,35 Z" fill="#cccccc" /><circle cx="65" cy="25" r="10" fill="#cccccc" /><path d="M52,18 L55,5 L60,15 Z" fill="#cccccc" /><path d="M62,18 L65,5 L70,15 Z" fill="#cccccc" /><circle cx="68" cy="22" r="2.5" fill="#000" /><path d="M75,20 L75,32 M78,21 L78,31 M81,23 L81,29" stroke="#f0127e" stroke-width="2" /><circle cx="50" cy="15" r="5" fill="#cb2c3b" /><circle cx="55" cy="15" r="5" fill="#cb2c3b" /><circle cx="65" cy="15" r="5" fill="#cb2c3b" /><circle cx="75" cy="15" r="5" fill="#cb2c3b" /><circle cx="50" cy="10" r="6" fill="#007bb5" /><circle cx="60" cy="8" r="6" fill="#007bb5" /><circle cx="70" cy="8" r="6" fill="#007bb5" /><circle cx="78" cy="10" r="6" fill="#007bb5" /><circle cx="55" cy="5" r="6" fill="#d4c35e" /><circle cx="65" cy="2" r="7" fill="#d4c35e" /><circle cx="72" cy="5" r="6" fill="#d4c35e" /><path d="M45,50 L65,65 L70,55 L50,40 Z" fill="#f0127e" /><path d="M40,65 L65,80 L70,70 L45,55 Z" fill="#f0127e" /><path d="M15,75 L45,70 L45,100 C45,105 40,110 35,110 L25,110 C20,110 15,105 15,100 Z" fill="#f0127e" /><path d="M40,70 L45,70 L45,100 C45,105 40,110 35,110 L35,108 C40,108 42,103 42,100 L40,70 Z" fill="#d81071" /><path d="M15,110 L15,115 M20,110 L20,115 M25,110 L25,115 M30,110 L30,115 M35,110 L35,115 M40,110 L40,115 M45,105 L45,110" stroke="#f0127e" stroke-width="2" stroke-linecap="round" /><path d="M45,65 L75,85 M48,68 L78,88 M51,71 L81,91 M54,74 L84,94 M57,77 L87,97" stroke="#f0127e" stroke-width="1.5" stroke-linecap="round" /><path d="M52,18 Q40,50 45,70 M53,18 Q42,50 47,70 M54,18 Q44,50 49,70 M55,18 Q46,50 51,70" fill="none" stroke="#f0127e" stroke-width="1.5" /><path d="M68,30 Q75,80 85,130 M69,30 Q80,80 90,130 M70,30 Q85,80 95,130 M71,30 Q90,80 100,130 M72,30 Q95,80 105,130 M73,30 Q100,80 110,130" fill="none" stroke="#f0127e" stroke-width="1.5" /></svg>`;
const shrineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><pattern id="brick" width="20" height="10" patternUnits="userSpaceOnUse"><rect width="20" height="10" fill="#889088" /><path d="M0,5 L20,5 M10,0 L10,5 M0,5 L0,10 M20,5 L20,10" stroke="#a0a8a0" stroke-width="1" /></pattern></defs><polygon points="85,30 115,30 115,80 85,80" fill="url(#brick)" /><polygon points="45,80 155,80 145,130 55,130" fill="url(#brick)" /><polygon points="5,130 195,130 175,190 25,190" fill="url(#brick)" /><rect x="85" y="30" width="30" height="50" fill="url(#brick)" /><polygon points="85,30 100,0 115,30" fill="#d0d0d0" /><path d="M 70,190 L 70,140 A 30,30 0 0,1 130,140 L 130,190 Z" fill="#444444" /><polygon points="75,160 125,160 130,190 70,190" fill="#cccccc" /><path d="M45,80 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,-6 l2,-6 l2,6 l2,-6 l2,-6 l2,-6 l2,-6 l2,-6 l2,6" fill="#e0e0e0" /><path d="M115,80 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,-6 l2,-6 l2,6" fill="#e0e0e0" /><path d="M5,130 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,-6 l2,-6 l2,-6 l2,-6 l2,6" fill="#e0e0e0" /><path d="M145,130 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,-6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6 l2,-6 l2,6" fill="#e0e0e0" /><g transform="translate(0, 10)"><rect x="75" y="160" width="4" height="10" fill="#ff0000"/><circle cx="77" cy="158" r="2" fill="#ffff00"/><rect x="82" y="165" width="4" height="8" fill="#0000ff"/><circle cx="84" cy="163" r="2" fill="#ffff00"/><rect x="88" y="155" width="4" height="12" fill="#00ff00"/><circle cx="90" cy="153" r="2" fill="#ffff00"/><rect x="95" y="162" width="4" height="9" fill="#ffff00"/><circle cx="97" cy="160" r="2" fill="#ffff00"/><rect x="102" y="158" width="4" height="11" fill="#ff00ff"/><circle cx="104" cy="156" r="2" fill="#ffff00"/><rect x="110" y="166" width="4" height="7" fill="#00ffff"/><circle cx="112" cy="164" r="2" fill="#ffff00"/><rect x="118" y="160" width="4" height="10" fill="#ff8800"/><circle cx="120" cy="158" r="2" fill="#ffff00"/><rect x="80" y="170" width="4" height="10" fill="#ff0000"/><circle cx="82" cy="168" r="2" fill="#ffff00"/><rect x="90" y="172" width="4" height="8" fill="#0000ff"/><circle cx="92" cy="170" r="2" fill="#ffff00"/><rect x="100" y="168" width="4" height="12" fill="#00ff00"/><circle cx="102" cy="166" r="2" fill="#ffff00"/><rect x="115" y="170" width="4" height="9" fill="#ffff00"/><circle cx="117" cy="168" r="2" fill="#ffff00"/></g></svg>`;
const playerCarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 250"><path d="M10,70 C10,10 90,10 90,70 L90,180 C90,240 10,240 10,180 Z" fill="#9e8e58" /><path d="M15,75 C15,30 85,30 85,75 L85,175 C85,220 15,220 15,175 Z" fill="#b0a378" /><path d="M15,75 C15,50 85,50 85,75 L85,100 L15,100 Z" fill="#ffffff" /><path d="M15,175 C15,200 85,200 85,175 L85,150 L15,150 Z" fill="#ffffff" /><path d="M15,100 L20,100 L20,150 L15,150 Z" fill="#ffffff" /><path d="M85,100 L80,100 L80,150 L85,150 Z" fill="#ffffff" /><path d="M22,70 C22,55 78,55 78,70 L78,105 L22,105 Z" fill="#a09880" /><path d="M22,180 C22,195 78,195 78,180 L78,145 L22,145 Z" fill="#a09880" /><path d="M18,105 L22,105 L22,145 L18,145 Z" fill="#605c48" /><path d="M82,105 L78,105 L78,145 L82,145 Z" fill="#605c48" /><path d="M22,105 L78,105 L78,145 L22,145 Z" fill="#706850" /><path d="M15,75 L22,70 M85,75 L78,70 M15,175 L22,180 M85,175 L78,180" stroke="#ffffff" stroke-width="2" /><path d="M35,145 C25,145 25,125 35,115 L40,120 C35,125 35,135 40,140 Z" fill="#3030b0" /><path d="M65,145 C75,145 75,125 65,115 L60,120 C65,125 65,135 60,140 Z" fill="#3030b0" /><circle cx="50" cy="145" r="15" fill="#a06040" /><circle cx="50" cy="145" r="13" fill="#b07050" /><path d="M45,145 L55,145 L50,135 Z" fill="#f0c0a0" /><path d="M35,115 L40,120 L35,125 L30,120 Z" fill="#80b0b0" /><path d="M65,115 L60,120 L65,125 L70,120 Z" fill="#80b0b0" /><path d="M30,120 L35,115 L32,110 L28,115 Z" fill="#f0c0a0" /><path d="M70,120 L65,115 L68,110 L72,115 Z" fill="#f0c0a0" /><path d="M35,145 L65,145 L65,155 L35,155 Z" fill="#3030b0" /></svg>`;

const panchitosImg = new Image();
panchitosImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(panchitosSvg)}`;
const sancochoImg = new Image();
sancochoImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sancochoSvg)}`;
const gelatinaImg = new Image();
gelatinaImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(gelatinaSvg)}`;
const veladoraImg = new Image();
veladoraImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(veladoraSvg)}`;
const llamaImg = new Image();
llamaImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(llamaSvg)}`;
const shrineImg = new Image();
shrineImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(shrineSvg)}`;

const comodinFireSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130">
  <path d="M50,130 C20,130 0,100 0,70 C0,40 15,10 50,0 C85,10 100,40 100,70 C100,100 80,130 50,130 Z" fill="#FFEB3B" />
  <path d="M50,120 C30,120 10,95 10,70 C10,45 25,25 50,15 C75,25 90,45 90,70 C90,95 70,120 50,120 Z" fill="#F57C00" />
  <path d="M50,110 C35,110 20,90 20,70 C20,50 35,35 50,25 C65,35 80,50 80,70 C80,90 65,110 50,110 Z" fill="#D32F2F" />
  <path d="M50,10 L40,40 L50,35 L60,40 Z" fill="#FFEB3B" />
  <path d="M25,30 L15,60 L25,55 L35,65 Z" fill="#F57C00" />
  <path d="M75,30 L85,60 L75,55 L65,65 Z" fill="#F57C00" />
  <path d="M50,40 C40,60 35,80 35,90 C35,100 45,110 50,110 C55,110 65,100 65,90 C65,80 60,60 50,40 Z" fill="#FFEB3B" />
</svg>`;

const comodinFireImg = new Image();
comodinFireImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(comodinFireSvg)}`;

const derrumbeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150">
  <path d="M35,5 L15,35 L45,30 L35,60 L65,55 L55,85 L95,105 L85,135 L55,145 L25,130 L35,115 L5,125 L15,95 L0,85 L15,65 L5,45 L35,50 Z" fill="#a07850" stroke="#604020" stroke-width="4" stroke-linejoin="round" />
</svg>`;

const derrumbeImg = new Image();
derrumbeImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(derrumbeSvg)}`;

const playerCarImg = new Image();
playerCarImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(playerCarSvg)}`;

const steeringWheelSvg = `<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="cammo" patternUnits="userSpaceOnUse" width="1000" height="1000">
      <rect width="1000" height="1000" fill="#b0a378" />
      <path d="M0 0 L500 500 L1000 0 Z" fill="#9e8e58" />
      <path d="M1000 0 L500 500 L1000 1000 Z" fill="#706850" />
      <path d="M1000 1000 L500 500 L0 1000 Z" fill="#a09880" />
      <path d="M0 1000 L500 500 L0 0 Z" fill="#605c48" />
      <path d="M200 200 Q 500 100 800 200 T 500 300 Z" fill="#9e8e58" opacity="0.4" />
      <path d="M200 800 Q 500 900 800 800 T 500 700 Z" fill="#706850" opacity="0.4" />
    </pattern>
  </defs>
  <path d="M500 0C223.9 0 0 223.9 0 500s223.9 500 500 500 500-223.9 500-500S776.1 0 500 0zm0 80c231.9 0 420 188.1 420 420S731.9 920 500 920 80 731.9 80 500 268.1 80 500 80z" fill="url(#cammo)" />
  <circle cx="500" cy="500" r="100" fill="url(#cammo)" />
  <path d="M500 400 L150 200 C250 100 750 100 850 200 L500 400 Z" fill="url(#cammo)" />
  <path d="M430 550 L150 800 C100 700 100 600 150 500 L430 550 Z" fill="url(#cammo)" />
  <path d="M570 550 L850 800 C900 700 900 600 850 500 L570 550 Z" fill="url(#cammo)" />
  <circle cx="500" cy="500" r="60" fill="white" />
</svg>`;

const steeringWheelImg = new Image();
steeringWheelImg.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(steeringWheelSvg)}`;

// --- Constants ---
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 60;
const ROAD_WIDTH = 300;
const FPS = 60;

enum GameState {
  MENU,
  PLAYING,
  TRANSITION,
  GAME_OVER,
  WIN
}

enum Level {
  NORMAL = 1,
  DESTAPADA = 2,
  CAMINO = 3
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  speedModifier?: number;
  collected?: boolean;
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [level, setLevel] = useState<Level>(Level.NORMAL);
  const [fuel, setFuel] = useState(100);
  const [candles, setCandles] = useState(0);
  const [time, setTime] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [showComodin, setShowComodin] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeControls, setActiveControls] = useState<{ [key: string]: boolean }>({});

  // Game Loop Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const playerRef = useRef({ x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 120 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const obstaclesRef = useRef<GameObject[]>([]);
  const itemsRef = useRef<GameObject[]>([]);
  const roadOffsetRef = useRef(0);
  const roadCenterRef = useRef(CANVAS_WIDTH / 2);
  const targetRoadCenterRef = useRef(0);
  const cameraAngleRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const levelDistanceRef = useRef(0);
  const levelTimeRef = useRef(0);
  const spawnedCandlesRef = useRef(0);
  const lastObstacleYRef = useRef(-500);

  // --- Level Configs ---
  const LEVEL_DURATION = 60; // 60 seconds per level

  // --- Initialization ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = true;

      // 'j' to start from menu
      if (key === 'j') {
        if (gameState === GameState.MENU) {
          startGame();
        }
      }
      // 'k' to restart from game over or win
      if (key === 'k') {
        if (gameState === GameState.GAME_OVER || gameState === GameState.WIN) {
          startGame();
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startGame = () => {
    setGameState(GameState.PLAYING);
    setLevel(Level.NORMAL);
    setFuel(100);
    setCandles(0);
    setTime(0);
    setLives(3);
    setScore(0);
    setSpeed(0);
    setDistance(0);
    spawnedCandlesRef.current = 0;
    levelDistanceRef.current = 0;
    levelTimeRef.current = 0;
    targetRoadCenterRef.current = 0;
    cameraAngleRef.current = 0;
    obstaclesRef.current = [];
    itemsRef.current = [];
    playerRef.current = { x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 120 };
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleControlStart = (key: string) => {
    keysRef.current[key] = true;
    setActiveControls(prev => ({ ...prev, [key]: true }));
  };

  const handleControlEnd = (key: string) => {
    keysRef.current[key] = false;
    setActiveControls(prev => ({ ...prev, [key]: false }));
  };

  const handleSteeringTouch = (e: React.TouchEvent) => {
    if (gameState !== GameState.PLAYING) return;
    e.preventDefault();
    if (e.targetTouches.length === 0) return;
    
    const touch = e.targetTouches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deadzone = 10; // Small deadzone to prevent flickering
    
    if (touch.clientX < centerX - deadzone) {
      // Steering left
      keysRef.current['a'] = true;
      keysRef.current['d'] = false;
      setActiveControls(prev => ({ ...prev, 'a': true, 'd': false }));
    } else if (touch.clientX > centerX + deadzone) {
      // Steering right
      keysRef.current['a'] = false;
      keysRef.current['d'] = true;
      setActiveControls(prev => ({ ...prev, 'a': false, 'd': true }));
    } else {
      // Neutral
      keysRef.current['a'] = false;
      keysRef.current['d'] = false;
      setActiveControls(prev => ({ ...prev, 'a': false, 'd': false }));
    }
  };

  const handleSteeringEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.targetTouches.length === 0) {
      keysRef.current['a'] = false;
      keysRef.current['d'] = false;
      setActiveControls(prev => ({ ...prev, 'a': false, 'd': false }));
    } else {
      handleSteeringTouch(e);
    }
  };

  const nextLevel = useCallback(() => {
    if (level === Level.CAMINO) {
      setGameState(GameState.WIN);
    } else {
      setLevel(prev => (prev + 1) as Level);
      setGameState(GameState.PLAYING);
      levelDistanceRef.current = 0;
      levelTimeRef.current = 0;
      targetRoadCenterRef.current = 0;
      cameraAngleRef.current = 0;
      setFuel(prev => Math.min(prev + 30, 100)); // Bonus fuel
      obstaclesRef.current = [];
      itemsRef.current = [];
    }
  }, [level]);

  const handleComodin = useCallback(() => {
    setLives(prev => prev + 1);
    setFuel(100);
    setShowComodin(false);
    nextLevel();
  }, [nextLevel]);

  useEffect(() => {
    if (gameState === GameState.TRANSITION && showComodin) {
      const timer = setTimeout(() => {
        handleComodin();
      }, 2500); // 2.5 seconds automatic transition
      return () => clearTimeout(timer);
    }
  }, [gameState, showComodin, handleComodin]);

  // --- Game Logic ---
  const update = useCallback((deltaTime: number) => {
    if (gameState !== GameState.PLAYING && gameState !== GameState.TRANSITION) return;

    let effectiveSpeed = speed;

    if (gameState === GameState.TRANSITION) {
      effectiveSpeed = 3; // Constant "normal" speed for the transition
      if (speed !== 3) setSpeed(3);
    } else {
      // Movement
      const accel = 0.15;
      const friction = 0.02; // Reduced friction for easier handling
      // Lowered max speeds for easier difficulty
      const maxSpeed = level === Level.NORMAL ? 3 : level === Level.DESTAPADA ? 2.5 : 4;

      if (keysRef.current['w']) {
        setSpeed(prev => Math.min(prev + accel, maxSpeed));
      } else if (keysRef.current['s']) {
        setSpeed(prev => Math.max(prev - accel * 2, 0));
      } else {
        setSpeed(prev => Math.max(prev - friction, 0));
      }
      effectiveSpeed = speed;
    }

    if (effectiveSpeed > 0) {
      if (gameState === GameState.PLAYING) {
        const maxSpeedRef = level === Level.NORMAL ? 3 : level === Level.DESTAPADA ? 2.5 : 4;
        if (keysRef.current['a']) playerRef.current.x -= 5 * (effectiveSpeed / maxSpeedRef + 0.5); // increased steering
        if (keysRef.current['d']) playerRef.current.x += 5 * (effectiveSpeed / maxSpeedRef + 0.5); // increased steering
      }

      // Road Curving Logic
      // Change target curve intensity occasionally, but keep it straight for the first 3 seconds
      if (levelTimeRef.current > 3 && Math.random() < 0.02) { 
        targetRoadCenterRef.current = (Math.random() * 2 - 1); // Target curve intensity (-1 to 1)
      } else if (levelTimeRef.current <= 3) {
        targetRoadCenterRef.current = 0;
      }
      
      // Smoothly move curve intensity
      cameraAngleRef.current += (targetRoadCenterRef.current - cameraAngleRef.current) * 0.02;

      // Apply centrifugal force to player based on curve and speed
      if (gameState === GameState.PLAYING && effectiveSpeed > 0) {
         playerRef.current.x -= cameraAngleRef.current * (effectiveSpeed / 5) * 3;
      }

      // Ensure roadCenterRef stays fixed in the center
      roadCenterRef.current = CANVAS_WIDTH / 2;

      // Boundary Check
      const roadLeft = roadCenterRef.current - ROAD_WIDTH / 2;
      const roadRight = roadLeft + ROAD_WIDTH - PLAYER_WIDTH;
      
      if (playerRef.current.x < roadLeft) playerRef.current.x = roadLeft;
      if (playerRef.current.x > roadRight) playerRef.current.x = roadRight;

      // Distance & Fuel
      if (gameState === GameState.PLAYING) {
        setDistance(prev => prev + effectiveSpeed);
        levelDistanceRef.current += effectiveSpeed;
        setFuel(prev => Math.max(prev - 0.05 * (effectiveSpeed / 5), 0));
      }
      roadOffsetRef.current = (roadOffsetRef.current + effectiveSpeed) % 100;
    }

    // Time
    if (gameState === GameState.PLAYING) {
      const dtSec = deltaTime / 1000;
      setTime(prev => prev + dtSec);
      levelTimeRef.current += dtSec;
    }

    // Obstacle Spawning (Distance based to ensure "few" and "1 per row" feel)
    if (gameState === GameState.PLAYING) {
      const minGap = 300; // Large vertical gap for "few" obstacles
      if (speed > 0 && (obstaclesRef.current.length === 0 || obstaclesRef.current[obstaclesRef.current.length - 1].y > minGap)) {
        const spawnRate = level === Level.NORMAL ? 0.01 : level === Level.DESTAPADA ? 0.02 : 0.03;
        if (Math.random() < spawnRate) {
          const type = getObstacleType(level);
          const roadLeftNow = roadCenterRef.current - ROAD_WIDTH / 2;
          obstaclesRef.current.push({
            x: roadLeftNow + Math.random() * (ROAD_WIDTH - 40),
            y: -50,
            width: 40,
            height: 40,
            type,
            speedModifier: type === 'Llama' ? (Math.random() > 0.5 ? 2 : -2) : 0
          });
        }
      }

      // Item Spawning (Fuel/Candles/Score)
      if (Math.random() < 0.015) {
        const rand = Math.random();
        const roadLeftNow = roadCenterRef.current - ROAD_WIDTH / 2;
        let type = 'Panchitos';
        
        if (spawnedCandlesRef.current < 7 && rand < 0.05) {
            type = 'Veladora';
            spawnedCandlesRef.current += 1;
            
            // Spawn Shrine on the side of the road
            const side = Math.random() > 0.5 ? 1 : -1;
            const shrineX = side === 1 ? roadLeftNow + ROAD_WIDTH + 10 : roadLeftNow - 90;
            obstaclesRef.current.push({
              x: shrineX,
              y: -50,
              width: 80,
              height: 80,
              type: 'Shrine',
              speedModifier: 0
            });
        } else {
            if (rand > 0.6) type = 'Panchitos';
            else if (rand > 0.3) type = 'Gelatina';
            else type = 'Sancocho';
        }
        
        let width = 30;
        let height = 30;
        if (type === 'Veladora') { width = 40; height = 60; }
        else if (type === 'Panchitos') { width = 30; height = 42; }
        else if (type === 'Gelatina') { width = 30; height = 42; }
        else if (type === 'Sancocho') { width = 35; height = 35; }

        if (type !== 'Shrine') {
          itemsRef.current.push({
            x: roadLeftNow + Math.random() * (ROAD_WIDTH - width),
            y: -50,
            width,
            height,
            type
          });
        }
      }
    }

    // Update Obstacles & Items
    obstaclesRef.current.forEach(obj => {
      obj.y += effectiveSpeed;
      if (obj.type === 'Llama' && obj.speedModifier) {
        obj.x += obj.speedModifier;
        // Bounce off road edges
        const roadLeftNow = roadCenterRef.current - ROAD_WIDTH / 2;
        if (obj.x < roadLeftNow || obj.x > roadLeftNow + ROAD_WIDTH - obj.width) {
          obj.speedModifier *= -1;
        }
      }
    });
    itemsRef.current.forEach(obj => obj.y += effectiveSpeed);

    if (gameState === GameState.PLAYING) {
      // Collision Detection
      obstaclesRef.current = obstaclesRef.current.filter(obj => {
        if (obj.type !== 'Shrine' && checkCollision(playerRef.current, obj)) {
          setLives(prev => prev - 1);
          setSpeed(0);
          return false;
        }
        return obj.y < CANVAS_HEIGHT;
      });

      itemsRef.current = itemsRef.current.filter(obj => {
        if (checkCollision(playerRef.current, obj)) {
          if (obj.type === 'Panchitos') {
            setFuel(prev => Math.min(prev + 40, 100));
            setScore(prev => prev + 50);
          } else if (obj.type === 'Veladora') {
            setCandles(prev => prev + 1);
            setScore(prev => prev + 100);
          } else if (obj.type === 'Gelatina') {
            setFuel(prev => Math.min(prev + 20, 100));
            setScore(prev => prev + 75);
          } else if (obj.type === 'Sancocho') {
            setFuel(prev => Math.min(prev + 60, 100));
            setScore(prev => prev + 150);
          }
          return false;
        }
        return obj.y < CANVAS_HEIGHT;
      });

      // Game Over Checks
      if (fuel <= 0 || lives <= 0) {
        setGameState(GameState.GAME_OVER);
      }

      // Level Completion
      if (levelTimeRef.current >= LEVEL_DURATION) {
        if (level === Level.CAMINO) {
          setGameState(GameState.WIN);
        } else {
          setGameState(GameState.TRANSITION);
          setShowComodin(true);
        }
      }
    }

  }, [gameState, level, speed, fuel, lives]);

  const getObstacleType = (lvl: Level) => {
    if (lvl === Level.NORMAL) return 'Llama';
    if (lvl === Level.DESTAPADA) return Math.random() > 0.5 ? 'Derrumbe' : 'Fire';
    return 'Llama';
  };

  const checkCollision = (p: { x: number, y: number }, obj: GameObject) => {
    return (
      p.x < obj.x + obj.width &&
      p.x + PLAYER_WIDTH > obj.x &&
      p.y < obj.y + obj.height &&
      p.y + PLAYER_HEIGHT > obj.y
    );
  };

  // --- Rendering ---
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Helper to calculate horizontal shift based on Y position to simulate curve
    const getCurveShift = (y: number) => {
      // Elements further up the screen (lower Y) shift more towards the curve target
      const distanceToBottom = CANVAS_HEIGHT - y;
      // cameraAngleRef.current holds the curve intensity
      return cameraAngleRef.current * (distanceToBottom * distanceToBottom) * 0.001; 
    };

    // Background: Patchwork of greens
    ctx.fillStyle = '#7cb324'; // Base green
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw field lines to simulate the patchwork
    ctx.strokeStyle = '#5a8c14';
    ctx.lineWidth = 6;
    const gridSize = 120;
    const offsetY = (roadOffsetRef.current * 0.5) % gridSize;
    
    ctx.beginPath();
    for (let y = -gridSize; y < CANVAS_HEIGHT + gridSize; y += gridSize) {
      ctx.moveTo(0, y + offsetY);
      for(let x = 0; x <= CANVAS_WIDTH; x += 40) {
         ctx.lineTo(x, y + offsetY + Math.sin(x * 0.05) * 10);
      }
    }
    for (let x = 0; x < CANVAS_WIDTH; x += gridSize) {
      ctx.moveTo(x, 0);
      for(let y = 0; y <= CANVAS_HEIGHT; y += 40) {
         ctx.lineTo(x + Math.sin(y * 0.05) * 10, y);
      }
    }
    ctx.stroke();

    // Draw River in background
    ctx.fillStyle = '#0066cc';
    ctx.beginPath();
    const riverOffset = (roadOffsetRef.current * 0.2) % CANVAS_HEIGHT;
    for (let y = -50; y <= CANVAS_HEIGHT + 50; y += 50) {
      const riverX = CANVAS_WIDTH / 2 + Math.sin((y + riverOffset) * 0.01) * 150;
      if (y === -50) ctx.moveTo(riverX - 40, y);
      else ctx.lineTo(riverX - 40, y);
    }
    for (let y = CANVAS_HEIGHT + 50; y >= -50; y -= 50) {
      const riverX = CANVAS_WIDTH / 2 + Math.sin((y + riverOffset) * 0.01) * 150;
      ctx.lineTo(riverX + 40, y);
    }
    ctx.fill();

    // Road
    const segmentHeight = 20;
    const roadColor = level === Level.DESTAPADA ? '#e0b888' : '#555555';
    const borderColor = level === Level.DESTAPADA ? '#2a4c14' : '#5cce14';
    
    // Draw Border (Shoulder)
    ctx.fillStyle = borderColor;
    for (let y = -segmentHeight; y < CANVAS_HEIGHT + segmentHeight; y += segmentHeight) {
      const curveShift = getCurveShift(y);
      const roadLeft = roadCenterRef.current - ROAD_WIDTH / 2 + curveShift;
      ctx.fillRect(roadLeft - 15, y, ROAD_WIDTH + 30, segmentHeight + 1);
    }

    // Draw Road Surface
    ctx.fillStyle = roadColor;
    for (let y = -segmentHeight; y < CANVAS_HEIGHT + segmentHeight; y += segmentHeight) {
      const curveShift = getCurveShift(y);
      const roadLeft = roadCenterRef.current - ROAD_WIDTH / 2 + curveShift;
      ctx.fillRect(roadLeft, y, ROAD_WIDTH, segmentHeight + 1);
    }

    // Road Lines
    if (level !== Level.DESTAPADA) {
      ctx.strokeStyle = '#aaaaaa';
      ctx.lineWidth = 4;
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -roadOffsetRef.current;
      ctx.beginPath();
      for (let y = 0; y <= CANVAS_HEIGHT; y += 20) {
        const curveShift = getCurveShift(y);
        const x = roadCenterRef.current + curveShift;
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Items
    itemsRef.current.forEach(item => {
      const curveShift = getCurveShift(item.y);
      const drawX = item.x + curveShift;
      
      if (item.type === 'Veladora') {
        ctx.drawImage(veladoraImg, drawX, item.y, item.width, item.height);
      } else if (item.type === 'Panchitos') {
        ctx.drawImage(panchitosImg, drawX, item.y, item.width, item.height);
      } else if (item.type === 'Sancocho') {
        ctx.drawImage(sancochoImg, drawX, item.y, item.width, item.height);
      } else if (item.type === 'Gelatina') {
        ctx.drawImage(gelatinaImg, drawX, item.y, item.width, item.height);
      }
    });

    // Draw Obstacles
    obstaclesRef.current.forEach(obs => {
      const curveShift = getCurveShift(obs.y);
      const drawX = obs.x + curveShift;

      if (obs.type === 'Derrumbe') {
        if (level === Level.DESTAPADA) {
          ctx.drawImage(derrumbeImg, drawX - 10, obs.y - 10, obs.width + 20, obs.height + 20);
        } else {
          ctx.fillStyle = '#8b5a2b';
          ctx.beginPath();
          ctx.moveTo(drawX, obs.y + obs.height);
          ctx.lineTo(drawX + obs.width/2, obs.y);
          ctx.lineTo(drawX + obs.width, obs.y + obs.height);
          ctx.fill();
        }
      } else if (obs.type === 'Fire') {
        if (level === Level.DESTAPADA) {
          ctx.drawImage(comodinFireImg, drawX, obs.y - 10, obs.width, obs.height + 10);
        } else {
          ctx.fillStyle = '#ff4400';
          ctx.beginPath();
          ctx.arc(drawX + obs.width/2, obs.y + obs.height/2, obs.width/2, 0, Math.PI*2);
          ctx.fill();
          ctx.fillStyle = '#ffcc00';
          ctx.beginPath();
          ctx.arc(drawX + obs.width/2, obs.y + obs.height/2, obs.width/4, 0, Math.PI*2);
          ctx.fill();
        }
      } else if (obs.type === 'Llama') {
        // Adjust width/height for llama to maintain 1:1.4 aspect ratio
        if (obs.speedModifier && obs.speedModifier < 0) {
          ctx.save();
          ctx.translate(drawX - 5 + 25, obs.y - 30);
          ctx.scale(-1, 1);
          ctx.drawImage(llamaImg, -25, 0, 50, 70);
          ctx.restore();
        } else {
          ctx.drawImage(llamaImg, drawX - 5, obs.y - 30, 50, 70);
        }
      } else if (obs.type === 'Shrine') {
        ctx.drawImage(shrineImg, drawX, obs.y, obs.width, obs.height);
      } else {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(drawX, obs.y, obs.width, obs.height);
      }
    });

    // Draw Player (Laja Car)
    const playerCurveShift = getCurveShift(playerRef.current.y);
    const playerDrawX = playerRef.current.x + playerCurveShift;

    // Draw the top-down car SVG with correct 1:2.5 aspect ratio
    ctx.drawImage(playerCarImg, playerDrawX - 5, playerRef.current.y - 20, 50, 125);

  }, [level]);

  useEffect(() => {
    const animate = (time: number) => {
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;
      
      update(deltaTime);
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) draw(ctx);
      
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [update, draw]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans ${isFullscreen ? 'bg-zinc-950 text-white overflow-hidden' : ''}`} ref={containerRef}>
      <div className="relative bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-800 max-w-full">
        
        {/* Fullscreen Toggle (Mobile Only) */}
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60 transition-all pointer-events-auto md:hidden"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>

        {/* HUD */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pointer-events-none">
          <div className="space-y-2">
            <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl flex items-center gap-3 border border-white/10 relative">
              <Fuel className={`w-5 h-5 ${fuel < 25 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`} />
              <div className="w-32 h-3 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${fuel < 25 ? 'bg-red-500' : 'bg-yellow-400'}`}
                  animate={{ width: `${fuel}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
              {fuel < 25 && fuel > 0 && (
                <div className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-bold animate-bounce">
                  LOW FUEL!
                </div>
              )}
            </div>
            <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl flex items-center gap-3 border border-white/10">
              <Heart className="w-5 h-5 text-red-500" />
              <div className="flex gap-1">
                {[...Array(lives)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-red-500 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          <div className="text-right space-y-2">
            <div className="bg-black/60 backdrop-blur-md p-2 px-4 rounded-xl border border-white/10">
              <div className="text-[10px] uppercase tracking-widest opacity-50">Candles</div>
              <div className="text-xl font-bold flex items-center justify-end gap-2">
                {candles} <span className="text-sm opacity-50">/ 7</span>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-md p-2 px-4 rounded-xl border border-white/10">
              <div className="text-[10px] uppercase tracking-widest opacity-50">Level</div>
              <div className="text-lg font-bold">{level}</div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <canvas 
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="block"
        />

        {/* Overlays */}
        <AnimatePresence>
          {gameState === GameState.MENU && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-start p-6 text-center z-20 overflow-y-auto"
            >
              <h1 className="text-4xl font-game mt-4 mb-2 text-yellow-400 leading-tight">LAJAS GAME</h1>
              <p className="text-xs opacity-70 mb-6 max-w-xs">
                Lleva 7 velas al Santuario de Las Lajas.
              </p>

              <div className="w-full max-w-xs space-y-4 mb-6 text-left text-sm">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <h3 className="text-yellow-400 font-bold mb-2 text-xs uppercase tracking-wider">Recoge (Combustible)</h3>
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col items-center">
                      <img src={panchitosImg.src} alt="Panchitos" className="h-8 object-contain mb-1" />
                      <span className="text-[10px] opacity-70">Panchitos</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src={gelatinaImg.src} alt="Gelatina" className="h-8 object-contain mb-1" />
                      <span className="text-[10px] opacity-70">Gelatina</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src={sancochoImg.src} alt="Sancocho" className="h-8 object-contain mb-1" />
                      <span className="text-[10px] opacity-70">Sancocho</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <h3 className="text-yellow-400 font-bold mb-2 text-xs uppercase tracking-wider">Misión Principal</h3>
                  <div className="flex items-center gap-3">
                    <img src={veladoraImg.src} alt="Veladora" className="h-10 object-contain" />
                    <p className="text-xs opacity-80 leading-tight">Recoge 7 velas en el camino. Cada vela aparecerá junto a un santuario.</p>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <h3 className="text-red-400 font-bold mb-2 text-xs uppercase tracking-wider">Esquiva (Obstáculos)</h3>
                  <div className="flex items-center gap-3">
                    <img src={llamaImg.src} alt="Llama" className="h-10 object-contain" />
                    <p className="text-xs opacity-80 leading-tight">Evita chocar con las llamas, fuego y derrumbes. Perderás vidas.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 w-full max-w-xs mt-auto mb-4">
                <button 
                  onClick={startGame}
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                >
                  START MISSION
                </button>
                <div className="grid grid-cols-2 gap-2 text-[10px] opacity-50">
                  <div className="p-2 border border-white/10 rounded-lg bg-black/50">W: ACCEL</div>
                  <div className="p-2 border border-white/10 rounded-lg bg-black/50">S: BRAKE</div>
                  <div className="p-2 border border-white/10 rounded-lg bg-black/50">A: LEFT</div>
                  <div className="p-2 border border-white/10 rounded-lg bg-black/50">D: RIGHT</div>
                  <div className="p-2 border border-white/10 rounded-lg col-span-2 text-yellow-400 bg-black/50">J: START MISSION</div>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === GameState.TRANSITION && showComodin && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8 text-center z-30"
            >
              <MapPin className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
              <h2 className="text-3xl font-game mb-2 text-emerald-400">ROMBOY COMODÍN</h2>
              <p className="text-lg opacity-90 mb-8">¡Bendición de la Piedra Laja!</p>
              
              <div className="flex gap-4">
                <div className="p-4 bg-zinc-800 border-2 border-emerald-500 rounded-2xl animate-pulse">
                  <div className="text-3xl mb-1">❤️</div>
                  <div className="font-bold text-emerald-400">+1 VIDA</div>
                </div>
                <div className="p-4 bg-zinc-800 border-2 border-emerald-500 rounded-2xl animate-pulse" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl mb-1">⛽</div>
                  <div className="font-bold text-emerald-400">FULL FUEL</div>
                </div>
              </div>
              <p className="mt-8 text-sm opacity-50 animate-pulse">Avanzando al siguiente nivel...</p>
            </motion.div>
          )}

          {gameState === GameState.GAME_OVER && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center p-8 text-center z-40"
            >
              <AlertTriangle className="w-20 h-20 text-red-500 mb-4" />
              <h2 className="text-3xl font-game mb-2">MISIÓN FALLIDA</h2>
              <p className="text-sm opacity-70 mb-8">La fe es el camino, pero el combustible es necesario. Inténtalo de nuevo.</p>
              <button 
                onClick={startGame}
                className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all"
              >
                RETRY (K)
              </button>
            </motion.div>
          )}

          {gameState === GameState.WIN && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center p-8 text-center z-50"
            >
              <Trophy className="w-24 h-24 text-yellow-400 mb-6" />
              <h2 className="text-3xl font-game mb-4">¡SANTUARIO ALCANZADO!</h2>
              <p className="text-lg mb-2">Has entregado las {candles} velas.</p>
              <p className="text-sm opacity-70 mb-8">Tu fe te ha guiado a través de las Lajas.</p>
              <div className="bg-black/40 p-6 rounded-3xl mb-8 w-full">
                <div className="flex justify-between mb-2">
                  <span>Score:</span>
                  <span className="font-bold text-yellow-400">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-bold">{Math.floor(time)}s</span>
                </div>
              </div>
              <button 
                onClick={() => setGameState(GameState.MENU)}
                className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all"
              >
                PLAY AGAIN (K)
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500"
            animate={{ width: `${(levelTimeRef.current / LEVEL_DURATION) * 100}%` }}
          />
        </div>

        {/* Mobile Controls */}
        {gameState === GameState.PLAYING && (
          <div className="absolute bottom-12 left-0 right-0 px-6 flex justify-between items-end z-20 pointer-events-none md:hidden">
            {/* Steering Wheel Control */}
            <div 
              className="pointer-events-auto relative w-28 h-28"
              onTouchStart={handleSteeringTouch}
              onTouchMove={handleSteeringTouch}
              onTouchEnd={handleSteeringEnd}
            >
              <motion.div 
                className="w-full h-full"
                animate={{ rotate: activeControls['a'] ? -90 : activeControls['d'] ? 90 : 0 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                <img src={steeringWheelImg.src} className="w-full h-full object-contain drop-shadow-2xl" />
              </motion.div>
            </div>

            {/* Accel/Brake Controls */}
            <div className="flex flex-col gap-4 pointer-events-auto">
              <button 
                onMouseDown={() => handleControlStart('w')}
                onMouseUp={() => handleControlEnd('w')}
                onMouseLeave={() => handleControlEnd('w')}
                onTouchStart={() => handleControlStart('w')}
                onTouchEnd={() => handleControlEnd('w')}
                className="w-16 h-16 bg-emerald-500/40 backdrop-blur-md rounded-2xl border border-emerald-500/20 flex items-center justify-center active:scale-90 transition-transform"
              >
                <ChevronUp className="w-8 h-8 text-emerald-400" />
              </button>
              <button 
                onMouseDown={() => handleControlStart('s')}
                onMouseUp={() => handleControlEnd('s')}
                onMouseLeave={() => handleControlEnd('s')}
                onTouchStart={() => handleControlStart('s')}
                onTouchEnd={() => handleControlEnd('s')}
                className="w-16 h-16 bg-red-500/40 backdrop-blur-md rounded-2xl border border-red-500/20 flex items-center justify-center active:scale-90 transition-transform"
              >
                <ChevronDown className="w-8 h-8 text-red-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="mt-8 max-w-md text-center">
        <div className="text-xs uppercase tracking-[0.3em] opacity-30 mb-2">Narrativa</div>
        <p className="text-sm italic opacity-60">
          "Un turista devoto recorre los caminos hacia Ipiales, sorteando llamas y derrumbes, 
          con la esperanza de encender sus velas ante la Virgen de Las Lajas."
        </p>
      </div>
    </div>
  );
}
