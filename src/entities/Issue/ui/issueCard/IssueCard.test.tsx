import { render, screen } from "@testing-library/react";
import IssueCard from "./IssueCard";
import { Issue, IssueState } from "../../model/types";

jest.mock("../../../../shared/utils/daysAgo", () => jest.fn(() => "2"));

describe("IssueCard Component", () => {
    const mockIssue: Issue = {
        id: 123,
        state: IssueState.TODO,
        title: "Test Issue",
        number: 123,
        created_at: "2024-03-12T12:00:00Z",
        assignee: { login: "testAssignee" },
        user: { login: "testUser" },
        comments: 5,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders without crashing", () => {
        render(<IssueCard issue={mockIssue} />);
        expect(screen.getByText("Test Issue")).toBeInTheDocument();
    });

    it("displays issue number and created date correctly", () => {
        render(<IssueCard issue={mockIssue} />);
        expect(screen.getByText(/#123/)).toBeInTheDocument();
        expect(screen.getByText(/opened/)).toBeInTheDocument();
        expect(screen.getByText(/2 days ago/)).toBeInTheDocument();
    });

    it("displays correct assignee or user", () => {
        render(<IssueCard issue={mockIssue} />);
        expect(screen.getByText("testAssignee")).toBeInTheDocument();
    });

    it("displays comment count", () => {
        render(<IssueCard issue={mockIssue} />);
        expect(screen.getByText(/Comments: 5/)).toBeInTheDocument();
    });
});
