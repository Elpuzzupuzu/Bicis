// models/bicicletaModel.js
class Bicicleta {
    constructor(marca, modelo, tipo, tamaño, color, precio, material, peso, cambio, disponible) {
      this.marca = marca;
      this.modelo = modelo;
      this.tipo = tipo;
      this.tamaño = tamaño;
      this.color = color;
      this.precio = precio;
      this.material = material;
      this.peso = peso;
      this.cambio = cambio;
      this.disponible = disponible;
    }
  }
  
  module.exports = Bicicleta;
  