import React, { useEffect, useState } from 'react'
import { TfiAlignJustify } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";
import axios from 'axios'
const Home = () => {

    const [movies, setMovies] = useState([]);
    const url = 'http://localhost:8080/api/v1/films'
    const [curPage, setCurPage] = useState(1);
    const moviesPerPage = 4;

    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(url);
                setMovies(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMovies();
    }, []);

    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const indexOfLastMovie = curPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handleNextPage = () => {
        if (curPage < totalPages) {
            setCurPage(curPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (curPage > 1) {
            setCurPage(curPage - 1);
        }
    }

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedMovie(null);
    }

    return (
        <div className="container">
            {!openModal && (
                <div className='frame'>
                    <div className='header'>
                        <TfiAlignJustify />
                        <div>MOVIE</div>
                        <IoSearch />
                    </div>
                    <div className="content">
                        <div className="title">Most Popular Movies</div>
                        <div className="movie-list">
                            {
                                currentMovies.map((movie) => (
                                    <div className="card" key={movie._id} onClick={() => handleOpenModal(movie)}>
                                        <img src={movie.image} alt="" />
                                        <div className="name">{movie.name}</div>
                                        <div className="information">
                                            <div>{movie.time} min</div>
                                            <div>{movie.year}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="pagination">
                            <button onClick={handlePrevPage} disabled={curPage === 1} >Pre</button>
                            <span>{curPage} / {totalPages}</span>
                            <button onClick={handleNextPage} disabled={curPage === totalPages}>Next</button>
                        </div>
                    </div>
                </div>
            )}
            {openModal && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={selectedMovie.image} alt={selectedMovie.name} />
                        <div className="info">
                            <h2>{selectedMovie.name}</h2>
                            <div className="details">
                                <span>{selectedMovie.time} min</span>
                                <span>{selectedMovie.year}</span>
                            </div>
                            <p>{selectedMovie.introduce}</p>
                            <button className="play-button">
                                <span>▶</span> Play Movie
                            </button>
                        </div>
                        <span className="close-modal" onClick={handleCloseModal}>x</span>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Home