// Fetch patient data from your Node.js API (replace API_URL with your actual API endpoint)
const API_URL = '/api/patients'; // This is the endpoint in your Express.js server

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    // Extract temperature and heartbeat data for chart.js
    const temperatureData = data.map((patient) => patient.temperature);
    const heartbeatData = data.map((patient) => patient.heartbeat);
    const patientTable = document.getElementById('patientTable').querySelector('tbody');
    
    // Create temperature chart
    const temperatureChart = new Chart('temperatureChart', {
      type: 'line',
      data: {
        labels: data.map((_, index) => index + 1),
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatureData,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      },
    });

    // Create heartbeat chart
    const heartbeatChart = new Chart('heartbeatChart', {
      type: 'line',
      data: {
        labels: data.map((_, index) => index + 1),
        datasets: [
          {
            label: 'Heartbeat (bpm)',
            data: heartbeatData,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
          },
        ],
      },
    });

    // Populate the patient records table
    data.forEach((patient) => {
      const row = patientTable.insertRow();
      row.innerHTML = `
        <td>${patient.name}</td>
        <td>${patient.national_id}</td>
        <td>${patient.temperature}</td>
        <td>${patient.heartbeat}</td>
      `;
    });
  })
  .catch((error) => console.error(error));
