import { MovieModel } from "../models/locale-file-system/movie.js";
import { validateMovie, validatePartialMovie } from '../schema/movies.js'

export class MovieController{
   static async getAll (req, res)  {
      const { genre } = req.query; //.query se utiliza para valores que se pasan como parte de la cadena de consulta (filtros o criterios de búsqueda).
      const movies = await MovieModel.getAll({genre})
      res.json(movies);
   }

   static async getById(req, res) {
      const { id } = req.params; //.params se utiliza para valores en la ruta de la url para identificar algo
      const movie = await MovieModel.getById({id})
      if (movie) return res.json(movie);
      res.status(404).json({ message: "Movie not found" });
      console.log("alguien ha solitado la pelicula" + movie.title);
   }

   static async create(req, res){
      const result = validateMovie(req.body);
      if (!result.success) {
         // 422 Unprocessable Entity
         return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      const newMovie=await MovieModel.create(result.data)
      res.status(201).json(newMovie);
   }

   static async delete(req, res) {
      const {id} = req.params
      const result=await MovieModel.delete({id})
   
      if(result===false){
         return res.status(404).json({message: 'movie not found'})
      }
      return res.json({message: 'movie deleted'})
   }

   static async update (req, res) {
      const result = validatePartialMovie(req.body)
  
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
  
      const { id } = req.params
  
      const updatedMovie = await MovieModel.update({ id, input: result.data })
  
      return res.json(updatedMovie)
    }
}