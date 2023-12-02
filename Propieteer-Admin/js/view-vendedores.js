const vendedoresView = Vue.createApp({
    data() {
      return {
        vendedores:[],
        // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'https://marconu2697.pythonanywhere.com/vendedores',   // si ya lo subieron a pythonanywhere
        error:false,
        /*atributos para el guardar los valores del formulario */
        apellido:"",
        idVendedor:0, 
        imagen:"",
        mail:"",
        matricula:"",
        nombre:"",
        profesion:"",
        sueldo:0,
        telefono:0,
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
                })
                .catch(err => {
                    console.error(err)
                    this.error=true              
                })
        },
        //  estos metodos hay que cambiarlos para la tabla vendedors
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let producto = {
                nombre:this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen:this.imagen
                // agrear los campos de la tabla (datos)
            }
            var options = {
                body:JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./base.html";  // recarga base donde se ven las tablas
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