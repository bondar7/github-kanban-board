import { Issue, IssueState, selectDoneIssues, selectInProgressIssues, selectToDoIssues } from "../../entities/Issue";
import useAppSelector from "../../shared/hooks/useAppSelector.ts";
import { Col, Container, Row } from "react-bootstrap";
import KanbanList from "../../features/kanbanBoard/ui/KanbanList.tsx";

const KanbanBoard = () => {
    const toDoIssues: Issue[] = useAppSelector(selectToDoIssues);
    const inProgressIssues: Issue[] = useAppSelector(selectInProgressIssues);
    const doneIssues: Issue[] = useAppSelector(selectDoneIssues);

    return (
        <Container>
            <Row>
                <Col md={12} xs={12} sm={12} lg={4}>
                    <KanbanList title={"ToDo"} items={toDoIssues} type={IssueState.TODO} />
                </Col>
                <Col md={12} xs={12} sm={12} lg={4}>
                    <KanbanList title={"In Progress"} items={inProgressIssues} type={IssueState.IN_PROGRESS} />
                </Col>
                <Col md={12} xs={12} sm={12} lg={4}>
                    <KanbanList title={"Done"} items={doneIssues} type={IssueState.DONE} />
                </Col>
            </Row>
        </Container>
    );
};

export default KanbanBoard;
