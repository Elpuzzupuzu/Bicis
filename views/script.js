document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('ventasTable').querySelector('tbody');
    
    try {
        // Realiza una solicitud a la API para obtener todas las ventas
        const response = await fetch('https://bicis-aopy.onrender.com/ventas/todas'); // Cambia el puerto si es necesario
        if (!response.ok) {
            throw new Error('Error al obtener las ventas');
        }

        const ventas = await response.json();

        // Recorre las ventas y crea una fila para cada una
        ventas.forEach(venta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${venta.id_venta}</td>
                <td>${venta.id_user}</td>
                <td>
                    <ul>
                        ${venta.articulos.bicicletas.map(bicicleta => `
                            <li>Modelo: ${bicicleta.modelo}, Precio: $${bicicleta.precio}</li>
                        `).join('')}
                    </ul>
                </td>
                <td>${venta.total_compra}</td>
                <td>${venta.date_sell}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        tableBody.innerHTML = `<tr><td colspan="5">Error: ${error.message}</td></tr>`;
    }
});
