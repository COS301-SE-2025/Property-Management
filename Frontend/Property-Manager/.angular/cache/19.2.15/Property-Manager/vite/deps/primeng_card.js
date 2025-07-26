import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import "./chunk-FXJ6C54V.js";
import {
  BaseStyle
} from "./chunk-UO5IQQ7M.js";
import {
  Footer,
  Header,
  PrimeTemplate,
  SharedModule,
  equals
} from "./chunk-GNCTJO57.js";
import {
  CommonModule,
  NgClass,
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
  Injectable,
  Input,
  NgModule,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  signal,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-RFZ2BTTM.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-card.mjs
var _c0 = ["header"];
var _c1 = ["title"];
var _c2 = ["subtitle"];
var _c3 = ["content"];
var _c4 = ["footer"];
var _c5 = ["*", [["p-header"]], [["p-footer"]]];
var _c6 = ["*", "p-header", "p-footer"];
function Card_div_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Card_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵprojection(1, 1);
    ɵɵtemplate(2, Card_div_1_ng_container_2_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate || ctx_r0._headerTemplate);
  }
}
function Card_div_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.header);
  }
}
function Card_div_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Card_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtemplate(1, Card_div_3_ng_container_1_Template, 2, 1, "ng-container", 10)(2, Card_div_3_ng_container_2_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.header && !ctx_r0._titleTemplate && !ctx_r0.titleTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.titleTemplate || ctx_r0._titleTemplate);
  }
}
function Card_div_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.subheader);
  }
}
function Card_div_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Card_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, Card_div_4_ng_container_1_Template, 2, 1, "ng-container", 10)(2, Card_div_4_ng_container_2_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.subheader && !ctx_r0._subtitleTemplate && !ctx_r0.subtitleTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.subtitleTemplate || ctx_r0._subtitleTemplate);
  }
}
function Card_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Card_div_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Card_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵprojection(1, 2);
    ɵɵtemplate(2, Card_div_8_ng_container_2_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.footerTemplate || ctx_r0._footerTemplate);
  }
}
var theme = ({
  dt
}) => `
.p-card {
    background: ${dt("card.background")};
    color: ${dt("card.color")};
    box-shadow: ${dt("card.shadow")};
    border-radius: ${dt("card.border.radius")};
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${dt("card.caption.gap")};
}

.p-card-body {
    padding: ${dt("card.body.padding")};
    display: flex;
    flex-direction: column;
    gap: ${dt("card.body.gap")};
}

.p-card-title {
    font-size: ${dt("card.title.font.size")};
    font-weight: ${dt("card.title.font.weight")};
}

.p-card-subtitle {
    color: ${dt("card.subtitle.color")};
}
`;
var classes = {
  root: "p-card p-component",
  header: "p-card-header",
  body: "p-card-body",
  caption: "p-card-caption",
  title: "p-card-title",
  subtitle: "p-card-subtitle",
  content: "p-card-content",
  footer: "p-card-footer"
};
var CardStyle = class _CardStyle extends BaseStyle {
  name = "card";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵCardStyle_BaseFactory;
    return function CardStyle_Factory(__ngFactoryType__) {
      return (ɵCardStyle_BaseFactory || (ɵCardStyle_BaseFactory = ɵɵgetInheritedFactory(_CardStyle)))(__ngFactoryType__ || _CardStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _CardStyle,
    factory: _CardStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardStyle, [{
    type: Injectable
  }], null, null);
})();
var CardClasses;
(function(CardClasses2) {
  CardClasses2["root"] = "p-card";
  CardClasses2["header"] = "p-card-header";
  CardClasses2["body"] = "p-card-body";
  CardClasses2["caption"] = "p-card-caption";
  CardClasses2["title"] = "p-card-title";
  CardClasses2["subtitle"] = "p-card-subtitle";
  CardClasses2["content"] = "p-card-content";
  CardClasses2["footer"] = "p-card-footer";
})(CardClasses || (CardClasses = {}));
var Card = class _Card extends BaseComponent {
  /**
   * Header of the card.
   * @group Props
   */
  header;
  /**
   * Subheader of the card.
   * @group Props
   */
  subheader;
  /**
   * Inline style of the element.
   * @group Props
   */
  set style(value) {
    if (!equals(this._style(), value)) {
      this._style.set(value);
    }
  }
  /**
   * Class of the element.
   * @group Props
   */
  styleClass;
  headerFacet;
  footerFacet;
  headerTemplate;
  titleTemplate;
  subtitleTemplate;
  contentTemplate;
  footerTemplate;
  _headerTemplate;
  _titleTemplate;
  _subtitleTemplate;
  _contentTemplate;
  _footerTemplate;
  _style = signal(null);
  _componentStyle = inject(CardStyle);
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  templates;
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this._headerTemplate = item.template;
          break;
        case "title":
          this._titleTemplate = item.template;
          break;
        case "subtitle":
          this._subtitleTemplate = item.template;
          break;
        case "content":
          this._contentTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        default:
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵCard_BaseFactory;
    return function Card_Factory(__ngFactoryType__) {
      return (ɵCard_BaseFactory || (ɵCard_BaseFactory = ɵɵgetInheritedFactory(_Card)))(__ngFactoryType__ || _Card);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Card,
    selectors: [["p-card"]],
    contentQueries: function Card_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Header, 5);
        ɵɵcontentQuery(dirIndex, Footer, 5);
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, _c3, 4);
        ɵɵcontentQuery(dirIndex, _c4, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.titleTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.subtitleTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    inputs: {
      header: "header",
      subheader: "subheader",
      style: "style",
      styleClass: "styleClass"
    },
    features: [ɵɵProvidersFeature([CardStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c6,
    decls: 9,
    vars: 10,
    consts: [[3, "ngClass", "ngStyle"], ["class", "p-card-header", 4, "ngIf"], [1, "p-card-body"], ["class", "p-card-title", 4, "ngIf"], ["class", "p-card-subtitle", 4, "ngIf"], [1, "p-card-content"], [4, "ngTemplateOutlet"], ["class", "p-card-footer", 4, "ngIf"], [1, "p-card-header"], [1, "p-card-title"], [4, "ngIf"], [1, "p-card-subtitle"], [1, "p-card-footer"]],
    template: function Card_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c5);
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, Card_div_1_Template, 3, 1, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵtemplate(3, Card_div_3_Template, 3, 2, "div", 3)(4, Card_div_4_Template, 3, 2, "div", 4);
        ɵɵelementStart(5, "div", 5);
        ɵɵprojection(6);
        ɵɵtemplate(7, Card_ng_container_7_Template, 1, 0, "ng-container", 6);
        ɵɵelementEnd();
        ɵɵtemplate(8, Card_div_8_Template, 3, 1, "div", 7);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", "p-card p-component")("ngStyle", ctx._style());
        ɵɵattribute("data-pc-name", "card");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.headerFacet || ctx.headerTemplate || ctx._headerTemplate);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.header || ctx.titleTemplate || ctx._titleTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.subheader || ctx.subtitleTemplate || ctx._subtitleTemplate);
        ɵɵadvance(3);
        ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate || ctx._contentTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.footerFacet || ctx.footerTemplate || ctx._footerTemplate);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Card, [{
    type: Component,
    args: [{
      selector: "p-card",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: `
        <div [ngClass]="'p-card p-component'" [ngStyle]="_style()" [class]="styleClass" [attr.data-pc-name]="'card'">
            <div class="p-card-header" *ngIf="headerFacet || headerTemplate || _headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
            </div>
            <div class="p-card-body">
                <div class="p-card-title" *ngIf="header || titleTemplate || _titleTemplate">
                    <ng-container *ngIf="header && !_titleTemplate && !titleTemplate">{{ header }}</ng-container>
                    <ng-container *ngTemplateOutlet="titleTemplate || _titleTemplate"></ng-container>
                </div>
                <div class="p-card-subtitle" *ngIf="subheader || subtitleTemplate || _subtitleTemplate">
                    <ng-container *ngIf="subheader && !_subtitleTemplate && !subtitleTemplate">{{ subheader }}</ng-container>
                    <ng-container *ngTemplateOutlet="subtitleTemplate || _subtitleTemplate"></ng-container>
                </div>
                <div class="p-card-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                </div>
                <div class="p-card-footer" *ngIf="footerFacet || footerTemplate || _footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [CardStyle]
    }]
  }], null, {
    header: [{
      type: Input
    }],
    subheader: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    headerFacet: [{
      type: ContentChild,
      args: [Header]
    }],
    footerFacet: [{
      type: ContentChild,
      args: [Footer]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    titleTemplate: [{
      type: ContentChild,
      args: ["title", {
        descendants: false
      }]
    }],
    subtitleTemplate: [{
      type: ContentChild,
      args: ["subtitle", {
        descendants: false
      }]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var CardModule = class _CardModule {
  static ɵfac = function CardModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _CardModule,
    imports: [Card, SharedModule],
    exports: [Card, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Card, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardModule, [{
    type: NgModule,
    args: [{
      imports: [Card, SharedModule],
      exports: [Card, SharedModule]
    }]
  }], null, null);
})();
export {
  Card,
  CardClasses,
  CardModule,
  CardStyle
};
//# sourceMappingURL=primeng_card.js.map
