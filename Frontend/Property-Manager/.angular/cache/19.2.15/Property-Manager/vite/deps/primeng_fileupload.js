import {
  Button
} from "./chunk-UJFCCJ5B.js";
import "./chunk-STA2ZUYP.js";
import {
  Ripple
} from "./chunk-5YORSMMS.js";
import "./chunk-5G7WYC4N.js";
import {
  PlusIcon,
  TimesIcon,
  UploadIcon
} from "./chunk-PRIE2AJH.js";
import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import "./chunk-O4QYUEGA.js";
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-SZJPLAKF.js";
import {
  DomSanitizer
} from "./chunk-BXOPRP5O.js";
import "./chunk-UVUWUGGQ.js";
import {
  HttpClient,
  HttpEventType
} from "./chunk-WXJEMTTQ.js";
import "./chunk-FXJ6C54V.js";
import {
  BaseStyle
} from "./chunk-UO5IQQ7M.js";
import {
  PrimeTemplate,
  SharedModule,
  TranslationKeys,
  addClass,
  removeClass
} from "./chunk-GNCTJO57.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-UCCE5RQP.js";
import {
  isPlatformBrowser
} from "./chunk-B5QHEHR4.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  signal,
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
  ɵɵpureFunction5,
  ɵɵpureFunction8,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-RFZ2BTTM.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-message.mjs
var _c0 = ["container"];
var _c1 = ["icon"];
var _c2 = ["closeicon"];
var _c3 = ["*"];
var _c4 = (a0, a1) => ({
  showTransitionParams: a0,
  hideTransitionParams: a1
});
var _c5 = (a0) => ({
  value: "visible()",
  params: a0
});
var _c6 = (a0) => ({
  closeCallback: a0
});
function Message_Conditional_0_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Message_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Message_Conditional_0_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.iconTemplate || ctx_r0.iconTemplate);
  }
}
function Message_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ctx_r0.icon);
  }
}
function Message_Conditional_0_div_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 9);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r0.cx("text"))("innerHTML", ctx_r0.text, ɵɵsanitizeHtml);
  }
}
function Message_Conditional_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, Message_Conditional_0_div_4_span_1_Template, 1, 2, "span", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.escape);
  }
}
function Message_Conditional_0_ng_template_5_span_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r0.cx("text"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.text);
  }
}
function Message_Conditional_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Message_Conditional_0_ng_template_5_span_0_Template, 2, 2, "span", 10);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", ctx_r0.escape && ctx_r0.text);
  }
}
function Message_Conditional_0_Conditional_7_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Message_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Message_Conditional_0_Conditional_7_ng_container_0_Template, 1, 0, "ng-container", 11);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.containerTemplate || ctx_r0.containerTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c6, ctx_r0.close.bind(ctx_r0)));
  }
}
function Message_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵprojection(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ctx_r0.cx("text"));
  }
}
function Message_Conditional_0_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 13);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r0.closeIcon);
  }
}
function Message_Conditional_0_Conditional_9_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Message_Conditional_0_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Message_Conditional_0_Conditional_9_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.closeIconTemplate || ctx_r0._closeIconTemplate);
  }
}
function Message_Conditional_0_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "TimesIcon", 14);
  }
}
function Message_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 12);
    ɵɵlistener("click", function Message_Conditional_0_Conditional_9_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.close($event));
    });
    ɵɵtemplate(1, Message_Conditional_0_Conditional_9_Conditional_1_Template, 1, 1, "i", 13)(2, Message_Conditional_0_Conditional_9_Conditional_2_Template, 1, 1, "ng-container")(3, Message_Conditional_0_Conditional_9_Conditional_3_Template, 1, 0, "TimesIcon", 14);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵattribute("aria-label", ctx_r0.closeAriaLabel);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.closeIcon ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.closeIconTemplate || ctx_r0._closeIconTemplate ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional(!ctx_r0.closeIconTemplate && !ctx_r0._closeIconTemplate && !ctx_r0.closeIcon ? 3 : -1);
  }
}
function Message_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1)(1, "div", 2);
    ɵɵtemplate(2, Message_Conditional_0_Conditional_2_Template, 1, 1, "ng-container")(3, Message_Conditional_0_Conditional_3_Template, 1, 1, "i", 3)(4, Message_Conditional_0_div_4_Template, 2, 1, "div", 4)(5, Message_Conditional_0_ng_template_5_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(7, Message_Conditional_0_Conditional_7_Template, 1, 4, "ng-container")(8, Message_Conditional_0_Conditional_8_Template, 2, 1, "span", 5)(9, Message_Conditional_0_Conditional_9_Template, 4, 4, "button", 6);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const escapeOut_r3 = ɵɵreference(6);
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.containerClass)("@messageAnimation", ɵɵpureFunction1(13, _c5, ɵɵpureFunction2(10, _c4, ctx_r0.showTransitionOptions, ctx_r0.hideTransitionOptions)));
    ɵɵattribute("aria-live", "polite")("role", "alert");
    ɵɵadvance(2);
    ɵɵconditional(ctx_r0.iconTemplate || ctx_r0._iconTemplate ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.icon ? 3 : -1);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.escape)("ngIfElse", escapeOut_r3);
    ɵɵadvance(3);
    ɵɵconditional(ctx_r0.containerTemplate || ctx_r0._containerTemplate ? 7 : 8);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r0.closable ? 9 : -1);
  }
}
var theme = ({
  dt
}) => `
.p-message {
    border-radius: ${dt("message.border.radius")};
    outline-width: ${dt("message.border.width")};
    outline-style: solid;
}

.p-message-content {
    display: flex;
    align-items: center;
    padding: ${dt("message.content.padding")};
    gap: ${dt("message.content.gap")};
    height: 100%;
}

.p-message-icon {
    flex-shrink: 0;
}

.p-message-close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-inline-start: auto;
    overflow: hidden;
    position: relative;
    width: ${dt("message.close.button.width")};
    height: ${dt("message.close.button.height")};
    border-radius: ${dt("message.close.button.border.radius")};
    background: transparent;
    transition: background ${dt("message.transition.duration")}, color ${dt("message.transition.duration")}, outline-color ${dt("message.transition.duration")}, box-shadow ${dt("message.transition.duration")}, opacity 0.3s;
    outline-color: transparent;
    color: inherit;
    padding: 0;
    border: none;
    cursor: pointer;
    user-select: none;
}

.p-message-close-icon {
    font-size: ${dt("message.close.icon.size")};
    width: ${dt("message.close.icon.size")};
    height: ${dt("message.close.icon.size")};
}

.p-message-close-button:focus-visible {
    outline-width: ${dt("message.close.button.focus.ring.width")};
    outline-style: ${dt("message.close.button.focus.ring.style")};
    outline-offset: ${dt("message.close.button.focus.ring.offset")};
}

.p-message-info {
    background: ${dt("message.info.background")};
    outline-color: ${dt("message.info.border.color")};
    color: ${dt("message.info.color")};
    box-shadow: ${dt("message.info.shadow")};
}

.p-message-info .p-message-close-button:focus-visible {
    outline-color: ${dt("message.info.close.button.focus.ring.color")};
    box-shadow: ${dt("message.info.close.button.focus.ring.shadow")};
}

.p-message-info .p-message-close-button:hover {
    background: ${dt("message.info.close.button.hover.background")};
}

.p-message-info.p-message-outlined {
    color: ${dt("message.info.outlined.color")};
    outline-color: ${dt("message.info.outlined.border.color")};
}

.p-message-info.p-message-simple {
    color: ${dt("message.info.simple.color")};
}

.p-message-success {
    background: ${dt("message.success.background")};
    outline-color: ${dt("message.success.border.color")};
    color: ${dt("message.success.color")};
    box-shadow: ${dt("message.success.shadow")};
}

.p-message-success .p-message-close-button:focus-visible {
    outline-color: ${dt("message.success.close.button.focus.ring.color")};
    box-shadow: ${dt("message.success.close.button.focus.ring.shadow")};
}

.p-message-success .p-message-close-button:hover {
    background: ${dt("message.success.close.button.hover.background")};
}

.p-message-success.p-message-outlined {
    color: ${dt("message.success.outlined.color")};
    outline-color: ${dt("message.success.outlined.border.color")};
}

.p-message-success.p-message-simple {
    color: ${dt("message.success.simple.color")};
}

.p-message-warn {
    background: ${dt("message.warn.background")};
    outline-color: ${dt("message.warn.border.color")};
    color: ${dt("message.warn.color")};
    box-shadow: ${dt("message.warn.shadow")};
}

.p-message-warn .p-message-close-button:focus-visible {
    outline-color: ${dt("message.warn.close.button.focus.ring.color")};
    box-shadow: ${dt("message.warn.close.button.focus.ring.shadow")};
}

.p-message-warn .p-message-close-button:hover {
    background: ${dt("message.warn.close.button.hover.background")};
}

.p-message-warn.p-message-outlined {
    color: ${dt("message.warn.outlined.color")};
    outline-color: ${dt("message.warn.outlined.border.color")};
}

.p-message-warn.p-message-simple {
    color: ${dt("message.warn.simple.color")};
}

.p-message-error {
    background: ${dt("message.error.background")};
    outline-color: ${dt("message.error.border.color")};
    color: ${dt("message.error.color")};
    box-shadow: ${dt("message.error.shadow")};
}

.p-message-error .p-message-close-button:focus-visible {
    outline-color: ${dt("message.error.close.button.focus.ring.color")};
    box-shadow: ${dt("message.error.close.button.focus.ring.shadow")};
}

.p-message-error .p-message-close-button:hover {
    background: ${dt("message.error.close.button.hover.background")};
}

.p-message-error.p-message-outlined {
    color: ${dt("message.error.outlined.color")};
    outline-color: ${dt("message.error.outlined.border.color")};
}

.p-message-error.p-message-simple {
    color: ${dt("message.error.simple.color")};
}

.p-message-secondary {
    background: ${dt("message.secondary.background")};
    outline-color: ${dt("message.secondary.border.color")};
    color: ${dt("message.secondary.color")};
    box-shadow: ${dt("message.secondary.shadow")};
}

.p-message-secondary .p-message-close-button:focus-visible {
    outline-color: ${dt("message.secondary.close.button.focus.ring.color")};
    box-shadow: ${dt("message.secondary.close.button.focus.ring.shadow")};
}

.p-message-secondary .p-message-close-button:hover {
    background: ${dt("message.secondary.close.button.hover.background")};
}

.p-message-secondary.p-message-outlined {
    color: ${dt("message.secondary.outlined.color")};
    outline-color: ${dt("message.secondary.outlined.border.color")};
}

.p-message-secondary.p-message-simple {
    color: ${dt("message.secondary.simple.color")};
}

.p-message-contrast {
    background: ${dt("message.contrast.background")};
    outline-color: ${dt("message.contrast.border.color")};
    color: ${dt("message.contrast.color")};
    box-shadow: ${dt("message.contrast.shadow")};
}

.p-message-contrast .p-message-close-button:focus-visible {
    outline-color: ${dt("message.contrast.close.button.focus.ring.color")};
    box-shadow: ${dt("message.contrast.close.button.focus.ring.shadow")};
}

.p-message-contrast .p-message-close-button:hover {
    background: ${dt("message.contrast.close.button.hover.background")};
}

.p-message-contrast.p-message-outlined {
    color: ${dt("message.contrast.outlined.color")};
    outline-color: ${dt("message.contrast.outlined.border.color")};
}

.p-message-contrast.p-message-simple {
    color: ${dt("message.contrast.simple.color")};
}

.p-message-text {
    display: inline-flex;
    align-items: center;
    font-size: ${dt("message.text.font.size")};
    font-weight: ${dt("message.text.font.weight")};
}

.p-message-icon {
    font-size: ${dt("message.icon.size")};
    width: ${dt("message.icon.size")};
    height: ${dt("message.icon.size")};
}

.p-message-enter-from {
    opacity: 0;
}

.p-message-enter-active {
    transition: opacity 0.3s;
}

.p-message.p-message-leave-from {
    max-height: 1000px;
}

.p-message.p-message-leave-to {
    max-height: 0;
    opacity: 0;
    margin: 0;
}

.p-message-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.3s;
}

.p-message-leave-active .p-message-close-button {
    opacity: 0;
}

.p-message-sm .p-message-content {
    padding: ${dt("message.content.sm.padding")};
}

.p-message-sm .p-message-text {
    font-size: ${dt("message.text.sm.font.size")};
}

.p-message-sm .p-message-icon {
    font-size: ${dt("message.icon.sm.size")};
    width: ${dt("message.icon.sm.size")};
    height: ${dt("message.icon.sm.size")};
}

.p-message-sm .p-message-close-icon {
    font-size: ${dt("message.close.icon.sm.size")};
    width: ${dt("message.close.icon.sm.size")};
    height: ${dt("message.close.icon.sm.size")};
}

.p-message-lg .p-message-content {
    padding: ${dt("message.content.lg.padding")};
}

.p-message-lg .p-message-text {
    font-size: ${dt("message.text.lg.font.size")};
}

.p-message-lg .p-message-icon {
    font-size: ${dt("message.icon.lg.size")};
    width: ${dt("message.icon.lg.size")};
    height: ${dt("message.icon.lg.size")};
}

.p-message-lg .p-message-close-icon {
    font-size: ${dt("message.close.icon.lg.size")};
    width: ${dt("message.close.icon.lg.size")};
    height: ${dt("message.close.icon.lg.size")};
}

.p-message-outlined {
    background: transparent;
    outline-width: ${dt("message.outlined.border.width")};
}

.p-message-simple {
    background: transparent;
    outline-color: transparent;
    box-shadow: none;
}

.p-message-simple .p-message-content {
    padding: ${dt("message.simple.content.padding")};
}

.p-message-outlined .p-message-close-button:hover,
.p-message-simple .p-message-close-button:hover {
    background: transparent;
}`;
var classes = {
  root: ({
    props
  }) => ["p-message p-component p-message-" + props.severity, {
    "p-message-simple": props.variant === "simple"
  }],
  content: "p-message-content",
  icon: "p-message-icon",
  text: "p-message-text",
  closeButton: "p-message-close-button",
  closeIcon: "p-message-close-icon"
};
var MessageStyle = class _MessageStyle extends BaseStyle {
  name = "message";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMessageStyle_BaseFactory;
    return function MessageStyle_Factory(__ngFactoryType__) {
      return (ɵMessageStyle_BaseFactory || (ɵMessageStyle_BaseFactory = ɵɵgetInheritedFactory(_MessageStyle)))(__ngFactoryType__ || _MessageStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _MessageStyle,
    factory: _MessageStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageStyle, [{
    type: Injectable
  }], null, null);
})();
var MessageClasses;
(function(MessageClasses2) {
  MessageClasses2["root"] = "p-message";
  MessageClasses2["content"] = "p-message-content";
  MessageClasses2["icon"] = "p-message-icon";
  MessageClasses2["text"] = "p-message-text";
  MessageClasses2["closeButton"] = "p-message-close-button";
  MessageClasses2["closeIcon"] = "p-message-close-icon";
})(MessageClasses || (MessageClasses = {}));
var Message = class _Message extends BaseComponent {
  /**
   * Severity level of the message.
   * @defaultValue 'info'
   * @group Props
   */
  severity = "info";
  /**
   * Text content.
   * @group Props
   */
  text;
  /**
   * Whether displaying messages would be escaped or not.
   * @deprecated Use content projection instead '<p-message>Content</p-message>'.
   * @group Props
   */
  escape = true;
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
   * Whether the message can be closed manually using the close icon.
   * @group Props
   * @defaultValue false
   */
  closable = false;
  /**
   * Icon to display in the message.
   * @group Props
   * @defaultValue undefined
   */
  icon;
  /**
   * Icon to display in the message close button.
   * @group Props
   * @defaultValue undefined
   */
  closeIcon;
  /**
   * Delay in milliseconds to close the message automatically.
   * @defaultValue undefined
   */
  life;
  /**
   * Transition options of the show animation.
   * @defaultValue '300ms ease-out'
   * @group Props
   */
  showTransitionOptions = "300ms ease-out";
  /**
   * Transition options of the hide animation.
   * @defaultValue '200ms cubic-bezier(0.86, 0, 0.07, 1)'
   * @group Props
   */
  hideTransitionOptions = "200ms cubic-bezier(0.86, 0, 0.07, 1)";
  /**
   * Defines the size of the component.
   * @group Props
   */
  size;
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant;
  /**
   * Emits when the message is closed.
   * @param {{ originalEvent: Event }} event - The event object containing the original event.
   * @group Emits
   */
  onClose = new EventEmitter();
  get closeAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.close : void 0;
  }
  get containerClass() {
    const variantClass = this.variant === "outlined" ? "p-message-outlined" : this.variant === "simple" ? "p-message-simple" : "";
    const sizeClass = this.size === "small" ? "p-message-sm" : this.size === "large" ? "p-message-lg" : "";
    return `p-message-${this.severity} ${variantClass} ${sizeClass}`.trim() + (this.styleClass ? " " + this.styleClass : "");
  }
  visible = signal(true);
  _componentStyle = inject(MessageStyle);
  /**
   * Custom template of the message container.
   * @group Templates
   */
  containerTemplate;
  /**
   * Custom template of the message icon.
   * @group Templates
   */
  iconTemplate;
  /**
   * Custom template of the close icon.
   * @group Templates
   */
  closeIconTemplate;
  templates;
  _containerTemplate;
  _iconTemplate;
  _closeIconTemplate;
  ngOnInit() {
    super.ngOnInit();
    if (this.life) {
      setTimeout(() => {
        this.visible.set(false);
      }, this.life);
    }
  }
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "container":
          this._containerTemplate = item.template;
          break;
        case "icon":
          this._iconTemplate = item.template;
          break;
        case "closeicon":
          this._closeIconTemplate = item.template;
          break;
      }
    });
  }
  /**
   * Closes the message.
   * @param {Event} event - Browser event.
   * @group Method
   */
  close(event) {
    this.visible.set(false);
    this.onClose.emit({
      originalEvent: event
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMessage_BaseFactory;
    return function Message_Factory(__ngFactoryType__) {
      return (ɵMessage_BaseFactory || (ɵMessage_BaseFactory = ɵɵgetInheritedFactory(_Message)))(__ngFactoryType__ || _Message);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Message,
    selectors: [["p-message"]],
    contentQueries: function Message_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.iconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    inputs: {
      severity: "severity",
      text: "text",
      escape: [2, "escape", "escape", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      closable: [2, "closable", "closable", booleanAttribute],
      icon: "icon",
      closeIcon: "closeIcon",
      life: "life",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      size: "size",
      variant: "variant"
    },
    outputs: {
      onClose: "onClose"
    },
    features: [ɵɵProvidersFeature([MessageStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c3,
    decls: 1,
    vars: 1,
    consts: [["escapeOut", ""], [1, "p-message", "p-component", 3, "ngClass"], [1, "p-message-content"], [1, "p-message-icon", 3, "ngClass"], [4, "ngIf", "ngIfElse"], [3, "ngClass"], ["pRipple", "", "type", "button", 1, "p-message-close-button"], [4, "ngTemplateOutlet"], [3, "ngClass", "innerHTML", 4, "ngIf"], [3, "ngClass", "innerHTML"], [3, "ngClass", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["pRipple", "", "type", "button", 1, "p-message-close-button", 3, "click"], [1, "p-message-close-icon", 3, "ngClass"], ["styleClass", "p-message-close-icon"]],
    template: function Message_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, Message_Conditional_0_Template, 10, 15, "div", 1);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.visible() ? 0 : -1);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, TimesIcon, Ripple, SharedModule],
    encapsulation: 2,
    data: {
      animation: [trigger("messageAnimation", [transition(":enter", [style({
        opacity: 0,
        transform: "translateY(-25%)"
      }), animate("{{showTransitionParams}}")]), transition(":leave", [animate("{{hideTransitionParams}}", style({
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        opacity: 0
      }))])])]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Message, [{
    type: Component,
    args: [{
      selector: "p-message",
      standalone: true,
      imports: [CommonModule, TimesIcon, Ripple, SharedModule],
      template: `
        @if (visible()) {
            <div
                class="p-message p-component"
                [attr.aria-live]="'polite'"
                [ngClass]="containerClass"
                [attr.role]="'alert'"
                [@messageAnimation]="{
                    value: 'visible()',
                    params: {
                        showTransitionParams: showTransitionOptions,
                        hideTransitionParams: hideTransitionOptions
                    }
                }"
            >
                <div class="p-message-content">
                    @if (iconTemplate || _iconTemplate) {
                        <ng-container *ngTemplateOutlet="iconTemplate || iconTemplate"></ng-container>
                    }
                    @if (icon) {
                        <i class="p-message-icon" [ngClass]="icon"></i>
                    }

                    <div *ngIf="!escape; else escapeOut">
                        <span *ngIf="!escape" [ngClass]="cx('text')" [innerHTML]="text"></span>
                    </div>

                    <ng-template #escapeOut>
                        <span *ngIf="escape && text" [ngClass]="cx('text')">{{ text }}</span>
                    </ng-template>

                    @if (containerTemplate || _containerTemplate) {
                        <ng-container *ngTemplateOutlet="containerTemplate || containerTemplate; context: { closeCallback: close.bind(this) }"></ng-container>
                    } @else {
                        <span [ngClass]="cx('text')">
                            <ng-content></ng-content>
                        </span>
                    }
                    @if (closable) {
                        <button pRipple type="button" class="p-message-close-button" (click)="close($event)" [attr.aria-label]="closeAriaLabel">
                            @if (closeIcon) {
                                <i class="p-message-close-icon" [ngClass]="closeIcon"></i>
                            }
                            @if (closeIconTemplate || _closeIconTemplate) {
                                <ng-container *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-container>
                            }
                            @if (!closeIconTemplate && !_closeIconTemplate && !closeIcon) {
                                <TimesIcon styleClass="p-message-close-icon" />
                            }
                        </button>
                    }
                </div>
            </div>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [MessageStyle],
      animations: [trigger("messageAnimation", [transition(":enter", [style({
        opacity: 0,
        transform: "translateY(-25%)"
      }), animate("{{showTransitionParams}}")]), transition(":leave", [animate("{{hideTransitionParams}}", style({
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        opacity: 0
      }))])])]
    }]
  }], null, {
    severity: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    escape: [{
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
    closable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    icon: [{
      type: Input
    }],
    closeIcon: [{
      type: Input
    }],
    life: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    variant: [{
      type: Input
    }],
    onClose: [{
      type: Output
    }],
    containerTemplate: [{
      type: ContentChild,
      args: ["container", {
        descendants: false
      }]
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icon", {
        descendants: false
      }]
    }],
    closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var MessageModule = class _MessageModule {
  static ɵfac = function MessageModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MessageModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MessageModule,
    imports: [Message, SharedModule],
    exports: [Message, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Message, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageModule, [{
    type: NgModule,
    args: [{
      imports: [Message, SharedModule],
      exports: [Message, SharedModule]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-progressbar.mjs
var _c02 = ["content"];
var _c12 = (a0, a1) => ({
  "p-progressbar p-component": true,
  "p-progressbar-determinate": a0,
  "p-progressbar-indeterminate": a1
});
var _c22 = (a0) => ({
  $implicit: a0
});
function ProgressBar_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵstyleProp("display", ctx_r0.value != null && ctx_r0.value !== 0 ? "flex" : "none");
    ɵɵattribute("data-pc-section", "label");
    ɵɵadvance();
    ɵɵtextInterpolate2("", ctx_r0.value, "", ctx_r0.unit, "");
  }
}
function ProgressBar_div_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ProgressBar_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3)(1, "div", 4);
    ɵɵtemplate(2, ProgressBar_div_1_div_2_Template, 2, 5, "div", 5)(3, ProgressBar_div_1_ng_container_3_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.valueStyleClass);
    ɵɵstyleProp("width", ctx_r0.value + "%")("background", ctx_r0.color);
    ɵɵproperty("ngClass", "p-progressbar-value p-progressbar-value-animate");
    ɵɵattribute("data-pc-section", "value");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.showValue && !ctx_r0.contentTemplate && !ctx_r0._contentTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate || ctx_r0._contentTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(11, _c22, ctx_r0.value));
  }
}
function ProgressBar_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 7);
    ɵɵelement(1, "div", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.valueStyleClass);
    ɵɵproperty("ngClass", "p-progressbar-indeterminate-container");
    ɵɵattribute("data-pc-section", "container");
    ɵɵadvance();
    ɵɵstyleProp("background", ctx_r0.color);
    ɵɵattribute("data-pc-section", "value");
  }
}
var theme2 = ({
  dt
}) => `
.p-progressbar {
    position: relative;
    overflow: hidden;
    height: ${dt("progressbar.height")};
    background: ${dt("progressbar.background")};
    border-radius: ${dt("progressbar.border.radius")};
}

.p-progressbar-value {
    margin: 0;
    background: ${dt("progressbar.value.background")};
}

.p-progressbar-label {
    color: ${dt("progressbar.label.color")};
    font-size: ${dt("progressbar.label.font.size")};
    font-weight: ${dt("progressbar.label.font.weight")};
}

.p-progressbar-determinate .p-progressbar-value {
    height: 100%;
    width: 0%;
    position: absolute;
    display: none;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: width 1s ease-in-out;
}

.p-progressbar-determinate .p-progressbar-label {
    display: inline-flex;
}

.p-progressbar-indeterminate .p-progressbar-value::before {
    content: "";
    position: absolute;
    background: inherit;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    will-change: inset-inline-start, inset-inline-end;
    animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.p-progressbar-indeterminate .p-progressbar-value::after {
    content: "";
    position: absolute;
    background: inherit;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    will-change: inset-inline-start, inset-inline-end;
    animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
}

@-webkit-keyframes p-progressbar-indeterminate-anim {
    0% {
        inset-inline-start: -35%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
    100% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
}
@keyframes p-progressbar-indeterminate-anim {
    0% {
        inset-inline-start: -35%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
    100% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
}
@-webkit-keyframes p-progressbar-indeterminate-anim-short {
    0% {
        inset-inline-start: -200%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
    100% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
}
@keyframes p-progressbar-indeterminate-anim-short {
    0% {
        inset-inline-start: -200%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
    100% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
}
`;
var classes2 = {
  root: ({
    instance
  }) => ["p-progressbar p-component", {
    "p-progressbar-determinate": instance.determinate,
    "p-progressbar-indeterminate": instance.indeterminate
  }],
  value: "p-progressbar-value",
  label: "p-progressbar-label"
};
var ProgressBarStyle = class _ProgressBarStyle extends BaseStyle {
  name = "progressbar";
  theme = theme2;
  classes = classes2;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵProgressBarStyle_BaseFactory;
    return function ProgressBarStyle_Factory(__ngFactoryType__) {
      return (ɵProgressBarStyle_BaseFactory || (ɵProgressBarStyle_BaseFactory = ɵɵgetInheritedFactory(_ProgressBarStyle)))(__ngFactoryType__ || _ProgressBarStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _ProgressBarStyle,
    factory: _ProgressBarStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBarStyle, [{
    type: Injectable
  }], null, null);
})();
var ProgressBarClasses;
(function(ProgressBarClasses2) {
  ProgressBarClasses2["root"] = "p-progressbar";
  ProgressBarClasses2["value"] = "p-progressbar-value";
  ProgressBarClasses2["label"] = "p-progressbar-label";
})(ProgressBarClasses || (ProgressBarClasses = {}));
var ProgressBar = class _ProgressBar extends BaseComponent {
  /**
   * Current value of the progress.
   * @group Props
   */
  value;
  /**
   * Whether to display the progress bar value.
   * @group Props
   */
  showValue = true;
  /**
   * Style class of the element.
   * @group Props
   */
  styleClass;
  /**
   * Style class of the value element.
   * @group Props
   */
  valueStyleClass;
  /**
   * Inline style of the element.
   * @group Props
   */
  style;
  /**
   * Unit sign appended to the value.
   * @group Props
   */
  unit = "%";
  /**
   * Defines the mode of the progress
   * @group Props
   */
  mode = "determinate";
  /**
   * Color for the background of the progress.
   * @group Props
   */
  color;
  /**
   * Template of the content.
   * @group templates
   */
  contentTemplate;
  _componentStyle = inject(ProgressBarStyle);
  templates;
  _contentTemplate;
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
        default:
          this._contentTemplate = item.template;
      }
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵProgressBar_BaseFactory;
    return function ProgressBar_Factory(__ngFactoryType__) {
      return (ɵProgressBar_BaseFactory || (ɵProgressBar_BaseFactory = ɵɵgetInheritedFactory(_ProgressBar)))(__ngFactoryType__ || _ProgressBar);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _ProgressBar,
    selectors: [["p-progressBar"], ["p-progressbar"], ["p-progress-bar"]],
    contentQueries: function ProgressBar_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c02, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    inputs: {
      value: [2, "value", "value", numberAttribute],
      showValue: [2, "showValue", "showValue", booleanAttribute],
      styleClass: "styleClass",
      valueStyleClass: "valueStyleClass",
      style: "style",
      unit: "unit",
      mode: "mode",
      color: "color"
    },
    features: [ɵɵProvidersFeature([ProgressBarStyle]), ɵɵInheritDefinitionFeature],
    decls: 3,
    vars: 15,
    consts: [["role", "progressbar", 3, "ngStyle", "ngClass"], ["style", "display:flex", 3, "ngClass", "class", "width", "background", 4, "ngIf"], [3, "ngClass", "class", 4, "ngIf"], [2, "display", "flex", 3, "ngClass"], [1, "p-progressbar-label"], [3, "display", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "ngClass"], [1, "p-progressbar-value", "p-progressbar-value-animate"]],
    template: function ProgressBar_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, ProgressBar_div_1_Template, 4, 13, "div", 1)(2, ProgressBar_div_2_Template, 2, 7, "div", 2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngStyle", ctx.style)("ngClass", ɵɵpureFunction2(12, _c12, ctx.mode === "determinate", ctx.mode === "indeterminate"));
        ɵɵattribute("aria-valuemin", 0)("aria-valuenow", ctx.value)("aria-valuemax", 100)("data-pc-name", "progressbar")("data-pc-section", "root")("aria-label", ctx.value + ctx.unit);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.mode === "determinate");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.mode === "indeterminate");
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBar, [{
    type: Component,
    args: [{
      selector: "p-progressBar, p-progressbar, p-progress-bar",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: `
        <div
            role="progressbar"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.aria-valuemin]="0"
            [attr.aria-valuenow]="value"
            [attr.aria-valuemax]="100"
            [attr.data-pc-name]="'progressbar'"
            [attr.data-pc-section]="'root'"
            [ngClass]="{
                'p-progressbar p-component': true,
                'p-progressbar-determinate': mode === 'determinate',
                'p-progressbar-indeterminate': mode === 'indeterminate'
            }"
            [attr.aria-label]="value + unit"
        >
            <div *ngIf="mode === 'determinate'" [ngClass]="'p-progressbar-value p-progressbar-value-animate'" [class]="valueStyleClass" [style.width]="value + '%'" style="display:flex" [style.background]="color" [attr.data-pc-section]="'value'">
                <div class="p-progressbar-label">
                    <div *ngIf="showValue && !contentTemplate && !_contentTemplate" [style.display]="value != null && value !== 0 ? 'flex' : 'none'" [attr.data-pc-section]="'label'">{{ value }}{{ unit }}</div>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: value }"></ng-container>
                </div>
            </div>
            <div *ngIf="mode === 'indeterminate'" [ngClass]="'p-progressbar-indeterminate-container'" [class]="valueStyleClass" [attr.data-pc-section]="'container'">
                <div class="p-progressbar-value p-progressbar-value-animate" [style.background]="color" [attr.data-pc-section]="'value'"></div>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [ProgressBarStyle]
    }]
  }], null, {
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    showValue: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    styleClass: [{
      type: Input
    }],
    valueStyleClass: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    unit: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var ProgressBarModule = class _ProgressBarModule {
  static ɵfac = function ProgressBarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProgressBarModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ProgressBarModule,
    imports: [ProgressBar, SharedModule],
    exports: [ProgressBar, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [ProgressBar, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBarModule, [{
    type: NgModule,
    args: [{
      imports: [ProgressBar, SharedModule],
      exports: [ProgressBar, SharedModule]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-fileupload.mjs
var _c03 = ["file"];
var _c13 = ["header"];
var _c23 = ["content"];
var _c32 = ["toolbar"];
var _c42 = ["chooseicon"];
var _c52 = ["filelabel"];
var _c62 = ["uploadicon"];
var _c7 = ["cancelicon"];
var _c8 = ["empty"];
var _c9 = ["advancedfileinput"];
var _c10 = ["basicfileinput"];
var _c11 = (a0, a1, a2, a3, a4) => ({
  $implicit: a0,
  uploadedFiles: a1,
  chooseCallback: a2,
  clearCallback: a3,
  uploadCallback: a4
});
var _c122 = (a0, a1, a2, a3, a4, a5, a6, a7) => ({
  $implicit: a0,
  uploadedFiles: a1,
  chooseCallback: a2,
  clearCallback: a3,
  removeUploadedFileCallback: a4,
  removeFileCallback: a5,
  progress: a6,
  messages: a7
});
var _c132 = (a0) => ({
  $implicit: a0
});
function FileUpload_div_0_ng_container_4_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.chooseIcon);
    ɵɵattribute("aria-label", true)("data-pc-section", "chooseicon");
  }
}
function FileUpload_div_0_ng_container_4_ng_container_5_PlusIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "PlusIcon");
  }
  if (rf & 2) {
    ɵɵattribute("aria-label", true)("data-pc-section", "chooseicon");
  }
}
function FileUpload_div_0_ng_container_4_ng_container_5_span_2_1_ng_template_0_Template(rf, ctx) {
}
function FileUpload_div_0_ng_container_4_ng_container_5_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_0_ng_container_4_ng_container_5_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function FileUpload_div_0_ng_container_4_ng_container_5_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, FileUpload_div_0_ng_container_4_ng_container_5_span_2_1_Template, 1, 0, null, 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵattribute("aria-label", true)("data-pc-section", "chooseicon");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.chooseIconTemplate || ctx_r1._chooseIconTemplate);
  }
}
function FileUpload_div_0_ng_container_4_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, FileUpload_div_0_ng_container_4_ng_container_5_PlusIcon_1_Template, 1, 2, "PlusIcon", 9)(2, FileUpload_div_0_ng_container_4_ng_container_5_span_2_Template, 2, 3, "span", 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.chooseIconTemplate && !ctx_r1._chooseIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.chooseIconTemplate || ctx_r1._chooseIconTemplate);
  }
}
function FileUpload_div_0_ng_container_4_p_button_6_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngClass", ctx_r1.uploadIcon);
    ɵɵattribute("aria-hidden", true);
  }
}
function FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_UploadIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "UploadIcon");
  }
}
function FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_span_2_1_Template, 1, 0, null, 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵattribute("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.uploadIconTemplate || ctx_r1._uploadIconTemplate);
  }
}
function FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_UploadIcon_1_Template, 1, 0, "UploadIcon", 9)(2, FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_span_2_Template, 2, 2, "span", 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.uploadIconTemplate && !ctx_r1._uploadIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.uploadIconTemplate || ctx_r1._uploadIconTemplate);
  }
}
function FileUpload_div_0_ng_container_4_p_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 19);
    ɵɵlistener("onClick", function FileUpload_div_0_ng_container_4_p_button_6_Template_p_button_onClick_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.upload());
    });
    ɵɵtemplate(1, FileUpload_div_0_ng_container_4_p_button_6_span_1_Template, 1, 2, "span", 20)(2, FileUpload_div_0_ng_container_4_p_button_6_ng_container_2_Template, 3, 2, "ng-container", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("label", ctx_r1.uploadButtonLabel)("disabled", !ctx_r1.hasFiles() || ctx_r1.isFileLimitExceeded())("styleClass", "p-fileupload-upload-button " + ctx_r1.uploadStyleClass)("buttonProps", ctx_r1.uploadButtonProps);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.uploadIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.uploadIcon);
  }
}
function FileUpload_div_0_ng_container_4_p_button_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngClass", ctx_r1.cancelIcon);
  }
}
function FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_TimesIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "TimesIcon");
  }
  if (rf & 2) {
    ɵɵattribute("aria-hidden", true);
  }
}
function FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_span_2_1_Template, 1, 0, null, 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵattribute("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.cancelIconTemplate || ctx_r1._cancelIconTemplate);
  }
}
function FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_TimesIcon_1_Template, 1, 1, "TimesIcon", 9)(2, FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_span_2_Template, 2, 2, "span", 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.cancelIconTemplate && !ctx_r1._cancelIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.cancelIconTemplate || ctx_r1._cancelIconTemplate);
  }
}
function FileUpload_div_0_ng_container_4_p_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 19);
    ɵɵlistener("onClick", function FileUpload_div_0_ng_container_4_p_button_7_Template_p_button_onClick_0_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.clear());
    });
    ɵɵtemplate(1, FileUpload_div_0_ng_container_4_p_button_7_span_1_Template, 1, 1, "span", 20)(2, FileUpload_div_0_ng_container_4_p_button_7_ng_container_2_Template, 3, 2, "ng-container", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("label", ctx_r1.cancelButtonLabel)("disabled", !ctx_r1.hasFiles() || ctx_r1.uploading)("styleClass", "p-fileupload-cancel-button " + ctx_r1.cancelStyleClass)("buttonProps", ctx_r1.cancelButtonProps);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.cancelIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.cancelIcon);
  }
}
function FileUpload_div_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "p-button", 16);
    ɵɵlistener("focus", function FileUpload_div_0_ng_container_4_Template_p_button_focus_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onFocus());
    })("blur", function FileUpload_div_0_ng_container_4_Template_p_button_blur_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onBlur());
    })("onClick", function FileUpload_div_0_ng_container_4_Template_p_button_onClick_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.choose());
    })("keydown.enter", function FileUpload_div_0_ng_container_4_Template_p_button_keydown_enter_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.choose());
    });
    ɵɵelementStart(2, "input", 7, 0);
    ɵɵlistener("change", function FileUpload_div_0_ng_container_4_Template_input_change_2_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onFileSelect($event));
    });
    ɵɵelementEnd();
    ɵɵtemplate(4, FileUpload_div_0_ng_container_4_span_4_Template, 1, 4, "span", 17)(5, FileUpload_div_0_ng_container_4_ng_container_5_Template, 3, 2, "ng-container", 9);
    ɵɵelementEnd();
    ɵɵtemplate(6, FileUpload_div_0_ng_container_4_p_button_6_Template, 3, 6, "p-button", 18)(7, FileUpload_div_0_ng_container_4_p_button_7_Template, 3, 6, "p-button", 18);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("styleClass", "p-fileupload-choose-button " + ctx_r1.chooseStyleClass)("disabled", ctx_r1.disabled || ctx_r1.isChooseDisabled())("label", ctx_r1.chooseButtonLabel)("buttonProps", ctx_r1.chooseButtonProps);
    ɵɵattribute("data-pc-section", "choosebutton");
    ɵɵadvance();
    ɵɵproperty("multiple", ctx_r1.multiple)("accept", ctx_r1.accept)("disabled", ctx_r1.disabled || ctx_r1.isChooseDisabled());
    ɵɵattribute("aria-label", ctx_r1.browseFilesLabel)("title", "")("data-pc-section", "input");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.chooseIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.chooseIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.auto && ctx_r1.showUploadButton);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.auto && ctx_r1.showCancelButton);
  }
}
function FileUpload_div_0_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function FileUpload_div_0_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function FileUpload_div_0_p_progressbar_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p-progressbar", 22);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("value", ctx_r1.progress)("showValue", false);
  }
}
function FileUpload_div_0_For_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p-message", 14);
  }
  if (rf & 2) {
    const message_r6 = ctx.$implicit;
    ɵɵproperty("severity", message_r6.severity)("text", message_r6.text);
  }
}
function FileUpload_div_0_div_12_Conditional_1_div_0_img_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "img", 33);
    ɵɵlistener("error", function FileUpload_div_0_div_12_Conditional_1_div_0_img_1_Template_img_error_0_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r1 = ɵɵnextContext(5);
      return ɵɵresetView(ctx_r1.imageError($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const file_r9 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("src", file_r9.objectURL, ɵɵsanitizeUrl)("width", ctx_r1.previewWidth);
  }
}
function FileUpload_div_0_div_12_Conditional_1_div_0_ng_template_9_TimesIcon_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "TimesIcon");
  }
}
function FileUpload_div_0_div_12_Conditional_1_div_0_ng_template_9_1_ng_template_0_Template(rf, ctx) {
}
function FileUpload_div_0_div_12_Conditional_1_div_0_ng_template_9_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_0_div_12_Conditional_1_div_0_ng_template_9_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function FileUpload_div_0_div_12_Conditional_1_div_0_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_0_div_12_Conditional_1_div_0_ng_template_9_TimesIcon_0_Template, 1, 0, "TimesIcon", 9)(1, FileUpload_div_0_div_12_Conditional_1_div_0_ng_template_9_1_Template, 1, 0, null, 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵproperty("ngIf", !ctx_r1.cancelIconTemplate && !ctx_r1._cancelIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.cancelIconTemplate || ctx_r1._cancelIconTemplate);
  }
}
function FileUpload_div_0_div_12_Conditional_1_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24);
    ɵɵtemplate(1, FileUpload_div_0_div_12_Conditional_1_div_0_img_1_Template, 1, 2, "img", 27);
    ɵɵelementStart(2, "div", 28)(3, "div", 29);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 30);
    ɵɵtext(6);
    ɵɵelementEnd()();
    ɵɵelementStart(7, "div", 31)(8, "p-button", 32);
    ɵɵlistener("onClick", function FileUpload_div_0_div_12_Conditional_1_div_0_Template_p_button_onClick_8_listener($event) {
      const i_r10 = ɵɵrestoreView(_r7).index;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.remove($event, i_r10));
    });
    ɵɵtemplate(9, FileUpload_div_0_div_12_Conditional_1_div_0_ng_template_9_Template, 2, 2, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const file_r9 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.isImage(file_r9));
    ɵɵadvance(3);
    ɵɵtextInterpolate(file_r9.name);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.formatSize(file_r9.size));
    ɵɵadvance(2);
    ɵɵproperty("disabled", ctx_r1.uploading)("styleClass", "p-fileupload-file-remove-button " + ctx_r1.removeStyleClass);
  }
}
function FileUpload_div_0_div_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_0_div_12_Conditional_1_div_0_Template, 11, 5, "div", 26);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngForOf", ctx_r1.files);
  }
}
function FileUpload_div_0_div_12_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function FileUpload_div_0_div_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_0_div_12_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 25);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngForOf", ctx_r1.files)("ngForTemplate", ctx_r1.fileTemplate || ctx_r1._fileTemplate);
  }
}
function FileUpload_div_0_div_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 23);
    ɵɵtemplate(1, FileUpload_div_0_div_12_Conditional_1_Template, 1, 1, "div", 24)(2, FileUpload_div_0_div_12_Conditional_2_Template, 1, 2, null, 25);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵconditional(!ctx_r1.fileTemplate && !ctx_r1._fileTemplate ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.fileTemplate || ctx_r1._fileTemplate ? 2 : -1);
  }
}
function FileUpload_div_0_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function FileUpload_div_0_Conditional_14_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function FileUpload_div_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_0_Conditional_14_ng_container_0_Template, 1, 0, "ng-container", 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.emptyTemplate || ctx_r1._emptyTemplate);
  }
}
function FileUpload_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 6)(1, "input", 7, 0);
    ɵɵlistener("change", function FileUpload_div_0_Template_input_change_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFileSelect($event));
    });
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 8);
    ɵɵtemplate(4, FileUpload_div_0_ng_container_4_Template, 8, 15, "ng-container", 9)(5, FileUpload_div_0_ng_container_5_Template, 1, 0, "ng-container", 10)(6, FileUpload_div_0_ng_container_6_Template, 1, 0, "ng-container", 11);
    ɵɵelementEnd();
    ɵɵelementStart(7, "div", 12, 1);
    ɵɵlistener("dragenter", function FileUpload_div_0_Template_div_dragenter_7_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onDragEnter($event));
    })("dragleave", function FileUpload_div_0_Template_div_dragleave_7_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onDragLeave($event));
    })("drop", function FileUpload_div_0_Template_div_drop_7_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onDrop($event));
    });
    ɵɵtemplate(9, FileUpload_div_0_p_progressbar_9_Template, 1, 2, "p-progressbar", 13);
    ɵɵrepeaterCreate(10, FileUpload_div_0_For_11_Template, 1, 2, "p-message", 14, ɵɵrepeaterTrackByIdentity);
    ɵɵtemplate(12, FileUpload_div_0_div_12_Template, 3, 2, "div", 15)(13, FileUpload_div_0_ng_container_13_Template, 1, 0, "ng-container", 10)(14, FileUpload_div_0_Conditional_14_Template, 1, 1, "ng-container");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.styleClass);
    ɵɵproperty("ngClass", "p-fileupload p-fileupload-advanced p-component")("ngStyle", ctx_r1.style);
    ɵɵattribute("data-pc-name", "fileupload")("data-pc-section", "root");
    ɵɵadvance();
    ɵɵstyleProp("display", "none");
    ɵɵproperty("multiple", ctx_r1.multiple)("accept", ctx_r1.accept)("disabled", ctx_r1.disabled || ctx_r1.isChooseDisabled());
    ɵɵattribute("aria-label", ctx_r1.browseFilesLabel)("title", "")("data-pc-section", "input");
    ɵɵadvance(3);
    ɵɵproperty("ngIf", !ctx_r1.headerTemplate && !ctx_r1._headerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate)("ngTemplateOutletContext", ɵɵpureFunction5(24, _c11, ctx_r1.files, ctx_r1.uploadedFiles, ctx_r1.choose.bind(ctx_r1), ctx_r1.clear.bind(ctx_r1), ctx_r1.upload.bind(ctx_r1)));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.toolbarTemplate || ctx_r1._toolbarTemplate);
    ɵɵadvance();
    ɵɵattribute("data-pc-section", "content");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.hasFiles());
    ɵɵadvance();
    ɵɵrepeater(ctx_r1.msgs);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.hasFiles());
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.contentTemplate || ctx_r1._contentTemplate)("ngTemplateOutletContext", ɵɵpureFunction8(30, _c122, ctx_r1.files, ctx_r1.uploadedFiles, ctx_r1.choose.bind(ctx_r1), ctx_r1.clear.bind(ctx_r1), ctx_r1.removeUploadedFile.bind(ctx_r1), ctx_r1.remove.bind(ctx_r1), ctx_r1.progress, ctx_r1.msgs));
    ɵɵadvance();
    ɵɵconditional((ctx_r1.emptyTemplate || ctx_r1._emptyTemplate) && !ctx_r1.hasFiles() && !ctx_r1.hasUploadedFiles() ? 14 : -1);
  }
}
function FileUpload_div_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p-message", 14);
  }
  if (rf & 2) {
    const message_r12 = ctx.$implicit;
    ɵɵproperty("severity", message_r12.severity)("text", message_r12.text);
  }
}
function FileUpload_div_1_ng_template_4_Conditional_0_span_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 37);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngClass", ctx_r1.uploadIcon);
  }
}
function FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_UploadIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "UploadIcon", 40);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-button-icon p-button-icon-left");
  }
}
function FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_span_2_1_ng_template_0_Template(rf, ctx) {
}
function FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 41);
    ɵɵtemplate(1, FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_span_2_1_Template, 1, 0, null, 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1._uploadIconTemplate || ctx_r1.uploadIconTemplate);
  }
}
function FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_UploadIcon_1_Template, 1, 1, "UploadIcon", 38)(2, FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_span_2_Template, 2, 1, "span", 39);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.uploadIconTemplate && !ctx_r1._uploadIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1._uploadIconTemplate || ctx_r1.uploadIconTemplate);
  }
}
function FileUpload_div_1_ng_template_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_1_ng_template_4_Conditional_0_span_0_Template, 1, 1, "span", 36)(1, FileUpload_div_1_ng_template_4_Conditional_0_ng_container_1_Template, 3, 2, "ng-container", 9);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r1.uploadIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.uploadIcon);
  }
}
function FileUpload_div_1_ng_template_4_Conditional_1_span_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 43);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngClass", ctx_r1.chooseIcon);
  }
}
function FileUpload_div_1_ng_template_4_Conditional_1_ng_container_1_PlusIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "PlusIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "uploadicon");
  }
}
function FileUpload_div_1_ng_template_4_Conditional_1_ng_container_1_2_ng_template_0_Template(rf, ctx) {
}
function FileUpload_div_1_ng_template_4_Conditional_1_ng_container_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_1_ng_template_4_Conditional_1_ng_container_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function FileUpload_div_1_ng_template_4_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, FileUpload_div_1_ng_template_4_Conditional_1_ng_container_1_PlusIcon_1_Template, 1, 1, "PlusIcon", 9)(2, FileUpload_div_1_ng_template_4_Conditional_1_ng_container_1_2_Template, 1, 0, null, 11);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.chooseIconTemplate && !ctx_r1._chooseIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.chooseIconTemplate || ctx_r1._chooseIconTemplate);
  }
}
function FileUpload_div_1_ng_template_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_1_ng_template_4_Conditional_1_span_0_Template, 1, 1, "span", 42)(1, FileUpload_div_1_ng_template_4_Conditional_1_ng_container_1_Template, 3, 2, "ng-container", 9);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r1.chooseIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.chooseIcon);
  }
}
function FileUpload_div_1_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_1_ng_template_4_Conditional_0_Template, 2, 2)(1, FileUpload_div_1_ng_template_4_Conditional_1_Template, 2, 2);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵconditional(ctx_r1.hasFiles() && !ctx_r1.auto ? 0 : 1);
  }
}
function FileUpload_div_1_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.cx("filelabel"));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.basicFileChosenLabel(), " ");
  }
}
function FileUpload_div_1_Conditional_8_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function FileUpload_div_1_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_1_Conditional_8_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 10);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.fileLabelTemplate || ctx_r1._fileLabelTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c132, ctx_r1.files));
  }
}
function FileUpload_div_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FileUpload_div_1_Conditional_8_Conditional_0_Template, 2, 3, "span", 44)(1, FileUpload_div_1_Conditional_8_Conditional_1_Template, 1, 4, "ng-container");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵconditional(!ctx_r1.fileLabelTemplate && !ctx_r1._fileLabelTemplate ? 0 : 1);
  }
}
function FileUpload_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 21);
    ɵɵrepeaterCreate(1, FileUpload_div_1_For_2_Template, 1, 2, "p-message", 14, ɵɵrepeaterTrackByIdentity);
    ɵɵelementStart(3, "p-button", 34);
    ɵɵlistener("onClick", function FileUpload_div_1_Template_p_button_onClick_3_listener() {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onBasicUploaderClick());
    })("keydown", function FileUpload_div_1_Template_p_button_keydown_3_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onBasicKeydown($event));
    });
    ɵɵtemplate(4, FileUpload_div_1_ng_template_4_Template, 2, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementStart(6, "input", 35, 3);
    ɵɵlistener("change", function FileUpload_div_1_Template_input_change_6_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFileSelect($event));
    })("focus", function FileUpload_div_1_Template_input_focus_6_listener() {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFocus());
    })("blur", function FileUpload_div_1_Template_input_blur_6_listener() {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onBlur());
    });
    ɵɵelementEnd()();
    ɵɵtemplate(8, FileUpload_div_1_Conditional_8_Template, 2, 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.styleClass);
    ɵɵproperty("ngClass", "p-fileupload p-fileupload-basic p-component");
    ɵɵattribute("data-pc-name", "fileupload");
    ɵɵadvance();
    ɵɵrepeater(ctx_r1.msgs);
    ɵɵadvance(2);
    ɵɵstyleMap(ctx_r1.style);
    ɵɵproperty("styleClass", "p-fileupload-choose-button " + ctx_r1.chooseStyleClass)("disabled", ctx_r1.disabled)("label", ctx_r1.chooseButtonLabel)("buttonProps", ctx_r1.chooseButtonProps);
    ɵɵadvance(3);
    ɵɵproperty("accept", ctx_r1.accept)("multiple", ctx_r1.multiple)("disabled", ctx_r1.disabled);
    ɵɵattribute("aria-label", ctx_r1.browseFilesLabel)("data-pc-section", "input");
    ɵɵadvance(2);
    ɵɵconditional(!ctx_r1.auto ? 8 : -1);
  }
}
var theme3 = ({
  dt
}) => `
.p-fileupload input[type="file"] {
    display: none;
}

.p-fileupload-advanced {
    border: 1px solid ${dt("fileupload.border.color")};
    border-radius: ${dt("fileupload.border.radius")};
    background: ${dt("fileupload.background")};
    color: ${dt("fileupload.color")};
}

.p-fileupload-header {
    display: flex;
    align-items: center;
    padding: ${dt("fileupload.header.padding")};
    background: ${dt("fileupload.header.background")};
    color: ${dt("fileupload.header.color")};
    border-style: solid;
    border-width: ${dt("fileupload.header.border.width")};
    border-color: ${dt("fileupload.header.border.color")};
    border-radius: ${dt("fileupload.header.border.radius")};
    gap: ${dt("fileupload.header.gap")};
}

.p-fileupload-content {
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    gap: ${dt("fileupload.content.gap")};
    transition: border-color ${dt("fileupload.transition.duration")};
    padding: ${dt("fileupload.content.padding")};
}

.p-fileupload-content .p-progressbar {
    width: 100%;
    height: ${dt("fileupload.progressbar.height")};
}

.p-fileupload-file-list {
    display: flex;
    flex-direction: column;
    gap: ${dt("fileupload.filelist.gap")};
}

.p-fileupload-file {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: ${dt("fileupload.file.padding")};
    border-bottom: 1px solid ${dt("fileupload.file.border.color")};
    gap: ${dt("fileupload.file.gap")};
}

.p-fileupload-file:last-child {
    border-bottom: 0;
}

.p-fileupload-file-info {
    display: flex;
    flex-direction: column;
    gap: ${dt("fileupload.file.info.gap")};
}

.p-fileupload-file-thumbnail {
    flex-shrink: 0;
}

.p-fileupload-file-actions {
    margin-left: auto;
}

.p-fileupload-highlight {
    border: 1px dashed ${dt("fileupload.content.highlight.border.color")};
}

.p-fileupload-advanced .p-message {
    margin-top: 0;
}

.p-fileupload-basic {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: ${dt("fileupload.basic.gap")};
}
`;
var classes3 = {
  root: ({
    instance
  }) => `p-fileupload p-fileupload-${instance.mode} p-component`,
  header: "p-fileupload-header",
  pcChooseButton: "p-fileupload-choose-button",
  pcUploadButton: "p-fileupload-upload-button",
  pcCancelButton: "p-fileupload-cancel-button",
  content: "p-fileupload-content",
  fileList: "p-fileupload-file-list",
  file: "p-fileupload-file",
  fileThumbnail: "p-fileupload-file-thumbnail",
  fileInfo: "p-fileupload-file-info",
  fileName: "p-fileupload-file-name",
  fileSize: "p-fileupload-file-size",
  pcFileBadge: "p-fileupload-file-badge",
  fileActions: "p-fileupload-file-actions",
  pcFileRemoveButton: "p-fileupload-file-remove-button"
};
var FileUploadStyle = class _FileUploadStyle extends BaseStyle {
  name = "fileupload";
  theme = theme3;
  classes = classes3;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵFileUploadStyle_BaseFactory;
    return function FileUploadStyle_Factory(__ngFactoryType__) {
      return (ɵFileUploadStyle_BaseFactory || (ɵFileUploadStyle_BaseFactory = ɵɵgetInheritedFactory(_FileUploadStyle)))(__ngFactoryType__ || _FileUploadStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _FileUploadStyle,
    factory: _FileUploadStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileUploadStyle, [{
    type: Injectable
  }], null, null);
})();
var FileUploadClasses;
(function(FileUploadClasses2) {
  FileUploadClasses2["root"] = "p-fileupload";
  FileUploadClasses2["header"] = "p-fileupload-header";
  FileUploadClasses2["pcChooseButton"] = "p-fileupload-choose-button";
  FileUploadClasses2["pcUploadButton"] = "p-fileupload-upload-button";
  FileUploadClasses2["pcCancelButton"] = "p-fileupload-cancel-button";
  FileUploadClasses2["content"] = "p-fileupload-content";
  FileUploadClasses2["fileList"] = "p-fileupload-file-list";
  FileUploadClasses2["file"] = "p-fileupload-file";
  FileUploadClasses2["fileThumbnail"] = "p-fileupload-file-thumbnail";
  FileUploadClasses2["fileInfo"] = "p-fileupload-file-info";
  FileUploadClasses2["fileName"] = "p-fileupload-file-name";
  FileUploadClasses2["fileSize"] = "p-fileupload-file-size";
  FileUploadClasses2["pcFileBadge"] = "p-fileupload-file-badge";
  FileUploadClasses2["fileActions"] = "p-fileupload-file-actions";
  FileUploadClasses2["pcFileRemoveButton"] = "p-fileupload-file-remove-button";
})(FileUploadClasses || (FileUploadClasses = {}));
var FileUpload = class _FileUpload extends BaseComponent {
  /**
   * Name of the request parameter to identify the files at backend.
   * @group Props
   */
  name;
  /**
   * Remote url to upload the files.
   * @group Props
   */
  url;
  /**
   * HTTP method to send the files to the url such as "post" and "put".
   * @group Props
   */
  method = "post";
  /**
   * Used to select multiple files at once from file dialog.
   * @group Props
   */
  multiple;
  /**
   * Comma-separated list of pattern to restrict the allowed file types. Can be any combination of either the MIME types (such as "image/*") or the file extensions (such as ".jpg").
   * @group Props
   */
  accept;
  /**
   * Disables the upload functionality.
   * @group Props
   */
  disabled;
  /**
   * When enabled, upload begins automatically after selection is completed.
   * @group Props
   */
  auto;
  /**
   * Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.
   * @group Props
   */
  withCredentials;
  /**
   * Maximum file size allowed in bytes.
   * @group Props
   */
  maxFileSize;
  /**
   * Summary message of the invalid file size.
   * @group Props
   */
  invalidFileSizeMessageSummary = "{0}: Invalid file size, ";
  /**
   * Detail message of the invalid file size.
   * @group Props
   */
  invalidFileSizeMessageDetail = "maximum upload size is {0}.";
  /**
   * Summary message of the invalid file type.
   * @group Props
   */
  invalidFileTypeMessageSummary = "{0}: Invalid file type, ";
  /**
   * Detail message of the invalid file type.
   * @group Props
   */
  invalidFileTypeMessageDetail = "allowed file types: {0}.";
  /**
   * Detail message of the invalid file type.
   * @group Props
   */
  invalidFileLimitMessageDetail = "limit is {0} at most.";
  /**
   * Summary message of the invalid file type.
   * @group Props
   */
  invalidFileLimitMessageSummary = "Maximum number of files exceeded, ";
  /**
   * Inline style of the element.
   * @group Props
   */
  style;
  /**
   * Class of the element.
   * @group Props
   */
  styleClass;
  /**
   * Width of the image thumbnail in pixels.
   * @group Props
   */
  previewWidth = 50;
  /**
   * Label of the choose button. Defaults to PrimeNG Locale configuration.
   * @group Props
   */
  chooseLabel;
  /**
   * Label of the upload button. Defaults to PrimeNG Locale configuration.
   * @group Props
   */
  uploadLabel;
  /**
   * Label of the cancel button. Defaults to PrimeNG Locale configuration.
   * @group Props
   */
  cancelLabel;
  /**
   * Icon of the choose button.
   * @group Props
   */
  chooseIcon;
  /**
   * Icon of the upload button.
   * @group Props
   */
  uploadIcon;
  /**
   * Icon of the cancel button.
   * @group Props
   */
  cancelIcon;
  /**
   * Whether to show the upload button.
   * @group Props
   */
  showUploadButton = true;
  /**
   * Whether to show the cancel button.
   * @group Props
   */
  showCancelButton = true;
  /**
   * Defines the UI of the component.
   * @group Props
   */
  mode = "advanced";
  /**
   * HttpHeaders class represents the header configuration options for an HTTP request.
   * @group Props
   */
  headers;
  /**
   * Whether to use the default upload or a manual implementation defined in uploadHandler callback. Defaults to PrimeNG Locale configuration.
   * @group Props
   */
  customUpload;
  /**
   * Maximum number of files that can be uploaded.
   * @group Props
   */
  fileLimit;
  /**
   * Style class of the upload button.
   * @group Props
   */
  uploadStyleClass;
  /**
   * Style class of the cancel button.
   * @group Props
   */
  cancelStyleClass;
  /**
   * Style class of the remove button.
   * @group Props
   */
  removeStyleClass;
  /**
   * Style class of the choose button.
   * @group Props
   */
  chooseStyleClass;
  /**
   * Used to pass all properties of the ButtonProps to the choose button inside the component.
   * @group Props
   */
  chooseButtonProps;
  /**
   * Used to pass all properties of the ButtonProps to the upload button inside the component.
   * @group Props
   */
  uploadButtonProps = {
    severity: "secondary"
  };
  /**
   * Used to pass all properties of the ButtonProps to the cancel button inside the component.
   * @group Props
   */
  cancelButtonProps = {
    severity: "secondary"
  };
  /**
   * Callback to invoke before file upload is initialized.
   * @param {FileBeforeUploadEvent} event - Custom upload event.
   * @group Emits
   */
  onBeforeUpload = new EventEmitter();
  /**
   * An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.
   * @param {FileSendEvent} event - Custom send event.
   * @group Emits
   */
  onSend = new EventEmitter();
  /**
   * Callback to invoke when file upload is complete.
   * @param {FileUploadEvent} event - Custom upload event.
   * @group Emits
   */
  onUpload = new EventEmitter();
  /**
   * Callback to invoke if file upload fails.
   * @param {FileUploadErrorEvent} event - Custom error event.
   * @group Emits
   */
  onError = new EventEmitter();
  /**
   * Callback to invoke when files in queue are removed without uploading using clear all button.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Callback to invoke when a file is removed without uploading using clear button of a file.
   * @param {FileRemoveEvent} event - Remove event.
   * @group Emits
   */
  onRemove = new EventEmitter();
  /**
   * Callback to invoke when files are selected.
   * @param {FileSelectEvent} event - Select event.
   * @group Emits
   */
  onSelect = new EventEmitter();
  /**
   * Callback to invoke when files are being uploaded.
   * @param {FileProgressEvent} event - Progress event.
   * @group Emits
   */
  onProgress = new EventEmitter();
  /**
   * Callback to invoke in custom upload mode to upload the files manually.
   * @param {FileUploadHandlerEvent} event - Upload handler event.
   * @group Emits
   */
  uploadHandler = new EventEmitter();
  /**
   * This event is triggered if an error occurs while loading an image file.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onImageError = new EventEmitter();
  /**
   * This event is triggered if an error occurs while loading an image file.
   * @param {RemoveUploadedFileEvent} event - Remove event.
   * @group Emits
   */
  onRemoveUploadedFile = new EventEmitter();
  /**
   * Template for file.
   * @group Templates
   */
  fileTemplate;
  /**
   * Template for header.
   * @group Templates
   */
  headerTemplate;
  /**
   * Template for content.
   * @group Templates
   */
  contentTemplate;
  /**
   * Template for toolbar.
   * @group Templates
   */
  toolbarTemplate;
  /**
   * Template for choose icon.
   * @group Templates
   */
  chooseIconTemplate;
  /**
   * Template for file label.
   * @group Templates
   */
  fileLabelTemplate;
  /**
   * Template for upload icon.
   * @group Templates
   */
  uploadIconTemplate;
  /**
   * Template for cancel icon.
   * @group Templates
   */
  cancelIconTemplate;
  /**
   * Template for empty state.
   * @group Templates
   */
  emptyTemplate;
  advancedFileInput;
  basicFileInput;
  content;
  set files(files) {
    this._files = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (this.validate(file)) {
        if (this.isImage(file)) {
          file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
        }
        this._files.push(files[i]);
      }
    }
  }
  get files() {
    return this._files;
  }
  get basicButtonLabel() {
    if (this.auto || !this.hasFiles()) {
      return this.chooseLabel;
    }
    return this.uploadLabel ?? this.files[0].name;
  }
  _files = [];
  progress = 0;
  dragHighlight;
  msgs;
  uploadedFileCount = 0;
  focus;
  uploading;
  duplicateIEEvent;
  // flag to recognize duplicate onchange event for file input
  translationSubscription;
  dragOverListener;
  uploadedFiles = [];
  sanitizer = inject(DomSanitizer);
  zone = inject(NgZone);
  http = inject(HttpClient);
  _componentStyle = inject(FileUploadStyle);
  ngOnInit() {
    super.ngOnInit();
    this.translationSubscription = this.config.translationObserver.subscribe(() => {
      this.cd.markForCheck();
    });
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (isPlatformBrowser(this.platformId)) {
      if (this.mode === "advanced") {
        this.zone.runOutsideAngular(() => {
          if (this.content) {
            this.dragOverListener = this.renderer.listen(this.content.nativeElement, "dragover", this.onDragOver.bind(this));
          }
        });
      }
    }
  }
  _headerTemplate;
  _contentTemplate;
  _toolbarTemplate;
  _chooseIconTemplate;
  _uploadIconTemplate;
  _cancelIconTemplate;
  _emptyTemplate;
  _fileTemplate;
  _fileLabelTemplate;
  templates;
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this._headerTemplate = item.template;
          break;
        case "file":
          this._fileTemplate = item.template;
          break;
        case "content":
          this._contentTemplate = item.template;
          break;
        case "toolbar":
          this._toolbarTemplate = item.template;
          break;
        case "chooseicon":
          this._chooseIconTemplate = item.template;
          break;
        case "uploadicon":
          this._uploadIconTemplate = item.template;
          break;
        case "cancelicon":
          this._cancelIconTemplate = item.template;
          break;
        case "empty":
          this._emptyTemplate = item.template;
          break;
        case "filelabel":
          this._fileLabelTemplate = item.template;
          break;
        default:
          this._fileTemplate = item.template;
          break;
      }
    });
  }
  basicFileChosenLabel() {
    if (this.auto) return this.chooseButtonLabel;
    else if (this.hasFiles()) {
      if (this.files && this.files.length === 1) return this.files[0].name;
      return this.config.getTranslation("fileChosenMessage")?.replace("{0}", this.files.length);
    }
    return this.config.getTranslation("noFileChosenMessage") || "";
  }
  getTranslation(option) {
    return this.config.getTranslation(option);
  }
  choose() {
    this.advancedFileInput?.nativeElement.click();
  }
  onFileSelect(event) {
    if (event.type !== "drop" && this.isIE11() && this.duplicateIEEvent) {
      this.duplicateIEEvent = false;
      return;
    }
    this.msgs = [];
    if (!this.multiple) {
      this.files = [];
    }
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (!this.isFileSelected(file)) {
        if (this.validate(file)) {
          if (this.isImage(file)) {
            file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
          }
          this.files.push(files[i]);
        }
      }
    }
    this.onSelect.emit({
      originalEvent: event,
      files,
      currentFiles: this.files
    });
    this.checkFileLimit(files);
    if (this.hasFiles() && this.auto && (this.mode !== "advanced" || !this.isFileLimitExceeded())) {
      this.upload();
    }
    if (event.type !== "drop" && this.isIE11()) {
      this.clearIEInput();
    } else {
      this.clearInputElement();
    }
  }
  isFileSelected(file) {
    for (let sFile of this.files) {
      if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) {
        return true;
      }
    }
    return false;
  }
  isIE11() {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.document.defaultView["MSInputMethodContext"] && !!this.document["documentMode"];
    }
  }
  validate(file) {
    this.msgs = this.msgs || [];
    if (this.accept && !this.isFileTypeValid(file)) {
      const text = `${this.invalidFileTypeMessageSummary.replace("{0}", file.name)} ${this.invalidFileTypeMessageDetail.replace("{0}", this.accept)}`;
      this.msgs.push({
        severity: "error",
        text
      });
      return false;
    }
    if (this.maxFileSize && file.size > this.maxFileSize) {
      const text = `${this.invalidFileSizeMessageSummary.replace("{0}", file.name)} ${this.invalidFileSizeMessageDetail.replace("{0}", this.formatSize(this.maxFileSize))}`;
      this.msgs.push({
        severity: "error",
        text
      });
      return false;
    }
    return true;
  }
  isFileTypeValid(file) {
    let acceptableTypes = this.accept?.split(",").map((type) => type.trim());
    for (let type of acceptableTypes) {
      let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
      if (acceptable) {
        return true;
      }
    }
    return false;
  }
  getTypeClass(fileType) {
    return fileType.substring(0, fileType.indexOf("/"));
  }
  isWildcard(fileType) {
    return fileType.indexOf("*") !== -1;
  }
  getFileExtension(file) {
    return "." + file.name.split(".").pop();
  }
  isImage(file) {
    return /^image\//.test(file.type);
  }
  onImageLoad(img) {
    window.URL.revokeObjectURL(img.src);
  }
  /**
   * Uploads the selected files.
   * @group Method
   */
  uploader() {
    if (this.customUpload) {
      if (this.fileLimit) {
        this.uploadedFileCount += this.files.length;
      }
      this.uploadHandler.emit({
        files: this.files
      });
      this.cd.markForCheck();
    } else {
      this.uploading = true;
      this.msgs = [];
      let formData = new FormData();
      this.onBeforeUpload.emit({
        formData
      });
      for (let i = 0; i < this.files.length; i++) {
        formData.append(this.name, this.files[i], this.files[i].name);
      }
      this.http.request(this.method, this.url, {
        body: formData,
        headers: this.headers,
        reportProgress: true,
        observe: "events",
        withCredentials: this.withCredentials
      }).subscribe((event) => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.onSend.emit({
              originalEvent: event,
              formData
            });
            break;
          case HttpEventType.Response:
            this.uploading = false;
            this.progress = 0;
            if (event["status"] >= 200 && event["status"] < 300) {
              if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
              }
              this.onUpload.emit({
                originalEvent: event,
                files: this.files
              });
            } else {
              this.onError.emit({
                files: this.files
              });
            }
            this.uploadedFiles.push(...this.files);
            this.clear();
            break;
          case HttpEventType.UploadProgress: {
            if (event["loaded"]) {
              this.progress = Math.round(event["loaded"] * 100 / event["total"]);
            }
            this.onProgress.emit({
              originalEvent: event,
              progress: this.progress
            });
            break;
          }
        }
        this.cd.markForCheck();
      }, (error) => {
        this.uploading = false;
        this.onError.emit({
          files: this.files,
          error
        });
      });
    }
  }
  /**
   * Clears the files list.
   * @group Method
   */
  clear() {
    this.files = [];
    this.uploadedFileCount = 0;
    this.onClear.emit();
    this.clearInputElement();
    this.msgs = [];
    this.cd.markForCheck();
  }
  /**
   * Removes a single file.
   * @param {Event} event - Browser event.
   * @param {Number} index - Index of the file.
   * @group Method
   */
  remove(event, index) {
    this.clearInputElement();
    this.onRemove.emit({
      originalEvent: event,
      file: this.files[index]
    });
    this.files.splice(index, 1);
    this.checkFileLimit(this.files);
  }
  /**
   * Removes uploaded file.
   * @param {Number} index - Index of the file to be removed.
   * @group Method
   */
  removeUploadedFile(index) {
    let removedFile = this.uploadedFiles.splice(index, 1)[0];
    this.uploadedFiles = [...this.uploadedFiles];
    this.onRemoveUploadedFile.emit({
      file: removedFile,
      files: this.uploadedFiles
    });
  }
  isFileLimitExceeded() {
    const isAutoMode = this.auto;
    const totalFileCount = isAutoMode ? this.files.length : this.files.length + this.uploadedFileCount;
    if (this.fileLimit && this.fileLimit <= totalFileCount && this.focus) {
      this.focus = false;
    }
    return this.fileLimit && this.fileLimit < totalFileCount;
  }
  isChooseDisabled() {
    if (this.auto) {
      return this.fileLimit && this.fileLimit <= this.files.length;
    } else {
      return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    }
  }
  checkFileLimit(files) {
    this.msgs ??= [];
    const hasExistingValidationMessages = this.msgs.length > 0 && this.fileLimit && this.fileLimit < files.length;
    if (this.isFileLimitExceeded() || hasExistingValidationMessages) {
      const text = `${this.invalidFileLimitMessageSummary.replace("{0}", this.fileLimit.toString())} ${this.invalidFileLimitMessageDetail.replace("{0}", this.fileLimit.toString())}`;
      this.msgs.push({
        severity: "error",
        text
      });
    } else {
      this.msgs = this.msgs.filter((msg) => !msg.text.includes(this.invalidFileLimitMessageSummary));
    }
  }
  clearInputElement() {
    if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
      this.advancedFileInput.nativeElement.value = "";
    }
    if (this.basicFileInput && this.basicFileInput.nativeElement) {
      this.basicFileInput.nativeElement.value = "";
    }
  }
  clearIEInput() {
    if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
      this.duplicateIEEvent = true;
      this.advancedFileInput.nativeElement.value = "";
    }
  }
  hasFiles() {
    return this.files && this.files.length > 0;
  }
  hasUploadedFiles() {
    return this.uploadedFiles && this.uploadedFiles.length > 0;
  }
  onDragEnter(e) {
    if (!this.disabled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  onDragOver(e) {
    if (!this.disabled) {
      addClass(this.content?.nativeElement, "p-fileupload-highlight");
      this.dragHighlight = true;
      e.stopPropagation();
      e.preventDefault();
    }
  }
  onDragLeave(event) {
    if (!this.disabled) {
      removeClass(this.content?.nativeElement, "p-fileupload-highlight");
    }
  }
  onDrop(event) {
    if (!this.disabled) {
      removeClass(this.content?.nativeElement, "p-fileupload-highlight");
      event.stopPropagation();
      event.preventDefault();
      let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      let allowDrop = this.multiple || files && files.length === 1;
      if (allowDrop) {
        this.onFileSelect(event);
      }
    }
  }
  onFocus() {
    this.focus = true;
  }
  onBlur() {
    this.focus = false;
  }
  formatSize(bytes) {
    const k = 1024;
    const dm = 3;
    const sizes = this.getTranslation(TranslationKeys.FILE_SIZE_TYPES);
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = (bytes / Math.pow(k, i)).toFixed(dm);
    return `${formattedSize} ${sizes[i]}`;
  }
  upload() {
    if (this.hasFiles()) this.uploader();
  }
  onBasicUploaderClick() {
    this.basicFileInput?.nativeElement.click();
  }
  onBasicKeydown(event) {
    switch (event.code) {
      case "Space":
      case "Enter":
        this.onBasicUploaderClick();
        event.preventDefault();
        break;
    }
  }
  imageError(event) {
    this.onImageError.emit(event);
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  get chooseButtonLabel() {
    return this.chooseLabel || this.config.getTranslation(TranslationKeys.CHOOSE);
  }
  get uploadButtonLabel() {
    return this.uploadLabel || this.config.getTranslation(TranslationKeys.UPLOAD);
  }
  get cancelButtonLabel() {
    return this.cancelLabel || this.config.getTranslation(TranslationKeys.CANCEL);
  }
  get browseFilesLabel() {
    return this.config.getTranslation(TranslationKeys.ARIA)[TranslationKeys.BROWSE_FILES];
  }
  get pendingLabel() {
    return this.config.getTranslation(TranslationKeys.PENDING);
  }
  ngOnDestroy() {
    if (this.content && this.content.nativeElement) {
      if (this.dragOverListener) {
        this.dragOverListener();
        this.dragOverListener = null;
      }
    }
    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵFileUpload_BaseFactory;
    return function FileUpload_Factory(__ngFactoryType__) {
      return (ɵFileUpload_BaseFactory || (ɵFileUpload_BaseFactory = ɵɵgetInheritedFactory(_FileUpload)))(__ngFactoryType__ || _FileUpload);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _FileUpload,
    selectors: [["p-fileupload"], ["p-fileUpload"]],
    contentQueries: function FileUpload_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c03, 4);
        ɵɵcontentQuery(dirIndex, _c13, 4);
        ɵɵcontentQuery(dirIndex, _c23, 4);
        ɵɵcontentQuery(dirIndex, _c32, 4);
        ɵɵcontentQuery(dirIndex, _c42, 4);
        ɵɵcontentQuery(dirIndex, _c52, 4);
        ɵɵcontentQuery(dirIndex, _c62, 4);
        ɵɵcontentQuery(dirIndex, _c7, 4);
        ɵɵcontentQuery(dirIndex, _c8, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.fileTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.toolbarTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.chooseIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.fileLabelTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.uploadIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.cancelIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function FileUpload_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c9, 5);
        ɵɵviewQuery(_c10, 5);
        ɵɵviewQuery(_c23, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.advancedFileInput = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.basicFileInput = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
      }
    },
    inputs: {
      name: "name",
      url: "url",
      method: "method",
      multiple: [2, "multiple", "multiple", booleanAttribute],
      accept: "accept",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      auto: [2, "auto", "auto", booleanAttribute],
      withCredentials: [2, "withCredentials", "withCredentials", booleanAttribute],
      maxFileSize: [2, "maxFileSize", "maxFileSize", numberAttribute],
      invalidFileSizeMessageSummary: "invalidFileSizeMessageSummary",
      invalidFileSizeMessageDetail: "invalidFileSizeMessageDetail",
      invalidFileTypeMessageSummary: "invalidFileTypeMessageSummary",
      invalidFileTypeMessageDetail: "invalidFileTypeMessageDetail",
      invalidFileLimitMessageDetail: "invalidFileLimitMessageDetail",
      invalidFileLimitMessageSummary: "invalidFileLimitMessageSummary",
      style: "style",
      styleClass: "styleClass",
      previewWidth: [2, "previewWidth", "previewWidth", numberAttribute],
      chooseLabel: "chooseLabel",
      uploadLabel: "uploadLabel",
      cancelLabel: "cancelLabel",
      chooseIcon: "chooseIcon",
      uploadIcon: "uploadIcon",
      cancelIcon: "cancelIcon",
      showUploadButton: [2, "showUploadButton", "showUploadButton", booleanAttribute],
      showCancelButton: [2, "showCancelButton", "showCancelButton", booleanAttribute],
      mode: "mode",
      headers: "headers",
      customUpload: [2, "customUpload", "customUpload", booleanAttribute],
      fileLimit: [2, "fileLimit", "fileLimit", (value) => numberAttribute(value, null)],
      uploadStyleClass: "uploadStyleClass",
      cancelStyleClass: "cancelStyleClass",
      removeStyleClass: "removeStyleClass",
      chooseStyleClass: "chooseStyleClass",
      chooseButtonProps: "chooseButtonProps",
      uploadButtonProps: "uploadButtonProps",
      cancelButtonProps: "cancelButtonProps",
      files: "files"
    },
    outputs: {
      onBeforeUpload: "onBeforeUpload",
      onSend: "onSend",
      onUpload: "onUpload",
      onError: "onError",
      onClear: "onClear",
      onRemove: "onRemove",
      onSelect: "onSelect",
      onProgress: "onProgress",
      uploadHandler: "uploadHandler",
      onImageError: "onImageError",
      onRemoveUploadedFile: "onRemoveUploadedFile"
    },
    features: [ɵɵProvidersFeature([FileUploadStyle]), ɵɵInheritDefinitionFeature],
    decls: 2,
    vars: 2,
    consts: [["advancedfileinput", ""], ["content", ""], ["icon", ""], ["basicfileinput", ""], [3, "ngClass", "ngStyle", "class", 4, "ngIf"], [3, "ngClass", "class", 4, "ngIf"], [3, "ngClass", "ngStyle"], ["type", "file", 3, "change", "multiple", "accept", "disabled"], [1, "p-fileupload-header"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngTemplateOutlet"], [1, "p-fileupload-content", 3, "dragenter", "dragleave", "drop"], [3, "value", "showValue", 4, "ngIf"], [3, "severity", "text"], ["class", "p-fileupload-file-list", 4, "ngIf"], [3, "focus", "blur", "onClick", "keydown.enter", "styleClass", "disabled", "label", "buttonProps"], [3, "class", 4, "ngIf"], [3, "label", "disabled", "styleClass", "buttonProps", "onClick", 4, "ngIf"], [3, "onClick", "label", "disabled", "styleClass", "buttonProps"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"], [3, "value", "showValue"], [1, "p-fileupload-file-list"], [1, "p-fileupload-file"], ["ngFor", "", 3, "ngForOf", "ngForTemplate"], ["class", "p-fileupload-file", 4, "ngFor", "ngForOf"], ["class", "p-fileupload-file-thumbnail", 3, "src", "width", "error", 4, "ngIf"], [1, "p-fileupload-file-info"], [1, "p-fileupload-file-name"], [1, "p-fileupload-file-size"], [1, "p-fileupload-file-actions"], ["text", "", "rounded", "", "severity", "danger", 3, "onClick", "disabled", "styleClass"], [1, "p-fileupload-file-thumbnail", 3, "error", "src", "width"], [3, "onClick", "keydown", "styleClass", "disabled", "label", "buttonProps"], ["type", "file", 3, "change", "focus", "blur", "accept", "multiple", "disabled"], ["class", "p-button-icon p-button-icon-left", 3, "ngClass", 4, "ngIf"], [1, "p-button-icon", "p-button-icon-left", 3, "ngClass"], [3, "styleClass", 4, "ngIf"], ["class", "p-button-icon p-button-icon-left", 4, "ngIf"], [3, "styleClass"], [1, "p-button-icon", "p-button-icon-left"], ["class", "p-button-icon p-button-icon-left pi", 3, "ngClass", 4, "ngIf"], [1, "p-button-icon", "p-button-icon-left", "pi", 3, "ngClass"], [3, "class"]],
    template: function FileUpload_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, FileUpload_div_0_Template, 15, 39, "div", 4)(1, FileUpload_div_1_Template, 9, 16, "div", 5);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", ctx.mode === "advanced");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.mode === "basic");
      }
    },
    dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, Button, ProgressBar, Message, PlusIcon, UploadIcon, TimesIcon, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileUpload, [{
    type: Component,
    args: [{
      selector: "p-fileupload, p-fileUpload",
      standalone: true,
      imports: [CommonModule, Button, ProgressBar, Message, PlusIcon, UploadIcon, TimesIcon, SharedModule],
      template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'" [attr.data-pc-name]="'fileupload'" [attr.data-pc-section]="'root'">
            <input
                [attr.aria-label]="browseFilesLabel"
                #advancedfileinput
                type="file"
                (change)="onFileSelect($event)"
                [multiple]="multiple"
                [accept]="accept"
                [disabled]="disabled || isChooseDisabled()"
                [attr.title]="''"
                [attr.data-pc-section]="'input'"
                [style.display]="'none'"
            />
            <div class="p-fileupload-header">
                <ng-container *ngIf="!headerTemplate && !_headerTemplate">
                    <p-button
                        [styleClass]="'p-fileupload-choose-button ' + chooseStyleClass"
                        [disabled]="disabled || isChooseDisabled()"
                        (focus)="onFocus()"
                        [label]="chooseButtonLabel"
                        (blur)="onBlur()"
                        (onClick)="choose()"
                        (keydown.enter)="choose()"
                        [attr.data-pc-section]="'choosebutton'"
                        [buttonProps]="chooseButtonProps"
                    >
                        <input
                            [attr.aria-label]="browseFilesLabel"
                            #advancedfileinput
                            type="file"
                            (change)="onFileSelect($event)"
                            [multiple]="multiple"
                            [accept]="accept"
                            [disabled]="disabled || isChooseDisabled()"
                            [attr.title]="''"
                            [attr.data-pc-section]="'input'"
                        />
                        <span *ngIf="chooseIcon" [class]="chooseIcon" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'"></span>
                        <ng-container *ngIf="!chooseIcon">
                            <PlusIcon *ngIf="!chooseIconTemplate && !_chooseIconTemplate" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'" />
                            <span *ngIf="chooseIconTemplate || _chooseIconTemplate" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'">
                                <ng-template *ngTemplateOutlet="chooseIconTemplate || _chooseIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>

                    <p-button
                        *ngIf="!auto && showUploadButton"
                        [label]="uploadButtonLabel"
                        (onClick)="upload()"
                        [disabled]="!hasFiles() || isFileLimitExceeded()"
                        [styleClass]="'p-fileupload-upload-button ' + uploadStyleClass"
                        [buttonProps]="uploadButtonProps"
                    >
                        <span *ngIf="uploadIcon" [ngClass]="uploadIcon" [attr.aria-hidden]="true"></span>
                        <ng-container *ngIf="!uploadIcon">
                            <UploadIcon *ngIf="!uploadIconTemplate && !_uploadIconTemplate" />
                            <span *ngIf="uploadIconTemplate || _uploadIconTemplate" [attr.aria-hidden]="true">
                                <ng-template *ngTemplateOutlet="uploadIconTemplate || _uploadIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>
                    <p-button *ngIf="!auto && showCancelButton" [label]="cancelButtonLabel" (onClick)="clear()" [disabled]="!hasFiles() || uploading" [styleClass]="'p-fileupload-cancel-button ' + cancelStyleClass" [buttonProps]="cancelButtonProps">
                        <span *ngIf="cancelIcon" [ngClass]="cancelIcon"></span>
                        <ng-container *ngIf="!cancelIcon">
                            <TimesIcon *ngIf="!cancelIconTemplate && !_cancelIconTemplate" [attr.aria-hidden]="true" />
                            <span *ngIf="cancelIconTemplate || _cancelIconTemplate" [attr.aria-hidden]="true">
                                <ng-template *ngTemplateOutlet="cancelIconTemplate || _cancelIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>
                </ng-container>
                <ng-container
                    *ngTemplateOutlet="
                        headerTemplate || _headerTemplate;
                        context: {
                            $implicit: files,
                            uploadedFiles: uploadedFiles,
                            chooseCallback: choose.bind(this),
                            clearCallback: clear.bind(this),
                            uploadCallback: upload.bind(this)
                        }
                    "
                ></ng-container>
                <ng-container *ngTemplateOutlet="toolbarTemplate || _toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [attr.data-pc-section]="'content'">
                <p-progressbar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressbar>
                @for (message of msgs; track message) {
                    <p-message [severity]="message.severity" [text]="message.text"></p-message>
                }

                <div class="p-fileupload-file-list" *ngIf="hasFiles()">
                    @if (!fileTemplate && !_fileTemplate) {
                        <div class="p-fileupload-file" *ngFor="let file of files; let i = index">
                            <img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" (error)="imageError($event)" class="p-fileupload-file-thumbnail" />
                            <div class="p-fileupload-file-info">
                                <div class="p-fileupload-file-name">{{ file.name }}</div>
                                <span class="p-fileupload-file-size">{{ formatSize(file.size) }}</span>
                            </div>
                            <div class="p-fileupload-file-actions">
                                <p-button (onClick)="remove($event, i)" [disabled]="uploading" text rounded severity="danger" [styleClass]="'p-fileupload-file-remove-button ' + removeStyleClass">
                                    <ng-template #icon>
                                        <TimesIcon *ngIf="!cancelIconTemplate && !_cancelIconTemplate" />
                                        <ng-template *ngTemplateOutlet="cancelIconTemplate || _cancelIconTemplate"></ng-template>
                                    </ng-template>
                                </p-button>
                            </div>
                        </div>
                    }
                    @if (fileTemplate || _fileTemplate) {
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate || _fileTemplate"></ng-template>
                    }
                </div>
                <ng-container
                    *ngTemplateOutlet="
                        contentTemplate || _contentTemplate;
                        context: {
                            $implicit: files,
                            uploadedFiles: uploadedFiles,
                            chooseCallback: choose.bind(this),
                            clearCallback: clear.bind(this),
                            removeUploadedFileCallback: removeUploadedFile.bind(this),
                            removeFileCallback: remove.bind(this),
                            progress: progress,
                            messages: msgs
                        }
                    "
                ></ng-container>
                @if ((emptyTemplate || _emptyTemplate) && !hasFiles() && !hasUploadedFiles()) {
                    <ng-container *ngTemplateOutlet="emptyTemplate || _emptyTemplate"></ng-container>
                }
            </div>
        </div>
        <div [ngClass]="'p-fileupload p-fileupload-basic p-component'" [class]="styleClass" *ngIf="mode === 'basic'" [attr.data-pc-name]="'fileupload'">
            @for (message of msgs; track message) {
                <p-message [severity]="message.severity" [text]="message.text"></p-message>
            }

            <p-button
                [styleClass]="'p-fileupload-choose-button ' + chooseStyleClass"
                [disabled]="disabled"
                [label]="chooseButtonLabel"
                [style]="style"
                (onClick)="onBasicUploaderClick()"
                (keydown)="onBasicKeydown($event)"
                [buttonProps]="chooseButtonProps"
            >
                <ng-template #icon>
                    @if (hasFiles() && !auto) {
                        <span *ngIf="uploadIcon" class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                        <ng-container *ngIf="!uploadIcon">
                            <UploadIcon *ngIf="!uploadIconTemplate && !_uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                            <span *ngIf="_uploadIconTemplate || uploadIconTemplate" class="p-button-icon p-button-icon-left">
                                <ng-template *ngTemplateOutlet="_uploadIconTemplate || uploadIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    } @else {
                        <span *ngIf="chooseIcon" class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                        <ng-container *ngIf="!chooseIcon">
                            <PlusIcon *ngIf="!chooseIconTemplate && !_chooseIconTemplate" [attr.data-pc-section]="'uploadicon'" />
                            <ng-template *ngTemplateOutlet="chooseIconTemplate || _chooseIconTemplate"></ng-template>
                        </ng-container>
                    }
                </ng-template>
                <input
                    [attr.aria-label]="browseFilesLabel"
                    #basicfileinput
                    type="file"
                    [accept]="accept"
                    [multiple]="multiple"
                    [disabled]="disabled"
                    (change)="onFileSelect($event)"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.data-pc-section]="'input'"
                />
            </p-button>
            @if (!auto) {
                @if (!fileLabelTemplate && !_fileLabelTemplate) {
                    <span [class]="cx('filelabel')">
                        {{ basicFileChosenLabel() }}
                    </span>
                } @else {
                    <ng-container *ngTemplateOutlet="fileLabelTemplate || _fileLabelTemplate; context: { $implicit: files }"></ng-container>
                }
            }
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [FileUploadStyle]
    }]
  }], null, {
    name: [{
      type: Input
    }],
    url: [{
      type: Input
    }],
    method: [{
      type: Input
    }],
    multiple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    accept: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    auto: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    withCredentials: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    maxFileSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    invalidFileSizeMessageSummary: [{
      type: Input
    }],
    invalidFileSizeMessageDetail: [{
      type: Input
    }],
    invalidFileTypeMessageSummary: [{
      type: Input
    }],
    invalidFileTypeMessageDetail: [{
      type: Input
    }],
    invalidFileLimitMessageDetail: [{
      type: Input
    }],
    invalidFileLimitMessageSummary: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    previewWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    chooseLabel: [{
      type: Input
    }],
    uploadLabel: [{
      type: Input
    }],
    cancelLabel: [{
      type: Input
    }],
    chooseIcon: [{
      type: Input
    }],
    uploadIcon: [{
      type: Input
    }],
    cancelIcon: [{
      type: Input
    }],
    showUploadButton: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showCancelButton: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    mode: [{
      type: Input
    }],
    headers: [{
      type: Input
    }],
    customUpload: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    fileLimit: [{
      type: Input,
      args: [{
        transform: (value) => numberAttribute(value, null)
      }]
    }],
    uploadStyleClass: [{
      type: Input
    }],
    cancelStyleClass: [{
      type: Input
    }],
    removeStyleClass: [{
      type: Input
    }],
    chooseStyleClass: [{
      type: Input
    }],
    chooseButtonProps: [{
      type: Input
    }],
    uploadButtonProps: [{
      type: Input
    }],
    cancelButtonProps: [{
      type: Input
    }],
    onBeforeUpload: [{
      type: Output
    }],
    onSend: [{
      type: Output
    }],
    onUpload: [{
      type: Output
    }],
    onError: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    onRemove: [{
      type: Output
    }],
    onSelect: [{
      type: Output
    }],
    onProgress: [{
      type: Output
    }],
    uploadHandler: [{
      type: Output
    }],
    onImageError: [{
      type: Output
    }],
    onRemoveUploadedFile: [{
      type: Output
    }],
    fileTemplate: [{
      type: ContentChild,
      args: ["file", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    toolbarTemplate: [{
      type: ContentChild,
      args: ["toolbar", {
        descendants: false
      }]
    }],
    chooseIconTemplate: [{
      type: ContentChild,
      args: ["chooseicon", {
        descendants: false
      }]
    }],
    fileLabelTemplate: [{
      type: ContentChild,
      args: ["filelabel", {
        descendants: false
      }]
    }],
    uploadIconTemplate: [{
      type: ContentChild,
      args: ["uploadicon", {
        descendants: false
      }]
    }],
    cancelIconTemplate: [{
      type: ContentChild,
      args: ["cancelicon", {
        descendants: false
      }]
    }],
    emptyTemplate: [{
      type: ContentChild,
      args: ["empty", {
        descendants: false
      }]
    }],
    advancedFileInput: [{
      type: ViewChild,
      args: ["advancedfileinput"]
    }],
    basicFileInput: [{
      type: ViewChild,
      args: ["basicfileinput"]
    }],
    content: [{
      type: ViewChild,
      args: ["content"]
    }],
    files: [{
      type: Input
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var FileUploadModule = class _FileUploadModule {
  static ɵfac = function FileUploadModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FileUploadModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FileUploadModule,
    imports: [FileUpload, SharedModule],
    exports: [FileUpload, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [FileUpload, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileUploadModule, [{
    type: NgModule,
    args: [{
      imports: [FileUpload, SharedModule],
      exports: [FileUpload, SharedModule]
    }]
  }], null, null);
})();
export {
  FileUpload,
  FileUploadClasses,
  FileUploadModule,
  FileUploadStyle
};
//# sourceMappingURL=primeng_fileupload.js.map
