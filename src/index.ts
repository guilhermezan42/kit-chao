import { fetchOmdbAPI } from "./omdb.js";


console.log(await fetchOmdbAPI(process.argv[2]))