// import {
//   Component,
//   Element,
//   Prop,
//   Method,
//   Event,
//   EventEmitter
// } from '@stencil/core';
// import '../../lib/bootstrap-slider/bootstrap-slider';
// declare var Slider: any;
//
// @Component({
//   tag: 'mwc-slider',
//   styleUrls: [
//     'mwc-slider.scss',
//     '../../lib/bootstrap-slider/css/bootstrap-slider.css'
//   ]
// })
// export class MWCSlider {
//   @Event() change: EventEmitter;
//
//   @Element() el: HTMLElement;
//   @Prop() value: number = 50;
//   @Prop() min: number = 0;
//   @Prop() max: number = 100;
//   @Prop() step: number = 1;
//   @Prop() disabled: boolean = false;
//   @Prop() slidercolor: string = '#000000';
//   mwcSlider: any;
//
//   @Method()
//   stepup(amount: number = 1) {
//     const oldValue = this.mwcSlider.getValue();
//     const newValue = oldValue + amount;
//     this.mwcSlider.setValue(newValue);
//     this.change.emit({ oldValue, newValue });
//   }
//
//   @Method()
//   stepdown(amount: number = 1) {
//     const oldValue = this.mwcSlider.getValue();
//     const newValue = oldValue - amount;
//     this.mwcSlider.setValue(newValue);
//     this.change.emit({ oldValue, newValue });
//   }
//
//   componentDidLoad() {
//     this.mwcSlider = new Slider(this.el.querySelector('input'), {
//       value: this.value,
//       min: this.min,
//       max: this.max,
//       step: this.step,
//       enabled: !this.disabled
//     });
//     const sliderSelection: HTMLElement = this.el.querySelector(
//       'div.slider-selection'
//     );
//     sliderSelection.style.background = this.slidercolor;
//     this.mwcSlider.on('change', data => {
//       this.change.emit(data);
//     });
//   }
//
//   render() {
//     return <input type="text" />;
//   }
// }
