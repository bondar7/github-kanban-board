import {render, screen} from '@testing-library/react';
import KanbanBoard from './KanbanBoard';
import {handleDragEnd} from "../model/dragAndDrop/handleDrag";
import useAppDispatch from "../../../shared/hooks/useAppDispatch";
import useAppSelector from "../../../shared/hooks/useAppSelector";
import {IssueState} from "../../../entities/Issue";

jest.mock('../../../shared/hooks/useAppDispatch');
jest.mock('../../../shared/hooks/useAppSelector');
jest.mock("../model/dragAndDrop/handleDrag");

describe('KanbanBoard', () => {
    let mockDispatch: jest.Mock;

    beforeEach(() => {
        mockDispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as jest.Mock).mockReturnValue({
            [IssueState.TODO]: [{ id: 1, title: "Test Issue", state: IssueState.TODO, number: 123, created_at: "2021-01-01", user: { login: "user" }, assignee: null, comments: 0 }],
            [IssueState.IN_PROGRESS]: [],
            [IssueState.DONE]: []
        });

        (handleDragEnd as jest.Mock).mockReturnValue(jest.fn());
    });

    it('renders Kanban board with columns', () => {
        render(<KanbanBoard />);

        expect(screen.getByText("To Do")).toBeInTheDocument();
        expect(screen.getByText("In Progress")).toBeInTheDocument();
        expect(screen.getByText("Done")).toBeInTheDocument();
    });

});
