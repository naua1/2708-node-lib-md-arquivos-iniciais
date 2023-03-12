import chalk from "chalk";
import fs from 'fs'
import pegarArquivo from "./async.js";
import listavalidada from "./listavalidada.js";
const caminho = process.argv;

  async function imprimirTexto(valida ,texto, nomeArquivo = ''){

    
    
    if(valida){
        console.log(chalk.yellow(`lista validada`),await listavalidada(texto));
        
    }else{
        console.log(chalk.yellow(`lista de links do ${nomeArquivo}`),texto);
    }
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida'

    try{
        fs.lstatSync(caminho);
    }catch(erro){
        if(erro.code === 'ENOENT'){
            console.log('o arquivo que você colocou não existe')
            return;
        }
    }
    
    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegarArquivo(caminho);
        imprimirTexto(valida,resultado, caminho)
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach( async (nomesDosArquivos) => {
            const lista = await pegarArquivo(`${caminho}/${nomesDosArquivos}`)
            imprimirTexto(valida,lista,nomesDosArquivos);
        });
       
    }
}

processaTexto(caminho);