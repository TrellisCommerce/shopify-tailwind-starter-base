Brought to you and maintained by [Trellis Commerce](https://trellis.co/) - A full-service eCommerce agency based in Boston, MA

Latest merged code from [Dawn v15.2.0](https://github.com/Shopify/dawn/releases/tag/v15.2.0)

# Dawn + Tailwind CSS + Prettier Shopify Starter Theme

Shopify Dawn theme with Tailwind CSS &amp; Prettier integrations

The starter theme includes an integration of:

## [Tailwind CSS](https://tailwindcss.com/)

- [Configured](https://markustripp.medium.com/extend-shopify-dawn-theme-with-a-custom-tailwind-css-carousel-section-e3efe3ecf18e) to use `prefix: twcss-` in order to not clash with Dawn’s existing styles

- There is the option to switch the order of the `base.css` & `app.css` stylesheets in `theme.liquid` if you want your Tailwind classes to take precedence over the base Dawn styles

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

## Version: Trade

- [Branch](https://github.com/TrellisCommerce/shopify-tailwind-starter-base/tree/trade)

### How Is It Different

This version of the theme uses the configurations already existing in with the [Trade version of Dawn](https://help.shopify.com/en/manual/online-store/themes/themes-by-shopify/trade). Specific B2B-related features have been added to this version of the theme, which so far include:

<details>
<summary>1. Buy Again</summary>

#### Functionality
If a customer is logged in and has made a previous purchase, the Buy Again buttons appear within the cart elements.

#### Admin Controls
N/A

#### Visuals
Buy Again button in the cart drawer & on the cart page:

<img width="300" alt="Buy Again button in the cart drawer" src="https://github.com/user-attachments/assets/9ed316b7-4022-47f0-b5ca-fe5d6adaff3b">
<img width="400" alt="Buy Again button on the cart page" src="https://github.com/user-attachments/assets/b50cf468-d00c-400b-b71c-44d02b16119f">
</details>

<details>
<summary>2. Bulk Cart Clear</summary>

#### Functionality
Uses the `POST /{locale}/cart/clear.js` endpoint to set all quantities of all line items in the cart to zero. ([Shopify documentation](https://shopify.dev/docs/api/ajax/reference/cart#post-locale-cart-clear-js))

#### Admin Controls
Toggle on or off feature under Theme Settings > Cart > Show clear cart button:

<img width="200" alt="Admin controls for bulk cart clear" src="https://github.com/user-attachments/assets/44a29ff5-df0b-499d-a0cb-15b1b73364a1">

#### Visuals
Clear Cart text button in the cart drawer & on the cart page:

<img width="400" alt="Clear Cart button in the cart drawer" src="https://github.com/user-attachments/assets/b85d3b3f-7407-421a-9315-686d773b4844">
<img width="400" alt="Clear Cart button on the cart page" src="https://github.com/user-attachments/assets/29dc53eb-a936-40f3-9c7d-19824b5fe28d">
</details>

<details>
<summary>3. Bespoke Breadcrumbs for Collecitons & PDPs</summary>

#### Functionality
The navigation structure of a store dictates the breadcrumb structure of the collections and product pages up to four nested levels, complete with [structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
   
#### Admin Controls
Set the navigation structure of a store under Online Store > Navigation > Menus and then set the store to use the configured menu under Header > Menu:

<img width="200" alt="Admin controls for bulk cart clear" src="https://github.com/user-attachments/assets/67cee4d9-dc25-4e63-9f92-63a142680c7c">
   
#### Visuals

Breadcrumbs on a product page & collection page:

<img width="400" alt="Breadcrumbs on a product page" src="https://github.com/user-attachments/assets/efab40f7-56f9-47f0-b900-36989c066714">
<img width="400" alt="Breadcrumbs on a collection page" src="https://github.com/user-attachments/assets/3651668e-3d50-4622-a7b5-f8987fdb170d">
</details>

<details>
<summary>4. Cart Sorting</summary>

#### Functionality
Cart items can be sorted 4 ways:
1. `Default` - standard way Shopify sorts by order added to cart
2. `Price` - Numeric ascending by total price
3. `Title` - Alphabetic by product name
4. `Quantity` - Numeric ascending by quantity in cart

#### Admin Controls
Select the way to sort the cart items by navigating to the Items section on the Cart page:

<img width="400" alt="Breadcrumbs on a collection page" src="https://github.com/user-attachments/assets/4b3e1098-df0d-4d1c-badc-af9facec9be9">
</details>

<details>
<summary>5. Header Mega Menu Promotional Items</summary>

#### Functionality
A block for the Header section has been created called Promotional Items, which includes the ability to add one or more promotions to the right side of a desktop mega menu. To keep performance optimal, the images within the mega menu will initially load once a mega menu has been toggled open.

#### Admin Controls
Add a `Promotional Items` block for each mega menu that will have a promotion under the Header section. The `Nav Postion` value corresponds to the mega menu the promotion will appear in:

<img width="200" alt="Admin controls for a promotion in the header" src="https://github.com/user-attachments/assets/68ae6b2d-524e-45e3-83ee-b472088c6716">

#### Visuals
Promotion in the header:

<img width="500" alt="Promotion in the header" src="https://github.com/user-attachments/assets/ebbba635-f3f3-4efa-8018-60d1c0206b4d">

</details>

<details>
<summary>6. Predictive Search Enhancements</summary>

#### Functionality
Using the [parameters available for Shopify’s predictive search](https://shopify.dev/docs/api/ajax/reference/predictive-search), the following fields have been added to be searched with a search query:
- title
- vendor
- tag
- variants.sku
- variants.barcode
- product_type
- variants.title

#### Admin Controls
N/A
</details>

## Version: Tailwind Admin Fields

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
