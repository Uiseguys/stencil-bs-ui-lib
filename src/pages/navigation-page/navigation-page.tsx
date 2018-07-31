import { Component, Event, EventEmitter } from '@stencil/core';


@Component({
    tag: 'navigation-page',
    styleUrl: 'navigation-page.scss'
})
export class NavigationPage {
    
    @Event() shownavigationtoggle: EventEmitter;
    @Event() shownavigationcontainertoggle: EventEmitter;

    toggleComponentShownClickHandler () {
        this.shownavigationtoggle.emit()
    }
    toggleContainerShownClickHandler () {
        this.shownavigationcontainertoggle.emit()
    }

    render() {
        return (
            <div class="container">
                <h2>Navigation Component</h2>

            

                <h3>Component settings</h3>

                <div class="row">
                    <div class="col-12">
                    
                    
                    <form>
                    <div class="form-group form-check">
                        <div class="btn btn-sm btn-primary mx-2" onClick={ () => this.toggleComponentShownClickHandler()}>Toggle</div>
                        <label class="form-check-label mx-2" >Toggle component shown</label>
                    </div>
                    <div class="form-group form-check">
                        <div class="btn btn-sm btn-primary mx-2" onClick={ () => this.toggleContainerShownClickHandler()}>Toggle</div>
                        <label class="form-check-label mx-2" >Toggle show navigation section</label>
                    </div>
                    </form>
                    
                    </div>
                
                
                </div>
            </div>
        );
    }
}