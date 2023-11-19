import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

import { render, screen } from "@testing-library/react"


describe('Header', () => {
    test("renders correctly", () => {
        render(<Header />, { wrapper: BrowserRouter })
        const text = 'Complete account setup'
        const textElement = screen.getByText(text)
        expect(textElement).toBeInTheDocument()


    })

 
})