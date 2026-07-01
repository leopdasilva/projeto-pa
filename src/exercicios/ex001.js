/*

1) O Dobro dos Números (Básico)
Você tem um array de números e precisa criar um novo array onde cada número seja o dobro do
valor original.
• Array inicial: const numeros = [2, 5, 10, 20];
• O que fazer: Use o .map() para retornar um novo array.
• Resultado esperado no console: [4, 10, 20, 40]

*/

const numeros = [2, 5, 10, 20];

const numerosDobrados = numeros.map(numero => {
    return numero * 2;
});

console.log(numerosDobrados);
