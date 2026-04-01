import fs from "fs";
import path from "path";

export function getImages(year: string): string[] {
  const dir = path.join(process.cwd(), "public", "edicoes", year);

  try {
    return fs.readdirSync(dir).map((file) => `/edicoes/${year}/${file}`);
  } catch (err) {
    console.error(
      `Erro ao ler o diretório de imagens para o ano ${year}:`,
      err
    );
    return [];
  }
}
