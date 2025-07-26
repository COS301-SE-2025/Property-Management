import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import {
  NgModel
} from "./chunk-SAJDAZDE.js";
import {
  BaseStyle
} from "./chunk-UO5IQQ7M.js";
import {
  isEmpty
} from "./chunk-GNCTJO57.js";
import {
  Directive,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Optional,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵclassProp,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵlistener
} from "./chunk-RFZ2BTTM.js";

// node_modules/primeng/fesm2022/primeng-inputtext.mjs
var theme = ({
  dt
}) => `
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${dt("inputtext.color")};
    background: ${dt("inputtext.background")};
    padding-block: ${dt("inputtext.padding.y")};
    padding-inline: ${dt("inputtext.padding.x")};
    border: 1px solid ${dt("inputtext.border.color")};
    transition: background ${dt("inputtext.transition.duration")}, color ${dt("inputtext.transition.duration")}, border-color ${dt("inputtext.transition.duration")}, outline-color ${dt("inputtext.transition.duration")}, box-shadow ${dt("inputtext.transition.duration")};
    appearance: none;
    border-radius: ${dt("inputtext.border.radius")};
    outline-color: transparent;
    box-shadow: ${dt("inputtext.shadow")};
}

.p-inputtext.ng-invalid.ng-dirty {
    border-color: ${dt("inputtext.invalid.border.color")};
}

.p-inputtext:enabled:hover {
    border-color: ${dt("inputtext.hover.border.color")};
}

.p-inputtext:enabled:focus {
    border-color: ${dt("inputtext.focus.border.color")};
    box-shadow: ${dt("inputtext.focus.ring.shadow")};
    outline: ${dt("inputtext.focus.ring.width")} ${dt("inputtext.focus.ring.style")} ${dt("inputtext.focus.ring.color")};
    outline-offset: ${dt("inputtext.focus.ring.offset")};
}

.p-inputtext.p-invalid {
    border-color: ${dt("inputtext.invalid.border.color")};
}

.p-inputtext.p-variant-filled {
    background: ${dt("inputtext.filled.background")};
}
    
.p-inputtext.p-variant-filled:enabled:hover {
    background: ${dt("inputtext.filled.hover.background")};
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: ${dt("inputtext.filled.focus.background")};
}

.p-inputtext:disabled {
    opacity: 1;
    background: ${dt("inputtext.disabled.background")};
    color: ${dt("inputtext.disabled.color")};
}

.p-inputtext::placeholder {
    color: ${dt("inputtext.placeholder.color")};
}

.p-inputtext.ng-invalid.ng-dirty::placeholder {
    color: ${dt("inputtext.invalid.placeholder.color")};
}

.p-inputtext-sm {
    font-size: ${dt("inputtext.sm.font.size")};
    padding-block: ${dt("inputtext.sm.padding.y")};
    padding-inline: ${dt("inputtext.sm.padding.x")};
}

.p-inputtext-lg {
    font-size: ${dt("inputtext.lg.font.size")};
    padding-block: ${dt("inputtext.lg.padding.y")};
    padding-inline: ${dt("inputtext.lg.padding.x")};
}

.p-inputtext-fluid {
    width: 100%;
}
`;
var classes = {
  root: ({
    instance,
    props
  }) => ["p-inputtext p-component", {
    "p-filled": instance.filled,
    "p-inputtext-sm": props.size === "small",
    "p-inputtext-lg": props.size === "large",
    "p-invalid": props.invalid,
    "p-variant-filled": props.variant === "filled",
    "p-inputtext-fluid": props.fluid
  }]
};
var InputTextStyle = class _InputTextStyle extends BaseStyle {
  name = "inputtext";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputTextStyle_BaseFactory;
    return function InputTextStyle_Factory(__ngFactoryType__) {
      return (ɵInputTextStyle_BaseFactory || (ɵInputTextStyle_BaseFactory = ɵɵgetInheritedFactory(_InputTextStyle)))(__ngFactoryType__ || _InputTextStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _InputTextStyle,
    factory: _InputTextStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextStyle, [{
    type: Injectable
  }], null, null);
})();
var InputTextClasses;
(function(InputTextClasses2) {
  InputTextClasses2["root"] = "p-inputtext";
})(InputTextClasses || (InputTextClasses = {}));
var InputText = class _InputText extends BaseComponent {
  ngModel;
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant;
  /**
   * Spans 100% width of the container when enabled.
   * @group Props
   */
  fluid;
  /**
   * Defines the size of the component.
   * @group Props
   */
  pSize;
  filled;
  _componentStyle = inject(InputTextStyle);
  get hasFluid() {
    const nativeElement = this.el.nativeElement;
    const fluidComponent = nativeElement.closest("p-fluid");
    return isEmpty(this.fluid) ? !!fluidComponent : this.fluid;
  }
  constructor(ngModel) {
    super();
    this.ngModel = ngModel;
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.updateFilledState();
    this.cd.detectChanges();
  }
  ngDoCheck() {
    this.updateFilledState();
  }
  onInput() {
    this.updateFilledState();
  }
  updateFilledState() {
    this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length || this.ngModel && this.ngModel.model;
  }
  static ɵfac = function InputText_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputText)(ɵɵdirectiveInject(NgModel, 8));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _InputText,
    selectors: [["", "pInputText", ""]],
    hostAttrs: [1, "p-inputtext", "p-component"],
    hostVars: 14,
    hostBindings: function InputText_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function InputText_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
      if (rf & 2) {
        let tmp_1_0;
        ɵɵclassProp("p-filled", ctx.filled)("p-variant-filled", ((tmp_1_0 = ctx.variant) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : ctx.config.inputStyle() || ctx.config.inputVariant()) === "filled")("p-inputtext-fluid", ctx.hasFluid)("p-inputtext-sm", ctx.pSize === "small")("p-inputfield-sm", ctx.pSize === "small")("p-inputtext-lg", ctx.pSize === "large")("p-inputfield-lg", ctx.pSize === "large");
      }
    },
    inputs: {
      variant: "variant",
      fluid: [2, "fluid", "fluid", booleanAttribute],
      pSize: "pSize"
    },
    features: [ɵɵProvidersFeature([InputTextStyle]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputText, [{
    type: Directive,
    args: [{
      selector: "[pInputText]",
      standalone: true,
      host: {
        class: "p-inputtext p-component",
        "[class.p-filled]": "filled",
        "[class.p-variant-filled]": '(variant ?? (config.inputStyle() || config.inputVariant())) === "filled"',
        "[class.p-inputtext-fluid]": "hasFluid",
        "[class.p-inputtext-sm]": 'pSize === "small"',
        "[class.p-inputfield-sm]": 'pSize === "small"',
        "[class.p-inputtext-lg]": 'pSize === "large"',
        "[class.p-inputfield-lg]": 'pSize === "large"'
      },
      providers: [InputTextStyle]
    }]
  }], () => [{
    type: NgModel,
    decorators: [{
      type: Optional
    }]
  }], {
    variant: [{
      type: Input
    }],
    fluid: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    pSize: [{
      type: Input,
      args: ["pSize"]
    }],
    onInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();
var InputTextModule = class _InputTextModule {
  static ɵfac = function InputTextModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputTextModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputTextModule,
    imports: [InputText],
    exports: [InputText]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextModule, [{
    type: NgModule,
    args: [{
      imports: [InputText],
      exports: [InputText]
    }]
  }], null, null);
})();

export {
  InputTextStyle,
  InputTextClasses,
  InputText,
  InputTextModule
};
//# sourceMappingURL=chunk-6MYU3LLA.js.map
