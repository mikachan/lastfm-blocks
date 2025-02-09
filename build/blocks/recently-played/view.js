/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/lastfm-resolvers.js":
/*!*************************************!*\
  !*** ./src/api/lastfm-resolvers.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLastFmTracks: () => (/* binding */ fetchLastFmTracks)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0/';
const LASTFM_METHOD = 'user.getrecenttracks';

/**
 * Fetches recent tracks from Last.fm API
 *
 * @param {string}        apiKey         The Last.fm API key
 * @param {string}        username       The Last.fm username
 * @param {string|number} numberOfTracks Number of tracks to fetch, defaults to 1
 * @return {Promise<Array>}              Array of track objects
 * @throws  {Error}                      If the API request fails or no tracks are found
 */
async function fetchLastFmTracks(apiKey, username, numberOfTracks = '1') {
  if (!apiKey || !username) {
    throw new Error('API key and username are required');
  }
  const limit = parseInt(numberOfTracks, 10);
  if (isNaN(limit) || limit < 1) {
    throw new Error('Number of tracks must be a positive number');
  }
  try {
    const response = await fetch(`${LASTFM_API_URL}?method=${LASTFM_METHOD}&user=${username}&api_key=${apiKey}&format=json&limit=${limit}`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    if (data.recenttracks['@attr']?.total === '0') {
      throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      // translators: %s: Last.fm username
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No Last.fm tracks found from user "%s".', 'lastfm-blocks'), username));
    }
    if (!data.recenttracks.track) {
      return [];
    }
    const tracks = data.recenttracks.track;
    // Ensure we don't return more tracks than requested
    // Sometimes the API returns an extra track
    return tracks.slice(0, limit);
  } catch (error) {
    throw error;
  }
}

/***/ }),

/***/ "./src/components/tracks-list.js":
/*!***************************************!*\
  !*** ./src/components/tracks-list.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TracksList: () => (/* binding */ TracksList)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


function TracksList({
  tracks,
  includeLinkToTrack,
  showTrackArtwork,
  imageStyle,
  textAlign
}) {
  const isTracksValid = tracks?.length > 0;
  const TrackLinkTag = ({
    children,
    url
  }) => {
    if (includeLinkToTrack) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
        href: url,
        target: "_blank",
        rel: "noreferrer",
        className: "track-name",
        children: children
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: "track-name",
      children: children
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul", {
    className: `tracks-list ${`has-text-align-${textAlign}`}`,
    children: [!isTracksValid && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
      className: "no-tracks-found",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No tracks found.', 'lastfm-blocks')
    }), isTracksValid && tracks.map(track => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
      children: [showTrackArtwork && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: `track-image ${imageStyle}`,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TrackLinkTag, {
          url: track.url,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
            className: "artwork",
            role: "img",
            "aria-label": `${track.artist['#text']} - ${track.name}`,
            style: {
              backgroundImage: `url(${track.image[1]['#text']})`
            },
            children: imageStyle !== 'default' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              className: "format"
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "track-info",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TrackLinkTag, {
          url: track.url,
          children: track.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "artist-name",
          children: track.artist['#text']
        })]
      })]
    }, track.url))]
  });
}

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./src/blocks/recently-played/view.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_lastfm_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api/lastfm-resolvers */ "./src/api/lastfm-resolvers.js");
/* harmony import */ var _components_tracks_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/tracks-list */ "./src/components/tracks-list.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



const tracksListContainer = document.querySelector('.wp-block-lastfm-blocks-lastfm-recently-played-block');
const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(tracksListContainer);
const tracksAttr = tracksListContainer.dataset;
const apiKey = tracksAttr.lastfmApikey;
const username = tracksAttr.lastfmUsername;
const numberOfTracks = tracksAttr.lastfmNumberoftracks;
const includeLinkToTrack = 'true' === tracksAttr.lastfmIncludelinktotrack;
const showTrackArtwork = 'true' === tracksAttr.lastfmShowtrackartwork;
const imageStyle = tracksAttr.lastfmImagestyle;
const textAlign = tracksAttr.lastfmTextalign;
(0,_api_lastfm_resolvers__WEBPACK_IMPORTED_MODULE_1__.fetchLastFmTracks)(apiKey, username, numberOfTracks).then(tracks => {
  root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_tracks_list__WEBPACK_IMPORTED_MODULE_2__.TracksList, {
    tracks: tracks,
    includeLinkToTrack: includeLinkToTrack,
    showTrackArtwork: showTrackArtwork,
    imageStyle: imageStyle,
    textAlign: textAlign
  }));
}).catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map