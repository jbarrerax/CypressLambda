import "cypress-localstorage-commands";
import "cypress-downloadfile/lib/downloadFileCommand";
import "cypress-file-upload";
import "cypress-audit/commands";

Cypress.Commands.overwrite("type", (originalFn, subject, str, options) => {
  if (str !== "") {
    return originalFn(subject, str, options);
  }
  return subject;
});

Cypress.Commands.add("preserveCookie", () => {
  Cypress.Cookies.defaults({
    preserve: "session-username",
  });
});
