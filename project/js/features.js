        // Geolocation API
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const equatorPosition = latitude > 0 ? "North of the Equator" : latitude < 0 ? "South of the Equator" : "On the Equator";
            const meridianPosition = longitude > 0 ? "East of the Prime Meridian" : longitude < 0 ? "West of the Prime Meridian" : "On the Prime Meridian";

            document.getElementById("location").innerHTML = `
                Latitude: ${latitude} (${equatorPosition})<br>
                Longitude: ${longitude} (${meridianPosition})
            `;
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    document.getElementById("location").innerHTML = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    document.getElementById("location").innerHTML = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    document.getElementById("location").innerHTML = "An unknown error occurred.";
                    break;
            }
        }

        // Web Storage API
        function addTask() {
            let task = document.getElementById("task").value;
            if (task) {
                let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                tasks.push(task);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
                document.getElementById("task").value = "";
            }
        }

        function displayTasks() {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach((task) => {
                let li = document.createElement("li");
                li.textContent = task;
                taskList.appendChild(li);
            });
        }

        window.onload = displayTasks;

        // Fetch API
        function fetchData() {
            fetch('https://jsonplaceholder.typicode.com/posts/1')
                .then(response => response.json())
                .then(data => {
                    document.getElementById("apiData").innerHTML = `
                        <strong>Title:</strong> ${data.title}<br>
                        <strong>Body:</strong> ${data.body}
                    `;
                })
                .catch(error => {
                    document.getElementById("apiData").innerHTML = "Error fetching data.";
                    console.error("Error:", error);
                });
        }

        // Canvas API
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        let drawing = false;

        canvas.addEventListener("mousedown", (e) => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        });

        canvas.addEventListener("mousemove", (e) => {
            if (drawing) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
        });

        canvas.addEventListener("mouseup", () => {
            drawing = false;
            ctx.closePath();
        });

        canvas.addEventListener("mouseleave", () => {
            drawing = false;
            ctx.closePath();
        });

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Dark Mode Toggle
        function toggleDarkMode() {
            const body = document.getElementById('body');
            if (body.style.backgroundColor === 'black') {
                body.style.backgroundColor = 'white';
                body.style.color = 'black';
            } else {
                body.style.backgroundColor = 'black';
                body.style.color = 'white';
            }
        }