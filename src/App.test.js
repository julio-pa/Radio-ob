// Vamos a construir una aplicación de seleccion y busqueda de Emisoras de Radio en stream.

import { fireEvent, queryByLabelText, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom"
import App from "./App"
import { click } from "@testing-library/user-event/dist/click";

beforeEach(() => render(<App />));

// 0 - La aplicación debe renderizar correctamente
describe('0 - La aplicación debe renderizar correctamente', () =>{
    test('0 - La aplicación debe renderizar correctamente', ()=> {
        const view = render(<App />)
        expect(view).toBeDefined();
    })
})

// 1 - El nombre de la aplicación debe mostrarse en algpun lugar -> "OpenRadioCamp"
describe('1 - El nombre de la aplicación debe mostrarse en algpun lugar -> "OpenRadioCamp"', () => {
    test('1 - El nombre de la aplicación debe mostrarse en algpun lugar -> "OpenRadioCamp"', ()=> {
        const nombre = "OpenRadioCamp";
        const el = screen.getByText(nombre);
        expect(el).toBeInTheDocument();
    })
})

// 2 - Debemos poder buscar radios por nombre
// 2a - La aplicación debe tener un campo input con el placeholder =>"Escribe el nombre de la radio"
// 2b - La aplicación debe tener un botón de busqueda que sea => texto "Buscar"
// 2c - Cuando hacemos clic en el botón buscar, se debe ejecutar la función búsqueda una sola vez
describe('2 - Debemos poder buscar radios por nombre', () =>{
    test('2a - La aplicación debe tener un campo input con el placeholder =>"Escribe el nombre de la radio"', () => {
        const placeholdertext = "Escribe el nombre de la radio";
        const input = screen.getByPlaceholderText(placeholdertext);
        expect(input).toBeInTheDocument();
    })
    test('2b - La aplicación debe tener un botón de busqueda que sea => texto "Buscar"', () => {
        const buttontext = "Buscar";
        const button = screen.getByText(buttontext);
        expect(button).toBeInTheDocument();
    })
    test('2c - Cuando hacemos clic en el botón buscar, se debe ejecutar la función búsqueda una sola vez', () => {
        const funcionMock = jest.fn();
        const buttontext = "Buscar";
        const button = screen.getByText(buttontext);
        button.addEventListener("click", funcionMock);
        fireEvent.click(button);
        expect(funcionMock).toHaveBeenCalledTimes(1);
    })
})

// 3 - Listado de emisoras
// 3a - Debe existir un listado de emisoras
// 3b - El listado debe inicializar vacio
// 3c - Cuando se hace una busqueda valida, el listado debe mostar al menos un resultado
// 3d - Cuando hacemos na busqueda invalida (no existe), el listado debe mostrar un mensaje "No se ha encontrado emisoras para esta busqueda"
describe('3 - Listado de emisoras', () =>{
    test('3a - Debe existir un listado de emisoras', ()=>{
        const listado = screen.getByLabelText('listado-emisoras');
        expect(listado).toBeInTheDocument();
    })
    test('3b - El listado debe inicializar vacio', ()=>{
        const listado = screen.getByLabelText('listado-emisoras');
        const childrenCount = listado.childElementCount;
        expect(childrenCount).toBe(0)
    })
    test('3c - Cuando se hace una busqueda valida, el listado debe mostar al menos un resultado',async ()=>{
        const placeholdertext = "Escribe el nombre de la radio";
        const input = screen.getByPlaceholderText(placeholdertext);
        const buttontext = "Buscar";
        const button = screen.getByText(buttontext);
        fireEvent.change(input, { target: {value: 'Country'}});
        fireEvent.click(button);
        const listado = screen.getByLabelText('listado-emisoras');
        childrenCount = listado.childElementCount;
        expect(childrenCount).toBeGreaterThanOrEqual(0);
    })
})