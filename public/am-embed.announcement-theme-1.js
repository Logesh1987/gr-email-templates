(window["amEmbed_jsonp"] = window["amEmbed_jsonp"] || []).push([[2],{

/***/ "495b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"708cafc6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Snippets/Announcement/Theme1.vue?vue&type=template&id=2c923e89&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.attributes)?_c('div',{staticClass:"snippet",class:_vm.infoHidden ? 'hide' : '',style:(_vm.styleObj)},[_c('p',{staticClass:"announcementTitle",domProps:{"innerHTML":_vm._s(_vm.attributes.title)}}),_c('span',{staticClass:"closeIcon material-icons",on:{"click":function($event){_vm.infoHidden = true}}},[_vm._v("close")])]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Snippets/Announcement/Theme1.vue?vue&type=template&id=2c923e89&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Snippets/Announcement/Theme1.vue?vue&type=script&lang=js&
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
//
//
/* harmony default export */ var Theme1vue_type_script_lang_js_ = ({
  name: "ThemeOne",
  props: ["snippetData"],
  data: () => {
    return {
      attributes: {},
      styleObj: {},
      infoHidden: false
    };
  },
  methods: {
    applyStyles() {
      this.styleObj["color"] = this.attributes.font_color;
      this.styleObj["backgroundColor"] = this.attributes.bg_color;
    }

  },

  mounted() {
    this.attributes = this.$props.snippetData.attributes;
    this.applyStyles();
  },

  computed: {},
  watch: {
    snippetData: function (value) {
      this.attributes = value.attributes;
    },
    attributes: function (value) {
      console.log(value);
      this.applyStyles();
    }
  }
});
// CONCATENATED MODULE: ./src/components/Snippets/Announcement/Theme1.vue?vue&type=script&lang=js&
 /* harmony default export */ var Announcement_Theme1vue_type_script_lang_js_ = (Theme1vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Snippets/Announcement/Theme1.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("986d")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Announcement_Theme1vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "2c923e89",
  null
  ,true
)

/* harmony default export */ var Theme1 = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8ada":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".snippet[data-v-2c923e89]{position:relative}.snippet.hide[data-v-2c923e89]{display:none}p.announcementTitle[data-v-2c923e89]{min-height:30px;display:flex;justify-content:center;align-items:center;box-sizing:border-box;padding:10px 30px;font-family:poppins,sans-serif}.closeIcon[data-v-2c923e89]{position:absolute;right:5px;padding:5px;box-sizing:border-box;color:#000;top:0;font-size:20px;cursor:pointer}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "986d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_2c923e89_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d234");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_2c923e89_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_2c923e89_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_2c923e89_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_2c923e89_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "99c6":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d270");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("9535be1e", content, shadowRoot)
};

/***/ }),

/***/ "bb43":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"708cafc6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Snippets/Announcement/Theme2.vue?vue&type=template&id=010d7fec&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.attributes)?_c('div',{staticClass:"snippet",class:_vm.infoHidden ? 'hide' : '',style:(_vm.styleObj)},[_c('p',{staticClass:"announcementTitle",domProps:{"innerHTML":_vm._s(_vm.attributes.title)}}),_c('span',{staticClass:"closeIcon material-icons",on:{"click":function($event){_vm.infoHidden = true}}},[_vm._v("close")])]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Snippets/Announcement/Theme2.vue?vue&type=template&id=010d7fec&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Snippets/Announcement/Theme2.vue?vue&type=script&lang=js&
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
//
//
/* harmony default export */ var Theme2vue_type_script_lang_js_ = ({
  name: "ThemeOne",
  props: ["snippetData"],
  data: () => {
    return {
      attributes: {},
      styleObj: {},
      infoHidden: false
    };
  },
  methods: {
    applyStyles() {
      this.styleObj["color"] = this.attributes.font_color;
      this.styleObj["backgroundColor"] = this.attributes.bg_color;
    }

  },

  mounted() {
    this.attributes = this.$props.snippetData.attributes;
    this.applyStyles();
  },

  computed: {},
  watch: {
    snippetData: function (value) {
      this.attributes = value.attributes;
    },
    attributes: function (value) {
      console.log(value);
      this.applyStyles();
    }
  }
});
// CONCATENATED MODULE: ./src/components/Snippets/Announcement/Theme2.vue?vue&type=script&lang=js&
 /* harmony default export */ var Announcement_Theme2vue_type_script_lang_js_ = (Theme2vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Snippets/Announcement/Theme2.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("cd99")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Announcement_Theme2vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "010d7fec",
  null
  ,true
)

/* harmony default export */ var Theme2 = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "cd99":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme2_vue_vue_type_style_index_0_id_010d7fec_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("99c6");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme2_vue_vue_type_style_index_0_id_010d7fec_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme2_vue_vue_type_style_index_0_id_010d7fec_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme2_vue_vue_type_style_index_0_id_010d7fec_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme2_vue_vue_type_style_index_0_id_010d7fec_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "d234":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8ada");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("1e53a058", content, shadowRoot)
};

/***/ }),

/***/ "d270":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".snippet[data-v-010d7fec]{position:relative}.snippet.hide[data-v-010d7fec]{display:none}p.announcementTitle[data-v-010d7fec]{min-height:30px;display:flex;justify-content:center;align-items:center;box-sizing:border-box;padding:10px 30px;font-family:poppins,sans-serif}.closeIcon[data-v-010d7fec]{position:absolute;right:5px;padding:5px;box-sizing:border-box;color:#000;top:0;font-size:20px;cursor:pointer}", ""]);
// Exports
module.exports = exports;


/***/ })

}]);