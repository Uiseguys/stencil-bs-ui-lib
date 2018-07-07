import { Component } from "@stencil/core"


 
@Component({
  tag: "resolution-info-page",
  styleUrl: "resolution-info-page.scss"
})
export class ResolutionInfoPage {
  render() {
    return [
      <div class="container pt-4">
        <h2 class="mb-4">Resolution Info component </h2>
        <div class="row">
          <div class="col-lg-12">
            <div class="jumbotron pt-3">
              <div class="row">
                <div class="col-lg-12" >

                <h3>Overview</h3>
                <p>
                    This component indicates resolution ratio and resolution abbreviation based on given <code>`@Prop() width: number`</code> and <code>`@Prop() height: number`</code>.
                </p>
              </div>
                <div class="col-lg-12">

                <h3>Usage</h3>
                <p>
                   Usage is quite simple: 
                </p>
                <p>
                &lt;cwc-resolution-info width=&#123;4096&#125; height=&#123;2160&#125; &#x2F;&gt;
                </p>
                <p>
                  output: 
                <cwc-resolution-info width={4096} height={2160} />
                </p>
                <br/>
                <h5>
                  Other input/output pairs: 
                </h5>
                <p>2560x1440:</p>
                <cwc-resolution-info width={2560} height={1440} />
                <br />
                <p>2048x1080:</p>
                <cwc-resolution-info width={2048} height={1080} />

                <br />
                <p>204x204:</p>
                <cwc-resolution-info width={204} height={204} />
                <br />
                <p>960x540:</p>
                <cwc-resolution-info width={960} height={540} />
                <br />
                <p>4096x540:</p>
                <cwc-resolution-info width={4096} height={540} />
                <p>1280x720:</p>
                <cwc-resolution-info width={1280} height={720} />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    ];
  }
}
