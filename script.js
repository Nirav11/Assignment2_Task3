require(["esri/Map", "esri/layers/CSVLayer", "esri/views/MapView", "esri/widgets/Legend"], (
    Map,
    CSVLayer,
    MapView,
    Legend
  ) => {
    var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

    // Paste the url into a browser's address bar to download and view the attributes
    // in the CSV file. These attributes include:
    // * mag - magnitude
    // * type - earthquake or other event such as nuclear test
    // * place - location of the event
    // * time - the time of the event

    const template = {
      title: "Crime committed at {ILEADSStreet}"    
    };

    // The heatmap renderer assigns each pixel in the view with
    // an intensity value. The ratio of that intensity value
    // to the maxPixel intensity is used to assign a color
    // from the continuous color ramp in the colorStops property

    const renderer = {
    type: "heatmap",
    colorStops: [
        { color: "rgba(173, 216, 230, 0)", ratio: 0 }, 
        { color: "#add8e6", ratio: 0.083 },           
        { color: "#87ceeb", ratio: 0.166 },           
        { color: "#1e90ff", ratio: 0.249 },            
        { color: "#0000cd", ratio: 0.332 },            
        { color: "#00008b", ratio: 0.415 },            
        { color: "#000080", ratio: 0.498 },            
        { color: "#191970", ratio: 0.581 },           
        { color: "#000033", ratio: 0.664 },            
        { color: "#000033", ratio: 0.747 },            
        { color: "#000033", ratio: 0.83 },             
        { color: "#000033", ratio: 0.913 },           
        { color: "#000033", ratio: 1 }                 
    ],
    maxDensity: 0.01,
    minDensity: 0
    };

    const layer = new CSVLayer({
        url: url,
        title: "St. Louis Crime Heatmap",
        copyright: "St. Louis Police Department",
		latitudeField:"Latitude",
        longitudeField:"Longitude",
		popupTemplate: template,
		renderer: renderer
}); 
 
    const map = new Map({
      basemap: "gray-vector",
      layers: [layer]
    });

    const view = new MapView({
      container: "viewDiv",
      center: [-90.1994, 38.6270],
      zoom: 12,
      map: map
    });

    view.ui.add(
      new Legend({
        view: view
      }),
      "bottom-left"
    );
  });
