import {
  zindexutils
} from "./chunk-NMOYQVAO.js";
import {
  Button
} from "./chunk-UJFCCJ5B.js";
import "./chunk-STA2ZUYP.js";
import "./chunk-5YORSMMS.js";
import "./chunk-5G7WYC4N.js";
import {
  TimesIcon
} from "./chunk-PRIE2AJH.js";
import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import "./chunk-O4QYUEGA.js";
import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation
} from "./chunk-SZJPLAKF.js";
import "./chunk-FXJ6C54V.js";
import {
  BaseStyle
} from "./chunk-UO5IQQ7M.js";
import {
  PrimeTemplate,
  SharedModule,
  addClass,
  appendChild,
  blockBodyScroll,
  setAttribute,
  unblockBodyScroll
} from "./chunk-GNCTJO57.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgTemplateOutlet
} from "./chunk-UCCE5RQP.js";
import "./chunk-B5QHEHR4.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction6,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-RFZ2BTTM.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-drawer.mjs
var _c0 = ["header"];
var _c1 = ["footer"];
var _c2 = ["content"];
var _c3 = ["closeicon"];
var _c4 = ["headless"];
var _c5 = ["maskRef"];
var _c6 = ["container"];
var _c7 = ["closeButton"];
var _c8 = ["*"];
var _c9 = (a0, a1, a2, a3, a4, a5) => ({
  "p-drawer": true,
  "p-drawer-active": a0,
  "p-drawer-left": a1,
  "p-drawer-right": a2,
  "p-drawer-top": a3,
  "p-drawer-bottom": a4,
  "p-drawer-full": a5
});
var _c10 = (a0, a1) => ({
  transform: a0,
  transition: a1
});
var _c11 = (a0) => ({
  value: "visible",
  params: a0
});
function Drawer_div_0_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Drawer_div_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Drawer_div_0_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headlessTemplate || ctx_r1._headlessTemplate);
  }
}
function Drawer_div_0_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Drawer_div_0_Conditional_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("title"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.header);
  }
}
function Drawer_div_0_Conditional_3_p_button_3_ng_template_1_TimesIcon_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "TimesIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "closeicon");
  }
}
function Drawer_div_0_Conditional_3_p_button_3_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function Drawer_div_0_Conditional_3_p_button_3_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Drawer_div_0_Conditional_3_p_button_3_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Drawer_div_0_Conditional_3_p_button_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Drawer_div_0_Conditional_3_p_button_3_ng_template_1_TimesIcon_0_Template, 1, 1, "TimesIcon", 8)(1, Drawer_div_0_Conditional_3_p_button_3_ng_template_1_1_Template, 1, 0, null, 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngIf", !ctx_r1.closeIconTemplate && !ctx_r1._closeIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.closeIconTemplate || ctx_r1._closeIconTemplate);
  }
}
function Drawer_div_0_Conditional_3_p_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 9);
    ɵɵlistener("onClick", function Drawer_div_0_Conditional_3_p_button_3_Template_p_button_onClick_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.close($event));
    })("keydown.enter", function Drawer_div_0_Conditional_3_p_button_3_Template_p_button_keydown_enter_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.close($event));
    });
    ɵɵtemplate(1, Drawer_div_0_Conditional_3_p_button_3_ng_template_1_Template, 2, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r1.cx("closeButton"))("buttonProps", ctx_r1.closeButtonProps)("ariaLabel", ctx_r1.ariaCloseLabel);
    ɵɵattribute("data-pc-section", "closebutton")("data-pc-group-section", "iconcontainer");
  }
}
function Drawer_div_0_Conditional_3_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Drawer_div_0_Conditional_3_ng_container_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Drawer_div_0_Conditional_3_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 5);
    ɵɵtemplate(2, Drawer_div_0_Conditional_3_ng_container_7_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngClass", ctx_r1.cx("footer"));
    ɵɵattribute("data-pc-section", "footer");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.footerTemplate || ctx_r1._footerTemplate);
  }
}
function Drawer_div_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵtemplate(1, Drawer_div_0_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 4)(2, Drawer_div_0_Conditional_3_div_2_Template, 2, 3, "div", 6)(3, Drawer_div_0_Conditional_3_p_button_3_Template, 3, 5, "p-button", 7);
    ɵɵelementEnd();
    ɵɵelementStart(4, "div", 5);
    ɵɵprojection(5);
    ɵɵtemplate(6, Drawer_div_0_Conditional_3_ng_container_6_Template, 1, 0, "ng-container", 4);
    ɵɵelementEnd();
    ɵɵtemplate(7, Drawer_div_0_Conditional_3_ng_container_7_Template, 3, 3, "ng-container", 8);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ctx_r1.cx("header"));
    ɵɵattribute("data-pc-section", "header");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.header);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showCloseIcon && ctx_r1.closable);
    ɵɵadvance();
    ɵɵproperty("ngClass", ctx_r1.cx("content"));
    ɵɵattribute("data-pc-section", "content");
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.contentTemplate || ctx_r1._contentTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.footerTemplate || ctx_r1._footerTemplate);
  }
}
function Drawer_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3, 0);
    ɵɵlistener("@panelState.start", function Drawer_div_0_Template_div_animation_panelState_start_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAnimationStart($event));
    })("@panelState.done", function Drawer_div_0_Template_div_animation_panelState_done_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAnimationEnd($event));
    })("keydown", function Drawer_div_0_Template_div_keydown_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onKeyDown($event));
    });
    ɵɵtemplate(2, Drawer_div_0_Conditional_2_Template, 1, 1, "ng-container")(3, Drawer_div_0_Conditional_3_Template, 8, 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r1.style);
    ɵɵclassMap(ctx_r1.styleClass);
    ɵɵproperty("ngClass", ɵɵpureFunction6(9, _c9, ctx_r1.visible, ctx_r1.position === "left" && !ctx_r1.fullScreen, ctx_r1.position === "right" && !ctx_r1.fullScreen, ctx_r1.position === "top" && !ctx_r1.fullScreen, ctx_r1.position === "bottom" && !ctx_r1.fullScreen, ctx_r1.fullScreen || ctx_r1.position === "full"))("@panelState", ɵɵpureFunction1(19, _c11, ɵɵpureFunction2(16, _c10, ctx_r1.transformOptions, ctx_r1.transitionOptions)));
    ɵɵattribute("data-pc-name", "sidebar")("data-pc-section", "root");
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.headlessTemplate || ctx_r1._headlessTemplate ? 2 : 3);
  }
}
var theme = ({
  dt
}) => `
.p-drawer {
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    transform: translate3d(0px, 0px, 0px);
    position: fixed;
    transition: transform 0.3s;
    background: ${dt("drawer.background")};
    color: ${dt("drawer.color")};
    border: 1px solid ${dt("drawer.border.color")};
    box-shadow: ${dt("drawer.shadow")};
}

.p-drawer-content {
    overflow-y: auto;
    flex-grow: 1;
    padding: ${dt("drawer.content.padding")};
}

.p-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: ${dt("drawer.header.padding")};
}

.p-drawer-footer {
    padding: ${dt("drawer.header.padding")};
}

.p-drawer-title {
    font-weight: ${dt("drawer.title.font.weight")};
    font-size: ${dt("drawer.title.font.size")};
}

.p-drawer-full .p-drawer {
    transition: none;
    transform: none;
    width: 100vw !important;
    height: 100vh !important;
    max-height: 100%;
    top: 0px !important;
    left: 0px !important;
    border-width: 1px;
}

.p-drawer-left .p-drawer {
    align-self: start;
    width: 20rem;
    height: 100%;
    border-right-width: 1px;
}

.p-drawer-right .p-drawer {
    align-self: end;
    width: 20rem;
    height: 100%;
    border-left-width: 1px;
}

.p-drawer-top .p-drawer {
    height: 10rem;
    width: 100%;
    border-bottom-width: 1px;
}

.p-drawer-bottom .p-drawer {
    height: 10rem;
    width: 100%;
    border-top-width: 1px;
}

.p-drawer-left .p-drawer-content,
.p-drawer-right .p-drawer-content,
.p-drawer-top .p-drawer-content,
.p-drawer-bottom .p-drawer-content {
    width: 100%;
    height: 100%;
}

.p-drawer-open {
    display: flex;
}

.p-drawer-top {
    justify-content: flex-start;
}

.p-drawer-bottom {
    justify-content: flex-end;
}

.p-drawer {
    position: fixed;
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
}

.p-drawer-content {
    position: relative;
    overflow-y: auto;
    flex-grow: 1;
}

.p-drawer-header {
    display: flex;
    align-items: center;
}

.p-drawer-footer {
    margin-top: auto;
}

.p-drawer-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
}

.p-drawer-full {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: none;
    transition: none;
}

.p-drawer-mask {
    background-color: rgba(0, 0, 0, 0.4);
    transition-duration: 0.2s;
}

.p-overlay-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask:dir(rtl) {
    flex-direction: row-reverse;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation 150ms forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation 150ms forwards;
}

@keyframes p-overlay-mask-enter-animation {
    from {
        background-color: transparent;
    }
    to {
        background-color: rgba(0, 0, 0, 0.4);
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background-color: rgba(0, 0, 0, 0.4);
    }
    to {
        background-color: transparent;
    }
}
`;
var inlineStyles = {
  mask: ({
    instance
  }) => ({
    position: "fixed",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: instance.position === "top" ? "flex-start" : instance.position === "bottom" ? "flex-end" : "center"
  })
};
var classes = {
  mask: ({
    instance
  }) => ({
    "p-drawer-mask": true,
    "p-overlay-mask p-overlay-mask-enter": instance.modal,
    "p-drawer-open": instance.containerVisible,
    "p-drawer-full": instance.fullScreen,
    [`p-drawer-${instance.position}`]: !!instance.position
  }),
  root: ({
    instance
  }) => ({
    "p-drawer p-component": true,
    "p-drawer-full": instance.fullScreen
  }),
  header: "p-drawer-header",
  title: "p-drawer-title",
  pcCloseButton: "p-drawer-close-button",
  content: "p-drawer-content",
  footer: "p-drawer-footer"
};
var DrawerStyle = class _DrawerStyle extends BaseStyle {
  name = "drawer";
  theme = theme;
  classes = classes;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDrawerStyle_BaseFactory;
    return function DrawerStyle_Factory(__ngFactoryType__) {
      return (ɵDrawerStyle_BaseFactory || (ɵDrawerStyle_BaseFactory = ɵɵgetInheritedFactory(_DrawerStyle)))(__ngFactoryType__ || _DrawerStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _DrawerStyle,
    factory: _DrawerStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DrawerStyle, [{
    type: Injectable
  }], null, null);
})();
var DrawerClasses;
(function(DrawerClasses2) {
  DrawerClasses2["mask"] = "p-drawer-mask";
  DrawerClasses2["root"] = "p-drawer";
  DrawerClasses2["header"] = "p-drawer-header";
  DrawerClasses2["title"] = "p-drawer-title";
  DrawerClasses2["pcCloseButton"] = "p-drawer-close-button";
  DrawerClasses2["content"] = "p-drawer-content";
})(DrawerClasses || (DrawerClasses = {}));
var showAnimation = animation([style({
  transform: "{{transform}}",
  opacity: 0
}), animate("{{transition}}")]);
var hideAnimation = animation([animate("{{transition}}", style({
  transform: "{{transform}}",
  opacity: 0
}))]);
var Drawer = class _Drawer extends BaseComponent {
  /**
   *  Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @group Props
   */
  appendTo = "body";
  /**
   * Whether to block scrolling of the document when drawer is active.
   * @group Props
   */
  blockScroll = false;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Aria label of the close icon.
   * @group Props
   */
  ariaCloseLabel;
  /**
   * Whether to automatically manage layering.
   * @group Props
   */
  autoZIndex = true;
  /**
   * Base zIndex value to use in layering.
   * @group Props
   */
  baseZIndex = 0;
  /**
   * Whether an overlay mask is displayed behind the drawer.
   * @group Props
   */
  modal = true;
  /**
   * Used to pass all properties of the ButtonProps to the Button component.
   * @group Props
   */
  closeButtonProps = {
    severity: "secondary",
    text: true,
    rounded: true
  };
  /**
   * Whether to dismiss drawer on click of the mask.
   * @group Props
   */
  dismissible = true;
  /**
   * Whether to display the close icon.
   * @group Props
   * @deprecated use 'closable' instead.
   */
  showCloseIcon = true;
  /**
   * Specifies if pressing escape key should hide the drawer.
   * @group Props
   */
  closeOnEscape = true;
  /**
   * Transition options of the animation.
   * @group Props
   */
  transitionOptions = "150ms cubic-bezier(0, 0, 0.2, 1)";
  /**
   * Specifies the visibility of the dialog.
   * @group Props
   */
  get visible() {
    return this._visible;
  }
  set visible(val) {
    this._visible = val;
  }
  /**
   * Specifies the position of the drawer, valid values are "left", "right", "bottom" and "top".
   * @group Props
   */
  get position() {
    return this._position;
  }
  set position(value) {
    this._position = value;
    if (value === "full") {
      this.transformOptions = "none";
      return;
    }
    switch (value) {
      case "left":
        this.transformOptions = "translate3d(-100%, 0px, 0px)";
        break;
      case "right":
        this.transformOptions = "translate3d(100%, 0px, 0px)";
        break;
      case "bottom":
        this.transformOptions = "translate3d(0px, 100%, 0px)";
        break;
      case "top":
        this.transformOptions = "translate3d(0px, -100%, 0px)";
        break;
    }
  }
  /**
   * Adds a close icon to the header to hide the dialog.
   * @group Props
   */
  get fullScreen() {
    return this._fullScreen;
  }
  set fullScreen(value) {
    this._fullScreen = value;
    if (value) this.transformOptions = "none";
  }
  /**
   * Title content of the dialog.
   * @group Props
   */
  header;
  /**
   * Style of the mask.
   * @group Props
   */
  maskStyle;
  /**
   * Whether to display close button.
   * @group Props
   * @defaultValue true
   */
  closable = true;
  /**
   * Callback to invoke when dialog is shown.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Callback to invoke when dialog is hidden.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * Callback to invoke when dialog visibility is changed.
   * @param {boolean} value - Visible value.
   * @group Emits
   */
  visibleChange = new EventEmitter();
  maskRef;
  containerViewChild;
  closeButtonViewChild;
  initialized;
  _visible;
  _position = "left";
  _fullScreen = false;
  container;
  transformOptions = "translate3d(-100%, 0px, 0px)";
  mask;
  maskClickListener;
  documentEscapeListener;
  animationEndListener;
  _componentStyle = inject(DrawerStyle);
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.initialized = true;
  }
  /**
   * Content template for the content of the drawer.
   * @group Templates
   */
  headerTemplate;
  /**
   * Header template for the header of the drawer.
   * @group Templates
   */
  footerTemplate;
  /**
   * Content template for the footer of the drawer.
   * @group Templates
   */
  contentTemplate;
  /**
   * Close icon template for the close icon of the drawer.
   * @group Templates
   */
  closeIconTemplate;
  /**
   * Headless template for the headless drawer.
   * @group Templates
   */
  headlessTemplate;
  _headerTemplate;
  _footerTemplate;
  _contentTemplate;
  _closeIconTemplate;
  _headlessTemplate;
  templates;
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
        case "header":
          this._headerTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "closeicon":
          this._closeIconTemplate = item.template;
          break;
        case "headless":
          this._headlessTemplate = item.template;
          break;
        default:
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  onKeyDown(event) {
    if (event.code === "Escape") {
      this.hide(false);
    }
  }
  show() {
    this.container.setAttribute(this.attrSelector, "");
    if (this.autoZIndex) {
      zindexutils.set("modal", this.container, this.baseZIndex || this.config.zIndex.modal);
    }
    if (this.modal) {
      this.enableModality();
    }
    this.onShow.emit({});
    this.visibleChange.emit(true);
  }
  hide(emit = true) {
    if (emit) {
      this.onHide.emit({});
    }
    if (this.modal) {
      this.disableModality();
    }
  }
  close(event) {
    this.hide();
    this.visibleChange.emit(false);
    event.preventDefault();
  }
  enableModality() {
    const activeDrawers = this.document.querySelectorAll(".p-drawer-active");
    const activeDrawersLength = activeDrawers.length;
    const zIndex = activeDrawersLength == 1 ? String(parseInt(this.container.style.zIndex) - 1) : String(parseInt(activeDrawers[activeDrawersLength - 1].style.zIndex) - 1);
    if (!this.mask) {
      this.mask = this.renderer.createElement("div");
      this.renderer.setStyle(this.mask, "zIndex", zIndex);
      setAttribute(this.mask, "style", this.maskStyle);
      addClass(this.mask, "p-overlay-mask p-drawer-mask p-overlay-mask-enter");
      if (this.dismissible) {
        this.maskClickListener = this.renderer.listen(this.mask, "click", (event) => {
          if (this.dismissible) {
            this.close(event);
          }
        });
      }
      this.renderer.appendChild(this.document.body, this.mask);
      if (this.blockScroll) {
        blockBodyScroll();
      }
    }
  }
  disableModality() {
    if (this.mask) {
      addClass(this.mask, "p-overlay-mask-leave");
      this.animationEndListener = this.renderer.listen(this.mask, "animationend", this.destroyModal.bind(this));
    }
  }
  destroyModal() {
    this.unbindMaskClickListener();
    if (this.mask) {
      this.renderer.removeChild(this.document.body, this.mask);
    }
    if (this.blockScroll) {
      unblockBodyScroll();
    }
    this.unbindAnimationEndListener();
    this.mask = null;
  }
  onAnimationStart(event) {
    switch (event.toState) {
      case "visible":
        this.container = event.element;
        this.appendContainer();
        this.show();
        if (this.closeOnEscape) {
          this.bindDocumentEscapeListener();
        }
        break;
    }
  }
  onAnimationEnd(event) {
    switch (event.toState) {
      case "void":
        this.hide(false);
        zindexutils.clear(this.container);
        this.unbindGlobalListeners();
        break;
    }
  }
  appendContainer() {
    if (this.appendTo) {
      if (this.appendTo === "body") this.renderer.appendChild(this.document.body, this.container);
      else appendChild(this.appendTo, this.container);
    }
  }
  bindDocumentEscapeListener() {
    const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
    this.documentEscapeListener = this.renderer.listen(documentTarget, "keydown", (event) => {
      if (event.which == 27) {
        if (parseInt(this.container.style.zIndex) === zindexutils.get(this.container)) {
          this.close(event);
        }
      }
    });
  }
  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null;
    }
  }
  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null;
    }
  }
  unbindGlobalListeners() {
    this.unbindMaskClickListener();
    this.unbindDocumentEscapeListener();
  }
  unbindAnimationEndListener() {
    if (this.animationEndListener && this.mask) {
      this.animationEndListener();
      this.animationEndListener = null;
    }
  }
  ngOnDestroy() {
    this.initialized = false;
    if (this.visible && this.modal) {
      this.destroyModal();
    }
    if (this.appendTo && this.container) {
      this.renderer.appendChild(this.el.nativeElement, this.container);
    }
    if (this.container && this.autoZIndex) {
      zindexutils.clear(this.container);
    }
    this.container = null;
    this.unbindGlobalListeners();
    this.unbindAnimationEndListener();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDrawer_BaseFactory;
    return function Drawer_Factory(__ngFactoryType__) {
      return (ɵDrawer_BaseFactory || (ɵDrawer_BaseFactory = ɵɵgetInheritedFactory(_Drawer)))(__ngFactoryType__ || _Drawer);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Drawer,
    selectors: [["p-drawer"]],
    contentQueries: function Drawer_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, _c3, 4);
        ɵɵcontentQuery(dirIndex, _c4, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headlessTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Drawer_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c5, 5);
        ɵɵviewQuery(_c6, 5);
        ɵɵviewQuery(_c7, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.maskRef = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeButtonViewChild = _t.first);
      }
    },
    inputs: {
      appendTo: "appendTo",
      blockScroll: [2, "blockScroll", "blockScroll", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      ariaCloseLabel: "ariaCloseLabel",
      autoZIndex: [2, "autoZIndex", "autoZIndex", booleanAttribute],
      baseZIndex: [2, "baseZIndex", "baseZIndex", numberAttribute],
      modal: [2, "modal", "modal", booleanAttribute],
      closeButtonProps: "closeButtonProps",
      dismissible: [2, "dismissible", "dismissible", booleanAttribute],
      showCloseIcon: [2, "showCloseIcon", "showCloseIcon", booleanAttribute],
      closeOnEscape: [2, "closeOnEscape", "closeOnEscape", booleanAttribute],
      transitionOptions: "transitionOptions",
      visible: "visible",
      position: "position",
      fullScreen: "fullScreen",
      header: "header",
      maskStyle: "maskStyle",
      closable: [2, "closable", "closable", booleanAttribute]
    },
    outputs: {
      onShow: "onShow",
      onHide: "onHide",
      visibleChange: "visibleChange"
    },
    features: [ɵɵProvidersFeature([DrawerStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c8,
    decls: 1,
    vars: 1,
    consts: [["container", ""], ["icon", ""], ["role", "complementary", 3, "ngClass", "style", "class", "keydown", 4, "ngIf"], ["role", "complementary", 3, "keydown", "ngClass"], [4, "ngTemplateOutlet"], [3, "ngClass"], [3, "class", 4, "ngIf"], [3, "ngClass", "buttonProps", "ariaLabel", "onClick", "keydown.enter", 4, "ngIf"], [4, "ngIf"], [3, "onClick", "keydown.enter", "ngClass", "buttonProps", "ariaLabel"]],
    template: function Drawer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, Drawer_div_0_Template, 4, 21, "div", 2);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", ctx.visible);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, Button, TimesIcon, SharedModule],
    encapsulation: 2,
    data: {
      animation: [trigger("panelState", [transition("void => visible", [useAnimation(showAnimation)]), transition("visible => void", [useAnimation(hideAnimation)])])]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Drawer, [{
    type: Component,
    args: [{
      selector: "p-drawer",
      standalone: true,
      imports: [CommonModule, Button, TimesIcon, SharedModule],
      template: `
        <div
            #container
            [ngClass]="{
                'p-drawer': true,
                'p-drawer-active': visible,
                'p-drawer-left': position === 'left' && !fullScreen,
                'p-drawer-right': position === 'right' && !fullScreen,
                'p-drawer-top': position === 'top' && !fullScreen,
                'p-drawer-bottom': position === 'bottom' && !fullScreen,
                'p-drawer-full': fullScreen || position === 'full'
            }"
            *ngIf="visible"
            [@panelState]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
            (@panelState.start)="onAnimationStart($event)"
            (@panelState.done)="onAnimationEnd($event)"
            [style]="style"
            [class]="styleClass"
            role="complementary"
            [attr.data-pc-name]="'sidebar'"
            [attr.data-pc-section]="'root'"
            (keydown)="onKeyDown($event)"
        >
            @if (headlessTemplate || _headlessTemplate) {
                <ng-container *ngTemplateOutlet="headlessTemplate || _headlessTemplate"></ng-container>
            } @else {
                <div [ngClass]="cx('header')" [attr.data-pc-section]="'header'">
                    <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                    <div *ngIf="header" [class]="cx('title')">{{ header }}</div>
                    <p-button
                        *ngIf="showCloseIcon && closable"
                        [ngClass]="cx('closeButton')"
                        (onClick)="close($event)"
                        (keydown.enter)="close($event)"
                        [buttonProps]="closeButtonProps"
                        [ariaLabel]="ariaCloseLabel"
                        [attr.data-pc-section]="'closebutton'"
                        [attr.data-pc-group-section]="'iconcontainer'"
                    >
                        <ng-template #icon>
                            <TimesIcon *ngIf="!closeIconTemplate && !_closeIconTemplate" [attr.data-pc-section]="'closeicon'" />
                            <ng-template *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-template>
                        </ng-template>
                    </p-button>
                </div>

                <div [ngClass]="cx('content')" [attr.data-pc-section]="'content'">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                </div>

                <ng-container *ngIf="footerTemplate || _footerTemplate">
                    <div [ngClass]="cx('footer')" [attr.data-pc-section]="'footer'">
                        <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                    </div>
                </ng-container>
            }
        </div>
    `,
      animations: [trigger("panelState", [transition("void => visible", [useAnimation(showAnimation)]), transition("visible => void", [useAnimation(hideAnimation)])])],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [DrawerStyle]
    }]
  }], null, {
    appendTo: [{
      type: Input
    }],
    blockScroll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    ariaCloseLabel: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    baseZIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    modal: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    closeButtonProps: [{
      type: Input
    }],
    dismissible: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showCloseIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    closeOnEscape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    transitionOptions: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    fullScreen: [{
      type: Input
    }],
    header: [{
      type: Input
    }],
    maskStyle: [{
      type: Input
    }],
    closable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    maskRef: [{
      type: ViewChild,
      args: ["maskRef"]
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container"]
    }],
    closeButtonViewChild: [{
      type: ViewChild,
      args: ["closeButton"]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon", {
        descendants: false
      }]
    }],
    headlessTemplate: [{
      type: ContentChild,
      args: ["headless", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var DrawerModule = class _DrawerModule {
  static ɵfac = function DrawerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DrawerModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DrawerModule,
    imports: [Drawer, SharedModule],
    exports: [Drawer, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Drawer, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DrawerModule, [{
    type: NgModule,
    args: [{
      imports: [Drawer, SharedModule],
      exports: [Drawer, SharedModule]
    }]
  }], null, null);
})();
export {
  Drawer,
  DrawerClasses,
  DrawerModule,
  DrawerStyle
};
//# sourceMappingURL=primeng_drawer.js.map
