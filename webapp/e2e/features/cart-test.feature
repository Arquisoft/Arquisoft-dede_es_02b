Feature: Using shopping cart

Scenario: The shopping cart is empty
  Given An empty cart
  When I add some products in the cart
  Then The products should appear in the cart window
  