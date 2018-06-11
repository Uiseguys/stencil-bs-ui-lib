import { Component, Prop } from '@stencil/core';
import '@stencil/router';
import 'bootstrap.native/dist/bootstrap-native-v4';

@Component({
    tag: 'stencil-bs-demo-page',
})
export class StencilBsDemoPage {
    @Prop() root = '/';
    components = [
        {
            componentName: 'navbar-page',
            url: '/navbar',
            title: 'Navbar Component',
            isHiden: true
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
            componentName: 'alerts-page',
            isHiden: true
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
    ];

    render() {
        return ([
            <cwc-styles/>,
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 text-center">
                        <h1>UI Library</h1>
                    </div>
                </div>            
                <div class="row">
                    <nav class="col-2">
                        <ul class="nav flex-column">
                            {this.components.filter(cmp => !cmp.isHiden).map((cmp) =>
                                <li class="nav-item">                
                                    <stencil-route-link
                                            url={cmp.url}
                                            activeClass="active"
                                            class="nav-link"
                                            >
                                            {cmp.title}
                                    </stencil-route-link>
                                </li>
                            )}
                        </ul>                    
                    </nav>
                    <main class="col-10">
                        <stencil-router root={this.root}>
                            {this.components.filter(cmp => !cmp.isHiden).map((cmp) =>
                                    <stencil-route
                                        url={cmp.url}
                                        component={cmp.componentName}
                                    />
                            )}                                                  
                        </stencil-router>                  
                    </main>
                </div>
            </div>
        ]
        )
    }
}
