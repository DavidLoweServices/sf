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
exports.id = "app/api/auth/[...auth0]/route";
exports.ids = ["app/api/auth/[...auth0]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...auth0]/route.ts":
/*!******************************************!*\
  !*** ./app/api/auth/[...auth0]/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth0/nextjs-auth0 */ \"(rsc)/./node_modules/@auth0/nextjs-auth0/dist/index.js\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n// Modified to work with NextJS App Router and Auth0\nasync function GET(req) {\n    try {\n        // Create the Auth0 handler\n        const auth0Handler = (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__.handleAuth)();\n        // Extract the auth0 param from the URL path\n        const url = new URL(req.url);\n        const pathname = url.pathname;\n        const param = pathname.replace('/api/auth/', '');\n        // Match the route to the appropriate Auth0 handler\n        if (param === 'login') {\n            const loginUrl = `${url.origin}/api/auth/callback`;\n            const returnTo = url.searchParams.get('returnTo') || '/dashboard';\n            // Redirect to Auth0 login with API audience\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.redirect(`${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` + `response_type=code&` + `client_id=${process.env.AUTH0_CLIENT_ID}&` + `redirect_uri=${encodeURIComponent(loginUrl)}&` + `scope=openid profile email&` + `audience=${encodeURIComponent('https://bmx/api')}&` + `state=${encodeURIComponent(JSON.stringify({\n                returnTo\n            }))}`);\n        } else if (param === 'callback') {\n            // For the callback, we'll use the Auth0 SDK directly\n            try {\n                return auth0Handler(req);\n            } catch (error) {\n                console.error('Auth0 callback error:', error);\n                return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.redirect(new URL('/api/auth-debug?error=callback_error', req.url));\n            }\n        } else if (param === 'logout') {\n            // Handle logout\n            const returnTo = url.searchParams.get('returnTo') || '/';\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.redirect(`${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` + `client_id=${process.env.AUTH0_CLIENT_ID}&` + `returnTo=${encodeURIComponent(`${url.origin}${returnTo}`)}`);\n        }\n        // Default to letting Auth0 handle it\n        return auth0Handler(req);\n    } catch (error) {\n        console.error('Auth0 route error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Internal Server Error',\n            message: error instanceof Error ? error.message : 'Unknown error'\n        }, {\n            status: 500\n        });\n    }\n}\n// Also handle POST requests\nasync function POST(req) {\n    // Just use the GET handler for simplicity\n    return GET(req);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLmF1dGgwXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpRDtBQUNPO0FBRXhELG9EQUFvRDtBQUM3QyxlQUFlRSxJQUFJQyxHQUFnQjtJQUN4QyxJQUFJO1FBQ0YsMkJBQTJCO1FBQzNCLE1BQU1DLGVBQWVKLCtEQUFVQTtRQUUvQiw0Q0FBNEM7UUFDNUMsTUFBTUssTUFBTSxJQUFJQyxJQUFJSCxJQUFJRSxHQUFHO1FBQzNCLE1BQU1FLFdBQVdGLElBQUlFLFFBQVE7UUFDN0IsTUFBTUMsUUFBUUQsU0FBU0UsT0FBTyxDQUFDLGNBQWM7UUFFN0MsbURBQW1EO1FBQ25ELElBQUlELFVBQVUsU0FBUztZQUNyQixNQUFNRSxXQUFXLEdBQUdMLElBQUlNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztZQUNsRCxNQUFNQyxXQUFXUCxJQUFJUSxZQUFZLENBQUNDLEdBQUcsQ0FBQyxlQUFlO1lBRXJELDRDQUE0QztZQUM1QyxPQUFPYixxREFBWUEsQ0FBQ2MsUUFBUSxDQUMxQixHQUFHQyxRQUFRQyxHQUFHLENBQUNDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxHQUNqRCxDQUFDLG1CQUFtQixDQUFDLEdBQ3JCLENBQUMsVUFBVSxFQUFFRixRQUFRQyxHQUFHLENBQUNFLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FDM0MsQ0FBQyxhQUFhLEVBQUVDLG1CQUFtQlYsVUFBVSxDQUFDLENBQUMsR0FDL0MsQ0FBQywyQkFBMkIsQ0FBQyxHQUM3QixDQUFDLFNBQVMsRUFBRVUsbUJBQW1CLG1CQUFtQixDQUFDLENBQUMsR0FDcEQsQ0FBQyxNQUFNLEVBQUVBLG1CQUFtQkMsS0FBS0MsU0FBUyxDQUFDO2dCQUFFVjtZQUFTLEtBQUs7UUFFL0QsT0FDSyxJQUFJSixVQUFVLFlBQVk7WUFDN0IscURBQXFEO1lBQ3JELElBQUk7Z0JBQ0YsT0FBT0osYUFBYUQ7WUFDdEIsRUFBRSxPQUFPb0IsT0FBTztnQkFDZEMsUUFBUUQsS0FBSyxDQUFDLHlCQUF5QkE7Z0JBQ3ZDLE9BQU90QixxREFBWUEsQ0FBQ2MsUUFBUSxDQUFDLElBQUlULElBQUksd0NBQXdDSCxJQUFJRSxHQUFHO1lBQ3RGO1FBQ0YsT0FDSyxJQUFJRyxVQUFVLFVBQVU7WUFDM0IsZ0JBQWdCO1lBQ2hCLE1BQU1JLFdBQVdQLElBQUlRLFlBQVksQ0FBQ0MsR0FBRyxDQUFDLGVBQWU7WUFDckQsT0FBT2IscURBQVlBLENBQUNjLFFBQVEsQ0FDMUIsR0FBR0MsUUFBUUMsR0FBRyxDQUFDQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsR0FDakQsQ0FBQyxVQUFVLEVBQUVGLFFBQVFDLEdBQUcsQ0FBQ0UsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUMzQyxDQUFDLFNBQVMsRUFBRUMsbUJBQW1CLEdBQUdmLElBQUlNLE1BQU0sR0FBR0MsVUFBVSxHQUFHO1FBRWhFO1FBRUEscUNBQXFDO1FBQ3JDLE9BQU9SLGFBQWFEO0lBQ3RCLEVBQUUsT0FBT29CLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHNCQUFzQkE7UUFDcEMsT0FBT3RCLHFEQUFZQSxDQUFDd0IsSUFBSSxDQUN0QjtZQUFFRixPQUFPO1lBQXlCRyxTQUFTSCxpQkFBaUJJLFFBQVFKLE1BQU1HLE9BQU8sR0FBRztRQUFnQixHQUNwRztZQUFFRSxRQUFRO1FBQUk7SUFFbEI7QUFDRjtBQUVBLDRCQUE0QjtBQUNyQixlQUFlQyxLQUFLMUIsR0FBZ0I7SUFDekMsMENBQTBDO0lBQzFDLE9BQU9ELElBQUlDO0FBQ2IiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZGxvd2UvRGV2ZWxvcG1lbnQvV2FubmFib29rRmluYW5jZS9hcHAvYXBpL2F1dGgvWy4uLmF1dGgwXS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVBdXRoIH0gZnJvbSAnQGF1dGgwL25leHRqcy1hdXRoMCc7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuXG4vLyBNb2RpZmllZCB0byB3b3JrIHdpdGggTmV4dEpTIEFwcCBSb3V0ZXIgYW5kIEF1dGgwXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICAvLyBDcmVhdGUgdGhlIEF1dGgwIGhhbmRsZXJcbiAgICBjb25zdCBhdXRoMEhhbmRsZXIgPSBoYW5kbGVBdXRoKCk7XG4gICAgXG4gICAgLy8gRXh0cmFjdCB0aGUgYXV0aDAgcGFyYW0gZnJvbSB0aGUgVVJMIHBhdGhcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcS51cmwpO1xuICAgIGNvbnN0IHBhdGhuYW1lID0gdXJsLnBhdGhuYW1lO1xuICAgIGNvbnN0IHBhcmFtID0gcGF0aG5hbWUucmVwbGFjZSgnL2FwaS9hdXRoLycsICcnKTtcbiAgICBcbiAgICAvLyBNYXRjaCB0aGUgcm91dGUgdG8gdGhlIGFwcHJvcHJpYXRlIEF1dGgwIGhhbmRsZXJcbiAgICBpZiAocGFyYW0gPT09ICdsb2dpbicpIHtcbiAgICAgIGNvbnN0IGxvZ2luVXJsID0gYCR7dXJsLm9yaWdpbn0vYXBpL2F1dGgvY2FsbGJhY2tgO1xuICAgICAgY29uc3QgcmV0dXJuVG8gPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgncmV0dXJuVG8nKSB8fCAnL2Rhc2hib2FyZCc7XG4gICAgICBcbiAgICAgIC8vIFJlZGlyZWN0IHRvIEF1dGgwIGxvZ2luIHdpdGggQVBJIGF1ZGllbmNlXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KFxuICAgICAgICBgJHtwcm9jZXNzLmVudi5BVVRIMF9JU1NVRVJfQkFTRV9VUkx9L2F1dGhvcml6ZT9gICtcbiAgICAgICAgYHJlc3BvbnNlX3R5cGU9Y29kZSZgICtcbiAgICAgICAgYGNsaWVudF9pZD0ke3Byb2Nlc3MuZW52LkFVVEgwX0NMSUVOVF9JRH0mYCArXG4gICAgICAgIGByZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQobG9naW5VcmwpfSZgICtcbiAgICAgICAgYHNjb3BlPW9wZW5pZCBwcm9maWxlIGVtYWlsJmAgK1xuICAgICAgICBgYXVkaWVuY2U9JHtlbmNvZGVVUklDb21wb25lbnQoJ2h0dHBzOi8vYm14L2FwaScpfSZgICtcbiAgICAgICAgYHN0YXRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHsgcmV0dXJuVG8gfSkpfWBcbiAgICAgICk7XG4gICAgfSBcbiAgICBlbHNlIGlmIChwYXJhbSA9PT0gJ2NhbGxiYWNrJykge1xuICAgICAgLy8gRm9yIHRoZSBjYWxsYmFjaywgd2UnbGwgdXNlIHRoZSBBdXRoMCBTREsgZGlyZWN0bHlcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhdXRoMEhhbmRsZXIocmVxKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1dGgwIGNhbGxiYWNrIGVycm9yOicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvYXBpL2F1dGgtZGVidWc/ZXJyb3I9Y2FsbGJhY2tfZXJyb3InLCByZXEudXJsKSk7XG4gICAgICB9XG4gICAgfSBcbiAgICBlbHNlIGlmIChwYXJhbSA9PT0gJ2xvZ291dCcpIHtcbiAgICAgIC8vIEhhbmRsZSBsb2dvdXRcbiAgICAgIGNvbnN0IHJldHVyblRvID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3JldHVyblRvJykgfHwgJy8nO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChcbiAgICAgICAgYCR7cHJvY2Vzcy5lbnYuQVVUSDBfSVNTVUVSX0JBU0VfVVJMfS92Mi9sb2dvdXQ/YCArXG4gICAgICAgIGBjbGllbnRfaWQ9JHtwcm9jZXNzLmVudi5BVVRIMF9DTElFTlRfSUR9JmAgK1xuICAgICAgICBgcmV0dXJuVG89JHtlbmNvZGVVUklDb21wb25lbnQoYCR7dXJsLm9yaWdpbn0ke3JldHVyblRvfWApfWBcbiAgICAgICk7XG4gICAgfSBcbiAgICBcbiAgICAvLyBEZWZhdWx0IHRvIGxldHRpbmcgQXV0aDAgaGFuZGxlIGl0XG4gICAgcmV0dXJuIGF1dGgwSGFuZGxlcihyZXEpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0F1dGgwIHJvdXRlIGVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnVW5rbm93biBlcnJvcicgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuLy8gQWxzbyBoYW5kbGUgUE9TVCByZXF1ZXN0c1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICAvLyBKdXN0IHVzZSB0aGUgR0VUIGhhbmRsZXIgZm9yIHNpbXBsaWNpdHlcbiAgcmV0dXJuIEdFVChyZXEpO1xufSJdLCJuYW1lcyI6WyJoYW5kbGVBdXRoIiwiTmV4dFJlc3BvbnNlIiwiR0VUIiwicmVxIiwiYXV0aDBIYW5kbGVyIiwidXJsIiwiVVJMIiwicGF0aG5hbWUiLCJwYXJhbSIsInJlcGxhY2UiLCJsb2dpblVybCIsIm9yaWdpbiIsInJldHVyblRvIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwicmVkaXJlY3QiLCJwcm9jZXNzIiwiZW52IiwiQVVUSDBfSVNTVUVSX0JBU0VfVVJMIiwiQVVUSDBfQ0xJRU5UX0lEIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yIiwiY29uc29sZSIsImpzb24iLCJtZXNzYWdlIiwiRXJyb3IiLCJzdGF0dXMiLCJQT1NUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...auth0]/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute.ts&appDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute.ts&appDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_davidlowe_Development_WannabookFinance_app_api_auth_auth0_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...auth0]/route.ts */ \"(rsc)/./app/api/auth/[...auth0]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...auth0]/route\",\n        pathname: \"/api/auth/[...auth0]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...auth0]/route\"\n    },\n    resolvedPagePath: \"/Users/davidlowe/Development/WannabookFinance/app/api/auth/[...auth0]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_davidlowe_Development_WannabookFinance_app_api_auth_auth0_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4uYXV0aDAlNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5hdXRoMCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5hdXRoMCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRhdmlkbG93ZSUyRkRldmVsb3BtZW50JTJGV2FubmFib29rRmluYW5jZSUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZkYXZpZGxvd2UlMkZEZXZlbG9wbWVudCUyRldhbm5hYm9va0ZpbmFuY2UmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzhCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvZGF2aWRsb3dlL0RldmVsb3BtZW50L1dhbm5hYm9va0ZpbmFuY2UvYXBwL2FwaS9hdXRoL1suLi5hdXRoMF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLmF1dGgwXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLmF1dGgwXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4uYXV0aDBdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2RhdmlkbG93ZS9EZXZlbG9wbWVudC9XYW5uYWJvb2tGaW5hbmNlL2FwcC9hcGkvYXV0aC9bLi4uYXV0aDBdL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute.ts&appDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

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

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@auth0","vendor-chunks/jose","vendor-chunks/joi","vendor-chunks/openid-client","vendor-chunks/@hapi","vendor-chunks/@sideway","vendor-chunks/debug","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/oidc-token-hash","vendor-chunks/tslib","vendor-chunks/url-join","vendor-chunks/supports-color","vendor-chunks/object-hash","vendor-chunks/ms","vendor-chunks/lru-cache","vendor-chunks/has-flag","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...auth0%5D%2Froute.ts&appDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdavidlowe%2FDevelopment%2FWannabookFinance&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();