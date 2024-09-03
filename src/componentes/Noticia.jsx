import { useState, useEffect } from "react";

function Noticia() {

  // hook das noticias
  const [noticia, setNoticia] = useState(null);

  // useEffect que dá request pras "noticias"
  useEffect(() => {

    // função de requisição das noticias
    const mudarNoticia = async () => {

      // pra deixar aleatorio (só pra tentar não repetir)
      const num = Math.ceil(Math.random() * 10);
      console.log(num);

      // a magia
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`);
      const dadosNoticia = await response.json();
      setNoticia(dadosNoticia);

    };

    // timer pra mudar as noticias a cada 30 segundos
    const timerId = setInterval(() => {
        mudarNoticia();
    }, 3000);


    // sempre que desmontar: resetar
    // as noticias e o timer
    // (ou resetando no inicio)
    return() => {
        setNoticia(null)
        clearInterval(timerId)
    }
  }, []);

  return (
    <div>
      {noticia ? (
        <>
          <h1>{noticia.id}</h1>
          <h2>{noticia.name}</h2>
          <p>{noticia.email}</p>
        </>
      ) : (
        <h2>Sem noticia</h2>
      )}
    </div>
  );
}

export default Noticia;
