let currentDate = new Date();
let selectedDate = null; // To store the date selected for adding an event
const events = {
    // Storing events without a specific year, using a month-day key
    '1-1': [{ name: "New Year's Day", color: '#ffcc00' }],
    '2-14': [{ name: "Valentine's Day", color: '#ff5733' }],
    '3-17': [{ name: "St. Patrick's Day", color: '#28a745' }],
    '4-22': [{ name: "Earth Day", color: '#2f6b9a' }],
    '7-4': [{ name: "Independence Day", color: '#3b5998' }],
    '10-31': [{ name: "Halloween", color: '#f39c12' }],
    '12-25': [{ name: "Christmas", color: '#e74c3c' }]
};

// Function to load the calendar
function loadCalendar() {
    const monthYear = document.getElementById('monthYear');
    const datesContainer = document.getElementById('dates');

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    monthYear.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    datesContainer.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        datesContainer.innerHTML += `<div class="date empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${month + 1}-${day}`; // Month-Day key for events
        const eventList = events[dateKey] || [];

        // Create the date element
        const dateElem = document.createElement('div');
        dateElem.className = 'date';
        dateElem.setAttribute('data-date', `${year}-${month + 1}-${day}`);
        dateElem.innerText = day;

        // Set the background color for user-added events
        if (eventList.length > 0) {
            eventList.forEach(event => {
                dateElem.style.backgroundColor = event.color; // Assign color
            });
        }

        // Create a tooltip for the events
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerText = eventList.map(event => event.name).join(', ');
        dateElem.appendChild(tooltip);

        // Show tooltip on hover
        dateElem.onmouseover = () => { tooltip.style.display = 'block'; };
        dateElem.onmouseout = () => { tooltip.style.display = 'none'; };

        // Event listener for user-added events
        dateElem.onclick = () => {
            selectedDate = `${year}-${month + 1}-${day}`; // Set the full date for user-added events
            document.getElementById('eventModal').style.display = 'block';
        };

        datesContainer.appendChild(dateElem);
    }
}

// Previous and Next Month Functions
document.getElementById('prev').onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar();
};

document.getElementById('next').onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar();
};

// Jump to Year Functionality
document.getElementById('jumpToYear').onclick = () => {
    const yearInput = document.getElementById('yearInput').value;
    if (yearInput) {
        currentDate.setFullYear(yearInput);
        loadCalendar();
    }
};

// Add event listener for adding events
document.getElementById('addEvent').onclick = () => {
    const eventTitle = document.getElementById('eventTitle').value;
    const eventColor = document.getElementById('eventColor').value;

    if (selectedDate && eventTitle) {
        const [year, month, day] = selectedDate.split('-');
        const eventKey = `${month}-${day}`; // Month-Day key for storing events

        if (!events[eventKey]) events[eventKey] = [];
        events[eventKey].push({ name: eventTitle, color: eventColor });
        document.getElementById('eventTitle').value = ''; // Clear the input
        document.getElementById('eventColor').value = '#ff0000'; // Reset color
        document.getElementById('eventModal').style.display = 'none'; // Close modal
        loadCalendar(); // Refresh calendar
    }
};

// Close modal
document.querySelector('.close').onclick = () => {
    document.getElementById('eventModal').style.display = 'none';
};

// Load the calendar initially
loadCalendar();
