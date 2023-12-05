const vendedoresView = Vue.createApp({
    data() {
        return {
            vendedores: [],
            // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
            url: 'https://rominagg.pythonanywhere.com/vendedores',   // si ya lo subieron a pythonanywhere
            error: false,
            loading: true,
            /*atributos para el guardar los valores del formulario */
            apellido: "",
            idVendedor: 0,
            imagen: "",
            mail: "",
            matricula: "",
            nombre: "",
            profesion: "",
            sueldo: 0,
            telefono: 0,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(this.url)
                    this.vendedores = data
                    console.log(data)
                    this.loading = false
                })
                .catch(err => {
                    console.error(err)
                    this.error = true
                })
        },
        //  estos metodos hay que cambiarlos para la tabla vendedors
        eliminar(idVendedor) {
            const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este registro?');

            if (isConfirmed) {
                const url = this.url + '/' + idVendedor;
                var options = {
                    method: 'DELETE',
                };

                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        alert('Registro Eliminado');
                        location.reload(); // recarga el json luego de eliminado el registro
                    })
                    .catch(error => {
                        console.error('Error al eliminar:', error);
                    });
            }
        },

        grabar() {
            let vendedor = {
                apellido: this.apellido,
                nombre: this.nombre,
                matricula: this.matricula,
                profesion: this.profesion,
                mail: this.mail,
                telefono: this.telefono,
                sueldo: this.sueldo,
                imagen: this.imagen
                // agrear los campos de la tabla (datos)
            }
            var options = {
                body: JSON.stringify(vendedor),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./vendedores.html";  // recarga base donde se ven las tablas
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#view_vendedores')