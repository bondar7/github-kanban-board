import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../shared";
import App from "./App";

describe("App Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the App component and loads IssuesPage", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByText(/GitHub Issue Tracker/i)).toBeInTheDocument();
    });
});