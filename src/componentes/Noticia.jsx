import { useState, useEffect } from "react";

function Noticia() {
  // hook das noticias
  const [noticia, setNoticia] = useState(null);

  // pra atualizar noticias individualmente
  // não sei se tinha outra forma, mas funcionou!
  const [atualizar, Atualizador] = useState(null);



  // função de requisição das noticias
  const mudarNoticia = async () => {
    // pra deixar aleatorio (só pra tentar não repetir)
    const num = Math.ceil(Math.random() * 10);
    console.log(num);

    // a magia
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${num}`
    );
    const dadosNoticia = await response.json();
    setNoticia(dadosNoticia);
  };



  // useEffect que dá request pras "noticias"
  useEffect(() => {
    // timer pra mudar as noticias a cada 30 segundos
    const timerId = setInterval(() => {
      mudarNoticia();
    }, 30000);

    // sempre que desmontar: resetar
    // as noticias e o timer
    // (ou resetando no inicio)
    return () => {
      setNoticia(null);
      clearInterval(timerId);
      mudarNoticia();
    };
  }, [atualizar]);



  // atualizando noticias individualmente
  const atualizarNoticia = () => {
    Atualizador((prev) => prev + 1);
  };

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

      <button onClick={atualizarNoticia}>Atualizar a noticia</button>
    </div>
  );
}

export default Noticia;
