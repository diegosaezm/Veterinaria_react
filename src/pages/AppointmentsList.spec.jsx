import React, { act } from "react";
import ReactDOM from "react-dom/client";
import AppointmentsList from "./AppointmentsList";
import { MemoryRouter } from "react-router-dom";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("AppointmentsList", () => {
  let container;
  let root;

  beforeEach(() => {
    localStorage.clear();

    container = document.createElement("div");
    document.body.appendChild(container);

    root = ReactDOM.createRoot(container);
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });

    document.body.removeChild(container);
    localStorage.clear();
  });

  it("debería mostrar un mensaje cuando no hay citas", async () => {
    await act(async () => {
      root.render(
        <MemoryRouter>
          <AppointmentsList />
        </MemoryRouter>,
      );
    });

    expect(container.textContent).toContain(
      "Todavía no tienes citas agendadas",
    );
  });

  it("debería mostrar una cita guardada en localStorage", async () => {
    const citas = [
      {
        nombre: "Diego",
        mascota: "Boby",
        servicio: "Vacunación",
        fecha: "2026-10-20",
      },
    ];

    localStorage.setItem("citas", JSON.stringify(citas));

    await act(async () => {
      root.render(
        <MemoryRouter>
          <AppointmentsList />
        </MemoryRouter>,
      );
    });

    expect(container.textContent).toContain("Boby");
    expect(container.textContent).toContain("Diego");
    expect(container.textContent).toContain("Vacunación");
  });

  it("debería eliminar una cita al hacer clic en Eliminar", async () => {
    const citas = [
      {
        nombre: "Diego",
        mascota: "Boby",
        servicio: "Vacunación",
        fecha: "2026-10-20",
      },
    ];

    localStorage.setItem("citas", JSON.stringify(citas));

    await act(async () => {
      root.render(
        <MemoryRouter>
          <AppointmentsList />
        </MemoryRouter>,
      );
    });

    const botonEliminar = Array.from(container.querySelectorAll("button")).find(
      (boton) => boton.textContent === "Eliminar",
    );

    await act(async () => {
      botonEliminar.click();
    });

    expect(container.textContent).not.toContain("Boby");
  });

  it("debería mostrar el botón Editar", async () => {
    const citas = [
      {
        nombre: "Diego",
        mascota: "Boby",
        servicio: "Vacunación",
        fecha: "2026-10-20",
      },
    ];

    localStorage.setItem("citas", JSON.stringify(citas));

    await act(async () => {
      root.render(
        <MemoryRouter>
          <AppointmentsList />
        </MemoryRouter>,
      );
    });

    const botonEditar = Array.from(container.querySelectorAll("button")).find(
      (boton) => boton.textContent === "Editar",
    );

    expect(botonEditar).toBeDefined();
  });

  it("debería guardar los cambios de una cita editada", async () => {
    const citas = [
      {
        nombre: "Diego",
        mascota: "Boby",
        servicio: "Vacunación",
        fecha: "2026-10-20",
      },
    ];

    localStorage.setItem("citas", JSON.stringify(citas));

    await act(async () => {
      root.render(
        <MemoryRouter>
          <AppointmentsList />
        </MemoryRouter>,
      );
    });

    const botonEditar = Array.from(container.querySelectorAll("button")).find(
      (boton) => boton.textContent === "Editar",
    );

    await act(async () => {
      botonEditar.click();
    });

    const inputs = container.querySelectorAll("input");

    const inputMascota = inputs[1];

    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      ).set;

      setter.call(inputMascota, "Luna");

      inputMascota.dispatchEvent(new Event("input", { bubbles: true }));
    });

    const botonGuardar = Array.from(container.querySelectorAll("button")).find(
      (boton) => boton.textContent === "Guardar cambios",
    );

    await act(async () => {
      botonGuardar.click();
    });

    expect(container.textContent).toContain("Luna");
  });

  it("debería mostrar el formulario de edición al hacer clic en Editar", async () => {
    const citas = [
      {
        nombre: "Diego",
        mascota: "Boby",
        servicio: "Vacunación",
        fecha: "2026-10-20",
      },
    ];

    localStorage.setItem("citas", JSON.stringify(citas));

    await act(async () => {
      root.render(
        <MemoryRouter>
          <AppointmentsList />
        </MemoryRouter>,
      );
    });

    const botonEditar = Array.from(container.querySelectorAll("button")).find(
      (boton) => boton.textContent === "Editar",
    );

    await act(async () => {
      botonEditar.click();
    });

    const inputs = container.querySelectorAll("input");

    expect(inputs.length).toBe(4);
  });
});
