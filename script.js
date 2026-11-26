document.addEventListener("DOMContentLoaded", () => {
  const scene = document.getElementById("scene");
  const card = document.getElementById("card");
  const glare = document.getElementById("glare");
  const whatWeDoBtn = document.getElementById("whatWeDoBtn");
  const whatWeDoDialog = document.getElementById("whatWeDoDialog");
  const closeWhatWeDoBtn = document.getElementById("closeWhatWeDoBtn");

  if (!scene || !card || !glare || !whatWeDoBtn || !whatWeDoDialog || !closeWhatWeDoBtn) return;

  const updateGlare = (clientX, clientY) => {
    const rect = scene.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    glare.style.setProperty("--mouse-x", `${((x / rect.width) * 100).toFixed(1)}%`);
    glare.style.setProperty("--mouse-y", `${((y / rect.height) * 100).toFixed(1)}%`);
  };

  const handleTouchMove = (clientX, clientY) => {
    const rect = scene.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 18;
    const rotateX = ((centerY - y) / centerY) * 18;

    card.classList.add("is-interacting");
    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    updateGlare(clientX, clientY);
  };

  const resetCard = () => {
    card.classList.remove("is-interacting");
    card.style.transform = "";
  };

  scene.addEventListener("mousemove", (event) => {
    updateGlare(event.clientX, event.clientY);
  });
  scene.addEventListener("mouseleave", resetCard);

  scene.addEventListener("touchmove", (event) => {
    if (event.touches.length && event.target.closest("a, button") === null) {
      handleTouchMove(event.touches[0].clientX, event.touches[0].clientY);
    }
  }, { passive: true });
  scene.addEventListener("touchend", resetCard);

  whatWeDoBtn.addEventListener("click", () => {
    whatWeDoDialog.showModal();
  });

  closeWhatWeDoBtn.addEventListener("click", () => {
    whatWeDoDialog.close();
  });
});
