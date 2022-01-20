import React, { useState, useEffect } from 'react'
import "./Row.css"
import axios from "../../axios"
import YouTube from 'react-youtube'
import movieTrailer from "movie-trailer"

const baseUrl = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(fetchUrl)
            setMovies(response.data.results)
            return response
        }
        fetchData()

    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleTrailer = (movie) => {
        console.log(movie?.name || movie?.original_title)
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.name || movie?.original_title || "")
            .then(url => {
                console.log(url)
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'))
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        onClick={() => handleTrailer(movie)}
                    />
                ))}
            </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
