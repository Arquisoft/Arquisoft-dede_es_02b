Feature: Registering a new user

Scenario: El usuario no esta registrado
  Given Un usuario no registrado
  When Rellenamos el formulario de registro
  Then Nos redirige correctamente a la ventana de productos
