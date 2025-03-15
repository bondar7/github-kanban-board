import {render, screen} from '@testing-library/react';
import RepoInput from './RepoInput';
import {ChangeEvent} from 'react'; // Import ChangeEvent

describe('RepoInput', () => {
    let mockSetRepoURL: jest.Mock<void, [ChangeEvent<HTMLInputElement>]>;

    beforeEach(() => {
        mockSetRepoURL = jest.fn();
        jest.clearAllMocks();
    });

    it('renders the RepoInput component with the correct placeholder', () => {
        render(<RepoInput repoURL="" setRepoURL={mockSetRepoURL} />);

        const inputElement = screen.getByPlaceholderText('Enter repo URL');
        expect(inputElement).toBeInTheDocument();
    });

    // it('calls setRepoURL with the correct value when the input value changes', () => {
    //     render(<RepoInput repoURL="https://github.com/test-repo" setRepoURL={mockSetRepoURL} />);
    //
    //     const inputElement = screen.getByPlaceholderText('Enter repo URL');
    //
    //     // Simulate typing in the input field with the correct event format
    //     fireEvent.change(inputElement, {
    //         target: { value: 'https://github.com/new-repo' },
    //     });
    //
    //     // Ensure the mock function is called with the correct value
    //     expect(mockSetRepoURL).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             target: expect.objectContaining({ value: 'https://github.com/new-repo' }),
    //         })
    //     );
    // });

    it('displays the correct value from the repoURL prop', () => {
        render(<RepoInput repoURL="https://github.com/test-repo" setRepoURL={mockSetRepoURL} />);

        const inputElement = screen.getByPlaceholderText('Enter repo URL');
        expect(inputElement).toHaveValue('https://github.com/test-repo');
    });
});
