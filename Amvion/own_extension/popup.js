// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("auditButton").addEventListener("click", function () {
//         const urlInput = document.getElementById("url");
//         const url = urlInput.value.trim();
        
//         if (!url) {
//             alert("Please enter a valid URL.");
//             return;
//         }

//         runSEOaudit(url);
//     });
// });

// function runSEOaudit(url) {
//     const resultsDiv = document.getElementById("result");
//     resultsDiv.innerHTML = `<p>Fetching data from <strong>${url}</strong>...</p>`;

//     const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

//     fetch(proxyUrl)
//         .then(response => response.json())
//         .then(data => {
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(data.contents, "text/html");

//             const title = doc.querySelector("title")?.innerText || "❌ No title found.";
//             const metaDescription = doc.querySelector("meta[name='description']")?.content || "❌ No meta description.";
//             const h1Tag = doc.querySelector("h1")?.innerText || "❌ No H1 tag found.";

//             const seoResults = {
//                 "Title Tag": title,
//                 "Meta Description": metaDescription,
//                 "H1 Tag": h1Tag 
//             };

//             displayResults(seoResults);
//         })
//         .catch(error => {
//             resultsDiv.innerHTML = `<p style="color:red;">❌ Error fetching data. Make sure the URL is valid and accessible.</p>`;
//             console.error("Error fetching SEO data:", error);
//         });
// }

// function displayResults(results) {
//     const resultsDiv = document.getElementById("result");
//     resultsDiv.innerHTML = "<h2>SEO Audit Results:</h2>";

//     for (const [key, value] of Object.entries(results)) {
//         const div = document.createElement("div");
//         div.classList.add("result-item");
//         div.innerHTML = `<strong>${key}:</strong> ${value}`;
//         resultsDiv.appendChild(div);
//     }
// }





document.addEventListener("DOMContentLoaded", function () {
    // Get the active tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            document.getElementById("url").value = tabs[0].url;
        }
    });

    // Add event listener for the audit button
    document.getElementById("auditButton").addEventListener("click", function () {
        const url = document.getElementById("url").value.trim();
        
        if (!url) {
            alert("Please enter a valid URL.");
            return;
        }

        runSEOaudit(url);
    });
});

function runSEOaudit(url) {
    const resultsDiv = document.getElementById("result");
    resultsDiv.innerHTML = `<p>Fetching data from <strong>${url}</strong>...</p>`;

    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, "text/html");

            const title = doc.querySelector("title")?.innerText || "❌ No title found.";
            const metaDescription = doc.querySelector("meta[name='description']")?.content || "❌ No meta description.";
            const h1Tag = doc.querySelector("h1")?.innerText || "❌ No H1 tag found.";

            const seoResults = {
                "Title Tag": title,
                "Meta Description": metaDescription,
                "H1 Tag": h1Tag 
            };

            displayResults(seoResults);
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p style="color:red;">❌ Error fetching data. Make sure the URL is valid and accessible.</p>`;
            console.error("Error fetching SEO data:", error);
        });
}

function displayResults(results) {
    const resultsDiv = document.getElementById("result");
    resultsDiv.innerHTML = "<h2>SEO Audit Results:</h2>";

    for (const [key, value] of Object.entries(results)) {
        const div = document.createElement("div");
        div.classList.add("result-item");
        div.innerHTML = `<strong>${key}:</strong> ${value}`;
        resultsDiv.appendChild(div);
    }
}

