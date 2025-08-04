import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import "./chunk-FXJ6C54V.js";
import {
  BaseStyle
} from "./chunk-UO5IQQ7M.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-GNCTJO57.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-UCCE5RQP.js";
import "./chunk-B5QHEHR4.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  Injectable,
  Input,
  NgModule,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵgetInheritedFactory,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor
} from "./chunk-RFZ2BTTM.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-timeline.mjs
var _c0 = ["content"];
var _c1 = ["opposite"];
var _c2 = ["marker"];
var _c3 = (a0) => ({
  $implicit: a0
});
function Timeline_div_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Timeline_div_0_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Timeline_div_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Timeline_div_0_ng_container_4_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const event_r1 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.markerTemplate || ctx_r1._markerTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c3, event_r1));
  }
}
function Timeline_div_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 9);
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "marker");
  }
}
function Timeline_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 10);
  }
}
function Timeline_div_0_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Timeline_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2)(1, "div", 3);
    ɵɵtemplate(2, Timeline_div_0_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 5);
    ɵɵtemplate(4, Timeline_div_0_ng_container_4_Template, 2, 4, "ng-container", 6)(5, Timeline_div_0_ng_template_5_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(7, Timeline_div_0_div_7_Template, 1, 0, "div", 7);
    ɵɵelementEnd();
    ɵɵelementStart(8, "div", 8);
    ɵɵtemplate(9, Timeline_div_0_ng_container_9_Template, 1, 0, "ng-container", 4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const event_r1 = ctx.$implicit;
    const last_r3 = ctx.last;
    const marker_r4 = ɵɵreference(6);
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "event");
    ɵɵadvance();
    ɵɵattribute("data-pc-section", "opposite");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.oppositeTemplate || ctx_r1._oppositeTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(11, _c3, event_r1));
    ɵɵadvance();
    ɵɵattribute("data-pc-section", "separator");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.markerTemplate || ctx_r1._markerTemplate)("ngIfElse", marker_r4);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", !last_r3);
    ɵɵadvance();
    ɵɵattribute("data-pc-section", "content");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.contentTemplate || ctx_r1._contentTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(13, _c3, event_r1));
  }
}
var theme = ({
  dt
}) => `
.p-timeline {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    direction: ltr;
}

.p-timeline-left .p-timeline-event-opposite {
    text-align: right;
}

.p-timeline-left .p-timeline-event-content {
    text-align: left;
}

.p-timeline-right .p-timeline-event {
    flex-direction: row-reverse;
}

.p-timeline-right .p-timeline-event-opposite {
    text-align: left;
}

.p-timeline-right .p-timeline-event-content {
    text-align: right;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {
    flex-direction: row-reverse;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {
    text-align: right;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {
    text-align: left;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {
    text-align: left;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
    text-align: right;
}

.p-timeline-vertical .p-timeline-event-opposite,
.p-timeline-vertical .p-timeline-event-content {
    padding: ${dt("timeline.vertical.event.content.padding")};
}

.p-timeline-vertical .p-timeline-event-connector {
    width: ${dt("timeline.event.connector.size")};
}

.p-timeline-event {
    display: flex;
    position: relative;
    min-height: ${dt("timeline.event.min.height")};
}

.p-timeline-event:last-child {
    min-height: 0;
}

.p-timeline-event-opposite {
    flex: 1;
}

.p-timeline-event-content {
    flex: 1;
}

.p-timeline-event-separator {
    flex: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.p-timeline-event-marker {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    align-self: baseline;
    border-width: ${dt("timeline.event.marker.border.width")};
    border-style: solid;
    border-color: ${dt("timeline.event.marker.border.color")};
    border-radius: ${dt("timeline.event.marker.border.radius")};
    width: ${dt("timeline.event.marker.size")};
    height: ${dt("timeline.event.marker.size")};
    background: ${dt("timeline.event.marker.background")};
}

.p-timeline-event-marker::before {
    content: " ";
    border-radius: ${dt("timeline.event.marker.content.border.radius")};
    width: ${dt("timeline.event.marker.content.size")};
    height:${dt("timeline.event.marker.content.size")};
    background: ${dt("timeline.event.marker.content.background")};
}

.p-timeline-event-marker::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${dt("timeline.event.marker.border.radius")};
    box-shadow: ${dt("timeline.event.marker.content.inset.shadow")};
}

.p-timeline-event-connector {
    flex-grow: 1;
    background: ${dt("timeline.event.connector.color")};
}

.p-timeline-horizontal {
    flex-direction: row;
}

.p-timeline-horizontal .p-timeline-event {
    flex-direction: column;
    flex: 1;
}

.p-timeline-horizontal .p-timeline-event:last-child {
    flex: 0;
}

.p-timeline-horizontal .p-timeline-event-separator {
    flex-direction: row;
}

.p-timeline-horizontal .p-timeline-event-connector {
    width: 100%;
    height: ${dt("timeline.event.connector.size")};
}

.p-timeline-horizontal .p-timeline-event-opposite,
.p-timeline-horizontal .p-timeline-event-content {
    padding: ${dt("timeline.horizontal.event.content.padding")};
}

.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {
    flex-direction: column-reverse;
}

.p-timeline-bottom .p-timeline-event {
    flex-direction: column-reverse;
}
`;
var classes = {
  root: ({
    props
  }) => ["p-timeline p-component", "p-timeline-" + props.align, "p-timeline-" + props.layout],
  event: "p-timeline-event",
  eventOpposite: "p-timeline-event-opposite",
  eventSeparator: "p-timeline-event-separator",
  eventMarker: "p-timeline-event-marker",
  eventConnector: "p-timeline-event-connector",
  eventContent: "p-timeline-event-content"
};
var TimelineStyle = class _TimelineStyle extends BaseStyle {
  name = "timeline";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTimelineStyle_BaseFactory;
    return function TimelineStyle_Factory(__ngFactoryType__) {
      return (ɵTimelineStyle_BaseFactory || (ɵTimelineStyle_BaseFactory = ɵɵgetInheritedFactory(_TimelineStyle)))(__ngFactoryType__ || _TimelineStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TimelineStyle,
    factory: _TimelineStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimelineStyle, [{
    type: Injectable
  }], null, null);
})();
var TimelineClasses;
(function(TimelineClasses2) {
  TimelineClasses2["root"] = "p-timeline";
  TimelineClasses2["event"] = "p-timeline-event";
  TimelineClasses2["eventOpposite"] = "p-timeline-event-opposite";
  TimelineClasses2["eventSeparator"] = "p-timeline-event-separator";
  TimelineClasses2["eventMarker"] = "p-timeline-event-marker";
  TimelineClasses2["eventConnector"] = "p-timeline-event-connector";
  TimelineClasses2["eventContent"] = "p-timeline-event-content";
})(TimelineClasses || (TimelineClasses = {}));
var Timeline = class _Timeline extends BaseComponent {
  /**
   * An array of events to display.
   * @group Props
   */
  value;
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
   * Position of the timeline bar relative to the content. Valid values are "left", "right" for vertical layout and "top", "bottom" for horizontal layout.
   * @group Props
   */
  align = "left";
  /**
   * Orientation of the timeline.
   * @group Props
   */
  layout = "vertical";
  /**
   * Custom content template.
   * @group Templates
   */
  contentTemplate;
  /**
   * Custom opposite item template.
   * @group Templates
   */
  oppositeTemplate;
  /**
   * Custom marker template.
   * @group Templates
   */
  markerTemplate;
  templates;
  _contentTemplate;
  _oppositeTemplate;
  _markerTemplate;
  _componentStyle = inject(TimelineStyle);
  get hostClass() {
    return this.styleClass;
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
        case "opposite":
          this._oppositeTemplate = item.template;
          break;
        case "marker":
          this._markerTemplate = item.template;
          break;
      }
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTimeline_BaseFactory;
    return function Timeline_Factory(__ngFactoryType__) {
      return (ɵTimeline_BaseFactory || (ɵTimeline_BaseFactory = ɵɵgetInheritedFactory(_Timeline)))(__ngFactoryType__ || _Timeline);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Timeline,
    selectors: [["p-timeline"]],
    contentQueries: function Timeline_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.oppositeTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.markerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 24,
    hostBindings: function Timeline_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-pc-section", "root")("data-pc-name", "timeline");
        ɵɵstyleMap(ctx.style);
        ɵɵclassMap(ctx.hostClass);
        ɵɵclassProp("p-timeline", true)("p-component", true)("p-timeline-left", ctx.align === "left")("p-timeline-right", ctx.align === "right")("p-timeline-top", ctx.align === "top")("p-timeline-bottom", ctx.align === "bottom")("p-timeline-alternate", ctx.align === "alternate")("p-timeline-vertical", ctx.layout === "vertical")("p-timeline-horizontal", ctx.layout === "horizontal");
      }
    },
    inputs: {
      value: "value",
      style: "style",
      styleClass: "styleClass",
      align: "align",
      layout: "layout"
    },
    features: [ɵɵProvidersFeature([TimelineStyle]), ɵɵInheritDefinitionFeature],
    decls: 1,
    vars: 1,
    consts: [["marker", ""], ["class", "p-timeline-event", 4, "ngFor", "ngForOf"], [1, "p-timeline-event"], [1, "p-timeline-event-opposite"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-timeline-event-separator"], [4, "ngIf", "ngIfElse"], ["class", "p-timeline-event-connector", 4, "ngIf"], [1, "p-timeline-event-content"], [1, "p-timeline-event-marker"], [1, "p-timeline-event-connector"]],
    template: function Timeline_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, Timeline_div_0_Template, 10, 15, "div", 1);
      }
      if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.value);
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Timeline, [{
    type: Component,
    args: [{
      selector: "p-timeline",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: `
        <div *ngFor="let event of value; let last = last" class="p-timeline-event" [attr.data-pc-section]="'event'">
            <div class="p-timeline-event-opposite" [attr.data-pc-section]="'opposite'">
                <ng-container *ngTemplateOutlet="oppositeTemplate || _oppositeTemplate; context: { $implicit: event }"></ng-container>
            </div>
            <div class="p-timeline-event-separator" [attr.data-pc-section]="'separator'">
                <ng-container *ngIf="markerTemplate || _markerTemplate; else marker">
                    <ng-container *ngTemplateOutlet="markerTemplate || _markerTemplate; context: { $implicit: event }"></ng-container>
                </ng-container>
                <ng-template #marker>
                    <div class="p-timeline-event-marker" [attr.data-pc-section]="'marker'"></div>
                </ng-template>
                <div *ngIf="!last" class="p-timeline-event-connector"></div>
            </div>
            <div class="p-timeline-event-content" [attr.data-pc-section]="'content'">
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: event }"></ng-container>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [TimelineStyle],
      host: {
        "[class.p-timeline]": "true",
        "[class.p-component]": "true",
        "[class.p-timeline-left]": "align === 'left'",
        "[class.p-timeline-right]": "align === 'right'",
        "[class.p-timeline-top]": "align === 'top'",
        "[class.p-timeline-bottom]": "align === 'bottom'",
        "[class.p-timeline-alternate]": "align === 'alternate'",
        "[class.p-timeline-vertical]": "layout === 'vertical'",
        "[class.p-timeline-horizontal]": "layout === 'horizontal'",
        "[style]": "style",
        "[attr.data-pc-section]": "'root'",
        "[attr.data-pc-name]": "'timeline'"
      }
    }]
  }], null, {
    value: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    align: [{
      type: Input
    }],
    layout: [{
      type: Input
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    oppositeTemplate: [{
      type: ContentChild,
      args: ["opposite", {
        descendants: false
      }]
    }],
    markerTemplate: [{
      type: ContentChild,
      args: ["marker", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    hostClass: [{
      type: HostBinding,
      args: ["class"]
    }]
  });
})();
var TimelineModule = class _TimelineModule {
  static ɵfac = function TimelineModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimelineModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TimelineModule,
    imports: [Timeline, SharedModule],
    exports: [Timeline, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Timeline, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimelineModule, [{
    type: NgModule,
    args: [{
      imports: [Timeline, SharedModule],
      exports: [Timeline, SharedModule]
    }]
  }], null, null);
})();
export {
  Timeline,
  TimelineClasses,
  TimelineModule,
  TimelineStyle
};
//# sourceMappingURL=primeng_timeline.js.map
