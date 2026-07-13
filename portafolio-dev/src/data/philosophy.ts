export interface Principle {
  title: string;
  description: string;
  icon: string;
}

export const PRINCIPLES: Principle[] = [
  {
    title: "Clean Architecture",
    description:
      "Separar el dominio de los detalles. El framework es reemplazable; las reglas de negocio, no.",
    icon: "layers",
  },
  {
    title: "Escalabilidad",
    description:
      "Diseñar para el crecimiento desde el día uno: datos, tráfico y equipo. Lo que funciona para cien usuarios debe poder funcionar para cien mil.",
    icon: "trending-up",
  },
  {
    title: "Mantenibilidad",
    description:
      "El código se escribe una vez y se lee cientos de veces. Nombres claros, módulos pequeños y decisiones documentadas.",
    icon: "wrench",
  },
  {
    title: "Rendimiento",
    description:
      "Cada milisegundo cuenta. Medir antes de optimizar, enviar menos JavaScript y respetar el hardware del usuario.",
    icon: "zap",
  },
  {
    title: "Accesibilidad",
    description:
      "El software es para todos: HTML semántico, navegación por teclado, contraste real y respeto por prefers-reduced-motion.",
    icon: "eye",
  },
  {
    title: "Seguridad",
    description:
      "Desconfiar de toda entrada, proteger cada capa y tratar los datos de las personas como lo que son: un préstamo de confianza.",
    icon: "shield",
  },
  {
    title: "IA aplicada",
    description:
      "La IA no es un adorno: es una herramienta para resolver problemas concretos — clustering, pronóstico, lenguaje natural — con criterio de ingeniería.",
    icon: "sparkles",
  },
  {
    title: "Mentalidad de testing",
    description:
      "La confianza se construye con pruebas: validar los caminos críticos y automatizar lo repetitivo para desplegar sin miedo.",
    icon: "check-circle",
  },
];
