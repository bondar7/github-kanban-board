import {render, screen} from '@testing-library/react';
import IssuesPage from './IssuesPage';

jest.mock("../../widgets/repoSearchBar/ui/RepoSearchBar", () => jest.fn(() => <div>RepoSearchBar</div>));
jest.mock("../../entities/Repo/ui/repoCard/RepoCard", () => jest.fn(() => <div>RepoCard</div>));
jest.mock("../../widgets/kanbanBoard/ui/KanbanBoard", () => jest.fn(() => <div>KanbanBoard</div>));

describe('IssuesPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the IssuesPage with all its components', () => {
        render(<IssuesPage />);

        expect(screen.getByText('GitHub Issue Tracker')).toBeInTheDocument();

        expect(screen.getByText('RepoSearchBar')).toBeInTheDocument();
        expect(screen.getByText('RepoCard')).toBeInTheDocument();
        expect(screen.getByText('KanbanBoard')).toBeInTheDocument();
    });

    it('renders the page with correct styles', () => {
        render(<IssuesPage />);

        const heading = screen.getByText('GitHub Issue Tracker');
        expect(heading).toHaveStyle('font-weight: bold');
        expect(heading).toHaveStyle('color: #343a40');
    });
});
