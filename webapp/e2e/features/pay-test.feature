Feature: Pay in shooping: Empty form

  Scenario: Empty form
    Given Un usuario no introduce datos
    When No rellanamos el formulario de compra
    Then No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar
