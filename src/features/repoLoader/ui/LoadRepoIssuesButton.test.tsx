import {fireEvent, render, screen} from '@testing-library/react';
import LoadRepoIssuesButton from './LoadRepoIssuesButton';

describe('LoadRepoIssuesButton', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Resets all mocks
    });

    it('renders the button as disabled with "Loading..." text when isLoading is true', () => {
        render(<LoadRepoIssuesButton isLoading={true} handleOnLoad={jest.fn()} />);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveTextContent("Loading...");
    });

    it('renders the button as enabled with "Load Issues" text when isLoading is false', () => {
        render(<LoadRepoIssuesButton isLoading={false} handleOnLoad={jest.fn()} />);

        const button = screen.getByRole('button');
        expect(button).toBeEnabled();
        expect(button).toHaveTextContent("Load Issues");
    });

    it('calls handleOnLoad when clicked and isLoading is false', () => {
        const handleOnLoadMock = jest.fn();
        render(<LoadRepoIssuesButton isLoading={false} handleOnLoad={handleOnLoadMock} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(handleOnLoadMock).toHaveBeenCalledTimes(1);
    });

    it('does not call handleOnLoad when clicked and isLoading is true', () => {
        const handleOnLoadMock = jest.fn();
        render(<LoadRepoIssuesButton isLoading={true} handleOnLoad={handleOnLoadMock} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(handleOnLoadMock).not.toHaveBeenCalled();
    });
});
