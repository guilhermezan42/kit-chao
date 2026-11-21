import { loadApiKey } from "./config.js"

// ← novo: o contrato com o OMDb, como o curl mostrou. Só os campos que o kit usa.
type OmdbSucesso = {
  Response: "True";
  Title: string;
  Year: string;        // "1999": vem como texto
  Runtime: string;
  Genre: string;       // "Action, Sci-Fi": UM texto, não uma lista
  Director: string;
  Actors: string;
  Plot: string;
  imdbRating: string;  // "8.7", ou "N/A"
};

type OmdbErro = {
  Response: "False";
  Error: string;
};

type OmdbResposta = OmdbSucesso | OmdbErro;


async function fetchOmdbAPI(title: string):Promise<OmdbSucesso>{
    const apiKey = loadApiKey();
    const params = new URLSearchParams({apikey:apiKey, t:title,})

    const url = `https://www.omdbapi.com/?${params}`;
    let response: Response;
    //1. Verifica se a resposta veio
    try {
        response = await fetch(url);
    } catch (error) {
        throw new Error("Sem conexão: não consegui falar com o OMDb. Confira a internet e tente de novo.");
    }
    //2. Verifica se a resposta foi ok (2xx) e trata os erros 
    if (response.status  === 401) { // caso 401 api inválida
        throw new Error ("Chave da API inválida: confira a OMDB_API_KEY no .env")
    }
    if (!response.ok) {
        throw new Error (`A API da OMDB está com erro. status: ${response.status} `)
    }
    // 3 le a resposta como JSON 
    const result: OmdbResposta = await response.json() ;
    // 4 verifica caso o response seja false 
    if (result.Response === "False"){
        if ( result.Error == "Movie not found!"){
            throw new Error(`Título do filme não encontrado: ${title}`)
        }

        throw new Error(`O OMDb respondeu com este erro: ${result.Error}`);
    }
    // retorna os dados do filme quando response é True
    return result

    


}




export {fetchOmdbAPI};
// Resposta da API com o Curl
// {"Title":"The Matrix","Year":"1999","Rated":"R","Released":"31 Mar 1999","Runtime":"136 min","Genre":"Action, Sci-Fi","Director":"Lana Wachowski, Lilly Wachowski","Writer":"Lilly Wachowski, Lana Wachowski","Actors":"Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss","Plot":"A computer hacker discovers that his life is nothing more than an elaborate simulation run by an evil AI.","Language":"English","Country":"United States","Awards":"Won 4 Oscars. 42 wins & 52 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.7/10"},{"Source":"Rotten Tomatoes","Value":"83%"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"8.7","imdbVotes":"2,284,373","imdbID":"tt0133093","Type":"movie","DVD":"N/A","BoxOffice":"$177,559,005","Production":"N/A","Website":"N/A","Response":"True"}
// 