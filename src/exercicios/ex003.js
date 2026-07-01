/*

3) Isolando Dados de Objetos (Estilo React)
Esse vai usar no React. Você recebeu uma lista de usuários de uma API (um array de objetos), mas
para um componente específico da tela, você só precisa de um array contendo apenas os nomes
deles.
const usuarios = [
{ id: 1, nome: "Aline", idade: 25 },
{ id: 2, nome: "Bruno", idade: 30 },
{ id: 3, nome: "Carla", idade: 22 }
];
O que fazer: Use o .map() para navegar no array e retornar apenas a propriedade .nome de cada
objeto.
Resultado esperado no console: ["Aline", "Bruno", "Carla"]

*/

const usuarios = [
    { id: 1, nome: "Aline", idade: 25 },
    { id: 2, nome: "Bruno", idade: 30 },
    { id: 3, nome: "Carla", idade: 22 }
];

const nomesUsuarios = usuarios.map(usuario => {
    // Retorna apenas a propriedade 'nome' de dentro do objeto atual
    return usuario.nome;
});

console.log(nomesUsuarios);
