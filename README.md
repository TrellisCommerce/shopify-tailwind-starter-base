Brought to you and maintained by [Trellis Commerce](https://trellis.co/) - A full-service eCommerce agency based in Boston, MA

Latest merged code from [Dawn v14.0.0](https://github.com/Shopify/dawn/releases/tag/v14.0.0)

# Dawn + Tailwind CSS + Prettier Shopify Starter Theme

Shopify Dawn theme with Tailwind CSS &amp; Prettier integrations

The starter theme includes an integration of:

## [Tailwind CSS](https://tailwindcss.com/)

- [Configured](https://markustripp.medium.com/extend-shopify-dawn-theme-with-a-custom-tailwind-css-carousel-section-e3efe3ecf18e) to use `prefix: twcss-` in order to not clash with Dawn’s existing styles

## [Trellis' Prettier config](https://www.npmjs.com/package/@trelliscommerce/prettier-config) with Husky pre-commit hooks

- Formats JS & CSS whenever a git commit is made
- Set up your own VSCode to apply Prettier formatting when a file is saved (optional)

## Other Noted Modifications

- Set the default page width to 1440px and tweaked the desktop page width range to be 1200px to 1600px with a step adjustment of 10px (standard desktop width used at Trellis and allows for more fine tuning)

## Steps to Start Using this Starter Theme

1. Fork this repository & enable actions in the repo's Actions tab.

| :bangbang: | When forking this repo, make sure to change the settings in the forked repo under Settings > Actions > General > Workflow permissions to be `Read and write permissions` and check `Allow GitHub Actions to create and approve pull requests` for the Theme Check & Lighthouse actions to run |
|:----------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

2. Clone the forked repo, navigate to the directory in your terminal, & run `npm install`.

3. In the theme section of your Shopify admin you can connect to a GitHub repository via “Add theme” button.

<img width="500" alt="Add a theme and connect it to your github repo" src="https://user-images.githubusercontent.com/75811975/162517993-31a22954-6600-45f9-ab6e-2b9735c9efba.png">

4. In your terminal, navigate to the cloned repo directory, and use the Shopify CLI to launch the development server to your store with `shopify theme dev --store=mystore.myshopify.com` and upload the theme with `shopify theme share`.

| :bangbang: | If you are working on a development store and are signed in via your partner dashboard, you must add a separate user in that Shopify store with admin rights and sign in with this new user when logging in using the Shopify CLI |
|:----------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

You can add users in the store Settings:

<img width="500" alt="Where to add users in the store settings" src="https://user-images.githubusercontent.com/75811975/162517914-6fe20ef6-7b58-4337-b488-75966694ef92.png">

## Add GitHub secrets for Lighthouse CI Performance Evaluation Actions

| :bangbang: | This repo does not have the following secrets configured, which is why the Lighthouse action is failing. |
|:----------:|:---------------------------------------------------------------------------------------------------------|

First, make sure your `Workflow permissions` are set like below in order for the actions to run:

<img width="500" alt="Workflow permissions settings" src="https://user-images.githubusercontent.com/75811975/167029308-3b05be7b-bae0-4cb9-8234-7da07b4f715e.png">

In your GitHub repo, navigate to Settings > Secrets > Actions and add the following repository secrets:

`SHOP_APP_ID` & `SHOP_APP_PASSWORD`

- Get values by navigating to https://mystore.myshopify.com/admin/apps/development, select the theme kit app, and copy the API key value for `SHOP_APP_ID` & Admin API access token value for `SHOP_APP_PASSWORD` (value starts with shpat)
- Notes on how to get these values:

1. Navigate to the Apps section in your Shopify admin and click the Develop apps button in the top right
2. Then Allow custom app development
3. You should be able to click the Create an app button
4. In the configuration tab of your app, go ahead and check all the boxes for the Admin and Storefront API permissions
5. The API key & Admin API access token will be in the API credentials tab

`SHOP_STORE`

- `mystore.myshopify.com` (ex. `trellis-sandbox.myshopify.com`)

`SHOP_PASSWORD`

- Need if Preferences > Password protection is enabled

`SHOP_COLLECTION_HANDLE`

- Collection with products **manually added** needs to be created and the handle used here
- Make sure data shows for the API request: https://mystore.myshopify.com/admin/api/2021-04/custom_collections.json?published_status=published&limit=1

`SHOP_PRODUCT_HANDLE`

- Select a product handle for a product that comes back from the API request: https://mystore.myshopify.com/admin/api/2021-04/products.json?published_status=published&limit=1

`LHCI_GITHUB_APP_TOKEN`

- To enable GitHub status checks via the official GitHub app, [install and authorize the app](https://github.com/apps/lighthouse-ci) with the owner of the target repo. If the repo is within an organization, organization approval might be necessary. Copy the app token provided on the authorization confirmation page and add it to your build environment as `LHCI_GITHUB_APP_TOKEN`

These secret values are used in the `ci.yml` GitHub workflow:

<img width="500" alt="Secrets shown in the workflow file" src="https://user-images.githubusercontent.com/75811975/162518733-c1744910-85b2-44e3-91d0-08acfc018ba1.png">

## Install [Shopify Liquid VSCode extension](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode)

- Includes [Shopify Theme Check](https://shopify.dev/themes/tools/theme-check) linting

## Common local development commands

1. Before beginning any work, it is good practice to pull down the latest changes from the Shopify Dawn theme:
   `git fetch upstream`
   `git pull upstream main`

2. Add upstream link if you get the error `fatal: 'upstream' does not appear to be a git repository` run:
   `git remote add upstream https://github.com/Shopify/dawn.git` or `git remote add upstream https://github.com/TrellisCommerce/shopify-tailwind-starter-base` depending on which repository you want to pull updates from

3. Pull down changes from the theme editor:
   `shopify theme pull -d`

4. Anytime you add a Tailwind CSS class (remember to prefix it with twcss-), run the CLI tool to scan your template files for classes and build your CSS to assets/app.css:
   `npx tailwindcss -i ./assets/app-tailwind.css -o ./assets/app.css --watch`

- Run this command in a separate terminal, so it will continue to run while you are developing.
- Note that using a Tailwind CSS class without a space afterward when followed by a liquid tag causes compiling issues:
`lg:!twcss-px-[32px]{% endif %}'>`
But this does work:
`lg:!twcss-px-[32px] {% endif %}'>`

5. Launch the local development server:
   `shopify theme dev`
