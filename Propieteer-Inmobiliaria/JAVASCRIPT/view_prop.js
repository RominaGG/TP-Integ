const propiedadesView = Vue.createApp({
    data() {
      return {
        propiedades: [],
        // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url: "https://rominagg.pythonanywhere.com/propiedades", // si ya lo subieron a pythonanywhere
        error: false,
        loading: true,
        /*atributos para el guardar los valores del formulario */
        idPropiedad: 0,
        tipo: "",
        descripcion: "",
        ambientes: "",
        direccion: "",
        provincia: "",
        precio: 0,
        imagen: "",
        propietario: "",
        tel_contacto: "",
        mail_contacto: "",
      };
    },
    methods: {
      fetchData(url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(this.url);
            this.propiedades = data;
            console.log(data);
            this.loading = false;
          })
          .catch((err) => {
            console.error(err);
            this.error = true;
          });
      },
      
    },
    created() {
      this.fetchData(this.url);
    },
  }).mount("#view_prop");