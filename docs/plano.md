Plano do kit
1. `npm start -- "The Matrix"` busca o filme pelo título no OMDb e mostra
   Title, Year, Runtime, Genre, Director, Actors, Plot e imdbRating.
2. Partes: main (recebe, chama, imprime) · valida (o input) ·
   omdb (chama a API, devolve dados ou falha) · config (lê a chave).
3. Erros (nunca imprimo a URL: ela tem a chave):
   sem título ou vazio → como usar · sem chave no .env → avisa e diz onde pôr ·
   chave errada (401) → avisa · sem internet (sem resposta) → "sem conexão" ·
   API com erro (5xx) → avisa, com o código · não existe → "não encontrado" ·
   campo "N/A" → "não informado".
   O formato da resposta não é conferido: aceito no kit, anotado no Vazou.
4. Ordem (um commit por peça que funciona):
   Rodar: setup → config → curl → chamada crua imprimindo o JSON (1º marco)
   Proteger: o tipo da resposta → validação da entrada → os erros da linha 3
   Finalizar: o formato da saída → README + pasta limpa → a branch com o conflito
5. IA: o código é meu; ela ensina e revisa, não escreve no src/.
   Planejo com hipótese, ela questiona · travo: leio o erro e a doc, depois
   pergunto "o que não considerei?" · termino uma peça: eu explico, ela
   revisa e pergunta · commit com "meu × IA".