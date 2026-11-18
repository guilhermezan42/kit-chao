## 17/11 · Cannot find name 'process' (ts2591)
Onde: src/config.ts:1
O que a mensagem diz: falta o tipo do Node; instale o @types/node E ponha 'node' no types do tsconfig
Hipótese: <o que você achou primeiro>
Causa: <por que o pacote instalado não era enxergado>
Conserto: "types": ["node"] no tsconfig
Lição: ler a mensagem até o fim; a segunda metade era a resposta