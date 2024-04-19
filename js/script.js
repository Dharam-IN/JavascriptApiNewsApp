const APIKEY = "e7b409e3a9e740e9b6ac6f656163c074";
// API = https://newsapi.org/v2/everything?q=tesla&from=2024-03-19&sortBy=publishedAt&apiKey=e7b409e3a9e740e9b6ac6f656163c074


// API Data Fetch Function
async function FetchData(query){
    const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=2024-03-19&sortBy=publishedAt&apiKey=${APIKEY}`);
    const data = await res.json();

    RenderData(data);
}

FetchData("tesla");


// Data Render

function RenderData(anshul){
    const myarticles = anshul.articles;
    console.log(myarticles);
    const MyRow = document.getElementById("MyDataRow");

    let data = "";

    myarticles.map((india) => {
        data+=`<div class="col-md-4 col-12">
                <div class="card">
                    <img src="${india.urlToImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${india.title}</h5>
                        <p class="card-text">${india.description}</p>
                        <a href="${india.url}" target="_blank" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>`
    })

    MyRow.innerHTML = data;

}
