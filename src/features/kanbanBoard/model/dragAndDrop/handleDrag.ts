import {AppDispatch} from "../../../../shared";
import {DropResult} from "@hello-pangea/dnd";
import {Issue, IssueState} from "../../../../entities/Issue";
import {updateIssueState} from "../../../../entities/Issue/model/slice.ts";

interface ColumnsType {
    [IssueState.TODO]: Issue[];
    [IssueState.IN_PROGRESS]: Issue[];
    [IssueState.DONE]: Issue[];
}

export const handleDragEnd =
    (dispatch: AppDispatch, setColumns: React.Dispatch<React.SetStateAction<ColumnsType>>) =>
        (result: DropResult) => {
            if (!result.destination) return;

            const { source, destination, draggableId } = result;

            setColumns((prev) => {
                const newColumns = { ...prev };

                const sourceColumnKey = source.droppableId as keyof typeof newColumns;
                const destinationColumnKey = destination.droppableId as keyof typeof newColumns;

                const issue: Issue | undefined = newColumns[sourceColumnKey].find(i => i.id.toString() === draggableId);
                if (!issue) return prev;

                newColumns[sourceColumnKey] = newColumns[sourceColumnKey].filter((i) => i.id !== issue.id);

                newColumns[destinationColumnKey] = [
                    ...newColumns[destinationColumnKey].slice(0, destination.index),
                    { ...issue, state: destinationColumnKey },
                    ...newColumns[destinationColumnKey].slice(destination.index),
                ];

                dispatch(updateIssueState({ id: issue.id, newState: destinationColumnKey, destinationIndex: destination.index }));

                return newColumns;
            });
        };