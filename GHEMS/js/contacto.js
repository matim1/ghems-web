document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "";
    status.className = "form-status";
    button.disabled = true;
    button.classList.add("loading");

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwfhuPpQWRIKARe2E77aXbkkYQVBRv5J5Y2JrO3AZwSLOJlXiMG8k3J41SUeevBXp9S_w/exec",
        {
          method: "POST",
          body: formData
        }
      );

      const text = await response.text();

      if (text.trim() === "OK") {
        showStatus("Mensaje enviado correctamente.", "success");
        form.reset();
      } else {
        throw new Error("Respuesta inválida");
      }

    } catch (error) {
      showStatus("No se pudo enviar el mensaje. Intente nuevamente.", "error");
    } finally {
      button.disabled = false;
      button.classList.remove("loading");
    }
  });

  function showStatus(message, type) {
    status.textContent = message;
    status.classList.add(type);
  }

});


