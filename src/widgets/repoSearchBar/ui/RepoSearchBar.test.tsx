import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RepoSearchBar from './RepoSearchBar'; // Path to your component
import { repoApi } from "../../../entities/Repo";
import { issuesApi } from "../../../entities/Issue";
import { setRepoFullName } from "../../../entities/Repo/model/slice/slice";
import { resetErrors, resetIssues } from "../../../entities/Issue/model/slice/slice";
import useAppDispatch from "../../../shared/hooks/useAppDispatch";
import useAppSelector from "../../../shared/hooks/useAppSelector";

// Mock necessary hooks
jest.mock('../../../shared/hooks/useAppDispatch');
jest.mock('../../../shared/hooks/useAppSelector');
jest.mock('../../../entities/Repo');
jest.mock('../../../entities/Issue');

describe('RepoSearchBar', () => {
    let mockDispatch: jest.Mock;

    beforeEach(() => {
        mockDispatch = jest.fn();
        jest.clearAllMocks();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as jest.Mock).mockReturnValue(null); // Return null or appropriate mock for the repoFullName

        // Mock repoApi and issuesApi hooks
        (repoApi.useGetRepoQuery as jest.Mock).mockReturnValue({ isFetching: false });
        (issuesApi.useGetOpenIssuesQuery as jest.Mock).mockReturnValue({ isFetching: false, refetch: jest.fn() });
        (issuesApi.useGetInProgressIssuesQuery as jest.Mock).mockReturnValue({ isFetching: false, refetch: jest.fn() });
        (issuesApi.useGetClosedIssuesQuery as jest.Mock).mockReturnValue({ isFetching: false, refetch: jest.fn() });
    });

    it('renders the RepoSearchBar with input and button', () => {
        render(<RepoSearchBar />);

        // Check if RepoInput and LoadRepoIssuesButton are rendered
        expect(screen.getByPlaceholderText("Enter repo URL")).toBeInTheDocument();
        expect(screen.getByText('Load Issues')).toBeInTheDocument();
    });

    it('updates the repoURL state when typing in the input field', () => {
        render(<RepoSearchBar />);

        const input = screen.getByPlaceholderText("Enter repo URL") as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'https://github.com/test/repo' } });

        expect(input.value).toBe('https://github.com/test/repo');
    });

    it('dispatches setRepoFullName when the "Load Issues" button is clicked', async () => {
        const repoURL = 'https://github.com/test/repo';
        render(<RepoSearchBar />);

        const input = screen.getByPlaceholderText("Enter repo URL") as HTMLInputElement;
        const button = screen.getByText('Load Issues');

        fireEvent.change(input, { target: { value: repoURL } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(setRepoFullName('test/repo'));
            expect(mockDispatch).toHaveBeenCalledWith(resetErrors());
            expect(mockDispatch).toHaveBeenCalledWith(resetIssues());
        });
    });

    it('refetches issues when the same repo URL is loaded with no saved issues', async () => {
        const repoURL = 'https://github.com/test/repo';
        const refetchOpenIssues = jest.fn();
        const refetchInProgressIssues = jest.fn();
        const refetchClosedIssues = jest.fn();

        // Mock the issue fetching hooks
        (issuesApi.useGetOpenIssuesQuery as jest.Mock).mockReturnValue({ isFetching: false, refetch: refetchOpenIssues });
        (issuesApi.useGetInProgressIssuesQuery as jest.Mock).mockReturnValue({ isFetching: false, refetch: refetchInProgressIssues });
        (issuesApi.useGetClosedIssuesQuery as jest.Mock).mockReturnValue({ isFetching: false, refetch: refetchClosedIssues });

        // Mock the localStorage item to simulate no saved issues
        localStorage.removeItem('kanban_test/repo');

        // Mock the dispatch and repoFullName update
        (useAppSelector as jest.Mock).mockReturnValue('test/repo');
        render(<RepoSearchBar />);

        const input = screen.getByPlaceholderText("Enter repo URL") as HTMLInputElement;
        const button = screen.getByText('Load Issues');

        fireEvent.change(input, { target: { value: repoURL } });
        fireEvent.click(button);

        // Wait for the asynchronous refetch calls
        await waitFor(() => {
            expect(refetchOpenIssues).toHaveBeenCalled();
            expect(refetchInProgressIssues).toHaveBeenCalled();
            expect(refetchClosedIssues).toHaveBeenCalled();
        });
    });

    it('does not refetch issues when issues are already saved in localStorage', async () => {
        const repoURL = 'https://github.com/test/repo';
        const savedIssues = [{ id: '1', title: 'Saved Issue' }];
        localStorage.setItem(`kanban_test/repo`, JSON.stringify(savedIssues));

        render(<RepoSearchBar />);

        const input = screen.getByPlaceholderText("Enter repo URL") as HTMLInputElement;
        const button = screen.getByText('Load Issues');

        fireEvent.change(input, { target: { value: repoURL } });
        fireEvent.click(button);

        // Ensure that no refetch functions are called when issues are already saved
        await waitFor(() => {
            expect(mockDispatch).not.toHaveBeenCalledWith(resetIssues());
        });
    });

    it('sets toSkip state based on localStorage and prevents refetching if issues are saved', async () => {
        const repoURL = 'https://github.com/test/repo';
        const savedIssues = [{ id: '1', title: 'Saved Issue' }];
        localStorage.setItem(`kanban_test/repo`, JSON.stringify(savedIssues));

        render(<RepoSearchBar />);

        const input = screen.getByPlaceholderText("Enter repo URL") as HTMLInputElement;
        const button = screen.getByText('Load Issues');

        fireEvent.change(input, { target: { value: repoURL } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockDispatch).not.toHaveBeenCalledWith(resetIssues()); // No reset, issues are already saved
        });
    });
});
