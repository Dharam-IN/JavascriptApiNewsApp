const APIKEY = "e1044516e091486892a3b049236c1a4c";

async function FetchData(){
    const res = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-03-18&sortBy=publishedAt&apiKey=${APIKEY}`);
    const data = await res.json();
    Products(data)
    console.log(data)
}


function Products(articles){
    const ArticleRow = document.getElementById("ArticleRow");
    let cards = "";
    const myarticle = articles.articles;
    myarticle.map((article) => {
        cards+=`<div class="col-md-4 col-sm-6 col-12">
                    <div class="card">
                        <img src="${article.urlToImage}" class="card-img-top" alt="Card img">
                        <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>`
    })
    ArticleRow.innerHTML = cards;
}

FetchData();