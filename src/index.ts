import { fetchOmdbAPI } from "./omdb.js";

type Movie = {
    Title: string,
    Year: string,
    Runtime: string, 
    Genre: Array<string>, 
    Director: Array<string>, 
    Actors: Array<string>, 
    Plot: string,
    imdbRating: string
}


function validateInput(input: string | undefined): string{
    input = (input ?? "").trim()
    if (!input){
        throw new Error('Uso: npm start -- "<título do filme>"')
    }
    return input
}

try {
    const input = validateInput(process.argv[2])
    const filme = await fetchOmdbAPI(input)
    console.log(filme)
}
catch (error) {

    if (error instanceof Error) {
        console.log(error.message)
    } else {
        console.log("Erro desconhecido")
    }

    process.exitCode = 1
}