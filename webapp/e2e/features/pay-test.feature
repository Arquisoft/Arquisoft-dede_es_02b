Feature: Pay in shooping

  Scenario: Empty form
    Given Un usuario no introduce datos
    When No rellanamos el formulario de compra
    Then No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar

  Scenario: Incorrect Date
    Given Un usuario tiene la tarjea de credito caducada
    When No rellanamos el formulario de compra
    Then No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar

  Scenario: All form correct
    Given Un usuario indica sus datos correctamente
    When Rellanamos el formulario de compra correctamente
    Then Nos deja realizar la compra y se nos realiza el pedido