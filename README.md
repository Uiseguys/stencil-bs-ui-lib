# Themeable UI Library - based on StencilJS and Bootstrap4

## Live Demo
[https://stencil-bs-lib.netlify.com/](https://stencil-bs-lib.netlify.com/)

## Goal
The goal of this project is to provide an extensive and themeable UI library based on StencilJS and Bootstrap.

The  feature set we are aiming for is the Atlassian UI Library. We try to stay conform with the guidelines described here:
https://atlassian.design/guidelines/product/overview

## Contributing
To create new component, please prefix component's name with `cwc-` (for e.g. `cwc-list`).
New component must be created in a separate git branch prefixed with `feature|bugfix|release` like `feature/my-new-shiny-component`. 
When the component is done you must provide demo with API reference and component usage on the demo page. 
After pushing your branch to the repository, create pull request assigning the @ui-guys for review. For every pull request there is an automatically created [Netlify](https://www.netlify.com/) deploy. You can check your changes and confirm successfull merge:
![netlify-deploy-verify](https://user-images.githubusercontent.com/6415224/40789279-bad06eb2-64fa-11e8-881e-174c7e99269f.png)





## NPM publishing

After your component is reviewed and merged, please publish it to npm.
Login to your account with `npm login`. Anytime you can verify your login status with `npm whoami` command. To publish, increment package version according to [SemVer](https://semver.org/) guidelines and simply run `npm publish`.