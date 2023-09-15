import React, { Children } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import TodoBody from "./components/TodoBody";

describe('TodoBody компонент', () => {
    test('должен содержать текст "todos"', () => {
        render(<TodoBody />)
        //содержание, что имеется текст todo
        expect(screen.getByTestId('todoText')).toHaveTextContent('todos');
    });

    test('Добавление задачи. Затем нажатие на checked и удаление выполненых задач', () => {
        render(<TodoBody />);

        const input = screen.getByPlaceholderText(/Введите новую задачу/i);
        const button = screen.getByText(/Добавить/i);
        fireEvent.input(input, {
            target: {value: 'Новая задача!'}
        })

        fireEvent.click(button);

        expect(screen.getByTestId('добавленная задача')).toBeInTheDocument();

        const checkButton = screen.getByTestId(/checkboxid/);
        fireEvent.click(checkButton);

        const clearButton = screen.getByText('Clear completed');
        fireEvent.click(clearButton);

        expect(screen.getByTestId('todo-item-container')).toBeEmptyDOMElement();
    })
});

    