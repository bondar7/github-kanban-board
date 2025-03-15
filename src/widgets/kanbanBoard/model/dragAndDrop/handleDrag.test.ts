import { AppDispatch } from "../../../../shared";
import { DropResult } from "@hello-pangea/dnd";
import { updateIssueState } from "../../../../entities/Issue/model/slice/slice";
import { IssueState } from "../../../../entities/Issue";
import { handleDragEnd } from "./handleDrag";

// Mock the necessary dependencies
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

        // Check that the columns have been updated
        expect(mockSetColumns).toHaveBeenCalledWith(expect.any(Function));

        // Verify dispatch was called with the correct parameters
        expect(mockDispatch).toHaveBeenCalledWith(
            updateIssueState({
                id: 1,
                newState: IssueState.IN_PROGRESS,
                destinationIndex: 0,
            })
        );

        // Verify that localStorage was updated with the new columns
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
            destination: null, // No destination
            draggableId: "1",
            type: "DEFAULT",
            reason: "DROP", // Add the missing `reason` property
            combine: null,  // Add the missing `combine` property
            mode: "FLUID",  // Add the missing `mode` property
        };

        handleDragEnd("test-repo", mockDispatch, mockSetColumns)(result);

        // Ensure that setColumns was not called
        expect(mockSetColumns).not.toHaveBeenCalled();

        // Ensure dispatch was not called
        expect(mockDispatch).not.toHaveBeenCalled();

        // Ensure localStorage was not called
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
            draggableId: "999", // Non-existent issue
            type: "DEFAULT",
            reason: "DROP",
            combine: null,
            mode: "FLUID",
        };

        // Mock implementation for mockSetColumns
        mockSetColumns.mockImplementationOnce((fn) => fn(mockColumns));

        handleDragEnd("test-repo", mockDispatch, mockSetColumns)(result);

        // Ensure that mockSetColumns was called with a function
        expect(mockSetColumns).toHaveBeenCalledWith(expect.any(Function));

        // Now manually invoke the function passed to mockSetColumns to check if the columns were not updated
        const updateFunction = mockSetColumns.mock.calls[0][0]; // Get the function passed to mockSetColumns
        updateFunction(mockColumns); // Manually invoke the function with mockColumns

        // Ensure that the columns have not been modified (because the issue was not found)
        expect(mockColumns).toEqual({
            [IssueState.TODO]: [{ id: 1, title: "Test Issue 1", state: IssueState.TODO }],
            [IssueState.IN_PROGRESS]: [],
            [IssueState.DONE]: [],
        });

        // Ensure dispatch was not called
        expect(mockDispatch).not.toHaveBeenCalled();

        // Ensure localStorage was not called
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });
});
