require([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/widgets/Bookmarks",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Slice",
    "esri/widgets/Weather",
    "esri/widgets/DirectLineMeasurement3D",
    "esri/widgets/AreaMeasurement3D",
], function (WebScene, SceneView, Bookmarks, BasemapGallery, LayerList, Legend, Slice, Weather,DirectLineMeasurement3D,AreaMeasurement3D) {

    const websceneId = 'cac6143eca14471ebc1b90ea29b827c6'

    const webscene = new WebScene({
        portalItem: {
            id: websceneId
        }
    });


    const view = new SceneView({
        map: webscene,
        container: "viewDiv",
    });

    const slice = new Slice({
        view: view,
        container: 'slice-container'
    });

    const weather = new Weather({
        view: view,
        container:'weather-container'
    });

    let measurementWidget = new AreaMeasurement3D({
        view: view,
        container:'area-measurement-container'
      });
    

    webscene.when(() => {


        document.querySelector("calcite-shell").hidden = false;
        document.querySelector("calcite-loader").active = false;

    });

    let left_panel = document.getElementById('left-panel');

    document.getElementById('collapse-button').addEventListener("click", function(){

        if (left_panel.getAttribute("collapsed") == "false")
        
            left_panel.setAttribute("collapsed", "true"); 
        else
            left_panel.setAttribute("collapsed", "false");
        

    });

    

});