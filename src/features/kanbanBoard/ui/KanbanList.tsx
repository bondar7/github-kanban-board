import {
    Issue,
    IssueState,
    selectClosedIssuesError,
    selectClosedIssuesLoading,
    selectInProgressIssuesError,
    selectInProgressIssuesLoading,
    selectOpenIssuesError,
    selectOpenIssuesLoading
} from "../../../entities/Issue";
import {Alert, Card, CardBody, Container, Spinner} from "react-bootstrap";
import IssueCard from "../../../entities/Issue/ui/issueCard/IssueCard.tsx";
import styles from "./KanbanList.module.css";
import useAppSelector from "../../../shared/hooks/useAppSelector.ts";

interface KanbanListProps {
    title: string;
    items: Issue[];
    type: IssueState;
}

const KanbanList = ({ title, items, type }: KanbanListProps) => {

    const isLoading = useAppSelector((state) =>
        type === IssueState.TODO
            ? selectOpenIssuesLoading(state)
            : type === IssueState.IN_PROGRESS
                ? selectInProgressIssuesLoading(state)
                : selectClosedIssuesLoading(state)
    );

    const isError = useAppSelector((state) =>
        type === IssueState.TODO
            ? selectOpenIssuesError(state)
            : type === IssueState.IN_PROGRESS
                ? selectInProgressIssuesError(state)
                : selectClosedIssuesError(state)
    );

    return (
        <Container className={styles.container}>
            <p className="fs-5 fw-semibold pb-2 text-center">{title}</p>
            <Card className={`shadow-sm rounded-1 ${styles.card}`}>
                <CardBody className={styles.cardBodyScrollable}>
                    {isLoading ? (
                        <div className="text-center h-100 d-flex align-items-center justify-content-center">
                            <Spinner animation="border" role="status" />
                        </div>
                    ) : isError ? (
                        <Alert variant="danger" className="text-center">
                            Failed to load {title.toLowerCase()} issues.
                        </Alert>
                    ) : items.length > 0 ? (
                        items.map((item: Issue) => <IssueCard key={item.id} issue={item} />)
                    ) : (
                        <p className={styles.emptyMessage}>No issues found</p>
                    )}
                </CardBody>
            </Card>
        </Container>
    );
};

export default KanbanList;
