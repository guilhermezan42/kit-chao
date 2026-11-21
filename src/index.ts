import { fetchOmdbAPI, OmdbSucesso } from "./omdb.js";

function validateInput(input: string | undefined): string{
    input = (input ?? "").trim()
    if (!input){
        throw new Error('Uso: npm start -- "<título do filme>"')
    }
    return input
}

function ouNaoInformado(valor: string): string {
  return valor === "N/A" ? "não informado" : valor;
}

function formatarFilme(filme: OmdbSucesso): string {
  return [
    `${filme.Title} (${ouNaoInformado(filme.Year)})`,
    "",
    `Duração:    ${ouNaoInformado(filme.Runtime)}`,
    `Gênero:     ${ouNaoInformado(filme.Genre)}`,
    `Direção:    ${ouNaoInformado(filme.Director)}`,
    `Elenco:     ${ouNaoInformado(filme.Actors)}`,
    `Nota IMDb:  ${ouNaoInformado(filme.imdbRating)}`,
    "",
    ouNaoInformado(filme.Plot),
  ].join("\n");   // junta as linhas com uma quebra entre cada uma
}

try {
    const input = validateInput(process.argv[2])
    const filme = await fetchOmdbAPI(input)
    console.log(formatarFilme(filme))
}
catch (error) {

    if (error instanceof Error) {
        console.log(error.message)
    } else {
        console.log("Erro desconhecido")
    }

    process.exitCode = 1
}