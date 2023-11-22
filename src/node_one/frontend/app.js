document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('name-form');
    const personNameInput = document.getElementById('person_name');
    const sharedPersonName = document.getElementById('shared-person-name');

    const socket = new WebSocket('ws://localhost:8070');
    // Connect to the WebSocket server

    socket.onopen = (event) => {
        console.log('WebSocket connected:', event);
    };

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const personName = personNameInput.value;

        // Send the person's name to the server
        socket.send(JSON.stringify({ person_name: personName }));
    });

    socket.onmessage = (event) => {
        // Handle messages received from the server
        const data = JSON.parse(event.data);
        if (data.person_names) {
            sharedPersonName.textContent = data.person_names.join(', ');
        }
    };
});
