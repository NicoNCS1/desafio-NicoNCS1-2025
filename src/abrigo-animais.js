class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    
    const animais = [
      { nome: "Rex", especie: "cão", brinquedos: ["RATO", "BOLA"] },
      { nome: "Mimi", especie: "gato", brinquedos: ["BOLA", "LASER"] },
      { nome: "Fofo", especie: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      { nome: "Zero", especie: "gato", brinquedos: ["RATO", "BOLA"] },
      { nome: "Bola", especie: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      { nome: "Bebe", especie: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      { nome: "Loco", especie: "jabuti", brinquedos: ["SKATE", "RATO"] },
    ];

    const ordemAnimaisArray = ordemAnimais.split(',').sort();
    const listaBrinquedosPessoa1 = brinquedosPessoa1.split(',');
    const listaBrinquedosPessoa2 = brinquedosPessoa2.split(',');
    const animal = ordemAnimaisArray.every(nomeanimal => animais.some(a => a.nome === nomeanimal));
    const ordem = { "gato": 0, "cão": 1, "jabuti": 2 };
    const ordemEspecie = ordemAnimaisArray.sort((a, b) => {
      const especieA = animais.find(animal => animal.nome === a).especie;
      const especieB = animais.find(animal => animal.nome === b).especie;
      return ordem[especieA] - ordem[especieB];
    });

    if (!animal) {
      return { erro: 'Animal inválido' };
    }

    function brinquedos(brinqpessoa, brinqanimal, especie) {
      let i = 0;
      let j = 0;
      if(especie === "jabuti"){
        return brinqanimal.every(b => brinqpessoa.includes(b));
      }else while (i < brinqpessoa.length && j < brinqanimal.length) {
        if (brinqpessoa[i] === brinqanimal[j]) {
          j++;
        }
        i++;
      }
      return j === brinqanimal.length;
    }

    let listaTemp = [];

    for (let i = 0; i < ordemEspecie.length; i++) {
      let lista1 = listaBrinquedosPessoa1;
      let lista2 = listaBrinquedosPessoa2;
      const animalIndex = animais.findIndex(a => a.nome === ordemEspecie[i]);
      const temOutro1 = listaTemp.some(entry => entry.includes("pessoa 1"));
      const temOutro2 = listaTemp.some(entry => entry.includes("pessoa 2"));
      if (brinquedos(lista1, animais[animalIndex].brinquedos, animais[animalIndex].especie) == true && brinquedos(lista2, animais[animalIndex].brinquedos, animais[animalIndex].especie) == false) {
        if(animais[animalIndex].especie === "jabuti" && !temOutro1){
          listaTemp.push(`${animais[animalIndex].nome} - abrigo`);
        }else{
          listaTemp.push(`${animais[animalIndex].nome} - pessoa 1`);
          if (animais[animalIndex].especie === 'gato') {
            lista1 = listaBrinquedosPessoa1.filter(brinq => !animais[animalIndex].brinquedos.includes(brinq));
          }
        }
      } else if (brinquedos(lista2, animais[animalIndex].brinquedos, animais[animalIndex].especie) == true && brinquedos(lista1, animais[animalIndex].brinquedos, animais[animalIndex].especie) == false) {
        if(animais[animalIndex].especie === "jabuti" && !temOutro2){
          listaTemp.push(`${animais[animalIndex].nome} - abrigo`);
        }else{
          listaTemp.push(`${animais[animalIndex].nome} - pessoa 2`);
          if (animais[animalIndex].especie === 'gato') {
            lista2 = listaBrinquedosPessoa2.filter(brinq => !animais[animalIndex].brinquedos.includes(brinq));
          }
        }
      } else {
        listaTemp.push(`${animais[animalIndex].nome} - abrigo`);
      }      
    }
    let lista = listaTemp.sort();
    return { lista };
  }
}
export { AbrigoAnimais as AbrigoAnimais };