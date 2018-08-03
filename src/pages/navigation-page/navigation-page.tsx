import { Component, Event, EventEmitter } from '@stencil/core';


@Component({
    tag: 'navigation-page',
    styleUrl: 'navigation-page.scss'
})
export class NavigationPage {
    
    @Event() shownavigationtoggle: EventEmitter;
    @Event() shownavigationcontainertoggle: EventEmitter;
    @Event() naviconstoggle: EventEmitter;
    toggleComponentShownClickHandler () {
        this.shownavigationtoggle.emit()
    }
    toggleContainerShownClickHandler () {
        this.shownavigationcontainertoggle.emit()
    }
    toggleShowIconsClickHandler() {
        this.naviconstoggle.emit()
    }

    render() {
        return (
            <div class="container">
                <h2>Navigation Component</h2>

            

                <h3>Overview</h3>
                <h3>Demo controls</h3>

                <p>This is a navigation component made with Atlassian's design guidelines and concepts.</p>

                <div class="row">
                    <div class="col-9 offset-3">
                    
                    
                    <form>
                    <div class="form-group form-check">
                        <div class="btn btn-sm btn-primary mx-2" onClick={ () => this.toggleComponentShownClickHandler()}>Toggle</div>
                        <label class="form-check-label mx-2" >Toggle component shown</label>
                    </div>
                    <div class="form-group form-check">
                        <div class="btn btn-sm btn-primary mx-2" onClick={ () => this.toggleContainerShownClickHandler()}>Toggle</div>
                        <label class="form-check-label mx-2" >Toggle show navigation section</label>
                    </div>
                    <div class="form-group form-check">
                        <div class="btn btn-sm btn-primary mx-2" onClick={ () => this.toggleShowIconsClickHandler()}>Toggle</div>
                        <label class="form-check-label mx-2" >Toggle show navigation items icons</label>
                    </div>
                    </form>
                    
                    </div>
                
                
                </div>
            </div>
        );
    }
}