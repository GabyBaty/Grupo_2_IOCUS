const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const search_field = ['name','brand','category'] // key en el JSON que será utilizada para buscar 

module.exports = function search(keyword) {
    if (keyword.length<3) // no devuelve nada porque el input tiene menos de 3 letras
        return false
    
    var results = []

    for (var i in products) { //iterar dentro de la base de datos
        for(var u=0;u<search_field.length;u++) {
        var relevancia = searchRelevance(products[i][search_field[u]], keyword) // verifica si hay coincidencias 
            if (relevancia==0) // no hay coincidencias
                continue

            results.push({rel:relevancia, entry:products[i]}) // se encontraron coincidencias, se agregan a results y se almacena relevancia

    }
}

results.sort(compararRelevancia) // ordernar por relevancia

for(i=0; i<results.length; i++) {
    results[i] = results[i].entry // se remueve la relevancia ya que no se necesita más
}

return results

}
function searchRelevance(value, keyword) {
    value = value.toLowerCase() // convierte todo a minúsculas para que no genere conflictos
    keyword = keyword.toLowerCase()

    let index = value.indexOf(keyword) // index de la keyword
    let word_index = value.indexOf(' '+keyword) // si la palabra no esta al comienzo, la busca igual

    if(index==0) // Si el valor comienza con la keyword (Ej: Si el usuario busca "Mac" busca "Macbook Pro 2022")
        return 3 // La mayor relevancia
    else if(word_index!=-1) // Si el valor no comienza con la keyword pero la contiene en otro parte (Ej: "Pro" busca "Macbook Pro 2022")
        return 2 // relevancia intermedia
    else if(index!=-1) // si el valor contiene la keyword en algúna parte (Ej: "book" busca "Macbook Pro 2022" )
        return 1 // la menor relevancia
    else
        return 0 // no hay coincidencias, no hay relevancia
}

function compararRelevancia (a,b) {
    return b.rel - a.rel
}