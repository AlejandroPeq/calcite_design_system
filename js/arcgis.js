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
    "esri/widgets/Search",
    "esri/widgets/ShadowCast",
    "esri/widgets/Daylight",
    "esri/widgets/ElevationProfile",
    "esri/widgets/LineOfSight",
    "esri/widgets/HistogramRangeSlider",
    "esri/smartMapping/statistics/histogram",
    "esri/core/promiseUtils"
], function (WebScene, SceneView, Bookmarks, BasemapGallery, LayerList, Legend, Slice, Weather, DirectLineMeasurement3D, AreaMeasurement3D, 
    Search, ShadowCast, Daylight, ElevationProfile, LineOfSight, HistogramRangeSlider,histogram,promiseUtils) {

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
        container: 'weather-container'
    });

    let measurementWidget = new AreaMeasurement3D({
        view: view,
        container: 'area-measurement-container'
    });

    const searchWidget = new Search({
        view: view

    });

    const lineOfSight = new LineOfSight({
        view: view,
        container: 'lineOfSight-container'
    });

    // const shadowCast = new ShadowCast({
    //     view: view,
    //     container: 'shadow-container'
    // });

    const daylight = new Daylight({
        view: view,
        container: 'daylight-container',
        dateOrSeason: "season"
    });


    view.ui.add(searchWidget, {
        position: "top-right",
        index: 2
    });

    const elevationProfile = new ElevationProfile({
        view: view,
        container: 'profile-container',
    });

    let layerList = new LayerList({
        view: view,
        container: 'layerList-container',
    });

    // view.ui.add(elevationProfile, {
    //     position: "top-right",
    //     index: 2
    // });




    webscene.when(() => {


        const layer = webscene.allLayers.find(function (layer) {
            return layer.title === "Buildings";
        });

        document.querySelector("calcite-shell").hidden = false;
        document.querySelector("calcite-loader").active = false;

        view.whenLayerView(layer).then((layerView) => {
            const field = "building_levels";
            const min = 0;
            const max = 30;

            histogram({
                layer: layer,
                field: field,
               
                minValue: min,
                maxValue: max
            }).then((histogramResponse) => {
                const slider = new HistogramRangeSlider({
                    
                    min: min,
                    max: max,
                    values: [min, max],
                    excludedBarColor: "#524e4e",
                    rangeType: "between",
                    container: document.getElementById("slider-container")
                });

                slider.on(
                    ["thumb-change", "thumb-drag", "segment-drag"],
                    (event) => {
                        filterByHistogramRange(field).catch((error) => {
                            if (error.name !== "AbortError") {
                                console.error(error);
                            }
                        });
                    }
                );

                const filterByHistogramRange = promiseUtils.debounce((field) => {
                    layerView.filter = {
                        where: slider.generateWhereClause(field)
                    };
                });

            
            });
        });

    });

    let left_panel = document.getElementById('left-panel');

    document.getElementById('collapse-button').addEventListener("click", function () {

        if (left_panel.getAttribute("collapsed") == "false")

            left_panel.setAttribute("collapsed", "true");
        else
            left_panel.setAttribute("collapsed", "false");


    });



});