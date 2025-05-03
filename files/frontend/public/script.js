// Display current date and time
function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    const now = new Date();
    datetimeElement.textContent = now.toLocaleString('en-SG', { timeZone: 'Asia/Singapore' });
}
setInterval(updateDateTime, 1000);

// Fetch and display routes
fetch('/routes')
    .then(response => response.json())
    .then(routes => {
        const container = document.getElementById('routes-container');
        routes.forEach(route => {
            const card = document.createElement('div');
            card.className = 'route-card';
            card.innerHTML = `
                <h2>${route.name}</h2>
                <p>Estimated Time: ${route.time}</p>
                <p>Difficulty: ${route.difficulty}</p>
                <button onclick="viewPDF('${route.name}')">View PDF</button>
            `;
            container.appendChild(card);
        });
    });

function viewPDF(routeName) {
    const pdfPath = `/uploads/${routeName}.pdf`;
    const iframe = document.createElement('iframe');
    iframe.src = `https://docs.google.com/gview?url=${window.location.origin}${pdfPath}&embedded=true`;
    iframe.width = '100%';
    iframe.height = '600px';
    document.body.appendChild(iframe);
}