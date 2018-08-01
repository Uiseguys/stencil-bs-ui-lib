import { Component, Prop, State, Listen } from '@stencil/core';
import '@stencil/router';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
  tag: 'stencil-bs-demo-page',
  styleUrl: 'stencil-bs-demo-page.scss'
})
export class StencilBsDemoPage {
  @Prop() root = '/';
  @State() navigationShown: boolean = false;
  @State() navContainerShown: boolean = false;
  @State() isIconsShown: boolean = true;
  
  
  components = [
    {
      componentName: 'navbar-page',
      url: '/navbar',
      title: 'Navbar Component',
      isHiden: true
    },
    {
      componentName: 'navigation-page',
      url: '/navigation',
      title: 'Navigation Component'
    },
    {
      componentName: 'dnd-page',
      url: '/dnd',
      title: 'DragAndDrop Component'
    },
    {
      componentName: 'resolution-info-page',
      url: '/resolution-info',
      title: 'Resolution Info Component'
    },
    {
      componentName: 'moment-page',
      url: '/moment',
      title: 'Moment Component'
    },
    {
      url: '/collapse',
      title: 'Collapse Component',
      componentName: 'collapse-page',
      isHiden: true
    },
    {
      url: '/tooltip',
      title: 'Tooltip Component',
      componentName: 'tooltip-page',
      isHiden: true
    },
    {
      url: '/video',
      title: 'Video Component',
      componentName: 'video-player-page'
    },
    {
      url: '/alert',
      title: 'Alert Component',
      componentName: 'alerts-page'
    },
    {
      url: '/badge',
      title: 'Badge Component',
      componentName: 'badge-page'
    },
    {
      url: '/breadcrumb',
      title: 'Breadcrumb Component',
      componentName: 'breadcrumb-page',
      isHiden: true
    },
    {
      url: '/dropdown',
      title: 'Dropdown Component',
      componentName: 'dropdown-page'
    },
    {
      url: '/fclImage',
      title: 'Fcl Image Component',
      componentName: 'fcl-image-page'
    },
    {
      url: '/form',
      title: 'Form Component',
      componentName: 'form-page',
      isHiden: true
    },
    {
      url: '/list',
      title: 'List Component',
      componentName: 'list-page'
    },
    {
      url: '/multiselect',
      title: 'Multiselect Component',
      componentName: 'multiselect-page'
    },
    {
      url: '/autocomplete-select',
      title: 'AutocompleteSelect Component',
      componentName: 'autocomplete-select-page'
    },
    {
      url: '/modal',
      title: 'Modal Component',
      componentName: 'modal-page'
    },
    {
      url: '/tabs',
      title: 'Tabs Component',
      componentName: 'tabs-page',
      isHiden: true
    },
    {
      url: '/tag',
      title: 'Tag Component',
      componentName: 'tag-page'
    },
    {
      url: '/markdown',
      title: 'Markdown Component',
      componentName: 'markdown-page'
    },
    {
      url: '/progressbar',
      title: 'Progress bar Component',
      componentName: 'progress-bar-page'
    },
    {
      url: '/typeahead',
      title: 'Typeahead Component',
      componentName: 'typeahead-page'
    },
    {
      url: '/schedule',
      title: 'Schedule Component',
      componentName: 'schedule-page',
      isHiden: true
    },
    {
      url: '/slider',
      title: 'Slider Component',
      componentName: 'mwc-slider-page',
      isHiden: true
    },
    {
      url: '/avatar',
      title: 'Avatar Component',
      componentName: 'avatar-page'
    },
    {
      url: '/sticky',
      title: 'Sticky Component',
      componentName: 'sticky-page',
      isHiden: true
    },
    {
      url: '/datepicker',
      title: 'Datepicker Component',
      componentName: 'datepicker-page'
    },
    {
      url: '/inlineedit',
      title: 'Inlineedit Component',
      componentName: 'inlineedit-page'
    },
    {
      url: '/inlineedit-textarea',
      title: 'Inlineedit Textarea Component',
      componentName: 'inlineedit-textarea-page'
    },
    {
      url: '/fileinput',
      title: 'Fileinput Component',
      componentName: 'file-input-page'
    },
    {
      url: '/popper',
      title: 'Popper Component',
      componentName: 'popper-page'
    },
    {
      url: '/wysiwyg-editor',
      title: 'Wysiwyg Editor Component',
      componentName: 'wysiwyg-editor-page'
    },
      {
          url: '/combobox',
          title: 'Combobox Component',
          componentName: 'combobox-page'
      },
    {
      url: '/mycheckbox',
      title: 'My Checkbox',
      componentName: 'my-checkbox-page'
    },
    {
      url: '/myswitch',
      title: 'My Switch',
      componentName: 'my-switch-page'
    }
  ];


  @Listen('shownavigationtoggle')
  navToggleHandler() {
    this.navigationShown = !this.navigationShown
  }
  @Listen('shownavigationcontainertoggle')
  containerToggle() {
    this.navContainerShown = !this.navContainerShown
  }
  @Listen('showniconstoggle')
  iconsToggle() {
    this.isIconsShown = !this.isIconsShown
  }

  render() {

    

    return [
      (
        this.navigationShown ? 


        
        <cwc-navigation isCollapsed={this.navContainerShown}>

          
          <div slot="primary-actions"> 

<cwc-navigation-global-item 
    titleText={'Title text'} 
    icon="./assets/icon/sharp_send_white_48dp.png"/>
<cwc-navigation-global-item 
    titleText={'Title text'} 
    icon="./assets/icon/sharp_check_circle_outline_white_18dp.png"/>
<cwc-navigation-global-item 
    titleText={'Title text'} 
    icon="./assets/icon/baseline_add_white_18dp.png"/>
    
</div>

<div slot="secondary-actions">
<cwc-navigation-global-item 
    titleText={'Secondary action'} 
    icon="./assets/icon/sharp_send_white_48dp.png"/>
</div>




<div slot="container-actions">
<navigation-title text="Nav Title" 
icon="./assets/icon/sharp_flip_to_front_white_18dp.png"/>


<navigation-item-group text="Actions group">

  <div slot="navigation-items">

      <navigation-item  showIcon={this.isIconsShown}text="Navigation item" />
      <navigation-item  showIcon={this.isIconsShown}text="With subtext"
          subText="Subtext of nav item" />
      <navigation-item  showIcon={this.isIconsShown}text="Basic link" />

      <navigation-item  showIcon={this.isIconsShown}text="With drop icon" 
          dropIcon="./assets/icon/sharp_flip_to_front_white_18dp.png"/>
  
  </div>
</navigation-item-group>

<navigation-item-group text="Group with separator" hasSeparator={true}>

  <div slot="navigation-items">
      <navigation-item  showIcon={this.isIconsShown}text="With dropicon and subasdfastext" 
      subText="My small subtext"
      icon={'./assets/icon/sharp_flip_to_front_white_18dp.png'}
      dropIcon={'./assets/icon/sharp_flip_to_front_white_18dp.png'}/>

      <navigation-item  showIcon={this.isIconsShown}text="With dropicon and subtext" 
      subText="My small subtext"
      icon={'./assets/icon/sharp_flip_to_front_white_18dp.png'}
      dropIcon={'./assets/icon/sharp_flip_to_front_white_18dp.png'}/>
      
      <navigation-item  showIcon={this.isIconsShown}text="With mouse events" />
  </div>
</navigation-item-group>

</div>

      </cwc-navigation> : null

  ),
      <cwc-styles />,
      <div class={`container-fluid ${this.navigationShown ? 'with-navigation' : '' }`}>
        <div class="row">
          <div class="col-12 text-center">
            <h1>UI Library</h1>
          </div>
        </div>
        <div class="row">
          <nav class="col-2">
            <ul class="nav flex-column">
              {this.components.filter(cmp => !cmp.isHiden).map(cmp => (
                <li class="nav-item">
                  <stencil-route-link
                    url={cmp.url}
                    activeClass="active"
                    class="nav-link"
                  >
                    {cmp.title}
                  </stencil-route-link>
                </li>
              ))}
            </ul>
          </nav>
          <main class="col-10">
            <stencil-router root={this.root}>
              {this.components
                .filter(cmp => !cmp.isHiden)
                .map(cmp => (
                  <stencil-route url={cmp.url} component={cmp.componentName} />
                ))}
            </stencil-router>
          </main>
        </div>
      </div>
    ];
  }
}
