Feature: Using shopping cart

Scenario: The shopping cart is empty
  Given An registered user
  When I fill the data in the form and press submit
  Then The products page should be shown
  