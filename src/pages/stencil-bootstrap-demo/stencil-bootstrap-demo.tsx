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
