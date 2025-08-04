import {
  Tooltip,
  TooltipModule
} from "./chunk-WBBYEYQH.js";
import "./chunk-NMOYQVAO.js";
import "./chunk-5G7WYC4N.js";
import {
  ChevronRightIcon,
  HomeIcon
} from "./chunk-PRIE2AJH.js";
import {
  BaseComponent
} from "./chunk-C2CM7EVP.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-4H52S6FA.js";
import "./chunk-BXOPRP5O.js";
import "./chunk-UVUWUGGQ.js";
import "./chunk-WXJEMTTQ.js";
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
  Injectable,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
  inject,
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
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-RFZ2BTTM.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-breadcrumb.mjs
var _c0 = ["item"];
var _c1 = ["separator"];
var _c2 = (a0) => ({
  "p-breadcrumb-home-item": true,
  "p-disabled": a0
});
var _c3 = () => ({
  exact: false
});
var _c4 = (a0) => ({
  "p-breadcrumb-item": true,
  "p-disabled": a0
});
var _c5 = (a0) => ({
  $implicit: a0
});
function Breadcrumb_li_2_a_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 16);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r1.home.icon)("ngStyle", ctx_r1.home == null ? null : ctx_r1.home.style);
  }
}
function Breadcrumb_li_2_a_1_HomeIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "HomeIcon", 17);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-breadcrumb-item-icon");
  }
}
function Breadcrumb_li_2_a_1_ng_container_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 19);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.home.label);
  }
}
function Breadcrumb_li_2_a_1_ng_container_3_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 20);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("innerHTML", ctx_r1.home.label, ɵɵsanitizeHtml);
  }
}
function Breadcrumb_li_2_a_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Breadcrumb_li_2_a_1_ng_container_3_span_1_Template, 2, 1, "span", 18)(2, Breadcrumb_li_2_a_1_ng_container_3_ng_template_2_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const htmlHomeLabel_r3 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.home.escape !== false)("ngIfElse", htmlHomeLabel_r3);
  }
}
function Breadcrumb_li_2_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 12);
    ɵɵlistener("click", function Breadcrumb_li_2_a_1_Template_a_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onClick($event, ctx_r1.home));
    });
    ɵɵtemplate(1, Breadcrumb_li_2_a_1_span_1_Template, 1, 2, "span", 13)(2, Breadcrumb_li_2_a_1_HomeIcon_2_Template, 1, 1, "HomeIcon", 14)(3, Breadcrumb_li_2_a_1_ng_container_3_Template, 4, 2, "ng-container", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("href", ctx_r1.home.url ? ctx_r1.home.url : null, ɵɵsanitizeUrl)("target", ctx_r1.home.target);
    ɵɵattribute("aria-label", ctx_r1.homeAriaLabel)("title", ctx_r1.home.title)("tabindex", ctx_r1.home.disabled ? null : "0");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.home.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.home.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.home.label);
  }
}
function Breadcrumb_li_2_a_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 16);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r1.home.icon)("ngStyle", ctx_r1.home.iconStyle);
  }
}
function Breadcrumb_li_2_a_2_HomeIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "HomeIcon", 17);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-breadcrumb-item-icon");
  }
}
function Breadcrumb_li_2_a_2_ng_container_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 19);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.home.label);
  }
}
function Breadcrumb_li_2_a_2_ng_container_3_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 20);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("innerHTML", ctx_r1.home.label, ɵɵsanitizeHtml);
  }
}
function Breadcrumb_li_2_a_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Breadcrumb_li_2_a_2_ng_container_3_span_1_Template, 2, 1, "span", 18)(2, Breadcrumb_li_2_a_2_ng_container_3_ng_template_2_Template, 1, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const htmlHomeRouteLabel_r5 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.home.escape !== false)("ngIfElse", htmlHomeRouteLabel_r5);
  }
}
function Breadcrumb_li_2_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 21);
    ɵɵlistener("click", function Breadcrumb_li_2_a_2_Template_a_click_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onClick($event, ctx_r1.home));
    });
    ɵɵtemplate(1, Breadcrumb_li_2_a_2_span_1_Template, 1, 2, "span", 13)(2, Breadcrumb_li_2_a_2_HomeIcon_2_Template, 1, 1, "HomeIcon", 14)(3, Breadcrumb_li_2_a_2_ng_container_3_Template, 4, 2, "ng-container", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("routerLink", ctx_r1.home.routerLink)("queryParams", ctx_r1.home.queryParams)("routerLinkActiveOptions", ctx_r1.home.routerLinkActiveOptions || ɵɵpureFunction0(16, _c3))("target", ctx_r1.home.target)("fragment", ctx_r1.home.fragment)("queryParamsHandling", ctx_r1.home.queryParamsHandling)("preserveFragment", ctx_r1.home.preserveFragment)("skipLocationChange", ctx_r1.home.skipLocationChange)("replaceUrl", ctx_r1.home.replaceUrl)("state", ctx_r1.home.state);
    ɵɵattribute("aria-label", ctx_r1.homeAriaLabel)("title", ctx_r1.home.title)("tabindex", ctx_r1.home.disabled ? null : "0");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.home.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.home.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.home.label);
  }
}
function Breadcrumb_li_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 9);
    ɵɵtemplate(1, Breadcrumb_li_2_a_1_Template, 4, 8, "a", 10)(2, Breadcrumb_li_2_a_2_Template, 4, 17, "a", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.home.styleClass);
    ɵɵproperty("ngClass", ɵɵpureFunction1(9, _c2, ctx_r1.home.disabled))("ngStyle", ctx_r1.home.style)("tooltipOptions", ctx_r1.home.tooltipOptions);
    ɵɵattribute("id", ctx_r1.home.id)("data-pc-section", "home");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.home.routerLink);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.home.routerLink);
  }
}
function Breadcrumb_li_3_ChevronRightIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ChevronRightIcon");
  }
}
function Breadcrumb_li_3_2_ng_template_0_Template(rf, ctx) {
}
function Breadcrumb_li_3_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Breadcrumb_li_3_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Breadcrumb_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 22);
    ɵɵtemplate(1, Breadcrumb_li_3_ChevronRightIcon_1_Template, 1, 0, "ChevronRightIcon", 15)(2, Breadcrumb_li_3_2_Template, 1, 0, null, 23);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "separator");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.separatorTemplate && !ctx_r1._separatorTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.separatorTemplate || ctx_r1._separatorTemplate);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_1_0_ng_template_0_Template(rf, ctx) {
}
function Breadcrumb_ng_template_4_li_0_Conditional_1_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Breadcrumb_ng_template_4_li_0_Conditional_1_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Breadcrumb_ng_template_4_li_0_Conditional_1_0_Template, 1, 0, null, 26);
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemTemplate || ctx_r1._itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c5, menuitem_r6));
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 16);
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(5).$implicit;
    ɵɵproperty("ngClass", menuitem_r6 == null ? null : menuitem_r6.icon)("ngStyle", menuitem_r6 == null ? null : menuitem_r6.iconStyle);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 19);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(6).$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate(menuitem_r6 == null ? null : menuitem_r6.label);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_ng_container_2_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 20);
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(6).$implicit;
    ɵɵproperty("innerHTML", menuitem_r6 == null ? null : menuitem_r6.label, ɵɵsanitizeHtml);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_ng_container_2_span_1_Template, 2, 1, "span", 18)(2, Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_ng_container_2_ng_template_2_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const htmlLabel_r8 = ɵɵreference(3);
    const menuitem_r6 = ɵɵnextContext(5).$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", (menuitem_r6 == null ? null : menuitem_r6.escape) !== false)("ngIfElse", htmlLabel_r8);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_span_1_Template, 1, 2, "span", 13)(2, Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_ng_container_2_Template, 4, 2, "ng-container", 15);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(4).$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", menuitem_r6 == null ? null : menuitem_r6.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", menuitem_r6 == null ? null : menuitem_r6.label);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 28);
    ɵɵlistener("click", function Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_Template_a_click_0_listener($event) {
      ɵɵrestoreView(_r7);
      const menuitem_r6 = ɵɵnextContext(3).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onClick($event, menuitem_r6));
    });
    ɵɵtemplate(1, Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_ng_container_1_Template, 3, 2, "ng-container", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(3).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("target", menuitem_r6 == null ? null : menuitem_r6.target);
    ɵɵattribute("href", (menuitem_r6 == null ? null : menuitem_r6.url) ? menuitem_r6 == null ? null : menuitem_r6.url : null, ɵɵsanitizeUrl)("title", menuitem_r6 == null ? null : menuitem_r6.title)("tabindex", (menuitem_r6 == null ? null : menuitem_r6.disabled) ? null : "0");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.itemTemplate && !ctx_r1._itemTemplate);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 16);
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(4).$implicit;
    ɵɵproperty("ngClass", menuitem_r6 == null ? null : menuitem_r6.icon)("ngStyle", menuitem_r6 == null ? null : menuitem_r6.iconStyle);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 19);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(5).$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate(menuitem_r6 == null ? null : menuitem_r6.label);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_ng_container_2_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 20);
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(5).$implicit;
    ɵɵproperty("innerHTML", menuitem_r6 == null ? null : menuitem_r6.label, ɵɵsanitizeHtml);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_ng_container_2_span_1_Template, 2, 1, "span", 18)(2, Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_ng_container_2_ng_template_2_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const htmlRouteLabel_r10 = ɵɵreference(3);
    const menuitem_r6 = ɵɵnextContext(4).$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", (menuitem_r6 == null ? null : menuitem_r6.escape) !== false)("ngIfElse", htmlRouteLabel_r10);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 21);
    ɵɵlistener("click", function Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_Template_a_click_0_listener($event) {
      ɵɵrestoreView(_r9);
      const menuitem_r6 = ɵɵnextContext(3).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onClick($event, menuitem_r6));
    });
    ɵɵtemplate(1, Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_span_1_Template, 1, 2, "span", 13)(2, Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_ng_container_2_Template, 4, 2, "ng-container", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(3).$implicit;
    ɵɵproperty("routerLink", menuitem_r6 == null ? null : menuitem_r6.routerLink)("queryParams", menuitem_r6 == null ? null : menuitem_r6.queryParams)("routerLinkActiveOptions", (menuitem_r6 == null ? null : menuitem_r6.routerLinkActiveOptions) || ɵɵpureFunction0(14, _c3))("target", menuitem_r6 == null ? null : menuitem_r6.target)("fragment", menuitem_r6 == null ? null : menuitem_r6.fragment)("queryParamsHandling", menuitem_r6 == null ? null : menuitem_r6.queryParamsHandling)("preserveFragment", menuitem_r6 == null ? null : menuitem_r6.preserveFragment)("skipLocationChange", menuitem_r6 == null ? null : menuitem_r6.skipLocationChange)("replaceUrl", menuitem_r6 == null ? null : menuitem_r6.replaceUrl)("state", menuitem_r6 == null ? null : menuitem_r6.state);
    ɵɵattribute("title", menuitem_r6 == null ? null : menuitem_r6.title)("tabindex", (menuitem_r6 == null ? null : menuitem_r6.disabled) ? null : "0");
    ɵɵadvance();
    ɵɵproperty("ngIf", menuitem_r6 == null ? null : menuitem_r6.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", menuitem_r6 == null ? null : menuitem_r6.label);
  }
}
function Breadcrumb_ng_template_4_li_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Breadcrumb_ng_template_4_li_0_Conditional_2_a_0_Template, 2, 5, "a", 27)(1, Breadcrumb_ng_template_4_li_0_Conditional_2_a_1_Template, 3, 15, "a", 11);
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext(2).$implicit;
    ɵɵproperty("ngIf", !(menuitem_r6 == null ? null : menuitem_r6.routerLink));
    ɵɵadvance();
    ɵɵproperty("ngIf", menuitem_r6 == null ? null : menuitem_r6.routerLink);
  }
}
function Breadcrumb_ng_template_4_li_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 25);
    ɵɵtemplate(1, Breadcrumb_ng_template_4_li_0_Conditional_1_Template, 1, 4)(2, Breadcrumb_ng_template_4_li_0_Conditional_2_Template, 2, 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const menuitem_r6 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(menuitem_r6.styleClass);
    ɵɵproperty("ngStyle", menuitem_r6.style)("ngClass", ɵɵpureFunction1(8, _c4, menuitem_r6.disabled))("tooltipOptions", menuitem_r6.tooltipOptions);
    ɵɵattribute("id", menuitem_r6.id)("data-pc-section", "menuitem");
    ɵɵadvance();
    ɵɵconditional(ctx_r1.itemTemplate || ctx_r1._itemTemplate ? 1 : 2);
  }
}
function Breadcrumb_ng_template_4_li_1_ChevronRightIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ChevronRightIcon");
  }
}
function Breadcrumb_ng_template_4_li_1_2_ng_template_0_Template(rf, ctx) {
}
function Breadcrumb_ng_template_4_li_1_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Breadcrumb_ng_template_4_li_1_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Breadcrumb_ng_template_4_li_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 22);
    ɵɵtemplate(1, Breadcrumb_ng_template_4_li_1_ChevronRightIcon_1_Template, 1, 0, "ChevronRightIcon", 15)(2, Breadcrumb_ng_template_4_li_1_2_Template, 1, 0, null, 23);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "separator");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.separatorTemplate && !ctx_r1._separatorTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.separatorTemplate || ctx_r1._separatorTemplate);
  }
}
function Breadcrumb_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Breadcrumb_ng_template_4_li_0_Template, 3, 10, "li", 24)(1, Breadcrumb_ng_template_4_li_1_Template, 3, 3, "li", 7);
  }
  if (rf & 2) {
    const menuitem_r6 = ctx.$implicit;
    const end_r11 = ctx.last;
    ɵɵproperty("ngIf", menuitem_r6.visible !== false);
    ɵɵadvance();
    ɵɵproperty("ngIf", !end_r11 && menuitem_r6.visible !== false);
  }
}
var theme = ({
  dt
}) => `
.p-breadcrumb {
    background: ${dt("breadcrumb.background")};
    padding: ${dt("breadcrumb.padding")};
    overflow-x: auto;
}

.p-breadcrumb-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: ${dt("breadcrumb.gap")};
}

.p-breadcrumb-separator {
    display: flex;
    align-items: center;
    color: ${dt("breadcrumb.separator.color")};
}

.p-breadcrumb-separator .p-icon:dir(rtl) {
    transform: rotate(180deg);
}

.p-breadcrumb::-webkit-scrollbar {
    display: none;
}

.p-breadcrumb-item-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: ${dt("breadcrumb.item.gap")};
    transition: background ${dt("breadcrumb.transition.duration")}, color ${dt("breadcrumb.transition.duration")}, outline-color ${dt("breadcrumb.transition.duration")}, box-shadow ${dt("breadcrumb.transition.duration")};
    border-radius: ${dt("breadcrumb.item.border.radius")};
    outline-color: transparent;
    color: ${dt("breadcrumb.item.color")};
}

.p-breadcrumb-item-link:focus-visible {
    box-shadow: ${dt("breadcrumb.item.focus.ring.shadow")};
    outline: ${dt("breadcrumb.item.focus.ring.width")} ${dt("breadcrumb.item.focus.ring.style")} ${dt("breadcrumb.item.focus.ring.color")};
    outline-offset: ${dt("breadcrumb.item.focus.ring.offset")};
}

.p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
    color: ${dt("breadcrumb.item.hover.color")};
}

.p-breadcrumb-item-label {
    transition: inherit;
}

.p-breadcrumb-item-icon {
    color: ${dt("breadcrumb.item.icon.color")};
    transition: inherit;
}

.p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
    color: ${dt("breadcrumb.item.icon.hover.color")};
}
`;
var classes = {
  root: "p-breadcrumb p-component",
  list: "p-breadcrumb-list",
  homeItem: "p-breadcrumb-home-item",
  separator: "p-breadcrumb-separator",
  item: ({
    instance
  }) => ["p-breadcrumb-item", {
    "p-disabled": instance.disabled()
  }],
  itemLink: "p-breadcrumb-item-link",
  itemIcon: "p-breadcrumb-item-icon",
  itemLabel: "p-breadcrumb-item-label"
};
var BreadCrumbStyle = class _BreadCrumbStyle extends BaseStyle {
  name = "breadcrumb";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵBreadCrumbStyle_BaseFactory;
    return function BreadCrumbStyle_Factory(__ngFactoryType__) {
      return (ɵBreadCrumbStyle_BaseFactory || (ɵBreadCrumbStyle_BaseFactory = ɵɵgetInheritedFactory(_BreadCrumbStyle)))(__ngFactoryType__ || _BreadCrumbStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _BreadCrumbStyle,
    factory: _BreadCrumbStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadCrumbStyle, [{
    type: Injectable
  }], null, null);
})();
var BreadcrumbClasses;
(function(BreadcrumbClasses2) {
  BreadcrumbClasses2["root"] = "p-breadcrumb";
  BreadcrumbClasses2["list"] = "p-breadcrumb-list";
  BreadcrumbClasses2["homeItem"] = "p-breadcrumb-home-item";
  BreadcrumbClasses2["separator"] = "p-breadcrumb-separator";
  BreadcrumbClasses2["item"] = "p-breadcrumb-item";
  BreadcrumbClasses2["itemLink"] = "p-breadcrumb-item-link";
  BreadcrumbClasses2["itemIcon"] = "p-breadcrumb-item-icon";
  BreadcrumbClasses2["itemLabel"] = "p-breadcrumb-item-label";
})(BreadcrumbClasses || (BreadcrumbClasses = {}));
var Breadcrumb = class _Breadcrumb extends BaseComponent {
  router;
  /**
   * An array of menuitems.
   * @group Props
   */
  model;
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
   * MenuItem configuration for the home icon.
   * @group Props
   */
  home;
  /**
   * Defines a string that labels the home icon for accessibility.
   * @group Props
   */
  homeAriaLabel;
  /**
   * Fired when an item is selected.
   * @param {BreadcrumbItemClickEvent} event - custom click event.
   * @group Emits
   */
  onItemClick = new EventEmitter();
  _componentStyle = inject(BreadCrumbStyle);
  constructor(router) {
    super();
    this.router = router;
  }
  onClick(event, item) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (!item.url && !item.routerLink) {
      event.preventDefault();
    }
    if (item.command) {
      item.command({
        originalEvent: event,
        item
      });
    }
    this.onItemClick.emit({
      originalEvent: event,
      item
    });
  }
  /**
   * Defines template option for item.
   * @group Templates
   */
  itemTemplate;
  /**
   * Defines template option for separator.
   * @group Templates
   */
  separatorTemplate;
  templates;
  _separatorTemplate;
  _itemTemplate;
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "separator":
          this._separatorTemplate = item.template;
          break;
        case "item":
          this._itemTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  static ɵfac = function Breadcrumb_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Breadcrumb)(ɵɵdirectiveInject(Router));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Breadcrumb,
    selectors: [["p-breadcrumb"]],
    contentQueries: function Breadcrumb_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 5);
        ɵɵcontentQuery(dirIndex, _c1, 5);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.separatorTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    inputs: {
      model: "model",
      style: "style",
      styleClass: "styleClass",
      home: "home",
      homeAriaLabel: "homeAriaLabel"
    },
    outputs: {
      onItemClick: "onItemClick"
    },
    features: [ɵɵProvidersFeature([BreadCrumbStyle]), ɵɵInheritDefinitionFeature],
    decls: 5,
    vars: 10,
    consts: [["htmlHomeLabel", ""], ["htmlHomeRouteLabel", ""], ["htmlLabel", ""], ["htmlRouteLabel", ""], [3, "ngStyle", "ngClass"], [1, "p-breadcrumb-list"], ["pTooltip", "", 3, "class", "ngClass", "ngStyle", "tooltipOptions", 4, "ngIf"], ["class", "p-breadcrumb-separator", 4, "ngIf"], ["ngFor", "", 3, "ngForOf"], ["pTooltip", "", 3, "ngClass", "ngStyle", "tooltipOptions"], ["class", "p-breadcrumb-item-link", 3, "href", "target", "click", 4, "ngIf"], ["class", "p-breadcrumb-item-link", 3, "routerLink", "queryParams", "routerLinkActiveOptions", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "click", 4, "ngIf"], [1, "p-breadcrumb-item-link", 3, "click", "href", "target"], ["class", "p-breadcrumb-item-icon", 3, "ngClass", "ngStyle", 4, "ngIf"], [3, "styleClass", 4, "ngIf"], [4, "ngIf"], [1, "p-breadcrumb-item-icon", 3, "ngClass", "ngStyle"], [3, "styleClass"], ["class", "p-breadcrumb-item-label", 4, "ngIf", "ngIfElse"], [1, "p-breadcrumb-item-label"], [1, "p-breadcrumb-item-label", 3, "innerHTML"], [1, "p-breadcrumb-item-link", 3, "click", "routerLink", "queryParams", "routerLinkActiveOptions", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state"], [1, "p-breadcrumb-separator"], [4, "ngTemplateOutlet"], ["pTooltip", "", 3, "class", "ngStyle", "ngClass", "tooltipOptions", 4, "ngIf"], ["pTooltip", "", 3, "ngStyle", "ngClass", "tooltipOptions"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "p-breadcrumb-item-link", 3, "target", "click", 4, "ngIf"], [1, "p-breadcrumb-item-link", 3, "click", "target"]],
    template: function Breadcrumb_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "nav", 4)(1, "ol", 5);
        ɵɵtemplate(2, Breadcrumb_li_2_Template, 3, 11, "li", 6)(3, Breadcrumb_li_3_Template, 3, 3, "li", 7)(4, Breadcrumb_ng_template_4_Template, 2, 2, "ng-template", 8);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngStyle", ctx.style)("ngClass", "p-breadcrumb p-component");
        ɵɵattribute("data-pc-name", "breadcrumb")("data-pc-section", "root");
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "menu");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.home && ctx.home.visible !== false);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.model && ctx.home);
        ɵɵadvance();
        ɵɵproperty("ngForOf", ctx.model);
      }
    },
    dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, RouterModule, RouterLink, TooltipModule, Tooltip, ChevronRightIcon, HomeIcon, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Breadcrumb, [{
    type: Component,
    args: [{
      selector: "p-breadcrumb",
      standalone: true,
      imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule],
      template: `
        <nav [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'" [attr.data-pc-name]="'breadcrumb'" [attr.data-pc-section]="'root'">
            <ol [attr.data-pc-section]="'menu'" class="p-breadcrumb-list">
                <li
                    [class]="home.styleClass"
                    [attr.id]="home.id"
                    [ngClass]="{ 'p-breadcrumb-home-item': true, 'p-disabled': home.disabled }"
                    [ngStyle]="home.style"
                    *ngIf="home && home.visible !== false"
                    pTooltip
                    [tooltipOptions]="home.tooltipOptions"
                    [attr.data-pc-section]="'home'"
                >
                    <a
                        [href]="home.url ? home.url : null"
                        *ngIf="!home.routerLink"
                        [attr.aria-label]="homeAriaLabel"
                        class="p-breadcrumb-item-link"
                        (click)="onClick($event, home)"
                        [target]="home.target"
                        [attr.title]="home.title"
                        [attr.tabindex]="home.disabled ? null : '0'"
                    >
                        <span *ngIf="home.icon" class="p-breadcrumb-item-icon" [ngClass]="home.icon" [ngStyle]="home?.style"></span>
                        <HomeIcon *ngIf="!home.icon" [styleClass]="'p-breadcrumb-item-icon'" />
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeLabel" class="p-breadcrumb-item-label">{{ home.label }}</span>
                            <ng-template #htmlHomeLabel><span class="p-breadcrumb-item-label" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                    <a
                        *ngIf="home.routerLink"
                        [routerLink]="home.routerLink"
                        [attr.aria-label]="homeAriaLabel"
                        [queryParams]="home.queryParams"
                        [routerLinkActiveOptions]="home.routerLinkActiveOptions || { exact: false }"
                        class="p-breadcrumb-item-link"
                        (click)="onClick($event, home)"
                        [target]="home.target"
                        [attr.title]="home.title"
                        [attr.tabindex]="home.disabled ? null : '0'"
                        [fragment]="home.fragment"
                        [queryParamsHandling]="home.queryParamsHandling"
                        [preserveFragment]="home.preserveFragment"
                        [skipLocationChange]="home.skipLocationChange"
                        [replaceUrl]="home.replaceUrl"
                        [state]="home.state"
                    >
                        <span *ngIf="home.icon" class="p-breadcrumb-item-icon" [ngClass]="home.icon" [ngStyle]="home.iconStyle"></span>
                        <HomeIcon *ngIf="!home.icon" [styleClass]="'p-breadcrumb-item-icon'" />
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeRouteLabel" class="p-breadcrumb-item-label">{{ home.label }}</span>
                            <ng-template #htmlHomeRouteLabel><span class="p-breadcrumb-item-label" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                </li>
                <li *ngIf="model && home" class="p-breadcrumb-separator" [attr.data-pc-section]="'separator'">
                    <ChevronRightIcon *ngIf="!separatorTemplate && !_separatorTemplate" />
                    <ng-template *ngTemplateOutlet="separatorTemplate || _separatorTemplate"></ng-template>
                </li>
                <ng-template ngFor let-menuitem let-end="last" [ngForOf]="model">
                    <li
                        *ngIf="menuitem.visible !== false"
                        [class]="menuitem.styleClass"
                        [attr.id]="menuitem.id"
                        [ngStyle]="menuitem.style"
                        [ngClass]="{ 'p-breadcrumb-item': true, 'p-disabled': menuitem.disabled }"
                        pTooltip
                        [tooltipOptions]="menuitem.tooltipOptions"
                        [attr.data-pc-section]="'menuitem'"
                    >
                        @if (itemTemplate || _itemTemplate) {
                            <ng-template *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: menuitem }"></ng-template>
                        } @else {
                            <a
                                *ngIf="!menuitem?.routerLink"
                                [attr.href]="menuitem?.url ? menuitem?.url : null"
                                class="p-breadcrumb-item-link"
                                (click)="onClick($event, menuitem)"
                                [target]="menuitem?.target"
                                [attr.title]="menuitem?.title"
                                [attr.tabindex]="menuitem?.disabled ? null : '0'"
                            >
                                <ng-container *ngIf="!itemTemplate && !_itemTemplate">
                                    <span *ngIf="menuitem?.icon" class="p-breadcrumb-item-icon" [ngClass]="menuitem?.icon" [ngStyle]="menuitem?.iconStyle"></span>
                                    <ng-container *ngIf="menuitem?.label">
                                        <span *ngIf="menuitem?.escape !== false; else htmlLabel" class="p-breadcrumb-item-label">{{ menuitem?.label }}</span>
                                        <ng-template #htmlLabel><span class="p-breadcrumb-item-label" [innerHTML]="menuitem?.label"></span></ng-template>
                                    </ng-container>
                                </ng-container>
                            </a>
                            <a
                                *ngIf="menuitem?.routerLink"
                                [routerLink]="menuitem?.routerLink"
                                [queryParams]="menuitem?.queryParams"
                                [routerLinkActiveOptions]="menuitem?.routerLinkActiveOptions || { exact: false }"
                                class="p-breadcrumb-item-link"
                                (click)="onClick($event, menuitem)"
                                [target]="menuitem?.target"
                                [attr.title]="menuitem?.title"
                                [attr.tabindex]="menuitem?.disabled ? null : '0'"
                                [fragment]="menuitem?.fragment"
                                [queryParamsHandling]="menuitem?.queryParamsHandling"
                                [preserveFragment]="menuitem?.preserveFragment"
                                [skipLocationChange]="menuitem?.skipLocationChange"
                                [replaceUrl]="menuitem?.replaceUrl"
                                [state]="menuitem?.state"
                            >
                                <span *ngIf="menuitem?.icon" class="p-breadcrumb-item-icon" [ngClass]="menuitem?.icon" [ngStyle]="menuitem?.iconStyle"></span>
                                <ng-container *ngIf="menuitem?.label">
                                    <span *ngIf="menuitem?.escape !== false; else htmlRouteLabel" class="p-breadcrumb-item-label">{{ menuitem?.label }}</span>
                                    <ng-template #htmlRouteLabel><span class="p-breadcrumb-item-label" [innerHTML]="menuitem?.label"></span></ng-template>
                                </ng-container>
                            </a>
                        }
                    </li>
                    <li *ngIf="!end && menuitem.visible !== false" class="p-breadcrumb-separator" [attr.data-pc-section]="'separator'">
                        <ChevronRightIcon *ngIf="!separatorTemplate && !_separatorTemplate" />
                        <ng-template *ngTemplateOutlet="separatorTemplate || _separatorTemplate"></ng-template>
                    </li>
                </ng-template>
            </ol>
        </nav>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [BreadCrumbStyle]
    }]
  }], () => [{
    type: Router
  }], {
    model: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    home: [{
      type: Input
    }],
    homeAriaLabel: [{
      type: Input
    }],
    onItemClick: [{
      type: Output
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item"]
    }],
    separatorTemplate: [{
      type: ContentChild,
      args: ["separator"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var BreadcrumbModule = class _BreadcrumbModule {
  static ɵfac = function BreadcrumbModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BreadcrumbModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _BreadcrumbModule,
    imports: [Breadcrumb, SharedModule],
    exports: [Breadcrumb, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Breadcrumb, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbModule, [{
    type: NgModule,
    args: [{
      imports: [Breadcrumb, SharedModule],
      exports: [Breadcrumb, SharedModule]
    }]
  }], null, null);
})();
export {
  BreadCrumbStyle,
  Breadcrumb,
  BreadcrumbClasses,
  BreadcrumbModule
};
//# sourceMappingURL=primeng_breadcrumb.js.map
