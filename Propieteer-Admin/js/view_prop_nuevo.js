const propiedadesView = Vue.createApp({
  data() {
    return {
      propiedades: [],
      // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
      url: "https://rominagg.pythonanywhere.com/propiedades", // si ya lo subieron a pythonanywhere
      error: false,

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
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    //  estos metodos hay que cambiarlos para la tabla vendedors
    eliminar(idPropiedad) {
      const isConfirmed = window.confirm(
        "¿Estás seguro de que quieres eliminar este registro?"
      );

      if (isConfirmed) {
        const url = this.url + "/" + idVendedor;
        var options = {
          method: "DELETE",
        };
      }
      fetch(url, options)
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          alert("Registro Eliminado");
          location.reload(); // recarga el json luego de eliminado el registro
        });
    },

    grabar() {
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
        mail_contacto: this.mail_contacto,
        // agrear los campos de la tabla (datos)
      };
      var options = {
        body: JSON.stringify(propiedad),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado");
          window.location.href = "./propiedades.html"; // recarga base donde se ven las tablas
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar"); // puedo mostrar el error tambien
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#propiedadesView");
