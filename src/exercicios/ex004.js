/*

4) O Criador de Links (Web)
Há uma lista de nomes de redes sociais e quer transformá-los em URLs completas para o seu site.
• Array inicial: const redes = ["github", "linkedin", "instagram"];
• O que fazer: Use o .map() e Template Strings para transformar cada string no formato
https://www.nome-da-rede.com.
• Resultado esperado: ["https://www.github.com", "https://www.linkedin.com",
"https://www.instagram.com"]

*/

const redes = ["github", "linkedin", "instagram"];

const linksCompletos = redes.map(rede => {
    // Usa Template Strings para encaixar o nome da rede no meio da URL
    return `https://www.${rede}.com`;
});

console.log(linksCompletos);
