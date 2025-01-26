import { Page } from "@playwright/test";

export const fontHelper = async (page: Page) => {
  await page.context().addInitScript(() => {
    // Crear un elemento de estilo para inyectar las fuentes
    const style = document.createElement("style");
    style.id = "playwright-font-override";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

      *:not([class*="icon"]):not(i):not(svg) {
        font-family: Inter !important;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        font-synthesis: none !important;
        text-size-adjust: 100% !important;
        
        /* Fuerza métricas consistentes */
        font-feature-settings: 'liga' off, 'clig' off, 'kern' off !important;
        font-kerning: none !important;
        font-variant-ligatures: none !important;
      }

      /* Reset para navegadores específicos */
      @media (-webkit-min-device-pixel-ratio:0) {
        * {
          font-smooth: never !important;
        }
      }
    `;

    // Añadir al head del documento
    document.addEventListener("DOMContentLoaded", () => {
      document.head.appendChild(style);
    });
  });
};
