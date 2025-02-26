const users = require('./users.json');

var temporalGeoJson = {
    type: "FeatureCollection",
    features: [
        {
            id: 1,
            type: "Feature",
            properties: {
                nombre: "Hotel Plaza del Castillo",
                tipo: "Hotel",
                precio_medio: "120€",
                disponibilidad: "Alta",
                horario: "Check-in: 14:00 - Check-out: 12:00",
                puntuacion: 4.5,
                valoraciones: 150,
                imagen: "images/puntosinteres/hotel-plaza-del-castillo.jpg"
            },
            geometry: {
                type: "Point",
                coordinates: [-4.4686, 36.7135]
            }
        },
        {
            id: 2,
            type: "Feature",
            properties: {
                nombre: "Gran Hotel Miramar",
                tipo: "Hotel",
                precio_medio: "250€",
                disponibilidad: "Media",
                horario: "Check-in: 15:00 - Check-out: 11:00",
                puntuacion: 4.8,
                valoraciones: 220,
                imagen: "images/puntosinteres/hotel-miramar.jpg"
            },
            geometry: {
                type: "Point",
                coordinates: [-4.4115, 36.7195]
            }
        },
        {
            id: 3,
            type: "Feature",
            properties: {
                nombre: "Restaurante El Pimpi",
                tipo: "Restaurante",
                cocina: "Andaluza",
                horario: "12:00 - 00:00",
                puntuacion: 4.7,
                valoraciones: 320,
                imagen: "images/puntosinteres/el-pimpi.jpg"
            },
            geometry: {
                type: "Point",
                coordinates: [-4.4213, 36.7213]
            }
        },
        {
            id: 4,
            type: "Feature",
            properties: {
                nombre: "Restaurante José Carlos García",
                tipo: "Restaurante",
                cocina: "Mediterránea",
                horario: "13:00 - 23:00",
                puntuacion: 4.8,
                valoraciones: 210,
                imagen: "images/puntosinteres/josecarlosgarcia.jpg"
            },
            geometry: {
                type: "Point",
                coordinates: [-4.4182, 36.7174]
            }
        },
        {
            id: 5,
            type: "Feature",
            properties: {
                nombre: "Museo Picasso Málaga",
                tipo: "Museo",
                historia: "Dedicado a Pablo Picasso",
                costo_entrada: "9€",
                horario: "10:00 - 18:00",
                puntuacion: 4.7,
                valoraciones: 400,
                imagen: "images/puntosinteres/museopicaso.jpg"
            },
            geometry: {
                type: "Point",
                coordinates: [-4.4216, 36.7236]
            }
        },
        {
            id: 6,
            type: "Feature",
            properties: {
                nombre: "Centre Pompidou Málaga",
                tipo: "Museo",
                historia: "Arte contemporáneo",
                costo_entrada: "7€",
                horario: "9:30 - 20:00",
                puntuacion: 4.6,
                valoraciones: 350,
                imagen: "images/puntosinteres/pompidou.jpg"
            },
            geometry: {
                type: "Point",
                coordinates: [-4.4164, 36.7178]
            }
        },
        {
            id: 7,
            type: "Feature",
            properties: {
                nombre: "Parque de Málaga",
                tipo: "Parque",
                senderos: "Si",
                eventos: "Conciertos, exposiciones",
                puntuacion: 4.7,
                valoraciones: 500,
                imagen: "images/puntosinteres/parquemalaga.jpg"
            },
            geometry: {
                type: "Point",
                coordinates: [-4.4153, 36.7186]
            }
        },
        {
            id: 8,
            type: "Feature",
            properties: {
                nombre: "Jardín Botánico-Histórico La Concepción",
                tipo: "Parque",
                senderos: "Si",
                eventos: "Visitas guiadas, talleres",
                puntuacion: 4.8,
                valoraciones: 350,
                imagen: "images/puntosinteres/botanico.jpg"
            },
            geometry: {
                type: "Point",
                coordinates: [-4.4367, 36.7491]
            }
        }
    ]
};

function getAllPoints() {
    return temporalGeoJson;
}

function getAllUsers() {
    return users;
}

function findUser(email, password) {
    const user = users.find(user => user.email === email);

    if (user) {
        return (password === user.password) ? user : null;
    }

    return null;
}
module.exports = {
    getAllUsers,
    findUser,
    getAllPoints
}