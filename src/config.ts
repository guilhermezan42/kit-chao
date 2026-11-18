function loadApiKey() {
    const omdbApiKey:string|undefined = process.env.OMDB_API_KEY; 
    if (!omdbApiKey) {
        throw new Error("OMDB_API_KEY não encontrada, colocar no .env");
    }
    return omdbApiKey
}

export {loadApiKey};