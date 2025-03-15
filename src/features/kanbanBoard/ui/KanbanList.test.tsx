import { render, screen } from "@testing-library/react";
import KanbanList from "./KanbanList";
import { Issue, IssueState } from "../../../entities/Issue";
import useAppSelector from "../../../shared/hooks/useAppSelector";
import "@testing-library/jest-dom";

jest.mock("../../../shared/hooks/useAppSelector");
jest.mock("../../../entities/Issue/ui/issueCard/IssueCard", () => ({ issue }: { issue: Issue }) => (
    <div data-testid="issue-card">{issue.title}</div>
));
jest.mock("@hello-pangea/dnd", () => ({
    Draggable: ({ children }: any) => children({ draggableProps: {}, dragHandleProps: {}, innerRef: jest.fn() }),
}));

const mockedUseAppSelector = useAppSelector as jest.Mock;

describe("KanbanList Component", () => {
    const mockIssues: Issue[] = [
        {
            id: 1,
            title: "Issue 1",
            number: 101,
            created_at: "2024-03-10T12:00:00Z",
            user: { login: "user1" },
            assignee: { login: "assignee1" },
            comments: 3,
            state: IssueState.TODO,
        },
        {
            id: 2,
            title: "Issue 2",
            number: 102,
            created_at: "2024-03-11T12:00:00Z",
            user: { login: "user2" },
            assignee: null,
            comments: 1,
            state: IssueState.TODO,
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks(); // Resets all mocks
    });

    it("renders loading state when isLoading is true", () => {
        mockedUseAppSelector.mockReturnValueOnce(true); // Mock isLoading as true

        render(<KanbanList title="To Do" items={[]} type={IssueState.TODO} />);

        // Check if loading indicator is present (adjust this selector to match your actual spinner)
        expect(screen.getByRole("status")).toBeInTheDocument(); // Ensure you use the correct text or role
    });


    it("renders an error message when isError is true", () => {
        mockedUseAppSelector.mockReturnValueOnce(false); // Mock isLoading as false
        mockedUseAppSelector.mockReturnValueOnce(true); // Mock isError as true

        render(<KanbanList title="To Do" items={[]} type={IssueState.TODO} />);

        // Check if error message is displayed
        expect(screen.getByText(/failed to load to do issues/i)).toBeInTheDocument();
    });

    it("renders issue cards when items are available", () => {
        mockedUseAppSelector.mockImplementation(() => false);

        render(<KanbanList title="To Do" items={mockIssues} type={IssueState.TODO} />);
        mockIssues.forEach((issue) => {
            expect(screen.getByText(issue.title)).toBeInTheDocument();
        });
    });

    it("displays 'No issues found' when items array is empty", () => {
        mockedUseAppSelector.mockImplementation(() => false);

        render(<KanbanList title="To Do" items={[]} type={IssueState.TODO} />);
        expect(screen.getByText(/no issues found/i)).toBeInTheDocument();
    });
});
