
document.addEventListener("DOMContentLoaded", () => {
  // 1. Fix MORTALIS comic cover
  const comicImage = document.querySelector(".comic-cover img");

  if (comicImage) {
    comicImage.src = "assets/mortalis-cover.png";
    comicImage.alt = "MORTALIS: THE LAST DEATH comic cover";
    comicImage.loading = "lazy";
  }

  // 2. Fix Chapter 01 button
  document.querySelectorAll(".comic-read-btn").forEach(link => {
    link.href = "mortalis-chapter-01.html";
  });

  // 3. Mobile navigation
  const menu = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  if (menu && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle("voidfx-menu-open");
      menu.setAttribute("aria-expanded", String(isOpen));
    };

    menu.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("voidfx-menu-open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. Fix empty AI story links
  document.querySelectorAll('#stories a[href="#"]').forEach((link, index) => {
    if (index === 0) {
      link.href = "mortalis-chapter-01.html";
      link.textContent = "READ STORY";
    } else {
      link.href = "#webcomics";
      link.textContent = "EXPLORE COMICS";
    }
  });

  // 5. Fix order form success button label
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    const submitButton = orderForm.querySelector('[type="submit"]');

    if (submitButton) {
      const originalText = submitButton.textContent.trim();

      const observer = new MutationObserver(() => {
        if (
          !submitButton.disabled &&
          /submit order/i.test(submitButton.textContent)
        ) {
          submitButton.textContent = originalText;
        }
      });

      observer.observe(submitButton, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }

  // 6. Do not pretend tournament registration was sent
  const tournamentForm = document.getElementById("tournamentForm");

  if (tournamentForm) {
    tournamentForm.addEventListener("submit", event => {
      event.preventDefault();

      let message = document.getElementById("tournamentStatus");

      if (!message) {
        message = document.createElement("p");
        message.id = "tournamentStatus";
        message.style.color = "#ff526b";
        tournamentForm.appendChild(message);
      }

      message.textContent =
        "Online registration is not connected yet. " +
        "Please contact the tournament organiser before making payment.";
    });
  }

  // 7. Make comic card visible
  const comicCard = document.querySelector(".comic-card");

  if (comicCard) {
    comicCard.style.opacity = "1";
    comicCard.style.transform = "none";
  }
});
