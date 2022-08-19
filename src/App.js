import React, {useEffect, useState} from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)
  useEffect (() => {
    const loadAll = async () => {
      /*pegando as listas */
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      /*pegar filme em destaque*/
      let originals = list.filter(i=>i.slug === 'originals');
      /*gerar um aleatorio para destaque*/
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      /* pegar filme escolhido*/
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo)
      
      
    }
    loadAll();
  }, [])

    /*manipulando o header */
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
  },[])
  return (
    <div className="page">

      <Header black={blackHeader}/>
      { FeaturedData &&
      <FeaturedMovie item={FeaturedData}/>}
      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por LucasOdev<br/>
        Direitos de imagem para Netflix<br/>
        API usada do site Themoviedb.org<br/>
      </footer>
        {movieList.length <= 0 && 
        <div className="loading">
        <img src="https://user-images.githubusercontent.com/10602045/67531205-616ef880-f6ca-11e9-92ef-3a30af44d5c2.gif" ></img>
      </div> }
      
    </div>
  );
}