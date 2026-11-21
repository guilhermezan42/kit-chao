# kit-chao · busca um filme no OMDb e mostra um resumo no terminal

O kit serve para treinar a escrita de um programa básico de busca em api escrito com segurança tratando os erros. 

## Como rodar

Precisa de Node 20.6 ou mais novo e de uma chave grátis do OMDb (omdbapi.com).

    git clone https://github.com/guilhermezan42/kit-chao.git
    cd kit-chao
    npm ci
    cp .env.example .env      # cole a sua chave em OMDB_API_KEY
    npm start -- "The Matrix"

Conferir os tipos: `npm run typecheck`.

## O que a IA fez

A IA me ajudou como uma tutora, me guiando durante o processo de planejamento e escrita do código demonstrando os fluxos, e escreveu para mim as partes repetivas 
