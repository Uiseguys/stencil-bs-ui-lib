import { Component } from '@stencil/core';

@Component({
    tag: 'stencil-bootstrap-demo',
})
export class StencilBootstrapDemo {
    cards: any[] = [
        {
            cardHeaderId: 'navbarHeading',
            cardBodyId: 'navbarCollapse',
            cardHeaderContent: 'Navbar Component',
            cardBodyContent: '<navbar-page></navbar-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'momentHeading',
            cardBodyId: 'momentCollapse',
            cardHeaderContent: 'Moment Component',
            cardBodyContent: '<moment-page></moment-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'collapseHeading',
            cardBodyId: 'collapseCollapse',
            cardHeaderContent: 'Collapse Component',
            cardBodyContent: '<collapse-page></collapse-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'tooltipHeading',
            cardBodyId: 'tooltipCollapse',
            cardHeaderContent: 'Tooltip Component',
            cardBodyContent: '<tooltip-page></tooltip-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'modalHeading',
            cardBodyId: 'modalCollapse',
            cardHeaderContent: 'Modal Component',
            cardBodyContent: '<modal-page></modal-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'videoHeaderId',
            cardBodyId: 'videoCollapse',
            cardHeaderContent: 'Video Component',
            cardBodyContent: '<video-player-page></video-player-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'alertHeaderId',
            cardBodyId: 'alertCollapse',
            cardHeaderContent: 'Alert Component',
            cardBodyContent: '<alerts-page></alerts-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'badgeHeaderId',
            cardBodyId: 'badgeCollapse',
            cardHeaderContent: 'Badge Component',
            cardBodyContent: '<badge-page></badge-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'breadcrumbHeaderId',
            cardBodyId: 'breadcrumbCollapse',
            cardHeaderContent: 'Breadcrumb Component',
            cardBodyContent: '<breadcrumb-page></breadcrumb-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'dropdownHeaderId',
            cardBodyId: 'dropdownCollapse',
            cardHeaderContent: 'Dropdown Component',
            cardBodyContent: '<dropdown-page></dropdown-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'fclImageHeaderId',
            cardBodyId: 'fclImageCollapse',
            cardHeaderContent: 'Fcl Image Component',
            cardBodyContent: '<fcl-image-page></fcl-image-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'formHeaderId',
            cardBodyId: 'formCollapse',
            cardHeaderContent: 'Form Component',
            cardBodyContent: '<form-page></form-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'listHeaderId',
            cardBodyId: 'listCollapse',
            cardHeaderContent: 'List Component',
            cardBodyContent: '<list-page></list-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'multiselectHeaderId',
            cardBodyId: 'multiselectCollapse',
            cardHeaderContent: 'Multiselect Component',
            cardBodyContent: '<multiselect-page></list-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'tagHeaderId',
            cardBodyId: 'tagCollapse',
            cardHeaderContent: 'Tag Component',
            cardBodyContent: '<tag-page></list-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'markdownHeaderId',
            cardBodyId: 'markdownCollapse',
            cardHeaderContent: 'Markdown Component',
            cardBodyContent: '<markdown-page></list-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'progressBarHeaderId',
            cardBodyId: 'progressBarCollapse',
            cardHeaderContent: 'Progress bar Component',
            cardBodyContent: '<progress-bar-page></progress-bar-page>',
            showOnInit: false
        },
        {
            cardHeaderId: 'typeaHeadHeaderId',
            cardBodyId: 'typeaHeadCollapse',
            cardHeaderContent: 'Typeahead Component',
            cardBodyContent: '<typeahead-page></list-page>',
            showOnInit: false
        }
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
                    <div class="col-lg-12">
                        <scb-collapse collapseid="mainCollapse" items={this.cards}></scb-collapse>
                    </div>
                </div>
            </div>
        );
    }
}
