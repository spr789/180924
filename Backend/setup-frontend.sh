#!/bin/bash

# Set base directories for your Django project and React frontend
BASE_DIR="/workspaces/240822/ecom"
FRONTEND_DIR="$BASE_DIR/frontend/src/pages"

# Ensure the frontend directory exists
mkdir -p $FRONTEND_DIR

# List of apps and their corresponding folder names
declare -A app_dirs
app_dirs=(
    ["wishlist"]="Wishlist"
    ["search"]="Search"
    ["orders"]="Orders"
    ["vendors"]="Vendors"
    ["discounts"]="Discounts"
    ["analytics"]="Analytics"
    ["support"]="Support"
    ["accounts"]="Accounts"
    ["catalog"]="Catalog"
    ["notifications"]="Notifications"
    ["shipping"]="Shipping"
    ["products"]="Products"
    ["cart"]="Cart"
    ["payments"]="Payments"
    ["marketing"]="Marketing"
    ["cms"]="CMS"
    ["reviews"]="Reviews"
)

# Loop through the HTML files and create React components
find $BASE_DIR -type f -name "*.html" | grep -v "node_modules" | while read -r html_file; do
    # Extract app name from the file path
    app_name=$(echo "$html_file" | awk -F'/' '{print $5}')
    
    # Map the app name to its corresponding React folder
    react_folder="${app_dirs[$app_name]}"
    
    # Skip if app is not found in the mapping
    if [[ -z "$react_folder" ]]; then
        continue
    fi
    
    # Get the HTML file name without extension to use as the React component name
    component_name=$(basename "$html_file" .html | sed 's/_\([a-z]\)/\U\1/g' | sed 's/^\([a-z]\)/\U\1/')
    
    # Create the corresponding folder for the app in React if it doesn't exist
    mkdir -p "$FRONTEND_DIR/$react_folder"
    
    # Create a React component file for the HTML file
    component_file="$FRONTEND_DIR/$react_folder/$component_name.js"
    
    # Write the basic structure of the React component
    cat <<EOT > "$component_file"
import React from 'react';

const $component_name = () => {
    return (
        <div>
            <h1>$component_name Component</h1>
            <p>This component is based on the template $html_file</p>
        </div>
    );
};

export default $component_name;
EOT

    # Notify the user
    echo "Created component: $component_file"
done

echo "All components have been created based on the HTML templates."
