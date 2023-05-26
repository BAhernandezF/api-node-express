Un proyecto personal basado en la aquitectura de Node.js y utilizando express para realizar una API rest, utilizando Mysql y virtual  enviroment.

los endpoints creados de momento son: <br />
***Clientes*** <br />
*/api/clientes/ (implementado, revisar cosdigo para tener referencia) <br />
*/api/clientes/1 (implementado, revisar cosdigo para tener referencia) <br />
*/api/clientes/put/1 (implementado, revisar cosdigo para tener referencia) <br />
*/api/clientes/post (implementado, revisar cosdigo para tener referencia) <br />
*/api/clientes/delete (no implementado) <br />

***Auth*** <br />

*/api/usuarios/registro (implementado) con middleware para verificar campos vacios<br />
*/api/usuarios/login (implementado, falta ir mejorando) <br />
*/api/usuarios/pruebauser (implementado, para testear el middleware de verificacion jwt) <br />
*/api/usuarios/perfil/:id (implementado, pero sin funcion completa, utiliza auth jwt y devuelve usuarios de bd mysql) <br />

***JWT*** <br />
implementando funcional<br />
