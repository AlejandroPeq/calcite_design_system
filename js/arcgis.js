require([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/widgets/Bookmarks",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Slice",
    "esri/widgets/Weather"
], function (WebScene, SceneView, Bookmarks, BasemapGallery, LayerList, Legend, Slice, Weather) {

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
    });

    view.ui.add(weather, "top-right");

    webscene.when(() => {


        document.querySelector("calcite-shell").hidden = false;
        document.querySelector("calcite-loader").active = false;

    });

});