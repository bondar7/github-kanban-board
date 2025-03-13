import {Issue, IssueState, selectDoneIssues, selectInProgressIssues, selectToDoIssues} from "../../../entities/Issue";
import useAppSelector from "../../../shared/hooks/useAppSelector.ts";
import {Col, Container, Row} from "react-bootstrap";
import useAppDispatch from "../../../shared/hooks/useAppDispatch.ts";
import {useEffect, useState} from "react";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import KanbanList from "../../../features/kanbanBoard/ui/KanbanList.tsx";
import {handleDragEnd} from "../model/dragAndDrop/handleDrag.ts";
import {selectRepoFullName} from "../../../entities/Repo";

const KanbanBoard = () => {
    const dispatch = useAppDispatch();
    const toDoIssues: Issue[] = useAppSelector(selectToDoIssues);
    const inProgressIssues: Issue[] = useAppSelector(selectInProgressIssues);
    const doneIssues: Issue[] = useAppSelector(selectDoneIssues);

    const repoFullName = useAppSelector(selectRepoFullName);

    const [columns, setColumns] = useState({
        [IssueState.TODO]: toDoIssues || [],
        [IssueState.IN_PROGRESS]: inProgressIssues || [],
        [IssueState.DONE]: doneIssues || [],
    });

    useEffect(() => {
        const savedColumns = localStorage.getItem(`kanban_${repoFullName}`);
        if (savedColumns) {
            setColumns(JSON.parse(savedColumns));
        } else {
            setColumns({
                [IssueState.TODO]: toDoIssues,
                [IssueState.IN_PROGRESS]: inProgressIssues,
                [IssueState.DONE]: doneIssues,
            });
        }
    }, [toDoIssues, inProgressIssues, doneIssues, repoFullName]);

    return (
        <DragDropContext onDragEnd={(result) => handleDragEnd(repoFullName, dispatch, setColumns)(result)}>
            <Container>
                <Row>
                    {Object.entries(columns).map(([columnKey, issues]) => (
                        <Col key={columnKey} md={12} xs={12} sm={12} lg={4}>
                            <Droppable droppableId={columnKey}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{ minHeight: "100px" }}
                                    >
                                        <KanbanList
                                            title={
                                                columnKey === IssueState.TODO
                                                    ? "To Do"
                                                    : columnKey === IssueState.IN_PROGRESS
                                                        ? "In Progress"
                                                        : "Done"
                                            }
                                            items={issues}
                                            type={columnKey as IssueState}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Col>
                    ))}
                </Row>
            </Container>
        </DragDropContext>
    );
};

export default KanbanBoard;
