import { Component, Prop, Element, HostElement } from '@stencil/core';

@Component({
  tag: 'fcl-image',
  styleUrl: './css/fcl-image-css.scss'
})
export class FclImage {

  // Indicate that name should be a public property on the component
  @Prop() brokenUrl: any;
  @Prop() src: any;
  @Prop() height: any;
  @Prop() width: any;

  isError: any = false;

  @Element() el: HostElement;

  handleError() {
    this.isError = true;
    console.log( "Error image load in image component" );
    this.el.getElementsByTagName('img')[0].src = this.brokenUrl;
 }

  render() {

     if (this.isError) {
        return (
          <img class="fcl-image-custom" src={this.brokenUrl}></img>
        );
      } else {
        return (
          <img src={this.src}  onError={ () => this.handleError()}></img>
        );
      }

  }

  componentDidLoad() {
      console.log('component did load in image component');
  }

  componentWillUpdate() {
      console.log('component will update image component');
  }

}
