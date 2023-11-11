/**
 * @returns {Promise<Object>} Quote information
 */
const fetchQuote = async() => { // this function is async and returns a promise of an object.
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes'); // petición a la API de Breaking Bad Quotes. returns a promise of a response object.
    const data = await response.json(); // convert response object to JSON. returns a promise of an object.
    return data; // return data
}

export const BreakingBadComponent = async(element) => { 
    document.querySelector('#title').innerHTML = 'BreakingBad App';
    const loading = document.createElement('p');
    const button = document.createElement('button');
    const labelQuote = document.createElement('blockquote');
    const labelAuthor = document.createElement('blockquote');
    button.innerText = 'Next Quote';
    
    const renderQuote = ([data]) => {
        loading.innerHTML = 'Loading...';
        setTimeout(() => {
            loading.innerHTML = '';
            labelQuote.innerHTML = data.quote;
            labelAuthor.innerHTML = `<h2>${data.author}</h2>`;
        }, 1000);
        element.replaceChildren(loading, labelQuote, labelAuthor, button);
    }

    button.addEventListener('click', async() => {
        loading.innerHTML = 'Loading...';
        labelQuote.innerHTML = '';
        labelAuthor.innerHTML = '';
        renderQuote (await fetchQuote());
    })

    fetchQuote()
        .then(renderQuote)
}