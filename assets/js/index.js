// Global variables
let periodEndHour, periodEndMinutes;

// Initialize the application
function initalize() {
    sessionStorage.setItem("period", 0);
    setDate();
    loadLunch();
    assignSchedule();
    faviconSelector();
    loadNotepads();
    loadDelay();
    loadTodoList();
    textColorChange();
    accentsColorChange();
    backgroundColorChange();
    
    // Add modern enhancements
    initializeModernFeatures();
}

// Modern enhancements
function initializeModernFeatures() {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all main cards
    document.querySelectorAll('#mainframe > div').forEach(card => {
        observer.observe(card);
    });
}

// Date and time functions
function setDate() {
    const now = new Date();
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
    
    if (timeElement && dateElement) {
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        timeElement.innerHTML = timeString;
        dateElement.innerHTML = dateString;
    }
    
    setTimeout(setDate, 1000);
}

// Notepad functions
function saveNotepad(notepadNumber) {
    const notepadContent = document.getElementById(`notepad${notepadNumber}`).value;
    localStorage.setItem(`notepad${notepadNumber}`, notepadContent);
    
    // Add save animation
    const notepad = document.getElementById(`notepad${notepadNumber}`);
    notepad.style.transform = 'scale(1.02)';
    setTimeout(() => {
        notepad.style.transform = 'scale(1)';
    }, 150);
}

function loadNotepads() {
    for (let i = 0; i <= 7; i++) {
        const savedContent = localStorage.getItem(`notepad${i}`);
        const notepadElement = document.getElementById(`notepad${i}`);
        if (savedContent && notepadElement) {
            notepadElement.value = savedContent;
        }
    }
}

// Color functions
function textColorChange() {
    const savedColor = localStorage.getItem("textColor");
    if (savedColor) {
        document.getElementById("textColorInput").value = savedColor;
        inheritColorSelectionTxt();
    }
}

function inheritColorSelectionTxt() {
    const colorValue = document.getElementById("textColorInput").value;
    const contentElements = document.querySelectorAll(".content");
    contentElements.forEach(element => {
        element.style.color = colorValue;
    });
    localStorage.setItem("textColor", colorValue);
}

function accentsColorChange() {
    const savedColor = localStorage.getItem("accentColor");
    if (savedColor) {
        document.getElementById("accentColorInput").value = savedColor;
        inheritColorSelectionAccents();
    }
}

function inheritColorSelectionAccents() {
    const colorValue = document.getElementById("accentColorInput").value;
    const elements = document.querySelectorAll(".mainshadow, .settingsdiv");
    elements.forEach(element => {
        element.style.borderColor = colorValue;
        element.style.boxShadow = `0 20px 25px -5px ${colorValue}20, 0 10px 10px -5px ${colorValue}10`;
    });
    localStorage.setItem("accentColor", colorValue);
}

function backgroundColorChange() {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
        document.getElementById("backgroundColorInput").value = savedColor;
        inheritColorSelectionBackground();
    }
}

function inheritColorSelectionBackground() {
    const colorValue = document.getElementById("backgroundColorInput").value;
    document.body.style.background = `linear-gradient(135deg, ${colorValue} 0%, #764ba2 100%)`;
    localStorage.setItem("backgroundColor", colorValue);
}

// Theme functions
function assignIconToLocalStorage(iconId, value) {
    localStorage.setItem("selectedIcon", iconId);
    localStorage.setItem("iconValue", value);
    
    // Add click animation
    const icon = document.getElementById(iconId);
    icon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        icon.style.transform = 'scale(1)';
    }, 150);
    
    if (value === 'light' || value === 'dark') {
        applyTheme(value);
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.2)');
        document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
    } else {
        document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)');
        document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.2)');
    }
}

function faviconSelector() {
    const savedIcon = localStorage.getItem("selectedIcon");
    if (savedIcon) {
        const iconElement = document.getElementById(savedIcon);
        if (iconElement) {
            iconElement.style.opacity = "1";
            iconElement.style.transform = "scale(1.1)";
        }
    }
}

// Schedule functions
function loadLunch() {
    const savedLunch = localStorage.getItem("iconValue");
    if (savedLunch) {
        sessionStorage.setItem("lunch", savedLunch);
    }
}

function assignSchedule() {
    const scheduleSelector = document.getElementById("scheduleSelector");
    const selectedSchedule = scheduleSelector ? scheduleSelector.value : "fullSchedule";
    
    clearScheduleTable();
    
    const schedules = {
        fullSchedule: [
            { period: "1st", start: "8:15", end: "9:05" },
            { period: "2nd", start: "9:10", end: "10:00" },
            { period: "3rd", start: "10:05", end: "10:55" },
            { period: "4th", start: "11:00", end: "11:50" },
            { period: "Lunch A", start: "11:50", end: "12:20" },
            { period: "5th", start: "12:25", end: "1:15" },
            { period: "Lunch B", start: "1:15", end: "1:45" },
            { period: "6th", start: "1:50", end: "2:40" },
            { period: "7th", start: "2:45", end: "3:35" }
        ],
        fridaySchedule: [
            { period: "1st", start: "8:15", end: "8:55" },
            { period: "2nd", start: "9:00", end: "9:40" },
            { period: "3rd", start: "9:45", end: "10:25" },
            { period: "4th", start: "10:30", end: "11:10" },
            { period: "Lunch A", start: "11:10", end: "11:40" },
            { period: "5th", start: "11:45", end: "12:25" },
            { period: "Lunch B", start: "12:25", end: "12:55" },
            { period: "6th", start: "1:00", end: "1:40" },
            { period: "7th", start: "1:45", end: "2:25" }
        ],
        zeroHour: [
            { period: "0th", start: "7:25", end: "8:10" },
            { period: "1st", start: "8:15", end: "9:05" },
            { period: "2nd", start: "9:10", end: "10:00" },
            { period: "3rd", start: "10:05", end: "10:55" },
            { period: "4th", start: "11:00", end: "11:50" },
            { period: "Lunch A", start: "11:50", end: "12:20" },
            { period: "5th", start: "12:25", end: "1:15" },
            { period: "Lunch B", start: "1:15", end: "1:45" },
            { period: "6th", start: "1:50", end: "2:40" },
            { period: "7th", start: "2:45", end: "3:35" }
        ],
        mondaySchedule: [
            { period: "1st", start: "8:15", end: "9:05" },
            { period: "2nd", start: "9:10", end: "10:00" },
            { period: "3rd", start: "10:05", end: "10:55" },
            { period: "4th", start: "11:00", end: "11:50" },
            { period: "Lunch", start: "11:50", end: "12:35" },
            { period: "5th", start: "12:40", end: "1:30" },
            { period: "6th", start: "1:35", end: "2:25" },
            { period: "7th", start: "2:30", end: "3:20" }
        ],
        tuesdaySchedule: [
            { period: "1st", start: "8:15", end: "9:35" },
            { period: "3rd", start: "9:40", end: "11:00" },
            { period: "Lunch", start: "11:00", end: "11:45" },
            { period: "5th", start: "11:50", end: "1:10" },
            { period: "7th", start: "1:15", end: "2:35" }
        ],
        wednesdaySchedule: [
            { period: "2nd", start: "8:15", end: "9:35" },
            { period: "4th", start: "9:40", end: "11:00" },
            { period: "Lunch", start: "11:00", end: "11:45" },
            { period: "6th", start: "11:50", end: "1:10" },
            { period: "Advisory", start: "1:15", end: "2:35" }
        ],
        thursdaySchedule: [
            { period: "1st", start: "8:15", end: "9:35" },
            { period: "3rd", start: "9:40", end: "11:00" },
            { period: "Lunch", start: "11:00", end: "11:45" },
            { period: "5th", start: "11:50", end: "1:10" },
            { period: "7th", start: "1:15", end: "2:35" }
        ]
    };
    
    const schedule = schedules[selectedSchedule] || schedules.fullSchedule;
    populateScheduleTable(schedule);
}

function clearScheduleTable() {
    const scheduleTable = document.getElementById("scheduleTable");
    if (scheduleTable) {
        // Keep the header row, remove others
        while (scheduleTable.rows.length > 1) {
            scheduleTable.deleteRow(1);
        }
    }
}

function populateScheduleTable(schedule) {
    const scheduleTable = document.getElementById("scheduleTable");
    if (!scheduleTable) return;
    
    schedule.forEach((period, index) => {
        const newRow = scheduleTable.insertRow();
        newRow.style.animationDelay = `${index * 0.1}s`;
        newRow.classList.add('schedule-row');
        
        const periodCell = newRow.insertCell(0);
        const startCell = newRow.insertCell(1);
        const endCell = newRow.insertCell(2);
        
        periodCell.innerHTML = `<span class="content">${period.period}</span>`;
        startCell.innerHTML = `<span class="content">${period.start}</span>`;
        endCell.innerHTML = `<span class="content">${period.end}</span>`;
        
        // Add hover effect
        newRow.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        newRow.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Delay functions
function loadDelay() {
    const savedDelay = localStorage.getItem("delayValue");
    const delayInput = document.getElementById("delayInput");
    if (savedDelay && delayInput) {
        delayInput.value = savedDelay;
    }
}

function addDelay() {
    const delayInput = document.getElementById("delayInput");
    if (delayInput) {
        const delayValue = delayInput.value;
        localStorage.setItem("delayValue", delayValue);
        
        // Add visual feedback
        delayInput.style.borderColor = "rgba(34, 197, 94, 0.5)";
        setTimeout(() => {
            delayInput.style.borderColor = "rgba(255, 255, 255, 0.2)";
        }, 1000);
    }
}

// Todo list functions
function loadTodoList() {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
        const todos = JSON.parse(savedTodos);
        const todoList = document.getElementById("todoList");
        if (todoList) {
            todoList.innerHTML = "";
            todos.forEach((todo, index) => {
                createTodoElement(todo, index);
            });
        }
    }
}

function addTodoItem() {
    const todoInput = document.getElementById("todoInput");
    if (!todoInput || !todoInput.value.trim()) return;
    
    const todoText = todoInput.value.trim();
    const savedTodos = localStorage.getItem("todoList");
    const todos = savedTodos ? JSON.parse(savedTodos) : [];
    
    todos.push(todoText);
    localStorage.setItem("todoList", JSON.stringify(todos));
    
    createTodoElement(todoText, todos.length - 1);
    todoInput.value = "";
    
    // Add success animation
    todoInput.style.borderColor = "rgba(34, 197, 94, 0.5)";
    setTimeout(() => {
        todoInput.style.borderColor = "rgba(255, 255, 255, 0.2)";
    }, 1000);
}

function createTodoElement(todoText, index) {
    const todoList = document.getElementById("todoList");
    if (!todoList) return;
    
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.innerHTML = `
        <span class="todo-text">${todoText}</span>
        <button class="todo-delete" onclick="deleteTodoItem(${index})">×</button>
    `;
    
    todoList.appendChild(todoItem);
}

function deleteTodoItem(index) {
    const savedTodos = localStorage.getItem("todoList");
    if (!savedTodos) return;
    
    const todos = JSON.parse(savedTodos);
    todos.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todos));
    
    // Reload the todo list
    loadTodoList();
}

// Add todo item on Enter key press
document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById("todoInput");
    if (todoInput) {
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodoItem();
            }
        });
    }
});

// Countdown timer function (enhanced)
function updateCountdown() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // Find current period
    let currentPeriod = "After School";
    let nextPeriodStart = null;
    
    // This would need to be enhanced based on your schedule logic
    // For now, just update the countdown display
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        countdownElement.innerHTML = `Current: ${currentPeriod}`;
    }
}

// Enhanced initialization
function enhancedInitialize() {
    // Call original initialize
    initalize();
    
    // Add modern enhancements
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S to save all notepads
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            for (let i = 0; i <= 7; i++) {
                saveNotepad(i);
            }
            
            // Show save feedback
            const header = document.getElementById("header");
            if (header) {
                header.style.transform = "scale(1.02)";
                setTimeout(() => {
                    header.style.transform = "scale(1)";
                }, 200);
            }
        }
    });
}

// Replace the original initialize call
if (typeof window !== 'undefined') {
    window.addEventListener('load', enhancedInitialize);
}

// Export functions for compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initalize,
        setDate,
        saveNotepad,
        loadNotepads,
        inheritColorSelectionTxt,
        inheritColorSelectionAccents,
        inheritColorSelectionBackground,
        assignIconToLocalStorage,
        assignSchedule,
        addDelay,
        addTodoItem,
        deleteTodoItem
    };
}
