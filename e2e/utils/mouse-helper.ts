import { Page } from "@playwright/test";

export const mouseHelper = async (page: Page) => {
  await page.context().addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const box = document.createElement("div");
      const id = "box" + window.crypto.randomUUID();
      document.body.appendChild(box);

      // Configuración inicial
      box.id = id;
      box.style.position = "fixed";
      box.style.width = "20px";
      box.style.height = "20px";
      box.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      box.style.zIndex = "1000000";
      box.style.pointerEvents = "none";
      box.style.borderRadius = "100%";
      box.style.transition = "opacity 0.5s, transform 0.1s";
      box.style.transform = "translate(-1000px, -1000px)";

      const setOpacity = (level: number) => {
        box.style.backgroundColor = `rgba(255, 0, 0, ${level})`;
      };

      const updatePosition = (x: number, y: number) => {
        box.style.transform = `translate(${x}px, ${y}px)`;
      };

      // Sistema de inactividad
      let inactivityTimeout: NodeJS.Timeout;
      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
          setOpacity(0.3); // Opacidad en reposo
        }, 1000); // 1 segundo de inactividad
      };

      document.addEventListener(
        "mousedown",
        () => {
          setOpacity(1);
          clearTimeout(inactivityTimeout);
        },
        true
      );

      document.addEventListener("mouseup", () => {
        setOpacity(0.3);
        clearTimeout(inactivityTimeout);
      });

      document.addEventListener(
        "mousemove",
        (event) => {
          const x = event.clientX + window.scrollX - 10;
          const y = event.clientY + window.scrollY - 10;

          updatePosition(x, y);
          setOpacity(0.6); // Opacidad durante movimiento
          resetInactivityTimer();
        },
        true
      );

      // Inicializar timer
      resetInactivityTimer();
    });
  });
};
