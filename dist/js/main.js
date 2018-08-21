"use strict";

/* Part files requiring */

$(document).ready(function () {

    $(".navbar-nav").on("click", "a", function (event) {

        event.preventDefault();

        var id = $(this).attr('href'),
            top = $(id).offset().top;

        if ($(window).width() < 992) {

            $('body,html').animate({ scrollTop: top - 130 }, 1500);
        } else {

            $('body,html').animate({ scrollTop: top - 147 }, 1500);
        }

        if ($('.navbar-collapse').hasClass('show')) {

            $('.navbar-collapse').removeClass('show');

            $(".navbar-toggler").addClass('collapsed');
        }
    });
});
window.onload = function () {

    google.maps.event.addDomListener(window, 'load', initMap());

    var popup = void 0,
        Popup = void 0;

    function initMap() {

        var map = void 0;

        // Styles for map
        var mapStyles = [{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.country",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "weight": 0.6
            }]
        }, {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.province",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.locality",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.locality",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.neighborhood",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#61af5b"
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#ffffff"
            }]
        }];

        var markers = [];

        // Map markers
        var icons = {
            info: {
                name: 'info',
                icon: {
                    url: 'img/Untitled-2.png',
                    scaledSize: new google.maps.Size(18, 26),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0)
                }
            },
            active: {
                name: 'active',
                icon: {
                    url: 'img/Untitled-1.png',
                    scaledSize: new google.maps.Size(23, 33),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0)
                }
            }
        };

        // Coordinates markers
        var features = [{
            position: new google.maps.LatLng(53.917826, 27.505010),
            id: 1
        }, {
            position: new google.maps.LatLng(51.105654, 17.032992),
            id: 2
        }, {
            position: new google.maps.LatLng(50.079412, 14.442535),
            id: 3
        }, {
            position: new google.maps.LatLng(50.853150, 4.342061),
            id: 4
        }, {
            position: new google.maps.LatLng(49.225661, -2.161435),
            id: 5
        }, {
            position: new google.maps.LatLng(39.109390, -94.583899),
            id: 6
        }, {
            position: new google.maps.LatLng(46.946682, -109.450647),
            id: 7
        }];

        // Data for tooltips
        var tooltips = [{
            id: 1,
            city: 'Мінськ',
            address: 'str. Chkalov, 47, building 1 Vitebsk BY-210041 Belarus',
            email: 'vet_zoo@mail.ru',
            phone: '+375-29-696-09-90',
            fax: '+375-29-696-09-90',
            url: 'www.animalid.by',
            name: 'General database of chipped animals of the Republic of Belarus',
            joined: '1/05/2017',
            firstUpdate: '1/05/201',
            lastUpdate: '1/05/201',
            typeMember: 'Full',
            animals: '1456'
        }, {
            id: 2,
            city: 'Some else',
            address: 'str. Chkalov, 47, building 1 Vitebsk BY-210041 Belarus',
            email: 'vet_zoo@mail.ru',
            phone: '+375-29-696-09-90',
            fax: '+375-29-696-09-90',
            url: 'www.animalid.by',
            name: 'General database of chipped animals of the Republic of Belarus',
            joined: '1/05/2017',
            firstUpdate: '1/05/201',
            lastUpdate: '1/05/201',
            typeMember: 'Full',
            animals: '1456'
        }, {
            id: 3,
            city: 'Мінськ',
            address: 'str. Chkalov, 47, building 1 Vitebsk BY-210041 Belarus',
            email: 'vet_zoo@mail.ru',
            phone: '+375-29-696-09-90',
            fax: '+375-29-696-09-90',
            url: 'www.animalid.by',
            name: 'General database of chipped animals of the Republic of Belarus',
            joined: '1/05/2017',
            firstUpdate: '1/05/201',
            lastUpdate: '1/05/201',
            typeMember: 'Full',
            animals: '1456'
        }, {
            id: 4,
            city: 'Мінськ',
            address: 'str. Chkalov, 47, building 1 Vitebsk BY-210041 Belarus',
            email: 'vet_zoo@mail.ru',
            phone: '+375-29-696-09-90',
            fax: '+375-29-696-09-90',
            url: 'www.animalid.by',
            name: 'General database of chipped animals of the Republic of Belarus',
            joined: '1/05/2017',
            firstUpdate: '1/05/201',
            lastUpdate: '1/05/201',
            typeMember: 'Full',
            animals: '1456'
        }, {
            id: 5,
            city: 'Мінськ',
            address: 'str. Chkalov, 47, building 1 Vitebsk BY-210041 Belarus',
            email: 'vet_zoo@mail.ru',
            phone: '+375-29-696-09-90',
            fax: '+375-29-696-09-90',
            url: 'www.animalid.by',
            name: 'General database of chipped animals of the Republic of Belarus',
            joined: '1/05/2017',
            firstUpdate: '1/05/201',
            lastUpdate: '1/05/201',
            typeMember: 'Full',
            animals: '1456'
        }, {
            id: 6,
            city: 'Мінськ',
            address: 'str. Chkalov, 47, building 1 Vitebsk BY-210041 Belarus',
            email: 'vet_zoo@mail.ru',
            phone: '+375-29-696-09-90',
            fax: '+375-29-696-09-90',
            url: 'www.animalid.by',
            name: 'General database of chipped animals of the Republic of Belarus',
            joined: '1/05/2017',
            firstUpdate: '1/05/201',
            lastUpdate: '1/05/201',
            typeMember: 'Full',
            animals: '1456'
        }, {
            id: 7,
            city: 'Мінськ',
            address: 'str. Chkalov, 47, building 1 Vitebsk BY-210041 Belarus',
            email: 'vet_zoo@mail.ru',
            phone: '+375-29-696-09-90',
            fax: '+375-29-696-09-90',
            url: 'www.animalid.by',
            name: 'General database of chipped animals of the Republic of Belarus',
            joined: '1/05/2017',
            firstUpdate: '1/05/201',
            lastUpdate: '1/05/201',
            typeMember: 'Full',
            animals: '1456'
        }];

        // Map init
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 30, lng: 10 },
            mapTypeControl: false,
            styles: mapStyles,
            zoom: 2,
            minZoom: 2,
            zoomControl: false,
            panControl: false,
            scaleControl: false,
            streetViewControl: false
        });

        // Init custom controls
        ZoomControl(map);

        // Init markers
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = features[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var feature = _step.value;

                var marker = new google.maps.Marker({
                    position: feature.position,
                    icon: icons.info.icon,
                    map: map,
                    id: feature.id
                });

                markers.push(marker);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            var _loop = function _loop() {
                var marker = _step2.value;

                marker.addListener('click', function () {

                    if (popup) {
                        popup.onAdd();
                    }

                    showTooltip(this);
                    definePopupClass();

                    popup = new Popup(marker.position, document.getElementById('content'));
                    popup.setMap(map);
                });
            };

            for (var _iterator2 = markers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                _loop();
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var btnClose = document.getElementById('map-popup-close');
        btnClose.addEventListener('click', function () {
            popup.onRemove();
            showTooltip();
        });

        function showTooltip(marker) {

            var activeMarker = markers.find(function (item) {
                return item.type === 'active';
            });
            if (activeMarker) {
                activeMarker.setIcon(icons.info.icon);
                activeMarker.type = 'info';
            }

            if (marker) {
                marker.setIcon(icons.active.icon);
                marker.type = 'active';

                var tooltip = tooltips.find(function (item) {
                    return item.id === marker.id;
                });

                if (tooltip) {
                    document.querySelector('.map-popup-city').innerHTML = tooltip.city;
                    document.querySelector('.map-popup-address').innerHTML = tooltip.address;
                    document.querySelector('.map-popup-email').innerHTML = tooltip.email;
                    document.querySelector('.map-popup-phone').innerHTML = tooltip.phone;
                    document.querySelector('.map-popup-fax').innerHTML = tooltip.fax;
                    document.querySelector('.map-popup-url').innerHTML = tooltip.url;
                    document.querySelector('.map-popup-name').innerHTML = tooltip.name;
                    document.querySelector('.map-popup-joined').innerHTML = tooltip.joined;
                    document.querySelector('.map-popup-firstUpdate').innerHTML = tooltip.firstUpdate;
                    document.querySelector('.map-popup-lastUpdate').innerHTML = tooltip.lastUpdate;
                    document.querySelector('.map-popup-typeMember').innerHTML = tooltip.typeMember;
                    document.querySelector('.map-popup-animalsCount').innerHTML = tooltip.animals;
                } else {
                    document.querySelector('.map-popup-city').innerHTML = '';
                    document.querySelector('.map-popup-address').innerHTML = '';
                    document.querySelector('.map-popup-email').innerHTML = '';
                    document.querySelector('.map-popup-phone').innerHTML = '';
                    document.querySelector('.map-popup-fax').innerHTML = '';
                    document.querySelector('.map-popup-url').innerHTML = '';
                    document.querySelector('.map-popup-name').innerHTML = '';
                    document.querySelector('.map-popup-joined').innerHTML = '';
                    document.querySelector('.map-popup-firstUpdate').innerHTML = '';
                    document.querySelector('.map-popup-lastUpdate').innerHTML = '';
                    document.querySelector('.map-popup-typeMember').innerHTML = '';
                    document.querySelector('.map-popup-animalsCount').innerHTML = '';
                }
            }
        }

        // Zoom control function
        function ZoomControl(map) {
            var zoomIn = document.getElementById('zoomIn');
            var zoomOut = document.getElementById('zoomOut');

            google.maps.event.addDomListener(zoomOut, 'click', function () {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 0) {
                    map.setZoom(currentZoomLevel - 1);
                }
            });

            google.maps.event.addDomListener(zoomIn, 'click', function () {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 21) {
                    map.setZoom(currentZoomLevel + 1);
                }
            });
        }
    }

    // Custom popup
    function definePopupClass() {
        Popup = function Popup(position, content) {
            this.position = position;

            content.classList.add('popup-bubble-content');

            var pixelOffset = document.createElement('div');
            pixelOffset.classList.add('popup-bubble-anchor');
            pixelOffset.appendChild(content);

            this.anchor = document.createElement('div');
            this.anchor.classList.add('popup-tip-anchor');
            this.anchor.appendChild(pixelOffset);
        };

        Popup.prototype = Object.create(google.maps.OverlayView.prototype);

        /** Called when the popup is added to the map. */
        Popup.prototype.onAdd = function () {
            this.getPanes().floatPane.appendChild(this.anchor);
        };

        /** Called when the popup is removed from the map. */
        Popup.prototype.onRemove = function () {
            if (this.anchor.parentElement) {
                this.anchor.parentElement.removeChild(this.anchor);
            }
        };

        /** Called when the popup needs to draw itself. */
        Popup.prototype.draw = function () {
            var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
            // Hide the popup when it is far out of view.
            var display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

            if (display === 'block') {
                this.anchor.style.left = divPosition.x + 'px';
                this.anchor.style.top = divPosition.y + 'px';
            }
            if (this.anchor.style.display !== display) {
                this.anchor.style.display = display;
            }
        };

        /** Stops clicks/drags from bubbling up to the map. */
        Popup.prototype.stopEventPropagation = function () {
            var anchor = this.anchor;
            anchor.style.cursor = 'auto';

            ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown'].forEach(function (event) {
                anchor.addEventListener(event, function (e) {
                    e.stopPropagation();
                });
            });
        };
    }
};

$(document).ready(function () {

    $(window).scroll(function () {

        $('.goal-item').each(function () {

            var bottom_of_object = getPosition(this).y + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height() + 300;

            if (bottom_of_window >= bottom_of_object) {
                $(this).addClass('animated fadeInUp');
            }
        });
    });

    function getPosition(element) {
        var xPosition = 0;
        var yPosition = 0;

        while (element) {
            xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
            yPosition += element.offsetTop - element.scrollTop + element.clientTop;
            element = element.offsetParent;
        }
        return { x: xPosition, y: yPosition };
    }
});
$(document).ready(function () {
    $(document).scroll(function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            $('#btnUp').css('display', "block");
        } else {
            $('#btnUp').css('display', "none");
        }
    });

    $('#btnUp').on('click', function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });
});

$(document).ready(function () {

    $('#search-form').on('submit', function (e) {
        e.preventDefault();
        $('#result-search-modal').modal('show');
    });
});