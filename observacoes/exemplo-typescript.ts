// funçao - ira retornar uma messagem de boas vindas do usuarios
// incluir na mensagem de boas vindas, a cidade e UF do usuario.
// o typescript deixa o codigo mais inteligente e evita erros durante o desenvolvimento

// atributos da classe usuario 
type User = {
    name: string;
    address: {
        city: string;
        uf: string;
    }
};

// Função - boas vindas
function showWelcomeMessage(user: User){
    return `Welcome ${user.name} (${user.address.city} - ${user.address.uf})`;
}

// chamar a funcionalidade
showWelcomeMessage({
    name: 'Daniele',
    address: {
        city: 'Sao Paulo',
        uf: 'SP'
    }
});