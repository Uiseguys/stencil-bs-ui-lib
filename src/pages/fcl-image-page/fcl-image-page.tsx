import { Component } from '@stencil/core';

@Component({
  tag: 'fcl-image-page',
})
export class FclImagePage {

  render() {
    return [
      <div>
           <fcl-image
               brokenUrl="https://s3.amazonaws.com/images.seroundtable.com/invalid-url-1354629517.pngk"
               src="https://www.w3schools.com/howto/img_fjordsk.jpg"></fcl-image>
      </div>
    ];
  }

}
