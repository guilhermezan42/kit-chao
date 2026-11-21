# Plano do kit do Chão

Estado (21/11): Rodar ✓ · Proteger em andamento · Finalizar a fazer

## 1. O que faz
`npm start -- "The Matrix"` busca o filme pelo título no OMDb e mostra
Title, Year, Runtime, Genre, Director, Actors, Plot e imdbRating.
Título, e não busca: devolve um objeto só (a busca devolve lista, em outro formato).

## 2. As partes
- index.ts · recebe o título, chama, imprime. O ÚNICO que fala com o terminal,
  no sucesso e no erro. Muda quando o fluxo ou o formato da saída muda
  (o formato fica junto por enquanto; separo se crescer).
- validação da entrada · título ausente, vazio ou só espaços → erro de uso;
  devolve o título limpo (trim).
- omdb.ts · monta a URL, chama a API, confere a resposta, devolve os dados ou
  lança erro. Muda quando a API muda.
- config.ts · loadApiKey(): lê OMDB_API_KEY do process.env; ausente ou vazia
  → erro com o nome exato da variável. Exporta só a função: ninguém usa a
  chave sem conferir.

## 3. O contrato do OMDb (do curl, 17/11)
| Caso | Status | Corpo |
|---|---|---|
| achou | 200 | os dados + "Response":"True" |
| chave errada | 401 | "Response":"False", "Error":"Invalid API key!" |
| não existe | 200 | "Response":"False", "Error":"Movie not found!" |
| API fora do ar | 5xx | HTML do Cloudflare, não JSON (não testado no curl) |
| sem internet | — | não tem resposta: o fetch rejeita (TypeError: fetch failed) |

- O "não achou" vem com 200: olhar só o status dá falso positivo.
- Tudo vem como texto: Year "1999", imdbRating "8.7", Genre "Action, Sci-Fi"
  (uma string, não uma lista).
- Campo que falta vem como "N/A".

## 4. Os erros: o que a pessoa vê
Nunca imprimo a URL: ela tem a chave.
- sem título, vazio ou só espaços → como usar
- sem chave no .env → avisa e diz onde pôr
- chave errada (401) → "chave inválida"
- sem internet → "sem conexão"
- API com erro (5xx) → avisa, com o código
- filme não existe → "não encontrado"
- campo "N/A" → "não informado" (não é erro, é dado faltando)
Só a mensagem, sem stack trace; a saída com código 1.

## 5. A ordem dentro do omdb.ts
1. veio resposta?        não → "sem conexão" (try SÓ em volta do fetch)
2. o status é 2xx?       401 → chave inválida · 5xx → API com erro + código
                         (pelo status, sem ler o corpo: o HTML quebra o .json())
3. lê o corpo como JSON
4. Response "False"      → o Error do corpo ("Movie not found!" → não encontrado)
5. Response "True"       → os dados
Os erros sobem sem catch no omdb.ts; quem pega e imprime é o index.ts.

## 6. O tipo da resposta
- Só o que o código usa: os 8 campos + Response; o Error no caso "False".
- Duas formas de resposta → uma union; o código confere o Response antes de
  usar os campos (narrowing).
- Tudo string, como o curl mostrou.
- O tipo é promessa, não conferência: o formato da resposta não é validado
  no kit (anotado no Vazou, T1 área 3; o F3 traz o Zod).
- A decidir: onde o tipo mora (ele descreve o contrato com o OMDb).

## 7. A regra da borda
Valido onde o dado entra de fora (o terminal, o .env, a API); dentro do
código, os tipos cuidam. Quem decide se um filme existe é a API.

## 8. A ordem de construção (um commit por peça que funciona)
- Rodar ✓: setup → config → curl → chamada crua (1º marco, 21/11)
- Proteger: o tipo → a validação da entrada → os erros da seção 4
- Finalizar: o formato da saída → README + pasta limpa → a branch com o conflito

## 9. A IA
O código é meu; ela ensina e revisa, não escreve no src/.
Planejo com hipótese, ela questiona · travo: leio o erro e a doc, depois
"o que não considerei?" · termino uma peça: eu explico, ela revisa ·
commit com "meu × IA".

## Notas
- 20/11 · Detalhar o plano por função: entrada, saída e casos estranhos.
  O & no título cortava a URL ("Fast & Furious" virava t=Fast) → URLSearchParams
  com objeto (apikey e t juntos).
- 21/11 · Um console.log(url) imprimia a chave; removido antes do commit.
- 21/11 · Nada no catch que só relança: "Error: Error:" e o stack trace vinham
  de um catch que embrulhava o erro e de ninguém pegar no topo.