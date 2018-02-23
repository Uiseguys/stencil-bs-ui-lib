import videojs from 'video.js';
import initThumbnail from '@divsbhalala/video-js-thumbnails';

/*

 ##### Example
 <fcl-video-player poster="oceans-clip.png">
 <source src="oceans-clip.mp4" type='video/mp4' />
 <source src="oceans-clip.webm" type='video/webm' />
 <source src="oceans-clip.ogv" type='video/ogg' />
 </fcl-video-player>

 @element fcl-video-player
 @blurb Element providing a wrapper around the Video.js HTML5 video library
 @status alpha

 */


import {
    Component,
    Element,
    HostElement,
    Prop, State
} from '@stencil/core';


@Component({
    tag: 'fcl-video-player',
    styleUrl: './css/vjs.scss'
})
export class FclVideoPLayer {
    @Element() el: HostElement;

    @Prop() poster: string = null;
    @Prop() thumbnail: any = null;
    @Prop() controls = true;

    autoPlay = false;

    @State() toggle: boolean = false;

    // When clicked invert the state of the toggle property
    toggleClick() {
        this.toggle = true;
        this.autoPlay = true;

        this.el.querySelector("fcl-image").style.display = 'none';
        this.el.querySelector("video").style.display = 'block';

    }

    constructor() {
        initThumbnail();
    }

    render() {

        if (this.poster != null && this.toggle === false) {

            return (
                <div class="fcl-video-class">

                    <fcl-image class="video-img-block"
                               onClick={() => this.toggleClick()}
                               brokenUrl="assets/img/broken-image.png" src={this.poster}></fcl-image>

                    <video class="video-js vjs-default-skin">
                        <slot></slot>
                    </video>

                </div>

            );

        } else {

            if (this.poster != null) {

                this.el.getElementsByTagName('video')[0].play();
            }

            return (
                <div class="fcl-video-class">

                    <video class="video-js vjs-default-skin">
                        <slot></slot>
                    </video>

                </div>

            );

        }

    }

    componentDidLoad() {

        if (this.poster == null) {
            this.autoPlay = false;
            this.el.querySelector("video").style.display = 'block';
        } else {
            this.el.querySelector("video").style.display = 'block';
        }
        const options: videojs.PlayerOptions = {
            controls: true,
            autoplay: this.autoPlay,
            preload: 'metadata'
        };

        videojs(this.el.getElementsByTagName('video')[0], options);
        if (this.thumbnail) {
            const video = this.el.getElementsByTagName('video')[0];
            initThumbnail(this.thumbnail, this.el.getElementsByTagName('video')[0]);
        }

    }

    componentWillUpdate() {

        if (this.poster == null) {
            this.autoPlay = false;
        }

        const options: videojs.PlayerOptions = {
            controls: true,
            autoplay: this.autoPlay,
            preload: 'metadata'
        };

        videojs(this.el.getElementsByTagName('video')[0], options);

    }

}
