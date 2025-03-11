import {Issue, IssueState, selectDoneIssues, selectInProgressIssues, selectToDoIssues} from "../../entities/Issue";
import useAppSelector from "../../shared/hooks/useAppSelector.ts";
import {Col, Container, Row} from "react-bootstrap";
import KanbanList from "../../features/kanbanBoard/ui/KanbanList.tsx";

const KanbanBoard = () => {
    const toDoIssues: Issue[] = useAppSelector(selectToDoIssues);
    const inProgressIssues: Issue[] = useAppSelector(selectInProgressIssues);
    const doneIssues: Issue[] = useAppSelector(selectDoneIssues);

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <KanbanList title={IssueState.TODO} items={toDoIssues}/>
                </Col>
                <Col md={4}>
                    <KanbanList title={IssueState.IN_PROGRESS} items={inProgressIssues}/>
                </Col>
                <Col md={4}>
                    <KanbanList title={IssueState.DONE} items={doneIssues}/>
                </Col>
            </Row>
        </Container>
    );
};

export default KanbanBoard;