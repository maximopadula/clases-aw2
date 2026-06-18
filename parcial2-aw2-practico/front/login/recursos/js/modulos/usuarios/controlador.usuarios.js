// Orquestar el proceso de inicio de sesion y manejo del formulario en el cliente
export function iniciarLogin() {
    const formLogin = document.getElementById("form-login");
    const pError = document.getElementById("mensaje-error");

    if (!formLogin || !pError) {
        console.error("No se encontraron los elementos 'form-login' o 'mensaje-error' en el DOM.");
        return;
    }

    // Escuchar el evento de envio del formulario de login
    formLogin.addEventListener("submit", async (evento) => {
        // Prevenir el envio por defecto del formulario
        evento.preventDefault();
        
        const usuarioInput = document.getElementById("usuario");
        const passwordInput = document.getElementById("password");

        if (!usuarioInput || !passwordInput) {
            console.error("No se encontraron los inputs de usuario o contrasena en el DOM.");
            return;
        }

        const usuario = usuarioInput.value;
        const password = passwordInput.value;

        // Limpiar el texto de error anterior
        pError.textContent = "";

        try {
            // Enviar la peticion HTTP POST con las credenciales
            const respuesta = await fetch("/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ usuario, password })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                // Redirigir al usuario a la interfaz protegida de cohetes
                window.location.href = "/";
            } else {
                // Mostrar el mensaje de error devuelto por la API
                pError.textContent = datos.mensaje || "Credenciales incorrectas";
            }
        } catch (error) {
            console.error("Fallo la peticion fetch:", error);
            pError.textContent = "Error de conexion con el servidor.";
        }
    });
}
