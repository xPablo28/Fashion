// Google API Configuration
const GOOGLE_API_KEY = 'AIzaSyBmF8QLbHN6Pq3xf9fR0iijfkrML0-aGB8'; // Replace with your API Key
const SEARCH_ENGINE_ID = 'b2ffe81019b28493a'; // Replace with your Custom Search Engine ID

document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload');
    const analyzeButton = document.getElementById('analyze-btn');
    const suggestionsDiv = document.getElementById('suggestions');
    const styleSuggestionsDiv = document.getElementById('style-suggestions');
    const generateStyleButton = document.getElementById('generate-style');

    // Show Section Function
    window.showSection = (sectionId) => {
        const sections = document.querySelectorAll('main section');
        sections.forEach(section => (section.style.display = 'none'));
        document.getElementById(sectionId).style.display = 'block';
    };

    // Analyze Image Uploads for Style Analysis
    if (analyzeButton) {
        analyzeButton.addEventListener('click', async () => {
            suggestionsDiv.innerHTML = '<p>Analyzing your outfit... Please wait.</p>';
            const files = uploadInput.files;

            if (files.length === 0) {
                alert('Please upload an image!');
                suggestionsDiv.innerHTML = '';
                return;
            }

            for (const file of files) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const imgUrl = event.target.result;

                    // Display uploaded image
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.className = 'uploaded-image';
                    suggestionsDiv.appendChild(img);

                    // Simulate Dress Analysis Result (Replace with actual API if available)
                    const analysisResult = await analyzeDress(imgUrl);
                    if (analysisResult) {
                        const { color, pattern, style } = analysisResult;
                        fetchSuggestionsWithContact(color, pattern, style, suggestionsDiv);
                    } else {
                        suggestionsDiv.innerHTML = '<p>Unable to analyze. Try another image.</p>';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Generate Event Style Suggestions
    if (generateStyleButton) {
        generateStyleButton.addEventListener('click', async () => {
            const eventType = document.getElementById('eventType').value || 'general';
            const colorPreference = document.getElementById('colorPreference').value || 'neutral';

            styleSuggestionsDiv.innerHTML = '<p>Loading recommendations...</p>';
            const queries = [
                `${eventType} ${colorPreference} stylish fashion outfit ideas`,
                `${eventType} ${colorPreference} trendy event fashion`
            ];
            styleSuggestionsDiv.innerHTML = ''; // Clear existing suggestions

            for (const query of queries) {
                const data = await fetchFromGoogleAPI(query);
                if (data.items) {
                    data.items.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'feedback-card';
                        card.innerHTML = `
                            <img src="${item.pagemap?.cse_image?.[0]?.src || item.link}" alt="${item.title}">
                            <h3>${item.title}</h3>
                            <p>Perfect for: ${eventType}</p>
                            <a href="${item.link}" target="_blank">View Product</a>
                            <a href="${item.pagemap?.cse_image?.[0]?.contextLink || '#'}" target="_blank" class="contact-link">
                                Contact Designer
                            </a>
                        `;
                        styleSuggestionsDiv.appendChild(card);
                    });
                }
            }

            if (!styleSuggestionsDiv.hasChildNodes()) {
                styleSuggestionsDiv.innerHTML = '<p>No recommendations found. Try a different query.</p>';
            }
        });
    }
});

// Simulate Dress Analysis (Mocked Example)
async function analyzeDress(imageSrc) {
    console.log('Analyzing:', imageSrc);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                color: 'blue', // Example: Blue
                pattern: 'striped', // Example: Striped
                style: 'modern casual' // Example: Modern Casual
            });
        }, 1500); // Simulated API delay
    });
}

// Fetch Suggestions from Google Custom Search API and Include Designer Contact Links
async function fetchSuggestionsWithContact(color, pattern, style, targetDiv) {
    const queries = [
        `${color} ${pattern} ${style} stylish fashion ideas`,
        `${style} fashion for ${color}`
    ];

    for (const query of queries) {
        const data = await fetchFromGoogleAPI(query);
        if (data.items) {
            data.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'feedback-card';
                card.innerHTML = `
                    <img src="${item.pagemap?.cse_image?.[0]?.src || item.link}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>Style: ${style} (${color}, ${pattern})</p>
                    <a href="${item.link}" target="_blank">View Product</a>
                    <a href="${item.pagemap?.cse_image?.[0]?.contextLink || '#'}" target="_blank" class="contact-link">
                        Contact Designer
                    </a>
                `;
                targetDiv.appendChild(card);
            });
        }
    }

    if (!targetDiv.hasChildNodes()) {
        targetDiv.innerHTML = '<p>No recommendations found. Try another image or query.</p>';
    }
}

// Fetch Data from Google Custom Search API
async function fetchFromGoogleAPI(query) {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&searchType=image&num=5`;
    const response = await fetch(url);
    if (!response.ok) {
        console.error('Failed to fetch data from Google API:', response.statusText);
        return {};
    }
    return await response.json();
}
