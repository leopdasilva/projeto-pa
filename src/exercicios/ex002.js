/*

2) Conversão de Preços (Intermediário)
Você recebeu uma lista de preços em formato de string (texto) com o símbolo do cifrão. Você precisa
transformar essa lista em um novo array apenas com os números (tipo float/number) para poder
fazer contas depois.
• Array inicial: const precosString = ["R$ 10.00", "R$ 25.50", "R$ 75.90"];
• Dica: Use o método .replace("R$ ", "") dentro do seu .map() para limpar o texto e
parseFloat() para transformar em número.
• Resultado esperado no console: [10.00, 25.50, 75.90] (como números de verdade, sem as
aspas).

*/

const precosString = ["R$ 10.00", "R$ 25.50", "R$ 75.90"];

const precosNumeros = precosString.map(preco => {
    const textoLimpo = preco.replace("R$ ", ""); 
    
    return parseFloat(textoLimpo); 
});

console.log(precosNumeros);
