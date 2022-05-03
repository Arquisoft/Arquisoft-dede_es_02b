Feature: Loggin a user

Scenario: The user is not logged in the site
  Given An registered user
  When I fill the data in the form and press submit
  Then The products page should be shown

Feature: Using shopping cart

Scenario: The shopping cart is empty
  Given An empty cart
  When I add some products in the cart
  Then The products should appear in the cart window
  