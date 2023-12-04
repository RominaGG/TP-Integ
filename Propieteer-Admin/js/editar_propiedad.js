console.log(location.search);     // lee los argumentos pasados a este formulario
// location.search.substr(12)  // producto_update.html?id=1

// console.log(location.search); // reads the arguments passed to this form
const params = new URLSearchParams(location.search);
const id = params.get('idPropiedad'); // assuming the URL is like editarVendedor.html?idVendedor=1
console.log(id);

const { createApp } = Vue
createApp({
    data() {
      return {
        error: false,
        idPropiedad:0,
        tipo:"",
        descripcion:"",
        ambientes:"",
        direccion:"",
        provincia:"",
        precio:0,
        imagen:"", 
        propietario:"",
        tel_contacto:"",
        mail_contacto:"",
        url:'https://rominagg.pythonanywhere.com/propiedades/' + id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    console.log('API Response:', data);
                    if (Object.keys(data).length === 0) {
                        // Handle empty response, e.g., display a message
                        console.log('Empty response received');
                    } else {
                        console.log(data)
                        this.idPropiedad = data.idPropiedad
                        this.tipo = data.tipo
                        this.descripcion = data.descripcion
                        this.ambientes = data.ambientes
                        this.direccion = data.direccion
                        this.provincia = data.provincia
                        this.precio = data.precio
                        this.imagen = data.imagen
                        this.propietario = data.propietario
                        this.tel_contacto = data.tel_contacto
                        this.mail_contacto = data.mail_contacto
                    }
                })
                .catch(err => {
                    console.error(err)
                    this.error = true
                })
        },
        modificar() {
            let propiedad = {
                tipo: this.tipo,
                descripcion: this.descripcion,
                ambientes: this.ambientes,
                direccion: this.direccion,
                provincia: this.provincia,
                precio: this.precio,
                imagen: this.imagen,
                propietario: this.propietario,
                tel_contacto: this.tel_contacto,
                mail_contacto: this.mail_contacto

            }
            var options = {
                body: JSON.stringify(propiedad),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./propiedades.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }

    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#appeditar2')