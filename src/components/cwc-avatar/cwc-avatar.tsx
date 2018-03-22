import { Component, Prop } from "@stencil/core";

@Component({
  tag: "cwc-avatar"
})
export class CwcAvatar {

  @Prop() name: string;
  @Prop() rounded: boolean;
  @Prop() size: number;
  @Prop() fontSize: number;
  @Prop() length: number;
  @Prop() background: string;
  @Prop() color: string;
  @Prop() uppercase: boolean;  

  render() {
    let url = "https://ui-avatars.com/api/?";

    this.name ? url += "name=" + this.name : url += "name=";
    this.rounded ? url += "&rounded=true" : url += "";
    this.size ? url += "&size=" + this.size : url += "";
    this.fontSize ? url += "&font-size=" + this.fontSize :  url += "";
    this.length ? url += "&length=" + this.length :  url += "";
    this.background ? url += "&background=" + this.background :  url += "";
    this.color ? url += "&color=" + this.color :  url += "";
    this.uppercase ? url += "" : url += "&uppercase=false";

    return (
      <img src={url} />
    );

  }
}
