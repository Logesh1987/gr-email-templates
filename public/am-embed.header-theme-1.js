(window["amEmbed_jsonp"] = window["amEmbed_jsonp"] || []).push([[4],{

/***/ "0a42":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("af98");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("ff6a782e", content, shadowRoot)
};

/***/ }),

/***/ "3a94":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"708cafc6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Snippets/Header/Theme1.vue?vue&type=template&id=34c7fcd4&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.attributes)?_c('div',{staticClass:"snippet"},[_c('div',{staticClass:"card-wrapper",style:({
      backgroundColor: _vm.attributes.bg_color,
    })},[_c('div',{staticClass:"box left"},[_c('figure',{staticClass:"bannerImg",style:({
          backgroundImage: 'url(' + _vm.attributes.header_image + ')',
        })})]),_c('div',{staticClass:"box right"},[_c('h3',{staticClass:"titleHeader",domProps:{"innerHTML":_vm._s(_vm.attributes.title)}}),_c('p',{staticClass:"description",domProps:{"innerHTML":_vm._s(_vm.attributes.description)}}),_c('button',{staticClass:"joinNow",style:({
          color: _vm.attributes.btn_txt_color,
          backgroundColor: _vm.attributes.btn_color,
        }),domProps:{"innerHTML":_vm._s(_vm.attributes.btn_text)}})])])]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Snippets/Header/Theme1.vue?vue&type=template&id=34c7fcd4&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Snippets/Header/Theme1.vue?vue&type=script&lang=js&
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
      attributes: null
    };
  },
  methods: {},

  mounted() {
    this.attributes = this.$props.snippetData.attributes;
  },

  watch: {
    snippetData: function (value) {
      this.attributes = value.attributes;
    },
    attributes: function (value) {
      console.log(value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Snippets/Header/Theme1.vue?vue&type=script&lang=js&
 /* harmony default export */ var Header_Theme1vue_type_script_lang_js_ = (Theme1vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Snippets/Header/Theme1.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("49cf")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Header_Theme1vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "34c7fcd4",
  null
  ,true
)

/* harmony default export */ var Theme1 = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "49cf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_34c7fcd4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0a42");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_34c7fcd4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_34c7fcd4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_34c7fcd4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_3_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Theme1_vue_vue_type_style_index_0_id_34c7fcd4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "63f8":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/Vector_Smart_Object_Right.f1a28270.png";

/***/ }),

/***/ "8f87":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/Vector_Smart_Object_Left.68d37c13.png";

/***/ }),

/***/ "af98":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__("1de5");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__("8f87");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__("63f8");
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
// Module
exports.push([module.i, ".snippet[data-v-34c7fcd4]{height:400px;width:100%;color:#fff}.snippet .card-wrapper[data-v-34c7fcd4]{align-items:center;width:100%}.snippet .box[data-v-34c7fcd4],.snippet .card-wrapper[data-v-34c7fcd4]{justify-content:center;height:100%;position:relative;box-sizing:border-box;display:flex}.snippet .box[data-v-34c7fcd4]{width:50%;flex-direction:column;align-items:flex-start;font-family:Poppins,sans-serif}.snippet .box.left[data-v-34c7fcd4]{position:relative}.snippet .box.left figure[data-v-34c7fcd4]{background-size:100% 100%}.snippet .box.left[data-v-34c7fcd4]:before{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");background-position:-45% 80%;background-repeat:no-repeat;width:100%;height:100%;position:absolute;top:0;left:0}.snippet .box.right[data-v-34c7fcd4]{padding-left:10%}.snippet .box.right[data-v-34c7fcd4]:after{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");background-position:105% 102%;background-repeat:no-repeat;width:100%;height:100%;position:absolute;top:0;left:0}.snippet .box .bannerImg[data-v-34c7fcd4]{width:100%;height:100%}.snippet .box .titleHeader[data-v-34c7fcd4]{font-size:36px;font-weight:bolder;letter-spacing:2px;margin:20px 0}.snippet .box .description[data-v-34c7fcd4]{font-size:16px;margin:10px 0;width:70%}.snippet .box .joinNow[data-v-34c7fcd4]{padding:20px;border-radius:5px;height:60px;line-height:60px;font-size:18px;display:flex;justify-content:center;align-items:center;font-weight:700;margin:10px 0;min-width:186px;border:none;cursor:pointer;box-sizing:border-box}@media screen and (max-width:1200px){.snippet .box.left[data-v-34c7fcd4]{display:none}.snippet .box.right[data-v-34c7fcd4]{padding:0;position:relative;width:90%}}", ""]);
// Exports
module.exports = exports;


/***/ })

}]);