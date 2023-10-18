document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("patientForm");

  // Function to send data to the server
  function sendData(method, data) {
      return fetch('/api/patients/register-patient', {
          method: method,
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
  }

  form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Collect form data
      const formData = new FormData(form);

      // Convert form data to JSON
      const formDataJSON = {};
      formData.forEach((value, key) => {
          formDataJSON[key] = value;
      });

      // Send data to the server as JSON using POST
      sendData('POST', formDataJSON)
          .then((response) => {
              if (response.ok) {
                  // Redirect to a success page or display a success message
                  window.location.href = '/registration-success.html';
              } else {
                  // Handle errors
                  console.error('Failed to submit data');
              }
          })
          .catch((error) => {
              console.error(error);
          });
  });

  // Function to get data from the server
  function getData() {
      sendData('GET')
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  console.error('Failed to retrieve data');
              }
          })
          .then((data) => {
              // Handle the retrieved data here
              console.log('Retrieved data:', data);
          })
          .catch((error) => {
              console.error(error);
          });
  }

  // Function to delete data on the server
  function deleteData() {
    fetch('/api/patients/delete-patient/:id', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        if (response.ok) {
            // Data deleted successfully
            console.log('Data deleted successfully');
        } else {
            // Handle errors
            console.error('Failed to delete data');
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

  // Example usage: Call getData() and deleteData() functions as needed
  getData();
  // deleteData();
});