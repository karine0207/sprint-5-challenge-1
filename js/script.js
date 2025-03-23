const listaUsuarios = document.getElementById("listaUsuarios");
const usuarios = [];

function optenerDatosApi() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no fue existosa');
        }
        return response.json();
       })
      
      .then((data) => {
        //console.log(data) (muestra los datos del response anterior)

       
        data.forEach((usuario) => {
            
            const { id, name, ...rest} = usuario;
           
            const objetoUsuario  = {
                id: usuario.id,
                name: usuario.name,
                username: usuario.username,
                phone: usuario.phone,
                email: usuario.email, 
                company: usuario.company.name,
                address: usuario.address,
            }
            //console.log(objetoUsuario) muestro los datos que tiene el objeto usuario 

            const objetoUsuarioExtras  = {
                ...objetoUsuario,
               age:generarEdadAleatoria(), 
               img: `./assets/img/${usuario.id}.jpeg`, 
               address:`${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}`
            }
            //console.log(objetoUsuarioExtras) muestra los datos que tiene usuarios extras y los datos del usuario de arriba 

            usuarios.push(objetoUsuarioExtras);
            console.log(usuarios)
           

            
        });
        mostrasDatosArr();
    })
    .catch(error => {
        console.error("Error fetching characters:", error);
    });
  }

optenerDatosApi(); 

  
function generarEdadAleatoria() {
    return Math.floor(Math.random() * (65 - 18 + 1)) + 18;
}

function mostrasDatosArr () {
    usuarios.forEach((usuario) => {
        listaUsuarios.innerHTML +=`
            <li >
              <p><strong>Nombre:</strong> ${usuario.name}</p>
              <p><strong>Edad:</strong> ${usuario.age}</p>
              <p><strong>Username:</strong> ${usuario.username}</p>
              <p><strong>telefono:</strong> ${usuario.phone}</p>
              <p><strong>email:</strong> ${usuario.email}</p>
              <p><strong>Compañia:</strong> ${usuario.company}</p>
              <p><strong>direccion:</strong> ${usuario.address}</p>
              <img src="${usuario.img}" alt="imagen del${usuario.name}">
             </li>
            `;
         
    })
}




  