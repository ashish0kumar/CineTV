//* CineTV web app using TMDB API

const mainContainer = document.querySelector(".mainContainer");
const searchContainer = document.querySelector("#searchResults");


//* Used to make simple API request

async function makeRequest(inpQuery, container) {

    try {
        const config = {
            headers: {
                accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTdlYzk1YzM3YzM0MGNlNWNjMTJiYmQ5NWE2MjAyYiIsInN1YiI6IjY1YzUxMTE2NmRjNTA3MDE2M2ZjYTgwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCoPtyYwvkvKG3tgBNgHXxvgUJFUwPfxHRhpWp1ZSTk"
            }
        }

        const res = await axios.get(`https://api.themoviedb.org/3/${inpQuery}`, config);

        addPosters(res.data, container);

    } catch (e) {
        console.log("Error", e);
    }
}


//* Used to make filtered API request (filters are genre & country)

async function discover(media, filter, container) {

    try {
        let config;

        if (typeof filter === "string") {

            config = {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTdlYzk1YzM3YzM0MGNlNWNjMTJiYmQ5NWE2MjAyYiIsInN1YiI6IjY1YzUxMTE2NmRjNTA3MDE2M2ZjYTgwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCoPtyYwvkvKG3tgBNgHXxvgUJFUwPfxHRhpWp1ZSTk"
                },
                params: {
                    with_origin_country: filter
                }
            }

        } else {
            config = {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTdlYzk1YzM3YzM0MGNlNWNjMTJiYmQ5NWE2MjAyYiIsInN1YiI6IjY1YzUxMTE2NmRjNTA3MDE2M2ZjYTgwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCoPtyYwvkvKG3tgBNgHXxvgUJFUwPfxHRhpWp1ZSTk"
                },
                params: {
                    with_genres: filter
                }
            }
        }

        const res = await axios.get(`https://api.themoviedb.org/3/discover/${media}`, config);

        addPosters(res.data, container);

    } catch (e) {
        console.log("Error", e);
    }
}


//* Search handler

const form = document.querySelector("#searchForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();
    window.scrollTo({ top: 0 }); //* resets scroll position

    try {
        const searchTerm = form.elements.query.value;
        const config = {
            headers: {
                accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTdlYzk1YzM3YzM0MGNlNWNjMTJiYmQ5NWE2MjAyYiIsInN1YiI6IjY1YzUxMTE2NmRjNTA3MDE2M2ZjYTgwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCoPtyYwvkvKG3tgBNgHXxvgUJFUwPfxHRhpWp1ZSTk"
            },
            params: {
                query: searchTerm
            }
        }

        const res = await axios.get(`https://api.themoviedb.org/3/search/multi`, config);


        form.elements.query.value = "";
        searchContainer.classList.remove("hidden");

        reset();
        const searchHeading = document.querySelector("#searchHeading");
        searchHeading.innerHTML = `Search results for "${searchTerm}"`;

        addPosters(res.data, searchContainer);

        if (searchContainer.childElementCount === 0) {
            searchHeading.innerHTML = `Oops! No results found for "${searchTerm}"<br>Please try refining your search criteria or explore our featured shows for more options.`;
        }

    } catch (e) {
        console.log("Error", e);
    }
})


//* Used to add posters of movies & shows

function addPosters(obj, container) {

    for (let result of obj.results) {

        if (container === slidesContainer) {
            if (result.backdrop_path) {
                const img = document.createElement("img");
                img.src = `https://image.tmdb.org/t/p/original/${result.backdrop_path}`;

                const title = document.createElement("div");

                if (result.name) {
                    title.innerHTML = result.name;

                } else if (result.title) {
                    title.innerHTML = result.title;
                }

                const card = document.createElement("div");

                card.append(img);
                card.append(title);
                title.style.transform = "translate(20px, -50px)";
                card.classList.add("card");

                container.append(card);
            }

        } else {

            if (result.poster_path) {
                const img = document.createElement("img");
                img.src = `https://image.tmdb.org/t/p/original/${result.poster_path}`;

                const title = document.createElement("div");
                const rating = result.vote_average.toFixed(1);

                if (result.name) {
                    title.innerHTML = `${result.name}<br><i class="fa-solid fa-star"></i> <p id="rating">${rating}</p>`;

                } else if (result.title) {
                    title.innerHTML = `${result.title}<br><i class="fa-solid fa-star"></i> <p id="rating">${rating}</p>`;
                }

                const card = document.createElement("div");

                card.append(img);
                card.append(title);
                card.classList.add("card");

                container.append(card);
            }
        }
    }
}


//* Used to remove all the contents of current page so that new content can be added

function reset() {

    const headings = document.querySelectorAll(".containerHeading");
    for (let heading of headings) {
        heading.remove();
    }

    const cards = document.querySelectorAll(".card");
    for (let card of cards) {
        card.remove();
    }

    const scrollcontainers = document.querySelectorAll(".scrollContainer");
    for (let container of scrollcontainers) {
        container.remove();
    }
}


//* Making requests to get content and then adding content into their respective containers

const slidesContainer = document.querySelector("#slidesContainer");
makeRequest("trending/all/week", slidesContainer);

const trendingShowsContainer = document.querySelector("#trendingShows");
makeRequest("trending/tv/week", trendingShowsContainer);

const newMoviesContainer = document.querySelector("#newMovies");
makeRequest("movie/now_playing", newMoviesContainer);

const airingShowsContainer = document.querySelector("#airingShows");
makeRequest("tv/airing_today", airingShowsContainer);

const ratedMoviesContainer = document.querySelector("#ratedMovies");
makeRequest("movie/top_rated", ratedMoviesContainer);

const ratedShowsContainer = document.querySelector("#ratedShows");
makeRequest("tv/top_rated", ratedShowsContainer);

const indMoviesContainer = document.querySelector("#indMovies");
discover("movie", "IN", indMoviesContainer);

const indShowsContainer = document.querySelector("#indShows");
discover("tv", "IN", indShowsContainer);

const warMoviesContainer = document.querySelector("#warMovies");
discover("movie", 10752, warMoviesContainer);

const crimeShowsContainer = document.querySelector("#crimeShows");
discover("tv", 80, crimeShowsContainer);

const romaticMoviesContainer = document.querySelector("#romanticMovies");
discover("movie", 10749, romaticMoviesContainer);

const horrorMoviesContainer = document.querySelector("#horrorMovies");
discover("movie", 27, horrorMoviesContainer);


//* Handling all genre buttons 

const scifiBtn = document.querySelector(".scifi");
scifiBtn.addEventListener("click", () => {
    reset();
    const searchHeading = document.querySelector("#searchHeading")
    searchHeading.innerHTML = `Sci-Fi & Fantasy`;
    searchContainer.classList.remove("hidden");
    discover("movie", 878, searchContainer);
    discover("tv", 10765, searchContainer);
})

const animatedBtn = document.querySelector(".animated");
animatedBtn.addEventListener("click", () => {
    reset();
    const searchHeading = document.querySelector("#searchHeading")
    searchHeading.innerHTML = `Kids & Family`;
    searchContainer.classList.remove("hidden");
    discover("movie", 16, searchContainer);
    discover("tv", 16, searchContainer);
})

const dramaBtn = document.querySelector(".drama");
dramaBtn.addEventListener("click", () => {
    reset();
    const searchHeading = document.querySelector("#searchHeading")
    searchHeading.innerHTML = `Drama Films & Series`;
    searchContainer.classList.remove("hidden");
    discover("movie", 18, searchContainer);
    discover("tv", 18, searchContainer);
})

const comedyBtn = document.querySelector(".comedy");
comedyBtn.addEventListener("click", () => {
    reset();
    const searchHeading = document.querySelector("#searchHeading")
    searchHeading.innerHTML = `Comedy Films & Series`;
    searchContainer.classList.remove("hidden");
    discover("movie", 35, searchContainer);
    discover("tv", 35, searchContainer);
})

const documentaryBtn = document.querySelector(".documentary");
documentaryBtn.addEventListener("click", () => {
    reset();
    const searchHeading = document.querySelector("#searchHeading")
    searchHeading.innerHTML = `Non-Fiction Films & Series`;
    searchContainer.classList.remove("hidden");
    discover("movie", 99, searchContainer);
    discover("tv", 99, searchContainer);
})


//* Used to automatically scroll the flyer

let scrollAmt;

if (window.innerWidth < 670) {
    scrollAmt = 380; //* for small screen sizes

} else {
    scrollAmt = 540;
}

function scroll() {

    if (slidesContainer.scrollLeft + slidesContainer.clientWidth === slidesContainer.scrollWidth) {
        slidesContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
        });

    } else {
        slidesContainer.scrollTo({
            left: slidesContainer.scrollLeft + scrollAmt,
            behavior: 'smooth'
        });
    }
}

setInterval(scroll, 6000);


//* Scroll to "Browse by Category" on clicking search input

const searchInp = document.querySelector("#searchForm input");
const genreContainerHeading = document.querySelector("#genreContainerHeading");

searchInp.addEventListener("click", () => {
    genreContainerHeading.scrollIntoView({ behavior: "smooth" });
})