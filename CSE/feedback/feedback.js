const feedbackInput = document.getElementById("feedbackInput");
const feedbackList = document.getElementById("feedbackList");

feedbackInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && feedbackInput.value.trim() !== "") {
    addFeedback(feedbackInput.value.trim());
    feedbackInput.value = "";
  }
});

function addFeedback(text) {
  const feedbackBox = document.createElement("div");
  feedbackBox.className = "feedback-box";

  const feedbackText = document.createElement("div");
  feedbackText.innerText = text;

  const likeSection = document.createElement("div");
  likeSection.className = "like-section";

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.innerText = "👍";

  const likeCount = document.createElement("span");
  likeCount.className = "like-count";
  likeCount.innerText = "0";

  likeButton.addEventListener("click", () => {
    likeCount.innerText = parseInt(likeCount.innerText) + 1;
  });

  likeSection.appendChild(likeButton);
  likeSection.appendChild(likeCount);

  feedbackBox.appendChild(feedbackText);
  feedbackBox.appendChild(likeSection);

  feedbackList.prepend(feedbackBox);
}

["Great service!", "Website is a bit slow.", "Loved the support team!"].forEach(fb => addFeedback(fb));
