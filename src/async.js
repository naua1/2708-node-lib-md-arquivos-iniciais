import fs from 'fs'
import chalk from 'chalk'

function pegarErro(erro){
    throw new Error(chalk.red(erro.code, 'deu erro'));
}
function extrair(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s#.].[^\s]*)\)/gm;
        const pegar = [...texto.matchAll(regex)];
    const resultado = pegar.map(pega => ({[pega[1]] : pega[2]}));
    return resultado.length !== 0 ? resultado : chalk.yellow('não tem links');
}

 async function pegarArquivo(caminhoDoArquivo){
    try{
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo,encoding)
        return extrair(texto)
    }catch(erro){
        pegarErro(erro);
    }   
}


export default pegarArquivo;
