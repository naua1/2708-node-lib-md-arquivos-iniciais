import chalk from "chalk";

         async function checaStatus(listaUrls){
            const arrUrls = await Promise.all(
               listaUrls.map( async (url) =>{
                  try{
                     const response = await fetch(url);
                        return response.status;
                  }catch(erro){
                    return manejaErro(erro);
                  }
               })
            )
            return arrUrls;
                  }
   function manejaErro(erro){

      if(erro.cause.code ==='ENOTFOUND' ){
         return 'link não encontrado'
      }
      else{
         return 'ocorreu algum erro'
      }
   }

function pegarLinks(arraylink){

   return arraylink.map((links) => Object.values(links).join());
}
export default async function listavalidada(linksValidos){
   const link = pegarLinks(linksValidos);
   const status = await checaStatus(link);
  
   return linksValidos.map((objeto, indice) => ({
      ...objeto,
      status:status[indice]
   }));
}