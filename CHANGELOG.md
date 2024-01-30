# Changes

## New Dependencies


## Migrate from CRA -> Vite

## Migrate from using JS -> TS

## Migrate Old Redux Logic to New Redux Logic

- RTK for data fetching and caching
- feature slices for state management

## Better Route Layout Management

<!-- TODO -->

### Fix tests?

- dont know if this is worth doing thinking of removing testing

### Pages (Old redux)

- ProfilePage
- SearchResultsPage

### Pages (Fix/add missing functionality) Improve UI

- `ItemPage`
- `MoreItems`
- `PurchaseHistory`
- `SalesHistory`
- `UpdateUserAddressPage`
- `SearchResultPage`
- `WelcomePage`
- ... most of the components/pages

### Improvements

- cart page request should include item in cart cart:{include: items true}..
- fix multi-page form for purchase logic, `Cart` -> `AddressPage` -> `ConfirmPage` -> `PaymentPage`
- landing page links-to welcome page (so home route should be landing)
- item variants (custom seller management page, where users can add custom properties like color, style etc.)
- consistent pagination throughout the application
- multiple images for items
- Future: when the improvements are done, this entire app can easily be ported into the existing next.js frontend, making deployment a lot easier (next app, express app) only
