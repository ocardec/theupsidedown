
# install required packages
# install.packages(c("httr", "jsonlite"))

# Load necessary libraries
library(httr)
library(jsonlite)
library(rstudioapi)  # Required for getting the script's path

# Set the working directory to the script's location
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))


### From API.BIBLE
# # Function to extract API key from JavaScript file
# get_api_key <- function(file_path) {
#   key_content <- readLines(file_path, warn = FALSE)
#   key <- sub(".*'(.*)'.*", "\\1", key_content) # Extract key between single quotes
#   return(key)
# }
# 
# # Set the path to your API key file
# key_path <- 'my_key.js'
# 
# # Get the API key
# api_key <- get_api_key(key_path)
# 
# # Set the API endpoint
# url <- "https://api.scripture.api.bible/v1/bibles"
# 
# # Make the GET request to the API
# response <- GET(url, add_headers(`api-key` = api_key[2]))
# 
# # Check if the request was successful
# if (status_code(response) == 200) {
#   # Parse the JSON content
#   content <- fromJSON(content(response, "text"))
#   # Print the content
#   return(content)
#   
# } else {
#   # Print error message if the request fails
#   print(paste("Error:", status_code(response), content(response, "text", encoding = "UTF-8")))
# }

### From https://bible.helloao.org/docs/

# Set the API endpoint
# url <- "https://bible.helloao.org/api/available_translations.json"

url <- "https://bible.helloao.org/api/BSB/books.json"

# Make the GET request to the API
response <- GET(url)

# Check if the request was successful
if (status_code(response) == 200) {
  # Parse the JSON content
  available_translations <- fromJSON(content(response, "text"))
  
  # Print the available translations
  print("The API has the following translations:")
  print(available_translations)
} else {
  # Print error message if the request fails
  print(paste("Error:", status_code(response), content(response, "text", encoding = "UTF-8")))
}

