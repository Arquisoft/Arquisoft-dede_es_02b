Feature: Pay in shooping: Empty form

  Scenario: El usuario quiere comprar
  Given Un usuario no introduce datos
  When No rellanamos el formulario de compra
  Then No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar


Feature: Pay in shooping: Incomplete form

  Scenario: El usuario quiere comprar
    Given Un usuario no introduce datos
    When No rellena uno de los campos del formulario
    Then No nos deja realizar la compra y se nos indica el campo a rellenar


Feature: Pay in shooping: Incorrect Date

  Scenario: El usuario quiere comprar
    Given Un usuario tiene la tarjea de credito caducada
    When No rellanamos el formulario de compra
    Then No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar


Feature: Pay in shooping: Incorrect Credit Card

  Scenario: El usuario quiere comprar
    Given Un usuario tiene la tarjeta de credito caduca
    When Indica que la fecha de caducidad de la tarjeta es anterior a la fecha actual
    Then No nos deja realizar la compra y nos indica que la tarjeta está caducada


Feature: Pay in shooping: All form correct

  Scenario: El usuario quiere comprar
    Given Un usuario indica sus datos correctamente
    When Rellanamos el formulario de compra correctamente
    Then Nos deja realizar la compra y se nos realiza el pedido