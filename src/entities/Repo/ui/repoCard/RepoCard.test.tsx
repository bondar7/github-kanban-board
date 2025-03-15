import React from 'react';
import { render, screen } from '@testing-library/react';
import RepoCard from './RepoCard';
import { selectCurrentRepo, selectIsRepoLoading } from '../../model/selectors';
import useAppSelector from '../../../../shared/hooks/useAppSelector'; // Import the mocked hook

// Mock the useAppSelector hook
jest.mock('../../../../shared/hooks/useAppSelector');

describe('RepoCard', () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('renders loading state when isLoading is true', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector === selectIsRepoLoading) {
                return true; // isLoading is true
            }
            if (selector === selectCurrentRepo) {
                return null; // repo is null
            }
            return null;
        });

        render(<RepoCard />);

        // Check for the loading state (progress bar)
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders "No repository found" message when repo is null', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector === selectIsRepoLoading) {
                return false;
            }
            if (selector === selectCurrentRepo) {
                return null; // repo is null
            }
            return null;
        });

        render(<RepoCard />);

        // Check for the "No repository found" message
        expect(screen.getByText('No repository found. Please search for a repository.')).toBeInTheDocument();
    });

    it('renders repository details when repo is available', () => {
        const repo = {
            name: 'test-repo',
            html_url: 'https://github.com/test-user/test-repo',
            owner: {
                login: 'test-user',
                html_url: 'https://github.com/test-user',
            },
            stargazers_count: 1200,
        };

        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector === selectIsRepoLoading) {
                return false;
            }
            if (selector === selectCurrentRepo) {
                return repo; // repo is available
            }
            return null;
        });

        render(<RepoCard />);

        // Check if repository details are displayed
        expect(screen.getByText('test-user')).toBeInTheDocument();
        expect(screen.getByText('test-repo')).toBeInTheDocument();
        expect(screen.getByText('1.2K stars')).toBeInTheDocument();
    });

    it('renders star count less than 1000 correctly', () => {
        const repo = {
            name: 'test-repo',
            html_url: 'https://github.com/test-user/test-repo',
            owner: {
                login: 'test-user',
                html_url: 'https://github.com/test-user',
            },
            stargazers_count: 500,
        };

        (useAppSelector as jest.Mock).mockImplementation((selector) => {
            if (selector === selectIsRepoLoading) {
                return false;
            }
            if (selector === selectCurrentRepo) {
                return repo; // repo with less than 1000 stars
            }
            return null;
        });

        render(<RepoCard />);

        // Check if the star count is displayed correctly
        expect(screen.getByText('500 stars')).toBeInTheDocument();
    });
});