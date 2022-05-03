Feature: Pay in shooping: Empty form

  Scenario: El usuario quiere comprar: Empty form
  Given Un usuario no introduce datos
  When No rellanamos el formulario de compra
  Then No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar


Feature: Pay in shooping: Incorrect Date

  Scenario: El usuario quiere comprar: Incorrect Date
    Given Un usuario tiene la tarjea de credito caducada
    When No rellanamos el formulario de compra
    Then No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar


Feature: Pay in shooping: All form correct

  Scenario: El usuario quiere comprar : All form correct
    Given Un usuario indica sus datos correctamente
    When Rellanamos el formulario de compra correctamente
    Then Nos deja realizar la compra y se nos realiza el pedido