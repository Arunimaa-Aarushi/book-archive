const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container');
const error = document.getElementById('error');
const results = document.getElementById('results');




searchBtn.addEventListener('click', function () {
    const search = searchInput.value;
    searchInput.value = '';
    if (search === '') {
        error.innerText = 'SEARCH FIELD CANNOT BE VACANT';
        return;
    }
    bookContainer.innerHTML = '';
    results.innerText = '';

    const url = `https://openlibrary.org/search.json?q= ${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));

    const displayBooks = (data) => {
        if (data.numFound === 0) {
            error.innerText = 'NO RESULTS FOUND'
        }
        else {
            error.innerText = ''
        }


        const items = data.docs
        const totalResults = items.length;

        items.forEach(items => {

            results.innerText = `${totalResults} results found`
            const div = document.createElement('div')
            div.classList.add('col-md-3')
            div.innerHTML = `
        <div class="card h-100 m-5">
        <img src="https://covers.openlibrary.org/b/id/${items.cover_i}-M.jpg" class="card-img-top p-5" alt="..." >
        <div class="card-body">

        <h2 class= "text-center" >${items.title}</h2>
        </div>

        <div class= "text-center" >
        <h4 class="fw-bold text-danger"> ${items.author_name}</h4>
        <br>
        <h5 class="">First Published in ${items.first_publish_year}</h5>
        <p>Publisher: <span class="text-primary">${items.publisher}</span>
        </p>
        </div>
        </div>
        `
            bookContainer.appendChild(div);
        });
    }
});