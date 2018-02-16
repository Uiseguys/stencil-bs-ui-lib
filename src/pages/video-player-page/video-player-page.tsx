import { Component } from '@stencil/core';

@Component({
  tag: 'video-player-page',
})
export class VideoPlayerPage {


  render() {
    return [
      <div>
        <h2>Video Player</h2>
        <div>
          <fcl-video-player poster="http://images.telvi.de/images/originals/2017/50/1/319b47392316aa2c54d5fbab.jpg">
            <source src="http://techslides.com/demos/sample-videos/small.mp4" type='video/mp4' />
          </fcl-video-player>

          <section class="box top">
            <div class="ntitle">Summary</div>
            <marked-element><p>Element providing a wrapper around the Video.js HTML5 video library</p>
              <h5 id="example">Example</h5>
              <pre>
                <code>
                  &lt;fcl-video-player controls preload=<span class="hljs-string">"auto"</span> width=<span class="hljs-string">"640"</span> height=<span class="hljs-string">"264"</span> poster=<span class="hljs-string">"oceans-clip.png"</span>&gt;
                  &lt;source src=<span class="hljs-string">"oceans-clip.mp4"</span> <span class="hljs-class"><span class="hljs-keyword">type</span>=</span><span class="hljs-string">'video/mp4'</span> /&gt;
                  &lt;source src=<span class="hljs-string">"oceans-clip.webm"</span> <span class="hljs-class"><span class="hljs-keyword">type</span>=</span><span class="hljs-string">'video/webm'</span> /&gt;
                  &lt;source src=<span class="hljs-string">"oceans-clip.ogv"</span> <span class="hljs-class"><span class="hljs-keyword">type</span>=</span><span class="hljs-string">'video/ogg'</span> /&gt;
                  &lt;/fcl-video-player&gt;
                </code>
              </pre></marked-element>
          </section>

          <section class="box attribute-box">
            <div>Attributes</div>
            <div class="details">
              <div class="details-name">
                <p><code>width</code></p>
              </div>
              <div class="details-info">
                <p><code>integer</code></p>
                  <marked-element><p>The <code>width</code> attribute specifies the width of a video player, in pixels</p>
                </marked-element>
              </div>
            </div>

            <div class="details">
              <div class="details-name">
                <p><code>height</code></p>
              </div>
              <div class="details-info">
                <p><code>integer</code></p>
                <marked-element><p>The <code>height</code> attribute specifies the height of a video player, in pixels</p>
                </marked-element>
              </div>
            </div>

            <div class="details">
              <div class="details-name">
                <p><code>preload</code></p>
              </div>
              <div class="details-info">
                <p><code>string</code></p>
                <marked-element><p>The <code>preload</code> attribute specifies if/how the video should be loaded</p>
                </marked-element>
              </div>
            </div>

            <div class="details">
              <div class="details-name">
                <p><code>poster</code></p>
              </div>
              <div class="details-info">
                <p><code>string</code></p>
                <marked-element><p>The <code>poster</code> attribute specifies an image shown while downloading</p>
                </marked-element>
              </div>
            </div>

          </section>


        </div>

      </div>,
    ];
  }

}
