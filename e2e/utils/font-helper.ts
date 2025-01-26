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
        
        /* Opcional: Forzar renderizado consistente */
        text-rendering: optimizeSpeed !important;
        -webkit-font-smoothing: subpixel-antialiased !important;
      }
    `;

    // Añadir al head del documento
    document.addEventListener("DOMContentLoaded", () => {
      document.head.appendChild(style);
    });
  });
};
