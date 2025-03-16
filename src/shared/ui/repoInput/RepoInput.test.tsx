import {render, screen} from '@testing-library/react';
import RepoInput from './RepoInput';
import {ChangeEvent} from 'react';

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

    it('displays the correct value from the repoURL prop', () => {
        render(<RepoInput repoURL="https://github.com/test-repo" setRepoURL={mockSetRepoURL} />);

        const inputElement = screen.getByPlaceholderText('Enter repo URL');
        expect(inputElement).toHaveValue('https://github.com/test-repo');
    });
});
