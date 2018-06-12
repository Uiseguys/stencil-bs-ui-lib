import videojs from 'video.js';
import initThumbnail from './video-thumbnail';

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
function makeid() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

import { Component, Element, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'fcl-video-player',
  styleUrl: './css/vjs.scss'
})
export class FclVideoPLayer {
  @Element() el: HTMLElement;

  @Prop() className: string = ' video' + makeid();
  @Prop() poster: string = null;
  @Prop() theme: string = null;
  @Prop() thumbnail: any = null;
  @Prop() controls = true;
  @Prop() autoinit: boolean = true;
  autoPlay = false;

  @State() toggle: boolean = false;
  @State() isautoinit: boolean = false;

  @Watch('isautoinit')
  validateName(newValue: string, oldValue: string) {
    console.log(newValue, oldValue);
  }

  // When clicked invert the state of the toggle property
  toggleClick() {
    if (this.isautoinit === false) {
      this.isautoinit = true;
    }
    this.toggle = true;
    this.autoPlay = true;

    this.el.querySelector('fcl-image').style.display = 'none';
    this.el.querySelector('video').style.display = 'block';
  }

  constructor() {
    initThumbnail();
  }
  getClassList(): string {
    let classList = this.theme || 'default';
    if (this.isautoinit && this.autoPlay) {
      classList += ' ' + this.className;
    }
    return classList;
  }

  render() {
    if (this.poster != null && this.toggle === false) {
      return (
        <div class={'fcl-video-class theme-' + this.getClassList()}>
          <fcl-image
            class="video-img-block"
            onClick={() => this.toggleClick()}
            brokenUrl="assets/img/broken-image.png"
            src={this.poster}
          />
          <div
            class={
              'video-js custom-btn ' +
              (this.autoPlay && this.isautoinit ? 'hide' : '')
            }
            onClick={() => this.toggleClick()}
          >
            <button
              class="vjs-big-play-button custom"
              type="button"
              aria-live="polite"
              title="Play Video"
              aria-disabled="false"
            >
              <span aria-hidden="true" class="vjs-icon-placeholder" />
              <span class="vjs-control-text">Play Video</span>
            </button>
          </div>
          <video class="video-js vjs-default-skin">
            <slot />
          </video>
        </div>
      );
    } else {
      if (this.poster != null && this.isautoinit) {
        // this.el.getElementsByTagName('video')[0].play();
      }

      return (
        <div class={'fcl-video-class theme-' + this.getClassList()}>
          <video class="video-js vjs-default-skin">
            <slot />
          </video>
        </div>
      );
    }
  }

  componentDidLoad() {
    let self = this;
    this.isautoinit = this.autoinit;
    if (this.poster == null) {
      this.autoPlay = false;
      this.el.querySelector('video').style.display = 'block';
    } else {
      this.el.querySelector('video').style.display = 'block';
    }
    const options: videojs.PlayerOptions = {
      controls: true,
      autoplay: this.autoPlay || this.isautoinit,
      preload: 'metadata'
    };
    if (this.isautoinit) {
      let player = videojs(this.el.getElementsByTagName('video')[0], options);
      player.on('play', function() {
        if (self.el.querySelector('fcl-image')) {
          self.el.querySelector('fcl-image').style.display = 'none';
        }
        if (self.el.querySelector('video')) {
          self.el.querySelector('video').style.display = 'block';
        }
      });
      const video = this.el.getElementsByTagName('video')[0];
      if (this.thumbnail) {
        initThumbnail(this.thumbnail, video);
      }
    }
  }

  componentWillUpdate() {
    let self = this;
    if (this.poster == null) {
      this.autoPlay = false;
    }
    if (this.isautoinit) {
      const options: videojs.PlayerOptions = {
        controls: true,
        autoplay: this.autoPlay || this.isautoinit,
        preload: 'metadata'
      };

      let player = videojs(this.el.getElementsByTagName('video')[0], options);
      if (this.isautoinit && this.autoPlay && player) {
        player.play();
      }
      player.on('play', function() {
        if (self.el.querySelector('fcl-image')) {
          self.el.querySelector('fcl-image').style.display = 'none';
        }
        if (self.el.querySelector('video')) {
          self.el.querySelector('video').style.display = 'block';
        }
      });
    }
  }
}
