document.getElementById('loadSales').addEventListener('click', async () => {
    const salesContainer = document.getElementById('salesContainer');
    salesContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar nuevas ventas

    try {
        const response = await fetch('https://bicis-aopy.onrender.com/ventas/todas');
        if (!response.ok) {
            throw new Error('Error al cargar las ventas');
        }

        const ventas = await response.json();

        if (ventas.length === 0) {
            salesContainer.innerHTML = '<p>No hay ventas registradas.</p>';
            return;
        }

        // Crear una lista de ventas
        const list = document.createElement('ul');

        ventas.forEach(venta => {
            const listItem = document.createElement('li');

            // Crear una descripción detallada de la venta
            let articulosList = '';
            if (venta.articulos) {
                articulosList = `<strong>Artículos:</strong> ${JSON.stringify(venta.articulos)}`;
            }

            listItem.innerHTML = `
                <strong>ID Venta:</strong> ${venta.id_venta}<br>
                <strong>ID Usuario:</strong> ${venta.id_user}<br>
                ${articulosList}<br>
                <strong>Total Compra:</strong> ${venta.total_compra}<br>
                <strong>Dirección de Entrega:</strong> ${venta.direccion_entrega}<br>
                <strong>Fecha de Venta:</strong> ${venta.date_sell}<br>
            `;

            list.appendChild(listItem);
        });

        salesContainer.appendChild(list);
    } catch (error) {
        salesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
