import {
  AutoFocus
} from "./chunk-STA2ZUYP.js";
import "./chunk-5G7WYC4N.js";
import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-SAJDAZDE.js";
import "./chunk-FXJ6C54V.js";
import {
  BaseStyle
} from "./chunk-UO5IQQ7M.js";
import {
  SharedModule,
  addClass,
  getWindowScrollLeft,
  getWindowScrollTop,
  isRTL,
  removeClass
} from "./chunk-GNCTJO57.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgStyle
} from "./chunk-UCCE5RQP.js";
import {
  isPlatformBrowser
} from "./chunk-B5QHEHR4.js";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  forwardRef,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction4,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-RFZ2BTTM.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-slider.mjs
var _c0 = ["sliderHandle"];
var _c1 = ["sliderHandleStart"];
var _c2 = ["sliderHandleEnd"];
var _c3 = (a0, a1, a2, a3) => ({
  "p-slider p-component": true,
  "p-disabled": a0,
  "p-slider-horizontal": a1,
  "p-slider-vertical": a2,
  "p-slider-animate": a3
});
var _c4 = (a0, a1) => ({
  position: "absolute",
  "inset-inline-start": a0,
  width: a1
});
var _c5 = (a0, a1) => ({
  position: "absolute",
  bottom: a0,
  height: a1
});
var _c6 = (a0) => ({
  position: "absolute",
  height: a0
});
var _c7 = (a0) => ({
  position: "absolute",
  width: a0
});
var _c8 = (a0, a1) => ({
  position: "absolute",
  "inset-inline-start": a0,
  bottom: a1
});
var _c9 = (a0) => ({
  "p-slider-handle-active": a0
});
function Slider_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ɵɵpureFunction2(2, _c4, ctx_r0.offset !== null && ctx_r0.offset !== void 0 ? ctx_r0.offset + "%" : ctx_r0.handleValues[0] + "%", ctx_r0.diff ? ctx_r0.diff + "%" : ctx_r0.handleValues[1] - ctx_r0.handleValues[0] + "%"));
    ɵɵattribute("data-pc-section", "range");
  }
}
function Slider_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ɵɵpureFunction2(2, _c5, ctx_r0.offset !== null && ctx_r0.offset !== void 0 ? ctx_r0.offset + "%" : ctx_r0.handleValues[0] + "%", ctx_r0.diff ? ctx_r0.diff + "%" : ctx_r0.handleValues[1] - ctx_r0.handleValues[0] + "%"));
    ɵɵattribute("data-pc-section", "range");
  }
}
function Slider_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ɵɵpureFunction1(2, _c6, ctx_r0.handleValue + "%"));
    ɵɵattribute("data-pc-section", "range");
  }
}
function Slider_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ɵɵpureFunction1(2, _c7, ctx_r0.handleValue + "%"));
    ɵɵattribute("data-pc-section", "range");
  }
}
function Slider_span_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 9, 0);
    ɵɵlistener("touchstart", function Slider_span_5_Template_span_touchstart_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDragStart($event));
    })("touchmove", function Slider_span_5_Template_span_touchmove_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDrag($event));
    })("touchend", function Slider_span_5_Template_span_touchend_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDragEnd($event));
    })("mousedown", function Slider_span_5_Template_span_mousedown_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onMouseDown($event));
    })("keydown", function Slider_span_5_Template_span_keydown_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onKeyDown($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleProp("transition", ctx_r0.dragging ? "none" : null);
    ɵɵproperty("ngStyle", ɵɵpureFunction2(12, _c8, ctx_r0.orientation == "horizontal" ? ctx_r0.handleValue + "%" : null, ctx_r0.orientation == "vertical" ? ctx_r0.handleValue + "%" : null))("pAutoFocus", ctx_r0.autofocus);
    ɵɵattribute("tabindex", ctx_r0.disabled ? null : ctx_r0.tabindex)("aria-valuemin", ctx_r0.min)("aria-valuenow", ctx_r0.value)("aria-valuemax", ctx_r0.max)("aria-labelledby", ctx_r0.ariaLabelledBy)("aria-label", ctx_r0.ariaLabel)("aria-orientation", ctx_r0.orientation)("data-pc-section", "handle");
  }
}
function Slider_span_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 10, 1);
    ɵɵlistener("keydown", function Slider_span_6_Template_span_keydown_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onKeyDown($event, 0));
    })("mousedown", function Slider_span_6_Template_span_mousedown_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onMouseDown($event, 0));
    })("touchstart", function Slider_span_6_Template_span_touchstart_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDragStart($event, 0));
    })("touchmove", function Slider_span_6_Template_span_touchmove_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDrag($event));
    })("touchend", function Slider_span_6_Template_span_touchend_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDragEnd($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleProp("transition", ctx_r0.dragging ? "none" : null);
    ɵɵproperty("ngStyle", ɵɵpureFunction2(13, _c8, ctx_r0.rangeStartLeft, ctx_r0.rangeStartBottom))("ngClass", ɵɵpureFunction1(16, _c9, ctx_r0.handleIndex == 0))("pAutoFocus", ctx_r0.autofocus);
    ɵɵattribute("tabindex", ctx_r0.disabled ? null : ctx_r0.tabindex)("aria-valuemin", ctx_r0.min)("aria-valuenow", ctx_r0.value ? ctx_r0.value[0] : null)("aria-valuemax", ctx_r0.max)("aria-labelledby", ctx_r0.ariaLabelledBy)("aria-label", ctx_r0.ariaLabel)("aria-orientation", ctx_r0.orientation)("data-pc-section", "startHandler");
  }
}
function Slider_span_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 11, 2);
    ɵɵlistener("keydown", function Slider_span_7_Template_span_keydown_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onKeyDown($event, 1));
    })("mousedown", function Slider_span_7_Template_span_mousedown_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onMouseDown($event, 1));
    })("touchstart", function Slider_span_7_Template_span_touchstart_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDragStart($event, 1));
    })("touchmove", function Slider_span_7_Template_span_touchmove_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDrag($event));
    })("touchend", function Slider_span_7_Template_span_touchend_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onDragEnd($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleProp("transition", ctx_r0.dragging ? "none" : null);
    ɵɵproperty("ngStyle", ɵɵpureFunction2(12, _c8, ctx_r0.rangeEndLeft, ctx_r0.rangeEndBottom))("ngClass", ɵɵpureFunction1(15, _c9, ctx_r0.handleIndex == 1));
    ɵɵattribute("tabindex", ctx_r0.disabled ? null : ctx_r0.tabindex)("aria-valuemin", ctx_r0.min)("aria-valuenow", ctx_r0.value ? ctx_r0.value[1] : null)("aria-valuemax", ctx_r0.max)("aria-labelledby", ctx_r0.ariaLabelledBy)("aria-label", ctx_r0.ariaLabel)("aria-orientation", ctx_r0.orientation)("data-pc-section", "endHandler");
  }
}
var theme = ({
  dt
}) => `
.p-slider {
    position: relative;
    background: ${dt("slider.track.background")};
    border-radius: ${dt("slider.border.radius")};
}

.p-slider-handle {
    cursor: grab;
    touch-action: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${dt("slider.handle.height")};
    width: ${dt("slider.handle.width")};
    background: ${dt("slider.handle.background")};
    border-radius: ${dt("slider.handle.border.radius")};
    transition: background ${dt("slider.transition.duration")}, color ${dt("slider.transition.duration")}, border-color ${dt("slider.transition.duration")}, box-shadow ${dt("slider.transition.duration")}, outline-color ${dt("slider.transition.duration")};
    outline-color: transparent;
}

.p-slider-handle::before {
    content: "";
    width: ${dt("slider.handle.content.width")};
    height: ${dt("slider.handle.content.height")};
    display: block;
    background: ${dt("slider.handle.content.background")};
    border-radius: ${dt("slider.handle.content.border.radius")};
    box-shadow: ${dt("slider.handle.content.shadow")};
    transition: background ${dt("slider.transition.duration")};
}

.p-slider:not(.p-disabled) .p-slider-handle:hover {
    background: ${dt("slider.handle.hover.background")};
}

.p-slider:not(.p-disabled) .p-slider-handle:hover::before {
    background: ${dt("slider.handle.content.hover.background")};
}

.p-slider-handle:focus-visible {
    border-color: ${dt("slider.handle.focus.border.color")};
    box-shadow: ${dt("slider.handle.focus.ring.shadow")};
    outline: ${dt("slider.handle.focus.ring.width")} ${dt("slider.handle.focus.ring.style")} ${dt("slider.handle.focus.ring.color")};
    outline-offset: ${dt("slider.handle.focus.ring.offset")};
}

.p-slider-range {
    display: block;
    background: ${dt("slider.range.background")};
    border-radius: ${dt("slider.border.radius")};
}

.p-slider.p-slider-horizontal {
    height: ${dt("slider.track.size")};
}

.p-slider-horizontal .p-slider-range {
    top: 0;
    inset-inline-start: 0;
    height: 100%;
}

.p-slider-horizontal .p-slider-handle {
    top: 50%;
    margin-top: calc(-1 * calc(${dt("slider.handle.height")} / 2));
    margin-inline-start: calc(-1 * calc(${dt("slider.handle.width")} / 2));
}

.p-slider-vertical {
    min-height: 100px;
    width: ${dt("slider.track.size")};
}

.p-slider-vertical .p-slider-handle {
    inset-inline-start: 50%;
    margin-inline-start: calc(-1 * calc(${dt("slider.handle.width")} / 2));
    margin-bottom: calc(-1 * calc(${dt("slider.handle.height")} / 2));
}

.p-slider-vertical .p-slider-range {
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
}
`;
var inlineStyles = {
  handle: {
    position: "absolute"
  },
  range: {
    position: "absolute"
  }
};
var classes = {
  root: ({
    props
  }) => ["p-slider p-component", {
    "p-disabled": props.disabled,
    "p-slider-horizontal": props.orientation === "horizontal",
    "p-slider-vertical": props.orientation === "vertical"
  }],
  range: "p-slider-range",
  handle: "p-slider-handle"
};
var SliderStyle = class _SliderStyle extends BaseStyle {
  name = "slider";
  theme = theme;
  classes = classes;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵSliderStyle_BaseFactory;
    return function SliderStyle_Factory(__ngFactoryType__) {
      return (ɵSliderStyle_BaseFactory || (ɵSliderStyle_BaseFactory = ɵɵgetInheritedFactory(_SliderStyle)))(__ngFactoryType__ || _SliderStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _SliderStyle,
    factory: _SliderStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SliderStyle, [{
    type: Injectable
  }], null, null);
})();
var SliderClasses;
(function(SliderClasses2) {
  SliderClasses2["root"] = "p-slider";
  SliderClasses2["range"] = "p-slider-range";
  SliderClasses2["handle"] = "p-slider-handle";
})(SliderClasses || (SliderClasses = {}));
var SLIDER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Slider),
  multi: true
};
var Slider = class _Slider extends BaseComponent {
  /**
   * When enabled, displays an animation on click of the slider bar.
   * @group Props
   */
  animate;
  /**
   * When present, it specifies that the element should be disabled.
   * @group Props
   */
  disabled;
  /**
   * Mininum boundary value.
   * @group Props
   */
  min = 0;
  /**
   * Maximum boundary value.
   * @group Props
   */
  max = 100;
  /**
   * Orientation of the slider.
   * @group Props
   */
  orientation = "horizontal";
  /**
   * Step factor to increment/decrement the value.
   * @group Props
   */
  step;
  /**
   * When specified, allows two boundary values to be picked.
   * @group Props
   */
  range;
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
   * Defines a string that labels the input for accessibility.
   * @group Props
   */
  ariaLabel;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * Callback to invoke on value change.
   * @param {SliderChangeEvent} event - Custom value change event.
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke when slide ended.
   * @param {SliderSlideEndEvent} event - Custom slide end event.
   * @group Emits
   */
  onSlideEnd = new EventEmitter();
  sliderHandle;
  sliderHandleStart;
  sliderHandleEnd;
  _componentStyle = inject(SliderStyle);
  value;
  values;
  handleValue;
  handleValues = [];
  diff;
  offset;
  bottom;
  onModelChange = () => {
  };
  onModelTouched = () => {
  };
  dragging;
  dragListener;
  mouseupListener;
  initX;
  initY;
  barWidth;
  barHeight;
  sliderHandleClick;
  handleIndex = 0;
  startHandleValue;
  startx;
  starty;
  ngZone = inject(NgZone);
  onMouseDown(event, index) {
    if (this.disabled) {
      return;
    }
    this.dragging = true;
    this.updateDomData();
    this.sliderHandleClick = true;
    if (this.range && this.handleValues && this.handleValues[0] === this.max) {
      this.handleIndex = 0;
    } else {
      this.handleIndex = index;
    }
    this.bindDragListeners();
    event.target.focus();
    event.preventDefault();
    if (this.animate) {
      removeClass(this.el.nativeElement.children[0], "p-slider-animate");
    }
  }
  onDragStart(event, index) {
    if (this.disabled) {
      return;
    }
    var touchobj = event.changedTouches[0];
    this.startHandleValue = this.range ? this.handleValues[index] : this.handleValue;
    this.dragging = true;
    if (this.range && this.handleValues && this.handleValues[0] === this.max) {
      this.handleIndex = 0;
    } else {
      this.handleIndex = index;
    }
    if (this.orientation === "horizontal") {
      this.startx = parseInt(touchobj.clientX, 10);
      this.barWidth = this.el.nativeElement.children[0].offsetWidth;
    } else {
      this.starty = parseInt(touchobj.clientY, 10);
      this.barHeight = this.el.nativeElement.children[0].offsetHeight;
    }
    if (this.animate) {
      removeClass(this.el.nativeElement.children[0], "p-slider-animate");
    }
    event.preventDefault();
  }
  onDrag(event) {
    if (this.disabled) {
      return;
    }
    var touchobj = event.changedTouches[0], handleValue = 0;
    if (this.orientation === "horizontal") {
      handleValue = Math.floor((parseInt(touchobj.clientX, 10) - this.startx) * 100 / this.barWidth) + this.startHandleValue;
    } else {
      handleValue = Math.floor((this.starty - parseInt(touchobj.clientY, 10)) * 100 / this.barHeight) + this.startHandleValue;
    }
    this.setValueFromHandle(event, handleValue);
    event.preventDefault();
  }
  onDragEnd(event) {
    if (this.disabled) {
      return;
    }
    this.dragging = false;
    if (this.range) this.onSlideEnd.emit({
      originalEvent: event,
      values: this.values
    });
    else this.onSlideEnd.emit({
      originalEvent: event,
      value: this.value
    });
    if (this.animate) {
      addClass(this.el.nativeElement.children[0], "p-slider-animate");
    }
    event.preventDefault();
  }
  onBarClick(event) {
    if (this.disabled) {
      return;
    }
    if (!this.sliderHandleClick) {
      this.updateDomData();
      this.handleChange(event);
      if (this.range) this.onSlideEnd.emit({
        originalEvent: event,
        values: this.values
      });
      else this.onSlideEnd.emit({
        originalEvent: event,
        value: this.value
      });
    }
    this.sliderHandleClick = false;
  }
  onKeyDown(event, index) {
    this.handleIndex = index;
    switch (event.code) {
      case "ArrowDown":
      case "ArrowLeft":
        this.decrementValue(event, index);
        event.preventDefault();
        break;
      case "ArrowUp":
      case "ArrowRight":
        this.incrementValue(event, index);
        event.preventDefault();
        break;
      case "PageDown":
        this.decrementValue(event, index, true);
        event.preventDefault();
        break;
      case "PageUp":
        this.incrementValue(event, index, true);
        event.preventDefault();
        break;
      case "Home":
        this.updateValue(this.min, event);
        event.preventDefault();
        break;
      case "End":
        this.updateValue(this.max, event);
        event.preventDefault();
        break;
      default:
        break;
    }
  }
  decrementValue(event, index, pageKey = false) {
    let newValue;
    if (this.range) {
      if (this.step) newValue = this.values[index] - this.step;
      else newValue = this.values[index] - 1;
    } else {
      if (this.step) newValue = this.value - this.step;
      else if (!this.step && pageKey) newValue = this.value - 10;
      else newValue = this.value - 1;
    }
    this.updateValue(newValue, event);
    event.preventDefault();
  }
  incrementValue(event, index, pageKey = false) {
    let newValue;
    if (this.range) {
      if (this.step) newValue = this.values[index] + this.step;
      else newValue = this.values[index] + 1;
    } else {
      if (this.step) newValue = this.value + this.step;
      else if (!this.step && pageKey) newValue = this.value + 10;
      else newValue = this.value + 1;
    }
    this.updateValue(newValue, event);
    event.preventDefault();
  }
  handleChange(event) {
    let handleValue = this.calculateHandleValue(event);
    this.setValueFromHandle(event, handleValue);
  }
  bindDragListeners() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
        if (!this.dragListener) {
          this.dragListener = this.renderer.listen(documentTarget, "mousemove", (event) => {
            if (this.dragging) {
              this.ngZone.run(() => {
                this.handleChange(event);
              });
            }
          });
        }
        if (!this.mouseupListener) {
          this.mouseupListener = this.renderer.listen(documentTarget, "mouseup", (event) => {
            if (this.dragging) {
              this.dragging = false;
              this.ngZone.run(() => {
                if (this.range) this.onSlideEnd.emit({
                  originalEvent: event,
                  values: this.values
                });
                else this.onSlideEnd.emit({
                  originalEvent: event,
                  value: this.value
                });
                if (this.animate) {
                  addClass(this.el.nativeElement.children[0], "p-slider-animate");
                }
              });
            }
          });
        }
      });
    }
  }
  unbindDragListeners() {
    if (this.dragListener) {
      this.dragListener();
      this.dragListener = null;
    }
    if (this.mouseupListener) {
      this.mouseupListener();
      this.mouseupListener = null;
    }
  }
  setValueFromHandle(event, handleValue) {
    let newValue = this.getValueFromHandle(handleValue);
    if (this.range) {
      if (this.step) {
        this.handleStepChange(newValue, this.values[this.handleIndex]);
      } else {
        this.handleValues[this.handleIndex] = handleValue;
        this.updateValue(newValue, event);
      }
    } else {
      if (this.step) {
        this.handleStepChange(newValue, this.value);
      } else {
        this.handleValue = handleValue;
        this.updateValue(newValue, event);
      }
    }
    this.cd.markForCheck();
  }
  handleStepChange(newValue, oldValue) {
    let diff = newValue - oldValue;
    let val = oldValue;
    let _step = this.step;
    if (diff < 0) {
      val = oldValue + Math.ceil(newValue / _step - oldValue / _step) * _step;
    } else if (diff > 0) {
      val = oldValue + Math.floor(newValue / _step - oldValue / _step) * _step;
    }
    this.updateValue(val);
    this.updateHandleValue();
  }
  writeValue(value) {
    if (this.range) this.values = value || [0, 0];
    else this.value = value || 0;
    this.updateHandleValue();
    this.updateDiffAndOffset();
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
  get rangeStartLeft() {
    if (!this.isVertical()) return this.handleValues[0] > 100 ? "100%" : this.handleValues[0] + "%";
    return null;
  }
  get rangeStartBottom() {
    return this.isVertical() ? this.handleValues[0] + "%" : "auto";
  }
  get rangeEndLeft() {
    return this.isVertical() ? null : this.handleValues[1] + "%";
  }
  get rangeEndBottom() {
    return this.isVertical() ? this.handleValues[1] + "%" : "auto";
  }
  isVertical() {
    return this.orientation === "vertical";
  }
  updateDomData() {
    let rect = this.el.nativeElement.children[0].getBoundingClientRect();
    this.initX = rect.left + getWindowScrollLeft();
    this.initY = rect.top + getWindowScrollTop();
    this.barWidth = this.el.nativeElement.children[0].offsetWidth;
    this.barHeight = this.el.nativeElement.children[0].offsetHeight;
  }
  calculateHandleValue(event) {
    if (this.orientation === "horizontal") {
      if (isRTL(this.el.nativeElement)) {
        return (this.initX + this.barWidth - event.pageX) * 100 / this.barWidth;
      } else {
        return (event.pageX - this.initX) * 100 / this.barWidth;
      }
    } else {
      return (this.initY + this.barHeight - event.pageY) * 100 / this.barHeight;
    }
  }
  updateHandleValue() {
    if (this.range) {
      this.handleValues[0] = (this.values[0] < this.min ? 0 : this.values[0] - this.min) * 100 / (this.max - this.min);
      this.handleValues[1] = (this.values[1] > this.max ? 100 : this.values[1] - this.min) * 100 / (this.max - this.min);
    } else {
      if (this.value < this.min) this.handleValue = 0;
      else if (this.value > this.max) this.handleValue = 100;
      else this.handleValue = (this.value - this.min) * 100 / (this.max - this.min);
    }
    if (this.step) {
      this.updateDiffAndOffset();
    }
  }
  updateDiffAndOffset() {
    this.diff = this.getDiff();
    this.offset = this.getOffset();
  }
  getDiff() {
    return Math.abs(this.handleValues[0] - this.handleValues[1]);
  }
  getOffset() {
    return Math.min(this.handleValues[0], this.handleValues[1]);
  }
  updateValue(val, event) {
    if (this.range) {
      let value = val;
      if (this.handleIndex == 0) {
        if (value < this.min) {
          value = this.min;
          this.handleValues[0] = 0;
        } else if (value > this.values[1]) {
          if (value > this.max) {
            value = this.max;
            this.handleValues[0] = 100;
          }
        }
        this.sliderHandleStart?.nativeElement.focus();
      } else {
        if (value > this.max) {
          value = this.max;
          this.handleValues[1] = 100;
          this.offset = this.handleValues[1];
        } else if (value < this.min) {
          value = this.min;
          this.handleValues[1] = 0;
        } else if (value < this.values[0]) {
          this.offset = this.handleValues[1];
        }
        this.sliderHandleEnd?.nativeElement.focus();
      }
      if (this.step) {
        this.updateHandleValue();
      } else {
        this.updateDiffAndOffset();
      }
      this.values[this.handleIndex] = this.getNormalizedValue(value);
      let newValues = [this.minVal, this.maxVal];
      this.onModelChange(newValues);
      this.onChange.emit({
        event,
        values: this.values
      });
    } else {
      if (val < this.min) {
        val = this.min;
        this.handleValue = 0;
      } else if (val > this.max) {
        val = this.max;
        this.handleValue = 100;
      }
      this.value = this.getNormalizedValue(val);
      this.onModelChange(this.value);
      this.onChange.emit({
        event,
        value: this.value
      });
      this.sliderHandle?.nativeElement.focus();
    }
    this.updateHandleValue();
  }
  getValueFromHandle(handleValue) {
    return (this.max - this.min) * (handleValue / 100) + this.min;
  }
  getDecimalsCount(value) {
    if (value && Math.floor(value) !== value) return value.toString().split(".")[1].length || 0;
    return 0;
  }
  getNormalizedValue(val) {
    let decimalsCount = this.getDecimalsCount(this.step);
    if (decimalsCount > 0) {
      return +parseFloat(val.toString()).toFixed(decimalsCount);
    } else {
      return Math.floor(val);
    }
  }
  ngOnDestroy() {
    this.unbindDragListeners();
    super.ngOnDestroy();
  }
  get minVal() {
    return Math.min(this.values[1], this.values[0]);
  }
  get maxVal() {
    return Math.max(this.values[1], this.values[0]);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵSlider_BaseFactory;
    return function Slider_Factory(__ngFactoryType__) {
      return (ɵSlider_BaseFactory || (ɵSlider_BaseFactory = ɵɵgetInheritedFactory(_Slider)))(__ngFactoryType__ || _Slider);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Slider,
    selectors: [["p-slider"]],
    viewQuery: function Slider_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
        ɵɵviewQuery(_c1, 5);
        ɵɵviewQuery(_c2, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.sliderHandle = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.sliderHandleStart = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.sliderHandleEnd = _t.first);
      }
    },
    inputs: {
      animate: [2, "animate", "animate", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      min: [2, "min", "min", numberAttribute],
      max: [2, "max", "max", numberAttribute],
      orientation: "orientation",
      step: [2, "step", "step", numberAttribute],
      range: [2, "range", "range", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      ariaLabel: "ariaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      autofocus: [2, "autofocus", "autofocus", booleanAttribute]
    },
    outputs: {
      onChange: "onChange",
      onSlideEnd: "onSlideEnd"
    },
    features: [ɵɵProvidersFeature([SLIDER_VALUE_ACCESSOR, SliderStyle]), ɵɵInheritDefinitionFeature],
    decls: 8,
    vars: 18,
    consts: [["sliderHandle", ""], ["sliderHandleStart", ""], ["sliderHandleEnd", ""], [3, "click", "ngStyle", "ngClass"], ["class", "p-slider-range", 3, "ngStyle", 4, "ngIf"], ["class", "p-slider-handle", "role", "slider", 3, "transition", "ngStyle", "pAutoFocus", "touchstart", "touchmove", "touchend", "mousedown", "keydown", 4, "ngIf"], ["class", "p-slider-handle", "role", "slider", 3, "transition", "ngStyle", "ngClass", "pAutoFocus", "keydown", "mousedown", "touchstart", "touchmove", "touchend", 4, "ngIf"], ["class", "p-slider-handle", "role", "slider", 3, "transition", "ngStyle", "ngClass", "keydown", "mousedown", "touchstart", "touchmove", "touchend", 4, "ngIf"], [1, "p-slider-range", 3, "ngStyle"], ["role", "slider", 1, "p-slider-handle", 3, "touchstart", "touchmove", "touchend", "mousedown", "keydown", "ngStyle", "pAutoFocus"], ["role", "slider", 1, "p-slider-handle", 3, "keydown", "mousedown", "touchstart", "touchmove", "touchend", "ngStyle", "ngClass", "pAutoFocus"], ["role", "slider", 1, "p-slider-handle", 3, "keydown", "mousedown", "touchstart", "touchmove", "touchend", "ngStyle", "ngClass"]],
    template: function Slider_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 3);
        ɵɵlistener("click", function Slider_Template_div_click_0_listener($event) {
          return ctx.onBarClick($event);
        });
        ɵɵtemplate(1, Slider_span_1_Template, 1, 5, "span", 4)(2, Slider_span_2_Template, 1, 5, "span", 4)(3, Slider_span_3_Template, 1, 4, "span", 4)(4, Slider_span_4_Template, 1, 4, "span", 4)(5, Slider_span_5_Template, 2, 15, "span", 5)(6, Slider_span_6_Template, 2, 18, "span", 6)(7, Slider_span_7_Template, 2, 17, "span", 7);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngStyle", ctx.style)("ngClass", ɵɵpureFunction4(13, _c3, ctx.disabled, ctx.orientation == "horizontal", ctx.orientation == "vertical", ctx.animate));
        ɵɵattribute("data-pc-name", "slider")("data-pc-section", "root");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.range && ctx.orientation == "horizontal");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.range && ctx.orientation == "vertical");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.range && ctx.orientation == "vertical");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.range && ctx.orientation == "horizontal");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.range);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.range);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.range);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgStyle, AutoFocus, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Slider, [{
    type: Component,
    args: [{
      selector: "p-slider",
      standalone: true,
      imports: [CommonModule, AutoFocus, SharedModule],
      template: `
        <div
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-slider p-component': true,
                'p-disabled': disabled,
                'p-slider-horizontal': orientation == 'horizontal',
                'p-slider-vertical': orientation == 'vertical',
                'p-slider-animate': animate
            }"
            (click)="onBarClick($event)"
            [attr.data-pc-name]="'slider'"
            [attr.data-pc-section]="'root'"
        >
            <span
                *ngIf="range && orientation == 'horizontal'"
                class="p-slider-range"
                [ngStyle]="{
                    position: 'absolute',
                    'inset-inline-start': offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%',
                    width: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%'
                }"
                [attr.data-pc-section]="'range'"
            ></span>
            <span
                *ngIf="range && orientation == 'vertical'"
                class="p-slider-range"
                [ngStyle]="{
                    position: 'absolute',
                    bottom: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%',
                    height: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%'
                }"
                [attr.data-pc-section]="'range'"
            ></span>
            <span *ngIf="!range && orientation == 'vertical'" class="p-slider-range" [attr.data-pc-section]="'range'" [ngStyle]="{ position: 'absolute', height: handleValue + '%' }"></span>
            <span *ngIf="!range && orientation == 'horizontal'" class="p-slider-range" [attr.data-pc-section]="'range'" [ngStyle]="{ position: 'absolute', width: handleValue + '%' }"></span>
            <span
                *ngIf="!range"
                #sliderHandle
                class="p-slider-handle"
                [style.transition]="dragging ? 'none' : null"
                [ngStyle]="{
                    position: 'absolute',
                    'inset-inline-start': orientation == 'horizontal' ? handleValue + '%' : null,
                    bottom: orientation == 'vertical' ? handleValue + '%' : null
                }"
                (touchstart)="onDragStart($event)"
                (touchmove)="onDrag($event)"
                (touchend)="onDragEnd($event)"
                (mousedown)="onMouseDown($event)"
                (keydown)="onKeyDown($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                role="slider"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'handle'"
                [pAutoFocus]="autofocus"
            ></span>
            <span
                *ngIf="range"
                #sliderHandleStart
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ position: 'absolute', 'inset-inline-start': rangeStartLeft, bottom: rangeStartBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 0 }"
                (keydown)="onKeyDown($event, 0)"
                (mousedown)="onMouseDown($event, 0)"
                (touchstart)="onDragStart($event, 0)"
                (touchmove)="onDrag($event)"
                (touchend)="onDragEnd($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                role="slider"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[0] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'startHandler'"
                [pAutoFocus]="autofocus"
            ></span>
            <span
                *ngIf="range"
                #sliderHandleEnd
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ position: 'absolute', 'inset-inline-start': rangeEndLeft, bottom: rangeEndBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 1 }"
                (keydown)="onKeyDown($event, 1)"
                (mousedown)="onMouseDown($event, 1)"
                (touchstart)="onDragStart($event, 1)"
                (touchmove)="onDrag($event)"
                (touchend)="onDragEnd($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                role="slider"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[1] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'endHandler'"
            ></span>
        </div>
    `,
      providers: [SLIDER_VALUE_ACCESSOR, SliderStyle],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    animate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    min: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    max: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    orientation: [{
      type: Input
    }],
    step: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    range: [{
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
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onChange: [{
      type: Output
    }],
    onSlideEnd: [{
      type: Output
    }],
    sliderHandle: [{
      type: ViewChild,
      args: ["sliderHandle"]
    }],
    sliderHandleStart: [{
      type: ViewChild,
      args: ["sliderHandleStart"]
    }],
    sliderHandleEnd: [{
      type: ViewChild,
      args: ["sliderHandleEnd"]
    }]
  });
})();
var SliderModule = class _SliderModule {
  static ɵfac = function SliderModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SliderModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _SliderModule,
    imports: [Slider, SharedModule],
    exports: [Slider, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Slider, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SliderModule, [{
    type: NgModule,
    args: [{
      imports: [Slider, SharedModule],
      exports: [Slider, SharedModule]
    }]
  }], null, null);
})();
export {
  SLIDER_VALUE_ACCESSOR,
  Slider,
  SliderClasses,
  SliderModule,
  SliderStyle
};
//# sourceMappingURL=primeng_slider.js.map
