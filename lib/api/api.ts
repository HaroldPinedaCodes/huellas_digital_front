export function getStrapiURL(path = "") {
  // Obtener la URL base de Strapi de las variables de entorno
  const baseURL =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

  // Remover barras diagonales al inicio del path
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Combinar la URL base con el path
  return `${baseURL}${normalizedPath}`;
}
