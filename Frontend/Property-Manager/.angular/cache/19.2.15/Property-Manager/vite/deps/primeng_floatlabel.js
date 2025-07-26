import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import "./chunk-FXJ6C54V.js";
import {
  BaseStyle
} from "./chunk-UO5IQQ7M.js";
import {
  SharedModule
} from "./chunk-GNCTJO57.js";
import {
  CommonModule
} from "./chunk-UCCE5RQP.js";
import "./chunk-B5QHEHR4.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  NgModule,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-RFZ2BTTM.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-floatlabel.mjs
var _c0 = ["*"];
var theme = ({
  dt
}) => `
.p-floatlabel {
    display: block;
    position: relative;
}

.p-floatlabel label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
    transition-property: all;
    transition-timing-function: ease;
    line-height: 1;
    font-weight: ${dt("floatlabel.font.weight")};
    inset-inline-start: ${dt("floatlabel.position.x")};
    color: ${dt("floatlabel.color")};
    transition-duration: ${dt("floatlabel.transition.duration")};
}

.p-floatlabel:has(.p-textarea) label {
    top: ${dt("floatlabel.position.y")};
    transform: translateY(0);
}

.p-floatlabel:has(.p-inputicon:first-child) label {
    inset-inline-start: calc((${dt("form.field.padding.x")} * 2) + ${dt("icon.size")});
}

.p-floatlabel:has(.ng-invalid.ng-dirty) label {
    color: ${dt("floatlabel.invalid.color")};
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-focus) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    top: ${dt("floatlabel.over.active.top")};
    transform: translateY(0);
    font-size: ${dt("floatlabel.active.font.size")};
    font-weight: ${dt("floatlabel.label.active.font.weight")};
}

.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    color: ${dt("floatlabel.active.color")};
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(.p-inputwrapper-focus) label {
    color: ${dt("floatlabel.focus.color")};
}

.p-floatlabel-in .p-inputtext,
.p-floatlabel-in .p-textarea,
.p-floatlabel-in .p-select-label,
.p-floatlabel-in .p-multiselect-label-container,
.p-floatlabel-in .p-autocomplete-input-multiple,
.p-floatlabel-in .p-cascadeselect-label,
.p-floatlabel-in .p-treeselect-label {
    padding-top: ${dt("floatlabel.in.input.padding.top")};
}

.p-floatlabel-in:has(input:focus) label,
.p-floatlabel-in:has(input.p-filled) label,
.p-floatlabel-in:has(input:-webkit-autofill) label,
.p-floatlabel-in:has(textarea:focus) label,
.p-floatlabel-in:has(textarea.p-filled) label,
.p-floatlabel-in:has(.p-inputwrapper-focus) label,
.p-floatlabel-in:has(.p-inputwrapper-filled) label {
    top: ${dt("floatlabel.in.active.top")};
}

.p-floatlabel-on:has(input:focus) label,
.p-floatlabel-on:has(input.p-filled) label,
.p-floatlabel-on:has(input:-webkit-autofill) label,
.p-floatlabel-on:has(textarea:focus) label,
.p-floatlabel-on:has(textarea.p-filled) label,
.p-floatlabel-on:has(.p-inputwrapper-focus) label,
.p-floatlabel-on:has(.p-inputwrapper-filled) label {
    top: 0;
    transform: translateY(-50%);
    border-radius: ${dt("floatlabel.on.border.radius")};
    background: ${dt("floatlabel.on.active.background")};
    padding: ${dt("floatlabel.on.active.padding")};
}
`;
var classes = {
  root: ({
    instance,
    props
  }) => ["p-floatlabel", {
    "p-floatlabel-over": props.variant === "over",
    "p-floatlabel-on": props.variant === "on",
    "p-floatlabel-in": props.variant === "in"
  }]
};
var FloatLabelStyle = class _FloatLabelStyle extends BaseStyle {
  name = "floatlabel";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵFloatLabelStyle_BaseFactory;
    return function FloatLabelStyle_Factory(__ngFactoryType__) {
      return (ɵFloatLabelStyle_BaseFactory || (ɵFloatLabelStyle_BaseFactory = ɵɵgetInheritedFactory(_FloatLabelStyle)))(__ngFactoryType__ || _FloatLabelStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _FloatLabelStyle,
    factory: _FloatLabelStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FloatLabelStyle, [{
    type: Injectable
  }], null, null);
})();
var FloatLabelClasses;
(function(FloatLabelClasses2) {
  FloatLabelClasses2["root"] = "p-floatlabel";
})(FloatLabelClasses || (FloatLabelClasses = {}));
var FloatLabel = class _FloatLabel extends BaseComponent {
  _componentStyle = inject(FloatLabelStyle);
  /**
   * Defines the positioning of the label relative to the input.
   * @group Props
   */
  variant = "over";
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵFloatLabel_BaseFactory;
    return function FloatLabel_Factory(__ngFactoryType__) {
      return (ɵFloatLabel_BaseFactory || (ɵFloatLabel_BaseFactory = ɵɵgetInheritedFactory(_FloatLabel)))(__ngFactoryType__ || _FloatLabel);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _FloatLabel,
    selectors: [["p-floatlabel"], ["p-floatLabel"], ["p-float-label"]],
    hostVars: 8,
    hostBindings: function FloatLabel_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("p-floatlabel", true)("p-floatlabel-over", ctx.variant === "over")("p-floatlabel-on", ctx.variant === "on")("p-floatlabel-in", ctx.variant === "in");
      }
    },
    inputs: {
      variant: "variant"
    },
    features: [ɵɵProvidersFeature([FloatLabelStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function FloatLabel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FloatLabel, [{
    type: Component,
    args: [{
      selector: "p-floatlabel, p-floatLabel, p-float-label",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: ` <ng-content></ng-content> `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [FloatLabelStyle],
      host: {
        "[class.p-floatlabel]": "true",
        "[class.p-floatlabel-over]": "variant === 'over'",
        "[class.p-floatlabel-on]": "variant === 'on'",
        "[class.p-floatlabel-in]": "variant === 'in'"
      }
    }]
  }], null, {
    variant: [{
      type: Input
    }]
  });
})();
var FloatLabelModule = class _FloatLabelModule {
  static ɵfac = function FloatLabelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FloatLabelModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FloatLabelModule,
    imports: [FloatLabel, SharedModule],
    exports: [FloatLabel, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [FloatLabel, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FloatLabelModule, [{
    type: NgModule,
    args: [{
      imports: [FloatLabel, SharedModule],
      exports: [FloatLabel, SharedModule]
    }]
  }], null, null);
})();
export {
  FloatLabel,
  FloatLabelClasses,
  FloatLabelModule,
  FloatLabelStyle
};
//# sourceMappingURL=primeng_floatlabel.js.map
