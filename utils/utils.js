export function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", closeModalEsc);
}

export function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", closeModalEsc);
}

export function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_open");
    closeModal(openedModal);
  }
}

export function closeModalClick(modal, evt) {
  if (evt.target === modal) {
    closeModal(modal);
  }
}
