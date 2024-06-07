import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, ZoomSlider,  } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";

let osm = new Tile({
    type: "base",
    title: "Open Street Maps",
    visible: true,
    source: new OSM()
});
//Create the layer groups and add the layers to them
let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
})

var roads = new Image({
    title: "Roads Buffer",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:road_raster' }
    })
});
var rivers = new Image({
    title: "Rivers Buffer",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:river_raster' }
    })
});

var faults = new Image({
    title: "Faults Buffer",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:fault_raster' }
    })
});

var ndvi = new Image({
    title: "NDVI",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:ndvi' }
    })
});

var dtm = new Image({
    title: "DTM",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:dtm' }
    })
});

var dusaf = new Image({
    title: "DUSAF",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:dusaf' }
    })
});

var ls = new Image({
    title: "LS",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:LS' }
    })
});

var area = new Image({
    title: "Group 1 Area",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:group1' }
    })
});

var nlz = new Image({
    title: "NoLS",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:nlz' }
    })
});

var dtLayers = [
        roads,
        rivers,
        faults,
        ndvi,
        dtm,
        dusaf,
        ls,
        area,
        nlz
    ];

dtLayers.forEach((layer) => {
    layer.setVisible(false)
})

area.setVisible(true);

let dataLayers = new Group({
    title: "Data Layers",
    layers: dtLayers
})

var susc = new Image({
    title: "Aspect",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:aspect' }
    })
});

var aspect = new Image({
    title: "Aspect",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:aspect' },
        ratio: 1,
        serverType: 'geoserver'
    }),
    opacity: 1
});

var slope = new Image({
    title: "Slope",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:slope' },
        opacity:1
    })
});

var profile = new Image({
    title: "Profile",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:profile' },
        opacity:1
    })
});

var plan = new Image({
    title: "Plan",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:plan' },
        opacity:1
    })
});

var training = new Image({
    title: "Training",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:trainingPointsSampled' },
        opacity:1
    })
});

var testing = new Image({
    title: "Testing",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:testingPointsSampled' },
        opacity:1
    })
});

var population = new Image({
    title: "Population",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:population' },
        opacity: 1,
    })
});

var susceptibilityReclass = new Image({
    title: "LSSusceptibility Reclass,Resamlped",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:LandslideSusceptibilityMap_reclass_resamlped' },
        opacity: 1,
    })
})

var cmpLayers = [
        aspect,
        slope,
        profile,
        plan,
        training,
        population,
        testing,
        susceptibilityReclass
    ];

cmpLayers.forEach((layer) =>
    layer.setVisible(false)
)

let computedLayers = new Group({
    title: "Computed Layers",
    layers: cmpLayers
})


// Map Initialization
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, computedLayers, dataLayers],
    view: new View({
        center: fromLonLat([10.1667, 46.2167]),
        zoom: 12
    })
});

// Add the map controls:
map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:32632',
    className: 'custom-control',
    placeholder: '0.0000, 0.0000'
}));

let layerSwitcher = new LayerSwitcher({});

map.addControl(layerSwitcher)
// Функция для создания слайдера непрозрачности
function createOpacitySlider(layer, sliderId) {
  var sliderHTML = `
    <input type="range" id="${sliderId}" class="opacity-slider" min="0" max="1" step="0.1" value="${layer.getOpacity()}">
  `;
  return sliderHTML;
}

// Получаем все элементы с классом "panel"
var panels = document.getElementsByClassName('panel');

// Функция для поиска слоя Image по названию
function findImageLayer(layerGroup, title) {
  // Итерируем по всем слоям в группе
  return layerGroup.getLayers().getArray().find(function(layer) {

    if (layer instanceof Group) {
      // Рекурсивно ищем в подгруппах
      return findImageLayer(layer, title);
    } else if (layer.get('title') === title) {
        // Если найден слой с совпадающим названием, возвращаем его
      return layer;
    }
  });
}

// Итерируем по каждой коллекции в panels
Array.from(panels).forEach(function(panel) {
  // Получаем все элементы с классом "layer" внутри текущей панели
  var layerElements = panel.getElementsByClassName('layer');

  // Добавление слайдеров для каждого слоя
  Array.from(layerElements).forEach(function(layerElement) {
    // Получаем название слоя из метаданных
    var layerTitle = layerElement.textContent.trim();

    // Находим соответствующий слой на карте по названию
    var layer = findImageLayer(map, layerTitle);

    // Если слой найден, добавляем слайдер непрозрачности
    if (layer) {
      // Создаем уникальный ID для слайдера
      var sliderId = layerTitle.replace(/\s+/g, '-') + '-opacity';

      // Создаем HTML для слайдера непрозрачности
      var sliderHTML = createOpacitySlider(layer, sliderId);

      // Вставляем слайдер после элемента слоя
      layerElement.insertAdjacentHTML('beforeend', sliderHTML);

      // console.log(layerElement)
      // Обработка события изменения значения слайдера
      var slider = document.getElementById(sliderId);
      slider.addEventListener('input', function() {
        var opacity = parseFloat(this.value);
        layer.setOpacity(opacity);
      });
    }
  });
});
var panels = document.getElementsByClassName('panel');

// Итерируем по каждой коллекции в panels
Array.from(panels).forEach(function(panel) {
    // Получаем все элементы с классом "layer" внутри текущей панели
    var layerElements = panel.getElementsByClassName('layer');
    console.log(layerElements)
});
//OPTIONAL
//Add the Bing Maps layers
var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var aerialWithLabelsOnDemand = new Tile({
    title: 'Bing Maps—AerialWithLabelsOnDemand',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'AerialWithLabelsOnDemand'
    })
});

basemapLayers.getLayers().extend([aerialWithLabelsOnDemand]);

//Add the Stadia Maps layers
var stadiaWatercolor = new Tile({
    title: "Stadia Watercolor",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_watercolor'
    })
})
var stadiaToner = new Tile({
    title: "Stadia Toner",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_toner'
    })
})
var stadiaSmoothDark = new Tile({
    title: "Stadia Smooth Dark",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'alidade_smooth_dark'
    })
})


//basemapLayers.addLayer(stadiaWatercolor);
basemapLayers.getLayers().extend([stadiaWatercolor, stadiaToner, stadiaSmoothDark]);

//Add the code for the Pop-up
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var popup = new Overlay({
    element: container
});
map.addOverlay(popup);

// The click event handler for closing the popup.
// This ensures that JQuery ($) is already available in the page.
$(document).ready(function () {
    map.on('singleclick', function (event) {
        //This iterates over all the features that are located on the pixel of the click (can be many)
        var feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            return feature;
        });

        //If there is a feature, open the popup by setting a position to it and put the data from the feature
        if (feature != null) {
            var pixel = event.pixel;
            var coord = map.getCoordinateFromPixel(pixel);
            popup.setPosition(coord);
            content.innerHTML =
                '<h5>Colombia Water Areas</h5><br><b>Name: </b>' +
                feature.get('NAME') +
                '</br><b>Description: </b>' +
                feature.get('HYC_DESCRI');
        }
    });
});



// Adding map event for pointermove
// The click event handler for closing the popup.
closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur();
    return false;
};

map.on('pointermove', function(event){
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

map.on('moveend', function(event){
    console.log("moved map");
});