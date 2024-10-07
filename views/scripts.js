// URL base de la API
const apiUrl = 'http://localhost:3000/bicicletas';

// Función para listar todas las bicicletas
async function listarBicicletas() {
    const response = await fetch(apiUrl);
    const bicicletas = await response.json();
    const tbody = document.querySelector("#tablaBicicletas tbody");
    tbody.innerHTML = '';

    bicicletas.forEach(bici => {
        const row = `<tr>
            <td>${bici.id}</td>
            <td>${bici.marca}</td>
            <td>${bici.modelo}</td>
            <td>${bici.tipo}</td>
            <td>${bici.color}</td>
            <td>${bici.precio}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Función para agregar una nueva bicicleta
document.getElementById('formBici').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevaBicicleta = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        tipo: document.getElementById('tipo').value,
        tamaño: document.getElementById('tamaño').value,
        color: document.getElementById('color').value,
        precio: document.getElementById('precio').value,
        material: document.getElementById('material').value,
        peso: document.getElementById('peso').value,
        cambio: document.getElementById('cambio').value,
        disponible: document.getElementById('disponible').value === 'true'
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaBicicleta)
    });

    if (response.ok) {
        alert('Bicicleta creada con éxito');
        listarBicicletas();  // Refresca la tabla de bicicletas
        document.getElementById('formBici').reset();
    } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
    }
});
