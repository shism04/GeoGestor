if (document.querySelector('#mapa')) {
  var map = L.map('mapa').setView([36.73, -4.42], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  let geojsonLayer;
  let userMarker;

  const hotelIcon = L.icon({
    iconUrl: 'images/icons/hotel.png',
    iconSize: [30, 30],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const restaurantIcon = L.icon({
    iconUrl: 'images/icons/restaurant.png',
    iconSize: [30, 30],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const museumIcon = L.icon({
    iconUrl: 'images/icons/museum.png',
    iconSize: [30, 30],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const parkIcon = L.icon({
    iconUrl: 'images/icons/park.png',
    iconSize: [30, 30],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  function previewImageEdit(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        let preview = document.getElementById("previewImagenEdit");
        if (!preview) {
          preview = document.createElement("img");
          preview.id = "previewImagen";
          preview.className = "img-fluid rounded mt-2";
          preview.style.maxWidth = "200px";
          input.parentNode.appendChild(preview);
        }
        preview.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  function previewImageAdd(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        let preview = document.getElementById("previewImagen");
        if (!preview) {
          preview = document.createElement("img");
          preview.id = "previewImagen";
          preview.className = "img-fluid rounded mt-2";
          preview.style.maxWidth = "200px";
          input.parentNode.appendChild(preview);
        }
        preview.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  editFormContainer = document.querySelector('#form-model');

  function generateEditForm(feature) {
    const properties = feature.properties;
    let formHTML = `
        <div class="mb-3">
            <label for="editNombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="editNombre" name="nombre" value="${properties.nombre}" required>
        </div>
         <input type="hidden" value="${feature.id}" name="id">
    `;

    if (properties.precio_medio !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editPrecioMedio" class="form-label">Precio Medio</label>
                <input type="text" class="form-control" id="editPrecioMedio" name="precio_medio" value="${properties.precio_medio || ""}">
            </div>
        `;
    }
    if (properties.disponibilidad !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editDisponibilidad" class="form-label">Disponibilidad</label>
                <input type="text" class="form-control" id="editDisponibilidad" name="disponibilidad" value="${properties.disponibilidad || ""}">
            </div>
        `;
    }
    if (properties.horario !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editHorario" class="form-label">Horario</label>
                <input type="text" class="form-control" id="editHorario" name="horario" value="${properties.horario || ""}">
            </div>
        `;
    }
    if (properties.puntuacion !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editPuntuacion" class="form-label">Puntuación</label>
                <input type="number" class="form-control" id="editPuntuacion" name="puntuacion" min="0" max="5" step="0.1" value="${properties.puntuacion || 0}">
            </div>
        `;
    }
    if (properties.cocina !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editCocina" class="form-label">Tipo de Cocina</label>
                <input type="text" class="form-control" id="editCocina" name="cocina" value="${properties.cocina || ""}">
            </div>
        `;
    }
    if (properties.historia !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editHistoria" class="form-label">Historia</label>
                <textarea class="form-control" id="editHistoria" name="historia">${properties.historia || ""}</textarea>
            </div>
        `;
    }
    if (properties.costo_entrada !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editCostoEntrada" class="form-label">Costo de Entrada</label>
                <input type="text" class="form-control" id="editCostoEntrada" name="costo_entrada" value="${properties.costo_entrada || ""}">
            </div>
        `;
    }
    if (properties.areas_recreativas !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editAreasRecreativas" class="form-label">Áreas Recreativas</label>
                <input type="text" class="form-control" id="editAreasRecreativas" name="areas_recreativas" value="${properties.areas_recreativas || ""}">
            </div>
        `;
    }
    if (properties.senderos !== undefined) {
      let checkedSi = properties.senderos === "Si" ? "checked" : "";
      let checkedNo = properties.senderos === "No" ? "checked" : "";

      formHTML += `
          <div class="mb-3">
              <label class="form-label">Senderos</label>
              <div class="form-check">
                  <input class="form-check-input" type="radio" id="senderos_si" name="senderos" value="si" ${checkedSi}>
                  <label class="form-check-label" for="senderos_si">Sí</label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" id="senderos_no" name="senderos" value="no" ${checkedNo}>
                  <label class="form-check-label" for="senderos_no">No</label>
              </div>
          </div>
      `;
    }
    if (properties.eventos !== undefined) {
      formHTML += `
            <div class="mb-3">
                <label for="editEventos" class="form-label">Eventos</label>
                <input type="text" class="form-control" id="editEventos" name="eventos" value="${properties.eventos || ""}">
            </div>
        `;
    }
    if (properties.imagen !== undefined) {
      formHTML += `<div class="mb-3">
            <label for="editImagen" class="form-label">Imagen</label>
            <input type="file" class="form-control" id="editImagen" name="imagen" onchange="previewImageEdit(event)">
            ${properties.imagen ? `
                <div class="mt-2">
                    <img id="previewImagenEdit" src="${properties.imagen}" alt="Imagen actual" class="img-fluid rounded" style="max-width: 200px;">
                </div>
            ` : ''}
        </div>`;
    }

    editFormContainer.innerHTML = formHTML;
  }
  const editModal = new bootstrap.Modal(document.getElementById("puntointeresmodaledit"));

  function openEditModal(feature) {
    selectedFeature = feature;
    generateEditForm(feature);
    editModal.show();
  }

  document.getElementById("guardar-btn").addEventListener("click", function () {
    document.getElementById("form-model").submit();
  });

  document.getElementById("add-btn").addEventListener("click", function () {
    document.getElementById("form-model-add").submit();
  });

  function confirmarEliminacion(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este punto de interés?")) {
      window.location.href = `/mapa/eliminarpunto/${id}`;
    }
  }

  const cardsContainer = document.getElementById('row-container');


  function createCard(feature) {
    const col = document.createElement('div');
    col.className = 'col-6 mb-4';
    col.innerHTML = `
                    <div class="card h-100 shadow-sm position-relative">
                      <div class="image-container position-relative">
                     <img src="${feature.properties.imagen}" class="card-img-top" alt="${feature.properties.nombre}" style="width: 100%; height: auto; max-height: 200px; object-fit: cover;">
                    <div class="btn-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-start justify-content-end p-2">
                        <div class="backdrop p-2 rounded">
                            <a class="btn btn-warning btn-sm me-1" id="btn-edit">✏️ Editar</a>
                            <a class="btn btn-danger btn-sm" href="#" onclick="confirmarEliminacion(${feature.id})">🗑 Eliminar</a>
                    </div>
                    </div>
                    ${feature.properties.precio_medio ? `
                    <div class="price-overlay position-absolute bottom-0 end-0 mx-2">
                        <p class="backdrop text-white fw-bold px-2 py-1 rounded">${feature.properties.precio_medio}</p>
                    </div>
                    ` : ''}
                    </div>
                    <div class="card-body">
                    <h5 class="card-title fw-bold" style="color:#2e3b4e;">${feature.properties.nombre}</h5>
                    <p class="card-text"><strong>Tipo:</strong> ${feature.properties.tipo}</p>
                    ${feature.properties.disponibilidad ? `<p class="card-text"><strong>Disponibilidad:</strong> ${feature.properties.disponibilidad}</p>` : ''}
                    ${feature.properties.horario ? `<p class="card-text"><strong>Horario:</strong> ${feature.properties.horario}</p>` : ''}
                    ${feature.properties.puntuacion ? `<p class="card-text"><strong>Puntuación:</strong> ⭐${feature.properties.puntuacion} (${feature.properties.valoraciones} valoraciones)</p>` : ''}
                    ${feature.properties.cocina ? `<p class="card-text"><strong>Cocina:</strong> ${feature.properties.cocina}</p>` : ''}
                    ${feature.properties.historia ? `<p class="card-text"><strong>Historia:</strong> ${feature.properties.historia}</p>` : ''}
                    ${feature.properties.costo_entrada ? `<p class="card-text"><strong>Costo de Entrada:</strong> ${feature.properties.costo_entrada}</p>` : ''}
                    ${feature.properties.areas_recreativas ? `<p class="card-text"><strong>Áreas Recreativas:</strong> ${feature.properties.areas_recreativas}</p>` : ''}
                    ${feature.properties.senderos ? `<p class="card-text"><strong>Senderos:</strong> ${feature.properties.senderos}</p>` : ''}
                    ${feature.properties.eventos ? `<p class="card-text"><strong>Eventos:</strong> ${feature.properties.eventos}</p>` : ''}
                  </div>
                  </div>
      `;
    cardsContainer.appendChild(col);


    col.querySelector("#btn-edit").addEventListener("click", function () {
      openEditModal(feature);
    });
  }

  document.querySelector("#findNearest").addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      // Si ya hay un marcador del usuario, eliminarlo antes de agregar otro
      if (userMarker) {
        map.removeLayer(userMarker);
      }

      // Agregar un círculo en la ubicación del usuario
      userMarker = L.circleMarker([userLat, userLon], {
        color: "blue", 
        fillColor: "blue", 
        fillOpacity: 0.5,
        radius: 8 
      }).addTo(map).bindPopup("Tu ubicación").openPopup();

      // Extraer las características (features) directamente desde geojsonLayer
      const features = [];
      geojsonLayer.eachLayer(layer => {
        if (layer.feature) {
          features.push(layer.feature);
        }
      });

      // Buscar el punto más cercano
      const nearestPOI = findNearestPoint(userLat, userLon, features);

      console.log(nearestPOI);
      if (nearestPOI) {
        const latlng = [nearestPOI.geometry.coordinates[1], nearestPOI.geometry.coordinates[0]];

        // Buscar el marcador correspondiente en geojsonLayer
        geojsonLayer.eachLayer(layer => {
          if (layer.getLatLng().lat === latlng[0] && layer.getLatLng().lng === latlng[1]) {
            map.setView(latlng, 15); // Mueve el mapa con zoom 15
            layer.openPopup(); // Abre el popup del marcador
          }
        });
      }
    }, error => {
      console.error("Error obteniendo la ubicación:", error);
      alert("No se pudo obtener tu ubicación.");
    });
  });


  document.getElementById("tipo").addEventListener("change", function () {
    // Ocultar todos los contenedores de inputs y limpiar sus valores
    document.querySelectorAll(".tipo-fields").forEach(el => {
      el.classList.add("d-none"); // Oculta la sección
      el.querySelectorAll("input, textarea").forEach(input => {
        if (input.type === "radio") {
          input.checked = false;
        } else {
          input.value = ""; // Limpia los campos
        }
      });
    });

    // Deshabilitar todos los inputs de "horario"
    document.querySelectorAll(".tipo-fields input[name='horario']").forEach(input => {
      input.disabled = true;
    });


    let selectedType = this.value;
    let activeFields = document.getElementById(selectedType + "-fields");

    if (activeFields) {
      activeFields.classList.remove("d-none");
      activeFields.querySelectorAll("input[name='horario']").forEach(input => {
        input.disabled = false;
      });
    }
  });

  // Mostrar el contenedor correspondiente al tipo seleccionado
  const tipoSeleccionado = this.value;
  if (tipoSeleccionado) {
    document.getElementById(tipoSeleccionado + "-fields").classList.remove("d-none");
  }

  function loadMarkers(category) {
    fetch("/api/geojson")
      .then(response => response.json())
      .then(data => {
        if (geojsonLayer) {
          map.removeLayer(geojsonLayer);
        }
        if (cardsContainer) {
          cardsContainer.innerHTML = "";
        }
        const filteredData = category === "all" ? data : {
          type: "FeatureCollection",
          features: data.features.filter(feature => feature.properties.tipo === category)
        };
        geojsonLayer = L.geoJSON(filteredData, {
          pointToLayer: function (feature, latlng) {
            let icon;

            switch (feature.properties.tipo) {
              case "Hotel":
                icon = hotelIcon;
                break;
              case "Restaurante":
                icon = restaurantIcon;
                break;
              case "Museo":
                icon = museumIcon;
                break;
              case "Parque":
                icon = parkIcon;
                break;
              default:
                icon = hotelIcon;
            }

            return L.marker(latlng, { icon: icon }).bindPopup(`
              <div class="p-2">
                  <img src="${feature.properties.imagen}" class="rounded mb-2" style="width: 250px; height: 75px; object-fit: cover;" />
                  <div class="px-2">
                  <p class="fs-6 fw-bold m-1">${feature.properties.nombre}</p>
                  <p class="text-secondary m-1">${feature.properties.tipo}</p>
                  ${feature.properties.precio_medio ? `<p class="text-secondary m-1">${feature.properties.precio_medio}</p>` : ""}
                  ${feature.properties.disponibilidad ? `<p class="text-secondary m-1">${feature.properties.disponibilidad}</p>` : ""}
                  ${feature.properties.horario ? `<p class="text-secondary m-1">${feature.properties.horario}</p>` : ""}
                  ${feature.properties.puntuacion ? `<p class="text-secondary m-1">⭐${feature.properties.puntuacion} (${feature.properties.valoraciones} valoraciones)</p>` : ""}
                  ${feature.properties.cocina ? `<p class="text-secondary m-1">${feature.properties.cocina}</p>` : ""}
                  ${feature.properties.historia ? `<p class="text-secondary m-1">${feature.properties.historia}</p>` : ""}
                  ${feature.properties.costo_entrada ? `<p class="text-secondary m-1"${feature.properties.costo_entrada}</p>` : ""}
                  ${feature.properties.areas_recreativas ? `<p class="text-secondary m-1">${feature.properties.areas_recreativas}</p>` : ""}
                  ${feature.properties.senderos ? `<p class="text-secondary m-1"${feature.properties.senderos}</p>` : ""}
                  ${feature.properties.eventos ? `<p class="text-secondary m-1">${feature.properties.eventos}</p>` : ""}
                  </div>
              </div>
          `)
          },
          onEachFeature: function (feature, layer) {
            createCard(feature);
          }
        })
        geojsonLayer.addTo(map)
      })
      .catch(error => console.log("Error cargando el GeoJSON:", error));
  }
  document.querySelector("#filterCategory").addEventListener("change", function () {
    const selectedCategory = this.value;
    loadMarkers(selectedCategory);
  });

  // Cargar todos los marcadores al inicio
  loadMarkers("all");

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  function findNearestPoint(userLat, userLon, points) {
    console.log("this is from function findNearestPoint");
    console.log(userLat);
    console.log(userLon);
    console.log(points);
    let nearestPoint = null;
    let minDistance = Infinity;

    points.forEach(point => {
      const [lon, lat] = point.geometry.coordinates;
      const distance = haversineDistance(userLat, userLon, lat, lon);

      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    });

    console.log("neareast point to the client");
    console.log(nearestPoint);

    return nearestPoint;
  }
}
