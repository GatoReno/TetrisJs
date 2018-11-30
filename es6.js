// conceptos
// mapas

var car = new Map();
car.set("marca","Volksagen");
car.set("nombre","x"),
car.set("bodega",true);

//console.log(car.get("nombre"));
//console.log(car.has("bodega"));
//console.log(car.size());


// sets la diferencia es que de maps puedes quitar pero no add
var dogs = new Set();
dogs.add("dalmata"),
dogs.add("chihuahua"),
dogs.add("bulldog");

dogs.has("chihuahua"); // esto tambien lo tienen los maps
//console.log("I've these dogs: "+dogs+" they are these many dogs: "+dogs.size);

// Pequeña promesa
var smile = new Promise(function(res,err){
    const bandera = 1;
    if (bandera == 1) {
      res (':3');
    }else{
      err(Error(':c')); 
    }
});

smile.then(function(response){
  console.log(response);
},
function(error){
  console.log(error);
});
