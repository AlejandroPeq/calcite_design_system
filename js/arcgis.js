require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Bookmarks",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Print"
], function (WebMap, MapView, Bookmarks, BasemapGallery, LayerList, Legend, Print) {

    const webmapId = 'cc3bd744b9a44feaa493dd867a1d48dd'

    const map = new WebMap({
        portalItem: {
            id: webmapId
        }
    });

    map.when(() => {


        document.querySelector("calcite-shell").hidden = false;
        document.querySelector("calcite-loader").active = false;

    });

});