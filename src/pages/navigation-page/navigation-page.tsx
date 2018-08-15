import { Component, Event, EventEmitter } from '@stencil/core';


@Component({
    tag: 'navigation-page',
    styleUrl: 'navigation-page.scss'
})
export class NavigationPage {

    @Event() shownavigationtoggle: EventEmitter;
    @Event() shownavigationcontainertoggle: EventEmitter;
    @Event() naviconstoggle: EventEmitter;
    toggleComponentShownClickHandler() {
        this.shownavigationtoggle.emit()
    }
    toggleContainerShownClickHandler() {
        this.shownavigationcontainertoggle.emit()
    }
    toggleShowIconsClickHandler() {
        this.naviconstoggle.emit()
    }

    render() {
        return (
            <div class="container">
                <h2>Navigation Component</h2>


                <h3 class="api-header">Overview</h3>


                <p>This is a navigation component made with Atlassian's design guidelines and concepts.</p>
                <p>It consist of main <code>&lt;cwc-navigation &#x2F;&gt;</code> component and it nested helper components such as:
                <h5 class="lead mx-2 mt-2">containers:</h5>
                    <ul class="">

                        <li><code>&lt;cwc-navigation-container-section&gt;</code></li>
                        <li><code>&lt;cwc-navigation-global-section&gt;</code></li>

                    </ul>
                    <h5 class="lead mx-2">nested items:</h5>
                    <ul >

                        <li><code>&lt;cwc-navigation-global-item&gt;</code></li>
                        <li><code>&lt;navigation-title&gt;</code></li>
                        <li><code>&lt;navigation-item&gt;</code></li>
                        <li><code>&lt;navibation-item-group&gt;</code></li>

                    </ul>

                </p>
                <p>
                    You can use this nested items for quick component protyping (recommended way) or use your own. <br />

                </p>



                <h3 class="api-header"> Navigaton component api</h3>
                <p>
                    This component has three slots to place your content: <code></code>
                </p>

                <div class="row">
                    <div class="col-9 offset-3">


                        <form>
                            <div class="form-group form-check">
                                <div class="btn btn-sm btn-primary mx-2" onClick={() => this.toggleComponentShownClickHandler()}>Toggle</div>
                                <label class="form-check-label mx-2" >Toggle component shown</label>
                            </div>
                            <div class="form-group form-check">
                                <div class="btn btn-sm btn-primary mx-2" onClick={() => this.toggleContainerShownClickHandler()}>Toggle</div>
                                <label class="form-check-label mx-2" >Toggle show navigation section</label>
                            </div>
                            <div class="form-group form-check">
                                <div class="btn btn-sm btn-primary mx-2" onClick={() => this.toggleShowIconsClickHandler()}>Toggle</div>
                                <label class="form-check-label mx-2" >Toggle show navigation items icons</label>
                            </div>
                        </form>

                    </div>


                </div>
            </div>
        );
    }
}