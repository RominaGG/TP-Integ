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
        
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#view_vend')