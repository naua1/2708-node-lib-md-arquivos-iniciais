    import fs from 'fs'
    import chalk from 'chalk'
   
    function pegarErro(erro){
        throw new Error(chalk.red(erro.code, 'deu erro'));
    }

    function pegarArquivo(caminhoDoArquivo){
        const encoding = 'utf-8'
        fs.promises.readFile(caminhoDoArquivo,encoding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch(pegarErro)
    }

 

pegarArquivo('./arquivos/texto.md');
