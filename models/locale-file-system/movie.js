// import movies from './movies.json' with {type: 'json'}  esta es una opion de como importar el json
//pero algunas formas correctas son las siguientes:
import { randomUUID } from "node:crypto";
import fs from "node:fs";
const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8")); //esto es correcto
// aunque tambien podemos crear un require de la siguiente manera:
/* esta es la forma recomendada a dia de hoy.
   import {createRequire} from 'node:module'
   const require = createRequire(import.meta.url)
   const movies = require('./movies.json')
*/

export class MovieModel {
   static async getAll ({ genre }) {
      if (genre) {
      return movies.filter((movie) =>
            movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
      }
      return movies;
   }

   static async getById({id}){
      const movie=movies.find(movie=>movie.id===id)
      return movie
   }

   static async create(input){
      const newMovie={
         id: randomUUID(),
         ...input
      }
      movies.push(newMovie)
      return newMovie
   }

   static async delete({id}){
      const movieIndex=movies.findIndex(movie=>movie.id===id)
      if(movieIndex===-1) return false

      movies.splice(movieIndex,1)
      return true
   }

   static async update({id,input}){
      const movieIndex=movies.findIndex(movie=>movie.id===id)
      if(movieIndex===-1) return false
      movies[movieIndex]={
         ...movies[movieIndex],
         ...input
      }
      return movies[movieIndex]
   }
}