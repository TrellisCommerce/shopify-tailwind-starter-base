Brought to you and maintained by [Trellis Commerce](https://trellis.co/) - A full-service eCommerce agency based in Boston, MA

Latest merged code from [Dawn v15.0.1](https://github.com/Shopify/dawn/releases/tag/v15.0.1)

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
- There is a page template called `noindexnofollow` with the meta tag `noindex, nofollow` for any pages that need to be hidden from search engine site crawlers

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

`SHOP_ACCESS_TOKEN`

- Settings > Apps and sales channels > Develop Apps > Create an app. Name it something like `Lighthouse` and give the app permissions of `read_products,write_themes`. Install the app and use the token value that will start with `shpat_`.

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

<img width="507" alt="Screenshot 2024-07-30 at 1 44 13 PM" src="https://github.com/user-attachments/assets/0c8f7af0-5a35-4cfe-b5e0-6ebcf7c86a41">

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
   
---

# Other Versions of the Starter Theme

## Tailwind Admin Fields

- [Branch](https://github.com/TrellisCommerce/shopify-tailwind-starter-base/tree/tailwind-admin-fields)

### How Is It Different

Multiple admin fields have been added at the theme level, as well as at the section level, to allow for more granular control over the Dawn theme's settings and elements directly through the admin by inputting Tailwind CSS classes as values.

### How To Use

First, decide if you want to configure the `tailwind.config.js` file to allow for your specific font families, sizes, colors, etc to cut down on the generated Tailwind CSS file from the start, or you can just jump in and take advantage of all the default Tailwind CSS classes.

1. Affect global animation timing & easing from [Easing Functions Cheat Sheet](https://easings.net/) in Theme Settings under Animations:

<img width="500" alt="Animation Tailwind CSS settings" src="https://github.com/user-attachments/assets/48b5c42f-9646-476f-8555-5157ac1afc5d">

2. Affect global elements in the Theme Settings under the Tailwind CSS accordion:

<img width="500" alt="Global element Tailwind CSS theme settings" src="https://github.com/user-attachments/assets/fd4ce8d8-ec53-46f9-af5d-746d0f63b0af">

3. Affect global elements and page-level sections under the Tailwind CSS heading for each Dawn element in the admin:

<img width="500" alt="Header Tailwind CSS settings" src="https://github.com/user-attachments/assets/f8ce39b0-d9a1-4e73-94fb-1efb014869ec">

### If Using in Conjunction with a Development Team

#### Optimizing CSS

In order to make all the Tailwind classes available for the editor in the admin, the following was added to the `tailwind.config.js` file to include ALL classes, as well as breakpoint & hover variants, and to add `!important` to each class to make sure it overrides any existing Dawn styles:

```
...
// safelist is added to provide all styles for design to add through the admin
safelist: [
   {
      pattern: /.*/,
      variants: ['xs', 'sm', 'md', 'lg', 'hover', 'group-hover'],
   },
],
// !important is added to override core Dawn styles for design
important: true,
...
```

If this theme is handed over to a development team who will be editing the code directly, the safelist array will need to be removed (ideal to also remove the `important` key, but that would require adjusting any conflicting Dawn styles) from the config file and the following added to the content array to have Tailwind recognize the classes added through the admin fields: 

```
content: [
   ...
   './**/*.json',
],
```

If desired, run the Tailwind compile command to purge any unused styles (this step is optional as making a commit with changes to the tailwind config file will auto-generate a new `app.css` file after the commit is pushed, but this step will allow for a quick check on the proper purging of the classes): `npx tailwindcss -i ./assets/app-tailwind.css -o ./assets/app.css`

#### Lock Down the Admin Fields

To lock down the Tailwind CSS admin fields from being editied through the admin, run `gulp` in your terminal to transform all Tailwind text fields to checkbox fields instead and to add the following paragraph text to all Tailwind sections:

_Tailwind fields are not editable through the admin at this stage. Please contact a Trellis engineer if changes are needed._

| :bangbang: | Note that toggling one of the checkboxes after running `gulp` will remove the contents of the tailwind admin fields. Since removing the fields also removes the entered values, swapping to a different field type preserves the values and does not allow for editing the values. |
|:----------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

#### Code Review of Classes Inserted Through the Admin

It is recommended to have a separate branch & connected theme version created for the design team to use when adding in classes through the admin fields. This way, when it is time to merge in the changes from that branch to another theme branch, a pull request can be created and all the commits can be reviewed all at once instead of reviewing each individual commit generated by `shopify[bot]`.
