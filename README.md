# Dawn + TailWindCSS + Prettier Shopify Starter Theme

Shopify Dawn theme with TailWindCSS &amp; Prettier integrations

The starter theme includes an integration of:

## [TailwindCSS](https://tailwindcss.com/)

- [Configured](https://markustripp.medium.com/extend-shopify-dawn-theme-with-a-custom-tailwind-css-carousel-section-e3efe3ecf18e) to use prefix: ‘twcss-' in order to not clash with Dawn’s existing styles

## [Trellis' Prettier config](https://www.npmjs.com/package/@trelliscommerce/prettier-config) with Husky pre-commit hooks

- Formats JS & CSS whenever a git commit is made
- Setup your own VSCode to apply Prettier formatting when a file is saved (optional)

## Steps to Start Using this Starter Theme

1. Make a clone of this repository and run `npm install`.

2. In the theme section of your Shopify admin you can connect to a GitHub repository via “Add theme” button.

![Add a theme and connect it to your github repo](https://user-images.githubusercontent.com/75811975/162517993-31a22954-6600-45f9-ab6e-2b9735c9efba.png)

3. In your terminal, navigate to the cloned repo directory, and use the Shopify CLI to login to your store with `shopify login --store=mystore.myshopify.com` and launch the development server with `shopify theme serve`.

**IMPORTANT!** If you signed in via your partner dashboard, you must create a separate user in that Shopify store with admin rights and sign in with this new user. You can add users in the store Settings:

![Where to add users in the store settings](https://user-images.githubusercontent.com/75811975/162517914-6fe20ef6-7b58-4337-b488-75966694ef92.png)

## Add Github secrets for Lighthouse CI Performance Evaluation Actions

In your github repo, navigate to Settings > Secrets > Actions and add the following repository secrets:

`SHOP_APP_ID`

- Get value by navigating to https://mystore.myshopify.com/admin/apps/development, select the theme kit app, and copy the Admin API Shared Secret value

`SHOP_APP_PASSWORD`

- Get value by navigating to https://mystore.myshopify.com/admin/apps/development, select the theme kit app, and copy the Admin API Password value
- For new development apps, add the shpat... token value

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

These secret values are used in the `ci.yml` github workflow:
![Secrets shown in the workflow file](https://user-images.githubusercontent.com/75811975/162518733-c1744910-85b2-44e3-91d0-08acfc018ba1.png)

## Install [Shopify Liquid VSCode extension](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode)

- Includes [Shopify Theme Check](https://shopify.dev/themes/tools/theme-check) linting

## Common local development commands

1. Before beginning any work, it is good practice to pull down the latest changes from the Shopify Dawn theme:
   `git fetch upstream`
   `git pull upstream main`

2. Add upstream link if you get the error `fatal: 'upstream' does not appear to be a git repository` run:
   `git remote add upstream https://github.com/Shopify/dawn.git`

3. Pull down changes from the theme editor:
   `shopify theme pull -d`

4. Anytime you add a TailwindCSS class (remember to prefix it with twcss-), run the CLI tool to scan your template files for classes and build your CSS to assets/app.css:
   `npx tailwindcss -i ./assets/app-tailwind.css -o ./assets/app.css --watch`

- Run this command in a separate terminal so it will continue to run while you are developing.

5. Launch the local development server:
   `shopify theme serve`
