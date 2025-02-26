const data=require('./dataProvider');

const points=data.getAllPoints();
function updatePoint(id, updates = {}) {
    id=parseInt(id);
    const index = points.features.findIndex(point => point.id === id);
    if (index !== -1) {
        points.features[index].properties = {
            ...points.features[index].properties, // Mantiene las propiedades existentes
            ...updates // Sobrescribe solo las que se pasan
        };
    }
}

function insertPoint(feature, coordinates) {
    const lastId = points.features.length > 0 
        ? Math.max(...points.features.map(point => point.id)) 
        : 0;
    const newId = lastId + 1;

    const properties = {
        nombre: feature.nombre || "Sin nombre",
        tipo: feature.tipo || "Desconocido",
        puntuacion: feature.puntuacion || 0,
        valoraciones: feature.valoraciones || 0,
        imagen: feature.imagen || "images/default.jpg"
    };

    // Agregar solo si existen en feature
    if (feature.precio_medio) properties.precio_medio = feature.precio_medio;
    if (feature.disponibilidad) properties.disponibilidad = feature.disponibilidad;
    if (feature.horario) properties.horario = feature.horario;
    if (feature.cocina) properties.cocina = feature.cocina;
    if (feature.historia) properties.historia = feature.historia;
    if (feature.costo_entrada) properties.costo_entrada = feature.costo_entrada;
    if (feature.areas_recreativas) properties.areas_recreativas = feature.areas_recreativas;
    if (feature.senderos) properties.senderos = feature.senderos;
    if (feature.eventos) properties.eventos = feature.eventos;

    const newPoint = {
        id: newId,
        type: "Feature",
        properties: properties,
        geometry: {
            type: "Point",
            coordinates: coordinates
        }
    };

    // Agregar el nuevo punto a la colección de puntos
    points.features.push(newPoint);
}

function eliminarPoint(id) {
    id = parseInt(id);
    const index = points.features.findIndex(point => point.id === id);
    
    if (index !== -1) {
        points.features.splice(index, 1);
    } else {
        console.error(`No se encontró el punto con ID: ${id}`);
    }
}



module.exports = {
    updatePoint,
    insertPoint,
    eliminarPoint
};
