import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'cwc-resolution-info',
    styleUrl: 'cwc-resolution-info.scss'
})
export class ResolutionInfo {

    @Prop() width: number;
    @Prop() height: number;
    @State() ratio: number;

    /*
    Greater than 2560x1440 up to 4096x2160 -> UHD
    Greater than 2048x1080 up to 2560x1440 -> QHD
    Greater than 1152x648 up to 2048x1080 -> HD
    Greater than 896x504 up to 1152x648 -> SD
    896x504 or less -> WEB

    value 0.9 to 1.1 -> 1:1

    value 1.3 to 1.4 -> 4:3

    value 1.5 to 1.9 -> 16:9

    value over 2 -> cinema
    */

    data = {
        uhd: {
            w: 4096,
            h: 2160
        },
        qhd: {
            w: 2560,
            h: 1440
        },
        hd: { 
            w: 2048,
            h: 1080
        },
        sd: {
            w: 1152,
            h: 648
        },
        web: {
            w: 896,
            h: 504
        }, 

    }

    getRatio() {
        return this.width / this.height
    }

    render() {

        let resolutionTemplate,
            ratioTemplate;

      if (this.height <= this.data.uhd.h && this.width <= this.data.uhd.w 
          && this.width > this.data.qhd.w && this.height > this.data.qhd.h ) {
            resolutionTemplate = <span class="text-center resolution res-uhd">uhd</span>
            
        } else if (this.width <= this.data.qhd.w && this.height <= this.data.qhd.h 
                   && this.width > this.data.hd.w && this.height > this.data.hd.h ) {
            resolutionTemplate = <span class="text-center resolution res-qhd">qhd</span>
            
        } else if (this.width <= this.data.hd.w && this.height <= this.data.hd.h
                   && this.width > this.data.sd.w && this.height > this.data.sd.h ) {
            resolutionTemplate = <span class="text-center resolution res-hd">hd</span>
            
        } else if (this.width <= this.data.sd.w && this.height <= this.data.sd.h
                   && this.width > this.data.web.w && this.height > this.data.web.h ) {
            resolutionTemplate = <span class="text-center resolution res-sd">sd</span>
        } else if (this.width < this.data.sd.w && this.height < this.data.sd.h ) {
            resolutionTemplate = <span class="text-center resolution res-web">web</span> 
        } 

        
        const ratio = this.getRatio()

        if (ratio > 2 ) {
            ratioTemplate = <span class="text-center ratio ratio-cinema">cinema</span>  
        } else if (ratio >= 1.5 && ratio <= 1.9) {
            ratioTemplate = <span class="text-center ratio ratio-16-to-9">16:9</span> 
        } else if (ratio >= 1.3 && ratio <= 1.4) {
            ratioTemplate = <span class="text-center ratio ratio-4-to-3">4:3</span> 
        } else if (ratio >= 0.9 && ratio <= 1.1) {
            ratioTemplate = <span class="text-center ratio ratio-1-to-1">1:1</span> 
        } 

        
        

        return (
            <div class="wrapper card m-1">
                { resolutionTemplate }
                { ratioTemplate }
            </div>
        )
        
    }
}
