import {
  Overlay
} from "./chunk-5LKVE72M.js";
import {
  Checkbox
} from "./chunk-CODOKU2K.js";
import {
  IconField,
  InputIcon
} from "./chunk-LNORIISF.js";
import {
  Scroller
} from "./chunk-45APTKAK.js";
import {
  Tooltip
} from "./chunk-WBBYEYQH.js";
import {
  InputText
} from "./chunk-6MYU3LLA.js";
import {
  ObjectUtils
} from "./chunk-NMOYQVAO.js";
import {
  AutoFocus
} from "./chunk-STA2ZUYP.js";
import {
  Ripple
} from "./chunk-5YORSMMS.js";
import {
  DomHandler
} from "./chunk-5G7WYC4N.js";
import {
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
  TimesCircleIcon,
  TimesIcon
} from "./chunk-PRIE2AJH.js";
import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import "./chunk-O4QYUEGA.js";
import "./chunk-SZJPLAKF.js";
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-SAJDAZDE.js";
import "./chunk-FXJ6C54V.js";
import {
  BaseStyle
} from "./chunk-UO5IQQ7M.js";
import {
  FilterService,
  Footer,
  Header,
  OverlayService,
  PrimeTemplate,
  SharedModule,
  TranslationKeys,
  deepEquals,
  equals,
  findLastIndex,
  findSingle,
  focus,
  getFirstFocusableElement,
  getFocusableElements,
  getLastFocusableElement,
  hasClass,
  isArray,
  isHidden,
  isNotEmpty,
  isPrintableCharacter,
  resolveFieldData,
  unblockBodyScroll,
  uuid
} from "./chunk-GNCTJO57.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-UCCE5RQP.js";
import "./chunk-B5QHEHR4.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-RFZ2BTTM.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-chip.mjs
var _c0 = ["removeicon"];
var _c1 = ["*"];
function Chip_img_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "img", 4);
    ɵɵlistener("error", function Chip_img_1_Template_img_error_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.imageError($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("src", ctx_r1.image, ɵɵsanitizeUrl)("alt", ctx_r1.alt);
  }
}
function Chip_ng_template_2_span_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 6);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.icon);
    ɵɵproperty("ngClass", "p-chip-icon");
    ɵɵattribute("data-pc-section", "icon");
  }
}
function Chip_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Chip_ng_template_2_span_0_Template, 1, 4, "span", 5);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r1.icon);
  }
}
function Chip_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 7);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "label");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.label);
  }
}
function Chip_ng_container_5_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 11);
    ɵɵlistener("click", function Chip_ng_container_5_ng_container_1_span_1_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.close($event));
    })("keydown", function Chip_ng_container_5_ng_container_1_span_1_Template_span_keydown_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onKeydown($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r1.removeIcon);
    ɵɵproperty("ngClass", "p-chip-remove-icon");
    ɵɵattribute("data-pc-section", "removeicon")("aria-label", ctx_r1.removeAriaLabel);
  }
}
function Chip_ng_container_5_ng_container_1_TimesCircleIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "TimesCircleIcon", 12);
    ɵɵlistener("click", function Chip_ng_container_5_ng_container_1_TimesCircleIcon_2_Template_TimesCircleIcon_click_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.close($event));
    })("keydown", function Chip_ng_container_5_ng_container_1_TimesCircleIcon_2_Template_TimesCircleIcon_keydown_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onKeydown($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵclassMap("p-chip-remove-icon");
    ɵɵattribute("data-pc-section", "removeicon")("aria-label", ctx_r1.removeAriaLabel);
  }
}
function Chip_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Chip_ng_container_5_ng_container_1_span_1_Template, 1, 5, "span", 9)(2, Chip_ng_container_5_ng_container_1_TimesCircleIcon_2_Template, 1, 4, "TimesCircleIcon", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.removeIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.removeIcon);
  }
}
function Chip_ng_container_5_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Chip_ng_container_5_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Chip_ng_container_5_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Chip_ng_container_5_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 13);
    ɵɵlistener("click", function Chip_ng_container_5_span_2_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.close($event));
    })("keydown", function Chip_ng_container_5_span_2_Template_span_keydown_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onKeydown($event));
    });
    ɵɵtemplate(1, Chip_ng_container_5_span_2_1_Template, 1, 0, null, 14);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "removeicon")("aria-label", ctx_r1.removeAriaLabel);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.removeIconTemplate || ctx_r1._removeIconTemplate);
  }
}
function Chip_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Chip_ng_container_5_ng_container_1_Template, 3, 2, "ng-container", 3)(2, Chip_ng_container_5_span_2_Template, 2, 3, "span", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.removeIconTemplate && !ctx_r1._removeIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.removeIconTemplate || ctx_r1._removeIconTemplate);
  }
}
var theme = ({
  dt
}) => `
.p-chip {
    display: inline-flex;
    align-items: center;
    background: ${dt("chip.background")};
    color: ${dt("chip.color")};
    border-radius: ${dt("chip.border.radius")};
    padding: ${dt("chip.padding.y")} ${dt("chip.padding.x")};
    gap: ${dt("chip.gap")};
}

.p-chip-icon {
    color: ${dt("chip.icon.color")};
    font-size: ${dt("chip.icon.font.size")};
    width: ${dt("chip.icon.size")};
    height: ${dt("chip.icon.size")};
}

.p-chip-image {
    border-radius: 50%;
    width: ${dt("chip.image.width")};
    height: ${dt("chip.image.height")};
    margin-left: calc(-1 * ${dt("chip.padding.y")});
}

.p-chip:has(.p-chip-remove-icon) {
    padding-inline-end: ${dt("chip.padding.y")};
}

.p-chip:has(.p-chip-image) {
    padding-top: calc(${dt("chip.padding.y")} / 2);
    padding-bottom: calc(${dt("chip.padding.y")} / 2);
}

.p-chip-remove-icon {
    cursor: pointer;
    font-size: ${dt("chip.remove.icon.font.size")};
    width: ${dt("chip.remove.icon.size")};
    height: ${dt("chip.remove.icon.size")};
    color: ${dt("chip.remove.icon.color")};
    border-radius: 50%;
    transition: outline-color ${dt("chip.transition.duration")}, box-shadow ${dt("chip.transition.duration")};
    outline-color: transparent;
}

.p-chip-remove-icon:focus-visible {
    box-shadow: ${dt("chip.remove.icon.focus.ring.shadow")};
    outline: ${dt("chip.remove.icon.focus.ring.width")} ${dt("chip.remove.icon.focus.ring.style")} ${dt("chip.remove.icon.focus.ring.color")};
    outline-offset: ${dt("chip.remove.icon.focus.ring.offset")};
}
`;
var classes = {
  root: "p-chip p-component",
  image: "p-chip-image",
  icon: "p-chip-icon",
  label: "p-chip-label",
  removeIcon: "p-chip-remove-icon"
};
var ChipStyle = class _ChipStyle extends BaseStyle {
  name = "chip";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵChipStyle_BaseFactory;
    return function ChipStyle_Factory(__ngFactoryType__) {
      return (ɵChipStyle_BaseFactory || (ɵChipStyle_BaseFactory = ɵɵgetInheritedFactory(_ChipStyle)))(__ngFactoryType__ || _ChipStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _ChipStyle,
    factory: _ChipStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipStyle, [{
    type: Injectable
  }], null, null);
})();
var ChipClasses;
(function(ChipClasses2) {
  ChipClasses2["root"] = "p-chip";
  ChipClasses2["image"] = "p-chip-image";
  ChipClasses2["icon"] = "p-chip-icon";
  ChipClasses2["label"] = "p-chip-label";
  ChipClasses2["removeIcon"] = "p-chip-remove-icon";
})(ChipClasses || (ChipClasses = {}));
var Chip = class _Chip extends BaseComponent {
  /**
   * Defines the text to display.
   * @group Props
   */
  label;
  /**
   * Defines the icon to display.
   * @group Props
   */
  icon;
  /**
   * Defines the image to display.
   * @group Props
   */
  image;
  /**
   * Alt attribute of the image.
   * @group Props
   */
  alt;
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
   * Whether to display a remove icon.
   * @group Props
   */
  removable = false;
  /**
   * Icon of the remove element.
   * @group Props
   */
  removeIcon;
  /**
   * Callback to invoke when a chip is removed.
   * @param {MouseEvent} event - Mouse event.
   * @group Emits
   */
  onRemove = new EventEmitter();
  /**
   * This event is triggered if an error occurs while loading an image file.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onImageError = new EventEmitter();
  visible = true;
  get removeAriaLabel() {
    return this.config.getTranslation(TranslationKeys.ARIA)["removeLabel"];
  }
  /**
   * Used to pass all properties of the chipProps to the Chip component.
   * @group Props
   */
  get chipProps() {
    return this._chipProps;
  }
  set chipProps(val) {
    this._chipProps = val;
    if (val && typeof val === "object") {
      Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
    }
  }
  _chipProps;
  _componentStyle = inject(ChipStyle);
  removeIconTemplate;
  templates;
  _removeIconTemplate;
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "removeicon":
          this._removeIconTemplate = item.template;
          break;
        default:
          this._removeIconTemplate = item.template;
          break;
      }
    });
  }
  ngOnChanges(simpleChanges) {
    super.ngOnChanges(simpleChanges);
    if (simpleChanges.chipProps && simpleChanges.chipProps.currentValue) {
      const {
        currentValue
      } = simpleChanges.chipProps;
      if (currentValue.label !== void 0) {
        this.label = currentValue.label;
      }
      if (currentValue.icon !== void 0) {
        this.icon = currentValue.icon;
      }
      if (currentValue.image !== void 0) {
        this.image = currentValue.image;
      }
      if (currentValue.alt !== void 0) {
        this.alt = currentValue.alt;
      }
      if (currentValue.style !== void 0) {
        this.style = currentValue.style;
      }
      if (currentValue.styleClass !== void 0) {
        this.styleClass = currentValue.styleClass;
      }
      if (currentValue.removable !== void 0) {
        this.removable = currentValue.removable;
      }
      if (currentValue.removeIcon !== void 0) {
        this.removeIcon = currentValue.removeIcon;
      }
    }
  }
  containerClass() {
    let classes3 = "p-chip p-component";
    if (this.styleClass) {
      classes3 += ` ${this.styleClass}`;
    }
    return classes3;
  }
  close(event) {
    this.visible = false;
    this.onRemove.emit(event);
  }
  onKeydown(event) {
    if (event.key === "Enter" || event.key === "Backspace") {
      this.close(event);
    }
  }
  imageError(event) {
    this.onImageError.emit(event);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵChip_BaseFactory;
    return function Chip_Factory(__ngFactoryType__) {
      return (ɵChip_BaseFactory || (ɵChip_BaseFactory = ɵɵgetInheritedFactory(_Chip)))(__ngFactoryType__ || _Chip);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Chip,
    selectors: [["p-chip"]],
    contentQueries: function Chip_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.removeIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 9,
    hostBindings: function Chip_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-pc-name", "chip")("aria-label", ctx.label)("data-pc-section", "root");
        ɵɵstyleMap(ctx.style);
        ɵɵclassMap(ctx.containerClass());
        ɵɵstyleProp("display", !ctx.visible && "none");
      }
    },
    inputs: {
      label: "label",
      icon: "icon",
      image: "image",
      alt: "alt",
      style: "style",
      styleClass: "styleClass",
      removable: [2, "removable", "removable", booleanAttribute],
      removeIcon: "removeIcon",
      chipProps: "chipProps"
    },
    outputs: {
      onRemove: "onRemove",
      onImageError: "onImageError"
    },
    features: [ɵɵProvidersFeature([ChipStyle]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
    ngContentSelectors: _c1,
    decls: 6,
    vars: 4,
    consts: [["iconTemplate", ""], ["class", "p-chip-image", 3, "src", "alt", "error", 4, "ngIf", "ngIfElse"], ["class", "p-chip-label", 4, "ngIf"], [4, "ngIf"], [1, "p-chip-image", 3, "error", "src", "alt"], [3, "class", "ngClass", 4, "ngIf"], [3, "ngClass"], [1, "p-chip-label"], ["tabindex", "0", "class", "p-chip-remove-icon", "role", "button", 3, "click", "keydown", 4, "ngIf"], ["tabindex", "0", "role", "button", 3, "class", "ngClass", "click", "keydown", 4, "ngIf"], ["tabindex", "0", "role", "button", 3, "class", "click", "keydown", 4, "ngIf"], ["tabindex", "0", "role", "button", 3, "click", "keydown", "ngClass"], ["tabindex", "0", "role", "button", 3, "click", "keydown"], ["tabindex", "0", "role", "button", 1, "p-chip-remove-icon", 3, "click", "keydown"], [4, "ngTemplateOutlet"]],
    template: function Chip_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
        ɵɵtemplate(1, Chip_img_1_Template, 1, 2, "img", 1)(2, Chip_ng_template_2_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(4, Chip_div_4_Template, 2, 2, "div", 2)(5, Chip_ng_container_5_Template, 3, 2, "ng-container", 3);
      }
      if (rf & 2) {
        const iconTemplate_r6 = ɵɵreference(3);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.image)("ngIfElse", iconTemplate_r6);
        ɵɵadvance(3);
        ɵɵproperty("ngIf", ctx.label);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.removable);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, TimesCircleIcon, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Chip, [{
    type: Component,
    args: [{
      selector: "p-chip",
      standalone: true,
      imports: [CommonModule, TimesCircleIcon, SharedModule],
      template: `
        <ng-content></ng-content>
        <img class="p-chip-image" [src]="image" *ngIf="image; else iconTemplate" (error)="imageError($event)" [alt]="alt" />
        <ng-template #iconTemplate><span *ngIf="icon" [class]="icon" [ngClass]="'p-chip-icon'" [attr.data-pc-section]="'icon'"></span></ng-template>
        <div class="p-chip-label" *ngIf="label" [attr.data-pc-section]="'label'">{{ label }}</div>
        <ng-container *ngIf="removable">
            <ng-container *ngIf="!removeIconTemplate && !_removeIconTemplate">
                <span
                    tabindex="0"
                    *ngIf="removeIcon"
                    [class]="removeIcon"
                    [ngClass]="'p-chip-remove-icon'"
                    [attr.data-pc-section]="'removeicon'"
                    (click)="close($event)"
                    (keydown)="onKeydown($event)"
                    [attr.aria-label]="removeAriaLabel"
                    role="button"
                ></span>
                <TimesCircleIcon tabindex="0" *ngIf="!removeIcon" [class]="'p-chip-remove-icon'" [attr.data-pc-section]="'removeicon'" (click)="close($event)" (keydown)="onKeydown($event)" [attr.aria-label]="removeAriaLabel" role="button" />
            </ng-container>
            <span *ngIf="removeIconTemplate || _removeIconTemplate" tabindex="0" [attr.data-pc-section]="'removeicon'" class="p-chip-remove-icon" (click)="close($event)" (keydown)="onKeydown($event)" [attr.aria-label]="removeAriaLabel" role="button">
                <ng-template *ngTemplateOutlet="removeIconTemplate || _removeIconTemplate"></ng-template>
            </span>
        </ng-container>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [ChipStyle],
      host: {
        "[class]": "containerClass()",
        "[style]": "style",
        "[style.display]": '!visible && "none"',
        "[attr.data-pc-name]": "'chip'",
        "[attr.aria-label]": "label",
        "[attr.data-pc-section]": "'root'"
      }
    }]
  }], null, {
    label: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    image: [{
      type: Input
    }],
    alt: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    removable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    removeIcon: [{
      type: Input
    }],
    onRemove: [{
      type: Output
    }],
    onImageError: [{
      type: Output
    }],
    chipProps: [{
      type: Input
    }],
    removeIconTemplate: [{
      type: ContentChild,
      args: ["removeicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var ChipModule = class _ChipModule {
  static ɵfac = function ChipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChipModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ChipModule,
    imports: [Chip, SharedModule],
    exports: [Chip, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Chip, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipModule, [{
    type: NgModule,
    args: [{
      imports: [Chip, SharedModule],
      exports: [Chip, SharedModule]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-multiselect.mjs
var _c02 = (a0) => ({
  height: a0
});
var _c12 = (a0, a1, a2) => ({
  "p-multiselect-option-selected": a0,
  "p-disabled": a1,
  "p-focus": a2
});
var _c2 = (a0) => ({
  $implicit: a0
});
var _c3 = (a0, a1) => ({
  checked: a0,
  class: a1
});
function MultiSelectItem_ng_container_2_ng_template_1_0_ng_template_0_Template(rf, ctx) {
}
function MultiSelectItem_ng_container_2_ng_template_1_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelectItem_ng_container_2_ng_template_1_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelectItem_ng_container_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelectItem_ng_container_2_ng_template_1_0_Template, 1, 0, null, 4);
  }
  if (rf & 2) {
    const klass_r1 = ctx.class;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemCheckboxIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c3, ctx_r1.selected, klass_r1));
  }
}
function MultiSelectItem_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelectItem_ng_container_2_ng_template_1_Template, 1, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function MultiSelectItem_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate((tmp_1_0 = ctx_r1.label) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : "empty");
  }
}
function MultiSelectItem_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c4 = ["item"];
var _c5 = ["group"];
var _c6 = ["loader"];
var _c7 = ["header"];
var _c8 = ["filter"];
var _c9 = ["footer"];
var _c10 = ["emptyfilter"];
var _c11 = ["empty"];
var _c122 = ["selecteditems"];
var _c13 = ["checkicon"];
var _c14 = ["loadingicon"];
var _c15 = ["filtericon"];
var _c16 = ["removetokenicon"];
var _c17 = ["chipicon"];
var _c18 = ["clearicon"];
var _c19 = ["dropdownicon"];
var _c20 = ["itemcheckboxicon"];
var _c21 = ["headercheckboxicon"];
var _c22 = ["overlay"];
var _c23 = ["filterInput"];
var _c24 = ["focusInput"];
var _c25 = ["items"];
var _c26 = ["scroller"];
var _c27 = ["lastHiddenFocusableEl"];
var _c28 = ["firstHiddenFocusableEl"];
var _c29 = ["headerCheckbox"];
var _c30 = [[["p-header"]], [["p-footer"]]];
var _c31 = ["p-header", "p-footer"];
var _c32 = () => ({
  class: "p-multiselect-chip-icon"
});
var _c33 = (a0, a1) => ({
  $implicit: a0,
  removeChip: a1
});
var _c34 = (a0) => ({
  options: a0
});
var _c35 = (a0, a1, a2) => ({
  checked: a0,
  partialSelected: a1,
  class: a2
});
var _c36 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
var _c37 = () => ({});
function MultiSelect_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.label() || "empty");
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵtextInterpolate1(" ", ctx_r1.getSelectedItemsLabel(), " ");
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 28);
    ɵɵlistener("click", function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r5);
      const item_r4 = ɵɵnextContext(4).$implicit;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.removeOption(item_r4, $event));
    });
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_ng_container_1_Template, 1, 0, "ng-container", 29);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(8);
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.chipIconTemplate || ctx_r1._chipIconTemplate || ctx_r1.removeTokenIconTemplate || ctx_r1._removeTokenIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction0(4, _c32));
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_span_1_Template, 2, 5, "span", 27);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(7);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.chipIconTemplate || ctx_r1._chipIconTemplate || ctx_r1.removeTokenIconTemplate || ctx_r1._removeTokenIconTemplate);
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_ng_container_0_Template, 2, 1, "ng-container", 20);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(6);
    ɵɵproperty("ngIf", !ctx_r1.disabled && !ctx_r1.readonly);
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_ng_template_1_Template, 1, 1, "ng-template", null, 5, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24, 4)(2, "p-chip", 26);
    ɵɵlistener("onRemove", function MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_Template_p_chip_onRemove_2_listener($event) {
      const item_r4 = ɵɵrestoreView(_r3).$implicit;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.removeOption(item_r4, $event));
    });
    ɵɵtemplate(3, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_ng_container_3_Template, 3, 0, "ng-container", 20);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance(2);
    ɵɵproperty("label", ctx_r1.getLabelByValue(item_r4))("removable", !ctx_r1.disabled && !ctx_r1.readonly)("removeIcon", ctx_r1.chipIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.chipIconTemplate || ctx_r1._chipIconTemplate || ctx_r1.removeTokenIconTemplate || ctx_r1._removeTokenIconTemplate);
  }
}
function MultiSelect_ng_container_5_ng_container_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_container_5_ng_container_2_Conditional_2_div_0_Template, 4, 4, "div", 25);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngForOf", ctx_r1.chipSelectedItems());
  }
}
function MultiSelect_ng_container_5_ng_container_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.placeholder() || ctx_r1.defaultLabel || "empty");
  }
}
function MultiSelect_ng_container_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_2_Conditional_1_Template, 1, 1)(2, MultiSelect_ng_container_5_ng_container_2_Conditional_2_Template, 1, 1, "div", 24)(3, MultiSelect_ng_container_5_ng_container_2_ng_container_3_Template, 2, 1, "ng-container", 20);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.chipSelectedItems() && ctx_r1.chipSelectedItems().length === ctx_r1.maxSelectedLabels ? 1 : 2);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.modelValue() || ctx_r1.modelValue().length === 0);
  }
}
function MultiSelect_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_5_ng_container_1_Template, 2, 1, "ng-container", 20)(2, MultiSelect_ng_container_5_ng_container_2_Template, 4, 2, "ng-container", 20);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.display === "comma");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.display === "chip");
  }
}
function MultiSelect_ng_container_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_container_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.placeholder() || ctx_r1.defaultLabel || "empty");
  }
}
function MultiSelect_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_6_ng_container_1_Template, 1, 0, "ng-container", 29)(2, MultiSelect_ng_container_6_ng_container_2_Template, 2, 1, "ng-container", 20);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.selectedItemsTemplate || ctx_r1._selectedItemsTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(3, _c33, ctx_r1.selectedOptions, ctx_r1.removeOption.bind(ctx_r1)));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.modelValue() || ctx_r1.modelValue().length === 0);
  }
}
function MultiSelect_ng_container_7_TimesIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "TimesIcon", 31);
    ɵɵlistener("click", function MultiSelect_ng_container_7_TimesIcon_1_Template_TimesIcon_click_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
  }
}
function MultiSelect_ng_container_7_span_2_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_container_7_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_container_7_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_container_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 31);
    ɵɵlistener("click", function MultiSelect_ng_container_7_span_2_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear($event));
    });
    ɵɵtemplate(1, MultiSelect_ng_container_7_span_2_1_Template, 1, 0, null, 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
function MultiSelect_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_7_TimesIcon_1_Template, 1, 2, "TimesIcon", 30)(2, MultiSelect_ng_container_7_span_2_Template, 2, 3, "span", 30);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.clearIconTemplate && !ctx_r1._clearIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
function MultiSelect_ng_container_9_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_container_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_9_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 32);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.loadingIconTemplate || ctx_r1._loadingIconTemplate);
  }
}
function MultiSelect_ng_container_9_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 35);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", "p-multiselect-loading-icon pi-spin " + ctx_r1.loadingIcon);
  }
}
function MultiSelect_ng_container_9_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 36);
  }
  if (rf & 2) {
    ɵɵclassMap("p-multiselect-loading-icon pi pi-spinner pi-spin");
  }
}
function MultiSelect_ng_container_9_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_9_ng_container_2_span_1_Template, 1, 1, "span", 33)(2, MultiSelect_ng_container_9_ng_container_2_span_2_Template, 1, 2, "span", 34);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.loadingIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.loadingIcon);
  }
}
function MultiSelect_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_9_ng_container_1_Template, 2, 1, "ng-container", 20)(2, MultiSelect_ng_container_9_ng_container_2_Template, 3, 2, "ng-container", 20);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.loadingIconTemplate || ctx_r1._loadingIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.loadingIconTemplate && !ctx_r1._loadingIconTemplate);
  }
}
function MultiSelect_ng_template_10_ng_container_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 40);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r1.dropdownIcon);
    ɵɵattribute("data-pc-section", "triggericon")("aria-hidden", true);
  }
}
function MultiSelect_ng_template_10_ng_container_0_ChevronDownIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ChevronDownIcon", 41);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-multiselect-dropdown-icon");
    ɵɵattribute("data-pc-section", "triggericon")("aria-hidden", true);
  }
}
function MultiSelect_ng_template_10_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_10_ng_container_0_span_1_Template, 1, 3, "span", 38)(2, MultiSelect_ng_template_10_ng_container_0_ChevronDownIcon_2_Template, 1, 3, "ChevronDownIcon", 39);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.dropdownIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.dropdownIcon);
  }
}
function MultiSelect_ng_template_10_span_1_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_10_span_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_10_span_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 42);
    ɵɵtemplate(1, MultiSelect_ng_template_10_span_1_1_Template, 1, 0, null, 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "triggericon")("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.dropdownIconTemplate || ctx_r1._dropdownIconTemplate);
  }
}
function MultiSelect_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_10_ng_container_0_Template, 3, 2, "ng-container", 20)(1, MultiSelect_ng_template_10_span_1_Template, 2, 3, "span", 37);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngIf", !ctx_r1.dropdownIconTemplate && !ctx_r1._dropdownIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.dropdownIconTemplate || ctx_r1._dropdownIconTemplate);
  }
}
function MultiSelect_ng_template_14_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_div_4_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_div_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_14_div_4_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 29);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.filterTemplate || ctx_r1._filterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c34, ctx_r1.filterOptions));
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_CheckIcon_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "CheckIcon", 41);
  }
  if (rf & 2) {
    const klass_r10 = ɵɵnextContext().class;
    ɵɵproperty("styleClass", klass_r10);
    ɵɵattribute("data-pc-section", "icon");
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_CheckIcon_0_Template, 1, 2, "CheckIcon", 39)(1, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_1_Template, 1, 0, null, 29);
  }
  if (rf & 2) {
    const klass_r10 = ctx.class;
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵproperty("ngIf", !ctx_r1.headerCheckboxIconTemplate && !ctx_r1._headerCheckboxIconTemplate && ctx_r1.allSelected());
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerCheckboxIconTemplate || ctx_r1._headerCheckboxIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(3, _c35, ctx_r1.allSelected(), ctx_r1.partialSelected(), klass_r10));
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-checkbox", 51, 10);
    ɵɵlistener("onChange", function MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_Template_p_checkbox_onChange_0_listener($event) {
      ɵɵrestoreView(_r9);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onToggleAll($event));
    });
    ɵɵtemplate(2, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_ng_template_2_Template, 2, 7, "ng-template", null, 11, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngModel", ctx_r1.allSelected())("ariaLabel", ctx_r1.toggleAllAriaLabel)("binary", true)("variant", ctx_r1.variant)("disabled", ctx_r1.disabled);
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_SearchIcon_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "SearchIcon", 41);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-multiselect-filter-icon");
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_span_6_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_span_6_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_div_4_ng_template_3_div_1_span_6_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 55);
    ɵɵtemplate(1, MultiSelect_ng_template_14_div_4_ng_template_3_div_1_span_6_1_Template, 1, 0, null, 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.filterIconTemplate || ctx_r1._filterIconTemplate);
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 52)(1, "p-iconfield")(2, "input", 53, 12);
    ɵɵlistener("input", function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_Template_input_input_2_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onFilterInputChange($event));
    })("keydown", function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_Template_input_keydown_2_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onFilterKeyDown($event));
    })("click", function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_Template_input_click_2_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onInputClick($event));
    })("blur", function MultiSelect_ng_template_14_div_4_ng_template_3_div_1_Template_input_blur_2_listener($event) {
      ɵɵrestoreView(_r11);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.onFilterBlur($event));
    });
    ɵɵelementEnd();
    ɵɵelementStart(4, "p-inputicon");
    ɵɵtemplate(5, MultiSelect_ng_template_14_div_4_ng_template_3_div_1_SearchIcon_5_Template, 1, 1, "SearchIcon", 39)(6, MultiSelect_ng_template_14_div_4_ng_template_3_div_1_span_6_Template, 2, 1, "span", 54);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance(2);
    ɵɵproperty("variant", ctx_r1.variant)("value", ctx_r1._filterValue() || "")("disabled", ctx_r1.disabled);
    ɵɵattribute("autocomplete", ctx_r1.autocomplete)("aria-owns", ctx_r1.id + "_list")("aria-activedescendant", ctx_r1.focusedOptionId)("placeholder", ctx_r1.filterPlaceHolder)("aria-label", ctx_r1.ariaFilterLabel);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", !ctx_r1.filterIconTemplate && !ctx_r1._filterIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.filterIconTemplate || ctx_r1._filterIconTemplate);
  }
}
function MultiSelect_ng_template_14_div_4_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_div_4_ng_template_3_p_checkbox_0_Template, 4, 5, "p-checkbox", 49)(1, MultiSelect_ng_template_14_div_4_ng_template_3_div_1_Template, 7, 10, "div", 50);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r1.showToggleAll && !ctx_r1.selectionLimit);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.filter);
  }
}
function MultiSelect_ng_template_14_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 48);
    ɵɵprojection(1);
    ɵɵtemplate(2, MultiSelect_ng_template_14_div_4_ng_container_2_Template, 2, 4, "ng-container", 22)(3, MultiSelect_ng_template_14_div_4_ng_template_3_Template, 2, 2, "ng-template", null, 9, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const builtInFilterElement_r12 = ɵɵreference(4);
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.filterTemplate || ctx_r1._filterTemplate)("ngIfElse", builtInFilterElement_r12);
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_p_scroller_6_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 29);
  }
  if (rf & 2) {
    const items_r14 = ctx.$implicit;
    const scrollerOptions_r15 = ctx.options;
    ɵɵnextContext(2);
    const buildInItems_r16 = ɵɵreference(9);
    ɵɵproperty("ngTemplateOutlet", buildInItems_r16)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c36, items_r14, scrollerOptions_r15));
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_container_4_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_container_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_p_scroller_6_ng_container_4_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 29);
  }
  if (rf & 2) {
    const scrollerOptions_r17 = ctx.options;
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.loaderTemplate || ctx_r1._loaderTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c34, scrollerOptions_r17));
  }
}
function MultiSelect_ng_template_14_p_scroller_6_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_14_p_scroller_6_ng_container_4_ng_template_1_Template, 1, 4, "ng-template", null, 14, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function MultiSelect_ng_template_14_p_scroller_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-scroller", 56, 13);
    ɵɵlistener("onLazyLoad", function MultiSelect_ng_template_14_p_scroller_6_Template_p_scroller_onLazyLoad_0_listener($event) {
      ɵɵrestoreView(_r13);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onLazyLoad.emit($event));
    });
    ɵɵtemplate(2, MultiSelect_ng_template_14_p_scroller_6_ng_template_2_Template, 1, 5, "ng-template", null, 3, ɵɵtemplateRefExtractor)(4, MultiSelect_ng_template_14_p_scroller_6_ng_container_4_Template, 3, 0, "ng-container", 20);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵstyleMap(ɵɵpureFunction1(9, _c02, ctx_r1.scrollHeight));
    ɵɵproperty("items", ctx_r1.visibleOptions())("itemSize", ctx_r1.virtualScrollItemSize || ctx_r1._itemSize)("autoSize", true)("tabindex", -1)("lazy", ctx_r1.lazy)("options", ctx_r1.virtualScrollOptions);
    ɵɵadvance(4);
    ɵɵproperty("ngIf", ctx_r1.loaderTemplate || ctx_r1._loaderTemplate);
  }
}
function MultiSelect_ng_template_14_ng_container_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_14_ng_container_7_ng_container_1_Template, 1, 0, "ng-container", 29);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const buildInItems_r16 = ɵɵreference(9);
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", buildInItems_r16)("ngTemplateOutletContext", ɵɵpureFunction2(3, _c36, ctx_r1.visibleOptions(), ɵɵpureFunction0(2, _c37)));
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r18 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.getOptionGroupLabel(option_r18.optionGroup));
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "li", 60);
    ɵɵtemplate(2, MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_span_2_Template, 2, 1, "span", 20)(3, MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 29);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r18 = ɵɵnextContext();
    const option_r18 = ctx_r18.$implicit;
    const i_r20 = ctx_r18.index;
    const scrollerOptions_r21 = ɵɵnextContext().options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngStyle", ɵɵpureFunction1(5, _c02, scrollerOptions_r21.itemSize + "px"));
    ɵɵattribute("id", ctx_r1.id + "_" + ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.groupTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.groupTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(7, _c2, option_r18.optionGroup));
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "p-multiselect-item", 61);
    ɵɵlistener("onClick", function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_1_Template_p_multiselect_item_onClick_1_listener($event) {
      ɵɵrestoreView(_r22);
      const i_r20 = ɵɵnextContext().index;
      const scrollerOptions_r21 = ɵɵnextContext().options;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onOptionSelect($event, false, ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21)));
    })("onMouseEnter", function MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_1_Template_p_multiselect_item_onMouseEnter_1_listener($event) {
      ɵɵrestoreView(_r22);
      const i_r20 = ɵɵnextContext().index;
      const scrollerOptions_r21 = ɵɵnextContext().options;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onOptionMouseEnter($event, ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21)));
    });
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r18 = ɵɵnextContext();
    const option_r18 = ctx_r18.$implicit;
    const i_r20 = ctx_r18.index;
    const scrollerOptions_r21 = ɵɵnextContext().options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("id", ctx_r1.id + "_" + ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21))("option", option_r18)("selected", ctx_r1.isSelected(option_r18))("label", ctx_r1.getOptionLabel(option_r18))("disabled", ctx_r1.isOptionDisabled(option_r18))("template", ctx_r1.itemTemplate || ctx_r1._itemTemplate)("checkIconTemplate", ctx_r1.checkIconTemplate || ctx_r1._checkIconTemplate)("itemCheckboxIconTemplate", ctx_r1.itemCheckboxIconTemplate || ctx_r1._itemCheckboxIconTemplate)("itemSize", scrollerOptions_r21.itemSize)("focused", ctx_r1.focusedOptionIndex() === ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21))("ariaPosInset", ctx_r1.getAriaPosInset(ctx_r1.getOptionIndex(i_r20, scrollerOptions_r21)))("ariaSetSize", ctx_r1.ariaSetSize)("variant", ctx_r1.variant)("highlightOnSelect", ctx_r1.highlightOnSelect);
  }
}
function MultiSelect_ng_template_14_ng_template_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_0_Template, 4, 9, "ng-container", 20)(1, MultiSelect_ng_template_14_ng_template_8_ng_template_2_ng_container_1_Template, 2, 14, "ng-container", 20);
  }
  if (rf & 2) {
    const option_r18 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r1.isOptionGroup(option_r18));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.isOptionGroup(option_r18));
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵtextInterpolate1(" ", ctx_r1.emptyFilterMessageLabel, " ");
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 32);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.emptyFilterTemplate || ctx_r1._emptyFilterTemplate || ctx_r1.emptyTemplate || ctx_r1._emptyFilterTemplate);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 62);
    ɵɵtemplate(1, MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_1_Template, 1, 1)(2, MultiSelect_ng_template_14_ng_template_8_li_3_Conditional_2_Template, 1, 1, "ng-container");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r21 = ɵɵnextContext().options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(2, _c02, scrollerOptions_r21.itemSize + "px"));
    ɵɵadvance();
    ɵɵconditional(!ctx_r1.emptyFilterTemplate && !ctx_r1._emptyFilterTemplate && !ctx_r1.emptyTemplate && !ctx_r1._emptyTemplate ? 1 : 2);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵtextInterpolate1(" ", ctx_r1.emptyMessageLabel, " ");
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 32);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.emptyTemplate || ctx_r1._emptyTemplate);
  }
}
function MultiSelect_ng_template_14_ng_template_8_li_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 62);
    ɵɵtemplate(1, MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_1_Template, 1, 1)(2, MultiSelect_ng_template_14_ng_template_8_li_4_Conditional_2_Template, 1, 1, "ng-container");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r21 = ɵɵnextContext().options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(2, _c02, scrollerOptions_r21.itemSize + "px"));
    ɵɵadvance();
    ɵɵconditional(!ctx_r1.emptyTemplate && !ctx_r1._emptyTemplate ? 1 : 2);
  }
}
function MultiSelect_ng_template_14_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 57, 15);
    ɵɵtemplate(2, MultiSelect_ng_template_14_ng_template_8_ng_template_2_Template, 2, 2, "ng-template", 58)(3, MultiSelect_ng_template_14_ng_template_8_li_3_Template, 3, 4, "li", 59)(4, MultiSelect_ng_template_14_ng_template_8_li_4_Template, 3, 4, "li", 59);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const items_r23 = ctx.$implicit;
    const scrollerOptions_r21 = ctx.options;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵstyleMap(scrollerOptions_r21.contentStyle);
    ɵɵproperty("ngClass", scrollerOptions_r21.contentStyleClass);
    ɵɵattribute("aria-label", ctx_r1.listLabel);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", items_r23);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.hasFilter() && ctx_r1.isEmpty());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.hasFilter() && ctx_r1.isEmpty());
  }
}
function MultiSelect_ng_template_14_div_10_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_14_div_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵprojection(1, 1);
    ɵɵtemplate(2, MultiSelect_ng_template_14_div_10_ng_container_2_Template, 1, 0, "ng-container", 32);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.footerTemplate || ctx_r1._footerTemplate);
  }
}
function MultiSelect_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 43)(1, "span", 44, 6);
    ɵɵlistener("focus", function MultiSelect_ng_template_14_Template_span_focus_1_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFirstHiddenFocus($event));
    });
    ɵɵelementEnd();
    ɵɵtemplate(3, MultiSelect_ng_template_14_ng_container_3_Template, 1, 0, "ng-container", 32)(4, MultiSelect_ng_template_14_div_4_Template, 5, 2, "div", 45);
    ɵɵelementStart(5, "div", 46);
    ɵɵtemplate(6, MultiSelect_ng_template_14_p_scroller_6_Template, 5, 11, "p-scroller", 47)(7, MultiSelect_ng_template_14_ng_container_7_Template, 2, 6, "ng-container", 20)(8, MultiSelect_ng_template_14_ng_template_8_Template, 5, 7, "ng-template", null, 7, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵtemplate(10, MultiSelect_ng_template_14_div_10_Template, 3, 1, "div", 20);
    ɵɵelementStart(11, "span", 44, 8);
    ɵɵlistener("focus", function MultiSelect_ng_template_14_Template_span_focus_11_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onLastHiddenFocus($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.panelStyleClass);
    ɵɵproperty("ngClass", "p-multiselect-overlay p-component")("ngStyle", ctx_r1.panelStyle);
    ɵɵattribute("id", ctx_r1.id + "_list");
    ɵɵadvance();
    ɵɵattribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showHeader);
    ɵɵadvance();
    ɵɵstyleProp("max-height", ctx_r1.virtualScroll ? "auto" : ctx_r1.scrollHeight || "auto");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.virtualScroll);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.virtualScroll);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r1.footerFacet || ctx_r1.footerTemplate || ctx_r1._footerTemplate);
    ɵɵadvance();
    ɵɵattribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
  }
}
var theme2 = ({
  dt
}) => `
.p-multiselect {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    background: ${dt("multiselect.background")};
    border: 1px solid ${dt("multiselect.border.color")};
    transition: background ${dt("multiselect.transition.duration")}, color ${dt("multiselect.transition.duration")}, border-color ${dt("multiselect.transition.duration")}, outline-color ${dt("multiselect.transition.duration")}, box-shadow ${dt("multiselect.transition.duration")};
    border-radius: ${dt("multiselect.border.radius")};
    outline-color: transparent;
    box-shadow: ${dt("multiselect.shadow")};
}

.p-multiselect.ng-invalid.ng-dirty {
    border-color: ${dt("multiselect.invalid.border.color")};
}

.p-multiselect:not(.p-disabled):hover {
    border-color: ${dt("multiselect.hover.border.color")};
}

.p-multiselect:not(.p-disabled).p-focus {
    border-color: ${dt("multiselect.focus.border.color")};
    box-shadow: ${dt("multiselect.focus.ring.shadow")};
    outline: ${dt("multiselect.focus.ring.width")} ${dt("multiselect.focus.ring.style")} ${dt("multiselect.focus.ring.color")};
    outline-offset: ${dt("multiselect.focus.ring.offset")};
}

.p-multiselect.p-variant-filled {
    background: ${dt("multiselect.filled.background")};
}

.p-multiselect.p-variant-filled:not(.p-disabled):hover {
    background: ${dt("multiselect.filled.hover.background")};
}

.p-multiselect.p-variant-filled.p-focus {
    background: ${dt("multiselect.filled.focus.background")};
}

.p-multiselect.p-disabled {
    opacity: 1;
    background: ${dt("multiselect.disabled.background")};
}

.p-multiselect-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt("multiselect.dropdown.color")};
    width: ${dt("multiselect.dropdown.width")};
    border-start-end-radius: ${dt("multiselect.border.radius")};
    border-end-end-radius: ${dt("multiselect.border.radius")};
}

.p-multiselect-label-container {
    overflow: hidden;
    flex: 1 1 auto;
    cursor: pointer;
}

.p-multiselect-label {
    display: flex;
    align-items-center;
    gap: calc(${dt("multiselect.padding.y")} / 2);
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: ${dt("multiselect.padding.y")} ${dt("multiselect.padding.x")};
    color: ${dt("multiselect.color")};
}

.p-multiselect-label.p-placeholder {
    color: ${dt("multiselect.placeholder.color")};
}

p-multiSelect.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder,
p-multi-select.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder,
p-multiselect.ng-invalid.ng-dirty .p-multiselect-label.p-placeholder {
    color: ${dt("multiselect.invalid.placeholder.color")};
}

.p-multiselect.p-disabled .p-multiselect-label {
    color: ${dt("multiselect.disabled.color")};
}

.p-multiselect-label-empty {
    overflow: hidden;
    visibility: hidden;
}

.p-multiselect .p-multiselect-overlay {
    min-width: 100%;
}

.p-multiselect-overlay {
    background: ${dt("multiselect.overlay.background")};
    color: ${dt("multiselect.overlay.color")};
    border: 1px solid ${dt("multiselect.overlay.border.color")};
    border-radius: ${dt("multiselect.overlay.border.radius")};
    box-shadow: ${dt("multiselect.overlay.shadow")};
}

.p-multiselect-header {
    display: flex;
    align-items: center;
    padding: ${dt("multiselect.list.header.padding")};
}

.p-multiselect-header .p-checkbox {
    margin-inline-end: ${dt("multiselect.option.gap")};
}

.p-multiselect-filter-container {
    flex: 1 1 auto;
}

.p-multiselect-filter {
    width: 100%;
}

.p-multiselect-list-container {
    overflow: auto;
}

.p-multiselect-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: ${dt("multiselect.list.padding")};
    display: flex;
    flex-direction: column;
    gap: ${dt("multiselect.list.gap")}
}

.p-multiselect-option {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: ${dt("multiselect.option.gap")};
    padding: ${dt("multiselect.option.padding")};
    border: 0 none;
    color: ${dt("multiselect.option.color")};
    background: transparent;
    transition: background ${dt("multiselect.transition.duration")}, color ${dt("multiselect.transition.duration")}, border-color ${dt("multiselect.transition.duration")}, box-shadow ${dt("multiselect.transition.duration")}, outline-color ${dt("multiselect.transition.duration")};
    border-radius: ${dt("multiselect.option.border.radius")}
}

.p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {
    background: ${dt("multiselect.option.focus.background")};
    color: ${dt("multiselect.option.focus.color")};
}

.p-multiselect-option.p-multiselect-option-selected {
    background: ${dt("multiselect.option.selected.background")};
    color: ${dt("multiselect.option.selected.color")};
}

.p-multiselect-option.p-multiselect-option-selected.p-focus {
    background: ${dt("multiselect.option.selected.focus.background")};
    color: ${dt("multiselect.option.selected.focus.color")};
}

.p-multiselect-option-group {
    cursor: auto;
    margin: 0;
    padding: ${dt("multiselect.option.group.padding")};
    background: ${dt("multiselect.option.group.background")};
    color: ${dt("multiselect.option.group.color")};
    font-weight: ${dt("multiselect.option.group.font.weight")};
}

.p-multiselect-empty-message {
    padding: ${dt("multiselect.empty.message.padding")};
}

.p-multiselect-label .p-chip {
    padding-top: calc(${dt("multiselect.padding.y")} / 2);
    padding-bottom: calc(${dt("multiselect.padding.y")} / 2);
    border-radius: ${dt("multiselect.chip.border.radius")};
}

.p-multiselect-label:has(.p-chip) {
    padding: calc(${dt("multiselect.padding.y")} / 2) calc(${dt("multiselect.padding.x")} / 2);
}

.p-multiselect-fluid {
    display: flex;
}

.p-multiselect-sm .p-multiselect-label {
    font-size: ${dt("multiselect.sm.font.size")};
    padding-block: ${dt("multiselect.sm.padding.y")};
    padding-inline: ${dt("multiselect.sm.padding.x")};
}

.p-multiselect-sm .p-multiselect-dropdown .p-icon {
    font-size: ${dt("multiselect.sm.font.size")};
    width: ${dt("multiselect.sm.font.size")};
    height: ${dt("multiselect.sm.font.size")};
}

.p-multiselect-lg .p-multiselect-label {
    font-size: ${dt("multiselect.lg.font.size")};
    padding-block: ${dt("multiselect.lg.padding.y")};
    padding-inline: ${dt("multiselect.lg.padding.x")};
}

.p-multiselect-lg .p-multiselect-dropdown .p-icon {
    font-size: ${dt("multiselect.lg.font.size")};
    width: ${dt("multiselect.lg.font.size")};
    height: ${dt("multiselect.lg.font.size")};
}

.p-multiselect-clear-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt("multiselect.clear.icon.color")};
}`;
var inlineStyles = {
  root: ({
    props
  }) => ({
    position: props.appendTo === "self" ? "relative" : void 0
  })
};
var classes2 = {
  root: ({
    instance
  }) => ({
    "p-multiselect p-component p-inputwrapper": true,
    "p-multiselect-display-chip": instance.display === "chip",
    "p-disabled": instance.disabled,
    "p-invalid": instance.invalid,
    "p-variant-filled": instance.variant ? instance.variant === "filled" : instance.config.inputStyle === "filled",
    "p-focus": instance.focused,
    "p-inputwrapper-filled": instance.filled,
    "p-inputwrapper-focus": instance.focused || instance.overlayVisible,
    "p-multiselect-open": instance.overlayVisible,
    "p-multiselect-fluid": instance.hasFluid,
    "p-multiselect-sm p-inputfield-sm": instance.size === "small",
    "p-multiselect-lg p-inputfield-lg": instance.size === "large"
  }),
  labelContainer: "p-multiselect-label-container",
  label: ({
    instance
  }) => ({
    "p-multiselect-label": true,
    "p-placeholder": instance.label() === instance.placeholder(),
    "p-multiselect-label-empty": !instance.placeholder() && !instance.defaultLabel && (!instance.modelValue() || instance.modelValue().length === 0)
  }),
  chipItem: "p-multiselect-chip-item",
  pcChip: "p-multiselect-chip",
  chipIcon: "p-multiselect-chip-icon",
  dropdown: "p-multiselect-dropdown",
  loadingIcon: "p-multiselect-loading-icon",
  dropdownIcon: "p-multiselect-dropdown-icon",
  overlay: "p-multiselect-overlay p-component",
  header: "p-multiselect-header",
  pcFilterContainer: "p-multiselect-filter-container",
  pcFilter: "p-multiselect-filter",
  listContainer: "p-multiselect-list-container",
  list: "p-multiselect-list",
  optionGroup: "p-multiselect-option-group",
  option: ({
    instance,
    option,
    index,
    getItemOptions
  }) => ({
    "p-multiselect-option": true,
    "p-multiselect-option-selected": instance.isSelected(option) && instance.highlightOnSelect,
    "p-focus": instance.focusedOptionIndex === instance.getOptionIndex(index, getItemOptions),
    "p-disabled": instance.isOptionDisabled(option)
  }),
  emptyMessage: "p-multiselect-empty-message"
};
var MultiSelectStyle = class _MultiSelectStyle extends BaseStyle {
  name = "multiselect";
  theme = theme2;
  classes = classes2;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMultiSelectStyle_BaseFactory;
    return function MultiSelectStyle_Factory(__ngFactoryType__) {
      return (ɵMultiSelectStyle_BaseFactory || (ɵMultiSelectStyle_BaseFactory = ɵɵgetInheritedFactory(_MultiSelectStyle)))(__ngFactoryType__ || _MultiSelectStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _MultiSelectStyle,
    factory: _MultiSelectStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectStyle, [{
    type: Injectable
  }], null, null);
})();
var MultiSelectClasses;
(function(MultiSelectClasses2) {
  MultiSelectClasses2["root"] = "p-multiselect";
  MultiSelectClasses2["labelContainer"] = "p-multiselect-label-container";
  MultiSelectClasses2["label"] = "p-multiselect-label";
  MultiSelectClasses2["chipItem"] = "p-multiselect-chip-item";
  MultiSelectClasses2["pcChip"] = "p-multiselect-chip";
  MultiSelectClasses2["chipIcon"] = "p-multiselect-chip-icon";
  MultiSelectClasses2["dropdown"] = "p-multiselect-dropdown";
  MultiSelectClasses2["loadingIcon"] = "p-multiselect-loading-icon";
  MultiSelectClasses2["dropdownIcon"] = "p-multiselect-dropdown-icon";
  MultiSelectClasses2["overlay"] = "p-multiselect-overlay";
  MultiSelectClasses2["header"] = "p-multiselect-header";
  MultiSelectClasses2["pcFilterContainer"] = "p-multiselect-filter-container";
  MultiSelectClasses2["pcFilter"] = "p-multiselect-filter";
  MultiSelectClasses2["listContainer"] = "p-multiselect-list-container";
  MultiSelectClasses2["list"] = "p-multiselect-list";
  MultiSelectClasses2["optionGroup"] = "p-multiselect-option-group";
  MultiSelectClasses2["option"] = "p-multiselect-option";
  MultiSelectClasses2["emptyMessage"] = "p-multiselect-empty-message";
})(MultiSelectClasses || (MultiSelectClasses = {}));
var MULTISELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelect),
  multi: true
};
var MultiSelectItem = class _MultiSelectItem extends BaseComponent {
  id;
  option;
  selected;
  label;
  disabled;
  itemSize;
  focused;
  ariaPosInset;
  ariaSetSize;
  variant;
  template;
  checkIconTemplate;
  itemCheckboxIconTemplate;
  highlightOnSelect;
  onClick = new EventEmitter();
  onMouseEnter = new EventEmitter();
  onOptionClick(event) {
    this.onClick.emit({
      originalEvent: event,
      option: this.option,
      selected: this.selected
    });
    event.stopPropagation();
    event.preventDefault();
  }
  onOptionMouseEnter(event) {
    this.onMouseEnter.emit({
      originalEvent: event,
      option: this.option,
      selected: this.selected
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMultiSelectItem_BaseFactory;
    return function MultiSelectItem_Factory(__ngFactoryType__) {
      return (ɵMultiSelectItem_BaseFactory || (ɵMultiSelectItem_BaseFactory = ɵɵgetInheritedFactory(_MultiSelectItem)))(__ngFactoryType__ || _MultiSelectItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MultiSelectItem,
    selectors: [["p-multiSelectItem"], ["p-multiselect-item"]],
    inputs: {
      id: "id",
      option: "option",
      selected: [2, "selected", "selected", booleanAttribute],
      label: "label",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      itemSize: [2, "itemSize", "itemSize", numberAttribute],
      focused: [2, "focused", "focused", booleanAttribute],
      ariaPosInset: "ariaPosInset",
      ariaSetSize: "ariaSetSize",
      variant: "variant",
      template: "template",
      checkIconTemplate: "checkIconTemplate",
      itemCheckboxIconTemplate: "itemCheckboxIconTemplate",
      highlightOnSelect: [2, "highlightOnSelect", "highlightOnSelect", booleanAttribute]
    },
    outputs: {
      onClick: "onClick",
      onMouseEnter: "onMouseEnter"
    },
    features: [ɵɵInheritDefinitionFeature],
    decls: 5,
    vars: 28,
    consts: [["checkboxicon", ""], ["pRipple", "", "role", "option", 1, "p-multiselect-option", 3, "click", "mouseenter", "ngStyle", "ngClass", "id"], [3, "ngModel", "binary", "tabindex", "variant", "ariaLabel"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function MultiSelectItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "li", 1);
        ɵɵlistener("click", function MultiSelectItem_Template_li_click_0_listener($event) {
          return ctx.onOptionClick($event);
        })("mouseenter", function MultiSelectItem_Template_li_mouseenter_0_listener($event) {
          return ctx.onOptionMouseEnter($event);
        });
        ɵɵelementStart(1, "p-checkbox", 2);
        ɵɵtemplate(2, MultiSelectItem_ng_container_2_Template, 3, 0, "ng-container", 3);
        ɵɵelementEnd();
        ɵɵtemplate(3, MultiSelectItem_span_3_Template, 2, 1, "span", 3)(4, MultiSelectItem_ng_container_4_Template, 1, 0, "ng-container", 4);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵproperty("ngStyle", ɵɵpureFunction1(20, _c02, ctx.itemSize + "px"))("ngClass", ɵɵpureFunction3(22, _c12, ctx.selected && ctx.highlightOnSelect, ctx.disabled, ctx.focused))("id", ctx.id);
        ɵɵattribute("aria-label", ctx.label)("aria-setsize", ctx.ariaSetSize)("aria-posinset", ctx.ariaPosInset)("aria-selected", ctx.selected)("data-p-focused", ctx.focused)("data-p-highlight", ctx.selected)("data-p-disabled", ctx.disabled)("aria-checked", ctx.selected);
        ɵɵadvance();
        ɵɵproperty("ngModel", ctx.selected)("binary", true)("tabindex", -1)("variant", ctx.variant)("ariaLabel", ctx.label);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.itemCheckboxIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.template);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.template)("ngTemplateOutletContext", ɵɵpureFunction1(26, _c2, ctx.option));
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, Checkbox, FormsModule, NgControlStatus, NgModel, Ripple, SharedModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectItem, [{
    type: Component,
    args: [{
      selector: "p-multiSelectItem, p-multiselect-item",
      standalone: true,
      imports: [CommonModule, Checkbox, FormsModule, Ripple, SharedModule],
      template: `
        <li
            pRipple
            class="p-multiselect-option"
            role="option"
            [ngStyle]="{ height: itemSize + 'px' }"
            [ngClass]="{
                'p-multiselect-option-selected': selected && highlightOnSelect,
                'p-disabled': disabled,
                'p-focus': focused
            }"
            [id]="id"
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [attr.aria-checked]="selected"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
        >
            <p-checkbox [ngModel]="selected" [binary]="true" [tabindex]="-1" [variant]="variant" [ariaLabel]="label">
                <ng-container *ngIf="itemCheckboxIconTemplate">
                    <ng-template #checkboxicon let-klass="class">
                        <ng-template *ngTemplateOutlet="itemCheckboxIconTemplate; context: { checked: selected, class: klass }"></ng-template>
                    </ng-template>
                </ng-container>
            </p-checkbox>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    id: [{
      type: Input
    }],
    option: [{
      type: Input
    }],
    selected: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    label: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    itemSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    focused: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ariaPosInset: [{
      type: Input
    }],
    ariaSetSize: [{
      type: Input
    }],
    variant: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    checkIconTemplate: [{
      type: Input
    }],
    itemCheckboxIconTemplate: [{
      type: Input
    }],
    highlightOnSelect: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onClick: [{
      type: Output
    }],
    onMouseEnter: [{
      type: Output
    }]
  });
})();
var MultiSelect = class _MultiSelect extends BaseComponent {
  zone;
  filterService;
  overlayService;
  /**
   * Unique identifier of the component
   * @group Props
   */
  id;
  /**
   * Defines a string that labels the input for accessibility.
   * @group Props
   */
  ariaLabel;
  /**
   * Inline style of the element.
   * @group Props
   */
  style;
  /**
   * Style class of the element.
   * @group Props
   */
  styleClass;
  /**
   * Inline style of the overlay panel.
   * @group Props
   */
  panelStyle;
  /**
   * Style class of the overlay panel element.
   * @group Props
   */
  panelStyleClass;
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId;
  /**
   * When present, it specifies that the element should be disabled.
   * @group Props
   */
  disabled;
  /**
   * Spans 100% width of the container when enabled.
   * @group Props
   */
  fluid;
  /**
   * When present, it specifies that the component cannot be edited.
   * @group Props
   */
  readonly;
  /**
   * Whether to display options as grouped when nested options are provided.
   * @group Props
   */
  group;
  /**
   * When specified, displays an input field to filter the items on keyup.
   * @group Props
   */
  filter = true;
  /**
   * Defines placeholder of the filter input.
   * @group Props
   */
  filterPlaceHolder;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Specifies the visibility of the options panel.
   * @group Props
   */
  overlayVisible;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant;
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @group Props
   */
  appendTo;
  /**
   * A property to uniquely identify a value in options.
   * @group Props
   */
  dataKey;
  /**
   * Name of the input element.
   * @group Props
   */
  name;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Whether to show labels of selected item labels or use default label.
   * @group Props
   * @defaultValue true
   */
  set displaySelectedLabel(val) {
    this._displaySelectedLabel = val;
  }
  get displaySelectedLabel() {
    return this._displaySelectedLabel;
  }
  /**
   * Decides how many selected item labels to show at most.
   * @group Props
   * @defaultValue 3
   */
  set maxSelectedLabels(val) {
    this._maxSelectedLabels = val;
  }
  get maxSelectedLabels() {
    return this._maxSelectedLabels;
  }
  /**
   * Maximum number of selectable items.
   * @group Props
   */
  selectionLimit;
  /**
   * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
   * @group Props
   */
  selectedItemsLabel;
  /**
   * Whether to show the checkbox at header to toggle all items at once.
   * @group Props
   */
  showToggleAll = true;
  /**
   * Text to display when filtering does not return any results.
   * @group Props
   */
  emptyFilterMessage = "";
  /**
   * Text to display when there is no data. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyMessage = "";
  /**
   * Clears the filter value when hiding the dropdown.
   * @group Props
   */
  resetFilterOnHide = false;
  /**
   * Icon class of the dropdown icon.
   * @group Props
   */
  dropdownIcon;
  /**
   * Icon class of the chip icon.
   * @group Props
   */
  chipIcon;
  /**
   * Name of the label field of an option.
   * @group Props
   */
  optionLabel;
  /**
   * Name of the value field of an option.
   * @group Props
   */
  optionValue;
  /**
   * Name of the disabled field of an option.
   * @group Props
   */
  optionDisabled;
  /**
   * Name of the label field of an option group.
   * @group Props
   */
  optionGroupLabel = "label";
  /**
   * Name of the options field of an option group.
   * @group Props
   */
  optionGroupChildren = "items";
  /**
   * Whether to show the header.
   * @group Props
   */
  showHeader = true;
  /**
   * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
   * @group Props
   */
  filterBy;
  /**
   * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  scrollHeight = "200px";
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy = false;
  /**
   * Whether the data should be loaded on demand during scroll.
   * @group Props
   */
  virtualScroll;
  /**
   * Whether the multiselect is in loading state.
   * @group Props
   */
  loading = false;
  /**
   * Height of an item in the list for VirtualScrolling.
   * @group Props
   */
  virtualScrollItemSize;
  /**
   * Icon to display in loading state.
   * @group Props
   */
  loadingIcon;
  /**
   * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  virtualScrollOptions;
  /**
   * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
   * @group Props
   */
  overlayOptions;
  /**
   * Defines a string that labels the filter input.
   * @group Props
   */
  ariaFilterLabel;
  /**
   * Defines how the items are filtered.
   * @group Props
   */
  filterMatchMode = "contains";
  /**
   * Advisory information to display in a tooltip on hover.
   * @group Props
   */
  tooltip = "";
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition = "right";
  /**
   * Type of CSS position.
   * @group Props
   */
  tooltipPositionStyle = "absolute";
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass;
  /**
   * Applies focus to the filter element when the overlay is shown.
   * @group Props
   */
  autofocusFilter = false;
  /**
   * Defines how the selected items are displayed.
   * @group Props
   */
  display = "comma";
  /**
   * Defines the autocomplete is active.
   * @group Props
   */
  autocomplete = "off";
  /**
   * Defines the size of the component.
   * @group Props
   */
  size;
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = false;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * @deprecated since v14.2.0, use overlayOptions property instead.
   * Whether to automatically manage layering.
   * @group Props
   */
  get autoZIndex() {
    return this._autoZIndex;
  }
  set autoZIndex(val) {
    this._autoZIndex = val;
    console.log("The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * @deprecated since v14.2.0, use overlayOptions property instead.
   * Base zIndex value to use in layering.
   * @group Props
   */
  get baseZIndex() {
    return this._baseZIndex;
  }
  set baseZIndex(val) {
    this._baseZIndex = val;
    console.log("The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * Transition options of the show animation.
   * @group Props
   * @deprecated since v14.2.0, use overlayOptions property instead.
   */
  get showTransitionOptions() {
    return this._showTransitionOptions;
  }
  set showTransitionOptions(val) {
    this._showTransitionOptions = val;
    console.log("The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * Transition options of the hide animation.
   * @group Props
   * @deprecated since v14.2.0, use overlayOptions property instead.
   */
  get hideTransitionOptions() {
    return this._hideTransitionOptions;
  }
  set hideTransitionOptions(val) {
    this._hideTransitionOptions = val;
    console.log("The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * Label to display when there are no selections.
   * @group Props
   * @deprecated Use placeholder instead.
   */
  set defaultLabel(val) {
    this._defaultLabel = val;
    console.log("defaultLabel property is deprecated since 16.6.0, use placeholder instead");
  }
  get defaultLabel() {
    return this._defaultLabel;
  }
  /**
   * Label to display when there are no selections.
   * @group Props
   */
  set placeholder(val) {
    this._placeholder.set(val);
  }
  get placeholder() {
    return this._placeholder.asReadonly();
  }
  /**
   * An array of objects to display as the available options.
   * @group Props
   */
  get options() {
    return this._options();
  }
  set options(val) {
    if (!deepEquals(this._options(), val)) {
      this._options.set(val);
    }
  }
  /**
   * When specified, filter displays with this value.
   * @group Props
   */
  get filterValue() {
    return this._filterValue();
  }
  set filterValue(val) {
    this._filterValue.set(val);
  }
  /**
   * Item size of item to be virtual scrolled.
   * @group Props
   * @deprecated use virtualScrollItemSize property instead.
   */
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(val) {
    this._itemSize = val;
    console.log("The itemSize property is deprecated, use virtualScrollItemSize property instead.");
  }
  /**
   * Whether all data is selected.
   * @group Props
   */
  get selectAll() {
    return this._selectAll;
  }
  set selectAll(value) {
    this._selectAll = value;
  }
  /**
   * Indicates whether to focus on options when hovering over them, defaults to optionLabel.
   * @group Props
   */
  focusOnHover = true;
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  filterFields;
  /**
   * Determines if the option will be selected on focus.
   * @group Props
   */
  selectOnFocus = false;
  /**
   * Whether to focus on the first visible or selected element when the overlay panel is shown.
   * @group Props
   */
  autoOptionFocus = false;
  /**
   * Whether the selected option will be add highlight class.
   * @group Props
   */
  highlightOnSelect = true;
  /**
   * Callback to invoke when value changes.
   * @param {MultiSelectChangeEvent} event - Custom change event.
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke when data is filtered.
   * @param {MultiSelectFilterEvent} event - Custom filter event.
   * @group Emits
   */
  onFilter = new EventEmitter();
  /**
   * Callback to invoke when multiselect receives focus.
   * @param {MultiSelectFocusEvent} event - Custom focus event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when multiselect loses focus.
   * @param {MultiSelectBlurEvent} event - Custom blur event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke when component is clicked.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onClick = new EventEmitter();
  /**
   * Callback to invoke when input field is cleared.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Callback to invoke when overlay panel becomes visible.
   * @param {AnimationEvent} event - Animation event.
   * @group Emits
   */
  onPanelShow = new EventEmitter();
  /**
   * Callback to invoke when overlay panel becomes hidden.
   * @param {AnimationEvent} event - Animation event.
   * @group Emits
   */
  onPanelHide = new EventEmitter();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {MultiSelectRemoveEvent} event - Remove event.
   * @group Emits
   */
  onRemove = new EventEmitter();
  /**
   * Callback to invoke when all data is selected.
   * @param {MultiSelectSelectAllChangeEvent} event - Custom select event.
   * @group Emits
   */
  onSelectAllChange = new EventEmitter();
  overlayViewChild;
  filterInputChild;
  focusInputViewChild;
  itemsViewChild;
  scroller;
  lastHiddenFocusableElementOnOverlay;
  firstHiddenFocusableElementOnOverlay;
  headerCheckboxViewChild;
  footerFacet;
  headerFacet;
  _componentStyle = inject(MultiSelectStyle);
  searchValue;
  searchTimeout;
  _selectAll = null;
  _autoZIndex;
  _baseZIndex;
  _showTransitionOptions;
  _hideTransitionOptions;
  _defaultLabel;
  _placeholder = signal(void 0);
  _itemSize;
  _selectionLimit;
  _disableTooltip = false;
  value;
  _filteredOptions;
  onModelChange = () => {
  };
  onModelTouched = () => {
  };
  valuesAsString;
  focus;
  filtered;
  itemTemplate;
  groupTemplate;
  loaderTemplate;
  headerTemplate;
  filterTemplate;
  footerTemplate;
  emptyFilterTemplate;
  emptyTemplate;
  selectedItemsTemplate;
  checkIconTemplate;
  loadingIconTemplate;
  filterIconTemplate;
  removeTokenIconTemplate;
  chipIconTemplate;
  clearIconTemplate;
  dropdownIconTemplate;
  itemCheckboxIconTemplate;
  headerCheckboxIconTemplate;
  templates;
  _itemTemplate;
  _groupTemplate;
  _loaderTemplate;
  _headerTemplate;
  _filterTemplate;
  _footerTemplate;
  _emptyFilterTemplate;
  _emptyTemplate;
  _selectedItemsTemplate;
  _checkIconTemplate;
  _loadingIconTemplate;
  _filterIconTemplate;
  _removeTokenIconTemplate;
  _chipIconTemplate;
  _clearIconTemplate;
  _dropdownIconTemplate;
  _itemCheckboxIconTemplate;
  _headerCheckboxIconTemplate;
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this._itemTemplate = item.template;
          break;
        case "group":
          this._groupTemplate = item.template;
          break;
        case "selectedItems":
        case "selecteditems":
          this._selectedItemsTemplate = item.template;
          break;
        case "header":
          this._headerTemplate = item.template;
          break;
        case "filter":
          this._filterTemplate = item.template;
          break;
        case "emptyfilter":
          this._emptyFilterTemplate = item.template;
          break;
        case "empty":
          this._emptyTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "loader":
          this._loaderTemplate = item.template;
          break;
        case "checkicon":
          this._checkIconTemplate = item.template;
          console.warn("checkicon is deprecated and will removed in future. Use itemcheckboxicon or headercheckboxicon templates instead.");
          break;
        case "headercheckboxicon":
          this._headerCheckboxIconTemplate = item.template;
          break;
        case "loadingicon":
          this._loadingIconTemplate = item.template;
          break;
        case "filtericon":
          this._filterIconTemplate = item.template;
          break;
        case "removetokenicon":
          this._removeTokenIconTemplate = item.template;
          break;
        case "clearicon":
          this._clearIconTemplate = item.template;
          break;
        case "dropdownicon":
          this._dropdownIconTemplate = item.template;
          break;
        case "itemcheckboxicon":
          this._itemCheckboxIconTemplate = item.template;
          break;
        case "chipicon":
          this._chipIconTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  headerCheckboxFocus;
  filterOptions;
  preventModelTouched;
  preventDocumentDefault;
  focused = false;
  itemsWrapper;
  _displaySelectedLabel = true;
  _maxSelectedLabels = 3;
  modelValue = signal(null);
  _filterValue = signal(null);
  _options = signal(null);
  startRangeIndex = signal(-1);
  focusedOptionIndex = signal(-1);
  selectedOptions;
  clickInProgress = false;
  get hostClasses() {
    const classes3 = [];
    if (typeof this.rootClass === "string") {
      classes3.push(this.rootClass);
    } else if (Array.isArray(this.rootClass)) {
      classes3.push(...this.rootClass);
    } else if (typeof this.rootClass === "object") {
      Object.keys(this.rootClass).filter((key) => this.rootClass[key]).forEach((key) => classes3.push(key));
    }
    if (this.styleClass) {
      classes3.push(this.styleClass);
    }
    return classes3.join(" ");
  }
  get rootClass() {
    return this._componentStyle.classes.root({
      instance: this
    });
  }
  get labelClass() {
    return this._componentStyle.classes.label({
      instance: this
    });
  }
  get emptyMessageLabel() {
    return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
  }
  get emptyFilterMessageLabel() {
    return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
  }
  get filled() {
    if (typeof this.modelValue() === "string") return !!this.modelValue();
    return isNotEmpty(this.modelValue());
  }
  get isVisibleClearIcon() {
    return this.modelValue() != null && this.modelValue() !== "" && isNotEmpty(this.modelValue()) && this.showClear && !this.disabled && !this.readonly && this.filled;
  }
  get toggleAllAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria[this.allSelected() ? "selectAll" : "unselectAll"] : void 0;
  }
  get closeAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.close : void 0;
  }
  get listLabel() {
    return this.config.getTranslation(TranslationKeys.ARIA)["listLabel"];
  }
  get hasFluid() {
    const nativeElement = this.el.nativeElement;
    const fluidComponent = nativeElement.closest("p-fluid");
    return this.fluid || !!fluidComponent;
  }
  getAllVisibleAndNonVisibleOptions() {
    return this.group ? this.flatOptions(this.options) : this.options || [];
  }
  visibleOptions = computed(() => {
    const options = this.getAllVisibleAndNonVisibleOptions();
    const isArrayOfObjects = isArray(options) && ObjectUtils.isObject(options[0]);
    if (this._filterValue()) {
      let filteredOptions;
      if (isArrayOfObjects) {
        filteredOptions = this.filterService.filter(options, this.searchFields(), this._filterValue(), this.filterMatchMode, this.filterLocale);
      } else {
        filteredOptions = options.filter((option) => option.toString().toLocaleLowerCase().includes(this._filterValue().toLocaleLowerCase()));
      }
      if (this.group) {
        const optionGroups = this.options || [];
        const filtered = [];
        optionGroups.forEach((group) => {
          const groupChildren = this.getOptionGroupChildren(group);
          const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));
          if (filteredItems.length > 0) filtered.push(__spreadProps(__spreadValues({}, group), {
            [typeof this.optionGroupChildren === "string" ? this.optionGroupChildren : "items"]: [...filteredItems]
          }));
        });
        return this.flatOptions(filtered);
      }
      return filteredOptions;
    }
    return options;
  });
  label = computed(() => {
    let label;
    const modelValue = this.modelValue();
    if (modelValue && modelValue.length && this.displaySelectedLabel) {
      if (isNotEmpty(this.maxSelectedLabels) && modelValue.length > this.maxSelectedLabels) {
        return this.getSelectedItemsLabel();
      } else {
        label = "";
        for (let i = 0; i < modelValue.length; i++) {
          if (i !== 0) {
            label += ", ";
          }
          label += this.getLabelByValue(modelValue[i]);
        }
      }
    } else {
      label = this.placeholder() || this.defaultLabel || "";
    }
    return label;
  });
  chipSelectedItems = computed(() => {
    return isNotEmpty(this.maxSelectedLabels) && this.modelValue() && this.modelValue().length > this.maxSelectedLabels ? this.modelValue().slice(0, this.maxSelectedLabels) : this.modelValue();
  });
  constructor(zone, filterService, overlayService) {
    super();
    this.zone = zone;
    this.filterService = filterService;
    this.overlayService = overlayService;
    effect(() => {
      const modelValue = this.modelValue();
      const allVisibleAndNonVisibleOptions = this.getAllVisibleAndNonVisibleOptions();
      if (allVisibleAndNonVisibleOptions && isNotEmpty(allVisibleAndNonVisibleOptions)) {
        if (this.optionValue && this.optionLabel && modelValue) {
          this.selectedOptions = allVisibleAndNonVisibleOptions.filter((option) => modelValue.includes(option[this.optionLabel]) || modelValue.includes(option[this.optionValue]));
        } else {
          this.selectedOptions = modelValue;
        }
        this.cd.markForCheck();
      }
    });
  }
  ngOnInit() {
    super.ngOnInit();
    this.id = this.id || uuid("pn_id_");
    this.autoUpdateModel();
    if (this.filterBy) {
      this.filterOptions = {
        filter: (value) => this.onFilterInputChange(value),
        reset: () => this.resetFilter()
      };
    }
  }
  maxSelectionLimitReached() {
    return this.selectionLimit && this.modelValue() && this.modelValue().length === this.selectionLimit;
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.overlayVisible) {
      this.show();
    }
  }
  ngAfterViewChecked() {
    if (this.filtered) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.overlayViewChild?.alignOverlay();
        }, 1);
      });
      this.filtered = false;
    }
  }
  flatOptions(options) {
    return (options || []).reduce((result, option, index) => {
      result.push({
        optionGroup: option,
        group: true,
        index
      });
      const optionGroupChildren = this.getOptionGroupChildren(option);
      optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
      return result;
    }, []);
  }
  autoUpdateModel() {
    if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
      this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
      const value = this.getOptionValue(this.visibleOptions()[this.focusedOptionIndex()]);
      this.onOptionSelect({
        originalEvent: null,
        option: [value]
      });
    }
  }
  /**
   * Updates the model value.
   * @group Method
   */
  updateModel(value, event) {
    this.value = value;
    this.onModelChange(value);
    this.modelValue.set(value);
  }
  onInputClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.focusedOptionIndex.set(-1);
  }
  onOptionSelect(event, isFocus = false, index = -1) {
    const {
      originalEvent,
      option
    } = event;
    if (this.disabled || this.isOptionDisabled(option)) {
      return;
    }
    let selected = this.isSelected(option);
    let value = null;
    if (selected) {
      value = this.modelValue().filter((val) => !equals(val, this.getOptionValue(option), this.equalityKey()));
    } else {
      value = [...this.modelValue() || [], this.getOptionValue(option)];
    }
    this.updateModel(value, originalEvent);
    index !== -1 && this.focusedOptionIndex.set(index);
    isFocus && focus(this.focusInputViewChild?.nativeElement);
    this.onChange.emit({
      originalEvent: event,
      value,
      itemValue: option
    });
  }
  findSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  onOptionSelectRange(event, start = -1, end = -1) {
    start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
    end === -1 && (end = this.findNearestSelectedOptionIndex(start));
    if (start !== -1 && end !== -1) {
      const rangeStart = Math.min(start, end);
      const rangeEnd = Math.max(start, end);
      const value = this.visibleOptions().slice(rangeStart, rangeEnd + 1).filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
      this.updateModel(value, event);
    }
  }
  searchFields() {
    return (this.filterBy || this.optionLabel || "label").split(",");
  }
  findNearestSelectedOptionIndex(index, firstCheckUp = false) {
    let matchedOptionIndex = -1;
    if (this.hasSelectedOption()) {
      if (firstCheckUp) {
        matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
      } else {
        matchedOptionIndex = this.findNextSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
      }
    }
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findPrevSelectedOptionIndex(index) {
    const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
  }
  findFirstFocusedOptionIndex() {
    const selectedIndex = this.findFirstSelectedOptionIndex();
    return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
  }
  findFirstOptionIndex() {
    return this.visibleOptions().findIndex((option) => this.isValidOption(option));
  }
  findFirstSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  findNextSelectedOptionIndex(index) {
    const matchedOptionIndex = this.hasSelectedOption() && index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidSelectedOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
  }
  equalityKey() {
    return this.optionValue ? null : this.dataKey;
  }
  hasSelectedOption() {
    return isNotEmpty(this.modelValue());
  }
  isValidSelectedOption(option) {
    return this.isValidOption(option) && this.isSelected(option);
  }
  isOptionGroup(option) {
    return (this.group || this.optionGroupLabel) && option.optionGroup && option.group;
  }
  isValidOption(option) {
    return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
  }
  isOptionDisabled(option) {
    if (this.maxSelectionLimitReached() && !this.isSelected(option)) {
      return true;
    }
    return this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false;
  }
  isSelected(option) {
    const optionValue = this.getOptionValue(option);
    return (this.modelValue() || []).some((value) => equals(value, optionValue, this.equalityKey()));
  }
  isOptionMatched(option) {
    return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
  }
  isEmpty() {
    return !this._options() || this.visibleOptions() && this.visibleOptions().length === 0;
  }
  getOptionIndex(index, scrollerOptions) {
    return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)["index"];
  }
  getAriaPosInset(index) {
    return (this.optionGroupLabel ? index - this.visibleOptions().slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
  }
  get ariaSetSize() {
    return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
  }
  getLabelByValue(value) {
    const options = this.group ? this.flatOptions(this._options()) : this._options() || [];
    const matchedOption = options.find((option) => !this.isOptionGroup(option) && equals(this.getOptionValue(option), value, this.equalityKey()));
    return matchedOption ? this.getOptionLabel(matchedOption) : null;
  }
  getSelectedItemsLabel() {
    let pattern = /{(.*?)}/;
    let message = this.selectedItemsLabel ? this.selectedItemsLabel : this.config.getTranslation(TranslationKeys.SELECTION_MESSAGE);
    if (pattern.test(message)) {
      return message.replace(message.match(pattern)[0], this.modelValue().length + "");
    }
    return message;
  }
  getOptionLabel(option) {
    return this.optionLabel ? resolveFieldData(option, this.optionLabel) : option && option.label != void 0 ? option.label : option;
  }
  getOptionValue(option) {
    return this.optionValue ? resolveFieldData(option, this.optionValue) : !this.optionLabel && option && option.value !== void 0 ? option.value : option;
  }
  getOptionGroupLabel(optionGroup) {
    return this.optionGroupLabel ? resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label != void 0 ? optionGroup.label : optionGroup;
  }
  getOptionGroupChildren(optionGroup) {
    return this.optionGroupChildren ? resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
  }
  onKeyDown(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    const metaKey = event.metaKey || event.ctrlKey;
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "PageDown":
        this.onPageDownKey(event);
        break;
      case "PageUp":
        this.onPageUpKey(event);
        break;
      case "Enter":
      case "Space":
        this.onEnterKey(event);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event);
        break;
      case "ShiftLeft":
      case "ShiftRight":
        this.onShiftKey();
        break;
      default:
        if (event.code === "KeyA" && metaKey) {
          const value = this.visibleOptions().filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
          this.updateModel(value, event);
          event.preventDefault();
          break;
        }
        if (!metaKey && isPrintableCharacter(event.key)) {
          !this.overlayVisible && this.show();
          this.searchOptions(event, event.key);
          event.preventDefault();
        }
        break;
    }
  }
  onFilterKeyDown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event, true);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.onArrowLeftKey(event, true);
        break;
      case "Home":
        this.onHomeKey(event, true);
        break;
      case "End":
        this.onEndKey(event, true);
        break;
      case "Enter":
      case "NumpadEnter":
        this.onEnterKey(event);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event, true);
        break;
      default:
        break;
    }
  }
  onArrowLeftKey(event, pressedInInputText = false) {
    pressedInInputText && this.focusedOptionIndex.set(-1);
  }
  onArrowDownKey(event) {
    const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
    if (event.shiftKey) {
      this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
    }
    this.changeFocusedOptionIndex(event, optionIndex);
    !this.overlayVisible && this.show();
    event.preventDefault();
    event.stopPropagation();
  }
  onArrowUpKey(event, pressedInInputText = false) {
    if (event.altKey && !pressedInInputText) {
      if (this.focusedOptionIndex() !== -1) {
        this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
      }
      this.overlayVisible && this.hide();
      event.preventDefault();
    } else {
      const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();
      if (event.shiftKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
      event.preventDefault();
    }
    event.stopPropagation();
  }
  onHomeKey(event, pressedInInputText = false) {
    const {
      currentTarget
    } = event;
    if (pressedInInputText) {
      const len = currentTarget.value.length;
      currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
      this.focusedOptionIndex.set(-1);
    } else {
      let metaKey = event.metaKey || event.ctrlKey;
      let optionIndex = this.findFirstOptionIndex();
      if (event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
  }
  onEndKey(event, pressedInInputText = false) {
    const {
      currentTarget
    } = event;
    if (pressedInInputText) {
      const len = currentTarget.value.length;
      currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
      this.focusedOptionIndex.set(-1);
    } else {
      let metaKey = event.metaKey || event.ctrlKey;
      let optionIndex = this.findLastFocusedOptionIndex();
      if (event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
  }
  onPageDownKey(event) {
    this.scrollInView(this.visibleOptions().length - 1);
    event.preventDefault();
  }
  onPageUpKey(event) {
    this.scrollInView(0);
    event.preventDefault();
  }
  onEnterKey(event) {
    if (!this.overlayVisible) {
      this.onArrowDownKey(event);
    } else {
      if (this.focusedOptionIndex() !== -1) {
        if (event.shiftKey) {
          this.onOptionSelectRange(event, this.focusedOptionIndex());
        } else {
          this.onOptionSelect({
            originalEvent: event,
            option: this.visibleOptions()[this.focusedOptionIndex()]
          });
        }
      }
    }
    event.preventDefault();
  }
  onEscapeKey(event) {
    this.overlayVisible && this.hide(true);
    event.stopPropagation();
    event.preventDefault();
  }
  onDeleteKey(event) {
    if (this.showClear) {
      this.clear(event);
      event.preventDefault();
    }
  }
  onTabKey(event, pressedInInputText = false) {
    if (!pressedInInputText) {
      if (this.overlayVisible && this.hasFocusableElements()) {
        focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);
        event.preventDefault();
      } else {
        if (this.focusedOptionIndex() !== -1) {
          this.onOptionSelect({
            originalEvent: event,
            option: this.visibleOptions()[this.focusedOptionIndex()]
          });
        }
        this.overlayVisible && this.hide(this.filter);
      }
    }
  }
  onShiftKey() {
    this.startRangeIndex.set(this.focusedOptionIndex());
  }
  onContainerClick(event) {
    if (this.disabled || this.loading || this.readonly || event.target.isSameNode(this.focusInputViewChild?.nativeElement)) {
      return;
    }
    if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
      if (this.clickInProgress) {
        return;
      }
      this.clickInProgress = true;
      setTimeout(() => {
        this.clickInProgress = false;
      }, 150);
      this.overlayVisible ? this.hide(true) : this.show(true);
    }
    this.focusInputViewChild?.nativeElement.focus({
      preventScroll: true
    });
    this.onClick.emit(event);
    this.cd.detectChanges();
  }
  onFirstHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? getFirstFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild?.nativeElement;
    focus(focusableEl);
  }
  onInputFocus(event) {
    this.focused = true;
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
    this.focusedOptionIndex.set(focusedOptionIndex);
    this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
    this.onFocus.emit({
      originalEvent: event
    });
  }
  onInputBlur(event) {
    this.focused = false;
    this.onBlur.emit({
      originalEvent: event
    });
    if (!this.preventModelTouched) {
      this.onModelTouched();
    }
    this.preventModelTouched = false;
  }
  onFilterInputChange(event) {
    let value = event.target.value;
    this._filterValue.set(value);
    this.focusedOptionIndex.set(-1);
    this.onFilter.emit({
      originalEvent: event,
      filter: this._filterValue()
    });
    !this.virtualScrollerDisabled && this.scroller.scrollToIndex(0);
    setTimeout(() => {
      this.overlayViewChild.alignOverlay();
    });
  }
  onLastHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild?.nativeElement;
    focus(focusableEl);
  }
  onOptionMouseEnter(event, index) {
    if (this.focusOnHover) {
      this.changeFocusedOptionIndex(event, index);
    }
  }
  onHeaderCheckboxKeyDown(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    switch (event.code) {
      case "Space":
        this.onToggleAll(event);
        break;
      case "Enter":
        this.onToggleAll(event);
        break;
      default:
        break;
    }
  }
  onFilterBlur(event) {
    this.focusedOptionIndex.set(-1);
  }
  onHeaderCheckboxFocus() {
    this.headerCheckboxFocus = true;
  }
  onHeaderCheckboxBlur() {
    this.headerCheckboxFocus = false;
  }
  onToggleAll(event) {
    if (this.disabled || this.readonly) {
      return;
    }
    if (this.selectAll != null) {
      this.onSelectAllChange.emit({
        originalEvent: event,
        checked: !this.allSelected()
      });
    } else {
      const selectedDisabledOptions = this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && (this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false));
      const visibleOptions = this.allSelected() ? this.visibleOptions().filter((option) => !this.isValidOption(option) && this.isSelected(option)) : this.visibleOptions().filter((option) => this.isSelected(option) || this.isValidOption(option));
      const selectedOptionsBeforeSearch = this.filter && !this.allSelected() ? this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && this.isValidOption(option)) : [];
      const optionValues = [...selectedOptionsBeforeSearch, ...selectedDisabledOptions, ...visibleOptions].map((option) => this.getOptionValue(option));
      const value = [...new Set(optionValues)];
      this.updateModel(value, event);
      if (!value.length || value.length === this.getAllVisibleAndNonVisibleOptions().length) {
        this.onSelectAllChange.emit({
          originalEvent: event,
          checked: !!value.length
        });
      }
    }
    if (this.partialSelected()) {
      this.selectedOptions = null;
      this.cd.markForCheck();
    }
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
    DomHandler.focus(this.headerCheckboxViewChild?.inputViewChild?.nativeElement);
    this.headerCheckboxFocus = true;
    event.originalEvent.preventDefault();
    event.originalEvent.stopPropagation();
  }
  changeFocusedOptionIndex(event, index) {
    if (this.focusedOptionIndex() !== index) {
      this.focusedOptionIndex.set(index);
      this.scrollInView();
    }
  }
  get virtualScrollerDisabled() {
    return !this.virtualScroll;
  }
  scrollInView(index = -1) {
    const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
    if (this.itemsViewChild && this.itemsViewChild.nativeElement) {
      const element = findSingle(this.itemsViewChild.nativeElement, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(() => {
          this.virtualScroll && this.scroller?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
        }, 0);
      }
    }
  }
  get focusedOptionId() {
    return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
  }
  writeValue(value) {
    this.value = value;
    this.modelValue.set(this.value);
    this.cd.markForCheck();
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  allSelected() {
    return this.selectAll !== null ? this.selectAll : isNotEmpty(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
  }
  partialSelected() {
    return this.selectedOptions && this.selectedOptions.length > 0 && this.selectedOptions.length < this.options.length;
  }
  /**
   * Displays the panel.
   * @group Method
   */
  show(isFocus) {
    this.overlayVisible = true;
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex();
    this.focusedOptionIndex.set(focusedOptionIndex);
    if (isFocus) {
      focus(this.focusInputViewChild?.nativeElement);
    }
    this.cd.markForCheck();
  }
  /**
   * Hides the panel.
   * @group Method
   */
  hide(isFocus) {
    this.overlayVisible = false;
    this.focusedOptionIndex.set(-1);
    if (this.filter && this.resetFilterOnHide) {
      this.resetFilter();
    }
    if (this.overlayOptions?.mode === "modal") {
      unblockBodyScroll();
    }
    isFocus && focus(this.focusInputViewChild?.nativeElement);
    this.cd.markForCheck();
  }
  onOverlayAnimationStart(event) {
    if (event.toState === "visible") {
      this.itemsWrapper = findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? ".p-scroller" : ".p-multiselect-list-container");
      this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
      if (this.options && this.options.length) {
        if (this.virtualScroll) {
          const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
          if (selectedIndex !== -1) {
            this.scroller?.scrollToIndex(selectedIndex);
          }
        } else {
          let selectedListItem = findSingle(this.itemsWrapper, '[data-p-highlight="true"]');
          if (selectedListItem) {
            selectedListItem.scrollIntoView({
              block: "nearest",
              inline: "nearest"
            });
          }
        }
      }
      if (this.filterInputChild && this.filterInputChild.nativeElement) {
        this.preventModelTouched = true;
        if (this.autofocusFilter) {
          this.filterInputChild.nativeElement.focus();
        }
      }
      this.onPanelShow.emit(event);
    }
    if (event.toState === "void") {
      this.itemsWrapper = null;
      this.onModelTouched();
      this.onPanelHide.emit(event);
    }
  }
  resetFilter() {
    if (this.filterInputChild && this.filterInputChild.nativeElement) {
      this.filterInputChild.nativeElement.value = "";
    }
    this._filterValue.set(null);
    this._filteredOptions = null;
  }
  close(event) {
    this.hide();
    event.preventDefault();
    event.stopPropagation();
  }
  clear(event) {
    this.value = null;
    this.updateModel(null, event);
    this.selectedOptions = null;
    this.onClear.emit();
    this._disableTooltip = true;
    event.stopPropagation();
  }
  labelContainerMouseLeave() {
    if (this._disableTooltip) this._disableTooltip = false;
  }
  removeOption(optionValue, event) {
    let value = this.modelValue().filter((val) => !equals(val, optionValue, this.equalityKey()));
    this.updateModel(value, event);
    this.onChange.emit({
      originalEvent: event,
      value,
      itemValue: optionValue
    });
    this.onRemove.emit({
      newValue: value,
      removed: optionValue
    });
    event && event.stopPropagation();
  }
  findNextItem(item) {
    let nextItem = item.nextElementSibling;
    if (nextItem) return hasClass(nextItem.children[0], "p-disabled") || isHidden(nextItem.children[0]) || hasClass(nextItem, "p-multiselect-item-group") ? this.findNextItem(nextItem) : nextItem.children[0];
    else return null;
  }
  findPrevItem(item) {
    let prevItem = item.previousElementSibling;
    if (prevItem) return hasClass(prevItem.children[0], "p-disabled") || isHidden(prevItem.children[0]) || hasClass(prevItem, "p-multiselect-item-group") ? this.findPrevItem(prevItem) : prevItem.children[0];
    else return null;
  }
  findNextOptionIndex(index) {
    const matchedOptionIndex = index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
  }
  findPrevOptionIndex(index) {
    const matchedOptionIndex = index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findLastSelectedOptionIndex() {
    return this.hasSelectedOption() ? findLastIndex(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
  }
  findLastFocusedOptionIndex() {
    const selectedIndex = this.findLastSelectedOptionIndex();
    return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
  }
  findLastOptionIndex() {
    return findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
  }
  searchOptions(event, char) {
    this.searchValue = (this.searchValue || "") + char;
    let optionIndex = -1;
    let matched = false;
    if (this.focusedOptionIndex() !== -1) {
      optionIndex = this.visibleOptions().slice(this.focusedOptionIndex()).findIndex((option) => this.isOptionMatched(option));
      optionIndex = optionIndex === -1 ? this.visibleOptions().slice(0, this.focusedOptionIndex()).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex();
    } else {
      optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
    }
    if (optionIndex !== -1) {
      matched = true;
    }
    if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
      optionIndex = this.findFirstFocusedOptionIndex();
    }
    if (optionIndex !== -1) {
      this.changeFocusedOptionIndex(event, optionIndex);
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.searchValue = "";
      this.searchTimeout = null;
    }, 500);
    return matched;
  }
  activateFilter() {
    if (this.hasFilter() && this._options) {
      if (this.group) {
        let filteredGroups = [];
        for (let optgroup of this.options) {
          let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
          if (filteredSubOptions && filteredSubOptions.length) {
            filteredGroups.push(__spreadValues(__spreadValues({}, optgroup), {
              [this.optionGroupChildren]: filteredSubOptions
            }));
          }
        }
        this._filteredOptions = filteredGroups;
      } else {
        this._filteredOptions = this.filterService.filter(this.options, this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
      }
    } else {
      this._filteredOptions = null;
    }
  }
  hasFocusableElements() {
    return getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
  }
  hasFilter() {
    return this._filterValue() && this._filterValue().trim().length > 0;
  }
  static ɵfac = function MultiSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MultiSelect)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(FilterService), ɵɵdirectiveInject(OverlayService));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MultiSelect,
    selectors: [["p-multiSelect"], ["p-multiselect"], ["p-multi-select"]],
    contentQueries: function MultiSelect_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Footer, 5);
        ɵɵcontentQuery(dirIndex, Header, 5);
        ɵɵcontentQuery(dirIndex, _c4, 4);
        ɵɵcontentQuery(dirIndex, _c5, 4);
        ɵɵcontentQuery(dirIndex, _c6, 4);
        ɵɵcontentQuery(dirIndex, _c7, 4);
        ɵɵcontentQuery(dirIndex, _c8, 4);
        ɵɵcontentQuery(dirIndex, _c9, 4);
        ɵɵcontentQuery(dirIndex, _c10, 4);
        ɵɵcontentQuery(dirIndex, _c11, 4);
        ɵɵcontentQuery(dirIndex, _c122, 4);
        ɵɵcontentQuery(dirIndex, _c13, 4);
        ɵɵcontentQuery(dirIndex, _c14, 4);
        ɵɵcontentQuery(dirIndex, _c15, 4);
        ɵɵcontentQuery(dirIndex, _c16, 4);
        ɵɵcontentQuery(dirIndex, _c17, 4);
        ɵɵcontentQuery(dirIndex, _c18, 4);
        ɵɵcontentQuery(dirIndex, _c19, 4);
        ɵɵcontentQuery(dirIndex, _c20, 4);
        ɵɵcontentQuery(dirIndex, _c21, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loaderTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyFilterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selectedItemsTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.checkIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loadingIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.removeTokenIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.chipIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clearIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropdownIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemCheckboxIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerCheckboxIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function MultiSelect_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c22, 5);
        ɵɵviewQuery(_c23, 5);
        ɵɵviewQuery(_c24, 5);
        ɵɵviewQuery(_c25, 5);
        ɵɵviewQuery(_c26, 5);
        ɵɵviewQuery(_c27, 5);
        ɵɵviewQuery(_c28, 5);
        ɵɵviewQuery(_c29, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlayViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterInputChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.focusInputViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scroller = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.lastHiddenFocusableElementOnOverlay = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.firstHiddenFocusableElementOnOverlay = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerCheckboxViewChild = _t.first);
      }
    },
    hostVars: 7,
    hostBindings: function MultiSelect_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function MultiSelect_click_HostBindingHandler($event) {
          return ctx.onContainerClick($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("id", ctx.id);
        ɵɵstyleMap(ctx.style);
        ɵɵclassMap(ctx.hostClasses);
        ɵɵclassProp("p-variant-filled", ctx.variant === "filled" || ctx.config.inputVariant() === "filled" || ctx.config.inputStyle() === "filled");
      }
    },
    inputs: {
      id: "id",
      ariaLabel: "ariaLabel",
      style: "style",
      styleClass: "styleClass",
      panelStyle: "panelStyle",
      panelStyleClass: "panelStyleClass",
      inputId: "inputId",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      fluid: [2, "fluid", "fluid", booleanAttribute],
      readonly: [2, "readonly", "readonly", booleanAttribute],
      group: [2, "group", "group", booleanAttribute],
      filter: [2, "filter", "filter", booleanAttribute],
      filterPlaceHolder: "filterPlaceHolder",
      filterLocale: "filterLocale",
      overlayVisible: [2, "overlayVisible", "overlayVisible", booleanAttribute],
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      variant: "variant",
      appendTo: "appendTo",
      dataKey: "dataKey",
      name: "name",
      ariaLabelledBy: "ariaLabelledBy",
      displaySelectedLabel: "displaySelectedLabel",
      maxSelectedLabels: "maxSelectedLabels",
      selectionLimit: [2, "selectionLimit", "selectionLimit", numberAttribute],
      selectedItemsLabel: "selectedItemsLabel",
      showToggleAll: [2, "showToggleAll", "showToggleAll", booleanAttribute],
      emptyFilterMessage: "emptyFilterMessage",
      emptyMessage: "emptyMessage",
      resetFilterOnHide: [2, "resetFilterOnHide", "resetFilterOnHide", booleanAttribute],
      dropdownIcon: "dropdownIcon",
      chipIcon: "chipIcon",
      optionLabel: "optionLabel",
      optionValue: "optionValue",
      optionDisabled: "optionDisabled",
      optionGroupLabel: "optionGroupLabel",
      optionGroupChildren: "optionGroupChildren",
      showHeader: [2, "showHeader", "showHeader", booleanAttribute],
      filterBy: "filterBy",
      scrollHeight: "scrollHeight",
      lazy: [2, "lazy", "lazy", booleanAttribute],
      virtualScroll: [2, "virtualScroll", "virtualScroll", booleanAttribute],
      loading: [2, "loading", "loading", booleanAttribute],
      virtualScrollItemSize: [2, "virtualScrollItemSize", "virtualScrollItemSize", numberAttribute],
      loadingIcon: "loadingIcon",
      virtualScrollOptions: "virtualScrollOptions",
      overlayOptions: "overlayOptions",
      ariaFilterLabel: "ariaFilterLabel",
      filterMatchMode: "filterMatchMode",
      tooltip: "tooltip",
      tooltipPosition: "tooltipPosition",
      tooltipPositionStyle: "tooltipPositionStyle",
      tooltipStyleClass: "tooltipStyleClass",
      autofocusFilter: [2, "autofocusFilter", "autofocusFilter", booleanAttribute],
      display: "display",
      autocomplete: "autocomplete",
      size: "size",
      showClear: [2, "showClear", "showClear", booleanAttribute],
      autofocus: [2, "autofocus", "autofocus", booleanAttribute],
      autoZIndex: "autoZIndex",
      baseZIndex: "baseZIndex",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      defaultLabel: "defaultLabel",
      placeholder: "placeholder",
      options: "options",
      filterValue: "filterValue",
      itemSize: "itemSize",
      selectAll: "selectAll",
      focusOnHover: [2, "focusOnHover", "focusOnHover", booleanAttribute],
      filterFields: "filterFields",
      selectOnFocus: [2, "selectOnFocus", "selectOnFocus", booleanAttribute],
      autoOptionFocus: [2, "autoOptionFocus", "autoOptionFocus", booleanAttribute],
      highlightOnSelect: [2, "highlightOnSelect", "highlightOnSelect", booleanAttribute]
    },
    outputs: {
      onChange: "onChange",
      onFilter: "onFilter",
      onFocus: "onFocus",
      onBlur: "onBlur",
      onClick: "onClick",
      onClear: "onClear",
      onPanelShow: "onPanelShow",
      onPanelHide: "onPanelHide",
      onLazyLoad: "onLazyLoad",
      onRemove: "onRemove",
      onSelectAllChange: "onSelectAllChange"
    },
    features: [ɵɵProvidersFeature([MULTISELECT_VALUE_ACCESSOR, MultiSelectStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c31,
    decls: 16,
    vars: 35,
    consts: [["focusInput", ""], ["elseBlock", ""], ["overlay", ""], ["content", ""], ["token", ""], ["removeicon", ""], ["firstHiddenFocusableEl", ""], ["buildInItems", ""], ["lastHiddenFocusableEl", ""], ["builtInFilterElement", ""], ["headerCheckbox", ""], ["checkboxicon", ""], ["filterInput", ""], ["scroller", ""], ["loader", ""], ["items", ""], [1, "p-hidden-accessible"], ["role", "combobox", 3, "focus", "blur", "keydown", "pTooltip", "tooltipPosition", "positionStyle", "tooltipStyleClass", "pAutoFocus"], [1, "p-multiselect-label-container", 3, "mouseleave", "pTooltip", "tooltipDisabled", "tooltipPosition", "positionStyle", "tooltipStyleClass"], [3, "ngClass"], [4, "ngIf"], [1, "p-multiselect-dropdown"], [4, "ngIf", "ngIfElse"], [3, "visibleChange", "onAnimationStart", "onHide", "visible", "options", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions"], [1, "p-multiselect-chip-item"], ["class", "p-multiselect-chip-item", 4, "ngFor", "ngForOf"], ["styleClass", "p-multiselect-chip", 3, "onRemove", "label", "removable", "removeIcon"], ["class", "p-multiselect-chip-icon", 3, "click", 4, "ngIf"], [1, "p-multiselect-chip-icon", 3, "click"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "p-multiselect-clear-icon", 3, "click", 4, "ngIf"], [1, "p-multiselect-clear-icon", 3, "click"], [4, "ngTemplateOutlet"], ["aria-hidden", "true", 3, "ngClass", 4, "ngIf"], ["aria-hidden", "true", 3, "class", 4, "ngIf"], ["aria-hidden", "true", 3, "ngClass"], ["aria-hidden", "true"], ["class", "p-multiselect-dropdown-icon", 4, "ngIf"], ["class", "p-multiselect-dropdown-icon", 3, "ngClass", 4, "ngIf"], [3, "styleClass", 4, "ngIf"], [1, "p-multiselect-dropdown-icon", 3, "ngClass"], [3, "styleClass"], [1, "p-multiselect-dropdown-icon"], [3, "ngClass", "ngStyle"], ["role", "presentation", 1, "p-hidden-accessible", "p-hidden-focusable", 3, "focus"], ["class", "p-multiselect-header", 4, "ngIf"], [1, "p-multiselect-list-container"], [3, "items", "style", "itemSize", "autoSize", "tabindex", "lazy", "options", "onLazyLoad", 4, "ngIf"], [1, "p-multiselect-header"], [3, "ngModel", "ariaLabel", "binary", "variant", "disabled", "onChange", 4, "ngIf"], ["class", "p-multiselect-filter-container", 4, "ngIf"], [3, "onChange", "ngModel", "ariaLabel", "binary", "variant", "disabled"], [1, "p-multiselect-filter-container"], ["pInputText", "", "type", "text", "role", "searchbox", 1, "p-multiselect-filter", 3, "input", "keydown", "click", "blur", "variant", "value", "disabled"], ["class", "p-multiselect-filter-icon", 4, "ngIf"], [1, "p-multiselect-filter-icon"], [3, "onLazyLoad", "items", "itemSize", "autoSize", "tabindex", "lazy", "options"], ["role", "listbox", "aria-multiselectable", "true", 1, "p-multiselect-list", 3, "ngClass"], ["ngFor", "", 3, "ngForOf"], ["class", "p-multiselect-empty-message", "role", "option", 3, "ngStyle", 4, "ngIf"], ["role", "option", 1, "p-multiselect-option-group", 3, "ngStyle"], [3, "onClick", "onMouseEnter", "id", "option", "selected", "label", "disabled", "template", "checkIconTemplate", "itemCheckboxIconTemplate", "itemSize", "focused", "ariaPosInset", "ariaSetSize", "variant", "highlightOnSelect"], ["role", "option", 1, "p-multiselect-empty-message", 3, "ngStyle"]],
    template: function MultiSelect_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵprojectionDef(_c30);
        ɵɵelementStart(0, "div", 16)(1, "input", 17, 0);
        ɵɵlistener("focus", function MultiSelect_Template_input_focus_1_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputFocus($event));
        })("blur", function MultiSelect_Template_input_blur_1_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputBlur($event));
        })("keydown", function MultiSelect_Template_input_keydown_1_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onKeyDown($event));
        });
        ɵɵelementEnd()();
        ɵɵelementStart(3, "div", 18);
        ɵɵlistener("mouseleave", function MultiSelect_Template_div_mouseleave_3_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.labelContainerMouseLeave());
        });
        ɵɵelementStart(4, "div", 19);
        ɵɵtemplate(5, MultiSelect_ng_container_5_Template, 3, 2, "ng-container", 20)(6, MultiSelect_ng_container_6_Template, 3, 6, "ng-container", 20);
        ɵɵelementEnd()();
        ɵɵtemplate(7, MultiSelect_ng_container_7_Template, 3, 2, "ng-container", 20);
        ɵɵelementStart(8, "div", 21);
        ɵɵtemplate(9, MultiSelect_ng_container_9_Template, 3, 2, "ng-container", 22)(10, MultiSelect_ng_template_10_Template, 2, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵelementStart(12, "p-overlay", 23, 2);
        ɵɵtwoWayListener("visibleChange", function MultiSelect_Template_p_overlay_visibleChange_12_listener($event) {
          ɵɵrestoreView(_r1);
          ɵɵtwoWayBindingSet(ctx.overlayVisible, $event) || (ctx.overlayVisible = $event);
          return ɵɵresetView($event);
        });
        ɵɵlistener("onAnimationStart", function MultiSelect_Template_p_overlay_onAnimationStart_12_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onOverlayAnimationStart($event));
        })("onHide", function MultiSelect_Template_p_overlay_onHide_12_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.hide());
        });
        ɵɵtemplate(14, MultiSelect_ng_template_14_Template, 13, 18, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        let tmp_15_0;
        const elseBlock_r24 = ɵɵreference(11);
        ɵɵattribute("data-p-hidden-accessible", true);
        ɵɵadvance();
        ɵɵproperty("pTooltip", ctx.tooltip)("tooltipPosition", ctx.tooltipPosition)("positionStyle", ctx.tooltipPositionStyle)("tooltipStyleClass", ctx.tooltipStyleClass)("pAutoFocus", ctx.autofocus);
        ɵɵattribute("aria-disabled", ctx.disabled)("id", ctx.inputId)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledBy)("aria-haspopup", "listbox")("aria-expanded", (tmp_15_0 = ctx.overlayVisible) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : false)("aria-controls", ctx.overlayVisible ? ctx.id + "_list" : null)("tabindex", !ctx.disabled ? ctx.tabindex : -1)("aria-activedescendant", ctx.focused ? ctx.focusedOptionId : void 0)("value", ctx.label() || "empty");
        ɵɵadvance(2);
        ɵɵproperty("pTooltip", ctx.tooltip)("tooltipDisabled", ctx._disableTooltip)("tooltipPosition", ctx.tooltipPosition)("positionStyle", ctx.tooltipPositionStyle)("tooltipStyleClass", ctx.tooltipStyleClass);
        ɵɵadvance();
        ɵɵproperty("ngClass", ctx.labelClass);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.selectedItemsTemplate && !ctx._selectedItemsTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.selectedItemsTemplate || ctx._selectedItemsTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.isVisibleClearIcon);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.loading)("ngIfElse", elseBlock_r24);
        ɵɵadvance(3);
        ɵɵtwoWayProperty("visible", ctx.overlayVisible);
        ɵɵproperty("options", ctx.overlayOptions)("target", "@parent")("appendTo", ctx.appendTo)("autoZIndex", ctx.autoZIndex)("baseZIndex", ctx.baseZIndex)("showTransitionOptions", ctx.showTransitionOptions)("hideTransitionOptions", ctx.hideTransitionOptions);
      }
    },
    dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, MultiSelectItem, Overlay, SharedModule, Tooltip, Scroller, AutoFocus, CheckIcon, SearchIcon, TimesIcon, ChevronDownIcon, IconField, InputIcon, InputText, Chip, Checkbox, FormsModule, NgControlStatus, NgModel],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelect, [{
    type: Component,
    args: [{
      selector: "p-multiSelect, p-multiselect, p-multi-select",
      standalone: true,
      imports: [CommonModule, MultiSelectItem, Overlay, SharedModule, Tooltip, Scroller, AutoFocus, CheckIcon, SearchIcon, TimesIcon, ChevronDownIcon, IconField, InputIcon, InputText, Chip, Checkbox, FormsModule],
      template: `
        <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
            <input
                #focusInput
                [pTooltip]="tooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
                [attr.aria-disabled]="disabled"
                [attr.id]="inputId"
                role="combobox"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                [attr.tabindex]="!disabled ? tabindex : -1"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [pAutoFocus]="autofocus"
                [attr.value]="label() || 'empty'"
            />
        </div>
        <div
            class="p-multiselect-label-container"
            [pTooltip]="tooltip"
            (mouseleave)="labelContainerMouseLeave()"
            [tooltipDisabled]="_disableTooltip"
            [tooltipPosition]="tooltipPosition"
            [positionStyle]="tooltipPositionStyle"
            [tooltipStyleClass]="tooltipStyleClass"
        >
            <div [ngClass]="labelClass">
                <ng-container *ngIf="!selectedItemsTemplate && !_selectedItemsTemplate">
                    <ng-container *ngIf="display === 'comma'">{{ label() || 'empty' }}</ng-container>
                    <ng-container *ngIf="display === 'chip'">
                        @if (chipSelectedItems() && chipSelectedItems().length === maxSelectedLabels) {
                            {{ getSelectedItemsLabel() }}
                        } @else {
                            <div #token *ngFor="let item of chipSelectedItems(); let i = index" class="p-multiselect-chip-item">
                                <p-chip styleClass="p-multiselect-chip" [label]="getLabelByValue(item)" [removable]="!disabled && !readonly" (onRemove)="removeOption(item, $event)" [removeIcon]="chipIcon">
                                    <ng-container *ngIf="chipIconTemplate || _chipIconTemplate || removeTokenIconTemplate || _removeTokenIconTemplate">
                                        <ng-template #removeicon>
                                            <ng-container *ngIf="!disabled && !readonly">
                                                <span
                                                    class="p-multiselect-chip-icon"
                                                    *ngIf="chipIconTemplate || _chipIconTemplate || removeTokenIconTemplate || _removeTokenIconTemplate"
                                                    (click)="removeOption(item, $event)"
                                                    [attr.data-pc-section]="'clearicon'"
                                                    [attr.aria-hidden]="true"
                                                >
                                                    <ng-container *ngTemplateOutlet="chipIconTemplate || _chipIconTemplate || removeTokenIconTemplate || _removeTokenIconTemplate; context: { class: 'p-multiselect-chip-icon' }"></ng-container>
                                                </span>
                                            </ng-container>
                                        </ng-template>
                                    </ng-container>
                                </p-chip>
                            </div>
                        }
                        <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || defaultLabel || 'empty' }}</ng-container>
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="selectedItemsTemplate || _selectedItemsTemplate">
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate || _selectedItemsTemplate; context: { $implicit: selectedOptions, removeChip: removeOption.bind(this) }"></ng-container>
                    <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || defaultLabel || 'empty' }}</ng-container>
                </ng-container>
            </div>
        </div>
        <ng-container *ngIf="isVisibleClearIcon">
            <TimesIcon *ngIf="!clearIconTemplate && !_clearIconTemplate" class="p-multiselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
            <span *ngIf="clearIconTemplate || _clearIconTemplate" class="p-multiselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate"></ng-template>
            </span>
        </ng-container>
        <div class="p-multiselect-dropdown">
            <ng-container *ngIf="loading; else elseBlock">
                <ng-container *ngIf="loadingIconTemplate || _loadingIconTemplate">
                    <ng-container *ngTemplateOutlet="loadingIconTemplate || _loadingIconTemplate"></ng-container>
                </ng-container>
                <ng-container *ngIf="!loadingIconTemplate && !_loadingIconTemplate">
                    <span *ngIf="loadingIcon" [ngClass]="'p-multiselect-loading-icon pi-spin ' + loadingIcon" aria-hidden="true"></span>
                    <span *ngIf="!loadingIcon" [class]="'p-multiselect-loading-icon pi pi-spinner pi-spin'" aria-hidden="true"></span>
                </ng-container>
            </ng-container>
            <ng-template #elseBlock>
                <ng-container *ngIf="!dropdownIconTemplate && !_dropdownIconTemplate">
                    <span *ngIf="dropdownIcon" class="p-multiselect-dropdown-icon" [ngClass]="dropdownIcon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true"></span>
                    <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-multiselect-dropdown-icon'" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true" />
                </ng-container>
                <span *ngIf="dropdownIconTemplate || _dropdownIconTemplate" class="p-multiselect-dropdown-icon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate || _dropdownIconTemplate"></ng-template>
                </span>
            </ng-template>
        </div>
        <p-overlay
            #overlay
            [(visible)]="overlayVisible"
            [options]="overlayOptions"
            [target]="'@parent'"
            [appendTo]="appendTo"
            [autoZIndex]="autoZIndex"
            [baseZIndex]="baseZIndex"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            (onAnimationStart)="onOverlayAnimationStart($event)"
            (onHide)="hide()"
        >
            <ng-template #content>
                <div [attr.id]="id + '_list'" [ngClass]="'p-multiselect-overlay p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                    <span
                        #firstHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onFirstHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                    >
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                    <div class="p-multiselect-header" *ngIf="showHeader">
                        <ng-content select="p-header"></ng-content>
                        <ng-container *ngIf="filterTemplate || _filterTemplate; else builtInFilterElement">
                            <ng-container *ngTemplateOutlet="filterTemplate || _filterTemplate; context: { options: filterOptions }"></ng-container>
                        </ng-container>
                        <ng-template #builtInFilterElement>
                            <p-checkbox [ngModel]="allSelected()" [ariaLabel]="toggleAllAriaLabel" [binary]="true" (onChange)="onToggleAll($event)" *ngIf="showToggleAll && !selectionLimit" [variant]="variant" [disabled]="disabled" #headerCheckbox>
                                <ng-template #checkboxicon let-klass="class">
                                    <CheckIcon *ngIf="!headerCheckboxIconTemplate && !_headerCheckboxIconTemplate && allSelected()" [styleClass]="klass" [attr.data-pc-section]="'icon'" />
                                    <ng-template
                                        *ngTemplateOutlet="
                                            headerCheckboxIconTemplate || _headerCheckboxIconTemplate;
                                            context: {
                                                checked: allSelected(),
                                                partialSelected: partialSelected(),
                                                class: klass
                                            }
                                        "
                                    ></ng-template>
                                </ng-template>
                            </p-checkbox>

                            <div class="p-multiselect-filter-container" *ngIf="filter">
                                <p-iconfield>
                                    <input
                                        #filterInput
                                        pInputText
                                        [variant]="variant"
                                        type="text"
                                        [attr.autocomplete]="autocomplete"
                                        role="searchbox"
                                        [attr.aria-owns]="id + '_list'"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        [value]="_filterValue() || ''"
                                        (input)="onFilterInputChange($event)"
                                        (keydown)="onFilterKeyDown($event)"
                                        (click)="onInputClick($event)"
                                        (blur)="onFilterBlur($event)"
                                        class="p-multiselect-filter"
                                        [disabled]="disabled"
                                        [attr.placeholder]="filterPlaceHolder"
                                        [attr.aria-label]="ariaFilterLabel"
                                    />
                                    <p-inputicon>
                                        <SearchIcon [styleClass]="'p-multiselect-filter-icon'" *ngIf="!filterIconTemplate && !_filterIconTemplate" />
                                        <span *ngIf="filterIconTemplate || _filterIconTemplate" class="p-multiselect-filter-icon">
                                            <ng-template *ngTemplateOutlet="filterIconTemplate || _filterIconTemplate"></ng-template>
                                        </span>
                                    </p-inputicon>
                                </p-iconfield>
                            </div>
                        </ng-template>
                    </div>
                    <div class="p-multiselect-list-container" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                        <p-scroller
                            *ngIf="virtualScroll"
                            #scroller
                            [items]="visibleOptions()"
                            [style]="{ height: scrollHeight }"
                            [itemSize]="virtualScrollItemSize || _itemSize"
                            [autoSize]="true"
                            [tabindex]="-1"
                            [lazy]="lazy"
                            (onLazyLoad)="onLazyLoad.emit($event)"
                            [options]="virtualScrollOptions"
                        >
                            <ng-template #content let-items let-scrollerOptions="options">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                            </ng-template>
                            <ng-container *ngIf="loaderTemplate || _loaderTemplate">
                                <ng-template #loader let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="loaderTemplate || _loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                </ng-template>
                            </ng-container>
                        </p-scroller>
                        <ng-container *ngIf="!virtualScroll">
                            <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                        </ng-container>

                        <ng-template #buildInItems let-items let-scrollerOptions="options">
                            <ul #items class="p-multiselect-list" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel">
                                <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                    <ng-container *ngIf="isOptionGroup(option)">
                                        <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-multiselect-option-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                            <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                            <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                        </li>
                                    </ng-container>
                                    <ng-container *ngIf="!isOptionGroup(option)">
                                        <p-multiselect-item
                                            [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                            [option]="option"
                                            [selected]="isSelected(option)"
                                            [label]="getOptionLabel(option)"
                                            [disabled]="isOptionDisabled(option)"
                                            [template]="itemTemplate || _itemTemplate"
                                            [checkIconTemplate]="checkIconTemplate || _checkIconTemplate"
                                            [itemCheckboxIconTemplate]="itemCheckboxIconTemplate || _itemCheckboxIconTemplate"
                                            [itemSize]="scrollerOptions.itemSize"
                                            [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                            [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                            [ariaSetSize]="ariaSetSize"
                                            [variant]="variant"
                                            [highlightOnSelect]="highlightOnSelect"
                                            (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                            (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                        ></p-multiselect-item>
                                    </ng-container>
                                </ng-template>

                                <li *ngIf="hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                    @if (!emptyFilterTemplate && !_emptyFilterTemplate && !emptyTemplate && !_emptyTemplate) {
                                        {{ emptyFilterMessageLabel }}
                                    } @else {
                                        <ng-container *ngTemplateOutlet="emptyFilterTemplate || _emptyFilterTemplate || emptyTemplate || _emptyFilterTemplate"></ng-container>
                                    }
                                </li>
                                <li *ngIf="!hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                    @if (!emptyTemplate && !_emptyTemplate) {
                                        {{ emptyMessageLabel }}
                                    } @else {
                                        <ng-container *ngTemplateOutlet="emptyTemplate || _emptyTemplate"></ng-container>
                                    }
                                </li>
                            </ul>
                        </ng-template>
                    </div>
                    <div *ngIf="footerFacet || footerTemplate || _footerTemplate">
                        <ng-content select="p-footer"></ng-content>
                        <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                    </div>

                    <span
                        #lastHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onLastHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                    ></span>
                </div>
            </ng-template>
        </p-overlay>
    `,
      providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectStyle],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[attr.id]": "id",
        "[style]": "style",
        "(click)": "onContainerClick($event)",
        "[class.p-variant-filled]": 'variant === "filled" || config.inputVariant() === "filled" || config.inputStyle() === "filled" '
      }
    }]
  }], () => [{
    type: NgZone
  }, {
    type: FilterService
  }, {
    type: OverlayService
  }], {
    id: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    panelStyle: [{
      type: Input
    }],
    panelStyleClass: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    fluid: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    group: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterPlaceHolder: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    overlayVisible: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    variant: [{
      type: Input
    }],
    appendTo: [{
      type: Input
    }],
    dataKey: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    displaySelectedLabel: [{
      type: Input
    }],
    maxSelectedLabels: [{
      type: Input
    }],
    selectionLimit: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    selectedItemsLabel: [{
      type: Input
    }],
    showToggleAll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    emptyFilterMessage: [{
      type: Input
    }],
    emptyMessage: [{
      type: Input
    }],
    resetFilterOnHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dropdownIcon: [{
      type: Input
    }],
    chipIcon: [{
      type: Input
    }],
    optionLabel: [{
      type: Input
    }],
    optionValue: [{
      type: Input
    }],
    optionDisabled: [{
      type: Input
    }],
    optionGroupLabel: [{
      type: Input
    }],
    optionGroupChildren: [{
      type: Input
    }],
    showHeader: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterBy: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    lazy: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    virtualScroll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    virtualScrollItemSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    loadingIcon: [{
      type: Input
    }],
    virtualScrollOptions: [{
      type: Input
    }],
    overlayOptions: [{
      type: Input
    }],
    ariaFilterLabel: [{
      type: Input
    }],
    filterMatchMode: [{
      type: Input
    }],
    tooltip: [{
      type: Input
    }],
    tooltipPosition: [{
      type: Input
    }],
    tooltipPositionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    autofocusFilter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    display: [{
      type: Input
    }],
    autocomplete: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    showClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoZIndex: [{
      type: Input
    }],
    baseZIndex: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    defaultLabel: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    filterValue: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    selectAll: [{
      type: Input
    }],
    focusOnHover: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterFields: [{
      type: Input
    }],
    selectOnFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoOptionFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    highlightOnSelect: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onChange: [{
      type: Output
    }],
    onFilter: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onClick: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    onPanelShow: [{
      type: Output
    }],
    onPanelHide: [{
      type: Output
    }],
    onLazyLoad: [{
      type: Output
    }],
    onRemove: [{
      type: Output
    }],
    onSelectAllChange: [{
      type: Output
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    filterInputChild: [{
      type: ViewChild,
      args: ["filterInput"]
    }],
    focusInputViewChild: [{
      type: ViewChild,
      args: ["focusInput"]
    }],
    itemsViewChild: [{
      type: ViewChild,
      args: ["items"]
    }],
    scroller: [{
      type: ViewChild,
      args: ["scroller"]
    }],
    lastHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["lastHiddenFocusableEl"]
    }],
    firstHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["firstHiddenFocusableEl"]
    }],
    headerCheckboxViewChild: [{
      type: ViewChild,
      args: ["headerCheckbox"]
    }],
    footerFacet: [{
      type: ContentChild,
      args: [Footer]
    }],
    headerFacet: [{
      type: ContentChild,
      args: [Header]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    groupTemplate: [{
      type: ContentChild,
      args: ["group", {
        descendants: false
      }]
    }],
    loaderTemplate: [{
      type: ContentChild,
      args: ["loader", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    filterTemplate: [{
      type: ContentChild,
      args: ["filter", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    emptyFilterTemplate: [{
      type: ContentChild,
      args: ["emptyfilter", {
        descendants: false
      }]
    }],
    emptyTemplate: [{
      type: ContentChild,
      args: ["empty", {
        descendants: false
      }]
    }],
    selectedItemsTemplate: [{
      type: ContentChild,
      args: ["selecteditems", {
        descendants: false
      }]
    }],
    checkIconTemplate: [{
      type: ContentChild,
      args: ["checkicon", {
        descendants: false
      }]
    }],
    loadingIconTemplate: [{
      type: ContentChild,
      args: ["loadingicon", {
        descendants: false
      }]
    }],
    filterIconTemplate: [{
      type: ContentChild,
      args: ["filtericon", {
        descendants: false
      }]
    }],
    removeTokenIconTemplate: [{
      type: ContentChild,
      args: ["removetokenicon", {
        descendants: false
      }]
    }],
    chipIconTemplate: [{
      type: ContentChild,
      args: ["chipicon", {
        descendants: false
      }]
    }],
    clearIconTemplate: [{
      type: ContentChild,
      args: ["clearicon", {
        descendants: false
      }]
    }],
    dropdownIconTemplate: [{
      type: ContentChild,
      args: ["dropdownicon", {
        descendants: false
      }]
    }],
    itemCheckboxIconTemplate: [{
      type: ContentChild,
      args: ["itemcheckboxicon", {
        descendants: false
      }]
    }],
    headerCheckboxIconTemplate: [{
      type: ContentChild,
      args: ["headercheckboxicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    hostClasses: [{
      type: HostBinding,
      args: ["class"]
    }]
  });
})();
var MultiSelectModule = class _MultiSelectModule {
  static ɵfac = function MultiSelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MultiSelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MultiSelectModule,
    imports: [MultiSelect, SharedModule],
    exports: [MultiSelect, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MultiSelect, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectModule, [{
    type: NgModule,
    args: [{
      imports: [MultiSelect, SharedModule],
      exports: [MultiSelect, SharedModule]
    }]
  }], null, null);
})();
export {
  MULTISELECT_VALUE_ACCESSOR,
  MultiSelect,
  MultiSelectClasses,
  MultiSelectItem,
  MultiSelectModule,
  MultiSelectStyle
};
//# sourceMappingURL=primeng_multiselect.js.map
