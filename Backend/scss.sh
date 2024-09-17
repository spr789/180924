#!/bin/bash

# Define the base directory for SCSS files
BASE_DIR="static/scss"

# Create the base directory for SCSS files
mkdir -p $BASE_DIR

# Create directories for different SCSS categories
mkdir -p $BASE_DIR/base
mkdir -p $BASE_DIR/components
mkdir -p $BASE_DIR/layout
mkdir -p $BASE_DIR/pages
mkdir -p $BASE_DIR/themes
mkdir -p $BASE_DIR/utils
mkdir -p $BASE_DIR/vendors

# Create SCSS files in the base directory
touch $BASE_DIR/_variables.scss
touch $BASE_DIR/_mixins.scss
touch $BASE_DIR/_reset.scss
touch $BASE_DIR/_typography.scss
touch $BASE_DIR/_animations.scss

# Create SCSS files in the components directory
touch $BASE_DIR/components/_buttons.scss
touch $BASE_DIR/components/_cards.scss
touch $BASE_DIR/components/_forms.scss
touch $BASE_DIR/components/_navbars.scss
touch $BASE_DIR/components/_modals.scss
touch $BASE_DIR/components/_tables.scss

# Create SCSS files in the layout directory
touch $BASE_DIR/layout/_header.scss
touch $BASE_DIR/layout/_footer.scss
touch $BASE_DIR/layout/_grid.scss
touch $BASE_DIR/layout/_sidebar.scss
touch $BASE_DIR/layout/_main.scss
touch $BASE_DIR/layout/_vendor_dashboard.scss
touch $BASE_DIR/layout/_product_page.scss

# Create SCSS files in the pages directory
touch $BASE_DIR/pages/_home.scss
touch $BASE_DIR/pages/_product_list.scss
touch $BASE_DIR/pages/_checkout.scss
touch $BASE_DIR/pages/_login.scss
touch $BASE_DIR/pages/_register.scss

# Create SCSS files in the themes directory
touch $BASE_DIR/themes/_default.scss
touch $BASE_DIR/themes/_dark.scss
touch $BASE_DIR/themes/_light.scss

# Create SCSS files in the utils directory
touch $BASE_DIR/utils/_helpers.scss
touch $BASE_DIR/utils/_variables.scss

# Create SCSS files in the vendors directory
touch $BASE_DIR/vendors/_bootstrap.scss
touch $BASE_DIR/vendors/_fontawesome.scss

# Main SCSS file that imports all partials
touch $BASE_DIR/main.scss

# Add imports to the main.scss file
echo "@import 'base/variables';" >> $BASE_DIR/main.scss
echo "@import 'base/mixins';" >> $BASE_DIR/main.scss
echo "@import 'base/reset';" >> $BASE_DIR/main.scss
echo "@import 'base/typography';" >> $BASE_DIR/main.scss
echo "@import 'base/animations';" >> $BASE_DIR/main.scss

echo "@import 'components/buttons';" >> $BASE_DIR/main.scss
echo "@import 'components/cards';" >> $BASE_DIR/main.scss
echo "@import 'components/forms';" >> $BASE_DIR/main.scss
echo "@import 'components/navbars';" >> $BASE_DIR/main.scss
echo "@import 'components/modals';" >> $BASE_DIR/main.scss
echo "@import 'components/tables';" >> $BASE_DIR/main.scss

echo "@import 'layout/header';" >> $BASE_DIR/main.scss
echo "@import 'layout/footer';" >> $BASE_DIR/main.scss
echo "@import 'layout/grid';" >> $BASE_DIR/main.scss
echo "@import 'layout/sidebar';" >> $BASE_DIR/main.scss
echo "@import 'layout/main';" >> $BASE_DIR/main.scss
echo "@import 'layout/vendor_dashboard';" >> $BASE_DIR/main.scss
echo "@import 'layout/product_page';" >> $BASE_DIR/main.scss

echo "@import 'pages/home';" >> $BASE_DIR/main.scss
echo "@import 'pages/product_list';" >> $BASE_DIR/main.scss
echo "@import 'pages/checkout';" >> $BASE_DIR/main.scss
echo "@import 'pages/login';" >> $BASE_DIR/main.scss
echo "@import 'pages/register';" >> $BASE_DIR/main.scss

echo "@import 'themes/default';" >> $BASE_DIR/main.scss
echo "@import 'themes/dark';" >> $BASE_DIR/main.scss
echo "@import 'themes/light';" >> $BASE_DIR/main.scss

echo "@import 'utils/helpers';" >> $BASE_DIR/main.scss
echo "@import 'utils/variables';" >> $BASE_DIR/main.scss

echo "@import 'vendors/bootstrap';" >> $BASE_DIR/main.scss
echo "@import 'vendors/fontawesome';" >> $BASE_DIR/main.scss

echo "SCSS file structure created successfully."
