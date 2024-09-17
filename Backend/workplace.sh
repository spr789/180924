#!/bin/bash

# List of Django apps where you want to create the files
APPS=(accounts catalog products vendors cart orders shipping payments wishlist search cms reviews discounts notifications analytics)

# Define the files to be created
FILES=(serializers.py api.py api_urls.py)

# Loop through each app and create the files if they don't exist
for app in "${APPS[@]}"
do
    # Check if the app directory exists
    if [ -d "$app" ]; then
        echo "Processing $app..."
        
        # Loop through the file names
        for file in "${FILES[@]}"
        do
            # Check if the file already exists
            if [ ! -f "$app/$file" ]; then
                # Create an empty file
                touch "$app/$file"
                echo "Created $app/$file"
            else
                echo "$app/$file already exists."
            fi
        done
    else
        echo "App $app not found!"
    fi
done

echo "File creation process complete."
