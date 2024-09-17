#!/bin/bash

# Base directory
BASE_DIR="frontend"

# Public directory and files
mkdir -p $BASE_DIR/public
touch $BASE_DIR/public/favicon.ico
touch $BASE_DIR/public/index.html
touch $BASE_DIR/public/manifest.json
touch $BASE_DIR/public/robots.txt

# Assets directory (fonts, icons, images)
mkdir -p $BASE_DIR/src/assets/fonts
mkdir -p $BASE_DIR/src/assets/icons
mkdir -p $BASE_DIR/src/assets/images

# Components directory and files
mkdir -p $BASE_DIR/src/components/Navbar
touch $BASE_DIR/src/components/Navbar/Navbar.js
touch $BASE_DIR/src/components/Navbar/Navbar.scss

mkdir -p $BASE_DIR/src/components/Footer
touch $BASE_DIR/src/components/Footer/Footer.js
touch $BASE_DIR/src/components/Footer/Footer.scss

mkdir -p $BASE_DIR/src/components/common/Button
touch $BASE_DIR/src/components/common/Button/Button.js
touch $BASE_DIR/src/components/common/Button/Button.scss

mkdir -p $BASE_DIR/src/components/common/InputField
touch $BASE_DIR/src/components/common/InputField/InputField.js
touch $BASE_DIR/src/components/common/InputField/InputField.scss

mkdir -p $BASE_DIR/src/components/common/Modal
touch $BASE_DIR/src/components/common/Modal/Modal.js
touch $BASE_DIR/src/components/common/Modal/Modal.scss

mkdir -p $BASE_DIR/src/components/common/Card
touch $BASE_DIR/src/components/common/Card/ProductCard.js
touch $BASE_DIR/src/components/common/Card/Card.scss

mkdir -p $BASE_DIR/src/components/common/Spinner
touch $BASE_DIR/src/components/common/Spinner/Spinner.js
touch $BASE_DIR/src/components/common/Spinner/Spinner.scss

mkdir -p $BASE_DIR/src/components/common/Dropdown
touch $BASE_DIR/src/components/common/Dropdown/Dropdown.js
touch $BASE_DIR/src/components/common/Dropdown/Dropdown.scss

mkdir -p $BASE_DIR/src/components/common/Rating
touch $BASE_DIR/src/components/common/Rating/Rating.js
touch $BASE_DIR/src/components/common/Rating/Rating.scss

mkdir -p $BASE_DIR/src/components/common/Tooltip
touch $BASE_DIR/src/components/common/Tooltip/Tooltip.js
touch $BASE_DIR/src/components/common/Tooltip/Tooltip.scss

# Containers directory and files
mkdir -p $BASE_DIR/src/containers/HomePage
touch $BASE_DIR/src/containers/HomePage/HomePage.js
touch $BASE_DIR/src/containers/HomePage/HomeBanner.js
touch $BASE_DIR/src/containers/HomePage/HomeCategories.js
touch $BASE_DIR/src/containers/HomePage/HomeFeaturedProducts.js
touch $BASE_DIR/src/containers/HomePage/HomePage.scss

mkdir -p $BASE_DIR/src/containers/ProductPage
touch $BASE_DIR/src/containers/ProductPage/ProductPage.js
touch $BASE_DIR/src/containers/ProductPage/ProductGallery.js
touch $BASE_DIR/src/containers/ProductPage/ProductDetails.js
touch $BASE_DIR/src/containers/ProductPage/ProductPage.scss

mkdir -p $BASE_DIR/src/containers/VendorPage
touch $BASE_DIR/src/containers/VendorPage/VendorPage.js
touch $BASE_DIR/src/containers/VendorPage/VendorDetails.js
touch $BASE_DIR/src/containers/VendorPage/VendorProducts.js
touch $BASE_DIR/src/containers/VendorPage/VendorPage.scss

mkdir -p $BASE_DIR/src/containers/CheckoutPage
touch $BASE_DIR/src/containers/CheckoutPage/CheckoutPage.js
touch $BASE_DIR/src/containers/CheckoutPage/ShippingDetails.js
touch $BASE_DIR/src/containers/CheckoutPage/PaymentMethods.js
touch $BASE_DIR/src/containers/CheckoutPage/CheckoutPage.scss

mkdir -p $BASE_DIR/src/containers/CartPage
touch $BASE_DIR/src/containers/CartPage/CartPage.js
touch $BASE_DIR/src/containers/CartPage/CartPage.scss

mkdir -p $BASE_DIR/src/containers/ProfilePage
touch $BASE_DIR/src/containers/ProfilePage/ProfilePage.js
touch $BASE_DIR/src/containers/ProfilePage/OrderHistory.js
touch $BASE_DIR/src/containers/ProfilePage/AddressBook.js
touch $BASE_DIR/src/containers/ProfilePage/ProfilePage.scss

# Context directory and files
mkdir -p $BASE_DIR/src/context
touch $BASE_DIR/src/context/AuthContext.js
touch $BASE_DIR/src/context/CartContext.js
touch $BASE_DIR/src/context/ProductContext.js
touch $BASE_DIR/src/context/VendorContext.js

# Hooks directory and files
mkdir -p $BASE_DIR/src/hooks
touch $BASE_DIR/src/hooks/useAuth.js
touch $BASE_DIR/src/hooks/useFetch.js
touch $BASE_DIR/src/hooks/useCart.js
touch $BASE_DIR/src/hooks/useProduct.js

# Pages directory and files
mkdir -p $BASE_DIR/src/pages
touch $BASE_DIR/src/pages/Home.js
touch $BASE_DIR/src/pages/Products.js
touch $BASE_DIR/src/pages/ProductDetail.js
touch $BASE_DIR/src/pages/Cart.js
touch $BASE_DIR/src/pages/VendorDashboard.js
touch $BASE_DIR/src/pages/Checkout.js
touch $BASE_DIR/src/pages/Profile.js
touch $BASE_DIR/src/pages/Login.js

# Services directory and files (for API calls)
mkdir -p $BASE_DIR/src/services
touch $BASE_DIR/src/services/api.js

# Styles directory and files
mkdir -p $BASE_DIR/src/styles/components
touch $BASE_DIR/src/styles/globals.scss
touch $BASE_DIR/src/styles/components/button.scss
touch $BASE_DIR/src/styles/components/card.scss
touch $BASE_DIR/src/styles/components/modal.scss
touch $BASE_DIR/src/styles/layout.scss
touch $BASE_DIR/src/styles/tailwind.css

# Utils directory and files
mkdir -p $BASE_DIR/src/utils
touch $BASE_DIR/src/utils/formatCurrency.js
touch $BASE_DIR/src/utils/validateInput.js

# Root level files
touch $BASE_DIR/src/App.js
touch $BASE_DIR/src/index.js
touch $BASE_DIR/src/routes.js
touch $BASE_DIR/src/tailwind.config.js
touch $BASE_DIR/src/index.css

# Project-level files
touch $BASE_DIR/.gitignore
touch $BASE_DIR/package.json
touch $BASE_DIR/package-lock.json
touch $BASE_DIR/README.md

echo "Project structure created successfully!"