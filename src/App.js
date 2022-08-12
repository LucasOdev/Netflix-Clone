import React, {useEffect, useState} from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
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

      console.log(chosenInfo)
      
    }
    loadAll();
  }, [])
  return (
    <div className="page">
      { FeaturedData &&
      <FeaturedMovie item={FeaturedData}/>}
      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}