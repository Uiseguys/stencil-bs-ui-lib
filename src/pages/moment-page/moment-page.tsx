// import { Component } from '@stencil/core';
//
// @Component({
//     tag: 'moment-page',
// })
// export class MomentPage {
//     render() {
//         return (
//             <div class="container pt-4">
//                 <h2 class="mb-4">Moment component </h2>
//                 <div class="row">
//                     <div class="col-lg-12">
//                         <div class="jumbotron pt-3">
//                             <div class="row">
//                                 <div class="col-lg-4">
//                                     <div class="row">
//                                         <div class="col-lg-12">
//                                             <h3>Usage </h3>
//                                             <div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <br />
//                                     <div class="row">
//                                         <div class="col-lg-12">
//                                             <pre><code class="lang-tsx">
//                                                 <span>&lt;cwc-moment</span><br />
//                                                 <span class="hljs-built_in ml-4">date="2016-01-10 14:30"</span><br />
//                                                 <span class="hljs-built_in ml-4">format="L"</span><span>&gt;</span>
//                                                 <br />
//                                                 <span>&lt;/cwc-moment&gt;</span>
//                                             </code></pre>
//
//                                             outputs: <cwc-moment date="2016-01-10 14:30" format="L"></cwc-moment>
//                                             <br />
//                                             <pre><code class="lang-tsx">
//                                                 <span>&lt;cwc-moment</span><br />
//                                                 <span class="hljs-built_in ml-4">duration="123412341234123"</span><br />
//                                                 <span class="hljs-built_in ml-4">unit="seconds"</span><span>&gt;</span>
//                                                 <br />
//                                                 <span>&lt;/cwc-moment&gt;</span>
//                                             </code></pre>
//
//                                             outputs: <cwc-moment duration="123412341234123" unit="seconds"></cwc-moment>
//                                             <br />
//                                             <pre><code class="lang-tsx">
//                                                 <span>&lt;cwc-moment</span><br />
//                                                 <span class="hljs-built_in ml-4">date="2018-04-09 14:30"</span><br />
//                                                 <span class="hljs-built_in ml-4">diff=&#123;true&#125;</span><br />
//                                                 <span class="hljs-built_in ml-4">humanize=&#123;true&#125;</span><span>&gt;</span>
//                                                 <br />
//                                                 <span>&lt;/cwc-moment&gt;</span>
//                                             </code></pre>
//                                             outputs: <cwc-moment date="2018-04-09 14:30" diff={true} humanize={true}></cwc-moment>
//                                             <br />
//                                             <pre><code class="lang-tsx">
//                                                 <span>&lt;cwc-moment</span><br />
//                                                 <span class="hljs-built_in ml-4">date="2018-04-10 14:45"</span><br />
//                                                 <span class="hljs-built_in ml-4">diff=&#123;true&#125;</span><br />
//                                                 <span class="hljs-built_in ml-4">humanize=&#123;true&#125;</span><span>&gt;</span>
//                                                 <br />
//                                                 <span>&lt;/cwc-moment&gt;</span>
//                                             </code></pre>
//                                             outputs: <cwc-moment date="2018-04-10 14:45" diff={true} humanize={true}></cwc-moment>
//                                             <br />
//                                             <pre><code class="lang-tsx">
//                                                 <span>&lt;cwc-moment</span><br />
//                                                 <span class="hljs-built_in ml-4">date="2018-04-09 06:45"</span><br />
//                                                 <span class="hljs-built_in ml-4">lang="fr";</span><span>&gt;</span>
//                                                 <br />
//                                                 <span>&lt;/cwc-moment&gt;</span>
//                                             </code></pre>
//                                             outputs: <cwc-moment date="2018-04-09 06:45" lang="fr"></cwc-moment>
//                                             <br />
//                                             <pre><code class="lang-tsx">
//                                                 <span>&lt;cwc-moment</span><br />
//                                                 <span class="hljs-built_in ml-4">date="2018-04-09 06:45"</span><br />
//                                                 <span class="hljs-built_in ml-4">lang="de";</span><span>&gt;</span>
//                                                 <br />
//                                                 <span>&lt;/cwc-moment&gt;</span>
//                                             </code></pre>
//                                             outputs: <cwc-moment date="2018-04-09 06:45" lang="de"></cwc-moment>
//                                             <br />
//                                             <pre><code class="lang-tsx">
//                                                 <span>&lt;cwc-moment</span><br />
//                                                 <span class="hljs-built_in ml-4">date="2018-04-09 06:45"</span><br />
//                                                 <span class="hljs-built_in ml-4">lang="en";</span><span>&gt;</span>
//                                                 <br />
//                                                 <span>&lt;/cwc-moment&gt;</span>
//                                             </code></pre>
//                                             outputs: <cwc-moment date="2018-04-09 06:45" lang="en"></cwc-moment>
//                                             <br />
//                                             No date
//                                             <pre><code class="lang-tsx">
//                                                 <span>&lt;cwc-moment</span><br />
//                                                 <span class="hljs-built_in ml-4">date=""</span><br />
//                                                 <span class="hljs-built_in ml-4">lang="en";</span><span>&gt;</span>
//                                                 <br />
//                                                 <span>&lt;/cwc-moment&gt;</span>
//                                             </code></pre>
//                                             outputs: <cwc-moment date="" lang="en"></cwc-moment>
//                                             <br />
//                                             <h4>Humanized outputs: </h4>
//                                             <p>
//                                                 <cwc-moment date="2017-05-01 14:30" format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date="2017-05-01 14:30" format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                             <p>
//                                                 <cwc-moment date="2018-05-01 14:30" format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date="2018-05-01 14:30" format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                             <p>
//                                                 <cwc-moment date="2018-06-01 14:30" format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date="2018-06-01 14:30" format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                             <p>
//                                                 <cwc-moment date="2018-06-03 14:30" format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date="2018-06-03 14:30" format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                             <p>
//                                                 <cwc-moment date="2018-06-05 14:30" format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date="2018-06-05 14:30" format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                             <p>
//                                                 <cwc-moment date="2018-06-07 14:30" format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date="2018-06-07 14:30" format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                             <p>
//                                                 <cwc-moment date="2018-07-07 14:30" format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date="2018-07-07 14:30" format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                             <p>
//                                                 <cwc-moment date="2018-08-07 14:30" format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date="2018-08-07 14:30" format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                             <p>
//                                                 <cwc-moment date={new Date().toString()} format="L"
//                                                 lang={'de'} diff={true} humanize={true}></cwc-moment>
//                                                 <cwc-moment date={new Date().toString()} format="L"
//                                                 lang={'en'} diff={true} humanize={true}></cwc-moment>
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="col-lg-8">
//                                     <table class="table">
//                                         <thead>
//                                             <tr>
//                                                 <th>Param</th>
//                                                 <th>Type</th>
//                                                 <th>Default</th>
//                                                 <th>Description</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <td>date</td>
//                                                 <td>String</td>
//                                                 <td>''</td>
//                                                 <td>Date parameter</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>format</td>
//                                                 <td>String</td>
//                                                 <td>''</td>
//                                                 <td>
//                                                     Format the Date e.g:<br />
//                                                     <strong>LTS</strong>  : 'h:mm:ss A'<br />
//                                                     <strong>LT</strong>   : 'h:mm A'<br />
//                                                     <strong>L</strong>    : 'MM/DD/YYYY'<br />
//                                                     <strong>LL</strong>   : 'MMMM D, YYYY'<br />
//                                                     <strong>LLL</strong>  : 'MMMM D, YYYY h:mm A'<br />
//                                                     <strong>LLLL</strong> : 'dddd, MMMM D, YYYY h:mm A'<br />
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td>duration</td>
//                                                 <td>String</td>
//                                                 <td>''</td>
//                                                 <td>Duration</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>unit</td>
//                                                 <td>String</td>
//                                                 <td>''</td>
//                                                 <td>Duration Unit</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>diff</td>
//                                                 <td>boolean</td>
//                                                 <td>false</td>
//                                                 <td>
//                                                 if diff from now to 'date' is smaller then 1 minute output "a moment ago" <br/>
//                                                 if diff from now to 'date' is bigger then 1 minute but is still today, output: 'today, 10:39am'<br/>
//                                                 if date is yesterday, output: 'yesterday, 10:39am'<br/>
//                                                 else output default format
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td>humanize</td>
//                                                 <td>boolean</td>
//                                                 <td>false</td>
//                                                 <td>humanize output of the time ago</td>
//                                             </tr>
//                                             <tr>
//                                                 <td>lang</td>
//                                                 <td>string</td>
//                                                 <td>'en'</td>
//                                                 <td>locale value</td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
