# CineTV

CineTV is a frontend project for a movies/series searching website. It allows users to explore various genres of movies and series through sliders and scrolling containers. The data is fetched from The Movie Database (TMDB) API.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Home Page: Displays different genres of movies/series using sliders and scrolling containers.
- Genre Navigation: Users can easily navigate through different genres and explore content.
- Dynamic Content: Movie and series information is fetched from TMDB API, ensuring up-to-date content.
- Responsive Design: The website is designed to be accessible and usable across various devices.

## Technologies

- **HTML**: Structuring the web pages.
- **CSS**: Styling the user interface.
- **JavaScript**: Handling dynamic content and interactions.
- **TMDB API**: Fetching movie and series data.
- **Responsive Design**: Ensuring the website works well on different screen sizes.

## Installation

Since this is a frontend project, installation is simple:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ashish0kumar/CineTv.git
   cd CineTv
   ```

2. **Create config.js File:**
   - In the root of your project, create a file named config.js.
   - Add your TMDB API token to this file:
   <br>
   
   ```bash
   const api_token = "your_actual_api_token_here";
   ```

4. **Open `index.html` in your web browser**:
   ```bash
   open index.html
   ```

## Usage

1. Open your web browser and go to `index.html`.
2. Explore different genres of movies and series by navigating through sliders and scrolling containers.
3. Search and find your favorite movies and web series.

## Screenshots

![screenshot](/screenshots/1.png) <br> <br>
![screenshot](/screenshots/2.png) <br> <br>
![screenshot](/screenshots/3.png) <br> <br>
![screenshot](/screenshots/4.png) <br> <br>


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Submit a pull request.
