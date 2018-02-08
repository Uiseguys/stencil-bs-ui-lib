/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/router';

import {
  BootstrapThemeColor,
} from './common/bootstrap-theme-color.type';
import {
  BootstrapThemeColor as BootstrapThemeColor2,
  IBreadcrumbItem,
} from './common/index';
import {
  HostElement,
} from '@stencil/core';
import {
  VirtualNode,
} from './components/scb-list/scb-list-interfaces';

import {
  StencilComponent as CwcDropdown
} from './components/cwc-dropdown/cwc-dropdown';

declare global {
  interface HTMLCwcDropdownElement extends CwcDropdown, HTMLElement {
  }
  var HTMLCwcDropdownElement: {
    prototype: HTMLCwcDropdownElement;
    new (): HTMLCwcDropdownElement;
  };
  interface HTMLElementTagNameMap {
    "cwc-dropdown": HTMLCwcDropdownElement;
  }
  interface ElementTagNameMap {
    "cwc-dropdown": HTMLCwcDropdownElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "cwc-dropdown": JSXElements.CwcDropdownAttributes;
    }
  }
  namespace JSXElements {
    export interface CwcDropdownAttributes extends HTMLAttributes {
      dropdownPlacement?: any;
      offsetString?: string;
      triggerOverflow?: boolean;
    }
  }
}


import {
  CwcMultiselect as CwcMultiselect
} from './components/cwc-multiselect/cwc-multiselect';

declare global {
  interface HTMLCwcMultiselectElement extends CwcMultiselect, HTMLElement {
  }
  var HTMLCwcMultiselectElement: {
    prototype: HTMLCwcMultiselectElement;
    new (): HTMLCwcMultiselectElement;
  };
  interface HTMLElementTagNameMap {
    "cwc-multiselect": HTMLCwcMultiselectElement;
  }
  interface ElementTagNameMap {
    "cwc-multiselect": HTMLCwcMultiselectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "cwc-multiselect": JSXElements.CwcMultiselectAttributes;
    }
  }
  namespace JSXElements {
    export interface CwcMultiselectAttributes extends HTMLAttributes {
      data?: any[];
      idValue?: string;
      minSearchLength?: number;
      placeholder?: string;
      searchKey?: string;
    }
  }
}


import {
  CwcTag as CwcTag
} from './components/cwc-tag/cwc-tag';

declare global {
  interface HTMLCwcTagElement extends CwcTag, HTMLElement {
  }
  var HTMLCwcTagElement: {
    prototype: HTMLCwcTagElement;
    new (): HTMLCwcTagElement;
  };
  interface HTMLElementTagNameMap {
    "cwc-tag": HTMLCwcTagElement;
  }
  interface ElementTagNameMap {
    "cwc-tag": HTMLCwcTagElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "cwc-tag": JSXElements.CwcTagAttributes;
    }
  }
  namespace JSXElements {
    export interface CwcTagAttributes extends HTMLAttributes {
      classes?: string;
      closable?: boolean;
      imgLink?: string;
      limitTo?: number;
      link?: string;
      rounded?: boolean;
      tagType?: BootstrapThemeColor;
      text?: string;
    }
  }
}


import {
  CwcTypeahead as CwcTypeahead
} from './components/cwc-typeahead/cwc-typeahead';

declare global {
  interface HTMLCwcTypeaheadElement extends CwcTypeahead, HTMLElement {
  }
  var HTMLCwcTypeaheadElement: {
    prototype: HTMLCwcTypeaheadElement;
    new (): HTMLCwcTypeaheadElement;
  };
  interface HTMLElementTagNameMap {
    "cwc-typeahead": HTMLCwcTypeaheadElement;
  }
  interface ElementTagNameMap {
    "cwc-typeahead": HTMLCwcTypeaheadElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "cwc-typeahead": JSXElements.CwcTypeaheadAttributes;
    }
  }
  namespace JSXElements {
    export interface CwcTypeaheadAttributes extends HTMLAttributes {
      data?: any[];
      idValue?: string;
      minSearchLength?: number;
      placeholder?: string;
      searchKey?: string;
    }
  }
}


import {
  FclImage as FclImage
} from './components/fcl-image/fcl-image';

declare global {
  interface HTMLFclImageElement extends FclImage, HTMLElement {
  }
  var HTMLFclImageElement: {
    prototype: HTMLFclImageElement;
    new (): HTMLFclImageElement;
  };
  interface HTMLElementTagNameMap {
    "fcl-image": HTMLFclImageElement;
  }
  interface ElementTagNameMap {
    "fcl-image": HTMLFclImageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "fcl-image": JSXElements.FclImageAttributes;
    }
  }
  namespace JSXElements {
    export interface FclImageAttributes extends HTMLAttributes {
      brokenUrl?: any;
      height?: any;
      src?: any;
      width?: any;
    }
  }
}


import {
  FclVideoPLayer as FclVideoPlayer
} from './components/fcl-video-player/fcl-video-player';

declare global {
  interface HTMLFclVideoPlayerElement extends FclVideoPlayer, HTMLElement {
  }
  var HTMLFclVideoPlayerElement: {
    prototype: HTMLFclVideoPlayerElement;
    new (): HTMLFclVideoPlayerElement;
  };
  interface HTMLElementTagNameMap {
    "fcl-video-player": HTMLFclVideoPlayerElement;
  }
  interface ElementTagNameMap {
    "fcl-video-player": HTMLFclVideoPlayerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "fcl-video-player": JSXElements.FclVideoPlayerAttributes;
    }
  }
  namespace JSXElements {
    export interface FclVideoPlayerAttributes extends HTMLAttributes {
      controls?: boolean;
      poster?: string;
    }
  }
}


import {
  ScbAlert as ScbAlert
} from './components/scb-alert/scb-alert';

declare global {
  interface HTMLScbAlertElement extends ScbAlert, HTMLElement {
  }
  var HTMLScbAlertElement: {
    prototype: HTMLScbAlertElement;
    new (): HTMLScbAlertElement;
  };
  interface HTMLElementTagNameMap {
    "scb-alert": HTMLScbAlertElement;
  }
  interface ElementTagNameMap {
    "scb-alert": HTMLScbAlertElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "scb-alert": JSXElements.ScbAlertAttributes;
    }
  }
  namespace JSXElements {
    export interface ScbAlertAttributes extends HTMLAttributes {
      animatable?: boolean;
      dismissible?: boolean;
      onDismiss?: (hostEl: HostElement) => void;
      type?: BootstrapThemeColor;
    }
  }
}


import {
  ScbBadge as ScbBadge
} from './components/scb-badge/scb-badge';

declare global {
  interface HTMLScbBadgeElement extends ScbBadge, HTMLElement {
  }
  var HTMLScbBadgeElement: {
    prototype: HTMLScbBadgeElement;
    new (): HTMLScbBadgeElement;
  };
  interface HTMLElementTagNameMap {
    "scb-badge": HTMLScbBadgeElement;
  }
  interface ElementTagNameMap {
    "scb-badge": HTMLScbBadgeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "scb-badge": JSXElements.ScbBadgeAttributes;
    }
  }
  namespace JSXElements {
    export interface ScbBadgeAttributes extends HTMLAttributes {
      link?: string;
      pill?: boolean;
      type?: BootstrapThemeColor;
    }
  }
}


import {
  ScbBreadcrumb as ScbBreadcrumb
} from './components/scb-breadcrumb/scb-breadcrumb';

declare global {
  interface HTMLScbBreadcrumbElement extends ScbBreadcrumb, HTMLElement {
  }
  var HTMLScbBreadcrumbElement: {
    prototype: HTMLScbBreadcrumbElement;
    new (): HTMLScbBreadcrumbElement;
  };
  interface HTMLElementTagNameMap {
    "scb-breadcrumb": HTMLScbBreadcrumbElement;
  }
  interface ElementTagNameMap {
    "scb-breadcrumb": HTMLScbBreadcrumbElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "scb-breadcrumb": JSXElements.ScbBreadcrumbAttributes;
    }
  }
  namespace JSXElements {
    export interface ScbBreadcrumbAttributes extends HTMLAttributes {
      items?: IBreadcrumbItem[];
    }
  }
}


import {
  ScbFileInput as ScbFileInput
} from './components/scb-file-input/scb-file-input';

declare global {
  interface HTMLScbFileInputElement extends ScbFileInput, HTMLElement {
  }
  var HTMLScbFileInputElement: {
    prototype: HTMLScbFileInputElement;
    new (): HTMLScbFileInputElement;
  };
  interface HTMLElementTagNameMap {
    "scb-file-input": HTMLScbFileInputElement;
  }
  interface ElementTagNameMap {
    "scb-file-input": HTMLScbFileInputElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "scb-file-input": JSXElements.ScbFileInputAttributes;
    }
  }
  namespace JSXElements {
    export interface ScbFileInputAttributes extends HTMLAttributes {
      accept?: string;
      files?: any[];
      formDataName?: string;
      headers?: string;
      maxFiles?: number;
      maxFileSize?: number;
      method?: string;
      noAuto?: boolean;
      nodrop?: boolean;
      target?: string;
      timeout?: number;
      type?: BootstrapThemeColor;
    }
  }
}


import {
  StencilComponent as ScbList
} from './components/scb-list/scb-list';

declare global {
  interface HTMLScbListElement extends ScbList, HTMLElement {
  }
  var HTMLScbListElement: {
    prototype: HTMLScbListElement;
    new (): HTMLScbListElement;
  };
  interface HTMLElementTagNameMap {
    "scb-list": HTMLScbListElement;
  }
  interface ElementTagNameMap {
    "scb-list": HTMLScbListElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "scb-list": JSXElements.ScbListAttributes;
    }
  }
  namespace JSXElements {
    export interface ScbListAttributes extends HTMLAttributes {
      addClass?: string;
      addClassEven?: string;
      addClassOdd?: string;
      bindToList?: boolean;
      bottomOffset?: number;
      itemAs?: string;
      items?: object[];
      template?: VirtualNode;
      wrapperClass?: string;
    }
  }
}


import {
  AlertsPage as AlertsPage
} from './pages/alerts-page/alerts-page';

declare global {
  interface HTMLAlertsPageElement extends AlertsPage, HTMLElement {
  }
  var HTMLAlertsPageElement: {
    prototype: HTMLAlertsPageElement;
    new (): HTMLAlertsPageElement;
  };
  interface HTMLElementTagNameMap {
    "alerts-page": HTMLAlertsPageElement;
  }
  interface ElementTagNameMap {
    "alerts-page": HTMLAlertsPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "alerts-page": JSXElements.AlertsPageAttributes;
    }
  }
  namespace JSXElements {
    export interface AlertsPageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  BadgePage as BadgePage
} from './pages/badge-page/badge-page';

declare global {
  interface HTMLBadgePageElement extends BadgePage, HTMLElement {
  }
  var HTMLBadgePageElement: {
    prototype: HTMLBadgePageElement;
    new (): HTMLBadgePageElement;
  };
  interface HTMLElementTagNameMap {
    "badge-page": HTMLBadgePageElement;
  }
  interface ElementTagNameMap {
    "badge-page": HTMLBadgePageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "badge-page": JSXElements.BadgePageAttributes;
    }
  }
  namespace JSXElements {
    export interface BadgePageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  BreadcrumbPage as BreadcrumbPage
} from './pages/breadcrumb-page/breadcrumb-page';

declare global {
  interface HTMLBreadcrumbPageElement extends BreadcrumbPage, HTMLElement {
  }
  var HTMLBreadcrumbPageElement: {
    prototype: HTMLBreadcrumbPageElement;
    new (): HTMLBreadcrumbPageElement;
  };
  interface HTMLElementTagNameMap {
    "breadcrumb-page": HTMLBreadcrumbPageElement;
  }
  interface ElementTagNameMap {
    "breadcrumb-page": HTMLBreadcrumbPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "breadcrumb-page": JSXElements.BreadcrumbPageAttributes;
    }
  }
  namespace JSXElements {
    export interface BreadcrumbPageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  StencilComponent as DropdownPage
} from './pages/dropdown-page/dropdown-page';

declare global {
  interface HTMLDropdownPageElement extends DropdownPage, HTMLElement {
  }
  var HTMLDropdownPageElement: {
    prototype: HTMLDropdownPageElement;
    new (): HTMLDropdownPageElement;
  };
  interface HTMLElementTagNameMap {
    "dropdown-page": HTMLDropdownPageElement;
  }
  interface ElementTagNameMap {
    "dropdown-page": HTMLDropdownPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "dropdown-page": JSXElements.DropdownPageAttributes;
    }
  }
  namespace JSXElements {
    export interface DropdownPageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  FclImagePage as FclImagePage
} from './pages/fcl-image-page/fcl-image-page';

declare global {
  interface HTMLFclImagePageElement extends FclImagePage, HTMLElement {
  }
  var HTMLFclImagePageElement: {
    prototype: HTMLFclImagePageElement;
    new (): HTMLFclImagePageElement;
  };
  interface HTMLElementTagNameMap {
    "fcl-image-page": HTMLFclImagePageElement;
  }
  interface ElementTagNameMap {
    "fcl-image-page": HTMLFclImagePageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "fcl-image-page": JSXElements.FclImagePageAttributes;
    }
  }
  namespace JSXElements {
    export interface FclImagePageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  FileInputPage as FileInputPage
} from './pages/file-input-page/file-input-page';

declare global {
  interface HTMLFileInputPageElement extends FileInputPage, HTMLElement {
  }
  var HTMLFileInputPageElement: {
    prototype: HTMLFileInputPageElement;
    new (): HTMLFileInputPageElement;
  };
  interface HTMLElementTagNameMap {
    "file-input-page": HTMLFileInputPageElement;
  }
  interface ElementTagNameMap {
    "file-input-page": HTMLFileInputPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "file-input-page": JSXElements.FileInputPageAttributes;
    }
  }
  namespace JSXElements {
    export interface FileInputPageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  ListPage as ListPage
} from './pages/list-page/list-page';

declare global {
  interface HTMLListPageElement extends ListPage, HTMLElement {
  }
  var HTMLListPageElement: {
    prototype: HTMLListPageElement;
    new (): HTMLListPageElement;
  };
  interface HTMLElementTagNameMap {
    "list-page": HTMLListPageElement;
  }
  interface ElementTagNameMap {
    "list-page": HTMLListPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "list-page": JSXElements.ListPageAttributes;
    }
  }
  namespace JSXElements {
    export interface ListPageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  MultiselectPage as MultiselectPage
} from './pages/multiselect-page/multiselect-page';

declare global {
  interface HTMLMultiselectPageElement extends MultiselectPage, HTMLElement {
  }
  var HTMLMultiselectPageElement: {
    prototype: HTMLMultiselectPageElement;
    new (): HTMLMultiselectPageElement;
  };
  interface HTMLElementTagNameMap {
    "multiselect-page": HTMLMultiselectPageElement;
  }
  interface ElementTagNameMap {
    "multiselect-page": HTMLMultiselectPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "multiselect-page": JSXElements.MultiselectPageAttributes;
    }
  }
  namespace JSXElements {
    export interface MultiselectPageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  StencilBootstrapDemo as StencilBootstrapDemo
} from './pages/stencil-bootstrap-demo/stencil-bootstrap-demo';

declare global {
  interface HTMLStencilBootstrapDemoElement extends StencilBootstrapDemo, HTMLElement {
  }
  var HTMLStencilBootstrapDemoElement: {
    prototype: HTMLStencilBootstrapDemoElement;
    new (): HTMLStencilBootstrapDemoElement;
  };
  interface HTMLElementTagNameMap {
    "stencil-bootstrap-demo": HTMLStencilBootstrapDemoElement;
  }
  interface ElementTagNameMap {
    "stencil-bootstrap-demo": HTMLStencilBootstrapDemoElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "stencil-bootstrap-demo": JSXElements.StencilBootstrapDemoAttributes;
    }
  }
  namespace JSXElements {
    export interface StencilBootstrapDemoAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  TagPage as TagPage
} from './pages/tag-page/tag-page';

declare global {
  interface HTMLTagPageElement extends TagPage, HTMLElement {
  }
  var HTMLTagPageElement: {
    prototype: HTMLTagPageElement;
    new (): HTMLTagPageElement;
  };
  interface HTMLElementTagNameMap {
    "tag-page": HTMLTagPageElement;
  }
  interface ElementTagNameMap {
    "tag-page": HTMLTagPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "tag-page": JSXElements.TagPageAttributes;
    }
  }
  namespace JSXElements {
    export interface TagPageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  StencilComponent as TypeaheadPage
} from './pages/typeahead-page/typeahead-page';

declare global {
  interface HTMLTypeaheadPageElement extends TypeaheadPage, HTMLElement {
  }
  var HTMLTypeaheadPageElement: {
    prototype: HTMLTypeaheadPageElement;
    new (): HTMLTypeaheadPageElement;
  };
  interface HTMLElementTagNameMap {
    "typeahead-page": HTMLTypeaheadPageElement;
  }
  interface ElementTagNameMap {
    "typeahead-page": HTMLTypeaheadPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "typeahead-page": JSXElements.TypeaheadPageAttributes;
    }
  }
  namespace JSXElements {
    export interface TypeaheadPageAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  VideoPlayerPage as VideoPlayerPage
} from './pages/video-player-page/video-player-page';

declare global {
  interface HTMLVideoPlayerPageElement extends VideoPlayerPage, HTMLElement {
  }
  var HTMLVideoPlayerPageElement: {
    prototype: HTMLVideoPlayerPageElement;
    new (): HTMLVideoPlayerPageElement;
  };
  interface HTMLElementTagNameMap {
    "video-player-page": HTMLVideoPlayerPageElement;
  }
  interface ElementTagNameMap {
    "video-player-page": HTMLVideoPlayerPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "video-player-page": JSXElements.VideoPlayerPageAttributes;
    }
  }
  namespace JSXElements {
    export interface VideoPlayerPageAttributes extends HTMLAttributes {
      
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
