import { Component } from '@stencil/core';

@Component({
  tag: 'file-input-page',
})
export class FileInputPage {

  render() {
    return (
      <div class="container">
        <h2>Basic usage</h2>
        <scb-file-input class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">&lt;scb-file-input&gt;&lt;/scb-file-input&gt;</code>

        <h2>Bootstrap styles</h2>
        <scb-file-input type="info" class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">&lt;scb-file-input type="info"&gt;&lt;/scb-file-input&gt;</code>

        <h2>Max length</h2>
        <scb-file-input max-files="3" class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">&lt;scb-file-input max-files="3"&gt;&lt;/scb-file-input&gt;</code>

        <h2>No multiple</h2>
        <scb-file-input max-files="1" class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">&lt;scb-file-input max-files="1"&gt;&lt;/scb-file-input&gt;</code>

        <h2>No drag and drop</h2>
        <scb-file-input nodrop class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">&lt;scb-file-input nodrop&gt;&lt;/scb-file-input&gt;</code>

        <h2>Upload Request Properties</h2>
        <scb-file-input method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
                        form-data-name="file" class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">
          &lt;scb-file-input method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage" form-data-name="file"&gt;&lt;/scb-file-input&gt;
        </code>

        <h2>Custom drop label</h2>
        <scb-file-input class="mb-0">
          <span slot="label">Drop your files here</span>
        </scb-file-input>
        <code class="mb-3 d-block p-3">
          <div>&lt;scb-file-input&gt;</div>
          <div class="ml-2">&lt;span slot="label"&gt;Drop your files here&lt;/span&gt;</div>
          <div>&lt;/scb-file-input&gt;</div>
        </code>

        <h2>Custom button</h2>
        <scb-file-input class="mb-0">
          <button slot="button">Select files</button>
        </scb-file-input>
        <code class="mb-3 d-block p-3">
          <div>&lt;scb-file-input&gt;</div>
          <div class="ml-2">&lt;button slot="button"&gt;Select files&lt;/button&gt;</div>
          <div>&lt;/scb-file-input&gt;</div>
        </code>

        <h2>Setting Restrictions on Files to Upload</h2>
        accept="image/*" maxFileSize="1000000"
        <scb-file-input accept="image/*" max-file-size="1000000" class="mb-0">
          <span slot="label">Drop images(up to 1 MB) here...</span>
        </scb-file-input>
        <code class="mb-3 d-block p-3">
          <div>&lt;scb-file-input accept="image/*" max-file-size="1000000"&gt;</div>
          <div class="ml-2">&lt;span slot="label"&gt;Drop images(up to 1 MB) here...&lt;/span&gt;</div>
          <div>&lt;/scb-file-input&gt;</div>
        </code>

        <h2>Customizing the Upload Request</h2>
        <scb-file-input id="customizingRequestDemo" method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
                        form-data-name="file" class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">
          &lt;scb-file-input id="customizingRequestDemo" method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
          form-data-name="file"&gt;&lt;/scb-file-input&gt;<br/><br/>

          &lt;script&gt;
          <div class="ml-3">
            window.addEventListener('DOMContentLoaded', function() &#123;
            <div class="ml-3">
              var upload = document.querySelector('scb-file-input#customizingRequestDemo');<br/><br/>

              upload.addEventListener('upload-before', function(event) &#123;
              <div class="ml-3">
                console.log('upload xhr before open: ', event.detail.xhr);<br/><br/>

                // Prevent the upload request:<br/>
                // event.preventDefault();<br/><br/>

                var file = event.detail.file;<br/>

                // Custom upload request url for file<br/>
                file.uploadTarget = upload.target + '/' + file.name;<br/><br/>

                // Custom name in the Content-Disposition header<br/>
                file.formDataName = 'attachment';
              </div>
              &#125;);<br/><br/>

              upload.addEventListener('upload-request', function(event) &#123;
              <div class="ml-3">
                console.log('upload xhr after open: ', event.detail.xhr);<br/><br/>

                event.detail.xhr.setRequestHeader('X-File-Name', event.detail.file.name);<br/>
                event.detail.formData.append('documentId', 1234);
              </div>
              &#125;);<br/><br/>

              upload.addEventListener('upload-start', function(event) &#123;
              <div class="ml-3">
                console.log('upload xhr after send: ', event.detail.xhr);
              </div>
              &#125;);
            </div>
            &#125;);
          </div>
          &lt;/script&gt;
        </code>

        <h2>Sending Files Without Wrapping in FormData</h2>
        <scb-file-input id="rawFilesDemo" method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
                        form-data-name="file" class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">
          &lt;scb-file-input id="rawFilesDemo" method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
          form-data-name="file"&gt;&lt;/scb-file-input&gt;<br/><br/>


          &lt;script&gt;
          <div class="ml-3">
            window.addEventListener('DOMContentLoaded', function() &#123;
            <div class="ml-3">
              var upload = document.querySelector('scb-file-input#rawFilesDemo');<br/><br/>

              upload.addEventListener('upload-request', function(event) &#123;
              <div class="ml-3">
                event.preventDefault();<br/>
                event.detail.xhr.send(event.detail.file);
              </div>
              &#125;);
            </div>
            &#125;);
          </div>
          &lt;/script&gt;
        </code>

        <h2>Custom Reaction on Server Response</h2>
        <scb-file-input id="responseDemo" method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
                        form-data-name="file" class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">
          &lt;scb-file-input id="responseDemo" method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
          form-data-name="file"&gt;&lt;/scb-file-input&gt;<br/><br/>


          &lt;script&gt;
          <div class="ml-3">
            window.addEventListener('DOMContentLoaded', function() &#123;
            <div class="ml-3">
              var upload = document.querySelector('scb-file-input#responseDemo');<br/><br/>

              upload.addEventListener('upload-response', function(event) &#123;
              <div class="ml-3">
                console.log('upload xhr after server response: ', event.detail.xhr);<br/>
                event.detail.file.error = 'Custom server error message.';<br/><br/>

                // Interpret any server response as success:<br/>
                // event.detail.xhr.status = 200;
              </div>
              &#125;);
            </div>
            &#125;);
          </div>
          &lt;/script&gt;
        </code>

        <h2>Pre-Filling the File List in Advance</h2>
        <scb-file-input id="preFillDemo" method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
                        accept="application/pdf" form-data-name="file" class="mb-0"></scb-file-input>
        <code class="mb-3 d-block p-3">
          &lt;scb-file-input id="preFillDemo" method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
          accept="application/pdf" form-data-name="file"&gt;&lt;/scb-file-input&gt;<br/><br/>


          &lt;script&gt;
          <div class="ml-3">
            window.addEventListener('DOMContentLoaded', function() &#123;
            <div class="ml-3">
              var upload = document.querySelector('scb-file-input#preFillDemo');<br/><br/>
              upload.files = [
              <div class="ml-3">
                &#123;name: 'Josh_CV.pdf', loadStatus: 100, uploaded: true&#125;,<br/>
                &#123;name: 'Alex_CV.pdf', loadStatus: 100, uploaded: true&#125;
              </div>
              ];
            </div>
            &#125;);
          </div>
          &lt;/script&gt;
        </code>

        <h2>Manual Upload Trigger</h2>
        <scb-file-input id="manualUploadDemo" no-auto method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
                        form-data-name="file" class="mb-0"></scb-file-input>
        <button id="uploadButton">Start Upload(s)</button>
        <code class="mb-3 d-block p-3">
          &lt;scb-file-input id="manualUploadDemo" no-auto method="post" target="https://virtserver.swaggerhub.com/bakirmanar/POST_API/1.0.0/pet/1/uploadImage"
          form-data-name="file"&gt;&lt;/scb-file-input&gt;<br/>
          &lt;button id="uploadButton"&gt;Start Upload&lt;/button&gt;<br/><br/>

          &lt;script&gt;
          <div class="ml-3">
            window.addEventListener('DOMContentLoaded', function() &#123;
            <div class="ml-3">
              var upload = document.querySelector('scb-file-input#manualUploadDemo');<br/>
              var uploadButton = document.getElementById('uploadButton');<br/><br/>

              uploadButton.addEventListener('click', function() &#123;
              <div class="ml-3">
                upload.uploadFiles();
              </div>
              &#125;);
            </div>
            &#125;);
          </div>
          &lt;/script&gt;
        </code>
      </div>
    );
  }

  componentDidLoad () {
    this.initCustomizingRequestDemo();
    this.initRawFilesDemo();
    this.initPreFillDemo();
    this.initManualUploadDemo();
    this.initResponseDemo();
  }

  private addScript (selector, script) {
    let scriptElem = document.createElement('script');
    let elem = document.querySelector(selector);

    scriptElem.innerHTML = script;
    elem.parentNode.appendChild(scriptElem);
  }

  private initCustomizingRequestDemo () {
    let script = 'var upload = document.querySelector(\'scb-file-input#customizingRequestDemo\');\n' +
      '\n' +
      '    upload.addEventListener(\'upload-before\', function(event) {\n' +
      '      console.log(\'upload xhr before open: \', event.detail.xhr);\n' +
      '\n' +
      '      // Prevent the upload request:\n' +
      '      // event.preventDefault();\n' +
      '\n' +
      '      var file = event.detail.file;\n' +
      '\n' +
      '      // Custom upload request url for file\n' +
      '      file.uploadTarget = upload.target + \'/\' + file.name;\n' +
      '\n' +
      '      // Custom name in the Content-Disposition header\n' +
      '      file.formDataName = \'attachment\';\n' +
      '    });\n' +
      '\n' +
      '    upload.addEventListener(\'upload-request\', function(event) {\n' +
      '      console.log(\'upload xhr after open: \', event.detail.xhr);\n' +
      '\n' +
      '      event.detail.xhr.setRequestHeader(\'X-File-Name\', event.detail.file.name);\n' +
      '      event.detail.formData.append(\'documentId\', 1234);\n' +
      '    });\n' +
      '\n' +
      '    upload.addEventListener(\'upload-start\', function(event) {\n' +
      '      console.log(\'upload xhr after send: \', event.detail.xhr);\n' +
      '    });';

    this.addScript('scb-file-input#customizingRequestDemo', script);

  }

  private initRawFilesDemo () {
    let script =
      '              var upload = document.querySelector(\'scb-file-input#rawFilesDemo\');\n' +
      '  \n' +
      '              upload.addEventListener(\'upload-request\', function(event) {\n' +
      '                event.preventDefault();\n' +
      '                event.detail.xhr.send(event.detail.file);\n' +
      '              });\n';

    this.addScript('scb-file-input#rawFilesDemo', script);
  }

  private initPreFillDemo () {
    let script = 'var upload = document.querySelector(\'scb-file-input#preFillDemo\');\n' +
      '    upload.files = [\n' +
      '      {name: \'Josh_CV.pdf\', loadStatus: 100, uploaded: true},\n' +
      '      {name: \'Alex_CV.pdf\', loadStatus: 100, uploaded: true}\n' +
      '    ];';

    this.addScript('scb-file-input#preFillDemo', script);
  }

  private initManualUploadDemo () {
    let script = 'var manualUploadDemo = document.querySelector(\'scb-file-input#manualUploadDemo\');\n' +
      '           var uploadButton = document.getElementById(\'uploadButton\');\n' +
      '\n' +
      '           uploadButton.addEventListener(\'click\', function() {\n' +
      '             manualUploadDemo.uploadFiles();\n' +
      '           });';

    this.addScript('scb-file-input#manualUploadDemo', script);
  }

  private initResponseDemo () {
    let script = 'var upload = document.querySelector(\'scb-file-input#responseDemo\');\n' +
      '\n' +
      '              upload.addEventListener(\'upload-response\', function(event) {\n' +
      '                console.log(\'upload xhr after server response: \', event.detail.xhr);\n' +
      '                event.detail.file.error = \'Custom server error message.\';\n' +
      '\n' +
      '                // Interpret any server response as success:\n' +
      '                // event.detail.xhr.status = 200;\n' +
      '              });';

    this.addScript('scb-file-input#responseDemo', script);
  }
}
