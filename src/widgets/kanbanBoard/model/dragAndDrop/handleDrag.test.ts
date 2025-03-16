import { AppDispatch } from "../../../../shared";
import { DropResult } from "@hello-pangea/dnd";
import { updateIssueState } from "../../../../entities/Issue/model/slice/slice";
import { IssueState } from "../../../../entities/Issue";
import { handleDragEnd } from "./handleDrag";

jest.mock("../../../../entities/Issue/model/slice/slice", () => ({
    updateIssueState: jest.fn(),
}));

describe("handleDragEnd", () => {
    const mockDispatch = jest.fn() as AppDispatch;
    const mockSetColumns = jest.fn();

    const mockColumns = {
        [IssueState.TODO]: [{ id: 1, title: "Test Issue 1", state: IssueState.TODO }],
        [IssueState.IN_PROGRESS]: [],
        [IssueState.DONE]: [],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Storage.prototype, 'setItem').mockImplementation(jest.fn());  // Mock localStorage.setItem
        mockSetColumns.mockImplementation(jest.fn());  // Ensure mockSetColumns is a mock function
    });

    it("should update the columns correctly and dispatch the updateIssueState action", () => {
        const result: DropResult = {
            source: { droppableId: IssueState.TODO, index: 0 },
            destination: { droppableId: IssueState.IN_PROGRESS, index: 0 },
            draggableId: "1",
            type: "DEFAULT",
            reason: "DROP",
            combine: null,
            mode: "FLUID",
        };

        mockSetColumns.mockImplementationOnce((fn) => fn(mockColumns));

        handleDragEnd("test-repo", mockDispatch, mockSetColumns)(result);

        expect(mockSetColumns).toHaveBeenCalledWith(expect.any(Function));

        expect(mockDispatch).toHaveBeenCalledWith(
            updateIssueState({
                id: 1,
                newState: IssueState.IN_PROGRESS,
                destinationIndex: 0,
            })
        );

        expect(localStorage.setItem).toHaveBeenCalledWith(
            "kanban_test-repo",
            JSON.stringify({
                [IssueState.TODO]: [],
                [IssueState.IN_PROGRESS]: [{ id: 1, title: "Test Issue 1", state: IssueState.IN_PROGRESS }],
                [IssueState.DONE]: [],
            })
        );
    });


    it("should not update columns if there is no destination", () => {
        const result: DropResult = {
            source: {
                droppableId: IssueState.TODO,
                index: 0,
            },
            destination: null,
            draggableId: "1",
            type: "DEFAULT",
            reason: "DROP",
            combine: null,
            mode: "FLUID",
        };

        handleDragEnd("test-repo", mockDispatch, mockSetColumns)(result);

        expect(mockSetColumns).not.toHaveBeenCalled();

        expect(mockDispatch).not.toHaveBeenCalled();

        expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it("should not update columns if the dragged issue is not found", () => {
        const result: DropResult = {
            source: {
                droppableId: IssueState.TODO,
                index: 0,
            },
            destination: {
                droppableId: IssueState.IN_PROGRESS,
                index: 0,
            },
            draggableId: "999",
            type: "DEFAULT",
            reason: "DROP",
            combine: null,
            mode: "FLUID",
        };

        mockSetColumns.mockImplementationOnce((fn) => fn(mockColumns));

        handleDragEnd("test-repo", mockDispatch, mockSetColumns)(result);

        expect(mockSetColumns).toHaveBeenCalledWith(expect.any(Function));


        const updateFunction = mockSetColumns.mock.calls[0][0];
        updateFunction(mockColumns);

        expect(mockColumns).toEqual({
            [IssueState.TODO]: [{ id: 1, title: "Test Issue 1", state: IssueState.TODO }],
            [IssueState.IN_PROGRESS]: [],
            [IssueState.DONE]: [],
        });

        expect(mockDispatch).not.toHaveBeenCalled();

        expect(localStorage.setItem).not.toHaveBeenCalled();
    });
});
