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

  handleClick() {
    this.isError = true;
    console.log( "Error image load" );
    this.el.getElementsByTagName('img')[0].src = this.brokenUrl;
 }

  render() {

     if( this.isError != true){
        return (
          // <h1>Image Test</h1>
          <img class="fcl-image-custom" src={this.src}  onError={ () => this.handleClick()}></img>
        );
      }else{
        return (
          // <h1>Image Test</h1>
          <img src={this.src}  onError={ () => this.handleClick()}></img>
        );
      }

  }

  componentDidLoad() {

  }

  componentWillUpdate() {


  }

}
