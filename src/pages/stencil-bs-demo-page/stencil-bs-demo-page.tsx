import { Component } from '@stencil/core';
import '@stencil/router';

@Component({
    tag: 'stencil-bs-demo-page',
    styleUrl: '../../../node_modules/bootstrap/dist/css/bootstrap.css'
})
export class StencilBsDemoPage {
    components = [
        {
            componentName: 'navbar-page',
            url: '/navbar',
            title: 'Navbar Component'
        },
        {
            componentName: 'moment-page',
            url: '/moment',
            title: 'Moment Component'
        },
        {
            url: '/collapse',
            title: 'Collapse Component',
            componentName: 'collapse-page'
        },
        {
            url: '/tooltip',
            title: 'Tooltip Component',
            componentName: 'tooltip-page'
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
            componentName: 'breadcrumb-page'
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
            componentName: 'form-page'
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
            componentName: 'tabs-page'
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
            componentName: 'schedule-page'
        },
        {
            url: '/slider',
            title: 'Slider Component',
            componentName: 'mwc-slider-page'
        },        
        {
            url: '/avatar',
            title: 'Avatar Component',
            componentName: 'avatar-page'
        },                
        {
            url: '/sticky',
            title: 'Sticky Component',
            componentName: 'sticky-page'
        },
    ];

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 text-center">
                        <h1>Web Components for Bootstrap 4 Beta</h1>
                        <p>Built with <a href="https://stenciljs.com" target="blank">Stencil</a> &lt;3</p>
                    </div>
                </div>            
                <div class="row">
                    <nav class="col-2">
                        <ul class="nav flex-column">
                            {this.components.map((cmp) =>
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
                        <stencil-router>
                            {this.components.map((cmp) =>
                                    <stencil-route
                                        url={cmp.url}
                                        component={cmp.componentName}
                                    />
                            )}                                                  
                        </stencil-router>                  
                    </main>
                </div>
            </div>
        )
    }
}
