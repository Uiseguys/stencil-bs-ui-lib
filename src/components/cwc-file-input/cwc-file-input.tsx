import {
    Component,
    Element,
    // Listen,
    Prop,
    State,
} from '@stencil/core';
import { BootstrapThemeColor } from '../../common/index';

@Component({
    tag: 'cwc-file-input',
    styleUrls: ['./cwc-file-input.scss', './circular-progress.scss'],
})
export class ScbFileInput {
    @Element() el: HTMLElement;
    @Prop() files: any[] = [];
    @Prop() type: BootstrapThemeColor = 'primary';
    @Prop() maxFiles = 1;
    @Prop() nodrop = false;
    @Prop() noAuto = false;
    @Prop() accept: string;
    @Prop() maxFileSize = 0;
    @Prop() method: string;
    @Prop() target: string;
    @Prop() timeout: number;
    @Prop() headers: string;
    @Prop() formDataName: string;
    @State()
    private element;

    componentWillLoad() {
        this.element = this.el;
        const that = this;
        this.element.uploadFiles = () => {
            that.uploadFiles();
        };
    }

    componentDidLoad() {
        const dropArea = this.el.querySelector('.scb-fi-wrapper');

        dropArea.addEventListener('dragenter', this.preventDefaults, false);
        dropArea.addEventListener('dragleave', this.preventDefaults, false);
        dropArea.addEventListener('dragover', this.preventDefaults, false);
        dropArea.addEventListener('drop', this.onDrop.bind(this), false);
    }

    private preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();      
    }

    /**
     * Fire hidden input click event on Button click
     */
    openFileInput(): void {
        const hiddenInput: HTMLElement = this.el.getElementsByClassName('scb-fi-hidden')[0] as HTMLElement;
        hiddenInput.click();
    }

    /**
     * Remove the file from files list and aborting all pending actions about it
     * @param {number} index - index of a file in a list
     */
    removeFile(index: number): void {
        const files = this.element.files;
        const file = files[index];

        if (file.reading) {
            file.fileReader.abort();
        }

        if (file.uploading) {
            file.xhr.abort();
        }

        files.splice(index, 1);
        this.element.files = [];
        setTimeout(() => this.element.files = [...files]);

        if (!files.length) {
            this.initUploadStyle();
        }

        // console.log(this.cancelDefaultDragEnter);
        // console.log(this.cancelDefaultDragOver);
        // console.log(this.onDrop);
    }

    /**
     * Retry the upload action for a single file
     * @param {number} index - index of a file in a list
     */
    retryUpload(index: number): void {
        const file = this.element.files[index];

        if (this.isLoadingAborted) {
            this.uploadFile(file);
        }
    }

    /**
     * Manually upload files
     */
    uploadFiles(): void {
        this.files.forEach(file => file.isRead && this.uploadFile(file));
    }

    /**
     * Check if loading of a file was aborted
     * @param {Object} file - file object
     * @returns {boolean}
     */
    private isLoadingAborted(file): boolean {
        return (Boolean)(file.uploadEnded && file.loadStatus !== 100);
    }

    // @Listen('dragenter')
    // /**
    //  * Cancel default Drag Enter event
    //  * @param {Object} event - dragenter event
    //  * @returns {boolean}
    //  */
    // private cancelDefaultDragEnter(event): boolean {
    //     console.log(event);
    //     event.preventDefault();
    //     return false;
    // }

    // @Listen('dragover')
    // /**
    //  * Cancel default Drag Over event
    //  * @param {Object} event - dragover event
    //  * @returns {boolean}
    //  */
    // private cancelDefaultDragOver(event): boolean {
    //     console.log(event);
    //     event.preventDefault();
    //     return false;
    // }

    // @Listen('drop')
    /**
     * Trigger addFiles function on drop event
     * @param {Object} event - drop event
     * @returns {boolean}
     */
    private onDrop(e): boolean { 
        this.preventDefaults(e);
        if (!this.nodrop) {
            const dt = e.dataTransfer;
            this.addFiles(dt.files);
        }

        return false;
    }

    /**
     * Handle the file select event
     * @param {Object} event - Files select event
     */
    private onFileSelect(event): void {
        this.addFiles(event.target.files);
        event.target.value = '';
    }

    /**
     * Validate, add files to files list and read them
     * @param {Array} files
     */
    private addFiles(files): void {
        this.initProgress();
        const diff = this.maxFiles - this.element.files.length;

        if (files.length > 0 && (this.maxFiles === 0 || diff > 0)) {
            const lastSelectedFiles = this.element.files;
            const filesArray = [];

            this.element.files = [];
            for (const item of files) {
                if (this.isAcceptedFileType(item) && this.isPassedFileSize(item)) {
                    filesArray.push(item);
                }
            }
            if (this.maxFiles > 0 && filesArray.length > diff) {
                filesArray.length = diff;
            }
            filesArray.forEach((file, i) => {
                file.elemId = 'file' + i + Date.now();
            });
            setTimeout(() => this.element.files = [...lastSelectedFiles, ...filesArray]);
            filesArray.forEach(file => this.readFile(file));
        }
    }

    private initProgress() {
        const dropAreaEl: HTMLElement = this.el.querySelector('.scb-drop-area');
        dropAreaEl.classList.add('loading');
        const progressEl = this.el.querySelector('.progress-circle');
        progressEl.classList.remove('no-loading');
        const fileButtonEl = this.el.querySelector('.scb-fi-button-wrapper');
        fileButtonEl.classList.add('loading');
        const labelEl = this.el.querySelector('.scb-fi-label');
        labelEl.classList.add('loading');
    }

    private initUploadStyle() {
        const progressEl = this.el.querySelector('.progress-circle');
        progressEl.classList.add('no-loading');        
        progressEl.querySelector('img.img-checked').classList.add('in-progress');        
        const dropAreaEl: HTMLElement = this.el.querySelector('.scb-drop-area');
        dropAreaEl.classList.remove('loading');
        const fileButtonEl = this.el.querySelector('.scb-fi-button-wrapper');
        fileButtonEl.classList.remove('loading');
        const labelEl = this.el.querySelector('.scb-fi-label');
        labelEl.classList.remove('loading');
    }
   

    /**
     * Check if file is accepted type
     * @param {Object} file
     * @returns {boolean}
     */
    private isAcceptedFileType(file): boolean {
        if (!this.accept) {
            return true;
        }

        const fileName = file.name.match(/\.[^\.]*$|$/)[0];
        const template = new RegExp('^(' + this.accept.replace(/[, ]+/g, '|').replace(/\/\*/g, '/.*') + ')$', 'i');

        return template.test(file.type) || template.test(fileName);
    }

    /**
     * Check if file is accepted size
     * @param {Object} file
     * @returns {boolean}
     */
    private isPassedFileSize(file): boolean {
        return !this.maxFileSize || file.size <= this.maxFileSize;
    }

    /**
     * Change the Retry button state
     * @param {Object} file
     */
    private toggleRetryBtn(file): void {
        const retryBtn = this.el.querySelector('#' + file.elemId + ' .scb-fi-retry-btn') as HTMLElement;
        const isAborted = this.isLoadingAborted(file);

        if (retryBtn) {
            retryBtn.classList.toggle('d-inline-block', isAborted);
        }
    }

    /**
     * Read file after add
     * @param {Object} file
     */
    private readFile(file): void {
        const reader = new FileReader();
        const isRequestDataPresent = this.method && this.target && this.formDataName;
        this.changeFileUploadProgress(file, 0, 'Start reading');

        reader.onprogress = (e) => {
            const percentage = Math.round(e.loaded / e.total * 100);
            this.changeFileUploadProgress(file, percentage, 'Reading');
        };
        reader.onloadend = () => {
            this.toggleRetryBtn(file);
        };
        reader.onload = () => {
            file.reading = false;
            file.isRead = true;
            this.changeFileUploadProgress(file, 100, isRequestDataPresent ? 'Queued' : '');
            if (isRequestDataPresent && !this.noAuto) {
                this.uploadFile(file);
            }
        };

        file.reading = true;
        reader.readAsDataURL(file);
        file.fileReader = reader;
    }

    /**
     * Upload file after read or retry button click
     * @param {Object} file
     */
    uploadFile(file): void {
        if (!file.uploading) {
            const request = new XMLHttpRequest;
            let stalledTimeout;

            file.xhr = request;
            request.upload.onprogress = (e) => {
                clearTimeout(stalledTimeout);
                const loaded = e.loaded;
                const total = e.total;
                const progress = Math.round(100 * (loaded / total));
                file.loaded = loaded;
                file.indeterminate = 0 >= loaded || loaded >= total;

                if (file.error) {
                    file.status = '';
                    file.indeterminate = undefined;
                } else if (!file.abort) {
                    if (100 > progress) {
                        stalledTimeout = setTimeout(() => {
                            this.changeFileUploadProgress(file, progress, 'Stalled');
                        }, 2000);
                    } else {
                        file.uploading = false;
                    }

                    this.changeFileUploadProgress(file, progress, 'Uploading');

                    this.el.dispatchEvent(new CustomEvent('upload-progress', {
                        detail: {
                            file: file,
                            xhr: request,
                        },
                    }));
                }
            };

            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    clearTimeout(stalledTimeout);
                    file.indeterminate = file.uploading = false;
                    if (file.abort) {
                        this.changeFileUploadProgress(file, file.loadStatus, 'Aborted');
                    } else {
                        const uploadResponseNotCanceled = this.el.dispatchEvent(new CustomEvent('upload-response', {
                            detail: {
                                file: file,
                                xhr: request,
                            },
                            cancelable: true,
                        }));
                        if (!uploadResponseNotCanceled) {
                            return;
                        }
                        if (request.status === 0) {
                            file.error = 'Server unavailable';
                        } else if (request.status >= 500) {
                            file.error = 'Unexpected server error';
                        } else if (request.status >= 400) {
                            file.error = 'Forbidden';
                        }
                        file.complete = false;
                        this.el.dispatchEvent(new CustomEvent('upload-' + (file.error ? 'error' : 'success'), {
                            detail: {
                                file: file,
                                xhr: request,
                            },
                        }));
                        const loadedPercentage = file.error ? file.loadStatus : 100;
                        const uploadStatus = file.error ? ('Error: ' + file.error) : '';
                        this.changeFileUploadProgress(file, loadedPercentage, uploadStatus);
                        file.uploadEnded = true;
                        file.uploaded = !file.error;
                    }
                }
            };

            request.upload.onloadstart = () => {
                this.el.dispatchEvent(new CustomEvent('upload-start', {
                    detail: {
                        file: file,
                        xhr: request,
                    },
                }));
            };

            request.upload.onloadend = () => {
                file.uploadEnded = true;
                this.toggleRetryBtn(file);
            };

            const uploadBeforeNotCanceled = this.el.dispatchEvent(new CustomEvent('upload-before', {
                detail: {
                    file: file,
                    xhr: request,
                },
                cancelable: true,
            }));
            if (!uploadBeforeNotCanceled) {
                return;
            }

            const formData = new FormData;
            file.uploadTarget = this.target || '';
            file.formDataName = this.formDataName;
            this.changeFileUploadProgress(file, 0, 'Start uploading');
            formData.append(file.formDataName, file, file.name);
            request.open(this.method, file.uploadTarget, true);
            this.configureXhr(request);

            file.indeterminate = true;
            file.uploading = true;
            file.uploadEnded = false;
            file.complete = file.abort = file.error = file.held = false;

            const uploadRequestNotCanceled = this.el.dispatchEvent(new CustomEvent('upload-request', {
                detail: {
                    file: file,
                    xhr: request,
                    formData: formData,
                },
                cancelable: true,
            }));

            if (uploadRequestNotCanceled) {
                request.send(formData);
            }
        }
    }

    /**
     * Setup the XHR Request
     * @param {Object} request - upload request
     */
    private configureXhr(request) {
        let headers: object;
        if (typeof this.headers === 'string') {
            try {
                headers = JSON.parse(this.headers.replace(new RegExp('\'', 'g'), '\"'));
            } catch (error) {
                headers = undefined;
            }
        }
        for (const header in headers) {
            if (header) {
                request.setRequestHeader(header, headers[header]);
            }
        }

        if (this.timeout) {
            request.timeout = this.timeout
        }
    }

    /**
     * Show the upload progress of a file
     * @param {Object} file
     * @param {number} loadedPercentage
     * @param {string} status
     */
    private changeFileUploadProgress(file, loadedPercentage: number, status: string) {
        const isCircularProgres = true;

        if (isCircularProgres) {
            const progressEl: HTMLElement = this.el.querySelector('.progress-circle');
            progressEl.dataset.percentage = String(loadedPercentage);
            const detailEl: HTMLElement = progressEl.querySelector('.current-percentage');
            detailEl.innerHTML = loadedPercentage + ' %';
            if ( loadedPercentage === 100 ) {
                setTimeout(() => {
                    progressEl.dataset.percentage = '0';
                    detailEl.innerHTML = '';
                    const imgCheckedEl = progressEl.querySelector('img.img-checked.in-progress');
                    if (imgCheckedEl) {
                        imgCheckedEl.classList.remove('in-progress');
                    }
                }, 3000); 
            }
        } else {
            const prBar = this.el.querySelector('#' + file.elemId + ' .progress-bar') as HTMLElement;
            const statusBar = this.el.querySelector('#' + file.elemId + ' .scb-fi-status') as HTMLElement;
    
            file.loadStatus = loadedPercentage;
            file.status = status;
            if (prBar) {
                prBar.style.width = loadedPercentage + '%'
            }
    
            if (statusBar) {
                statusBar.innerHTML = file.status || ''
            }
        }

    }

    /**
     * Render view based on the component data
     * @returns view of the component
     */
    render() {
        const buttonClasses = {
            'scb-fi-default-button': true,
            btn: true,
            [`btn-${this.type}`]: true,
            'btn-lg': true,
        };
        const isMultiple = this.maxFiles !== 1;
        const buttonText: string = isMultiple ? 'Choose Files' : 'Choose File';
        const dropLabel: string = isMultiple ? 'Drag files to upload, or' : 'Drag file to upload, or';
        const label = this.nodrop ? '' : <span class="scb-fi-label">
        <slot name="label"></slot>
        <span class="scb-fi-default-label">{dropLabel}</span>
      </span>;
        const buttonAttrs: object = {};
        const inputAttrs: object = {};

        if (this.maxFiles > 0 && this.maxFiles <= this.element.files.length) {
            buttonAttrs['disabled'] = 'disabled';
        }
        if (isMultiple) {
            inputAttrs['multiple'] = true;
        }
        if (this.accept) {
            inputAttrs['accept'] = this.accept;
        }

        /*
         * Using the <fieldset> tag for having an ability to disable the custom button in <slot> that can't have disabled attribute set.
         */
        return (
            <div class="scb-fi-wrapper">
                <input class="scb-fi-hidden" type="file" onChange={() => this.onFileSelect(event)} {...inputAttrs}/>
                <div class="progress-circle no-loading" data-percentage="0">
                    <span class="progress-left">
                        <span class="progress-bar"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar"></span>
                    </span>
                    <div class="progress-value">
                        <div>
                            <div class="current-percentage"></div>
                            <img class="img-checked in-progress" src="assets/img/si-glyph-checked.svg"/>                            
                        </div>
                    </div>
                </div>             
                <div class="scb-drop-area">
                    <img class="img-arrow" src="assets/img/si-glyph-arrow-thick-up.svg"/>
                </div>
                <fieldset class="scb-fi-button-wrapper" onClick={() => this.openFileInput()} {...buttonAttrs}>
                    <slot name="button"></slot>
                    <button class={buttonClasses}>{buttonText}</button>
                </fieldset>
                {label}
                {this.files.map((file, i) =>
                    <div class="scb-fi-row with-progress-circle" id={file.elemId}>
                        <div class="scb-fi-row-header">
                            <span class="scb-fi-name">{file.name}</span>
                            <div class="scb-fi-controls">
                                <button class={{
                                    'scb-fi-icon-btn': true,
                                    'scb-fi-retry-btn': true,
                                    'd-inline-block': this.isLoadingAborted(file),
                                }} onClick={() => this.retryUpload(i)}>
                                    <span class="scb-icon icon-reload"></span>
                                </button>
                                <button class="scb-fi-icon-btn close" onClick={() => this.removeFile(i)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div class="scb-fi-status">{file.status}</div>
                        <div class="progress" style={{display: 'none'}}>
                            <div class={{
                                'progress-bar': true,
                                [`bg-${this.type}`]: true,
                            }} style={{width: file.loadStatus + '%'}} role="progressbar" aria-valuenow="0"
                                 aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>,
                )}
            </div>
        );
    }
}