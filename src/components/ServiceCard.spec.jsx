import React, { act } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ServiceCard from "./ServiceCard";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("ServiceCard", () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    root = ReactDOM.createRoot(container);
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });

    document.body.removeChild(container);
  });

  it("debería mostrar el nombre del servicio", async () => {
    await act(async () => {
      root.render(
        <BrowserRouter>
          <ServiceCard
            id={1}
            nombre="Vacunación"
            precio={18000}
            descripcion="Vacunas preventivas"
          />
        </BrowserRouter>,
      );
    });

    expect(container.textContent).toContain("Vacunación");
  });

  it("debería mostrar el precio del servicio", async () => {
    await act(async () => {
      root.render(
        <BrowserRouter>
          <ServiceCard
            id={1}
            nombre="Vacunación"
            precio={18000}
            descripcion="Vacunas preventivas"
          />
        </BrowserRouter>,
      );
    });

    expect(container.textContent).toContain("$18.000");
  });

  it("debería mostrar la descripción del servicio", async () => {
    await act(async () => {
      root.render(
        <BrowserRouter>
          <ServiceCard
            id={1}
            nombre="Vacunación"
            precio={18000}
            descripcion="Vacunas preventivas"
          />
        </BrowserRouter>,
      );
    });

    expect(container.textContent).toContain("Vacunas preventivas");
  });
});

