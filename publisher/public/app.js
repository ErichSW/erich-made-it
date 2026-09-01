const form = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const timestampInput = document.getElementById("timestamp");
const publishButton = document.getElementById("publish-button");
const statusElement = document.getElementById("status");

function updateTimestamp() {
    timestampInput.value = new Date().toISOString();
}

updateTimestamp();
setInterval(updateTimestamp, 1000);

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        showStatus("Title and content are required.", "error");
        return;
    }

    publishButton.disabled = true;
    publishButton.textContent = "Publishing...";
    showStatus(
        "Creating the file and pushing it to GitHub...",
        "working"
    );

    try {
        const response = await fetch("/api/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Publishing failed.");
        }

        showStatus(
            `Published successfully.\n\n` +
            `File: ${result.file}\n` +
            `Commit: ${result.commit}`,
            "success"
        );

        form.reset();
        updateTimestamp();
        titleInput.focus();
    } catch (error) {
        showStatus(error.message, "error");
    } finally {
        publishButton.disabled = false;
        publishButton.textContent = "Publish post";
    }
});

function showStatus(message, type) {
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
}