/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/me/route";
exports.ids = ["app/api/auth/me/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/me/route.ts":
/*!**********************************!*\
  !*** ./app/api/auth/me/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function GET(req) {\n    try {\n        // Get the session cookie\n        const sessionCookie = req.cookies.get('appSession');\n        if (!sessionCookie?.value) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                isAuthenticated: false\n            }, {\n                status: 401\n            });\n        }\n        // Parse the session data\n        let sessionData;\n        try {\n            sessionData = JSON.parse(sessionCookie.value);\n        } catch  {\n            // Backward compatibility for old format (just the ID token)\n            sessionData = {\n                idToken: sessionCookie.value\n            };\n        }\n        // Get the ID token\n        const idToken = sessionData.idToken;\n        if (!idToken) {\n            throw new Error('No ID token found in session');\n        }\n        // Simple decode of JWT without verification (for basic profile info)\n        // In production, you should verify the token signature\n        const tokenParts = idToken.split('.');\n        if (tokenParts.length !== 3) {\n            throw new Error('Invalid token format');\n        }\n        // Decode the payload\n        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());\n        // Check if this is a debug request\n        const url = new URL(req.url);\n        const debug = url.searchParams.get('debug') === 'true';\n        // Return user profile info and token info\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            isAuthenticated: true,\n            user: {\n                sub: payload.sub,\n                name: payload.name,\n                email: payload.email,\n                picture: payload.picture\n            },\n            tokens: {\n                // Always include access token (needed for API calls)\n                accessToken: sessionData.accessToken,\n                // Only include ID token in debug mode (for security)\n                ...debug ? {\n                    idToken: sessionData.idToken\n                } : {},\n                expiresAt: sessionData.expiresAt\n            }\n        });\n    } catch (error) {\n        console.error('Error getting user profile:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to get user profile',\n            message: error instanceof Error ? error.message : 'Unknown error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbWUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBd0Q7QUFFakQsZUFBZUMsSUFBSUMsR0FBZ0I7SUFDeEMsSUFBSTtRQUNGLHlCQUF5QjtRQUN6QixNQUFNQyxnQkFBZ0JELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO1FBRXRDLElBQUksQ0FBQ0YsZUFBZUcsT0FBTztZQUN6QixPQUFPTixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO2dCQUFFQyxpQkFBaUI7WUFBTSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDckU7UUFFQSx5QkFBeUI7UUFDekIsSUFBSUM7UUFDSixJQUFJO1lBQ0ZBLGNBQWNDLEtBQUtDLEtBQUssQ0FBQ1QsY0FBY0csS0FBSztRQUM5QyxFQUFFLE9BQU07WUFDTiw0REFBNEQ7WUFDNURJLGNBQWM7Z0JBQUVHLFNBQVNWLGNBQWNHLEtBQUs7WUFBQztRQUMvQztRQUVBLG1CQUFtQjtRQUNuQixNQUFNTyxVQUFVSCxZQUFZRyxPQUFPO1FBQ25DLElBQUksQ0FBQ0EsU0FBUztZQUNaLE1BQU0sSUFBSUMsTUFBTTtRQUNsQjtRQUVBLHFFQUFxRTtRQUNyRSx1REFBdUQ7UUFDdkQsTUFBTUMsYUFBYUYsUUFBUUcsS0FBSyxDQUFDO1FBQ2pDLElBQUlELFdBQVdFLE1BQU0sS0FBSyxHQUFHO1lBQzNCLE1BQU0sSUFBSUgsTUFBTTtRQUNsQjtRQUVBLHFCQUFxQjtRQUNyQixNQUFNSSxVQUFVUCxLQUFLQyxLQUFLLENBQUNPLE9BQU9DLElBQUksQ0FBQ0wsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVTSxRQUFRO1FBRXhFLG1DQUFtQztRQUNuQyxNQUFNQyxNQUFNLElBQUlDLElBQUlyQixJQUFJb0IsR0FBRztRQUMzQixNQUFNRSxRQUFRRixJQUFJRyxZQUFZLENBQUNwQixHQUFHLENBQUMsYUFBYTtRQUVoRCwwQ0FBMEM7UUFDMUMsT0FBT0wscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUN2QkMsaUJBQWlCO1lBQ2pCa0IsTUFBTTtnQkFDSkMsS0FBS1QsUUFBUVMsR0FBRztnQkFDaEJDLE1BQU1WLFFBQVFVLElBQUk7Z0JBQ2xCQyxPQUFPWCxRQUFRVyxLQUFLO2dCQUNwQkMsU0FBU1osUUFBUVksT0FBTztZQUMxQjtZQUNBQyxRQUFRO2dCQUNOLHFEQUFxRDtnQkFDckRDLGFBQWF0QixZQUFZc0IsV0FBVztnQkFDcEMscURBQXFEO2dCQUNyRCxHQUFJUixRQUFRO29CQUNWWCxTQUFTSCxZQUFZRyxPQUFPO2dCQUM5QixJQUFJLENBQUMsQ0FBQztnQkFDTm9CLFdBQVd2QixZQUFZdUIsU0FBUztZQUNsQztRQUNGO0lBQ0YsRUFBRSxPQUFPQyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQywrQkFBK0JBO1FBQzdDLE9BQU9sQyxxREFBWUEsQ0FBQ08sSUFBSSxDQUN0QjtZQUFFMkIsT0FBTztZQUE4QkUsU0FBU0YsaUJBQWlCcEIsUUFBUW9CLE1BQU1FLE9BQU8sR0FBRztRQUFnQixHQUN6RztZQUFFM0IsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZGxvd2UvRGV2ZWxvcG1lbnQvV2FubmFib29rRmluYW5jZS9hcHAvYXBpL2F1dGgvbWUvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gR2V0IHRoZSBzZXNzaW9uIGNvb2tpZVxuICAgIGNvbnN0IHNlc3Npb25Db29raWUgPSByZXEuY29va2llcy5nZXQoJ2FwcFNlc3Npb24nKTtcbiAgICBcbiAgICBpZiAoIXNlc3Npb25Db29raWU/LnZhbHVlKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIFBhcnNlIHRoZSBzZXNzaW9uIGRhdGFcbiAgICBsZXQgc2Vzc2lvbkRhdGE7XG4gICAgdHJ5IHtcbiAgICAgIHNlc3Npb25EYXRhID0gSlNPTi5wYXJzZShzZXNzaW9uQ29va2llLnZhbHVlKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEJhY2t3YXJkIGNvbXBhdGliaWxpdHkgZm9yIG9sZCBmb3JtYXQgKGp1c3QgdGhlIElEIHRva2VuKVxuICAgICAgc2Vzc2lvbkRhdGEgPSB7IGlkVG9rZW46IHNlc3Npb25Db29raWUudmFsdWUgfTtcbiAgICB9XG4gICAgXG4gICAgLy8gR2V0IHRoZSBJRCB0b2tlblxuICAgIGNvbnN0IGlkVG9rZW4gPSBzZXNzaW9uRGF0YS5pZFRva2VuO1xuICAgIGlmICghaWRUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBJRCB0b2tlbiBmb3VuZCBpbiBzZXNzaW9uJyk7XG4gICAgfVxuICAgIFxuICAgIC8vIFNpbXBsZSBkZWNvZGUgb2YgSldUIHdpdGhvdXQgdmVyaWZpY2F0aW9uIChmb3IgYmFzaWMgcHJvZmlsZSBpbmZvKVxuICAgIC8vIEluIHByb2R1Y3Rpb24sIHlvdSBzaG91bGQgdmVyaWZ5IHRoZSB0b2tlbiBzaWduYXR1cmVcbiAgICBjb25zdCB0b2tlblBhcnRzID0gaWRUb2tlbi5zcGxpdCgnLicpO1xuICAgIGlmICh0b2tlblBhcnRzLmxlbmd0aCAhPT0gMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRva2VuIGZvcm1hdCcpO1xuICAgIH1cbiAgICBcbiAgICAvLyBEZWNvZGUgdGhlIHBheWxvYWRcbiAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShCdWZmZXIuZnJvbSh0b2tlblBhcnRzWzFdLCAnYmFzZTY0JykudG9TdHJpbmcoKSk7XG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBpcyBhIGRlYnVnIHJlcXVlc3RcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcS51cmwpO1xuICAgIGNvbnN0IGRlYnVnID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2RlYnVnJykgPT09ICd0cnVlJztcbiAgICBcbiAgICAvLyBSZXR1cm4gdXNlciBwcm9maWxlIGluZm8gYW5kIHRva2VuIGluZm9cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgaXNBdXRoZW50aWNhdGVkOiB0cnVlLFxuICAgICAgdXNlcjoge1xuICAgICAgICBzdWI6IHBheWxvYWQuc3ViLFxuICAgICAgICBuYW1lOiBwYXlsb2FkLm5hbWUsXG4gICAgICAgIGVtYWlsOiBwYXlsb2FkLmVtYWlsLFxuICAgICAgICBwaWN0dXJlOiBwYXlsb2FkLnBpY3R1cmUsXG4gICAgICB9LFxuICAgICAgdG9rZW5zOiB7XG4gICAgICAgIC8vIEFsd2F5cyBpbmNsdWRlIGFjY2VzcyB0b2tlbiAobmVlZGVkIGZvciBBUEkgY2FsbHMpXG4gICAgICAgIGFjY2Vzc1Rva2VuOiBzZXNzaW9uRGF0YS5hY2Nlc3NUb2tlbixcbiAgICAgICAgLy8gT25seSBpbmNsdWRlIElEIHRva2VuIGluIGRlYnVnIG1vZGUgKGZvciBzZWN1cml0eSlcbiAgICAgICAgLi4uKGRlYnVnID8ge1xuICAgICAgICAgIGlkVG9rZW46IHNlc3Npb25EYXRhLmlkVG9rZW4sXG4gICAgICAgIH0gOiB7fSksXG4gICAgICAgIGV4cGlyZXNBdDogc2Vzc2lvbkRhdGEuZXhwaXJlc0F0LFxuICAgICAgfVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGdldHRpbmcgdXNlciBwcm9maWxlOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGdldCB1c2VyIHByb2ZpbGUnLCBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdVbmtub3duIGVycm9yJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiR0VUIiwicmVxIiwic2Vzc2lvbkNvb2tpZSIsImNvb2tpZXMiLCJnZXQiLCJ2YWx1ZSIsImpzb24iLCJpc0F1dGhlbnRpY2F0ZWQiLCJzdGF0dXMiLCJzZXNzaW9uRGF0YSIsIkpTT04iLCJwYXJzZSIsImlkVG9rZW4iLCJFcnJvciIsInRva2VuUGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBheWxvYWQiLCJCdWZmZXIiLCJmcm9tIiwidG9TdHJpbmciLCJ1cmwiLCJVUkwiLCJkZWJ1ZyIsInNlYXJjaFBhcmFtcyIsInVzZXIiLCJzdWIiLCJuYW1lIiwiZW1haWwiLCJwaWN0dXJlIiwidG9rZW5zIiwiYWNjZXNzVG9rZW4iLCJleHBpcmVzQXQiLCJlcnJvciIsImNvbnNvbGUiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/me/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_davidlowe_Development_WannabookFinance_app_api_auth_me_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/me/route.ts */ \"(rsc)/./app/api/auth/me/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/me/route\",\n        pathname: \"/api/auth/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/me/route\"\n    },\n    resolvedPagePath: \"/Users/davidlowe/Development/WannabookFinance/app/api/auth/me/route.ts\",\n    nextConfigOutput,\n    userland: _Users_davidlowe_Development_WannabookFinance_app_api_auth_me_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbWUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRhdmlkbG93ZSUyRkRldmVsb3BtZW50JTJGV2FubmFib29rRmluYW5jZSUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZkYXZpZGxvd2UlMkZEZXZlbG9wbWVudCUyRldhbm5hYm9va0ZpbmFuY2UmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3NCO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvZGF2aWRsb3dlL0RldmVsb3BtZW50L1dhbm5hYm9va0ZpbmFuY2UvYXBwL2FwaS9hdXRoL21lL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL21lL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9tZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9tZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9kYXZpZGxvd2UvRGV2ZWxvcG1lbnQvV2FubmFib29rRmluYW5jZS9hcHAvYXBpL2F1dGgvbWUvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();