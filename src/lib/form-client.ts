import { populateAttributionFields } from "./utm";

type ApiResult = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

function setFieldError(form: HTMLFormElement, fieldName: string, messages: string[] = []) {
  const field = form.elements.namedItem(fieldName);
  const errorElement = form.querySelector<HTMLElement>(`[data-error-for="${fieldName}"]`);
  const message = messages[0] ?? "";

  if (field instanceof HTMLElement) {
    field.setAttribute("aria-invalid", message ? "true" : "false");

    if (errorElement) {
      errorElement.id ||= `${form.id || "form"}-${fieldName}-error`;

      const describedBy = new Set((field.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean));
      describedBy.add(errorElement.id);
      field.setAttribute("aria-describedby", Array.from(describedBy).join(" "));
    }
  }

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearFormState(form: HTMLFormElement) {
  form.querySelectorAll<HTMLElement>("[data-error-for]").forEach((element) => {
    element.textContent = "";
  });

  Array.from(form.elements).forEach((field) => {
    if (field instanceof HTMLElement) {
      field.removeAttribute("aria-invalid");
    }
  });
}

async function submitEnhancedForm(form: HTMLFormElement) {
  if (form.dataset.submitting === "true") return;

  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const idleLabel = submitButton?.dataset.idleLabel ?? submitButton?.textContent ?? "Submit";
  const loadingLabel = submitButton?.dataset.loadingLabel ?? "Sending…";
  const genericError = form.dataset.genericErrorMessage ?? "Something went wrong. Please try again.";

  clearFormState(form);
  populateAttributionFields(form);

  if (status) {
    status.textContent = "";
    status.dataset.state = "";
  }

  form.dataset.submitting = "true";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = loadingLabel;
  }

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });
    const result = (await response.json().catch(() => ({}))) as ApiResult;

    if (!response.ok || !result.ok) {
      for (const [fieldName, messages] of Object.entries(result.errors ?? {})) {
        setFieldError(form, fieldName, messages);
      }

      if (status) {
        status.textContent = result.message ?? genericError;
        status.dataset.state = "error";
      }
      return;
    }

    form.reset();
    populateAttributionFields(form);

    if (status) {
      status.textContent = result.message ?? form.dataset.successMessage ?? "Thanks — you’re on the list.";
      status.dataset.state = "success";
    }
  } catch {
    if (status) {
      status.textContent = genericError;
      status.dataset.state = "error";
    }
  } finally {
    form.dataset.submitting = "false";

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = idleLabel;
    }
  }
}

export function enhanceForms() {
  populateAttributionFields();

  document.querySelectorAll<HTMLFormElement>("form[data-enhanced-form]").forEach((form) => {
    if (form.dataset.enhanced === "true") return;

    form.dataset.enhanced = "true";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      void submitEnhancedForm(form);
    });
  });
}
