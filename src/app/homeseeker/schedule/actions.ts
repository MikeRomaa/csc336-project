"use client";
export default async function stupid() {
    const startTime = document.createElement('input');
    startTime.type = 'datetime-local';
    const labelStart = document.createElement('label');
    labelStart.textContent = "Start";
    labelStart.appendChild(startTime);

    const endTime = document.createElement('input');
    endTime.type = 'datetime-local';
    const labelEnd = document.createElement('label');
    labelEnd.textContent = "End";
    labelEnd.appendChild(endTime);
    document.getElementById("times-container")?.appendChild(document.createElement('br'));
    document.getElementById("times-container")?.appendChild(labelStart);
    document.getElementById("times-container")?.appendChild(labelEnd);
}