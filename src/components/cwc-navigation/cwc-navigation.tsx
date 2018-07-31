import { Component, Prop } from "@stencil/core";

export enum NavigationMode {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

@Component({
  tag: "cwc-navigation",
  styleUrl: "cwc-navigation.scss"
})
export class CwcNavigation {
  @Prop() isCollapsed: boolean = true;

  @Prop() primaryActions: any[] = [];
  @Prop() secondaryActions: any[] = [];
  @Prop() containerChildren: any[] = [];

  render() {

    
    return (
      <div class="cwc-navigation-inner">
        {this.isCollapsed ? (
          <cwc-navigation-global-section >

            {/* main top PRIMARY_ACTIONS_BLOCK (which always stay here) */}

            <div slot="primary-actions-lvl-2">
              <slot name="primary-actions" />
            </div>

            <div slot="secondary-actions-lvl-2">
              <slot name="secondary-actions" />
            </div>
           

            <div class="invisible">
              <slot name="container-actions" />
            </div>

            {/* navigation container children are rendered here when isCollapsed = true */}
            {/* {this.containerChildren} */}

            {/* main bottom SECONDARY_ACTIONS_BLOCK (which always stay here) */}
          </cwc-navigation-global-section>
        ) : (
          [
            <cwc-navigation-global-section >

              {/* main top PRIMARY_ACTIONS_BLOCK (which always stay here) */}
              <div slot="primary-actions-lvl-2">

                <slot name="primary-actions" />
              </div>

              <div slot="secondary-actions-lvl-2">
                <slot name="secondary-actions" />
              </div>



              {/* main bottom SECONDARY_ACTIONS_BLOCK (which always stay here) */}
            </cwc-navigation-global-section >,


            <cwc-navigation-container-section > 

              <div slot="container-actions-lvl-2" >
                <slot name="container-actions"/>
              </div>  

            </cwc-navigation-container-section>
          ]
        )}
      </div>
    );
  }
}
