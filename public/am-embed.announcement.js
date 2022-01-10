(window["amEmbed_jsonp"] = window["amEmbed_jsonp"] || []).push([[1],{

/***/ "807a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"708cafc6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Announcement.vue?vue&type=template&id=8e9435da&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"snippetThemeWrapper"},[(_vm.currentId == 1)?_c('ThemeOne',{attrs:{"snippetData":_vm.snippetObj}}):_vm._e(),(_vm.currentId == 2)?_c('ThemeTwo',{attrs:{"snippetData":_vm.snippetObj}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Announcement.vue?vue&type=template&id=8e9435da&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Announcement.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
const ThemeOne = () => __webpack_require__.e(/* import() | announcement-theme-1 */ 2).then(__webpack_require__.bind(null, "495b"));

const ThemeTwo = () => __webpack_require__.e(/* import() | announcement-theme-1 */ 2).then(__webpack_require__.bind(null, "bb43"));

/* harmony default export */ var Announcementvue_type_script_lang_js_ = ({
  name: "announcement",
  props: ["snippetData", "themeId"],
  components: {
    ThemeOne,
    ThemeTwo
  },
  data: () => {
    return {
      snippetObj: {},
      currentId: -1
    };
  },
  methods: {},

  mounted() {
    this.snippetObj = this.$props.snippetData;
    this.currentId = this.$props.themeId;
  },

  watch: {
    snippetData: function (value) {
      this.snippetObj = value;
    },
    themeId: function (value) {
      this.currentId = value;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Announcement.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Announcementvue_type_script_lang_js_ = (Announcementvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Announcement.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("cc9d")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Announcementvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "8e9435da",
  null
  ,true
)

/* harmony default export */ var Announcement = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "ca1d":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("cb4c");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("63715d8e", content, shadowRoot)
};

/***/ }),

/***/ "cb4c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__("f78b");
var ___CSS_LOADER_AT_RULE_IMPORT_1___ = __webpack_require__("2c39");
var ___CSS_LOADER_AT_RULE_IMPORT_2___ = __webpack_require__("54e0");
var ___CSS_LOADER_AT_RULE_IMPORT_3___ = __webpack_require__("e3fa");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_1___);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_2___);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_3___);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "cc9d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Announcement_vue_vue_type_style_index_0_id_8e9435da_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ca1d");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Announcement_vue_vue_type_style_index_0_id_8e9435da_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Announcement_vue_vue_type_style_index_0_id_8e9435da_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Announcement_vue_vue_type_style_index_0_id_8e9435da_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Announcement_vue_vue_type_style_index_0_id_8e9435da_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

}]);