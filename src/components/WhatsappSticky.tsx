
import React, { useState } from "react";

const WHATSAPP_URL = "https://wa.me/+233274969899";

const WhatsAppSticky: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "#25D366",
          borderRadius: "50%",
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.17)",
          color: "white",
          textDecoration: "none",
          fontSize: 0,
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path
            d="M23.2 8.8A8.59 8.59 0 0 0 16 6.4c-4.76 0-8.6 3.84-8.6 8.6 0 1.52.4 2.96 1.12 4.24L6 25.6l6.48-1.68A8.34 8.34 0 0 0 16 25.2c4.76 0 8.6-3.84 8.6-8.6 0-2.28-.88-4.44-2.48-6.02zm-7.2 13.22c-1.28 0-2.56-.32-3.68-.92l-.28-.16-3.84 1.04 1.04-3.76-.16-.28c-.6-1.08-.92-2.36-.92-3.68 0-3.88 3.16-7.04 7.04-7.04 1.88 0 3.64.72 4.96 2.04a7.04 7.04 0 0 1 2.08 4.96c0 3.88-3.16 7.04-7.04 7.04zm3.92-5.24c-.2-.12-1.12-.56-1.28-.64-.16-.08-.28-.12-.4.12-.12.24-.48.64-.6.76-.12.12-.24.16-.44.04-.2-.12-.84-.32-1.6-1-.6-.56-1-1.24-1.12-1.44-.12-.2-.01-.3.09-.4.09-.09.2-.24.28-.36.1-.12.13-.24.2-.4.08-.16.04-.28-.02-.4-.08-.12-.4-1-0.56-1.36-.15-.36-.3-.32-.4-.32h-.32c-.12 0-.4.04-.6.2-.12.12-.48.48-.48 1.16 0 .68.5 1.34.56 1.44.08.12.96 1.52 2.36 2.08 1.4.56 1.4.36 1.64.32.24-.04.8-.32.92-.64.12-.32.12-.6.08-.68-.04-.08-.16-.12-.36-.24z"
            fill="#fff"
          />
        </svg>
      </a>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close WhatsApp Icon"
        style={{
          background: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 32,
          height: 32,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 4,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M6 6l8 8M14 6l-8 8"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppSticky;
