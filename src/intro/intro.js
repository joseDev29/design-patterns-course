console.log(add(1, 2));

//Funcion de primer orden
//Toda funcion que pueda ser guardada o manejada como una variable
function add(a, b) {
  return a + b;
}

const myFn = add;

//Funcion de orden superior
//Toda funcion que puede recibir en sus parametros otras funciones
function operation(fn) {
  console.log(fn());
}
