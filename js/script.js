import envfile from "../env.js";

const { APIKEY } = envfile;

const truncateString = (str, numWords) => {
    const words = str.split(' ');
    const truncated = words.slice(0, numWords).join(' ');
    return truncated + (words.length > numWords ? '...' : '');
};

const fetchData = async (query) => {
    try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=2024-03-20&sortBy=publishedAt&apiKey=e44fada6650d45098fcd1ec7fb331602`);
    
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const renderArticles = (articles) => {
    const articleRow = document.getElementById("ArticleRow");
    let cards = "";
    articles.forEach(article => {
        const truncatedTitle = article.title ? truncateString(article.title, 10) : "";
        const truncatedDescription = article.description ? truncateString(article.description, 10) : "";
        cards += `<div class="col-md-4 col-sm-6 col-12">
                    <div class="card NewsCard">
                        <div class="NewsImgCard">
                            <img src="${article.urlToImage}" class="card-img-top NewsImg" alt="Card img">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${truncatedTitle}</h5>
                            <p class="card-text">${truncatedDescription}</p>
                            <a href="${article.url}" target="_blank" class="btn btn-primary">Visit Site</a>
                        </div>
                    </div>
                </div>`;
    });
    articleRow.innerHTML = cards;
};


const formSubmit = document.getElementById("formsubmit");

formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("myinput");
    const data = await fetchData(input.value);
    if (data) {
        renderArticles(data.articles);
    }
});

const select = async (query) => {
    const data = await fetchData(query);
    if (data) {
        renderArticles(data.articles);
    }
};

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", function() {
        const category = this.getAttribute("data-category");
        fetchData(category).then(data => {
            if (data) {
                renderArticles(data.articles);
            }
        });
    });
});

// Initial fetch
fetchData("tesla").then(data => {
    if (data) {
        renderArticles(data.articles);
    }
});
