/*alert("Introduce 1 para True o 2 para False en este trivial...");

const preguntas: string[] = [];
const respuestas: string[] = [];

const dificultad=prompt("dificultad:")
const numeroJugadores=prompt("numeroJugadores:")
const numeroPreguntas=prompt("numeroPreguntas:")
fetch("https://opentdb.com/api.php?amount="+numeroPreguntas+"&difficulty="+dificultad+"&type=boolean").then(data=>{data.json().then(data=>{

data.results.forEach((resultado) => {
  preguntas.push(resultado.question);
  respuestas.push(resultado.correct_answer);
});
  
 });
  console.log(preguntas[2]);


})/*}));*/

//
alert("Introduce True o False para responder el trivial con la primera en mayusculas como he hechi yo...");

//constantes para almacenar preguntas y respuestas juego
const preguntas: string[] = [];
const respuestas: string[] = [];

//estructura para almacenar puntos
type Resultados = {
  Jugadores: number[];
  Puntos: number[];
};

//funcion usada para ir sumando puntos al jugador que acierte pregunta
function sumarUno(tipo: Resultados, posicion: number): Resultados {
  //Clonamos el vector porque me daba error sino jajajja
  const nuevoTipo: Resultados = { ...tipo };

  //compruebo que la posicion tomada como parametro no sea invalida
  if (posicion < 0 || posicion >= nuevoTipo.Jugadores.length) {
    throw new Error("Pero si solo hay "+(tipo.Jugadores.length-1)+" jugadores ");
  }

  // Sumar uno a la variable de los Puntos en la posicion del jugador correcto a ver si va a ganar el que no sabe nada
  nuevoTipo.Puntos[posicion] += 1;
  //devolvemos otra structura type con los cambios hechos
  return nuevoTipo;
}

//funcion para mostrar resultados finales, si da tiempo creare funcion para mostrar al ganador ya que es una simple comparacion usando algortimo como bubleshort jeje
function imprimirVectores(tipo: Resultados) {
  for (let i = 0; i < tipo.Jugadores.length; i++) {
    const elemento = tipo.Jugadores[i];
    console.log("Jugador"+i+" "+tipo.Puntos[i]+"\n");
  }
}

//Funcion para impirimir los ganadores
function encontrarGanadores(resultados: Resultados): number[] {
  const maxPuntos = Math.max(...resultados.Puntos); // Obtiene la puntuación máxima
  const ganadores: number[] = [];

  for (let i = 0; i < resultados.Jugadores.length; i++) {
    if (resultados.Puntos[i] === maxPuntos) {
      ganadores.push(resultados.Jugadores[i]); // Agrega al ganador a la lista de ganadores
    }
  }

  return ganadores;
}



const dificultad = prompt("Dificultad:(easy,medium,hard");

const input = prompt("Numero de Jugadores:");

//Numero jugadores no puede ser null ya que despues debemos convertirlo en Entero para varias cosas
if (input === null) {
  console.log("No has tipeado nada");
} else {
  //con ayuda de internet parseamos la variable
  const numeroJugadores = parseInt(input, 10);
  //creamos variable resultados
   let J1: Resultados = {
    Jugadores: [],
    Puntos: [],
  };
  //rellenamos jugadores y ponemos puntos a 0 de todos
  for(let s=0;s<numeroJugadores;s++){
    J1.Jugadores.push(s);
    J1.Puntos.push(0);
  }


//Numero preguntas por jugador y parseamos para conseguir numero Total preguntas
  const numeroPreguntas = prompt("Número de Preguntas por Jugador:");
  if(numeroPreguntas==null){
      console.log("Error");
  }else{
  const PreguntasTotales = parseInt(numeroPreguntas, 10)*numeroJugadores;
  
//comenzamos llamada a la API y guardamos todo en vectores creados anteriormente
  fetch("https://opentdb.com/api.php?amount=" + PreguntasTotales + "&difficulty=" + dificultad + "&type=boolean").then((res) => {
    res.json().then((data: { results: { question: string; correct_answer: string }[] }) => { // Especifica el tipo de 'data'
      //Relenamos los dos vectores creados anteriormente usando un forEach
      data.results.forEach((resultado) => {
        preguntas.push(resultado.question);
        respuestas.push(resultado.correct_answer);
      });

      //Esta funcion la creamos para ir alternando el turno
      function Turno(pregunta: string, respuesta: string, x:number) {
        //hacemos pregunta
        const respuestaJugador = prompt(pregunta);
        //comparamos respuesta, debo implementar el 1 para true y 2 para false todavia
        if (respuestaJugador === respuesta) {
          alert("¡Respuesta correcta!");
          //usamos funcion creada para sumarle un puntito al acertante
          J1=sumarUno(J1,x);
        } else {
          alert("¡Respuesta incorrecta!");
        }
        //devolvemos estructura con resultados con cambios modificados si ha acertado
        return J1;
      }

      //creo variable para saber a q jugador añadirle puntos despues de la primera ronda de preguntas
      let e=0 ;
      // Bucle para ir llamando a la funcion Turno y meterle preguntas distintas
      for (let i = 0; i < preguntas.length; i++) {
        
        if(e>numeroJugadores-1){
          e=0;
        }
        const pregunta = preguntas[i];
        const respuesta = respuestas[i];
        J1=Turno(pregunta, respuesta,e);
        e++;
      }


      
      alert("Rondas terminadas,quereis ver quien gano?");
      imprimirVectores(J1);
      const ganadores = encontrarGanadores(J1);

      if (ganadores.length === 1) {
        alert("El jugador " + ganadores[0] + " es el ganador.");
       } else if (ganadores.length > 1) {
        alert("Los jugadores " + ganadores.join(", ") + " son ganadores.");
        } else {
        alert("No hay ganadores.");
      }
      
      alert("System delete...");
      
      
    });
  })}}

/*async function obtenerData() {
  
    const res = await fetch("https://opentdb.com/api.php?amount="+numeroPreguntas+"&difficulty="+dificultad+"&type=boolean");
    const data = await res.json();
    const respuesta=prompt(res.results[x].question);

  }
  */




/*
if (numeroJugadoresInput !== null) {
  const numeroJugadores = parseInt(numeroJugadoresInput);

  if (!isNaN(numeroJugadores)) {
    // El valor ingresado es un número válido, puedes continuar con el juego.
  } else {
    alert("No ingresaste un número de jugadores válido.");
    // Puedes tomar medidas adicionales, como salir del juego o mostrar un mensaje de error.
  }
} else {
  alert("Cancelaste la entrada. Por favor, ingresa un número de jugadores válido.");
  // Puedes tomar medidas adicionales en caso de cancelación.
}


const dificultad = prompt("Dificultad:");
const numeroPreguntas = prompt("Número Preguntas:");

const url = "https://opentdb.com/api.php?amount="+numeroPreguntas+"&difficulty="+dificultad+"&type=boolean";

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    // Baraja las preguntas aleatoriamente
    const preguntas = res.results;

    for (let i = 0; i < preguntas.length; i++) {
      const pregunta = preguntas[i];
      const respuestaCorrecta = pregunta.correct_answer === "True" ? "1" : "2";

      for (let j = 0; j < jugadores.length; j++) {
        const jugador = jugadores[j];
        const respuesta = prompt(`${jugador.nombre}, ${pregunta.question}\n1. True\n2. False`);
        
        if (respuesta === respuestaCorrecta) {
          jugador.respuestasCorrectas++;
          alert("Respuesta correcta.");
        } else {
          alert("Respuesta incorrecta.");
        }
      }
    }
  })
    


*/