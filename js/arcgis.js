require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Bookmarks",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Print"
], function (WebMap, MapView, Bookmarks, BasemapGallery, LayerList, Legend, Print) {

    const webmapId = '5c895f06a81e46dd8a459b61585883d8'

    const webmap = new WebMap({
        portalItem: {
            id: webmapId
        }
    });


    const view = new MapView({
        map: webmap,
        container: "viewDiv",
        padding: {
            left: 49
        }
    });


    webmap.when(() => {


        document.querySelector("calcite-shell").hidden = false;
        document.querySelector("calcite-loader").active = false;

    });

});